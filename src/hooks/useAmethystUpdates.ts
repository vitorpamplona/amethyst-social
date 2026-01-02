import { useNostr } from '@nostrify/react';
import { useQuery } from '@tanstack/react-query';
import type { NostrEvent } from '@nostrify/nostrify';

// Amethyst's npub: npub142gywvjkq0dv6nupggyn2euhx4nduwc7yz5f24ah9rpmunr2s39se3xrj0
// Converted to hex pubkey
const AMETHYST_PUBKEY = 'aa904e64960f6b34f811040935e79a9b41d6e3bc412a256bd72a30ef8cd5044a';

export const AMETHYST_NPUB = 'npub142gywvjkq0dv6nupggyn2euhx4nduwc7yz5f24ah9rpmunr2s39se3xrj0';
export { AMETHYST_PUBKEY };

/**
 * Parse NIP-65 relay list event to extract write relays (outbox)
 */
function parseRelayList(event: NostrEvent): string[] {
  const writeRelays: string[] = [];

  for (const tag of event.tags) {
    if (tag[0] === 'r' && tag[1]) {
      const url = tag[1];
      const marker = tag[2];

      // Include relay if it's a write relay or has no marker (both read/write)
      if (!marker || marker === 'write') {
        writeRelays.push(url);
      }
    }
  }

  return writeRelays;
}

/**
 * Fetch Amethyst's NIP-65 relay list to find their outbox relays
 */
export function useAmethystRelays() {
  const { nostr } = useNostr();

  return useQuery({
    queryKey: ['amethyst-relays'],
    queryFn: async (c) => {
      const signal = AbortSignal.any([c.signal, AbortSignal.timeout(5000)]);

      // Query for NIP-65 relay list (kind 10002)
      const events = await nostr.query([
        {
          kinds: [10002],
          authors: [AMETHYST_PUBKEY],
          limit: 1,
        }
      ], { signal });

      if (events.length > 0) {
        const relays = parseRelayList(events[0]);
        // Return found relays, or fallback to defaults if empty
        if (relays.length > 0) {
          return relays;
        }
      }

      // Fallback relays if no NIP-65 found
      return [
        'wss://relay.damus.io',
        'wss://nos.lol',
        'wss://relay.primal.net',
      ];
    },
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
}

/**
 * Fetch updates (kind 1 notes) from Amethyst using their outbox relays
 */
export function useAmethystUpdates(limit: number = 10) {
  const { nostr } = useNostr();
  const { data: outboxRelays, isLoading: relaysLoading } = useAmethystRelays();

  return useQuery({
    queryKey: ['amethyst-updates', limit, outboxRelays],
    queryFn: async (c) => {
      const signal = AbortSignal.any([c.signal, AbortSignal.timeout(8000)]);

      // Use the outbox relays to query for updates
      if (outboxRelays && outboxRelays.length > 0) {
        // Create a relay group from the outbox relays
        const relayGroup = nostr.group(outboxRelays);

        const events = await relayGroup.query([
          {
            kinds: [1],
            authors: [AMETHYST_PUBKEY],
            limit,
          }
        ], { signal });

        // Sort by created_at descending (most recent first)
        return events.sort((a, b) => b.created_at - a.created_at);
      }

      // Fallback to default pool if no outbox relays
      const events = await nostr.query([
        {
          kinds: [1],
          authors: [AMETHYST_PUBKEY],
          limit,
        }
      ], { signal });

      return events.sort((a, b) => b.created_at - a.created_at);
    },
    enabled: !relaysLoading,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Fetch Amethyst's profile metadata
 */
export function useAmethystProfile() {
  const { nostr } = useNostr();
  const { data: outboxRelays, isLoading: relaysLoading } = useAmethystRelays();

  return useQuery({
    queryKey: ['amethyst-profile', outboxRelays],
    queryFn: async (c) => {
      const signal = AbortSignal.any([c.signal, AbortSignal.timeout(5000)]);

      // Use the outbox relays to query for profile
      if (outboxRelays && outboxRelays.length > 0) {
        const relayGroup = nostr.group(outboxRelays);

        const events = await relayGroup.query([
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
      }

      // Fallback to default pool
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
    enabled: !relaysLoading,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
}
