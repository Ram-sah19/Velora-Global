import React, { useEffect } from 'react';
import HeroSection from './HeroSection';
import DomainSpecializationsSection from './DomainSpecializationsSection';
import StudentJourneySection from './StudentJourneySection';
import FeaturesSection from './FeaturesSection';
import GlobalFootprintSection from './GlobalFootprintSection';
import ProductConceptsSection from './ProductConceptsSection';
import FaqSection from './FaqSection';
import ContactSection from './ContactSection';

// The hero freeze only locks <body>; touch/tablet viewports scroll on <html>, so mirror the lock there.
function useHeroFreezeLock() {
  useEffect(() => {
    // Latch on transitions: the hero only freezes while at the top, which distinguishes it
    // from modals that also set body overflow hidden while the page is scrolled down.
    let frozen = false;

    const sync = () => {
      const bodyHidden = document.body.style.overflow === 'hidden';
      if (bodyHidden && !frozen && window.scrollY <= 10) frozen = true;
      if (!bodyHidden) frozen = false;
      document.documentElement.style.overflow = frozen ? 'hidden' : '';
    };
    sync();

    const observer = new MutationObserver(sync);
    observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });

    const handleScroll = () => {
      if (frozen && window.scrollY > 0) window.scrollTo(0, 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      document.documentElement.style.overflow = '';
    };
  }, []);
}

export default function HomePage({ onExploreClick, onTrainingClick, onServicesClick, onConsultationClick }) {
  useHeroFreezeLock();

  return (
    <div className="home-page landing-page">
      {/* 1. Hero Section with Service-First Enterprise Positioning & Metrics */}
      <HeroSection 
        onExploreClick={onExploreClick}
        onTrainingClick={onTrainingClick}
        onServicesClick={onServicesClick}
      />

      {/* 2. What We Do: the published service lines and their business purpose */}
      <DomainSpecializationsSection onServicesClick={onServicesClick} />

      {/* 3. Product Concepts: four concept builds in a plus grid, full-width teal band */}
      <ProductConceptsSection onConsultationClick={onConsultationClick} />

      {/* 4. Global Footprint (Kathmandu HQ and remote client delivery windows) */}
      <GlobalFootprintSection
        onServicesClick={onServicesClick}
      />

      {/* 5. Production Rigor & Engineering Standards (Why Velora Global) */}
      <FeaturesSection />

      {/* 6. Talent & Mentorship Engine: Structured Student Journey & Internship Framework */}
      <StudentJourneySection 
        onApplyClick={onExploreClick}
      />

      {/* 7. Frequently Asked Questions */}
      <FaqSection />

      {/* 8. Direct Consultation & Enterprise Inquiries */}
      <ContactSection />
    </div>
  );
}

// Named alias export for backward compatibility
export { HomePage as LandingPage };
