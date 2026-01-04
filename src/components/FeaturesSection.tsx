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
  Wallet,
  MapPin,
  Highlighter,
  Store,
  Delete,
  Trash,
  LogOut,
  TrashIcon,
  Ghost,
  ShieldBan,
  CalendarCheck,
  PartyPopper,
  Link,
  Pencil
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
      { icon: UserPlus, name: 'Follow Lists', description: 'Organize follow lists and starter packs' },
      { icon: Award, name: 'Badges', description: 'NIP-58 achievement badges' },
      { icon: PartyPopper, name: 'Custom Reactions', description: 'Gifs and NIP-30 custom emojis' },
    ],
  },
  {
    title: 'Payments & Zaps',
    features: [
      { icon: Zap, name: 'Lightning Zaps', description: 'Send and receive Bitcoin tips', badge: 'NIP-57' },
      { icon: Store, name: 'Marketplace', description: 'Buy and sell your product' },
      { icon: Zap, name: 'Cashu Support', description: 'Redeem cashu tokens' },
      { icon: Shield, name: 'Private Zaps', description: 'Encrypted and anonymous Bitcoin tipping' },
      { icon: Wallet, name: 'Wallet Connect', description: 'NIP-47 wallet integration' },
      { icon: Zap, name: 'Zap Polls', description: 'Run V4V surveys with your followers' },
    ],
  },
  {
    title: 'Media & Content',
    features: [
      { icon: Radio, name: 'Live Streams', description: 'Watch and chat on live streams', badge: 'Live' },
      { icon: Video, name: 'Image and Video Feeds', description: 'NIP-71 and NIP-68 video support' },
      { icon: Image, name: 'Blossom and Media Servers', description: 'Sync your media among servers' },
      { icon: FileText, name: 'Long-form Content', description: 'Read articles and wiki pages' },
      { icon: Music, name: 'Audio Content', description: 'YakBaks and Voice Messages' },
      { icon: Camera, name: 'In-app Capture', description: 'Take photos and videos directly in the app' },
      { icon: Highlighter, name: 'Highlights', description: 'See NIP-84 snippets from your follows' },
      { icon: Link, name: 'Torrents', description: 'Torrent and Git Support' },
    ],
  },
  {
    title: 'Identity & Security',
    features: [
      { icon: Key, name: 'Multi-Account', description: 'Manage multiple identities' },
      { icon: CheckCircle2, name: 'NIP-05 Verification', description: 'DNS-based identity verification' },
      { icon: Shield, name: 'Secure Storage', description: 'Keys stored in Android KeyStore' },
      { icon: Trash, name: 'Deletion Requests', description: 'Delete your content anytime' },
      { icon: Ghost, name: 'Transient Accounts', description: 'Log in and out with an NFC tag' },
      { icon: ShieldBan, name: 'Proof of Work', description: 'NIP-13 accountability' },
      { icon: CalendarCheck, name: 'Proof of Existence', description: 'Open timestamp support' },
      { icon: Pencil, name: 'Drafts', description: 'Never lose a post' },
    ],
  },
  {
    title: 'Discovery & Organization',
    features: [
      { icon: Search, name: 'Algorithmic Feeds', description: 'NIP-90 Data Vending Machines' },
      { icon: Hash, name: 'Hashtag Following', description: 'Follow topics that interest you' },
      { icon: MapPin, name: 'Location Following', description: 'Follow discussions around you' },
      { icon: Search, name: 'Content Search', description: 'NIP-50 full-text search' },
      { icon: Bell, name: 'Push Notifications', description: 'Google & Unified Push support' },
      { icon: Languages, name: 'Auto Translation', description: 'In-device language translation' },
    ],
  },
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
            <span className="text-gradient">One Tap Away</span>
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
      </div>
    </section>
  );
}
