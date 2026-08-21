import React, { useState, useEffect } from 'react';
import { api } from './services/api';

// Global Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CertificateModal from './components/CertificateModal';
import NotificationToast from './components/NotificationToast';
import CookieBanner from './components/CookieBanner';
import ResetPasswordModal from './components/ResetPasswordModal';
import VerifyEmailModal from './components/VerifyEmailModal';
import { ErrorBoundary, OfflineBanner } from './components/UIStates';

// Unified Authentication Modal
import AuthModal from './pages/Auth/AuthModal';
import AdminRegisterModal from './pages/AdminDashboardPage/AdminRegisterModal';

// Pages
import LandingPage from './pages/HomePage/LandingPage';
import ServicesPage from './pages/ServicesPage/ServicesPage';
import TeamPage from './pages/TeamPage/TeamPage';
import InternshipsPage from './pages/InternshipsPage/InternshipsPage';
import TrainingPage from './pages/TrainingPage/TrainingPage';
import StudentPortalPage from './pages/StudentPortalPage/StudentPortalPage';
import ClientWorkspacePage from './pages/ClientWorkspacePage/ClientWorkspacePage';
import AdminDashboardPage from './pages/AdminDashboardPage/AdminDashboardPage';

const tabToPathMap = {
  home: '/',
  services: '/services',
  team: '/team',
  internships: '/internships',
  training: '/training',
  student: '/student',
  client: '/client',
  admin: '/admin'
};

const pathToTabMap = {
  '/': 'home',
  '/home': 'home',
  '/services': 'services',
  '/contact': 'services',
  '/team': 'team',
  '/about': 'team',
  '/internships': 'internships',
  '/training': 'training',
  '/student': 'student',
  '/workspace': 'student',
  '/client': 'client',
  '/admin': 'admin'
};

const getInitialTabFromUrl = () => {
  const path = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
  return pathToTabMap[path] || 'home';
};

