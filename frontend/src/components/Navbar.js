import React, { useState, useEffect, useRef } from 'react';
import VeloraLogo from './VeloraLogo';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  onSelectServiceCategory, 
  currentUser, 
  onOpenAuth, 
  onOpenPhoneOtp,
  onLogout 
}) {
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const dropdownRef = useRef(null);
  const userDropdownRef = useRef(null);
  const leaveTimerRef = useRef(null);

  const isSuperAdmin = currentUser && (currentUser.userType === 'superadmin' || currentUser.userType === 'admin');
  const isStudent = currentUser && (currentUser.userType === 'student' || currentUser.userType === 'Student Candidate');
  const isClient = currentUser && currentUser.userType === 'client';

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowServicesDropdown(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
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

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 500,
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid #e2e8f0',
      padding: '0.85rem 0'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'nowrap', width: '100%' }}>
        
        {/* Brand Logo Component — clicking returns to homepage & scrolls to Hero top */}
        <div onClick={handleLogoClick} style={{ cursor: 'pointer' }} title="Return to Homepage">
          <VeloraLogo width={44} height={44} textColor="#0b0f19" />
        </div>

        {/* Clean Executive Navbar Tabs for Super Admin (Desktop Only) */}
        {isSuperAdmin ? (
          <div className="desktop-nav">
            <button 
              onClick={() => setActiveTab('admin')}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '9999px',
                fontSize: '0.88rem',
                fontWeight: '800',
                background: activeTab === 'admin' ? '#2563eb' : 'transparent',
                color: activeTab === 'admin' ? '#ffffff' : '#64748b',
                whiteSpace: 'nowrap'
              }}
            >
              Super Admin Dashboard
            </button>
            
            <button 
              onClick={() => setActiveTab('home')}
              style={{
                padding: '0.5rem 1.1rem',
                borderRadius: '9999px',
                fontSize: '0.88rem',
                fontWeight: '600',
                background: activeTab !== 'admin' ? '#64748b' : 'transparent',
                color: activeTab !== 'admin' ? '#ffffff' : '#64748b',
                whiteSpace: 'nowrap'
              }}
            >
              Preview Public Website ➔
            </button>
          </div>
        ) : (
          /* Standard Navigation Tabs for Visitors & Candidates (Desktop Only) */
          <div className="desktop-nav">
            <button 
              onClick={() => setActiveTab('home')}
              style={{
                padding: '0.5rem 1.1rem',
                borderRadius: '9999px',
                fontSize: '0.88rem',
                fontWeight: '600',
                background: activeTab === 'home' ? '#2563eb' : 'transparent',
                color: activeTab === 'home' ? '#ffffff' : '#64748b',
                whiteSpace: 'nowrap'
              }}
            >
              Home
            </button>

            {/* Services Tab - Only shown to unauthenticated visitors or corporate clients */}
            {!isStudent && (
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
                    padding: '0.5rem 1.1rem',
                    borderRadius: '9999px',
                    fontSize: '0.88rem',
                    fontWeight: '600',
                    background: activeTab === 'services' ? '#2563eb' : 'transparent',
                    color: activeTab === 'services' ? '#ffffff' : '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    whiteSpace: 'nowrap'
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
            )}

            <button 
              onClick={() => setActiveTab('team')}
              style={{
                padding: '0.5rem 1.1rem',
                borderRadius: '9999px',
                fontSize: '0.88rem',
                fontWeight: '600',
                background: activeTab === 'team' ? '#2563eb' : 'transparent',
                color: activeTab === 'team' ? '#ffffff' : '#64748b',
                whiteSpace: 'nowrap'
              }}
            >
              Our Team
            </button>

            {!isClient && (
              <>
                <button 
                  onClick={() => setActiveTab('internships')}
                  style={{
                    padding: '0.5rem 1.1rem',
                    borderRadius: '9999px',
                    fontSize: '0.88rem',
                    fontWeight: '600',
                    background: activeTab === 'internships' ? '#ff6b6b' : 'transparent',
                    color: activeTab === 'internships' ? '#ffffff' : '#64748b',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Explore Internships
                </button>

                <button 
                  onClick={() => setActiveTab('training')}
                  style={{
                    padding: '0.5rem 1.1rem',
                    borderRadius: '9999px',
                    fontSize: '0.88rem',
                    fontWeight: '600',
                    background: activeTab === 'training' ? '#2563eb' : 'transparent',
                    color: activeTab === 'training' ? '#ffffff' : '#64748b',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Training Programs
                </button>

                <button 
                  onClick={() => setActiveTab('student')}
                  style={{
                    padding: '0.5rem 1.1rem',
                    borderRadius: '9999px',
                    fontSize: '0.88rem',
                    fontWeight: '600',
                    background: activeTab === 'student' ? '#2563eb' : 'transparent',
                    color: activeTab === 'student' ? '#ffffff' : '#64748b',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Student Workspace
                </button>
              </>
            )}

            {isClient && (
              <button 
                onClick={() => setActiveTab('client')}
                style={{
                  padding: '0.5rem 1.15rem',
                  borderRadius: '9999px',
                  fontSize: '0.88rem',
                  fontWeight: '800',
                  background: activeTab === 'client' ? '#f94d4d' : 'transparent',
                  color: activeTab === 'client' ? '#ffffff' : '#f94d4d',
                  border: '1.5px solid #f94d4d',
                  whiteSpace: 'nowrap'
                }}
              >
                Corporate Profile
              </button>
            )}
          </div>
        )}

        {/* User Profile / Auth Dropdown Menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {currentUser ? (
            <div ref={userDropdownRef} style={{ position: 'relative' }}>
              <button 
                onClick={() => setShowUserDropdown(prev => !prev)}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  color: '#0b0f19',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>{currentUser.name}</span>
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>({currentUser.userType})</span>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>▾</span>
              </button>

              {/* User Dropdown Menu Card */}
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                paddingTop: '0.4rem',
                zIndex: 600,
                opacity: showUserDropdown ? 1 : 0,
                visibility: showUserDropdown ? 'visible' : 'hidden',
                transform: showUserDropdown ? 'translateY(0) scale(1)' : 'translateY(-8px) scale(0.96)',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                pointerEvents: showUserDropdown ? 'auto' : 'none'
              }}>
                <div style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '0.85rem 1rem',
                  boxShadow: 'var(--shadow-lg)',
                  minWidth: '220px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.65rem'
                }}>
                  {/* User Profile Header */}
                  <div style={{ paddingBottom: '0.5rem', borderBottom: '1px solid #f1f5f9' }}>
                    <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: '800', color: '#0b0f19' }}>
                      {currentUser.name}
                    </span>
                    <span style={{ display: 'block', fontSize: '0.78rem', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {currentUser.email}
                    </span>
                  </div>

                  {/* Workspace Shortcut */}
                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      if (currentUser.userType === 'superadmin' || currentUser.userType === 'admin') {
                        setActiveTab('admin');
                      } else if (currentUser.userType === 'client') {
                        setActiveTab('client');
                      } else {
                        setActiveTab('student');
                      }
                    }}
                    style={{
                      padding: '0.55rem 0.75rem',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      background: '#f8fafc',
                      color: '#2563eb',
                      fontSize: '0.82rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    {currentUser.userType === 'superadmin' || currentUser.userType === 'admin' 
                      ? 'Executive Dashboard ➔' 
                      : currentUser.userType === 'client' 
                      ? 'My Corporate Workspace ➔' 
                      : 'My Student Workspace ➔'}
                  </button>

                  {/* Logout Button */}
                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      onLogout();
                    }}
                    style={{
                      padding: '0.55rem 0.75rem',
                      borderRadius: '8px',
                      border: 'none',
                      background: '#fff5f5',
                      color: '#dc2626',
                      fontSize: '0.82rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    Logout Account ➔
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              style={{
                background: '#f94d4d',
                color: '#ffffff',
                border: 'none',
                borderRadius: '9999px',
                padding: '0.5rem 1.25rem',
                fontSize: '0.88rem',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(249, 77, 77, 0.3)',
                transition: 'all 0.2s ease'
              }}
            >
              Sign In / Register
            </button>
          )}
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
              Our Executive Team
            </button>

            {!isClient && (
              <>
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
                    setActiveTab('student');
                    setIsMobileMenuOpen(false);
                  }}
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    textAlign: 'left',
                    fontWeight: '700',
                    background: activeTab === 'student' ? '#eff6ff' : '#f8fafc',
                    color: activeTab === 'student' ? '#2563eb' : '#0b0f19',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Student Workspace
                </button>
              </>
            )}

            {isClient && (
              <button
                onClick={() => {
                  setActiveTab('client');
                  setIsMobileMenuOpen(false);
                }}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  textAlign: 'left',
                  fontWeight: '700',
                  background: activeTab === 'client' ? '#fff5f5' : '#f8fafc',
                  color: '#f94d4d',
                  border: '1px solid #f94d4d',
                  cursor: 'pointer'
                }}
              >
                Corporate Profile
              </button>
            )}

            {isSuperAdmin && (
              <button
                onClick={() => {
                  setActiveTab('admin');
                  setIsMobileMenuOpen(false);
                }}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  textAlign: 'left',
                  fontWeight: '800',
                  background: '#2563eb',
                  color: '#ffffff',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Super Admin Dashboard
              </button>
            )}
          </div>
        )}

      </div>
    </nav>
  );
}
