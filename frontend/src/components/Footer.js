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
              Founded by Rohit Sah • Co-Founded by Krishna Sah & Puja Rouniyar
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
                  Executive Team
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

          {/* Contact */}
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
            <p style={{ fontSize: '0.85rem', marginBottom: '0.35rem', color: '#94a3b8' }}>
              <strong>General:</strong> <a href="mailto:info@velora-global.online" style={{ color: '#60a5fa' }}>info@velora-global.online</a>
            </p>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Website: velora-global.online</p>
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
