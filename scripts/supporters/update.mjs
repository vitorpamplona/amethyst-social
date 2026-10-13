#!/usr/bin/env node
// Counts every zap that reached Vitor or Amethyst and writes the supporters list the /thanks page
// shows. Run it again later and it only fetches what is new: the running totals live in
// state.json beside this file. `--full` ignores the state and recounts from the relays.
//
//   node scripts/supporters/update.mjs [--full]
//
// What counts (README.md has the reasons):
//  - Lightning zaps (NIP-57, kind 9735) to Vitor or Amethyst, signed by their own LNURL servers.
//  - Lightning zaps on Amethyst's posts that a zap split sent to someone else, when the zap request
//    names that post and that person and its amount matches the invoice.
//  - Onchain zaps (NIP-BC, kind 8333) whose confirmed transaction pays the recipient's Taproot
//    address. Each transaction counts once, for whoever claimed it first.
//  - Nutzaps (NIP-61, kind 9321) whose proofs are locked to the recipient's key and that the mint
//    reports as spent, which means the recipient redeemed them.
// Zaps Vitor or Amethyst sent are left out, as are the shares a developer sent to themselves.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { fetchChunked, fetchFromAll, hashToCurve, npubDecode, npubEncode, schnorrVerify, sha256, taprootScript } from './lib.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const STATE_FILE = join(HERE, 'state.json');
const OUT_FILE = join(HERE, '../../src/data/supporters.json');

const VITOR = '460c25e682fda7832b52d1f22d3d22b3176d972f60dcdc3212ed8c92ef85065c';
const AMETHYST = 'aa9047325603dacd4f8142093567973566de3b1e20a89557b728c3be4c6a844b';
const RECIPIENTS = [VITOR, AMETHYST];

const ZAP_RELAYS = [
  'wss://search.brainstorm.world',
  'wss://nostr.wine',
  'wss://relay.damus.io',
  'wss://nos.lol',
  'wss://relay.primal.net',
  'wss://vitor.nostr1.com',
  'wss://nostr.mom',
  'wss://relay.nostr.net',
];
const PROFILE_RELAYS = ['wss://purplepag.es', ...ZAP_RELAYS];

// The LNURL servers that signed Vitor's and Amethyst's receipts before today's (found by lud16 at
// run time): Alby, and the server Vitor used in early 2023.
const KNOWN_SIGNERS = [
  '79f00d3f5a19ec806189fcab03c1be4ff81d18ee4f653c88fac41fe03570f432',
  '82c72b6400144dae700293329ed1b307df8c7cae0ad6cde44c6334a570dd1fde',
];

