import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { OurServices } from './components/OurServices.tsx';
import { OurWorkGallery } from './components/OurWorkGallery.tsx';
import { ServicesSection, TextureService } from './components/ServicesSection.tsx';
import { InteractiveVisualizer } from './components/InteractiveVisualizer.tsx';
import { CostEstimator } from './components/CostEstimator.tsx';
import { DelhiHeritage } from './components/DelhiHeritage.tsx';
import { ReviewsSection } from './components/ReviewsSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { MobileQuickBar } from './components/MobileQuickBar.tsx';
import { TextureModal } from './components/TextureModal.tsx';
import { Footer } from './components/Footer.tsx';

export default function App() {
  const [selectedService, setSelectedService] = useState<TextureService | null>(null);

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F8F5EE] selection:bg-[#C9A24B] selection:text-[#0B0B0B]">
      {/* Top Sticky Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Our Services - 10 Core Finishes */}
      <OurServices />

      {/* Our Work / Gallery - 3 Curated Collections */}
      <OurWorkGallery />

      {/* Customer Reviews & Google Rating */}
      <ReviewsSection />

      {/* Architectural Texture Collection & Specifications */}
      <ServicesSection onSelectService={(service) => setSelectedService(service)} />

      {/* Interactive Texture & Light Visualizer */}
      <InteractiveVisualizer />

      {/* Kerala Area & Cost Estimator */}
      <CostEstimator />

      {/* Delhi Heritage Story & Muhammad Arif Artisan Focus */}
      <DelhiHeritage />

      {/* Direct Contact & Booking Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Mobile Floating 1-Tap Quick Action Bar */}
      <MobileQuickBar />

      {/* Texture Specifications Modal */}
      <TextureModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </div>
  );
}
