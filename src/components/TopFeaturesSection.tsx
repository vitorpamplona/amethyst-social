import { Shield, Radio, Eye, EyeOff, Server, Globe, Lock, Layers, ArrowRightLeft, Wifi, Network, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const topFeatures = [
  {
    id: 'tor',
    icon: Shield,
    badge: '#1 Privacy',
    title: 'Built-in TOR Support',
    subtitle: 'The most privacy-focused Nostr experience',
    description: 'Amethyst is the only Nostr client with native TOR integration. Route all your Nostr traffic through the Tor network to protect your IP address and location from relays and surveillance.',
    highlights: [
      { icon: EyeOff, text: 'Hide your IP address from all relays' },
      { icon: Globe, text: 'Access .onion relay addresses directly' },
      { icon: Lock, text: 'Circumvent network-level censorship' },
      { icon: Eye, text: 'No external apps or configuration required' },
    ],
    gradient: 'from-purple-600 to-violet-600',
    glowColor: 'purple',
  },
  {
    id: 'relays',
    icon: Radio,
    badge: 'Advanced',
    title: 'Complete Relay Control',
    subtitle: 'The most configurable relay system in any Nostr client',
    description: 'Take full control of your Nostr experience with granular relay configuration. Amethyst supports every relay type defined in NIP-65 and beyond, giving you unmatched flexibility.',
    highlights: [
      { icon: ArrowRightLeft, text: 'Inbox & Outbox relays (NIP-65)' },
      { icon: Server, text: 'DM, Private & Proxy relays' },
      { icon: Wifi, text: 'Search, Indexer & Broadcast relays' },
      { icon: Network, text: 'Local, Trusted & Blocked lists' },
    ],
    gradient: 'from-cyan-600 to-teal-600',
    glowColor: 'cyan',
  },
];

const relayTypes = [
  { name: 'Inbox', description: 'Receive mentions and replies', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
  { name: 'Outbox', description: 'Publish your notes', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
  { name: 'DM', description: 'Direct message relays', color: 'bg-pink-500/20 text-pink-300 border-pink-500/30' },
  { name: 'Private', description: 'Private inbox relays', color: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
  { name: 'Proxy', description: 'Route through proxy relays', color: 'bg-slate-500/20 text-slate-300 border-slate-500/30' },
  { name: 'Broadcast', description: 'Wide event distribution', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  { name: 'Indexer', description: 'Profile & event lookup', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  { name: 'Search', description: 'Full-text search (NIP-50)', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
  { name: 'Local', description: 'Community-specific relays', color: 'bg-orange-500/20 text-orange-300 border-orange-500/30' },
  { name: 'Trusted', description: 'Trusted relay sources', color: 'bg-green-500/20 text-green-300 border-green-500/30' },
  { name: 'Blocked', description: 'Blocked relay list', color: 'bg-red-500/20 text-red-300 border-red-500/30' },
];

export function TopFeaturesSection() {
  return (
    <section id="top-features" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-transparent to-purple-950/20" />
      <div className="absolute top-1/4 -left-64 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-64 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-900/40 border border-purple-500/20 backdrop-blur-sm mb-6">
            <Shield className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">What Sets Us Apart</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
            <span className="text-foreground">Industry-Leading</span>
            <br />
            <span className="text-gradient">Privacy & Control</span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground">
            Amethyst doesn't just support Nostr—it leads the ecosystem in privacy protection and relay customization.
            These aren't just features, they're fundamental to how we believe Nostr should work.
          </p>
        </div>

        {/* Top Features - Large Cards */}
        <div className="space-y-8 md:space-y-12">
          {topFeatures.map((feature, index) => (
            <Card
              key={feature.id}
              className="relative overflow-hidden border-purple-500/10 bg-purple-950/40 backdrop-blur-sm"
            >
              {/* Gradient Glow */}
              <div className={`absolute -top-32 ${index % 2 === 0 ? '-right-32' : '-left-32'} w-96 h-96 bg-gradient-to-br ${feature.gradient} opacity-10 rounded-full blur-3xl`} />

              <CardContent className="p-8 md:p-12 relative z-10">
                <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Content Side */}
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg`}>
                        <feature.icon className="w-7 h-7 text-white" />
                      </div>
                      <Badge className={`bg-gradient-to-r ${feature.gradient} text-white border-0 px-3 py-1`}>
                        {feature.badge}
                      </Badge>
                    </div>

                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-2 text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-lg text-primary font-medium mb-4">
                      {feature.subtitle}
                    </p>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                      {feature.description}
                    </p>

                    {/* Highlights */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      {feature.highlights.map((highlight) => (
                        <div key={highlight.text} className="flex items-start gap-3 group">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.gradient} bg-opacity-10 border border-${feature.glowColor}-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                            <highlight.icon className={`w-5 h-5 text-${feature.glowColor}-400`} />
                          </div>
                          <span className="text-sm text-muted-foreground pt-2">{highlight.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Visual Side */}
                  <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    {feature.id === 'tor' ? (
                      <TorVisual />
                    ) : (
                      <RelayVisual />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Relay Types Grid */}
        <div className="mt-16 md:mt-20">
          <h3 className="text-xl md:text-2xl font-serif font-semibold mb-8 text-center">
            Supported Relay Types
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {relayTypes.map((relay) => (
              <div
                key={relay.name}
                className="group relative"
              >
                <div className={`px-4 py-3 rounded-xl border ${relay.color} text-center transition-all hover:scale-105 hover:shadow-lg`}>
                  <span className="font-semibold text-sm">{relay.name}</span>
                </div>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-background/95 border border-purple-500/20 rounded-lg text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 backdrop-blur-sm">
                  {relay.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TorVisual() {
  return (
    <div className="relative">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-violet-600/10 rounded-3xl blur-2xl" />

      {/* Main visual container */}
      <div className="relative bg-purple-950/60 backdrop-blur-sm rounded-3xl border border-purple-500/20 p-8 overflow-hidden">
        {/* Animated network lines */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 400 300" fill="none">
            <path d="M50 150 Q 100 100 150 150 T 250 150 T 350 150" stroke="url(#tor-gradient)" strokeWidth="2" strokeDasharray="8 4" className="animate-pulse" />
            <path d="M50 170 Q 100 220 150 170 T 250 170 T 350 170" stroke="url(#tor-gradient)" strokeWidth="2" strokeDasharray="8 4" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
            <path d="M50 130 Q 100 80 150 130 T 250 130 T 350 130" stroke="url(#tor-gradient)" strokeWidth="2" strokeDasharray="8 4" className="animate-pulse" style={{ animationDelay: '1s' }} />
            <defs>
              <linearGradient id="tor-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9333ea" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center space-y-6">
          {/* TOR Network visualization */}
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full bg-purple-600/20 border-2 border-purple-500/40 flex items-center justify-center">
              <span className="text-2xl">📱</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500 animate-ping" />
              <div className="w-12 h-0.5 bg-gradient-to-r from-purple-500 to-violet-500" />
            </div>

            <div className="w-12 h-12 rounded-full bg-violet-600/30 border border-violet-500/40 flex items-center justify-center animate-pulse">
              <Lock className="w-5 h-5 text-violet-400" />
            </div>

            <div className="w-12 h-0.5 bg-gradient-to-r from-violet-500 to-purple-500" />

            <div className="w-12 h-12 rounded-full bg-violet-600/30 border border-violet-500/40 flex items-center justify-center animate-pulse" style={{ animationDelay: '0.3s' }}>
              <Lock className="w-5 h-5 text-violet-400" />
            </div>

            <div className="w-12 h-0.5 bg-gradient-to-r from-purple-500 to-violet-500" />

            <div className="w-12 h-12 rounded-full bg-violet-600/30 border border-violet-500/40 flex items-center justify-center animate-pulse" style={{ animationDelay: '0.6s' }}>
              <Lock className="w-5 h-5 text-violet-400" />
            </div>

            <div className="flex items-center gap-2">
              <div className="w-12 h-0.5 bg-gradient-to-r from-violet-500 to-purple-500" />
              <div className="w-3 h-3 rounded-full bg-purple-500 animate-ping" style={{ animationDelay: '0.5s' }} />
            </div>

            <div className="w-16 h-16 rounded-full bg-purple-600/20 border-2 border-purple-500/40 flex items-center justify-center">
              <Server className="w-7 h-7 text-purple-400" />
            </div>
          </div>

          {/* Labels */}
          <div className="flex justify-between px-4">
            <span className="text-sm text-purple-300">Your Device</span>
            <span className="text-sm text-violet-300">TOR Network (3 Hops)</span>
            <span className="text-sm text-purple-300">Relay</span>
          </div>

          {/* Privacy indicator */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-900/30 border border-green-500/30">
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-300">IP Address Hidden</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function RelayVisual() {
  return (
    <div className="relative">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 to-teal-600/10 rounded-3xl blur-2xl" />

      {/* Main visual container */}
      <div className="relative bg-purple-950/60 backdrop-blur-sm rounded-3xl border border-cyan-500/20 p-8 overflow-hidden">
        {/* Relay Configuration Preview */}
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20">
            <div className="flex items-center gap-3">
              <Layers className="w-5 h-5 text-cyan-400" />
              <span className="font-semibold text-foreground">Relay Configuration</span>
            </div>
            <Badge variant="outline" className="border-cyan-500/30 text-cyan-300">NIP-65</Badge>
          </div>

          {/* Relay List */}
          <div className="space-y-3">
            <RelayRow
              name="relay.damus.io"
              types={['Inbox', 'Outbox']}
              status="connected"
            />
            <RelayRow
              name="relay.snort.social"
              types={['DM', 'Private']}
              status="connected"
            />
            <RelayRow
              name="relay.nostr.band"
              types={['Search', 'Indexer']}
              status="connected"
            />
            <RelayRow
              name="nostr.wine"
              types={['Broadcast', 'Trusted']}
              status="connected"
            />
            <RelayRow
              name="umbrel.local:4848"
              types={['Local', 'Proxy']}
              status="connecting"
            />
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between pt-4 border-t border-cyan-500/20 text-sm">
            <span className="text-muted-foreground">11 relay types supported</span>
            <span className="text-green-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              4 connected
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function RelayRow({ name, types, status }: { name: string; types: string[]; status: 'connected' | 'connecting' | 'disconnected' }) {
  const statusColors = {
    connected: 'bg-green-500',
    connecting: 'bg-amber-500 animate-pulse',
    disconnected: 'bg-red-500',
  };

  const typeColors: Record<string, string> = {
    'Inbox': 'bg-purple-500/20 text-purple-300',
    'Outbox': 'bg-cyan-500/20 text-cyan-300',
    'DM': 'bg-pink-500/20 text-pink-300',
    'Private': 'bg-rose-500/20 text-rose-300',
    'Proxy': 'bg-slate-500/20 text-slate-300',
    'Broadcast': 'bg-blue-500/20 text-blue-300',
    'Search': 'bg-amber-500/20 text-amber-300',
    'Indexer': 'bg-emerald-500/20 text-emerald-300',
    'Local': 'bg-orange-500/20 text-orange-300',
    'Trusted': 'bg-green-500/20 text-green-300',
    'Blocked': 'bg-red-500/20 text-red-300',
  };

  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-background/30 border border-purple-500/10">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${statusColors[status]}`} />
        <span className="text-sm font-mono text-foreground">{name}</span>
      </div>
      <div className="flex gap-2">
        {types.map((type) => (
          <span
            key={type}
            className={`text-xs px-2 py-0.5 rounded-full ${typeColors[type] || 'bg-gray-500/20 text-gray-300'}`}
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
}
