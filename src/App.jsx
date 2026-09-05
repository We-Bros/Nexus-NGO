import React, { useState } from 'react';
import { siteData } from './data/siteData';

// Components
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import VisionSpotlight from './components/VisionSpotlight';
import ThreePillars from './components/ThreePillars';
import FoundersSection from './components/FoundersSection';
import JoinUsCTA from './components/JoinUsCTA';
import Footer from './components/Footer';

// Modals
import SearchModal from './components/SearchModal';
import InquiryModal from './components/InquiryModal';

export default function App() {
  // Modal states
  const [searchOpen, setSearchOpen] = useState(false);
  const [inquiryModal, setInquiryModal] = useState({ isOpen: false, initialType: 'General Inquiry' });

  // Handlers
  const handleOpenInquiry = (initialType = 'General Inquiry') => {
    setInquiryModal({ isOpen: true, initialType });
  };

  return (
    <div className="app-layout">
      {/* 1. Navigation Header */}
      <Header 
        navMenu={siteData.navMenu}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenInquiry={() => handleOpenInquiry('General Inquiry')}
      />

      {/* 2. Hero Carousel Slider */}
      <HeroSlider slides={siteData.heroSlides} />

      {/* 3. Vision & Spotlight Section */}
      <VisionSpotlight data={siteData.spotlight} />

      {/* 4. Three Impact Pillars (Who We Are, What We Do, Where We Work) */}
      <ThreePillars pillars={siteData.threePillars} />

      {/* 5. Founders & Leadership */}
      <FoundersSection founders={siteData.founders} />

      {/* 6. Come Join Us CTA */}
      <JoinUsCTA 
        joinUs={siteData.joinUs} 
        onOpenInquiry={handleOpenInquiry}
      />

      {/* 7. Footer */}
      <Footer 
        org={siteData.org}
        navMenu={siteData.navMenu}
      />

      {/* Interactive Overlays */}
      <SearchModal 
        isOpen={searchOpen} 
        onClose={() => setSearchOpen(false)} 
      />

      <InquiryModal 
        isOpen={inquiryModal.isOpen}
        onClose={() => setInquiryModal({ ...inquiryModal, isOpen: false })}
        initialType={inquiryModal.initialType}
      />
    </div>
  );
}
