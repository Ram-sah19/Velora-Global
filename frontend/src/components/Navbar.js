import React, { useState, useEffect, useRef } from 'react';
import VeloraLogo from './VeloraLogo';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  onSelectServiceCategory, 
  currentUser, 
  onOpenAuth, 
  onLogout 
}) {
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const leaveTimerRef = useRef(null);

  // Close dropdown when clicking outside
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
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Brand Logo Component */}
        <div onClick={() => setActiveTab('home')} style={{ cursor: 'pointer' }}>
          <VeloraLogo width={44} height={44} textColor="#0b0f19" />
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: '#f1f5f9', padding: '0.3rem 0.4rem', borderRadius: '9999px', border: '1px solid #e2e8f0' }}>
          <button 
            onClick={() => setActiveTab('home')}
            style={{
              padding: '0.5rem 1.1rem',
              borderRadius: '9999px',
              fontSize: '0.88rem',
              fontWeight: '600',
              background: activeTab === 'home' ? '#2563eb' : 'transparent',
              color: activeTab === 'home' ? '#ffffff' : '#64748b'
            }}
          >
            Home
          </button>

          {/* Services Tab with Interactive Animated Dropdown */}
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
                gap: '0.3rem'
              }}
            >
              Services ▾
            </button>

            {/* Dropdown Menu - Interactive Hover Effects & Smooth Transition */}
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
              padding: '0.5rem 1.1rem',
              borderRadius: '9999px',
              fontSize: '0.88rem',
              fontWeight: '600',
              background: activeTab === 'team' ? '#2563eb' : 'transparent',
              color: activeTab === 'team' ? '#ffffff' : '#64748b'
            }}
          >
            Our Team
          </button>

          <button 
            onClick={() => setActiveTab('internships')}
            style={{
              padding: '0.5rem 1.1rem',
              borderRadius: '9999px',
              fontSize: '0.88rem',
              fontWeight: '600',
              background: activeTab === 'internships' ? '#ff6b6b' : 'transparent',
              color: activeTab === 'internships' ? '#ffffff' : '#64748b'
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
              color: activeTab === 'training' ? '#ffffff' : '#64748b'
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
              color: activeTab === 'student' ? '#ffffff' : '#64748b'
            }}
          >
            Student Workspace
          </button>
        </div>

        {/* Auth Action Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button 
                onClick={() => {
                  if (currentUser.userType === 'superadmin' || currentUser.userType === 'admin') {
                    setActiveTab('admin');
                  } else {
                    setActiveTab('student');
                  }
                }}
                className="btn-secondary"
                style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem', fontWeight: '700' }}
              >
                {currentUser.name} ({currentUser.userType})
              </button>
              <button
                onClick={onLogout}
                style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '0.82rem', cursor: 'pointer', fontWeight: '600' }}
              >
                Logout
              </button>
            </div>
          ) : null}
        </div>

      </div>
    </nav>
  );
}
