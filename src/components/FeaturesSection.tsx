import {
  MessageSquare,
  Zap,
  Radio,
  Users,
  Shield,
  Image,
  Bell,
  Languages,
  Key,
  FileText,
  Video,
  Music,
  Award,
  Hash,
  Send,
  Camera,
  Search,
  UserPlus,
  CheckCircle2,
  Wallet
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const featureCategories = [
  {
    title: 'Social & Communication',
    features: [
      { icon: MessageSquare, name: 'Private DMs', description: 'NIP-04 & NIP-17 encrypted messaging', badge: 'Encrypted' },
      { icon: Send, name: 'Public Chats', description: 'Join NIP-28 public chat rooms' },
      { icon: Users, name: 'Communities', description: 'NIP-72 moderated communities' },
      { icon: UserPlus, name: 'Follow Lists', description: 'Organize who you follow' },
    ],
  },
  {
    title: 'Payments & Zaps',
    features: [
      { icon: Zap, name: 'Lightning Zaps', description: 'Send and receive Bitcoin tips', badge: 'NIP-57' },
      { icon: Shield, name: 'Private Zaps', description: 'Anonymous Bitcoin tipping' },
      { icon: Wallet, name: 'Wallet Connect', description: 'NIP-47 wallet integration' },
    ],
  },
  {
    title: 'Media & Content',
    features: [
      { icon: Radio, name: 'Live Streams', description: 'Watch and host NIP-53 live events', badge: 'Live' },
      { icon: Video, name: 'Video Events', description: 'NIP-71 video support' },
      { icon: Image, name: 'Media Previews', description: 'Rich image and video previews' },
      { icon: FileText, name: 'Long-form Content', description: 'Read NIP-23 articles' },
      { icon: Music, name: 'Audio Tracks', description: 'Zapstr.live integration' },
      { icon: Camera, name: 'In-app Capture', description: 'Take photos and videos directly' },
    ],
  },
  {
    title: 'Identity & Security',
    features: [
      { icon: Key, name: 'Multi-Account', description: 'Manage multiple identities' },
      { icon: CheckCircle2, name: 'NIP-05 Verification', description: 'DNS-based identity verification' },
      { icon: Shield, name: 'Secure Storage', description: 'Keys stored in Android KeyStore' },
      { icon: Award, name: 'Badges', description: 'NIP-58 achievement badges' },
    ],
  },
  {
    title: 'Discovery & Organization',
    features: [
      { icon: Hash, name: 'Hashtag Following', description: 'Follow topics that interest you' },
      { icon: Search, name: 'Relay Search', description: 'NIP-50 full-text search' },
      { icon: Bell, name: 'Push Notifications', description: 'Google & Unified Push support' },
      { icon: Languages, name: 'Auto Translation', description: 'In-device language translation' },
    ],
  },
];

const highlightedNIPs = [
  'NIP-01', 'NIP-02', 'NIP-04', 'NIP-05', 'NIP-06', 'NIP-09', 'NIP-10', 'NIP-17',
  'NIP-18', 'NIP-19', 'NIP-23', 'NIP-25', 'NIP-28', 'NIP-30', 'NIP-36', 'NIP-37',
  'NIP-42', 'NIP-44', 'NIP-47', 'NIP-50', 'NIP-51', 'NIP-53', 'NIP-56', 'NIP-57',
  'NIP-58', 'NIP-59', 'NIP-71', 'NIP-72', 'NIP-89', 'NIP-90', 'NIP-94', 'NIP-96',
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 md:py-32 relative overflow-hidden bg-purple-950/30">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      <div className="absolute -top-48 -right-48 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-900/40 border border-purple-500/20 backdrop-blur-sm mb-6">
            <span className="text-sm font-medium text-purple-300">Packed with Features</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
            <span className="text-foreground">Everything You Need,</span>
            <br />
            <span className="text-gradient">Nothing You Don't</span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground">
            From encrypted messaging to live streaming, Amethyst supports an extensive range of Nostr
            Implementation Possibilities (NIPs) to give you the complete experience.
          </p>
        </div>

        {/* Feature Categories */}
        <div className="space-y-12 md:space-y-16">
          {featureCategories.map((category, categoryIndex) => (
            <div key={category.title}>
              <h3 className="text-xl md:text-2xl font-serif font-semibold mb-6 text-center md:text-left">
                {category.title}
              </h3>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {category.features.map((feature, featureIndex) => (
                  <Card
                    key={feature.name}
                    className="group relative overflow-hidden border-purple-500/10 bg-purple-950/50 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
                    style={{ animationDelay: `${(categoryIndex * 0.1) + (featureIndex * 0.05)}s` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <CardContent className="p-5 relative z-10">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600/20 to-cyan-600/10 border border-purple-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <feature.icon className="w-5 h-5 text-purple-400" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                              {feature.name}
                            </h4>
                            {feature.badge && (
                              <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-0">
                                {feature.badge}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* NIP Support Badge Cloud */}
        <div className="mt-16 md:mt-20 text-center">
          <h3 className="text-lg font-semibold mb-6 text-muted-foreground">
            Extensive NIP Support
          </h3>

          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {highlightedNIPs.map((nip) => (
              <Badge
                key={nip}
                variant="outline"
                className="px-3 py-1 text-sm font-mono hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
              >
                {nip}
              </Badge>
            ))}
            <Badge
              variant="outline"
              className="px-3 py-1 text-sm font-mono bg-primary/10 text-primary border-primary/30"
            >
              + many more
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
