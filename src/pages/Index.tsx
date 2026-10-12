import { Header } from '@/components/Header';
import { DownloadPanel } from '@/components/DownloadPanel';
import { Screenshots } from '@/components/Screenshots';
import { Footer } from '@/components/Footer';
import { useLatestRelease } from '@/hooks/useLatestRelease';
import { RELEASES_URL } from '@/lib/downloads';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

const Index = () => {
  const release = useLatestRelease();

  return (
    <div className="flex min-h-screen flex-col bg-hero-gradient">
      <Header />
      <main className="flex flex-1 flex-col items-center gap-12 pb-16 pt-6 md:pt-12">
        <div className="container mx-auto flex flex-col items-center gap-8 px-4 text-center">
          <div className="flex flex-col items-center gap-3">
            <h1 className="font-display text-5xl font-semibold tracking-[-0.03em] md:text-7xl">
              <span className="text-gradient">Amethyst</span>
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Nostr for Android, Mac, Windows and Linux.
            </p>
          </div>

          <DownloadPanel release={release} />

          <p className="text-sm text-muted-foreground">
            {release && <>{release.tag_name} · {formatDate(release.published_at)} · </>}
            <a
              href={release?.html_url ?? RELEASES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground"
            >
              Release notes
            </a>
          </p>
        </div>

        <Screenshots />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
