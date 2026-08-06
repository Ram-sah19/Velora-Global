import React, { useState, useEffect } from 'react';

// Global Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CertificateModal from './components/CertificateModal';

// Pages
import LandingPage from './pages/HomePage/LandingPage';
import TeamPage from './pages/TeamPage/TeamPage';
import InternshipsPage from './pages/InternshipsPage/InternshipsPage';
import TrainingPage from './pages/TrainingPage/TrainingPage';
import StudentPortalPage from './pages/StudentPortalPage/StudentPortalPage';
import AdminDashboardPage from './pages/AdminDashboardPage/AdminDashboardPage';

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'team', 'internships', 'training', 'student', 'admin'
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
        <div style={{ display: activeTab === 'home' ? 'block' : 'none', minHeight: '80vh', width: '100%' }}>
          <LandingPage 
            onExploreClick={() => setActiveTab('internships')}
          />
        </div>

        {/* Dedicated Executive Team Page */}
        <div style={{ display: activeTab === 'team' ? 'block' : 'none', minHeight: '80vh', width: '100%' }}>
          <TeamPage 
            onExploreClick={() => setActiveTab('internships')}
          />
        </div>

        {/* Dedicated Practical Internships Page */}
        <div style={{ display: activeTab === 'internships' ? 'block' : 'none', minHeight: '80vh', width: '100%' }}>
          <InternshipsPage 
            activeRole={activeRole}
            onApplySuccess={() => setActiveTab('student')}
          />
        </div>

        {/* Dedicated Guided Skill Training Page */}
        <div style={{ display: activeTab === 'training' ? 'block' : 'none', minHeight: '80vh', width: '100%' }}>
          <TrainingPage 
            activeRole={activeRole}
            onApplySuccess={() => setActiveTab('student')}
          />
        </div>

        {/* Student Workspace Portal Page */}
        <div style={{ display: activeTab === 'student' ? 'block' : 'none', minHeight: '80vh', width: '100%' }}>
          <StudentPortalPage 
            onOpenCertificate={(cert) => setActiveCertificate(cert)}
          />
        </div>

        {/* Executive Founder Panel Page */}
        {activeTab === 'admin' && (
          <div style={{ display: activeTab === 'admin' ? 'block' : 'none', minHeight: '80vh', width: '100%' }}>
            <AdminDashboardPage 
              onCertificateGenerated={(cert) => setActiveCertificate(cert)}
            />
          </div>
        )}

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
