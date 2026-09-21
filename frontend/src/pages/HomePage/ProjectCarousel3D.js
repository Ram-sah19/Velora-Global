import React, { useState, useEffect } from 'react';

const PROJECTS = [
  {
    id: 1,
    sector: 'Enterprise Security & Cryptography',
    title: 'Velora Circle — End-to-End Encrypted Collaboration Suite',
    tagline: 'Military-grade end-to-end encrypted messaging, HD video conferencing, confidential file transmission vault, and isolated enterprise workspaces engineered for zero data leaks.',
    metric: '256-Bit E2E Zero-Leak Protocol',
    region: 'Global Enterprise & High-Security Nodes',
    status: 'Live in Production',
    mockupUrl: 'https://circle.veloraglobal.com/vault',
    previewUi: (
      <div style={{ background: '#f8fafc', padding: '1.15rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.65rem' }}>
          <div>
            <span style={{ display: 'block', fontSize: '0.85rem', color: '#0f172a', fontWeight: '800' }}>Velora Circle Vault • Node #9421</span>
            <span style={{ fontSize: '0.72rem', color: '#2563eb', fontWeight: '600' }}>Cryptographic E2EE Mesh Active</span>
          </div>
          <span style={{ fontSize: '0.68rem', color: '#059669', background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontWeight: '700' }}>
            ● AES-256 / RSA-4096
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.65rem', marginBottom: '0.85rem' }}>
          <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
            <span style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', fontWeight: '600', marginBottom: '0.2rem' }}>Encrypted Meet Hub</span>
            <span style={{ fontSize: '0.86rem', color: '#0f172a', fontWeight: '800' }}>HD WebRTC Video</span>
          </div>
          <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
            <span style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', fontWeight: '600', marginBottom: '0.2rem' }}>Confidential Vault</span>
            <span style={{ fontSize: '0.86rem', color: '#0f172a', fontWeight: '800' }}>Zero Metadata Leak</span>
          </div>
        </div>

        <div style={{ background: '#ffffff', padding: '0.65rem 0.85rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <span style={{ fontSize: '0.74rem', color: '#475569', fontWeight: '600' }}>Private Workspace & Channels</span>
          <span style={{ fontSize: '0.74rem', color: '#2563eb', fontWeight: '700' }}>Active Node Sync</span>
        </div>
      </div>
    ),
    deliverables: [
      'End-to-end cryptographic messaging with ephemeral chat destruction',
      'Encrypted multi-party HD video & audio conferencing with screen share',
      'Zero-knowledge encrypted file transmission and credential vault',
      'Isolated enterprise team workspaces & role-partitioned channels',
      'Client-side key derivation with zero server-side metadata retention'
    ],
    stack: ['WebRTC', 'AES-256 / RSA-4096', 'Node.js', 'React.js', 'Socket.io', 'PostgreSQL']
  },
  {
    id: 2,
    sector: 'Education & Global Consultancy',
    title: 'Overseas Education & Visa Advisory Platform',
    tagline: 'High-conversion multi-country consultancy portal connecting prospective students directly to university admissions across Australia, USA, Canada & UK.',
    metric: '+380% Qualified Lead Growth',
    region: 'Australia, USA & Nepal',
    status: 'Live in Production',
    mockupUrl: 'https://visasolutions.edu.global',
    previewUi: (
      <div style={{ background: '#f8fafc', padding: '1.15rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.65rem' }}>
          <div>
            <span style={{ display: 'block', fontSize: '0.85rem', color: '#0f172a', fontWeight: '800' }}>Visa Eligibility Screener</span>
            <span style={{ fontSize: '0.72rem', color: '#2563eb', fontWeight: '600' }}>Student AI Profile Matcher</span>
          </div>
          <span style={{ fontSize: '0.68rem', color: '#2563eb', background: '#eff6ff', border: '1px solid #dbeafe', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontWeight: '700' }}>
            ● Automated CRM Sync
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '0.85rem' }}>
          <div style={{ background: '#ffffff', padding: '0.65rem 0.4rem', borderRadius: '8px', textAlign: 'center', border: '1px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
            <span style={{ display: 'block', fontSize: '0.86rem', color: '#0f172a', fontWeight: '800' }}>USA</span>
            <span style={{ fontSize: '0.65rem', color: '#64748b' }}>F1 Visa Track</span>
          </div>
          <div style={{ background: '#ffffff', padding: '0.65rem 0.4rem', borderRadius: '8px', textAlign: 'center', border: '1px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
            <span style={{ display: 'block', fontSize: '0.86rem', color: '#0f172a', fontWeight: '800' }}>AUS</span>
            <span style={{ fontSize: '0.65rem', color: '#64748b' }}>GTE Portal</span>
          </div>
          <div style={{ background: '#ffffff', padding: '0.65rem 0.4rem', borderRadius: '8px', textAlign: 'center', border: '1px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
            <span style={{ display: 'block', fontSize: '0.86rem', color: '#0f172a', fontWeight: '800' }}>CAN</span>
            <span style={{ fontSize: '0.65rem', color: '#64748b' }}>SDS Stream</span>
          </div>
        </div>

        <div style={{ background: '#ffffff', padding: '0.65rem 0.85rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <span style={{ fontSize: '0.74rem', color: '#475569', fontWeight: '600' }}>Direct WhatsApp Lead Pipeline</span>
          <span style={{ fontSize: '0.74rem', color: '#059669', fontWeight: '700' }}>Instant Intake Active</span>
        </div>
      </div>
    ),
    deliverables: [
      'Interactive multi-country visa eligibility assessment form',
      'Global university course directory with entry requirements filter',
      'Direct WhatsApp lead capture & instant CRM pipeline dispatch',
      'Mobile-first performance architecture with sub-second page loads',
      'Lighthouse 98+ PageSpeed index & enterprise SEO optimization'
    ],
    stack: ['React.js', 'Node.js', 'REST API', 'WhatsApp CRM', 'Cloudflare']
  },
  {
    id: 3,
    sector: 'Hospitality & Food Tech',
    title: 'Restaurant Digital QR Menu & Table Ordering System',
    tagline: 'Contactless zero-install digital menu allowing restaurant guests to scan table QR codes, browse live food & drink catalogs, and order in real-time.',
    metric: 'Zero-App Instant Load Speed',
    region: 'Kathmandu Valley & Pokhara',
    status: 'Live in Production',
    mockupUrl: 'https://menu.dinefresh.app/table-08',
    previewUi: (
      <div style={{ background: '#f8fafc', padding: '1.15rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.65rem' }}>
          <div>
            <span style={{ display: 'block', fontSize: '0.85rem', color: '#0f172a', fontWeight: '800' }}>Table 08 • Live Digital Menu</span>
            <span style={{ fontSize: '0.72rem', color: '#2563eb', fontWeight: '600' }}>Cloud Kitchen Sync Connected</span>
          </div>
          <span style={{ fontSize: '0.68rem', color: '#059669', background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontWeight: '700' }}>
            ● Instant QR Scan
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.85rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ffffff', padding: '0.55rem 0.8rem', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
            <div>
              <span style={{ display: 'block', fontSize: '0.78rem', color: '#0f172a', fontWeight: '700' }}>Chef Signature Pasta</span>
              <span style={{ fontSize: '0.65rem', color: '#059669', fontWeight: '600' }}>● Freshly Prepared</span>
            </div>
            <span style={{ fontSize: '0.86rem', color: '#2563eb', fontWeight: '800' }}>NPR 650</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ffffff', padding: '0.55rem 0.8rem', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
            <div>
              <span style={{ display: 'block', fontSize: '0.78rem', color: '#0f172a', fontWeight: '700' }}>Organic Himalayan Mint Tea</span>
              <span style={{ fontSize: '0.65rem', color: '#64748b' }}>● Hot Beverage</span>
            </div>
            <span style={{ fontSize: '0.86rem', color: '#2563eb', fontWeight: '800' }}>NPR 180</span>
          </div>
        </div>

        <div style={{ background: '#ffffff', padding: '0.65rem 0.85rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <span style={{ fontSize: '0.74rem', color: '#475569', fontWeight: '600' }}>Manager Cloud Price & Item Sync</span>
          <span style={{ fontSize: '0.74rem', color: '#059669', fontWeight: '700' }}>Real-Time Push</span>
        </div>
      </div>
    ),
    deliverables: [
      'Zero-app installation QR scan for instantaneous menu loading',
      'Dynamic food & drink catalog with instant full-text search',
      'Dietary identification tags: Veg / Non-Veg / Vegan / Spiciness',
      'Merchant admin portal for real-time menu and pricing adjustments',
      'Offline-tolerant image caching for high-reliability peak traffic'
    ],
    stack: ['React 19', 'Node.js', 'Cloud Storage', 'QR Engine', 'Admin Console']
  },
  {
    id: 4,
    sector: 'Retail & E-Commerce',
    title: 'E-Commerce Brand Store & Direct Order System',
    tagline: 'High-speed modern online storefront replacing manual social media direct messages with an automated catalog, digital checkout, and live inventory sync.',
    metric: '100% Automated Checkout Flow',
    region: 'Nepal Nationwide Delivery',
    status: 'Live in Production',
    mockupUrl: 'https://store.velorabrand.com',
    previewUi: (
      <div style={{ background: '#f8fafc', padding: '1.15rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.65rem' }}>
          <div>
            <span style={{ display: 'block', fontSize: '0.85rem', color: '#0f172a', fontWeight: '800' }}>Express Cart Checkout</span>
            <span style={{ fontSize: '0.72rem', color: '#2563eb', fontWeight: '600' }}>eSewa, Khalti & COD Active</span>
          </div>
          <span style={{ fontSize: '0.68rem', color: '#059669', background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontWeight: '700' }}>
            ● SSL Encrypted
          </span>
        </div>

        <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '8px', marginBottom: '0.85rem', border: '1px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#0f172a', fontWeight: '700' }}>Premium Urban Winter Jacket</span>
            <span style={{ fontSize: '0.86rem', color: '#2563eb', fontWeight: '800' }}>NPR 4,500</span>
          </div>
          <div style={{ display: 'flex', gap: '0.35rem' }}>
            <span style={{ fontSize: '0.65rem', color: '#059669', background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: '700' }}>In Stock</span>
            <span style={{ fontSize: '0.65rem', color: '#64748b', background: '#f1f5f9', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>Size: M/L/XL</span>
          </div>
        </div>

        <div style={{ background: '#ffffff', padding: '0.65rem 0.85rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <span style={{ fontSize: '0.74rem', color: '#475569', fontWeight: '600' }}>1-Click WhatsApp Order Routing</span>
          <span style={{ fontSize: '0.74rem', color: '#2563eb', fontWeight: '700' }}>Zero DMs Dropped</span>
        </div>
      </div>
    ),
    deliverables: [
      'Interactive visual product storefront with responsive media gallery',
      'One-click shopping cart & automated WhatsApp order dispatch routing',
      'Local digital payment integration (eSewa / Khalti / Cash on Delivery)',
      'Real-time inventory toggle and customer verification system',
      'Merchant order fulfillment and shipment dispatch dashboard'
    ],
    stack: ['MERN Stack', 'React.js', 'eSewa', 'Khalti', 'MongoDB Atlas']
  }
];

export default function ProjectCarousel3D({ onConsultationClick }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const activeProject = PROJECTS[activeIndex] || PROJECTS[0];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PROJECTS.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  return (
    <section 
      style={{ marginTop: '4.5rem', marginBottom: '5.5rem' }}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Section Header */}
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.5rem auto' }}>
        <div style={{ marginBottom: '0.9rem' }}>
          <span className="premium-eyebrow" style={{
            fontSize: '0.78rem',
            fontWeight: '700',
            color: '#1d4ed8'
          }}>
            DELIVERED CLIENT PLATFORMS
          </span>
        </div>

        <h2 className="premium-headline" style={{
          fontSize: 'clamp(1.85rem, 3.4vw, 2.6rem)',
          fontWeight: '800',
          lineHeight: '1.15',
          margin: '0 0 0.85rem 0'
        }}>
          Production Systems & Enterprise Engineering
        </h2>

        <p style={{
          color: '#64748b',
          fontSize: '0.98rem',
          lineHeight: '1.6',
          margin: 0
        }}>
          Explore production-grade enterprise software, mobile platforms, and AI-automated systems engineered by Velora Global.
        </p>
      </div>

      {/* ── CLEAN ENTERPRISE TAB SWITCHER ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '0.75rem',
        marginBottom: '1.5rem'
      }}>
        {PROJECTS.map((proj, idx) => {
          const isSelected = activeIndex === idx;
          return (
            <button
              key={proj.id}
              onClick={() => setActiveIndex(idx)}
              className="premium-card"
              style={{
                background: '#ffffff',
                border: isSelected ? '1.5px solid #2563eb' : '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '0.85rem 1rem',
                textAlign: 'left',
                cursor: 'pointer',
                boxShadow: isSelected 
                  ? '0 8px 24px -4px rgba(37, 99, 235, 0.16), 0 2px 6px rgba(0, 0, 0, 0.04)' 
                  : '0 2px 8px rgba(0, 0, 0, 0.03)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem'
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = '#cbd5e1';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.06)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.03)';
                }
              }}
            >
              <span style={{
                fontSize: '0.68rem',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: isSelected ? '#2563eb' : '#64748b'
              }}>
                {proj.sector}
              </span>
              <span style={{
                fontSize: '0.86rem',
                fontWeight: '800',
                color: isSelected ? '#0f172a' : '#475569',
                lineHeight: '1.3',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {proj.title.split('—')[0].trim()}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── MAIN SHOWCASE STAGE (CLEAN ENTERPRISE CARD) ── */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.92)',
        borderRadius: '24px',
        border: '1px solid rgba(226, 232, 240, 0.9)',
        boxShadow: 'var(--premium-shadow-card)',
        overflow: 'hidden'
      }}>
        {/* Top Browser Title Bar */}
        <div style={{
          background: '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
          padding: '0.75rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#eab308' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }} />
            <span style={{ marginLeft: '0.5rem', fontSize: '0.76rem', color: '#475569', fontWeight: '700' }}>
              Production System • {activeProject.sector}
            </span>
          </div>

          <div style={{
            background: '#ffffff',
            padding: '0.25rem 0.85rem',
            borderRadius: '9999px',
            fontSize: '0.72rem',
            color: '#64748b',
            fontWeight: '600',
            border: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
          }}>
            <svg width="10" height="12" viewBox="0 0 12 16" fill="none" aria-hidden="true">
              <path d="M2 7V4.5C2 2.29 3.34 0.5 6 0.5C8.66 0.5 10 2.29 10 4.5V7" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" />
              <rect x="1" y="6.5" width="10" height="8.5" rx="1.8" fill="#16a34a" />
            </svg>
            <span>{activeProject.mockupUrl}</span>
          </div>

          {/* Navigation Arrows */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <button
              onClick={() => setActiveIndex((prev) => (prev === 0 ? PROJECTS.length - 1 : prev - 1))}
              aria-label="Previous system"
              style={{
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                color: '#334155',
                width: '30px',
                height: '30px',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#ffffff'}
            >
              ◀
            </button>
            <button
              onClick={() => setActiveIndex((prev) => (prev + 1) % PROJECTS.length)}
              aria-label="Next system"
              style={{
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                color: '#334155',
                width: '30px',
                height: '30px',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#ffffff'}
            >
              ▶
            </button>
          </div>
        </div>

        {/* Stage Content (Left Simulated UI Preview + Right Specifications) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          padding: '2.25rem',
          alignItems: 'center'
        }}>
          {/* Left Column: UI Console (Clean White with Soft Elevation) */}
          <div>
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '1.35rem',
              boxShadow: '0 16px 36px -8px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.02)',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  color: '#2563eb',
                  background: '#eff6ff',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  border: '1px solid #dbeafe'
                }}>
                  {activeProject.sector}
                </span>

                <span style={{ fontSize: '0.72rem', color: '#059669', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.35rem', background: '#ecfdf5', padding: '0.25rem 0.65rem', borderRadius: '9999px', border: '1px solid #a7f3d0' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#059669' }} />
                  {activeProject.status}
                </span>
              </div>

              {activeProject.previewUi}

              <div style={{
                marginTop: '1rem',
                background: '#eff6ff',
                border: '1px solid #dbeafe',
                padding: '0.7rem 1rem',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{ fontSize: '0.76rem', color: '#1e40af', fontWeight: '700' }}>Verified Metric Outcome</span>
                <span style={{ fontSize: '0.84rem', color: '#1d4ed8', fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                  <svg width="11" height="13" viewBox="0 0 12 14" fill="none" aria-hidden="true">
                    <path d="M7.5 0.5L1.5 8H5.5L4.5 13.5L10.5 6H6.5L7.5 0.5Z" fill="#f59e0b" stroke="#f59e0b" strokeWidth="0.8" strokeLinejoin="round" />
                  </svg>
                  {activeProject.metric}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Specifications */}
          <div>
            <span style={{
              fontSize: '0.76rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#2563eb',
              display: 'block',
              marginBottom: '0.4rem'
            }}>
              {activeProject.region}
            </span>

            <h3 style={{
              fontSize: 'clamp(1.4rem, 2.3vw, 1.85rem)',
              fontWeight: '800',
              color: '#0f172a',
              lineHeight: '1.25',
              margin: '0 0 0.85rem 0',
              letterSpacing: '-0.02em'
            }}>
              {activeProject.title}
            </h3>

            <p style={{
              fontSize: '0.94rem',
              color: '#475569',
              lineHeight: '1.6',
              margin: '0 0 1.35rem 0'
            }}>
              {activeProject.tagline}
            </p>

            {/* Architectural Deliverables with Crisp SVG Checkmarks */}
            <div style={{ marginBottom: '1.35rem' }}>
              <span style={{
                display: 'block',
                fontSize: '0.74rem',
                fontWeight: '800',
                textTransform: 'uppercase',
                color: '#64748b',
                letterSpacing: '0.08em',
                marginBottom: '0.65rem'
              }}>
                Key Architectural Deliverables
              </span>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {activeProject.deliverables.map((item, idx) => (
                  <li key={idx} style={{ fontSize: '0.86rem', color: '#334155', display: 'flex', alignItems: 'flex-start', gap: '0.55rem' }}>
                    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: '3px' }}>
                      <circle cx="10" cy="10" r="10" fill="#eff6ff" />
                      <path d="M6 10L8.5 12.5L14 7" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stack Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
              {activeProject.stack.map((tech, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: '0.74rem',
                    fontWeight: '700',
                    color: '#334155',
                    background: '#f1f5f9',
                    border: '1px solid #e2e8f0',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '6px'
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action CTA */}
            {onConsultationClick && (
              <button
                onClick={onConsultationClick}
                style={{
                  padding: '0.85rem 1.9rem',
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  background: 'var(--premium-grad-brand)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  boxShadow: '0 6px 20px -6px rgba(37, 99, 235, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 10px 28px -8px rgba(37, 99, 235, 0.65)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 6px 20px -6px rgba(37, 99, 235, 0.55)';
                }}
              >
                Inquire for Similar Architecture ➔
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
