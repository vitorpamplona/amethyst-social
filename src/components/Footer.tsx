import { Github, ExternalLink, Heart } from 'lucide-react';
import { AMETHYST_NPUB } from '@/hooks/useAmethystUpdates';

const footerLinks = {
  resources: [
    { label: 'Documentation', href: 'https://github.com/vitorpamplona/amethyst#readme' },
    { label: 'Releases', href: 'https://github.com/vitorpamplona/amethyst/releases' },
    { label: 'Report Issues', href: 'https://github.com/vitorpamplona/amethyst/issues' },
    { label: 'Contribute', href: 'https://github.com/vitorpamplona/amethyst/pulls' },
  ],
  community: [
    { label: 'Nostr Profile', href: `https://njump.me/${AMETHYST_NPUB}` },
    { label: 'GitHub', href: 'https://github.com/vitorpamplona/amethyst' },
    { label: 'Translations', href: 'https://crowdin.com/project/amethyst-social' },
  ],
  nostr: [
    { label: 'What is Nostr?', href: 'https://nostr.com' },
    { label: 'Nostr Resources', href: 'https://nostr.how' },
    { label: 'Nostr Apps', href: 'https://nostrapps.com' },
  ],
};

export function Footer() {
  return (
    <footer className="relative bg-purple-950/50 border-t border-purple-500/20">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-3 mb-4 group">
              <img
                src="/amethyst-logo.jpg"
                alt="Amethyst"
                className="w-10 h-10 rounded-xl transition-transform group-hover:scale-110"
              />
              <span className="font-serif text-xl font-bold text-gradient">
                Amethyst
              </span>
            </a>

            <p className="text-muted-foreground mb-6">
              The social network you control. A beautiful, feature-rich Nostr client for Android.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://github.com/vitorpamplona/amethyst"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-purple-900/50 border border-purple-500/20 flex items-center justify-center hover:border-purple-400 hover:text-purple-400 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={`https://njump.me/${AMETHYST_NPUB}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-purple-900/50 border border-purple-500/20 flex items-center justify-center hover:border-purple-400 hover:text-purple-400 transition-colors"
              >
                <span className="font-bold text-sm">N</span>
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5 group"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <ul className="space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5 group"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Learn About Nostr</h4>
            <ul className="space-y-3">
              {footerLinks.nostr.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5 group"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-purple-500/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} Amethyst. Open source under MIT License.
            </p>

            <div className="flex items-center gap-1">
              <span>Vibed with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>using</span>
              <a
                href="https://shakespeare.diy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                Shakespeare
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
