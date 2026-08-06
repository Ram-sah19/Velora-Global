import React, { useState, useEffect } from 'react';

// Global Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CertificateModal from './components/CertificateModal';

// Pages
import LandingPage from './pages/HomePage/LandingPage';
import TeamPage from './pages/TeamPage/TeamPage';
import ProgramsPage from './pages/ProgramsPage/ProgramsPage';
import StudentPortalPage from './pages/StudentPortalPage/StudentPortalPage';
import AdminDashboardPage from './pages/AdminDashboardPage/AdminDashboardPage';
import CertificateVerifyPage from './pages/CertificateVerifyPage/CertificateVerifyPage';

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'team', 'programs', 'student', 'admin', 'verify'
  const [activeRole] = useState('student'); // 'student', 'founder', 'cofounder'
  const [activeCertificate, setActiveCertificate] = useState(null);

  // Scroll to top on tab switch
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activeTab]);

  return (
    <div className="app-container">
      
      {/* Global Navigation Header */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area — Kept mounted to prevent layout flash/glitch during page transitions */}
      <main className="main-content">
        
        {/* Home / Landing Page */}
        <div style={{ display: activeTab === 'home' ? 'block' : 'none', minHeight: '80vh' }}>
          <LandingPage 
            onExploreClick={() => setActiveTab('programs')}
            onVerifyClick={() => setActiveTab('verify')}
          />
        </div>

        {/* Dedicated Executive Team Page */}
        <div style={{ display: activeTab === 'team' ? 'block' : 'none', minHeight: '80vh' }}>
          <TeamPage 
            onExploreClick={() => setActiveTab('programs')}
          />
        </div>

        {/* Explore Internship Programs Page */}
        <div style={{ display: activeTab === 'programs' ? 'block' : 'none', minHeight: '80vh' }}>
          <ProgramsPage 
            activeRole={activeRole}
            onApplySuccess={() => setActiveTab('student')}
          />
        </div>

        {/* Student Workspace Portal Page */}
        {activeTab === 'student' && (
          <div style={{ display: activeTab === 'student' ? 'block' : 'none', minHeight: '80vh' }}>
            <StudentPortalPage 
              onOpenCertificate={(cert) => setActiveCertificate(cert)}
            />
          </div>
        )}

        {/* Executive Founder Panel Page */}
        {activeTab === 'admin' && (
          <div style={{ display: activeTab === 'admin' ? 'block' : 'none', minHeight: '80vh' }}>
            <AdminDashboardPage 
              onCertificateGenerated={(cert) => setActiveCertificate(cert)}
            />
          </div>
        )}

        {/* Public Certificate Verification Page */}
        <div style={{ display: activeTab === 'verify' ? 'block' : 'none', minHeight: '80vh' }}>
          <CertificateVerifyPage />
        </div>

      </main>

      {/* Official Certificate Popup Modal */}
      {activeCertificate && (
        <CertificateModal 
          certificate={activeCertificate} 
          onClose={() => setActiveCertificate(null)}
        />
      )}

      {/* Global Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}
