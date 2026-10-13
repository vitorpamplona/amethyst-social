import { useEffect, useMemo, useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AMETHYST_NPUB } from '@/lib/downloads';
import { cn } from '@/lib/utils';
import supporters from '@/data/supporters.json';

type Supporter = [name: string, npub: string];

const TIERS = [
  { label: '1,000,000+ sats', names: 'font-display text-3xl font-semibold md:text-4xl', gap: 'gap-x-8 gap-y-3' },
  { label: '100,000+ sats', names: 'font-display text-xl font-medium md:text-2xl', gap: 'gap-x-6 gap-y-2' },
  { label: '10,000+ sats', names: 'text-base md:text-lg', gap: 'gap-x-5 gap-y-1.5' },
  { label: '1,000+ sats', names: 'text-sm', gap: 'gap-x-4 gap-y-1' },
  { label: 'Every zap counts', names: 'text-sm text-muted-foreground', gap: 'gap-x-4 gap-y-1' },
];

const nf = new Intl.NumberFormat('en-US');
const tiers = supporters.tiers as Supporter[][];
const shortNpub = (npub: string) => `${npub.slice(0, 10)}…${npub.slice(-4)}`;

function Name({ supporter: [name, npub], className }: { supporter: Supporter; className?: string }) {
  return (
    <a
      href={`https://brainstorm.world/p/${npub}`}
      target="_blank"
      rel="noopener noreferrer"
      title={npub}
      className={cn('break-words transition-colors hover:text-primary', !name && 'font-mono text-[0.85em] text-muted-foreground', className)}
    >
      {name || shortNpub(npub)}
    </a>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-display text-3xl font-semibold tabular-nums md:text-4xl">{value}</span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}

const Thanks = () => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    document.title = 'Thank you · Amethyst';
  }, []);

  const index = useMemo(
    () => tiers.flatMap((tier, t) => tier.map((s) => ({ s, t, key: `${s[0]} ${s[1]}`.toLowerCase() }))),
    [],
  );
  const q = query.trim().toLowerCase();
  const matches = q ? index.filter((e) => e.key.includes(q)) : null;
  const since = new Date(supporters.since).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const updated = new Date(supporters.updated).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const hidden = supporters.private.zaps + supporters.anonymous.zaps;

  return (
    <div className="flex min-h-screen flex-col bg-hero-gradient">
      <Header />
      <main className="container mx-auto flex flex-1 flex-col items-center gap-14 px-4 pb-20 pt-6 md:pt-12">
        <section className="flex max-w-2xl flex-col items-center gap-4 text-center">
          <h1 className="font-display text-5xl font-semibold tracking-[-0.03em] md:text-7xl">
            <span className="text-gradient">Thank you</span>
          </h1>
          <p className="text-lg text-muted-foreground md:text-xl">
            Amethyst is free and open source. Since {since}, {nf.format(supporters.people)} people have kept it going with
            zaps. Zaps on each release note are split with the developers who built that version, {supporters.developers} of
            them so far.
          </p>
        </section>

        <section aria-label="Totals" className="flex flex-wrap justify-center gap-x-12 gap-y-6">
          <Stat value={nf.format(supporters.sats)} label="sats" />
          <Stat value={nf.format(supporters.zaps)} label="zaps" />
          <Stat value={nf.format(supporters.people)} label="supporters" />
        </section>

        <div className="flex w-full max-w-md flex-col items-center gap-2">
          <label htmlFor="find" className="sr-only">
            Find your name
          </label>
          <input
            id="find"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find your name or npub"
            className="w-full rounded-xl border border-purple-500/30 bg-purple-950/40 px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          {matches && (
            <p className="text-sm text-muted-foreground" aria-live="polite">
              {matches.length === 0 ? 'No supporter matches that.' : `${nf.format(matches.length)} found`}
            </p>
          )}
        </div>

        {matches ? (
          <ul className="flex w-full max-w-2xl flex-col divide-y divide-purple-500/15">
            {matches.slice(0, 200).map(({ s, t }) => (
              <li key={s[1]} className="flex min-w-0 items-baseline justify-between gap-4 py-2">
                <Name supporter={s} className="min-w-0" />
                <span className="shrink-0 text-sm text-muted-foreground">{TIERS[t].label}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex w-full max-w-5xl flex-col gap-14">
            {tiers.map((tier, t) => (
              <section key={TIERS[t].label} aria-labelledby={`tier-${t}`} className="flex flex-col items-center gap-5 text-center">
                <h2 id={`tier-${t}`} className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  {TIERS[t].label} <span className="text-purple-400/70">· {nf.format(tier.length)}</span>
                </h2>
                <ul className={cn('flex max-w-full flex-wrap justify-center', TIERS[t].gap, TIERS[t].names)}>
                  {tier.map((s) => (
                    <li key={s[1]} className="min-w-0 max-w-full">
                      <Name supporter={s} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
            <p className="mx-auto max-w-xl text-center text-muted-foreground">
              And to the senders of {nf.format(hidden)} private and anonymous zaps, worth{' '}
              {nf.format(supporters.private.sats + supporters.anonymous.sats)} sats: you know who you are.
            </p>
          </div>
        )}

        <p className="max-w-xl text-center text-sm text-muted-foreground">
          Counted from public zap receipts to Vitor, to Amethyst, and to the developers on Amethyst's release notes, as of{' '}
          {updated}. Names link to profiles on Brainstorm. To be left off this page,{' '}
          <a
            href={`https://njump.me/${AMETHYST_NPUB}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-foreground"
          >
            message Amethyst on Nostr
          </a>
          .
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default Thanks;
