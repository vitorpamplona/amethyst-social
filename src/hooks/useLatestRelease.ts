import { useEffect, useState } from 'react';
import { LATEST_RELEASE_API, type Release } from '@/lib/downloads';

/**
 * Loads the latest GitHub release. Returns null until it arrives, and stays null if
 * the request fails (GitHub allows 60 unauthenticated requests per hour per IP), in
 * which case every download link points at the release page instead.
 */
export function useLatestRelease(): Release | null {
  const [release, setRelease] = useState<Release | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(LATEST_RELEASE_API, {
      headers: { Accept: 'application/vnd.github+json' },
      signal: controller.signal,
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: Release | null) => {
        if (data && Array.isArray(data.assets)) setRelease(data);
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  return release;
}
