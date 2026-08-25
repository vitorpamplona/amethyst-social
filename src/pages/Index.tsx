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
