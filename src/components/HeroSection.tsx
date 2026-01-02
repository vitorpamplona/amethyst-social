import { ArrowDown, Play, Smartphone, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-400/10 rounded-full blur-3xl" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(147,51,234,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-purple-200 dark:border-purple-800 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                Open Source Nostr Client
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <span className="block text-foreground">Join the Social</span>
              <span className="block text-gradient">Network You Control</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Amethyst is the most feature-rich Nostr client for Android. Experience decentralized social networking with private messages, zaps, live streams, and complete data ownership.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <a href="#download">
                <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg glow-purple">
                  <Play className="w-5 h-5 mr-2 fill-current" />
                  Get Amethyst
                </Button>
              </a>
              <a href="#features">
                <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 py-6 text-lg border-2">
                  Explore Features
                  <ArrowDown className="w-5 h-5 ml-2" />
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <Smartphone className="w-5 h-5 text-primary" />
                  <span className="text-2xl md:text-3xl font-bold text-foreground">100+</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">NIPs Supported</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="text-2xl md:text-3xl font-bold text-foreground">100%</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Open Source</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  <span className="text-2xl md:text-3xl font-bold text-foreground">⚡</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Zap Support</p>
              </div>
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="relative flex justify-center lg:justify-end animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-violet-500/30 blur-3xl rounded-3xl scale-90" />

              {/* Main Image */}
              <img
                src="/amethyst-hero.webp"
                alt="Amethyst App Screenshot"
                className="relative w-full max-w-md lg:max-w-lg rounded-3xl shadow-2xl"
              />

              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 p-4 bg-card rounded-2xl shadow-xl border border-border animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Private Zaps</p>
                    <p className="text-xs text-muted-foreground">Built-in support</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 p-4 bg-card rounded-2xl shadow-xl border border-border animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Encrypted DMs</p>
                    <p className="text-xs text-muted-foreground">NIP-17 Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#about" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <span className="text-sm font-medium">Scroll to explore</span>
          <ArrowDown className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
}
