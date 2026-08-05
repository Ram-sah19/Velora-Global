import React from 'react';
import VeloraLogo from './VeloraLogo';

export default function Navbar({ activeTab, setActiveTab }) {
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
        <div onClick={() => setActiveTab('home')}>
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
          <button 
            onClick={() => setActiveTab('programs')}
            style={{
              padding: '0.5rem 1.1rem',
              borderRadius: '9999px',
              fontSize: '0.88rem',
              fontWeight: '600',
              background: activeTab === 'programs' ? '#2563eb' : 'transparent',
              color: activeTab === 'programs' ? '#ffffff' : '#64748b'
            }}
          >
            Explore Internships
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
          <button 
            onClick={() => setActiveTab('verify')}
            style={{
              padding: '0.5rem 1.1rem',
              borderRadius: '9999px',
              fontSize: '0.88rem',
              fontWeight: '600',
              background: activeTab === 'verify' ? '#2563eb' : 'transparent',
              color: activeTab === 'verify' ? '#ffffff' : '#64748b'
            }}
          >
            Verify Certificate
          </button>
        </div>

        {/* Action Button */}
        <div>
          <button 
            onClick={() => setActiveTab('programs')}
            className="btn-coral"
            style={{ fontSize: '0.88rem', padding: '0.55rem 1.25rem' }}
          >
            Apply Now
          </button>
        </div>

      </div>
    </nav>
  );
}
