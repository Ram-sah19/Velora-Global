import React from 'react';
import HeroSection from './HeroSection';
import DomainSpecializationsSection from './DomainSpecializationsSection';
import StudentJourneySection from './StudentJourneySection';
import FeaturesSection from './FeaturesSection';
import GlobalFootprintSection from './GlobalFootprintSection';
import ProjectCarousel3D from './ProjectCarousel3D';
import TestimonialsSection from './TestimonialsSection';
import FaqSection from './FaqSection';
import ContactSection from './ContactSection';

export default function HomePage({ onExploreClick, onTrainingClick, onServicesClick, onConsultationClick }) {
  return (
    <div className="home-page landing-page">
      {/* 1. Hero Section with Service-First Enterprise Positioning & Metrics */}
      <HeroSection 
        onExploreClick={onExploreClick}
        onTrainingClick={onTrainingClick}
        onServicesClick={onServicesClick}
      />

      {/* 2. Domain Specializations Explorer ("What We Do") */}
      <DomainSpecializationsSection 
        onExploreClick={onExploreClick}
        onTrainingClick={onTrainingClick}
      />

      {/* 3. Live 3D Showcase: Delivered Client Projects & Production Systems */}
      <div className="container">
        <ProjectCarousel3D onConsultationClick={onConsultationClick} />
      </div>

      {/* 3. Global Footprint (Nepal HQ to USA Hub & Multinational Clients) */}
      <GlobalFootprintSection 
        onConsultationClick={onConsultationClick}
      />

      {/* 4. Production Rigor & Engineering Standards (Why Velora Global) */}
      <FeaturesSection />

      {/* 5. Talent & Mentorship Engine: Structured Student Journey & Internship Framework */}
      <StudentJourneySection 
        onApplyClick={onExploreClick}
      />

      {/* 6. Verified Client & Student Testimonials */}
      <TestimonialsSection />

      {/* 7. Frequently Asked Questions */}
      <FaqSection />

      {/* 8. Direct Consultation & Enterprise Inquiries */}
      <ContactSection />
    </div>
  );
}

// Named alias export for backward compatibility
export { HomePage as LandingPage };
