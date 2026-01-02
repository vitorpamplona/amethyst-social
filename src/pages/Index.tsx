import { useSeoMeta } from '@unhead/react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { TopFeaturesSection } from '@/components/TopFeaturesSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { ScreenshotsSection } from '@/components/ScreenshotsSection';
import { UpdatesSection } from '@/components/UpdatesSection';
import { DownloadSection } from '@/components/DownloadSection';
import { ObtainiumGuide } from '@/components/ObtainiumGuide';
import { Footer } from '@/components/Footer';

const Index = () => {
  useSeoMeta({
    title: 'Amethyst - Nostr Client for Android',
    description: 'The #1 privacy-focused Nostr client for Android. Built-in TOR support, complete NIP-65 relay control, encrypted messaging, zaps, live streams, and more.',
    ogTitle: 'Amethyst - Nostr Client for Android',
    ogDescription: 'The #1 privacy-focused Nostr client. Built-in TOR, complete relay control, and 100+ NIPs supported.',
    ogImage: 'https://amethyst-social.shakespeare.wtf/amethyst-hero.webp',
    twitterCard: 'summary_large_image',
  });

  return (
    <div className="min-h-screen bg-hero-gradient">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <TopFeaturesSection />
        <FeaturesSection />
        <ScreenshotsSection />
        <UpdatesSection />
        <DownloadSection />
        <ObtainiumGuide />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
