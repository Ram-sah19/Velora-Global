import React from 'react';
import VeloraLogo from './VeloraLogo';

export default function Footer({ setActiveTab }) {
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          
          {/* Brand Info */}
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <VeloraLogo width={40} height={40} textColor="#ffffff" />
            </div>

            <p style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.25rem', color: '#94a3b8' }}>
              Empowering students with practical experience, industry exposure, and verified internship opportunities to launch successful careers.
            </p>

            <span style={{ fontSize: '0.8rem', color: '#60a5fa', display: 'block', fontWeight: '600' }}>
              Founded by Rambilas Sah • Co-Founded by Puja Rouniyar & Rohit Sah
            </span>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '1rem' }}>Platform Portals</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
              <li>
                <button onClick={() => setActiveTab('home')} style={{ background: 'none', color: '#94a3b8' }}>
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('team')} style={{ background: 'none', color: '#94a3b8' }}>
                  Executive Team
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('programs')} style={{ background: 'none', color: '#94a3b8' }}>
                  Browse Internship Domains
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('student')} style={{ background: 'none', color: '#94a3b8' }}>
                  Student Workspace
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('verify')} style={{ background: 'none', color: '#94a3b8' }}>
                  Certificate Verification
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '1rem' }}>Contact & Support</h4>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: '#94a3b8' }}>📧 Email: support@veloraglobal.com</p>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: '#94a3b8' }}>🌐 Website: www.veloraglobal.com</p>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>📍 Global Career & Learning Desk</p>
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
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Verification Desk</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
