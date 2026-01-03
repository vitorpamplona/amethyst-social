import { Play, Github, Store, Smartphone, Shield, Zap, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const downloadOptions = [
  {
    name: 'Zapstore',
    description: 'Decentralized app store built on Nostr. Download apps without gatekeepers.',
    icon: Zap,
    href: 'https://zapstore.dev/',
    badge: 'Recommended',
    badgeVariant: 'default' as const,
    buttonText: 'Get on Zapstore',
    features: ['Nostr-native', 'No gatekeepers', 'Community verified'],
  },
  {
    name: 'Obtainium',
    description: 'Open-source app that helps you install and update apps directly from releases.',
    icon: Store,
    href: '#obtainium-guide',
    badge: 'Advanced',
    badgeVariant: 'outline' as const,
    buttonText: 'View Guide',
    features: ['Auto-updates from source', 'F-Droid alternative', 'Privacy focused'],
  },
  {
    name: 'Google Play',
    description: 'The official Google Play Store. Automatic updates and easy installation.',
    icon: Play,
    href: 'https://play.google.com/store/apps/details?id=com.vitorpamplona.amethyst',
    badge: 'Official',
    badgeVariant: 'secondary' as const,
    buttonText: 'Get on Play Store',
    features: ['Automatic updates', 'Easy installation', 'Play Protect verified'],
  },
  {
    name: 'GitHub Releases',
    description: 'Direct APK downloads from the official repository. Always get the latest version.',
    icon: Github,
    href: 'https://github.com/vitorpamplona/amethyst/releases',
    badge: 'Direct',
    badgeVariant: 'outline' as const,
    buttonText: 'Download APK',
    features: ['Latest releases', 'Source available', 'Full transparency'],
  }
];

export function DownloadSection() {
  return (
    <section id="download" className="py-24 md:py-32 relative overflow-hidden bg-purple-950/30">
      {/* Background */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-900/40 border border-purple-500/20 backdrop-blur-sm mb-6">
            <Smartphone className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">Download Now</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
            <span className="text-foreground">Get Amethyst</span>
            <br />
            <span className="text-gradient">Your Way</span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground">
            Choose how you want to install Amethyst. Whether you prefer the convenience of app stores
            or the freedom of direct downloads, we've got you covered.
          </p>
        </div>

        {/* Download Options Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {downloadOptions.map((option, index) => (
            <Card
              key={option.name}
              className="group relative overflow-hidden border-purple-500/10 bg-purple-950/50 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <CardHeader className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600/20 to-cyan-600/10 border border-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <option.icon className="w-7 h-7 text-purple-400" />
                  </div>
                  <Badge variant={option.badgeVariant} className={option.badgeVariant === 'default' ? 'bg-primary text-primary-foreground' : ''}>
                    {option.badge}
                  </Badge>
                </div>

                <CardTitle className="text-xl font-serif group-hover:text-primary transition-colors">
                  {option.name}
                </CardTitle>
                <CardDescription className="text-base">
                  {option.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="relative z-10 pt-0">
                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {option.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Shield className="w-4 h-4 text-primary shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Download Button */}
                <a
                  href={option.href}
                  target={option.href.startsWith('#') ? undefined : '_blank'}
                  rel={option.href.startsWith('#') ? undefined : 'noopener noreferrer'}
                  className="block"
                >
                  <Button
                    className="w-full gap-2 group/btn"
                    variant={option.badgeVariant === 'default' ? 'default' : 'outline'}
                  >
                    {option.buttonText}
                    <ExternalLink className="w-4 h-4 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Source Code Link */}
        <div className="text-center mt-8">
          <a
            href="https://github.com/vitorpamplona/amethyst"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <Github className="w-5 h-5" />
            <span>View Source Code on GitHub</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
