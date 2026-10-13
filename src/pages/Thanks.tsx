import { useEffect, useMemo, useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AMETHYST_NPUB, profileUrl } from '@/lib/downloads';
import { cn } from '@/lib/utils';
import data from '@/data/supporters.json';

/** One supporter: profile name (may be empty), npub, total sats, number of zaps. */
type Supporter = [name: string, npub: string, sats: number, zaps: number];
type Ranked = { rank: number; s: Supporter; key: string };

const PAGE = 200;
const nf = new Intl.NumberFormat('en-US');
const supporters = data.supporters as Supporter[];
const shortNpub = (npub: string) => `${npub.slice(0, 10)}…${npub.slice(-4)}`;

// Equal totals share a place: 1, 2, 2, 4.
const ranked: Ranked[] = supporters.map((s) => ({ rank: 0, s, key: `${s[0]} ${s[1]}`.toLowerCase() }));
ranked.forEach((r, i) => {
  r.rank = i > 0 && ranked[i - 1].s[2] === r.s[2] ? ranked[i - 1].rank : i + 1;
});

function Row({ entry: { rank, s } }: { entry: Ranked }) {
  const [name, npub, sats, zaps] = s;
  const podium = rank <= 3;
  return (
    <li
      className={cn(
        'grid grid-cols-[3rem_minmax(0,1fr)_auto] items-baseline gap-x-3 border-b border-purple-500/15 py-2.5 sm:grid-cols-[4rem_minmax(0,1fr)_auto_5rem]',
        podium && 'py-4',
      )}
    >
      <span className={cn('text-right tabular-nums text-muted-foreground', podium && 'font-display text-2xl font-semibold text-gradient')}>
        {rank}
      </span>
      <a
        href={profileUrl(npub)}
        target="_blank"
        rel="noopener noreferrer"
        title={npub}
        className={cn(
          'min-w-0 truncate transition-colors hover:text-primary',
          podium && 'font-display text-xl font-semibold md:text-2xl',
          !name && 'font-mono text-sm text-muted-foreground',
        )}
      >
        {name || shortNpub(npub)}
      </a>
      <span className={cn('text-right font-display font-medium tabular-nums', podium && 'text-xl md:text-2xl')}>
        {nf.format(sats)} <span className="text-xs font-normal text-muted-foreground">sats</span>
      </span>
      <span className="hidden text-right text-sm tabular-nums text-muted-foreground sm:block">
        {nf.format(zaps)} {zaps === 1 ? 'zap' : 'zaps'}
      </span>
    </li>
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
  const [shown, setShown] = useState(PAGE);

  useEffect(() => {
    document.title = 'Thank you · Amethyst';
  }, []);

  const q = query.trim().toLowerCase();
  const rows = useMemo(() => (q ? ranked.filter((r) => r.key.includes(q)) : ranked.slice(0, shown)), [q, shown]);
  const since = new Date(data.since).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const updated = new Date(data.updated).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const hiddenZaps = data.private.zaps + data.anonymous.zaps;
  const hiddenSats = data.private.sats + data.anonymous.sats;

  return (
    <div className="flex min-h-screen flex-col bg-hero-gradient">
      <Header />
      <main className="container mx-auto flex flex-1 flex-col items-center gap-12 px-4 pb-20 pt-6 md:pt-12">
        <section className="flex max-w-2xl flex-col items-center gap-4 text-center">
          <h1 className="font-display text-5xl font-semibold tracking-[-0.03em] md:text-7xl">
            <span className="text-gradient">Thank you</span>
          </h1>
          <p className="text-lg text-muted-foreground md:text-xl">
            Amethyst is free and open source, and runs on value for value. Since {since}, {nf.format(data.people)} people
            have kept it going with zaps. Here is every one of them, by how much they have given.
          </p>
          <p className="text-sm text-muted-foreground">
            Only public zaps on Nostr are listed. Grants, private donations and other support are not, and are just as
            appreciated.
          </p>
        </section>

        <section aria-label="Totals" className="flex flex-wrap justify-center gap-x-12 gap-y-6">
          <Stat value={nf.format(data.sats)} label="sats" />
          <Stat value={nf.format(data.zaps)} label="zaps" />
          <Stat value={nf.format(data.people)} label="supporters" />
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
          {q && (
            <p className="text-sm text-muted-foreground" aria-live="polite">
              {rows.length === 0 ? 'No supporter matches that.' : `${nf.format(rows.length)} found`}
            </p>
          )}
        </div>

        <section aria-label="Supporters" className="flex w-full max-w-3xl flex-col items-center gap-6">
          <ol className="w-full border-t border-purple-500/15">
            {rows.map((r) => (
              <Row key={r.s[1]} entry={r} />
            ))}
          </ol>
          {!q && shown < ranked.length && (
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => setShown((n) => n + PAGE * 5)}
                className="rounded-xl border-2 border-purple-500/30 px-5 py-2 font-medium transition hover:border-primary hover:bg-purple-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Show more
              </button>
              <button
                type="button"
                onClick={() => setShown(ranked.length)}
                className="rounded-xl px-5 py-2 text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Show all {nf.format(ranked.length)}
              </button>
            </div>
          )}
          {!q && (
            <p className="max-w-xl text-center text-muted-foreground">
              And to the senders of {nf.format(hiddenZaps)} private and anonymous zaps, worth {nf.format(hiddenSats)} sats:
              you know who you are.
            </p>
          )}
        </section>

        <p className="max-w-xl text-center text-sm text-muted-foreground">
          Counted only from public lightning, onchain and Cashu zaps to Vitor and to Amethyst, and from zaps on Amethyst's posts
          that were split with other developers, as of {updated}. Names link to profiles on Brainstorm. To be left off this
          page,{' '}
          <a
            href={profileUrl(AMETHYST_NPUB)}
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
