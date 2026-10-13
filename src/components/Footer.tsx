import { AMETHYST_NPUB, APK_SIGNATURE_URL, REPO_URL, profileUrl } from '@/lib/downloads';
import { publicUrl } from '@/lib/utils';

const links = [
  { label: 'Supporters', href: publicUrl('thanks'), internal: true },
  { label: 'Source code', href: REPO_URL },
  { label: 'Follow on Nostr', href: profileUrl(AMETHYST_NPUB) },
  { label: 'Verify the APK signature', href: APK_SIGNATURE_URL },
  { label: 'Translate', href: 'https://crowdin.com/project/amethyst-social' },
  { label: 'What is Nostr?', href: 'https://nostr.org/' },
];

export function Footer() {
  return (
    <footer className="border-t border-purple-500/20">
      <div className="container mx-auto flex flex-col items-center gap-4 px-4 py-8 text-sm text-muted-foreground">
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...('internal' in link ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
              className="hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <p>MIT License.</p>
      </div>
    </footer>
  );
}
