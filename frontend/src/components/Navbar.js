import React, { useState, useEffect, useRef } from 'react';
import VeloraLogo from './VeloraLogo';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  onSelectServiceCategory, 
  onConsultationClick 
}) {
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const dropdownRef = useRef(null);
  const leaveTimerRef = useRef(null);

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

  const isTransparent = activeTab === 'home' && !isScrolled;

  return (
    <nav style={{
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
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'nowrap', width: '100%' }}>
        
        {/* Brand Logo Component — clicking returns to homepage & scrolls to Hero top */}
        <div onClick={handleLogoClick} style={{ cursor: 'pointer' }} title="Return to Homepage">
          <VeloraLogo width={44} height={44} textColor="#0b0f19" />
        </div>

        {/* Standard Navigation Tabs (Desktop Only) */}
        <div className="desktop-nav">
            <button 
              onClick={() => setActiveTab('home')}
              style={{
                padding: '0.5rem 1.15rem',
                borderRadius: '9999px',
                fontSize: '0.88rem',
                fontWeight: '700',
                background: activeTab === 'home' ? '#2563eb' : 'transparent',
                color: activeTab === 'home' ? '#ffffff' : '#0b0f19',
                whiteSpace: 'nowrap',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Home
            </button>

            {/* Services Tab - Global Enterprise Solutions */}
            <div 
              ref={dropdownRef}
              style={{ position: 'relative' }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button 
                onClick={() => {
                  setActiveTab('services');
                  setShowServicesDropdown(prev => !prev);
                }}
                style={{
                  padding: '0.5rem 1.15rem',
                  borderRadius: '9999px',
                  fontSize: '0.88rem',
                  fontWeight: '700',
                  background: activeTab === 'services' ? '#2563eb' : 'transparent',
                  color: activeTab === 'services' ? '#ffffff' : '#0b0f19',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  whiteSpace: 'nowrap',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                Services ▾
              </button>

              {/* Dropdown Menu */}
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '0',
                paddingTop: '0.4rem',
                zIndex: 600,
                opacity: showServicesDropdown ? 1 : 0,
                visibility: showServicesDropdown ? 'visible' : 'hidden',
                transform: showServicesDropdown ? 'translateY(0) scale(1)' : 'translateY(-8px) scale(0.96)',
                transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
                pointerEvents: showServicesDropdown ? 'auto' : 'none'
              }}>
                <div style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '0.6rem',
                  boxShadow: 'var(--shadow-lg)',
                  minWidth: '260px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.2rem'
                }}>
                  <button
                    onClick={() => handleServiceSelect('all')}
                    className="dropdown-menu-item"
                    style={{ fontWeight: '700', color: '#0b0f19' }}
                  >
                    All Services Overview
                  </button>
                  <button
                    onClick={() => handleServiceSelect('web')}
                    className="dropdown-menu-item"
                  >
                    Web App Development
                  </button>
                  <button
                    onClick={() => handleServiceSelect('mobile')}
                    className="dropdown-menu-item"
                  >
                    Mobile App Development
                  </button>
                  <button
                    onClick={() => handleServiceSelect('ai')}
                    className="dropdown-menu-item"
                  >
                    AI Chatbot Integration in Web Apps
                  </button>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setActiveTab('team')}
              style={{
                padding: '0.5rem 1.15rem',
                borderRadius: '9999px',
                fontSize: '0.88rem',
                fontWeight: '700',
                background: activeTab === 'team' ? '#2563eb' : 'transparent',
                color: activeTab === 'team' ? '#ffffff' : '#0b0f19',
                whiteSpace: 'nowrap',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              About Us
            </button>

            <button 
              onClick={() => setActiveTab('internships')}
              style={{
                padding: '0.5rem 1.15rem',
                borderRadius: '9999px',
                fontSize: '0.88rem',
                fontWeight: '700',
                background: activeTab === 'internships' ? '#ff6b6b' : 'transparent',
                color: activeTab === 'internships' ? '#ffffff' : '#0b0f19',
                whiteSpace: 'nowrap',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Explore Internships
            </button>

            <button 
              onClick={() => setActiveTab('training')}
              style={{
                padding: '0.5rem 1.15rem',
                borderRadius: '9999px',
                fontSize: '0.88rem',
                fontWeight: '700',
                background: activeTab === 'training' ? '#2563eb' : 'transparent',
                color: activeTab === 'training' ? '#ffffff' : '#0b0f19',
                whiteSpace: 'nowrap',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Training Programs
            </button>
          </div>

        {/* Right Header Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {/* Direct Consultation / Discovery CTA Button */}
          <button
            onClick={onConsultationClick}
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
            <span style={{ fontSize: '0.92rem' }}>➔</span>
          </button>
          {/* Mobile & Tablet Hamburger Toggle Button (Shown on screens < 1024px) */}
          <button
            className="mobile-nav-toggle"
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
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
            <span>{isMobileMenuOpen ? '✕' : '☰'}</span>
            <span style={{ fontSize: '0.82rem' }}>Menu</span>
          </button>
        </div>

        {/* Mobile & Tablet Slide-Down Navigation Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="mobile-menu-drawer" style={{
            width: '100%',
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '1rem',
            marginTop: '0.75rem',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            animation: 'modalSlideUp 0.22s ease-out'
          }}>
            <button
              onClick={() => {
                setActiveTab('home');
                setIsMobileMenuOpen(false);
              }}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                textAlign: 'left',
                fontWeight: '700',
                background: activeTab === 'home' ? '#eff6ff' : '#f8fafc',
                color: activeTab === 'home' ? '#2563eb' : '#0b0f19',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Home Overview
            </button>

            <button
              onClick={() => {
                setActiveTab('services');
                setIsMobileMenuOpen(false);
              }}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                textAlign: 'left',
                fontWeight: '700',
                background: activeTab === 'services' ? '#eff6ff' : '#f8fafc',
                color: activeTab === 'services' ? '#2563eb' : '#0b0f19',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Enterprise Services
            </button>

            <button
              onClick={() => {
                setActiveTab('team');
                setIsMobileMenuOpen(false);
              }}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                textAlign: 'left',
                fontWeight: '700',
                background: activeTab === 'team' ? '#eff6ff' : '#f8fafc',
                color: activeTab === 'team' ? '#2563eb' : '#0b0f19',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              About Us
            </button>

            <button
              onClick={() => {
                setActiveTab('internships');
                setIsMobileMenuOpen(false);
              }}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                textAlign: 'left',
                fontWeight: '700',
                background: activeTab === 'internships' ? '#fff5f5' : '#f8fafc',
                color: activeTab === 'internships' ? '#ff6b6b' : '#0b0f19',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Explore Internships
            </button>

            <button
              onClick={() => {
                setActiveTab('training');
                setIsMobileMenuOpen(false);
              }}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                textAlign: 'left',
                fontWeight: '700',
                background: activeTab === 'training' ? '#eff6ff' : '#f8fafc',
                color: activeTab === 'training' ? '#2563eb' : '#0b0f19',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Guided Training Programs
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
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
                boxShadow: '0 4px 14px rgba(255, 84, 84, 0.35)'
              }}
            >
              Book 1-on-1 Counseling ➔
            </button>
          </div>
        )}

      </div>
    </nav>
  );
}
