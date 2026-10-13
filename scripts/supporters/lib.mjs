// Helpers for update.mjs: relay paging, NIP-19, and the little secp256k1 math the checks need
// (BIP-341 Taproot outputs, BIP-340 signatures, Cashu's hash_to_curve). No dependencies.
import { createHash } from 'node:crypto';

const sha256 = (...parts) => {
  const h = createHash('sha256');
  for (const p of parts) h.update(p);
  return h.digest();
};

/**
 * Every event matching `filter` on `relay`, paging back with `until` until a page brings
 * nothing new. Resolves with what arrived even if the relay stalls or drops.
 */
export function fetchAll(relay, filter, { pageLimit = 500, pageTimeout = 30000, maxPages = 5000 } = {}) {
  return new Promise((resolve) => {
    const events = new Map();
    let ws;
    let page = 0;
    let until;
    let timer;
    let done = false;
    const finish = (why) => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      try {
        ws.close();
      } catch {
        // already closed
      }
      resolve({ relay, events, why });
    };
    const next = () => {
      if (page >= maxPages) return finish('maxPages');
      page++;
      const sub = `p${page}`;
      const f = { ...filter, limit: pageLimit };
      if (until !== undefined) f.until = until;
      let fresh = 0;
      let oldest = Infinity;
      clearTimeout(timer);
      timer = setTimeout(() => finish(`timeout@${page}`), pageTimeout);
      ws.onmessage = (m) => {
        let msg;
        try {
          msg = JSON.parse(m.data);
        } catch {
          return;
        }
        if (msg[1] !== sub) return;
        if (msg[0] === 'CLOSED') return finish(`closed: ${msg[2]}`);
        if (msg[0] === 'EVENT') {
          const e = msg[2];
          if (!events.has(e.id)) {
            events.set(e.id, e);
            fresh++;
          }
          if (e.created_at < oldest) oldest = e.created_at;
        } else if (msg[0] === 'EOSE') {
          ws.send(JSON.stringify(['CLOSE', sub]));
          if (fresh === 0) return finish('end');
          // Inclusive `until` re-asks the oldest second, so a second wider than a page still drains.
          until = oldest === until ? oldest - 1 : oldest;
          next();
        }
      };
      ws.send(JSON.stringify(['REQ', sub, f]));
    };
    try {
      ws = new WebSocket(relay);
    } catch (e) {
      return finish(`connect: ${e.message}`);
    }
    timer = setTimeout(() => finish('connect timeout'), pageTimeout);
    ws.onopen = () => next();
    ws.onerror = () => finish('error');
    ws.onclose = () => finish('closed');
  });
}

/** `fetchAll` on several relays at once, merged by id. Brainstorm hides spam unless asked. */
export async function fetchFromAll(relays, filter, log = () => {}) {
  const merged = new Map();
  await Promise.all(
    relays.map(async (relay) => {
      const f = relay.includes('brainstorm') ? { ...filter, search: 'include:spam' } : filter;
      const res = await fetchAll(relay, f);
      for (const [id, e] of res.events) merged.set(id, e);
      log(`  ${relay}: ${res.events.size} (${res.why})`);
    }),
  );
  return [...merged.values()];
}

/** The same, for filters with a long id/author list, split into chunks the relays accept. */
export async function fetchChunked(relays, key, values, base, log, size = 100) {
  const merged = new Map();
  for (let i = 0; i < values.length; i += size) {
    for (const e of await fetchFromAll(relays, { ...base, [key]: values.slice(i, i + size) })) merged.set(e.id, e);
    log(`  ${Math.min(i + size, values.length)} of ${values.length}`);
  }
  return [...merged.values()];
}

// --- NIP-19 ---------------------------------------------------------------------------------

const CHARSET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';
const GEN = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3];

function polymod(values) {
  let chk = 1;
  for (const v of values) {
    const top = chk >> 25;
    chk = ((chk & 0x1ffffff) << 5) ^ v;
    for (let i = 0; i < 5; i++) if ((top >> i) & 1) chk ^= GEN[i];
  }
  return chk;
}

export function npubEncode(hex) {
  const data = [];
  let acc = 0;
  let bits = 0;
  for (const b of Buffer.from(hex, 'hex')) {
    acc = (acc << 8) | b;
    bits += 8;
    while (bits >= 5) {
      bits -= 5;
      data.push((acc >> bits) & 31);
    }
  }
  if (bits) data.push((acc << (5 - bits)) & 31);
  const hrp = [...'npub'].map((c) => c.charCodeAt(0));
  const mod = polymod([...hrp.map((c) => c >> 5), 0, ...hrp.map((c) => c & 31), ...data, 0, 0, 0, 0, 0, 0]) ^ 1;
  const checksum = [0, 1, 2, 3, 4, 5].map((i) => (mod >> (5 * (5 - i))) & 31);
  return `npub1${[...data, ...checksum].map((v) => CHARSET[v]).join('')}`;
}