// Relays add receipts late (Brainstorm backfills), so each run re-reads this much before its cursor.
const OVERLAP = 30 * 24 * 3600;
const RELEASE_NOTE = /^(#+ )?#Amethyst v\d/;

const log = (...a) => console.error(...a);
const tag = (e, name) => e.tags.find((t) => t[0] === name)?.[1];
const tags = (e, name) => e.tags.filter((t) => t[0] === name).map((t) => t[1]);

function parseJson(s) {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}

const MSAT_PER_UNIT = { '': 100_000_000_000n, m: 100_000_000n, u: 100_000n, n: 100n };

/** A bolt11 invoice's amount in msat from its human-readable part, or null when it has none. */
function bolt11Msat(invoice) {
  if (!invoice) return null;
  const s = invoice.toLowerCase();
  const m = s.slice(0, s.lastIndexOf('1')).match(/^ln(?:bcrt|bc|tbs|tb|sb)(\d+)([munp]?)$/);
  if (!m) return null;
  if (m[2] === 'p') return BigInt(m[1]) / 10n;
  return BigInt(m[1]) * MSAT_PER_UNIT[m[2]];
}

function freshState() {
  return {
    version: 1,
    cursor: 0,
    first: 0,
    trustedSigners: [...KNOWN_SIGNERS],
    splitPosts: [],
    donors: {},
    private: [0, 0],
    anonymous: [0, 0],
    recentReceipts: {},
    recentZaps: {},
    onchainTxs: {},
    nutzapProofs: [],
  };
}

// --- totals ---------------------------------------------------------------------------------

/** Adds `msat` to a supporter. `zapKey` names the zap so a split's several receipts count once. */
function credit(state, who, msat, zapKey, at) {
  const row =
    who === 'private' ? state.private : who === 'anonymous' ? state.anonymous : (state.donors[who] ??= [0, 0, at, at]);
  row[0] += Number(msat);
  if (!(zapKey in state.recentZaps)) row[1] += 1;
  state.recentZaps[zapKey] = at;
  if (row.length > 2) {
    row[2] = Math.min(row[2], at);
    row[3] = Math.max(row[3], at);
  }
  state.first = state.first ? Math.min(state.first, at) : at;
}

// --- sources --------------------------------------------------------------------------------

/** The nostrPubkey of each recipient's current lightning address, so new receipts are trusted. */
async function currentSigners() {
  const found = [];
  const profiles = await fetchFromAll(PROFILE_RELAYS.slice(0, 4), { kinds: [0], authors: RECIPIENTS });
  const newest = {};
  for (const e of profiles) if (!newest[e.pubkey] || newest[e.pubkey].created_at < e.created_at) newest[e.pubkey] = e;
  for (const e of Object.values(newest)) {
    const lud16 = parseJson(e.content)?.lud16;
    if (!lud16?.includes('@')) continue;
    const [name, domain] = lud16.split('@');
    try {
      const res = await fetch(`https://${domain}/.well-known/lnurlp/${name}`, { signal: AbortSignal.timeout(15000) });
      const key = (await res.json()).nostrPubkey;
      if (/^[0-9a-f]{64}$/.test(key ?? '')) found.push(key);
    } catch (err) {
      log(`  could not read ${lud16}: ${err.message}`);
    }
  }
  return found;
}

/** New posts by Amethyst (any kind) and Vitor's release notes that split their zaps. */
async function findSplitPosts(state, since) {
  const base = since ? { since } : {};
  const amethyst = await fetchFromAll(ZAP_RELAYS, { ...base, authors: [AMETHYST] }, log);
  const vitor = await fetchFromAll(ZAP_RELAYS, { ...base, kinds: [1], authors: [VITOR] }, log);
  const known = new Set(state.splitPosts);
  for (const e of [...amethyst, ...vitor.filter((e) => RELEASE_NOTE.test(e.content))]) {
    if (e.tags.some((t) => t[0] === 'zap') && !known.has(e.id)) {
      state.splitPosts.push(e.id);
      known.add(e.id);
    }
  }
}

async function countLightning(state, since) {
  const base = since ? { since } : {};
  log('Lightning zaps to Vitor and Amethyst');
  const direct = await fetchFromAll(ZAP_RELAYS, { ...base, kinds: [9735], '#p': RECIPIENTS }, log);
  log(`Lightning zaps on ${state.splitPosts.length} posts with zap splits`);
  const onSplits = await fetchChunked(ZAP_RELAYS, '#e', state.splitPosts, { ...base, kinds: [9735] }, log);

  const receipts = new Map([...direct, ...onSplits].map((e) => [e.id, e]));
  const trusted = new Set(state.trustedSigners);
  const splitPosts = new Set(state.splitPosts);
  const tally = { counted: 0, untrusted: 0, invalid: 0, fromUs: 0 };
  for (const e of [...receipts.values()].sort((a, b) => a.created_at - b.created_at)) {
    if (e.id in state.recentReceipts) continue;
    state.recentReceipts[e.id] = e.created_at;
    state.cursor = Math.max(state.cursor, e.created_at);

    const recipient = tag(e, 'p');
    const request = parseJson(tag(e, 'description') ?? '');
    const msat = bolt11Msat(tag(e, 'bolt11'));
    const post = tag(e, 'e');
    if (!request || msat == null || msat <= 0n) {
      tally.invalid++;
      continue;
    }
    if (RECIPIENTS.includes(recipient)) {
      if (!trusted.has(e.pubkey)) {
        tally.untrusted++;
        continue;
      }
    } else {
      // A split share: the request must name this post and this person, for this amount.
      const amount = tags(request, 'amount')[0];
      const valid =
        splitPosts.has(post) &&
        tags(request, 'p').includes(recipient) &&
        tags(request, 'e').includes(post) &&
        (!amount || BigInt(amount) === msat) &&
        request.pubkey !== recipient;
      if (!valid) {
        tally.invalid++;
        continue;
      }
    }
    const anon = request.tags?.find((t) => t[0] === 'anon');
    const sender = anon ? (anon[1] ? 'private' : 'anonymous') : request.pubkey;
    if (RECIPIENTS.includes(sender)) {
      tally.fromUs++;
      continue;
    }
    const zapKey = post && request.created_at ? `${sender}:${post}:${Math.floor(request.created_at / 120)}` : e.id;
    credit(state, sender, msat, zapKey, e.created_at);
    tally.counted++;
  }
  log(`  ${tally.counted} counted, ${tally.untrusted} from unknown signers, ${tally.invalid} invalid, ${tally.fromUs} sent by Vitor or Amethyst`);
}

async function countOnchain(state) {
  log('Onchain zaps');
  const events = await fetchFromAll(ZAP_RELAYS, { kinds: [8333], '#p': RECIPIENTS }, log);
  const tally = { counted: 0, claimedAgain: 0, pending: 0, unpaid: 0 };
  for (const e of events.sort((a, b) => a.created_at - b.created_at)) {
    const recipient = tag(e, 'p');
    const txid = (tag(e, 'i') ?? '').split(':').pop();
    const key = `${txid}:${recipient}`;
    if (!RECIPIENTS.includes(recipient) || !/^[0-9a-f]{64}$/.test(txid) || RECIPIENTS.includes(e.pubkey)) continue;
    if (key in state.onchainTxs) {
      if (state.onchainTxs[key] !== e.id) tally.claimedAgain++;
      continue;
    }
    let tx;
    try {
      const res = await fetch(`https://mempool.space/api/tx/${txid}`, { signal: AbortSignal.timeout(20000) });
      tx = res.ok ? await res.json() : null;
    } catch {
      tx = null;
    }
    if (!tx?.status?.confirmed) {
      tally.pending++; // unknown or unconfirmed: asked again next run
      continue;
    }
    const to = taprootScript(recipient);
    const change = taprootScript(e.pubkey);
    const paid = to === change ? 0 : tx.vout.filter((o) => o.scriptpubkey === to).reduce((s, o) => s + o.value, 0);
    state.onchainTxs[key] = e.id;
    if (paid === 0) {
      tally.unpaid++;
      continue;
    }
    credit(state, e.pubkey, BigInt(paid) * 1000n, `onchain:${key}`, e.created_at);
    tally.counted++;
  }
  log(`  ${tally.counted} counted, ${tally.claimedAgain} claims of a counted transaction, ${tally.pending} unconfirmed or not found, ${tally.unpaid} that paid nothing`);
}

async function countNutzaps(state) {
  log('Nutzaps');
  const events = await fetchFromAll(ZAP_RELAYS, { kinds: [9321], '#p': RECIPIENTS }, log);
  const infos = await fetchFromAll(ZAP_RELAYS, { kinds: [10019], authors: RECIPIENTS });
  const lockKey = {};
  for (const e of infos.sort((a, b) => a.created_at - b.created_at)) lockKey[e.pubkey] = tag(e, 'pubkey')?.slice(-64);

  // Proofs locked to the recipient's nutzap key, grouped by mint for one state check each.
  const pending = [];
  const counted = new Set(state.nutzapProofs);
  for (const e of events) {
    const recipient = tag(e, 'p');
    if (!RECIPIENTS.includes(recipient) || RECIPIENTS.includes(e.pubkey) || !lockKey[recipient]) continue;
    const mint = tag(e, 'u')?.replace(/\/$/, '');
    const perMsat = tag(e, 'unit') === 'msat' ? 1n : 1000n;
    for (const raw of tags(e, 'proof')) {
      const proof = parseJson(raw);
      const secret = parseJson(proof?.secret ?? '');
      if (!mint || !Number.isInteger(proof?.amount) || secret?.[0] !== 'P2PK') continue;
      if (secret[1]?.data?.slice(-64) !== lockKey[recipient]) continue;
      const y = hashToCurve(proof.secret);
      if (!counted.has(y)) pending.push({ e, mint, y, secret: proof.secret, extra: secret[1].tags ?? [], msat: BigInt(proof.amount) * perMsat, key: lockKey[recipient] });
    }
  }
  const byMint = Map.groupBy(pending, (p) => p.mint);
  let spent = 0;
  for (const [mint, proofs] of byMint) {
    let states = [];
    try {
      const res = await fetch(`${mint}/v1/checkstate`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ Ys: proofs.map((p) => p.y) }),
        signal: AbortSignal.timeout(20000),
      });
      states = (await res.json()).states ?? [];
    } catch (err) {
      log(`  ${mint}: ${err.message}`);
    }
    const byY = new Map(states.map((s) => [s.Y, s]));
    for (const p of proofs) {
      const s = byY.get(p.y);
      if (s?.state !== 'SPENT') continue; // unredeemed, or never real: asked again next run
      // Spent by the recipient: their signature in the witness, or a lock nobody else could open.
      const sigs = parseJson(s.witness ?? '')?.signatures ?? [];
      const signedByRecipient = sigs.some((sig) => schnorrVerify(sig, sha256(p.secret), p.key));
      const onlyRecipient = !p.extra.some((t) => t[0] === 'refund' || t[0] === 'pubkeys');
      if (!(signedByRecipient || (sigs.length === 0 && onlyRecipient))) continue;
      state.nutzapProofs.push(p.y);
      credit(state, p.e.pubkey, p.msat, `nutzap:${p.e.id}`, p.e.created_at);
      spent++;
    }
  }
  log(`  ${spent} proofs redeemed by the recipient, ${pending.length - spent} not (or not yet)`);
}

