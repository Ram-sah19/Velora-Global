import React from 'react';
import HeroSection from './HeroSection';
import StudentJourneySection from './StudentJourneySection';
import FeaturesSection from './FeaturesSection';
import EnterpriseSolutionsSection from './EnterpriseSolutionsSection';
import TestimonialsSection from './TestimonialsSection';
import FaqSection from './FaqSection';
import ContactSection from './ContactSection';

export default function LandingPage({ onExploreClick, onTrainingClick, onServicesClick }) {
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

      {/* 4. Enterprise Client Solutions (Web, Mobile, AI) */}
      <EnterpriseSolutionsSection 
        onServicesClick={onServicesClick}
      />

      {/* 5. Verified Student Testimonials & Outcomes */}
      <TestimonialsSection />

      {/* 6. Frequently Asked Questions */}
      <FaqSection />

      {/* 7. Official Contact & Inquiries */}
      <ContactSection />
    </div>
  );
}
