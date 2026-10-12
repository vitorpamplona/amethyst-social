export const REPO_URL = 'https://github.com/vitorpamplona/amethyst';
export const RELEASES_URL = `${REPO_URL}/releases/latest`;
export const LATEST_RELEASE_API = 'https://api.github.com/repos/vitorpamplona/amethyst/releases/latest';
export const ZAPSTORE_URL = 'https://zapstore.dev/apps/com.vitorpamplona.amethyst';
export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.vitorpamplona.amethyst';
export const OBTAINIUM_URL = 'https://github.com/ImranR98/Obtainium';
export const APK_SIGNATURE_URL = `${REPO_URL}#verifying-the-apk-signature`;
export const AMETHYST_NPUB = 'npub142gywvjkq0dv6nupggyn2euhx4nduwc7yz5f24ah9rpmunr2s39se3xrj0';

export type Platform = 'android' | 'mac' | 'windows' | 'linux';
export type DetectedPlatform = Platform | 'ios';

export const PLATFORMS: { id: Platform; label: string }[] = [
  { id: 'android', label: 'Android' },
  { id: 'mac', label: 'macOS' },
  { id: 'windows', label: 'Windows' },
  { id: 'linux', label: 'Linux' },
];

export interface ReleaseAsset {
  name: string;
  size: number;
  browser_download_url: string;
}

export interface Release {
  tag_name: string;
  html_url: string;
  published_at: string;
  assets: ReleaseAsset[];
}

/** A file from the latest release, or the release page when the file can't be found. */
export interface DownloadLink {
  href: string;
  /** File size in bytes, when the release data has loaded. */
  size?: number;
}

/**
 * Reads the platform from the user agent. iPadOS asks for desktop sites, so it reports
 * itself as a Mac; a touch screen is what tells the two apart.
 */
export function detectPlatform(userAgent: string, maxTouchPoints = 0): DetectedPlatform {
  if (/Android/i.test(userAgent)) return 'android';
  if (/iPhone|iPad|iPod/i.test(userAgent)) return 'ios';
  if (/Macintosh|Mac OS X/i.test(userAgent)) return maxTouchPoints > 1 ? 'ios' : 'mac';
  if (/Windows/i.test(userAgent)) return 'windows';
  if (/Linux|X11|CrOS/i.test(userAgent)) return 'linux';
  return 'android';
}

const FILES = {
  apk: /^amethyst-fdroid-arm64-v8a-v.+\.apk$/,
  dmg: /^amethyst-desktop-.+-macos-arm64\.dmg$/,
  msi: /^amethyst-desktop-.+-windows-x64\.msi$/,
  zipX64: /^amethyst-desktop-.+-windows-x64\.zip$/,
  zipArm64: /^amethyst-desktop-.+-windows-arm64\.zip$/,
  debX64: /^amethyst-desktop-.+-linux-x64\.deb$/,
  debArm64: /^amethyst-desktop-.+-linux-arm64\.deb$/,
  rpmX64: /^amethyst-desktop-.+-linux-x64\.rpm$/,
  rpmArm64: /^amethyst-desktop-.+-linux-arm64\.rpm$/,
  appImageX64: /^amethyst-desktop-.+-x86_64\.AppImage$/,
  appImageArm64: /^amethyst-desktop-.+-aarch64\.AppImage$/,
  flatpakX64: /^amethyst-desktop-.+-linux-x64\.flatpak$/,
  flatpakArm64: /^amethyst-desktop-.+-linux-arm64\.flatpak$/,
  tarX64: /^amethyst-desktop-.+-linux-x64\.tar\.gz$/,
  tarArm64: /^amethyst-desktop-.+-linux-arm64\.tar\.gz$/,
};

export type FileKey = keyof typeof FILES;

/**
 * Release files carry the version in their names, so the links come from the latest
 * release's asset list. Anything missing falls back to the release page.
 */
export function resolveDownloads(release: Release | null): Record<FileKey, DownloadLink> {
  const fallback = release?.html_url ?? RELEASES_URL;
  const links = {} as Record<FileKey, DownloadLink>;
  for (const key of Object.keys(FILES) as FileKey[]) {
    const asset = release?.assets.find((a) => FILES[key].test(a.name));
    links[key] = asset ? { href: asset.browser_download_url, size: asset.size } : { href: fallback };
  }
  return links;
}

export function formatSize(bytes: number | undefined): string | undefined {
  if (!bytes) return undefined;
  return `${Math.round(bytes / 1e6)} MB`;
}
