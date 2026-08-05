import React from 'react';

export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 500,
      background: 'rgba(11, 15, 25, 0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '1rem 0'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)',
            fontSize: '1.4rem',
            fontWeight: '800',
            color: 'white'
          }}>
            V
          </div>
          <div>
            <span style={{ fontSize: '1.4rem', fontWeight: '800', letterSpacing: '-0.03em' }}>
              VELORA <span className="gradient-text">GLOBAL</span>
            </span>
            <span style={{ display: 'block', fontSize: '0.68rem', color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '-4px' }}>
              Internship & Career Platform
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(18, 24, 38, 0.6)', padding: '0.35rem 0.5rem', borderRadius: '9999px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <button 
            onClick={() => setActiveTab('home')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.9rem',
              fontWeight: '600',
              background: activeTab === 'home' ? '#6366f1' : 'transparent',
              color: activeTab === 'home' ? '#ffffff' : '#94a3b8'
            }}
          >
            Home
          </button>
          <button 
            onClick={() => setActiveTab('programs')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.9rem',
              fontWeight: '600',
              background: activeTab === 'programs' ? '#6366f1' : 'transparent',
              color: activeTab === 'programs' ? '#ffffff' : '#94a3b8'
            }}
          >
            Explore Internships
          </button>
          <button 
            onClick={() => setActiveTab('student')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.9rem',
              fontWeight: '600',
              background: activeTab === 'student' ? '#6366f1' : 'transparent',
              color: activeTab === 'student' ? '#ffffff' : '#94a3b8'
            }}
          >
            Student Workspace
          </button>
          <button 
            onClick={() => setActiveTab('admin')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.9rem',
              fontWeight: '600',
              background: activeTab === 'admin' ? '#6366f1' : 'transparent',
              color: activeTab === 'admin' ? '#ffffff' : '#94a3b8'
            }}
          >
            Founder Panel
          </button>
          <button 
            onClick={() => setActiveTab('verify')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.9rem',
              fontWeight: '600',
              background: activeTab === 'verify' ? '#6366f1' : 'transparent',
              color: activeTab === 'verify' ? '#ffffff' : '#94a3b8'
            }}
          >
            Verify Certificate
          </button>
        </div>

        {/* Action Button */}
        <div>
          <button 
            onClick={() => setActiveTab('programs')}
            className="btn-primary"
            style={{ fontSize: '0.88rem', padding: '0.55rem 1.2rem' }}
          >
            Apply Now 🚀
          </button>
        </div>

      </div>
    </nav>
  );
}
