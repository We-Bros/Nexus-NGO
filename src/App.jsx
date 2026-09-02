import React, { useState } from 'react';
import { siteData } from './data/siteData';

// Components
import TopMarquee from './components/TopMarquee';
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import VisionSpotlight from './components/VisionSpotlight';
import ThreePillars from './components/ThreePillars';
import PartnersSection from './components/PartnersSection';
import LatestUpdates from './components/LatestUpdates';
import ReportsSection from './components/ReportsSection';
import NewsAndVideo from './components/NewsAndVideo';
import FoundersSection from './components/FoundersSection';
import InfographicsSection from './components/InfographicsSection';
import SocialFeed from './components/SocialFeed';
import JoinUsCTA from './components/JoinUsCTA';
import QuoteSection from './components/QuoteSection';
import Footer from './components/Footer';

// Modals
import SearchModal from './components/SearchModal';
import VideoModal from './components/VideoModal';
import LightboxModal from './components/LightboxModal';
import InquiryModal from './components/InquiryModal';

export default function App() {
  // Modal states
  const [searchOpen, setSearchOpen] = useState(false);
  const [videoModal, setVideoModal] = useState({ isOpen: false, youtubeId: '', title: '' });
  const [lightboxModal, setLightboxModal] = useState({ isOpen: false, image: '', title: '', subtitle: '' });
  const [inquiryModal, setInquiryModal] = useState({ isOpen: false, initialType: 'Legal Aid & Grievance' });

  // Handlers
  const handleOpenVideo = (youtubeId, title) => {
    setVideoModal({ isOpen: true, youtubeId, title });
  };

  const handleOpenLightbox = (image, title, subtitle) => {
    setLightboxModal({ isOpen: true, image, title, subtitle });
  };

  const handleOpenInquiry = (initialType = 'Legal Aid & Grievance') => {
    setInquiryModal({ isOpen: true, initialType });
  };

  return (
    <div className="app-layout">
      {/* 1. Top Announcement Marquee */}
      <TopMarquee 
        text={siteData.marquee.text}
        link={siteData.marquee.link}
        badge={siteData.marquee.badge}
      />

      {/* 2. Navigation Header */}
      <Header 
        navMenu={siteData.navMenu}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenInquiry={() => handleOpenInquiry('Legal Aid & Grievance')}
      />

      {/* 3. Hero Carousel Slider */}
      <HeroSlider slides={siteData.heroSlides} />

      {/* 4. Vision & Spotlight Section with Featured Video */}
      <VisionSpotlight 
        data={siteData.spotlight} 
        onOpenVideo={handleOpenVideo}
      />

      {/* 5. Three Impact Pillars (Who We Are, What We Do, Where We Work) */}
      <ThreePillars pillars={siteData.threePillars} />

      {/* 6. Institutional Partnerships & Honors */}
      <PartnersSection partners={siteData.partners} />

      {/* 7. Latest Updates & Opportunities Banner */}
      <LatestUpdates 
        update={siteData.latestUpdate} 
        onOpenInquiry={handleOpenInquiry}
      />

      {/* 8. Reports & Knowledge Hub Section */}
      <ReportsSection 
        reports={siteData.reports}
      />

      {/* 9. In The News & Leadership Video */}
      <NewsAndVideo 
        data={siteData.newsAndVideo} 
        onOpenVideo={handleOpenVideo}
      />

      {/* 10. Founders & Strategic Leadership with YouTube Addresses */}
      <FoundersSection 
        founders={siteData.founders} 
        onOpenVideo={handleOpenVideo}
      />

      {/* 11. Human Rights Infographics & Registered Office Plaque */}
      <InfographicsSection 
        infographics={siteData.infographics}
        onOpenLightbox={handleOpenLightbox}
      />

      {/* 12. Social Media & Field Photography Feed */}
      <SocialFeed feed={siteData.socialFeed} />

      {/* 13. Come Join Us CTA Banner */}
      <JoinUsCTA 
        joinUs={siteData.joinUs} 
        onOpenInquiry={handleOpenInquiry}
      />

      {/* 14. Pull Quote Banner */}
      <QuoteSection quoteData={siteData.quoteBanner} />

      {/* 15. Comprehensive Multi-Column Footer with Office Address */}
      <Footer 
        org={siteData.org}
        navMenu={siteData.navMenu}
      />

      {/* Interactive Overlays */}
      <SearchModal 
        isOpen={searchOpen} 
        onClose={() => setSearchOpen(false)} 
      />

      <VideoModal 
        isOpen={videoModal.isOpen} 
        onClose={() => setVideoModal({ ...videoModal, isOpen: false })}
        youtubeId={videoModal.youtubeId}
        title={videoModal.title}
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
