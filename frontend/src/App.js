import React, { useState, useEffect, lazy, Suspense } from 'react';
import { api } from './services/api';
import { 
  COUNSELING_FORM_URL, 
  WHATSAPP_CONTACT_NUMBER,
  tabToPathMap,
  pathToTabMap,
  pageTitles,
  pageDescriptions
} from './constants';

// Centralized Components & Motion System
import {
  Navbar,
  Footer,
  CertificateModal,
  NotificationToast,
  CookieBanner,
  WhatsAppFloatingButton,
  ErrorBoundary,
  OfflineBanner,
  PageLoader,
  VeloraIntro,
  PageTransition
} from './components';

// Code-Split Lazy Loaded Feature Pages (Industry-Standard Barrel Imports)
const HomePage = lazy(() => import('./pages/HomePage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const TeamPage = lazy(() => import('./pages/TeamPage'));
const InternshipsPage = lazy(() => import('./pages/InternshipsPage'));
const TrainingPage = lazy(() => import('./pages/TrainingPage'));
const ClientWorkspacePage = lazy(() => import('./pages/ClientWorkspacePage'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'));


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

  const handleOneToOneCounseling = () => {
    window.open(COUNSELING_FORM_URL, "_blank");
  };

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



  // Scroll to top and ensure scrollbar is free on tab switch
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.body.style.overflow = 'unset';
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
      if (currentUser.userType === 'client' && (activeTab === 'internships' || activeTab === 'training')) {
        setActiveTab('client');
        navigateTab('client', true);
      }
    }
  }, [currentUser, activeTab]);

  const handleTabChange = (tab, replace = false) => {
    if (currentUser && currentUser.userType === 'client' && (tab === 'internships' || tab === 'training')) {
      setActiveTab('client');
      navigateTab('client', replace);
      return;
    }
    setActiveTab(tab);
    navigateTab(tab, replace);
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
          onConsultationClick={handleOneToOneCounseling}
        />

        {/* Main Content Area with Code-Splitting Suspense & Transitions */}
        <main className="main-content" style={{ paddingTop: activeTab === 'home' ? 0 : '72px' }}>
          <PageTransition tabKey={activeTab}>
            <Suspense fallback={<PageLoader />}>
              {activeTab === 'home' && (
                <HomePage 
                  onExploreClick={() => handleTabChange('internships')}
                  onTrainingClick={() => handleTabChange('training')}
                  onServicesClick={() => handleTabChange('services')}
                  onConsultationClick={handleOneToOneCounseling}
                />
              )}

              {activeTab === 'services' && (
                <ServicesPage 
                  selectedCategory={selectedServiceCategory}
                  onSelectCategory={(cat) => setSelectedServiceCategory(cat)}
                  currentUser={currentUser}
                />
              )}

              {activeTab === 'team' && (
                <TeamPage 
                  onExploreClick={() => handleTabChange('internships')}
                  onConsultationClick={handleOneToOneCounseling}
                />
              )}

              {activeTab === 'internships' && (
                <InternshipsPage 
                  activeRole={activeRole}
                  currentUser={currentUser}
                  onApplySuccess={() => {}}
                />
              )}

              {activeTab === 'training' && (
                <TrainingPage 
                  activeRole={activeRole}
                  currentUser={currentUser}
                  onApplySuccess={() => {}}
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
                  onLogout={handleLogout}
                />
              )}
            </Suspense>
          </PageTransition>
        </main>

        {/* Official Certificate Popup Modal */}
        {activeCertificate && (
          <CertificateModal 
            certificate={activeCertificate} 
            onClose={() => setActiveCertificate(null)}
          />
        )}

        {/* Global Floating WhatsApp Contact Widget */}
        <WhatsAppFloatingButton phoneNumber={WHATSAPP_CONTACT_NUMBER} />

        {/* Global Footer */}
        <Footer setActiveTab={handleTabChange} />
      </div>
    </ErrorBoundary>
  );
}
