import Header from '@/lib/components/layout/Header';
import HeroSection from '@/lib/components/landing/HeroSection';
import ServicesSection from '@/lib/components/landing/ServicesSection';
import Footer from '@/lib/components/layout/Footer';

export const metadata = {
  title: 'ApniSec - Enterprise Cybersecurity Solutions',
  description: 'Protect your digital assets with ApniSec advanced cybersecurity solutions.',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
      </main>
      <Footer />
    </div>
  );
}