import { useNostr } from '@nostrify/react';
import { useQuery } from '@tanstack/react-query';
import { nip19 } from 'nostr-tools';

// Amethyst's npub
export const AMETHYST_NPUB = 'npub142gywvjkq0dv6nupggyn2euhx4nduwc7yz5f24ah9rpmunr2s39se3xrj0';

// Decode npub to hex pubkey
const decoded = nip19.decode(AMETHYST_NPUB);
const AMETHYST_PUBKEY = decoded.type === 'npub' ? decoded.data : '';

export { AMETHYST_PUBKEY };

/**
 * Fetch updates (kind 1 notes) from Amethyst
 */
export function useAmethystUpdates(limit: number = 10) {
  const { nostr } = useNostr();

  return useQuery({
    queryKey: ['amethyst-updates', limit],
    queryFn: async (c) => {
      const signal = AbortSignal.any([c.signal, AbortSignal.timeout(10000)]);
      
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

/**
 * Fetch Amethyst's profile metadata
 */
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