// --- names ----------------------------------------------------------------------------------

const PLACEHOLDER = /^(deleted account|nobody|unknown|anon(ymous)?|null|undefined|test|user|npub1[0-9a-z]+|[^\p{L}\p{N}]*)$/iu;

/** A profile name safe to show: no invisible or direction-changing characters, no zalgo, 32 chars. */
function cleanName(name) {
  let s = String(name ?? '')
    .replace(/[‪-‮⁦-⁩​‎‏؜﻿⁠­]/g, '')
    .replace(/(\p{M}{2})\p{M}+/gu, '$1')
    .replace(/[\p{Cc}\s]+/gu, ' ')
    .trim();
  if (PLACEHOLDER.test(s)) return '';
  const chars = [...s];
  if (chars.length > 32) s = `${chars.slice(0, 31).join('').trimEnd()}…`;
  return s;
}

async function names(pubkeys, previous) {
  log(`Profile names for ${pubkeys.length} supporters`);
  const profiles = await fetchChunked(PROFILE_RELAYS, 'authors', pubkeys, { kinds: [0] }, () => {});
  const newest = {};
  for (const e of profiles) if (!newest[e.pubkey] || newest[e.pubkey].created_at < e.created_at) newest[e.pubkey] = e;
  const out = {};
  for (const pk of pubkeys) {
    const c = parseJson(newest[pk]?.content ?? '') ?? {};
    out[pk] = cleanName(c.display_name || c.displayName || c.name) || previous[pk] || '';
  }
  return out;
}

