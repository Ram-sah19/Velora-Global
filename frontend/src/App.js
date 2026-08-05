import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StudentJourneySection from './components/StudentJourneySection';
import FeaturesSection from './components/FeaturesSection';
import LeadershipSection from './components/LeadershipSection';
import FaqSection from './components/FaqSection';
import DomainExplorer from './components/DomainExplorer';
import StudentPortal from './components/StudentPortal';
import AdminDashboard from './components/AdminDashboard';
import CertificateModal from './components/CertificateModal';
import CertificateVerifier from './components/CertificateVerifier';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'programs', 'student', 'admin', 'verify'
  const [activeRole, setActiveRole] = useState('student'); // 'student', 'founder', 'cofounder'
  const [activeCertificate, setActiveCertificate] = useState(null);

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Global Navigation Header */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        
        {/* Full Executive Home Page */}
        {activeTab === 'home' && (
          <>
            {/* Hero & Interactive Domain Navigator */}
            <HeroSection 
              onExploreClick={() => setActiveTab('programs')}
              onVerifyClick={() => setActiveTab('verify')}
            />

            {/* Step-by-Step Student Journey */}
            <StudentJourneySection 
              onApplyClick={() => setActiveTab('programs')}
            />

            {/* Why Velora Global Platform Features */}
            <FeaturesSection />

            {/* Founding Leadership Section (Rambilas Sah, Puja Rouniyar, Rohit Sah) */}
            <LeadershipSection />

            {/* Frequently Asked Questions */}
            <FaqSection />
          </>
        )}

        {/* Explore Internship Programs Page */}
        {activeTab === 'programs' && (
          <DomainExplorer 
            activeRole={activeRole}
            onApplySuccess={() => setActiveTab('student')}
          />
        )}

        {/* Student Workspace Portal */}
        {activeTab === 'student' && (
          <StudentPortal 
            onOpenCertificate={(cert) => setActiveCertificate(cert)}
          />
        )}

        {/* Executive Dashboard */}
        {activeTab === 'admin' && (
          <AdminDashboard 
            onCertificateGenerated={(cert) => setActiveCertificate(cert)}
          />
        )}

        {/* Public Certificate Verification Page */}
        {activeTab === 'verify' && (
          <CertificateVerifier />
        )}

      </main>

      {/* Official Certificate Popup Modal */}
      {activeCertificate && (
        <CertificateModal 
          certificate={activeCertificate} 
          onClose={() => setActiveCertificate(null)}
        />
      )}

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}
