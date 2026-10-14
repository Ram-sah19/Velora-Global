import React, { useState, useEffect, useRef } from 'react';
import VeloraLogo from './VeloraLogo';
import { tabToPathMap } from '../constants';

// Modifier clicks must keep the browser's native behaviour (new tab / new window / copy link).
const isPlainLeftClick = (event) =>
  event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;

function NavTab({ href, isActive, onActivate, hasPopup, expanded, children }) {
  return (
    <a
      href={href}
      className="nav-tab"
      aria-current={isActive ? 'page' : undefined}
      aria-haspopup={hasPopup ? 'true' : undefined}
      aria-expanded={hasPopup ? expanded : undefined}
      onClick={(event) => {
        if (isPlainLeftClick(event)) {
          event.preventDefault();
          onActivate();
        }
      }}
    >
      {children}
    </a>
  );
}

const ArrowIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <line x1="4" y1="12" x2="19" y2="12" />
    <polyline points="13 6 19 12 13 18" />
  </svg>
);

const ChevronIcon = ({ open }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    style={{ transition: 'transform 0.2s ease', transform: open ? 'rotate(180deg)' : 'none' }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const MenuIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true" focusable="false">
    <line x1="3" y1="7" x2="21" y2="7" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="17" x2="21" y2="17" />
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true" focusable="false">
    <line x1="5" y1="5" x2="19" y2="19" />
    <line x1="19" y1="5" x2="5" y2="19" />
  </svg>
);

// Every column heading links to a matching /services filter, so the menu and the page
// advertise the same five offerings.
const SERVICE_MENU_COLUMNS = [
  {
    heading: 'Web Development',
    category: 'web',
    items: [
      'Business & Corporate Sites',
      'E-commerce Development',
      'School & College Portals',
      'Custom Web Applications',
      'Landing Pages',
      'Redesign & UI/UX'
    ]
  },
  {
    heading: 'SEO & Digital Growth',
    category: 'seo',
    items: [
      'Technical & On-Page SEO',
      'Local SEO',
      'Keyword Research',
      'Google Business Profile',
      'Speed Optimization',
      'SEO Audits & Reports'
    ]
  },
  {
    heading: 'Maintenance & Support',
    category: 'support',
    items: [
      'Content & Feature Updates',
      'Bug Fixing',
      'Security & Monitoring',
      'Backup & Recovery',
      'Hosting & Domain Support',
      'Website Migration'
    ]
  }
];

const SERVICE_MENU_LINKS = [
  { label: 'All Services Overview', category: 'all' },
  { label: 'Mobile App Development', category: 'mobile' },
  { label: 'AI Chatbots & Intelligent Agents', category: 'ai' }
];

function DrawerLink({ href, isActive, onActivate, activeBg = '#2563eb', activeSoft = '#eff6ff', children }) {
  return (
    <a
      href={href}
      aria-current={isActive ? 'page' : undefined}
      onClick={(event) => {
        if (isPlainLeftClick(event)) {
          event.preventDefault();
          onActivate();
        }
      }}
      style={{
        padding: '0.75rem 1rem',
        borderRadius: '10px',
        textAlign: 'left',
        fontSize: '0.78rem',
        fontWeight: '500',
        fontFamily: 'var(--font-ui)',
        textTransform: 'uppercase',
        letterSpacing: '0.13em',
        background: isActive ? activeSoft : '#f8fafc',
        color: isActive ? activeBg : '#0b0f19',
        textDecoration: 'none',
        cursor: 'pointer'
      }}
    >
      {children}
    </a>
  );
}

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  onSelectServiceCategory, 
  onConsultationClick 
}) {
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDrawerClosing, setIsDrawerClosing] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const dropdownRef = useRef(null);
  const leaveTimerRef = useRef(null);
  const drawerCloseTimerRef = useRef(null);

  // Dynamic scroll listener for transparent navbar effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowServicesDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    setShowServicesDropdown(true);
  };

  const handleMouseLeave = () => {
    leaveTimerRef.current = setTimeout(() => {
      setShowServicesDropdown(false);
    }, 150);
  };

  const handleServiceSelect = (categoryKey = 'all') => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    if (onSelectServiceCategory) onSelectServiceCategory(categoryKey);
    setActiveTab('services');
    setShowServicesDropdown(false);
  };

  const handleLogoClick = () => {
    setActiveTab('home');
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  // Animated drawer close: play out-transition before unmounting
  const closeMobileMenu = () => {
    if (!isMobileMenuOpen) return;
    setIsDrawerClosing(true);
    drawerCloseTimerRef.current = setTimeout(() => {
      setIsMobileMenuOpen(false);
      setIsDrawerClosing(false);
    }, 200);
  };

  useEffect(() => () => {
    if (drawerCloseTimerRef.current) clearTimeout(drawerCloseTimerRef.current);
  }, []);

  // An overlay that only dismisses on a pointer click traps keyboard users.
  useEffect(() => {
    if (!isMobileMenuOpen && !showServicesDropdown) return undefined;
    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      if (isMobileMenuOpen) {
        closeMobileMenu();
      } else {
        setShowServicesDropdown(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobileMenuOpen, showServicesDropdown]);

  const isTransparent = activeTab === 'home' && !isScrolled;

  return (
    <nav aria-label="Primary" className={isTransparent ? 'navbar-transparent' : undefined} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      width: '100%',
      zIndex: 500,
      background: isTransparent ? 'transparent' : 'rgba(255, 255, 255, 0.88)',
      backdropFilter: isTransparent ? 'none' : 'blur(16px)',
      WebkitBackdropFilter: isTransparent ? 'none' : 'blur(16px)',
      borderBottom: isTransparent ? 'none' : '1px solid rgba(226, 232, 240, 0.8)',
      boxShadow: isTransparent ? 'none' : '0 4px 20px rgba(0, 0, 0, 0.05)',
      padding: '0.9rem 0',
      transition: 'background 0.3s ease, backdrop-filter 0.3s ease, border 0.3s ease, box-shadow 0.3s ease'
    }}>
      <div className="container navbar-shell" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'nowrap', width: '100%', position: 'relative' }}>
        
        {/* Brand Logo Component — clicking returns to homepage & scrolls to Hero top */}
        <a
          href="/"
          aria-label="Velora Global — return to homepage"
          onClick={(event) => {
            if (isPlainLeftClick(event)) {
              event.preventDefault();
              handleLogoClick();
            }
          }}
          style={{ cursor: 'pointer', display: 'inline-flex' }}
        >
          <VeloraLogo width={44} height={44} textColor="#0b0f19" />
        </a>

        {/* Standard Navigation Tabs (Desktop Only) */}
        <div className="desktop-nav">
            <NavTab href="/" isActive={activeTab === 'home'} onActivate={() => setActiveTab('home')}>
              Home
            </NavTab>

            {/* Services Tab - Global Enterprise Solutions */}
            {/* Static on purpose: the mega menu is a DOM child here, but resolves its box
                against .navbar-shell so it can span the full navbar width. */}
            <div 
              ref={dropdownRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <NavTab
                href={tabToPathMap.services}
                isActive={activeTab === 'services'}
                hasPopup
                expanded={showServicesDropdown}
                onActivate={() => {
                  setActiveTab('services');
                  setShowServicesDropdown(prev => !prev);
                }}
              >
                Services
                <ChevronIcon open={showServicesDropdown} />
              </NavTab>

              {/* Dropdown Menu */}
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                paddingTop: '0.4rem',
                zIndex: 600,
                opacity: showServicesDropdown ? 1 : 0,
                visibility: showServicesDropdown ? 'visible' : 'hidden',
                transform: showServicesDropdown ? 'translateY(0)' : 'translateY(-6px)',
                transition: 'opacity 0.2s ease, transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.2s',
                pointerEvents: showServicesDropdown ? 'auto' : 'none'
              }}>
                <div style={{
                  background: '#ffffff',
                  border: '1px solid #e4e8ef',
                  borderRadius: '10px',
                  padding: '1.15rem 1.25rem',
                  boxShadow: '0 16px 40px -18px rgba(11, 18, 32, 0.28)'
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '1.5rem' }}>
                    {SERVICE_MENU_COLUMNS.map((column) => (
                      <div key={column.heading}>
                        <a
                          href={tabToPathMap.services}
                          onClick={(event) => {
                            if (isPlainLeftClick(event)) {
                              event.preventDefault();
                              handleServiceSelect(column.category);
                            }
                          }}
                          className="dropdown-menu-item"
                          style={{ fontWeight: '700', color: '#0b0f19', padding: '0.35rem 0.9rem' }}
                        >
                          {column.heading}
                        </a>

                        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                          {column.items.map((item) => (
                            <li key={item} style={{ padding: '0.3rem 0.9rem', fontSize: '0.82rem', color: '#64748b', lineHeight: '1.35' }}>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}

                    <div style={{ borderLeft: '1px solid #e2e8f0', paddingLeft: '1.5rem' }}>
                      <span style={{ display: 'block', padding: '0.35rem 0.9rem', fontSize: '0.7rem', fontWeight: '700', letterSpacing: '0.07em', textTransform: 'uppercase', color: '#94a3b8' }}>
                        Explore
                      </span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', marginTop: '0.2rem' }}>
                        {SERVICE_MENU_LINKS.map((link) => (
                          <a
                            key={link.label}
                            href={tabToPathMap.services}
                            onClick={(event) => {
                              if (isPlainLeftClick(event)) {
                                event.preventDefault();
                                handleServiceSelect(link.category);
                              }
                            }}
                            className="dropdown-menu-item"
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <NavTab href={tabToPathMap.about} isActive={activeTab === 'about'} onActivate={() => setActiveTab('about')}>
              About Us
            </NavTab>

            <NavTab
              href={tabToPathMap.internships}
              isActive={activeTab === 'internships'}
              onActivate={() => setActiveTab('internships')}
            >
              Explore Internships
            </NavTab>

            <NavTab href={tabToPathMap.training} isActive={activeTab === 'training'} onActivate={() => setActiveTab('training')}>
              Training Programs
            </NavTab>
          </div>

        {/* Right Header Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {/* Direct Consultation / Discovery CTA Button (hidden on small phones) */}
          <button
            onClick={onConsultationClick}
            className="nav-cta"
            style={{
              background: 'linear-gradient(135deg, #ff5454 0%, #ff3b3b 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '9999px',
              padding: '0.52rem 1.35rem',
              fontSize: '0.88rem',
              fontWeight: '800',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(255, 84, 84, 0.35)',
              transition: 'all 0.18s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(255, 84, 84, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(255, 84, 84, 0.35)';
            }}
          >
            <span>1-on-1 Counseling</span>
            <ArrowIcon />
          </button>
          {/* Mobile & Tablet Hamburger Toggle Button (Shown on screens < 1024px) */}
          <button
            className="mobile-nav-toggle"
            onClick={() => {
              if (isMobileMenuOpen) {
                closeMobileMenu();
              } else {
                if (drawerCloseTimerRef.current) clearTimeout(drawerCloseTimerRef.current);
                setIsDrawerClosing(false);
                setIsMobileMenuOpen(true);
              }
            }}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            style={{
              padding: '0.45rem 0.9rem',
              borderRadius: '9999px',
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              color: '#0b0f19',
              fontSize: '1rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: 'var(--shadow-sm)'
            }}
            title="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            <span style={{ fontSize: '0.75rem', fontWeight: '500', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Menu</span>
          </button>
        </div>

        {/* Mobile & Tablet Drop-Down Navigation Menu Drawer (anchored below the bar) */}
        {(isMobileMenuOpen || isDrawerClosing) && (
          <div
            id="mobile-nav-drawer"
            className="mobile-menu-drawer"
            style={{
              position: 'absolute',
              top: 'calc(100% + 1.7rem)',
              left: 0,
              right: 0,
              zIndex: 700,
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '1rem',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              maxHeight: 'calc(100vh - 110px)',
              overflowY: 'auto',
              animation: isDrawerClosing ? 'navbarDrawerOut 0.2s ease-in forwards' : 'navbarDrawerIn 0.24s cubic-bezier(0.22, 1, 0.36, 1)'
            }}
          >
            <DrawerLink href="/" isActive={activeTab === 'home'} onActivate={() => { setActiveTab('home'); closeMobileMenu(); }}>
              Home Overview
            </DrawerLink>

            <DrawerLink href={tabToPathMap.services} isActive={activeTab === 'services'} onActivate={() => { setActiveTab('services'); closeMobileMenu(); }}>
              Enterprise Services
            </DrawerLink>

            <DrawerLink href={tabToPathMap.about} isActive={activeTab === 'about'} onActivate={() => { setActiveTab('about'); closeMobileMenu(); }}>
              About Us
            </DrawerLink>

            <DrawerLink
              href={tabToPathMap.internships}
              isActive={activeTab === 'internships'}
              activeBg="#ff6b6b"
              activeSoft="#fff5f5"
              onActivate={() => { setActiveTab('internships'); closeMobileMenu(); }}
            >
              Explore Internships
            </DrawerLink>

            <DrawerLink href={tabToPathMap.training} isActive={activeTab === 'training'} onActivate={() => { setActiveTab('training'); closeMobileMenu(); }}>
              Guided Training Programs
            </DrawerLink>

            <button
              onClick={() => {
                closeMobileMenu();
                if (onConsultationClick) onConsultationClick();
              }}
              style={{
                padding: '0.85rem 1rem',
                borderRadius: '10px',
                textAlign: 'center',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #ff5454 0%, #ff3b3b 100%)',
                color: '#ffffff',
                border: 'none',
                cursor: 'pointer',
                marginTop: '0.5rem',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.45rem',
                boxShadow: '0 4px 14px rgba(255, 84, 84, 0.35)'
              }}
            >
              Book 1-on-1 Counseling
              <ArrowIcon size={14} />
            </button>
          </div>
        )}

      </div>
    </nav>
  );
}
