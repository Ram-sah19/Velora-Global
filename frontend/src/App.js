import React, { useState, useEffect, lazy, Suspense } from 'react';
import { api } from './services/api';

// Premium Motion System
import { VeloraIntro, PageTransition } from './components/Motion';

// Global Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CertificateModal from './components/CertificateModal';
import NotificationToast from './components/NotificationToast';
import CookieBanner from './components/CookieBanner';
import ResetPasswordModal from './components/ResetPasswordModal';
import VerifyEmailModal from './components/VerifyEmailModal';
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton';
import { ErrorBoundary, OfflineBanner, PageLoader } from './components/UIStates';

// Unified Authentication Modal
import AuthModal from './pages/Auth/AuthModal';
import AdminRegisterModal from './pages/AdminDashboardPage/AdminRegisterModal';

// Code-Split Lazy Loaded Feature Pages
const LandingPage = lazy(() => import('./pages/HomePage/LandingPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage/ServicesPage'));
const TeamPage = lazy(() => import('./pages/TeamPage/TeamPage'));
const InternshipsPage = lazy(() => import('./pages/InternshipsPage/InternshipsPage'));
const TrainingPage = lazy(() => import('./pages/TrainingPage/TrainingPage'));
const StudentPortalPage = lazy(() => import('./pages/StudentPortalPage/StudentPortalPage'));
const ClientWorkspacePage = lazy(() => import('./pages/ClientWorkspacePage/ClientWorkspacePage'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage/AdminDashboardPage'));

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

const pageTitles = {
  home: 'Velora Global | Technology Training, Internships & Enterprise Solutions',
  services: 'Enterprise IT Solutions & Services | Velora Global',
  team: 'About Us & Executive Leadership | Velora Global',
  internships: 'Practical Technology Internships | Velora Global',
  training: 'Guided Skills Training & Bootcamps | Velora Global',
  student: 'Student Workspace & Portal | Velora Global',
  client: 'Corporate Client Workspace | Velora Global',
  admin: 'Executive Admin Dashboard | Velora Global'
};

const pageDescriptions = {
  home: 'Practical technology training, project-driven internships, and scalable enterprise IT solutions (Web, Mobile & AI) in Kathmandu, Nepal. Founded by Ram Sah.',
  services: 'Custom web development (MERN Stack), cross-platform iOS & Android mobile apps, and 24/7 AI chatbot integrations for modern businesses.',
  team: 'Learn about Velora Global and our executive leadership: Ram Sah (Founder & CEO, Full Stack & AI/ML Engineer), Krishna Sah (CTO), Rohit Sah (COO), and Shivshankar Sah.',
  internships: 'Explore 10 specialized technology internship tracks with production code reviews, verified certificates, and industry mentorship.',
  training: 'Practical technology bootcamps from 1 week to 2 months covering Full Stack MERN, Python AI/ML, and cloud engineering with live capstones.',
  student: 'Centralized student workspace for task tracking, deliverable submissions, and performance evaluations.',
  client: 'Corporate client portal for software project tracking, milestone reviews, and technical specifications.',
  admin: 'Executive administration dashboard for Velora Global.'
};

const getInitialTabFromUrl = () => {
  const path = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
  return pathToTabMap[path] || 'home';
};

export default function App() {
  const [activeTab, setActiveTab] = useState(getInitialTabFromUrl);
  const [selectedServiceCategory, setSelectedServiceCategory] = useState('all');
  const [activeCertificate, setActiveCertificate] = useState(null);
  const [introReady, setIntroReady] = useState(!!sessionStorage.getItem('vg_intro_done'));
  const [, setIsAuthRestoring] = useState(true);

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

  // Dynamic active role derived from authenticated user
  const activeRole = currentUser?.role || currentUser?.userType || 'student';

  // Dynamic Document Title & Meta Tags Sync (Per-Page Single-Page-App SEO)
  useEffect(() => {
    const title = pageTitles[activeTab] || 'Velora Global | Career Gateway';
    const description = pageDescriptions[activeTab] || pageDescriptions.home;
    const url = `https://velora-global.online${tabToPathMap[activeTab] || '/'}`;

    document.title = title;

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', url);

    // Update Twitter card tags
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', title);

    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', description);

    // Update canonical link
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', url);
    }
  }, [activeTab]);

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

  // Ensure initial URL reflects current tab
  useEffect(() => {
    const targetPath = tabToPathMap[activeTab] || '/';
    if (window.location.pathname !== targetPath) {
      window.history.replaceState({ tab: activeTab }, '', targetPath);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        if (e.message && e.message.includes('401')) {
          localStorage.removeItem('velora_user');
          setCurrentUser(null);
        }
      } finally {
        setIsAuthRestoring(false);
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
    } catch (e) {
      console.warn('Logout server notice:', e.message);
    } finally {
      localStorage.removeItem('velora_user');
      setCurrentUser(null);
      handleTabChange('home');
    }
  };

  return (
    <ErrorBoundary>
      {/* Premium Brand Intro Splash — plays once per session */}
      <VeloraIntro onComplete={() => setIntroReady(true)} />

      <div className="app-container" style={{
        opacity: introReady ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }}>
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

        {/* Main Content Area with Code-Splitting Suspense & Transitions */}
        <main className="main-content" style={{ paddingTop: activeTab === 'home' ? 0 : '72px' }}>
          <PageTransition tabKey={activeTab}>
            <Suspense fallback={<PageLoader />}>
              {activeTab === 'home' && (
                <LandingPage 
                  onExploreClick={() => handleTabChange('internships')}
                  onTrainingClick={() => handleTabChange('training')}
                  onServicesClick={() => handleTabChange('services')}
                />
              )}

              {activeTab === 'services' && (
                <ServicesPage 
                  selectedCategory={selectedServiceCategory}
                  onSelectCategory={(cat) => setSelectedServiceCategory(cat)}
                  currentUser={currentUser}
                  onOpenClientAuth={() => {
                    setAuthInitialMode('login');
                    setShowAuthModal(true);
                  }}
                />
              )}

              {activeTab === 'team' && (
                <TeamPage 
                  onExploreClick={() => handleTabChange('internships')}
                />
              )}

              {activeTab === 'internships' && (
                <InternshipsPage 
                  activeRole={activeRole}
                  currentUser={currentUser}
                  onOpenAuth={() => {
                    setAuthInitialMode('login');
                    setShowAuthModal(true);
                  }}
                  onApplySuccess={() => handleTabChange('student')}
                />
              )}

              {activeTab === 'training' && (
                <TrainingPage 
                  activeRole={activeRole}
                  currentUser={currentUser}
                  onOpenAuth={() => {
                    setAuthInitialMode('login');
                    setShowAuthModal(true);
                  }}
                  onApplySuccess={() => handleTabChange('student')}
                />
              )}

              {activeTab === 'student' && (
                <StudentPortalPage 
                  currentUser={currentUser} 
                  onViewCertificate={(cert) => setActiveCertificate(cert)}
                />
              )}

              {activeTab === 'client' && (
                <ClientWorkspacePage 
                  currentUser={currentUser} 
                  onLogout={handleLogout}
                />
              )}

              {activeTab === 'admin' && (
                <AdminDashboardPage 
                  currentUser={currentUser} 
                  onOpenAdminRegister={() => setShowAdminRegisterModal(true)}
                />
              )}
            </Suspense>
          </PageTransition>
        </main>

        {/* Password Reset Modal */}
        {resetToken && (
          <ResetPasswordModal
            token={resetToken}
            onClose={() => {
              setResetToken(null);
              window.history.replaceState({}, document.title, window.location.pathname);
            }}
          />
        )}

        {/* Email Verification Modal */}
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

        {/* Global Floating WhatsApp Contact Widget */}
        <WhatsAppFloatingButton phoneNumber="9826031419" />

        {/* Global Footer */}
        <Footer setActiveTab={handleTabChange} />
      </div>
    </ErrorBoundary>
  );
}
