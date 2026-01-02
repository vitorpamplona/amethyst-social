import { useAmethystUpdates, useAmethystProfile, AMETHYST_NPUB } from '@/hooks/useAmethystUpdates';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { NoteContent } from '@/components/NoteContent';
import { ExternalLink, RefreshCw } from 'lucide-react';
import type { NostrEvent } from '@nostrify/nostrify';

function formatRelativeTime(timestamp: number): string {
  const now = Math.floor(Date.now() / 1000);
  const diff = now - timestamp;

  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;

  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

function UpdateCard({ event, profile }: { event: NostrEvent; profile: { name?: string; picture?: string; display_name?: string } | null }) {
  const displayName = profile?.display_name || profile?.name || 'Amethyst';
  const avatar = profile?.picture;

  const nostrLink = `https://njump.me/${event.id}`;

  return (
    <Card className="group border-purple-500/10 bg-purple-950/40 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 ring-2 ring-purple-500/30">
              <AvatarImage src={avatar} alt={displayName} />
              <AvatarFallback className="bg-amethyst-gradient text-white font-bold">
                A
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-foreground">{displayName}</p>
              <p className="text-xs text-muted-foreground">{formatRelativeTime(event.created_at)}</p>
            </div>
          </div>

          <a
            href={nostrLink}
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ExternalLink className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="text-sm text-foreground leading-relaxed whitespace-pre-wrap break-words">
          <NoteContent event={event} />
        </div>
      </CardContent>
    </Card>
  );
}

function UpdateSkeleton() {
  return (
    <Card className="border-border/50 bg-card/80">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-3/5" />
        </div>
      </CardContent>
    </Card>
  );
}

export function UpdatesSection() {
  const { data: updates, isLoading, error, refetch, isFetching } = useAmethystUpdates(6);
  const { data: profile } = useAmethystProfile();

  return (
    <section id="updates" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      <div className="absolute top-1/4 -right-32 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-900/40 border border-purple-500/20 backdrop-blur-sm mb-6">
            <span className="text-sm font-medium text-purple-300">Latest Updates</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
            <span className="text-foreground">Stay in the</span>
            <br />
            <span className="text-gradient">Loop</span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground mb-6">
            Get the latest news, updates, and announcements directly from the Amethyst team on Nostr.
          </p>

          {/* Follow Link */}
          <div className="flex items-center justify-center gap-4">
            <a
              href={`https://njump.me/${AMETHYST_NPUB}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="gap-2">
                <ExternalLink className="w-4 h-4" />
                Follow @Amethyst
              </Button>
            </a>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => refetch()}
              disabled={isFetching}
              className={isFetching ? 'animate-spin' : ''}
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Updates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <>
              <UpdateSkeleton />
              <UpdateSkeleton />
              <UpdateSkeleton />
              <UpdateSkeleton />
              <UpdateSkeleton />
              <UpdateSkeleton />
            </>
          ) : error ? (
            <div className="col-span-full">
              <Card className="border-dashed border-destructive/50">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground mb-4">
                    Unable to load updates. Please check your connection.
                  </p>
                  <Button variant="outline" onClick={() => refetch()}>
                    Try Again
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : updates && updates.length > 0 ? (
            updates.map((event) => (
              <UpdateCard key={event.id} event={event} profile={profile} />
            ))
          ) : (
            <div className="col-span-full">
              <Card className="border-dashed">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">
                    No updates found. Follow Amethyst on Nostr for the latest news!
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* View More Link */}
        {updates && updates.length > 0 && (
          <div className="text-center mt-10">
            <a
              href={`https://njump.me/${AMETHYST_NPUB}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg" className="gap-2">
                View All Updates on Nostr
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