// --- main -----------------------------------------------------------------------------------

const full = process.argv.includes('--full') || !existsSync(STATE_FILE);
const state = full ? freshState() : JSON.parse(readFileSync(STATE_FILE, 'utf8'));
const since = full ? undefined : state.cursor - OVERLAP;
log(full ? 'Counting every zap from scratch' : `Counting zaps since ${new Date(since * 1000).toISOString().slice(0, 10)}`);

for (const key of await currentSigners()) if (!state.trustedSigners.includes(key)) state.trustedSigners.push(key);
await findSplitPosts(state, since);
await countLightning(state, since);
await countOnchain(state);
await countNutzaps(state);
const bolt12 = await fetchFromAll(ZAP_RELAYS, { kinds: [9736], '#p': RECIPIENTS });
if (bolt12.length) log(`${bolt12.length} BOLT12 zaps (kind 9736) not counted: their payer proofs are not verified here yet`);

// Forget receipt ids and zap keys the next run's overlap can no longer reach.
const horizon = state.cursor - OVERLAP;
for (const map of [state.recentReceipts, state.recentZaps]) for (const [k, at] of Object.entries(map)) if (at < horizon) delete map[k];

const previous = existsSync(OUT_FILE) ? JSON.parse(readFileSync(OUT_FILE, 'utf8')) : null;
const previousNames = Object.fromEntries((previous?.supporters ?? []).map(([name, npub]) => [npubDecode(npub), name]));
const ranked = Object.entries(state.donors).sort((a, b) => b[1][0] - a[1][0]);
const shown = await names(
  ranked.map(([pk]) => pk),
  previousNames,
);
const sats = (msat) => Math.round(msat / 1000);
const all = [...ranked.map(([, r]) => r), state.private, state.anonymous];
const out = {
  updated: new Date().toISOString().slice(0, 10),
  since: new Date(state.first * 1000).toISOString().slice(0, 10),
  sats: sats(all.reduce((s, r) => s + r[0], 0)),
  zaps: all.reduce((s, r) => s + r[1], 0),
  people: ranked.length,
  private: { sats: sats(state.private[0]), zaps: state.private[1] },
  anonymous: { sats: sats(state.anonymous[0]), zaps: state.anonymous[1] },
  supporters: ranked.map(([pk, r]) => [shown[pk], npubEncode(pk), sats(r[0]), r[1]]),
};
writeFileSync(STATE_FILE, `${JSON.stringify(state)}\n`);
writeFileSync(OUT_FILE, `${JSON.stringify(out)}\n`);
log(`${out.people} supporters, ${out.sats.toLocaleString('en-US')} sats in ${out.zaps.toLocaleString('en-US')} zaps`);
