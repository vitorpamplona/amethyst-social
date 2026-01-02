import { useNostr } from '@nostrify/react';
import { useQuery } from '@tanstack/react-query';
import type { NostrEvent } from '@nostrify/nostrify';

// Amethyst's npub: npub142gywvjkq0dv6nupggyn2euhx4nduwc7yz5f24ah9rpmunr2s39se3xrj0
// Converted to hex pubkey
const AMETHYST_PUBKEY = 'aa904e64960f6b34f811040935e79a9b41d6e3bc412a256bd72a30ef8cd5044a';

export function useAmethystUpdates(limit: number = 10) {
  const { nostr } = useNostr();

  return useQuery({
    queryKey: ['amethyst-updates', limit],
    queryFn: async (c) => {
      const signal = AbortSignal.any([c.signal, AbortSignal.timeout(5000)]);
      
      const events = await nostr.query([
        {
          kinds: [1],
          authors: [AMETHYST_PUBKEY],
          limit,
        }
      ], { signal });

      // Sort by created_at descending (most recent first)
      return events.sort((a, b) => b.created_at - a.created_at);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useAmethystProfile() {
  const { nostr } = useNostr();

  return useQuery({
    queryKey: ['amethyst-profile'],
    queryFn: async (c) => {
      const signal = AbortSignal.any([c.signal, AbortSignal.timeout(5000)]);
      
      const events = await nostr.query([
        {
          kinds: [0],
          authors: [AMETHYST_PUBKEY],
          limit: 1,
        }
      ], { signal });

      if (events.length > 0) {
        try {
          return JSON.parse(events[0].content);
        } catch {
          return null;
        }
      }
      return null;
    },
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
}

export const AMETHYST_NPUB = 'npub142gywvjkq0dv6nupggyn2euhx4nduwc7yz5f24ah9rpmunr2s39se3xrj0';
export { AMETHYST_PUBKEY };
