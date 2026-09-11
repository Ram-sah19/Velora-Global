import React from 'react';
import HeroSection from './HeroSection';
import StudentJourneySection from './StudentJourneySection';
import FeaturesSection from './FeaturesSection';
import GlobalFootprintSection from './GlobalFootprintSection';
import ProjectCarousel3D from './ProjectCarousel3D';
import TestimonialsSection from './TestimonialsSection';
import FaqSection from './FaqSection';
import ContactSection from './ContactSection';

export default function LandingPage({ onExploreClick, onTrainingClick, onServicesClick, onConsultationClick }) {
  return (
    <div className="landing-page">
      {/* 1. Hero Section with Service-First Enterprise Positioning & Metrics */}
      <HeroSection 
        onExploreClick={onExploreClick}
        onTrainingClick={onTrainingClick}
        onServicesClick={onServicesClick}
      />

      {/* 2. Live 3D Showcase: Delivered Client Projects & Production Systems */}
      <div className="container">
        <ProjectCarousel3D onConsultationClick={onConsultationClick} />
      </div>

      {/* 4. Global Footprint (Nepal HQ to USA Hub & Multinational Clients) */}
      <GlobalFootprintSection 
        onConsultationClick={onConsultationClick}
        onExploreClick={onExploreClick}
      />

      {/* 5. Production Rigor & Engineering Standards (Why Velora Global) */}
      <FeaturesSection />

      {/* 6. Talent & Mentorship Engine: Structured Student Journey & Internship Framework */}
      <StudentJourneySection 
        onApplyClick={onExploreClick}
      />

      {/* 7. Verified Client & Student Testimonials */}
      <TestimonialsSection />

      {/* 8. Frequently Asked Questions */}
      <FaqSection />

      {/* 9. Direct Consultation & Enterprise Inquiries */}
      <ContactSection />
    </div>
  );
}
