import React from 'react';
import HeroSection from './HeroSection';
import StudentJourneySection from './StudentJourneySection';
import FeaturesSection from './FeaturesSection';
import GlobalFootprintSection from './GlobalFootprintSection';
import EnterpriseSolutionsSection from './EnterpriseSolutionsSection';
import ProjectCarousel3D from './ProjectCarousel3D';
import TestimonialsSection from './TestimonialsSection';
import FaqSection from './FaqSection';
import ContactSection from './ContactSection';

export default function LandingPage({ onExploreClick, onTrainingClick, onServicesClick, onConsultationClick }) {
  return (
    <div className="landing-page">
      {/* 1. Hero Section with Brand Tagline, Metrics & Domain Explorer */}
      <HeroSection 
        onExploreClick={onExploreClick}
        onTrainingClick={onTrainingClick}
        onServicesClick={onServicesClick}
      />

      {/* 2. Structured Student Journey & Internship Framework */}
      <StudentJourneySection 
        onApplyClick={onExploreClick}
      />

      {/* 3. Core Pillars & Credibility Standards (Why Velora Global) */}
      <FeaturesSection />

      {/* 4. Global Footprint (Nepal HQ to USA Hub & Multinational Clients) */}
      <GlobalFootprintSection 
        onConsultationClick={onConsultationClick}
        onExploreClick={onExploreClick}
      />

      {/* 5. Enterprise Client Solutions (Web, Mobile, AI) */}
      <EnterpriseSolutionsSection 
        onServicesClick={onServicesClick}
        onContactClick={onConsultationClick}
      />

      {/* 6. 3D Coverflow: Delivered Client Projects Showcase */}
      <div className="container">
        <ProjectCarousel3D onConsultationClick={onConsultationClick} />
      </div>

      {/* 7. Verified Student Testimonials & Outcomes */}
      <TestimonialsSection />

      {/* 8. Frequently Asked Questions */}
      <FaqSection />

      {/* 9. Official Contact & Inquiries */}
      <ContactSection />
    </div>
  );
}
