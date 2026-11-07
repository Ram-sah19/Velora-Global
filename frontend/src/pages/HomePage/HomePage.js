import React, { useEffect } from 'react';
import HeroSection from './HeroSection';
import DomainSpecializationsSection from './DomainSpecializationsSection';
import DomainSpecializationsMenuPreview from './DomainSpecializationsMenuPreview';
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

// Each band's contents rise into place once, when the band first enters the viewport.
// The hero is not a band, so its own reveal is untouched.
function useBandReveal() {
  useEffect(() => {
    const bands = document.querySelectorAll('.home-page .hp-band, .home-page .concept-band');

    if (!('IntersectionObserver' in window)) {
      bands.forEach((band) => band.classList.add('is-inview'));
      return undefined;
    }

    const observer = new IntersectionObserver((entries, self) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-inview');
        self.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px' });

    bands.forEach((band) => observer.observe(band));
    return () => observer.disconnect();
  }, []);
}

export default function HomePage({ onExploreClick, onTrainingClick, onServicesClick, onConsultationClick }) {
  useHeroFreezeLock();
  useBandReveal();

  // Hidden preview of the What We Do band: /?whatwedo=v3
  const menuPreview = new URLSearchParams(window.location.search).get('whatwedo') === 'v3';

  return (
    <div className="home-page landing-page">
      {/* 1. Hero Section with Service-First Enterprise Positioning & Metrics */}
      <HeroSection 
        onExploreClick={onExploreClick}
        onTrainingClick={onTrainingClick}
        onServicesClick={onServicesClick}
      />

      {/* 2. What We Do: the published service lines and their business purpose */}
      {menuPreview ? (
        <DomainSpecializationsMenuPreview onServicesClick={onServicesClick} />
      ) : (
        <DomainSpecializationsSection onServicesClick={onServicesClick} />
      )}

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
