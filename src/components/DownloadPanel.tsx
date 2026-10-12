import { useState, type KeyboardEvent, type ReactNode } from 'react';
import { CopyCommand } from '@/components/CopyCommand';
import { cn } from '@/lib/utils';
import {
  detectPlatform,
  FDROID_URL,
  formatSize,
  OBTAINIUM_ADD_URL,
  OBTAINIUM_URL,
  PLATFORMS,
  PLAY_STORE_URL,
  resolveDownloads,
  ZAPSTORE_URL,
  type DetectedPlatform,
  type DownloadLink,
  type Platform,
  type Release,
} from '@/lib/downloads';

type Links = ReturnType<typeof resolveDownloads>;

function detail(...parts: (string | undefined)[]) {
  return parts.filter(Boolean).join(' · ');
}

function PrimaryButton({ href, title, sub, variant = 'gradient' }: { href: string; title: string; sub?: string; variant?: 'gradient' | 'outline' }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex min-w-[12rem] flex-col items-center rounded-xl px-6 py-3 text-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        variant === 'gradient'
          ? 'bg-amethyst-gradient text-white glow-amethyst hover:opacity-90'
          : 'border-2 border-purple-500/30 text-foreground hover:border-primary hover:bg-purple-500/10',
      )}
    >
      <span className="text-lg font-semibold">{title}</span>
      {sub && <span className="text-xs opacity-80">{sub}</span>}
    </a>
  );
}

function FileLink({ link, children }: { link: DownloadLink; children: ReactNode }) {
  return (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-purple-500/40 underline-offset-4 hover:decoration-primary">
      {children}
    </a>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col items-center gap-1 sm:flex-row sm:gap-3">
      <span className="text-sm text-muted-foreground sm:w-24 sm:text-right">{label}</span>
      <div className="flex min-w-0 max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 sm:justify-start">{children}</div>
    </div>
  );
}

const Dot = () => <span className="text-muted-foreground">·</span>;

function StoreRow({ name, note, href, action, actionLabel }: { name: string; note: ReactNode; href: string; action: string; actionLabel: string }) {
  return (
    <li className="flex items-center gap-4 px-4 py-3">
      <div className="min-w-0 flex-1 text-left">
        <div className="font-medium text-foreground">{name}</div>
        <div className="text-sm text-muted-foreground">{note}</div>
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={actionLabel}
        className="shrink-0 rounded-lg border border-purple-500/30 px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-purple-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {action}
      </a>
    </li>
  );
}

