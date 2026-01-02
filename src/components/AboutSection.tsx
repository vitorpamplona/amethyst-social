import { Users, Lock, Globe, Code, Heart, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const aboutPoints = [
  {
    icon: Shield,
    title: 'Privacy by Design',
    description: 'Native TOR integration hides your IP address. End-to-end encrypted DMs. Your digital footprint stays invisible.',
  },
  {
    icon: Globe,
    title: 'Decentralized',
    description: 'Connect to any Nostr relay. Your data lives across a distributed network, not controlled by any single company.',
  },
  {
    icon: Lock,
    title: 'Total Relay Control',
    description: 'Configure every relay type: inbox, outbox, DM, search, indexer, and broadcaster. No other client offers this level of control.',
  },
  {
    icon: Users,
    title: 'Censorship Resistant',
    description: 'No central authority can silence you. Your voice, your content, your network—accessible even through TOR.',
  },
  {
    icon: Code,
    title: 'Open Source',
    description: 'Fully transparent codebase. Audit it, contribute to it, or fork it. Built by the community, for the community.',
  },
  {
    icon: Heart,
    title: 'User Owned',
    description: 'Your identity belongs to you. Take your followers, content, and reputation anywhere.',
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-900/40 border border-purple-500/20 backdrop-blur-sm mb-6">
            <span className="text-sm font-medium text-purple-300">About Amethyst</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
            <span className="text-foreground">Social Media,</span>
            <br />
            <span className="text-gradient">Reimagined</span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground">
            Amethyst brings the power of Nostr to your Android device. Experience a social network
            where you own your data, control your identity, and connect with others on your terms.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {aboutPoints.map((point, index) => (
            <Card
              key={point.title}
              className="group relative overflow-hidden border-purple-500/10 bg-purple-950/40 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <CardContent className="p-6 md:p-8 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600/20 to-cyan-600/10 border border-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <point.icon className="w-7 h-7 text-purple-400" />
                </div>

                <h3 className="text-xl font-serif font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {point.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  {point.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Quote */}
        <div className="mt-16 md:mt-20 text-center">
          <blockquote className="max-w-2xl mx-auto">
            <p className="text-xl md:text-2xl font-serif italic text-muted-foreground">
              "The social network you control is not just a product—it's a movement toward digital sovereignty."
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
