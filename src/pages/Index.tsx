import { useSeoMeta } from '@unhead/react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { UpdatesSection } from '@/components/UpdatesSection';
import { DownloadSection } from '@/components/DownloadSection';
import { ObtainiumGuide } from '@/components/ObtainiumGuide';
import { Footer } from '@/components/Footer';

const Index = () => {
  useSeoMeta({
    title: 'Amethyst - Nostr Client for Android',
    description: 'Join the social network you control. Amethyst is a beautiful, feature-rich Nostr client for Android with support for private messages, zaps, live streams, and more.',
    ogTitle: 'Amethyst - Nostr Client for Android',
    ogDescription: 'Join the social network you control. The most feature-rich Nostr client for Android.',
    ogImage: '/amethyst-hero.webp',
    twitterCard: 'summary_large_image',
  });

  return (
    <div className="min-h-screen bg-hero-gradient">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <UpdatesSection />
        <DownloadSection />
        <ObtainiumGuide />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
