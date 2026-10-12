import { Heart } from 'lucide-react';
import { AMETHYST_NPUB, APK_SIGNATURE_URL, REPO_URL } from '@/lib/downloads';

const links = [
  { label: 'Source code', href: REPO_URL },
  { label: 'Follow on Nostr', href: `https://njump.me/${AMETHYST_NPUB}` },
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
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
              {link.label}
            </a>
          ))}
        </nav>
        <p className="flex flex-wrap items-center justify-center gap-1">
          <span>MIT License.</span>
          <span>Vibed with</span>
          <Heart className="h-4 w-4 fill-current text-red-500" aria-label="love" />
          <span>using</span>
          <a href="https://shakespeare.diy" target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">
            Shakespeare
          </a>
        </p>
      </div>
    </footer>
  );
}
