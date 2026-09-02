import React, { useState } from 'react';
import { siteData } from './data/siteData';

// Components
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import VisionSpotlight from './components/VisionSpotlight';
import ThreePillars from './components/ThreePillars';
import ReportsSection from './components/ReportsSection';
import FoundersSection from './components/FoundersSection';
import InfographicsSection from './components/InfographicsSection';
import SocialFeed from './components/SocialFeed';
import JoinUsCTA from './components/JoinUsCTA';
import Footer from './components/Footer';

// Modals
import SearchModal from './components/SearchModal';
import LightboxModal from './components/LightboxModal';
import InquiryModal from './components/InquiryModal';

export default function App() {
  // Modal states
  const [searchOpen, setSearchOpen] = useState(false);
  const [lightboxModal, setLightboxModal] = useState({ isOpen: false, image: '', title: '', subtitle: '' });
  const [inquiryModal, setInquiryModal] = useState({ isOpen: false, initialType: 'Legal Aid & Grievance' });

  // Handlers
  const handleOpenLightbox = (image, title, subtitle) => {
    setLightboxModal({ isOpen: true, image, title, subtitle });
  };

  const handleOpenInquiry = (initialType = 'Legal Aid & Grievance') => {
    setInquiryModal({ isOpen: true, initialType });
  };

  return (
    <div className="app-layout">
      {/* 1. Navigation Header */}
      <Header 
        navMenu={siteData.navMenu}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenInquiry={() => handleOpenInquiry('Legal Aid & Grievance')}
      />

      {/* 2. Hero Carousel Slider */}
      <HeroSlider slides={siteData.heroSlides} />

      {/* 3. Vision & Spotlight Section */}
      <VisionSpotlight data={siteData.spotlight} />

      {/* 4. Three Impact Pillars (Who We Are, What We Do, Where We Work) */}
      <ThreePillars pillars={siteData.threePillars} />

      {/* 5. Reports & Knowledge Hub */}
      <ReportsSection reports={siteData.reports} />

      {/* 6. Founders & Leadership */}
      <FoundersSection founders={siteData.founders} />

      {/* 7. Human Rights Infographics */}
      <InfographicsSection 
        infographics={siteData.infographics}
        onOpenLightbox={handleOpenLightbox}
      />

      {/* 8. Social Feed & Field Stories */}
      <SocialFeed feed={siteData.socialFeed} />

      {/* 9. Come Join Us CTA */}
      <JoinUsCTA 
        joinUs={siteData.joinUs} 
        onOpenInquiry={handleOpenInquiry}
      />

      {/* 10. Footer */}
      <Footer 
        org={siteData.org}
        navMenu={siteData.navMenu}
      />

      {/* Interactive Overlays */}
      <SearchModal 
        isOpen={searchOpen} 
        onClose={() => setSearchOpen(false)} 
      />

      <LightboxModal 
        isOpen={lightboxModal.isOpen}
        onClose={() => setLightboxModal({ ...lightboxModal, isOpen: false })}
        image={lightboxModal.image}
        title={lightboxModal.title}
        subtitle={lightboxModal.subtitle}
      />

      <InquiryModal 
        isOpen={inquiryModal.isOpen}
        onClose={() => setInquiryModal({ ...inquiryModal, isOpen: false })}
        initialType={inquiryModal.initialType}
      />
    </div>
  );
}
