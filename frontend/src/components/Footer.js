import React, { useState } from 'react';
import VeloraLogo from './VeloraLogo';

import StudentTermsModal from './StudentTermsModal';
import StudentPrivacyModal from './StudentPrivacyModal';
import ClientTermsModal from './ClientTermsModal';
import ClientPrivacyModal from './ClientPrivacyModal';

export default function Footer({ setActiveTab }) {
  const [activeModal, setActiveModal] = useState(null); // 'student-terms', 'student-privacy', 'client-terms', 'client-privacy'

  return (
    <footer className="global-footer" style={{
      background: '#0b0f19',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '4rem 0 2rem 0',
      color: '#94a3b8',
      marginTop: 'auto',
      width: '100%'
    }}>
      <div className="container">
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem'
        }}>
          
          {/* Brand Info */}
          <div>
            <div 
              onClick={() => {
                setActiveTab('home');
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
              }} 
              style={{ marginBottom: '1.25rem', cursor: 'pointer', display: 'inline-block' }}
              title="Return to Homepage"
            >
              <VeloraLogo width={40} height={40} textColor="#ffffff" />
            </div>

            <p style={{ fontSize: '0.88rem', lineHeight: '1.6', marginBottom: '1.25rem', color: '#94a3b8' }}>
              Empowering businesses with enterprise digital solutions and students with practical work experience & verified certifications.
            </p>

            <span style={{ fontSize: '0.8rem', color: 'rgb(96, 165, 250)', display: 'block', fontWeight: '600' }}>
              Founded by Rohit Sah • Co-Founded by Krishna Sah (CTO) & Puja Rouniyar (COO)
            </span>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.05rem', marginBottom: '1rem' }}>Platform Portals</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.88rem' }}>
              <li>
                <button onClick={() => setActiveTab('home')} style={{ background: 'none', color: '#94a3b8', border: 'none', cursor: 'pointer', padding: 0 }}>
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('services')} style={{ background: 'none', color: '#60a5fa', border: 'none', cursor: 'pointer', padding: 0, fontWeight: '700' }}>
                  Client Software Services
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('team')} style={{ background: 'none', color: '#94a3b8', border: 'none', cursor: 'pointer', padding: 0 }}>
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('internships')} style={{ background: 'none', color: '#94a3b8', border: 'none', cursor: 'pointer', padding: 0 }}>
                  Practical Internships
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('training')} style={{ background: 'none', color: '#94a3b8', border: 'none', cursor: 'pointer', padding: 0 }}>
                  Training Programs
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('student')} style={{ background: 'none', color: '#94a3b8', border: 'none', cursor: 'pointer', padding: 0 }}>
                  Student Workspace
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Governance Column */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.05rem', marginBottom: '1rem' }}>Legal & Governance</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.88rem' }}>
              <li>
                <button onClick={() => setActiveModal('student-terms')} style={{ background: 'none', color: '#94a3b8', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left' }}>
                  Student Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('student-privacy')} style={{ background: 'none', color: '#94a3b8', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left' }}>
                  Student Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('client-terms')} style={{ background: 'none', color: '#ff6b6b', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left', fontWeight: '600' }}>
                  Client Engineering Terms
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('client-privacy')} style={{ background: 'none', color: '#ff6b6b', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left', fontWeight: '600' }}>
                  Client Data Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Social Channels */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.05rem', marginBottom: '1rem' }}>Contact & Support</h4>
            <p style={{ fontSize: '0.85rem', marginBottom: '0.35rem', color: '#94a3b8' }}>
              <strong>Support:</strong> <a href="mailto:support@velora-global.online" style={{ color: '#60a5fa' }}>support@velora-global.online</a>
            </p>
            <p style={{ fontSize: '0.85rem', marginBottom: '0.35rem', color: '#94a3b8' }}>
              <strong>Corporate:</strong> <a href="mailto:contact@velora-global.online" style={{ color: '#60a5fa' }}>contact@velora-global.online</a>
            </p>
            <p style={{ fontSize: '0.85rem', marginBottom: '0.35rem', color: '#94a3b8' }}>
              <strong>HR Desk:</strong> <a href="mailto:hr@velora-global.online" style={{ color: '#60a5fa' }}>hr@velora-global.online</a>
            </p>

            {/* Official Social Media Channels */}
            <div style={{ marginTop: '1.5rem' }}>
              <span style={{
                fontSize: '0.75rem',
                color: '#64748b',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                display: 'block',
                marginBottom: '0.75rem'
              }}>
                Official Social Channels
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {/* LinkedIn */}
                <a 
                  href="https://www.linkedin.com/company/veloraglo-bal/" 
                  target="_blank" 
                  rel="noreferrer"
                  title="Follow Velora Global on LinkedIn"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.6rem 0.85rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '10px',
                    color: '#e2e8f0',
                    fontSize: '0.82rem',
                    fontWeight: '600',
                    textDecoration: 'none',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(10, 102, 194, 0.12)';
                    e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.4)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#60a5fa" style={{ flexShrink: 0 }}>
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    <span>LinkedIn</span>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '500' }}>@veloraglo-bal ➔</span>
                </a>

                {/* Instagram */}
                <a 
                  href="https://www.instagram.com/veloraglobal_/" 
                  target="_blank" 
                  rel="noreferrer"
                  title="Follow Velora Global on Instagram"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.6rem 0.85rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '10px',
                    color: '#e2e8f0',
                    fontSize: '0.82rem',
                    fontWeight: '600',
                    textDecoration: 'none',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(225, 48, 108, 0.12)';
                    e.currentTarget.style.borderColor = 'rgba(244, 114, 182, 0.4)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#f472b6" style={{ flexShrink: 0 }}>
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span>Instagram</span>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '500' }}>@veloraglobal_ ➔</span>
                </a>

                {/* Facebook */}
                <a 
                  href="https://www.facebook.com/veloraglobal02" 
                  target="_blank" 
                  rel="noreferrer"
                  title="Follow Velora Global on Facebook"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.6rem 0.85rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '10px',
                    color: '#e2e8f0',
                    fontSize: '0.82rem',
                    fontWeight: '600',
                    textDecoration: 'none',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(24, 119, 242, 0.12)';
                    e.currentTarget.style.borderColor = 'rgba(147, 197, 253, 0.4)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#93c5fd" style={{ flexShrink: 0 }}>
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span>Facebook</span>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '500' }}>@veloraglobal02 ➔</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '1.5rem',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.82rem',
          color: '#64748b'
        }}>
          <div>
            © {new Date().getFullYear()} Velora Global. All rights reserved. Built with Pro Corporate MERN architecture.
          </div>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <button onClick={() => setActiveModal('student-terms')} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '0.82rem' }}>Student Terms</button>
            <button onClick={() => setActiveModal('student-privacy')} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '0.82rem' }}>Student Privacy</button>
            <button onClick={() => setActiveModal('client-terms')} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '0.82rem' }}>Client Terms</button>
            <button onClick={() => setActiveModal('client-privacy')} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '0.82rem' }}>Client Privacy</button>
          </div>
        </div>

      </div>

      {/* Modal Governance Renderers */}
      {activeModal === 'student-terms' && <StudentTermsModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'student-privacy' && <StudentPrivacyModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'client-terms' && <ClientTermsModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'client-privacy' && <ClientPrivacyModal onClose={() => setActiveModal(null)} />}
    </footer>
  );
}