export function npubDecode(npub) {
  const data = npub.slice(5, -6).split('').map((c) => CHARSET.indexOf(c));
  let acc = 0;
  let bits = 0;
  const out = [];
  for (const v of data) {
    acc = (acc << 5) | v;
    bits += 5;
    while (bits >= 8) {
      bits -= 8;
      out.push((acc >> bits) & 255);
    }
  }
  return Buffer.from(out.slice(0, 32)).toString('hex');
}

// --- secp256k1 ------------------------------------------------------------------------------

const P = 2n ** 256n - 2n ** 32n - 977n;
const N = 0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141n;
const G = [
  0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798n,
  0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8n,
];

const mod = (a, m = P) => ((a % m) + m) % m;
function pow(b, e, m = P) {
  let r = 1n;
  b = mod(b, m);
  while (e > 0n) {
    if (e & 1n) r = (r * b) % m;
    b = (b * b) % m;
    e >>= 1n;
  }
  return r;
}
const inv = (a) => pow(a, P - 2n);

function add(a, b) {
  if (!a) return b;
  if (!b) return a;
  if (a[0] === b[0] && mod(a[1] + b[1]) === 0n) return null;
  const l = a[0] === b[0] && a[1] === b[1] ? mod(3n * a[0] * a[0] * inv(2n * a[1])) : mod((b[1] - a[1]) * inv(b[0] - a[0]));
  const x = mod(l * l - a[0] - b[0]);
  return [x, mod(l * (a[0] - x) - a[1])];
}

function mul(k, pt) {
  let r = null;
  for (; k > 0n; k >>= 1n) {
    if (k & 1n) r = add(r, pt);
    pt = add(pt, pt);
  }
  return r;
}

/** The point with this x and an even y, or null when x is not on the curve. */
function liftX(x) {
  if (x >= P) return null;
  const c = mod(x ** 3n + 7n);
  const y = pow(c, (P + 1n) / 4n);
  if (mod(y * y) !== c) return null;
  return [x, y % 2n === 0n ? y : P - y];
}

const big = (buf) => BigInt(`0x${Buffer.from(buf).toString('hex') || '0'}`);
const hex32 = (n) => n.toString(16).padStart(64, '0');
const taggedHash = (tag, ...msg) => {
  const t = sha256(tag);
  return sha256(t, t, ...msg);
};

/** BIP-341 key-path-only output script (`5120…`) for an x-only key: the NIP-BC zap address. */
export function taprootScript(xonlyHex) {
  const p = liftX(BigInt(`0x${xonlyHex}`));
  if (!p) return null;
  const t = big(taggedHash('TapTweak', Buffer.from(xonlyHex, 'hex')));
  return `5120${hex32(add(p, mul(t, G))[0])}`;
}

/** BIP-340 Schnorr signature check. */
export function schnorrVerify(sigHex, msg, xonlyHex) {
  const pk = liftX(BigInt(`0x${xonlyHex}`));
  if (!pk || sigHex.length !== 128) return false;
  const r = BigInt(`0x${sigHex.slice(0, 64)}`);
  const s = BigInt(`0x${sigHex.slice(64)}`);
  if (r >= P || s >= N) return false;
  const e = mod(big(taggedHash('BIP0340/challenge', Buffer.from(sigHex.slice(0, 64), 'hex'), Buffer.from(xonlyHex, 'hex'), msg)), N);
  const R = add(mul(s, G), mul(N - e, pk));
  return !!R && R[1] % 2n === 0n && R[0] === r;
}

/** Cashu NUT-00 hash_to_curve of a proof secret, as the compressed point a mint indexes by. */
export function hashToCurve(secret) {
  const msgHash = sha256(Buffer.from('Secp256k1_HashToCurve_Cashu_'), typeof secret === 'string' ? Buffer.from(secret, 'utf8') : secret);
  for (let counter = 0; counter < 65536; counter++) {
    const c = Buffer.alloc(4);
    c.writeUInt32LE(counter);
    const x = sha256(msgHash, c);
    if (liftX(big(x))) return `02${x.toString('hex')}`;
  }
  throw new Error('hash_to_curve: no point');
}

export { sha256 };