export default function App() {
  const [activeTab, setActiveTab] = useState(getInitialTabFromUrl); // 'home', 'services', 'team', 'internships', 'training', 'student', 'admin'
  const [selectedServiceCategory, setSelectedServiceCategory] = useState('all');
  const [activeRole] = useState('student');
  const [activeCertificate, setActiveCertificate] = useState(null);

  // Helper to sync browser URL bar with selected tab
  const navigateTab = (tab, replace = false) => {
    const targetPath = tabToPathMap[tab] || '/';
    if (window.location.pathname !== targetPath) {
      if (replace) {
        window.history.replaceState({ tab }, '', targetPath);
      } else {
        window.history.pushState({ tab }, '', targetPath);
      }
    }
  };

  // Sync tab state when user navigates using browser back / forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
      const tab = pathToTabMap[path] || 'home';
      setActiveTab(tab);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Ensure initial URL reflects current tab (e.g. if user opened /about, normalize URL to /team)
  useEffect(() => {
    const targetPath = tabToPathMap[activeTab] || '/';
    if (window.location.pathname !== targetPath) {
      window.history.replaceState({ tab: activeTab }, '', targetPath);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Authentication State with Instant 30-Day Session Restoration
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('velora_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
        if (parsed && parsed.timestamp && (Date.now() - parsed.timestamp < THIRTY_DAYS_MS)) {
          return parsed.user;
        }
      }
    } catch (e) {}
    return null;
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState('login');
  const [showAdminRegisterModal, setShowAdminRegisterModal] = useState(false);
  const [resetToken, setResetToken] = useState(null);
  const [verifyToken, setVerifyToken] = useState(null);

  // Detect ?resetToken= or ?verifyToken= in the URL when user clicks email link
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const rToken = params.get('resetToken');
    const vToken = params.get('verifyToken');
    if (rToken) setResetToken(rToken);
    if (vToken) setVerifyToken(vToken);
  }, []);

  // Scroll to top on tab switch
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activeTab]);

  // Automatic 30-Day Backend Session Sync on page load / browser restart
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const res = await api.getCurrentUser();
        if (res && res.user) {
          setCurrentUser(res.user);
          localStorage.setItem('velora_user', JSON.stringify({ user: res.user, timestamp: Date.now() }));
        }
      } catch (e) {
        // If session revoked on backend, clear local session state
        if (e.message && e.message.includes('401')) {
          localStorage.removeItem('velora_user');
          setCurrentUser(null);
        }
      }
    };
    restoreSession();
  }, []);

  // Enforce role-based workspace routing for Corporate Clients
  useEffect(() => {
    if (currentUser) {
      if (currentUser.userType === 'client' && (activeTab === 'student' || activeTab === 'internships' || activeTab === 'training')) {
        setActiveTab('client');
        navigateTab('client', true);
      }
    }
  }, [currentUser, activeTab]);

  const handleTabChange = (tab, replace = false) => {
    if (currentUser && currentUser.userType === 'client' && (tab === 'student' || tab === 'internships' || tab === 'training')) {
      setActiveTab('client');
      navigateTab('client', replace);
      return;
    }
    if (tab === 'student' && !currentUser) {
      setAuthInitialMode('login');
      setShowAuthModal(true);
      return;
    }
    setActiveTab(tab);
    navigateTab(tab, replace);
  };

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    try {
      // Store only minimal non-sensitive profile fields — NO password, no token
      const safeProfile = {
        id: user.id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        avatar: user.avatar,
        companyName: user.companyName || null
      };
      localStorage.setItem('velora_user', JSON.stringify({ user: safeProfile, timestamp: Date.now() }));
    } catch (e) {}

    if (user.userType === 'superadmin' || user.userType === 'admin') {
      handleTabChange('admin');
    } else if (user.userType === 'client') {
      handleTabChange('client');
    } else {
      handleTabChange('student');
    }
  };

  const handleLogout = async () => {
    try {
      await api.logoutUser();
    } catch (e) {}
    localStorage.removeItem('velora_user');
    setCurrentUser(null);
    handleTabChange('home');
  };

  return (
    <ErrorBoundary>
      <div className="app-container">
        <OfflineBanner />
        <NotificationToast />
        <CookieBanner />
        
        {/* Global Navigation Header */}
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={handleTabChange}
          onSelectServiceCategory={(cat) => setSelectedServiceCategory(cat)}
          currentUser={currentUser}
          onOpenAuth={(mode = 'login') => { setAuthInitialMode(mode); setShowAuthModal(true); }}
          onLogout={handleLogout}
        />

        {/* Main Content Area */}
        <main className="main-content">
          
          {/* Home / Landing Page */}
          <div style={{ display: activeTab === 'home' ? 'block' : 'none', minHeight: '80vh', width: '100%' }}>
            <LandingPage 
              onExploreClick={() => handleTabChange('internships')}
              onTrainingClick={() => handleTabChange('training')}
              onServicesClick={() => handleTabChange('services')}
            />
          </div>

          {/* Dedicated Corporate Services Page */}
          <div style={{ display: activeTab === 'services' ? 'block' : 'none', minHeight: '80vh', width: '100%' }}>
            <ServicesPage 
              selectedCategory={selectedServiceCategory}
              onSelectCategory={(cat) => setSelectedServiceCategory(cat)}
              currentUser={currentUser}
              onOpenClientAuth={() => {
                setAuthInitialMode('login');
                setShowAuthModal(true);
              }}
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
              currentUser={currentUser}
              onOpenAuth={() => {
                setAuthInitialMode('login');
                setShowAuthModal(true);
              }}
              onApplySuccess={() => handleTabChange('student')}
            />
          </div>

          {/* Dedicated Guided Skill Training Page */}
          <div style={{ display: activeTab === 'training' ? 'block' : 'none', minHeight: '80vh', width: '100%' }}>
            <TrainingPage 
              activeRole={activeRole}
              currentUser={currentUser}
              onOpenAuth={() => {
                setAuthInitialMode('login');
                setShowAuthModal(true);
              }}
              onApplySuccess={() => handleTabChange('student')}
            />
          </div>

          {/* Dedicated Student Workspace */}
          <div style={{ display: activeTab === 'student' ? 'block' : 'none', minHeight: '80vh', width: '100%' }}>
            <StudentPortalPage 
              currentUser={currentUser} 
              onViewCertificate={(cert) => setActiveCertificate(cert)}
            />
          </div>

          {/* Dedicated Corporate Client Workspace */}
          <div style={{ display: activeTab === 'client' ? 'block' : 'none', minHeight: '80vh', width: '100%' }}>
            <ClientWorkspacePage 
              currentUser={currentUser} 
              onLogout={handleLogout}
            />
          </div>

          {/* Dedicated Admin Executive Dashboard Page */}
          {activeTab === 'admin' && (
            <div style={{ minHeight: '80vh', width: '100%' }}>
              <AdminDashboardPage 
                currentUser={currentUser} 
                onOpenAdminRegister={() => setShowAdminRegisterModal(true)}
              />
            </div>
          )}

        </main>

        {/* Password Reset Modal — opens automatically from email reset link (?resetToken=...) */}
        {resetToken && (
          <ResetPasswordModal
            token={resetToken}
            onClose={() => {
              setResetToken(null);
              window.history.replaceState({}, document.title, window.location.pathname);
            }}
          />
        )}

        {/* Email Verification Modal — opens automatically from email confirmation link (?verifyToken=...) */}
        {verifyToken && (
          <VerifyEmailModal
            token={verifyToken}
            onClose={() => {
              setVerifyToken(null);
              window.history.replaceState({}, document.title, window.location.pathname);
            }}
            onVerifySuccess={(user) => {
              handleAuthSuccess(user);
              setVerifyToken(null);
            }}
          />
        )}

        {/* Unified Authentication Modal */}
        {showAuthModal && (
          <AuthModal 
            initialMode={authInitialMode}
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
    </ErrorBoundary>
  );
}
