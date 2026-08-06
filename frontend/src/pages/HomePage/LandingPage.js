import React from 'react';
import HeroSection from './HeroSection';
import StudentJourneySection from './StudentJourneySection';
import FeaturesSection from './FeaturesSection';
import FaqSection from './FaqSection';

export default function LandingPage({ onExploreClick, onVerifyClick }) {
  return (
    <div className="landing-page">
      {/* Hero Section with Interactive Domain Spotlight */}
      <HeroSection 
        onExploreClick={onExploreClick}
        onVerifyClick={onVerifyClick}
      />

      {/* Structured Student Journey Step-by-Step */}
      <StudentJourneySection 
        onApplyClick={onExploreClick}
      />

      {/* Core Platform Features & Credential Trust */}
      <FeaturesSection />

      {/* Frequently Asked Questions Accordion */}
      <FaqSection />
    </div>
  );
}
