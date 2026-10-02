import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { api } from './services/api';
import { 
  COUNSELING_FORM_URL, 
  WHATSAPP_CONTACT_NUMBER,
  tabToPathMap,
  pathToTabMap,
  pageTitles,
  pageDescriptions,
  verifyPageMeta
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
const AboutPage = lazy(() => import('./pages/AboutPage'));
const TeamPage = lazy(() => import('./pages/TeamPage'));
const InternshipsPage = lazy(() => import('./pages/InternshipsPage'));
const TrainingPage = lazy(() => import('./pages/TrainingPage'));
const LegalPage = lazy(() => import('./pages/LegalPage'));
const ClientWorkspacePage = lazy(() => import('./pages/ClientWorkspacePage'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'));
const StaffSignIn = lazy(() => import('./pages/AdminDashboardPage/StaffSignIn'));
const VerifyCertificatePage = lazy(() => import('./pages/VerifyCertificatePage'));

// A scanned certificate opens /verify/{certificateId}. The ID alphabet and length
// match the ones the backend issues, so no malformed address reaches the page.
const VERIFY_PATH = /^\/verify\/([A-Za-z0-9][A-Za-z0-9-]{3,31})$/;
const SITE_ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

const normalizePath = (pathname) => pathname.toLowerCase().replace(/\/$/, '') || '/';
const getVerifyIdFromUrl = () => {
  const match = window.location.pathname.match(VERIFY_PATH);
  return match ? match[1] : null;
};
const tabForPath = (path) => pathToTabMap[path] || (VERIFY_PATH.test(path) ? 'verify' : 'home');
const getInitialTabFromUrl = () => tabForPath(normalizePath(window.location.pathname));

export default function App() {
  const [activeTab, setActiveTab] = useState(getInitialTabFromUrl);
  const [verifyId, setVerifyId] = useState(getVerifyIdFromUrl);
  const mainRef = useRef(null);
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
    const verifying = activeTab === 'verify';
    const title = (verifying ? verifyPageMeta(verifyId).title : pageTitles[activeTab]) || 'Velora Global';
    const description = (verifying ? verifyPageMeta(verifyId).description : pageDescriptions[activeTab]) || pageDescriptions.home;
    const url = `https://velora-global.online${verifying ? `/verify/${verifyId}` : tabToPathMap[activeTab] || '/'}`;

    document.title = title;

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);

    // A certificate lookup is a record, not a page to rank, so it stays out of the index.
    const metaRobots = document.querySelector('meta[name="robots"]');
    if (metaRobots) metaRobots.setAttribute('content', verifying ? 'noindex, follow' : SITE_ROBOTS);

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

    // Update canonical link (rewritten in place so exactly one canonical exists)
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', url);
    }

    // Update remaining route-specific tags
    const metaTitle = document.querySelector('meta[name="title"]');
    if (metaTitle) metaTitle.setAttribute('content', title);

    const twUrl = document.querySelector('meta[name="twitter:url"]');
    if (twUrl) twUrl.setAttribute('content', url);
  }, [activeTab, verifyId]);

  // The verification route carries its ID in the path, so it cannot come from the static map.
  const pathForTab = (tab) => (tab === 'verify' ? `/verify/${verifyId}` : tabToPathMap[tab] || '/');

  // Helper to sync browser URL bar with selected tab
  const navigateTab = (tab, replace = false) => {
    const targetPath = pathForTab(tab);
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
      setActiveTab(tabForPath(normalizePath(window.location.pathname)));
      setVerifyId(getVerifyIdFromUrl());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Ensure initial URL reflects current tab
  useEffect(() => {
    const targetPath = pathForTab(activeTab);
    if (window.location.pathname !== targetPath) {
      window.history.replaceState({ tab: activeTab }, '', targetPath);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  // Scroll to top and ensure scrollbar is free on tab switch
  const isFirstTabRender = useRef(true);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.body.style.overflow = 'unset';

    // A route change in a SPA is invisible to screen readers unless focus follows it.
    // Skipped on mount so the first paint doesn't steal focus from the address bar.
    if (isFirstTabRender.current) {
      isFirstTabRender.current = false;
      return;
    }
    mainRef.current?.focus({ preventScroll: true });
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
    // navigateTab only reads window.history, so the redirect must not re-run on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleStaffSignIn = (user) => {
    setCurrentUser(user);
    localStorage.setItem('velora_user', JSON.stringify({ user, timestamp: Date.now() }));
  };

  return (
    <ErrorBoundary>
      {/* Premium Brand Intro Splash — plays once per session */}
      <VeloraIntro onComplete={() => setIntroReady(true)} />

      <div className="app-container" style={{
        opacity: introReady ? 1 : 0,
        visibility: introReady ? 'visible' : 'hidden',
        transition: 'opacity 0.4s ease',
      }}>
        <a className="skip-link" href="#main-content">Skip to content</a>
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
        <main
          id="main-content"
          ref={mainRef}
          tabIndex={-1}
          className="main-content"
          style={{ paddingTop: activeTab === 'home' ? 0 : '72px' }}
        >
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

              {activeTab === 'about' && (
                <AboutPage
                  onServicesClick={() => handleTabChange('services')}
                  onExploreClick={() => handleTabChange('internships')}
                  onTrainingClick={() => handleTabChange('training')}
                  onTeamClick={() => handleTabChange('team')}
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

              {activeTab === 'verify' && (
                <VerifyCertificatePage certificateId={verifyId} />
              )}

              {(activeTab === 'privacy' || activeTab === 'terms') && (
                <LegalPage
                  kind={activeTab}
                  onNavigateKind={(kind) => handleTabChange(kind)}
                  onHomeClick={() => handleTabChange('home')}
                />
              )}

              {activeTab === 'client' && (
                <ClientWorkspacePage 
                  currentUser={currentUser} 
                  onLogout={handleLogout}
                />
              )}

              {activeTab === 'admin' && (
                ['admin', 'superadmin'].includes(currentUser?.userType) ? (
                  <AdminDashboardPage 
                    currentUser={currentUser} 
                    onCertificateOpen={setActiveCertificate}
                    onLogout={handleLogout}
                  />
                ) : (
                  <StaffSignIn onSignedIn={handleStaffSignIn} />
                )
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
