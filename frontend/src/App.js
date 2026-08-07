import React, { useState, useEffect } from 'react';

// Global Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CertificateModal from './components/CertificateModal';

// Modals & Auth
import AuthModal from './pages/Auth/AuthModal';
import AdminRegisterModal from './pages/AdminDashboardPage/AdminRegisterModal';

// Pages
import LandingPage from './pages/HomePage/LandingPage';
import ServicesPage from './pages/ServicesPage/ServicesPage';
import TeamPage from './pages/TeamPage/TeamPage';
import InternshipsPage from './pages/InternshipsPage/InternshipsPage';
import TrainingPage from './pages/TrainingPage/TrainingPage';
import StudentPortalPage from './pages/StudentPortalPage/StudentPortalPage';
import AdminDashboardPage from './pages/AdminDashboardPage/AdminDashboardPage';

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'services', 'team', 'internships', 'training', 'student', 'admin'
  const [selectedServiceCategory, setSelectedServiceCategory] = useState('all');
  const [activeRole] = useState('student');
  const [activeCertificate, setActiveCertificate] = useState(null);

  // Authentication State
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAdminRegisterModal, setShowAdminRegisterModal] = useState(false);

  // Scroll to top on tab switch
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activeTab]);

  const handleTabChange = (tab) => {
    if (tab === 'student' && !currentUser) {
      setShowAuthModal(true);
      return;
    }
    setActiveTab(tab);
  };

  const handleAuthSuccess = (user, token) => {
    setCurrentUser(user);
    if (token) {
      localStorage.setItem('velora_token', token);
    }
    if (user.userType === 'superadmin' || user.userType === 'admin') {
      setActiveTab('admin');
    } else {
      setActiveTab('student');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('velora_token');
    setActiveTab('home');
  };

  return (
    <div className="app-container">
      
      {/* Global Navigation Header */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={handleTabChange}
        onSelectServiceCategory={(cat) => setSelectedServiceCategory(cat)}
        currentUser={currentUser}
        onOpenAuth={() => setShowAuthModal(true)}
        onOpenAdminRegister={() => setShowAdminRegisterModal(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Area — Kept mounted to prevent layout flash/glitch during page transitions */}
      <main className="main-content">
        
        {/* Home / Landing Page */}
        <div style={{ display: activeTab === 'home' ? 'block' : 'none', minHeight: '80vh', width: '100%' }}>
          <LandingPage 
            onExploreClick={() => handleTabChange('internships')}
          />
        </div>

        {/* Dedicated Client Services Page */}
        <div style={{ display: activeTab === 'services' ? 'block' : 'none', minHeight: '80vh', width: '100%' }}>
          <ServicesPage 
            selectedCategory={selectedServiceCategory}
            onSelectCategory={(cat) => setSelectedServiceCategory(cat)}
          />
        </div>

        {/* Dedicated Executive Team Page */}
        <div style={{ display: activeTab === 'team' ? 'block' : 'none', minHeight: '80vh', width: '100%' }}>
          <TeamPage 
            onExploreClick={() => handleTabChange('internships')}
          />
        </div>

        {/* Dedicated Practical Internships Page */}
        <div style={{ display: activeTab === 'internships' ? 'block' : 'none', minHeight: '80vh', width: '100%' }}>
          <InternshipsPage 
            activeRole={activeRole}
            onApplySuccess={() => handleTabChange('student')}
          />
        </div>

        {/* Dedicated Guided Skill Training Page */}
        <div style={{ display: activeTab === 'training' ? 'block' : 'none', minHeight: '80vh', width: '100%' }}>
          <TrainingPage 
            activeRole={activeRole}
            onApplySuccess={() => handleTabChange('student')}
          />
        </div>

        {/* Student Workspace Portal Page - Gated by Login & Admin Approval */}
        <div style={{ display: activeTab === 'student' ? 'block' : 'none', minHeight: '80vh', width: '100%' }}>
          <StudentPortalPage 
            currentUser={currentUser}
            onOpenAuth={() => setShowAuthModal(true)}
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

      {/* Auth Modals */}
      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      )}

      {/* Secret Super Admin Registration Modal */}
      {showAdminRegisterModal && (
        <AdminRegisterModal 
          onClose={() => setShowAdminRegisterModal(false)}
          onAdminSuccess={(user) => handleAuthSuccess(user)}
        />
      )}

      {/* Official Certificate Popup Modal */}
      {activeCertificate && (
        <CertificateModal 
          certificate={activeCertificate} 
          onClose={() => setActiveCertificate(null)}
        />
      )}

      {/* Global Footer */}
      <Footer setActiveTab={handleTabChange} />

    </div>
  );
}