function AndroidPanel({ links }: { links: Links }) {
  return (
    <>
      <PrimaryButton href={ZAPSTORE_URL} title="Get it on Zapstore" sub="The Nostr app store · gets updates first" />
      <ul className="w-full max-w-md divide-y divide-purple-500/15 rounded-xl border border-purple-500/20 bg-purple-950/40">
        <StoreRow
          name="Google Play"
          note="Updates a few days after each release"
          href={PLAY_STORE_URL}
          action="Open"
          actionLabel="Open Amethyst on Google Play"
        />
        <StoreRow
          name="F-Droid"
          note="Updates up to two weeks after each release"
          href={FDROID_URL}
          action="Open"
          actionLabel="Open Amethyst on F-Droid"
        />
        <StoreRow
          name="Obtainium"
          note={
            <>
              Installs and updates from GitHub.{' '}
              <a href={OBTAINIUM_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">
                Get Obtainium
              </a>
            </>
          }
          href={OBTAINIUM_ADD_URL}
          action="Add"
          actionLabel="Add Amethyst to Obtainium"
        />
        <StoreRow
          name="APK file"
          note={detail('arm64', formatSize(links.apk.size), 'no automatic updates')}
          href={links.apk.href}
          action="Download"
          actionLabel="Download the Amethyst APK"
        />
      </ul>
    </>
  );
}

function MacPanel({ links }: { links: Links }) {
  return (
    <>
      <div className="flex justify-center">
        <PrimaryButton href={links.dmg.href} title="Download for Mac" sub={detail('.dmg', 'Apple Silicon', formatSize(links.dmg.size))} />
      </div>
      <div className="mx-auto grid w-fit max-w-full gap-3">
        <Row label="Homebrew">
          <CopyCommand text="brew install --cask amethyst-nostr" />
        </Row>
      </div>
      <p className="text-sm text-muted-foreground">Needs an Apple Silicon Mac. There is no Intel build.</p>
    </>
  );
}

function WindowsPanel({ links }: { links: Links }) {
  return (
    <>
      <div className="flex justify-center">
        <PrimaryButton href={links.msi.href} title="Download for Windows" sub={detail('.msi', 'x64', formatSize(links.msi.size))} />
      </div>
      <div className="mx-auto grid w-fit max-w-full gap-3">
        <Row label="winget">
          <CopyCommand text="winget install VitorPamplona.Amethyst" />
        </Row>
        <Row label="Portable">
          <FileLink link={links.zipX64}>.zip x64</FileLink>
          <Dot />
          <FileLink link={links.zipArm64}>.zip ARM64</FileLink>
        </Row>
      </div>
      <p className="text-sm text-muted-foreground">Windows 10 and 11. ARM PCs use the portable .zip.</p>
    </>
  );
}

function LinuxPanel({ links }: { links: Links }) {
  return (
    <>
      <div className="flex flex-wrap justify-center gap-3">
        <PrimaryButton href={links.debX64.href} title=".deb" sub={detail('Debian, Ubuntu', formatSize(links.debX64.size))} />
        <PrimaryButton href={links.rpmX64.href} title=".rpm" sub={detail('Fedora, openSUSE', formatSize(links.rpmX64.size))} variant="outline" />
        <PrimaryButton href={links.appImageX64.href} title="AppImage" sub={detail('Any distribution', formatSize(links.appImageX64.size))} variant="outline" />
      </div>
      <div className="mx-auto grid w-fit max-w-full gap-3">
        <Row label="x64">
          <FileLink link={links.flatpakX64}>Flatpak</FileLink>
          <Dot />
          <FileLink link={links.tarX64}>.tar.gz</FileLink>
        </Row>
        <Row label="ARM64">
          <FileLink link={links.debArm64}>.deb</FileLink>
          <Dot />
          <FileLink link={links.rpmArm64}>.rpm</FileLink>
          <Dot />
          <FileLink link={links.appImageArm64}>AppImage</FileLink>
          <Dot />
          <FileLink link={links.flatpakArm64}>Flatpak</FileLink>
          <Dot />
          <FileLink link={links.tarArm64}>.tar.gz</FileLink>
        </Row>
      </div>
    </>
  );
}

const PANELS: Record<Platform, (props: { links: Links }) => JSX.Element> = {
  android: AndroidPanel,
  mac: MacPanel,
  windows: WindowsPanel,
  linux: LinuxPanel,
};

export function DownloadPanel({ release }: { release: Release | null }) {
  const [detected] = useState<DetectedPlatform>(() =>
    typeof navigator === 'undefined' ? 'android' : detectPlatform(navigator.userAgent, navigator.maxTouchPoints),
  );
  const [selected, setSelected] = useState<Platform | null>(detected === 'ios' ? null : detected);
  const links = resolveDownloads(release);
  const Panel = selected ? PANELS[selected] : null;

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    const index = PLATFORMS.findIndex((p) => p.id === selected);
    const step = event.key === 'ArrowRight' ? 1 : -1;
    const next = PLATFORMS[(index + step + PLATFORMS.length) % PLATFORMS.length];
    setSelected(next.id);
    document.getElementById(`tab-${next.id}`)?.focus();
  };

  return (
    <div className="flex w-full flex-col items-center gap-6">
      {detected === 'ios' && (
        <p className="text-muted-foreground">Amethyst isn't on iPhone or iPad yet. It runs on:</p>
      )}

      <div role="tablist" aria-label="Platform" onKeyDown={onKeyDown} className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
        {PLATFORMS.map((p) => (
          <button
            key={p.id}
            id={`tab-${p.id}`}
            type="button"
            role="tab"
            aria-selected={selected === p.id}
            aria-controls={Panel ? 'download-panel' : undefined}
            tabIndex={selected === p.id || (selected === null && p.id === 'android') ? 0 : -1}
            onClick={() => setSelected(p.id)}
            className={cn(
              'rounded-full border px-3 py-1.5 text-sm font-medium sm:px-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              selected === p.id
                ? 'border-primary bg-primary/15 text-foreground'
                : 'border-purple-500/20 text-muted-foreground hover:text-foreground',
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      {Panel && (
        <div
          id="download-panel"
          role="tabpanel"
          aria-labelledby={`tab-${selected}`}
          className="flex w-full flex-col items-center gap-6 text-center"
        >
          <Panel links={links} />
        </div>
      )}
    </div>
  );
}
