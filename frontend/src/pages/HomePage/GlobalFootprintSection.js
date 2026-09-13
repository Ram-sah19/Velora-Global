import React, { useState } from 'react';

export default function GlobalFootprintSection({ onConsultationClick }) {
  const [activeHubId, setActiveHubId] = useState('nepal');

  const hubs = [
    {
      id: 'nepal',
      code: 'NP',
      country: 'Nepal',
      city: 'Kathmandu Valley',
      role: 'Global Headquarters & Core Engineering Lab',
      timezone: 'NPT (UTC +5:45)',
      status: 'HQ Operations Active',
      statLabel: 'Students & Interns Mentored',
      statValue: '100+ Trained & Certified',
      overview: 'The founding headquarters and operational heart of Velora Global at Balkumari, Ring Road. Direct mentorship and code reviews are led on-site by Founder & CEO Abhishek Sah, CTO Krishna Sah, and COO Rohit Sah.',
      highlights: [
        'Live mentorship facility, physical code walkthroughs & capstone reviews',
        'Production MERN Stack, AI/ML agent pipelines, and mobile apps',
        'Official tamper-proof QR-code verified credential issuance'
      ],
      accentColor: '#2563eb'
    },
    {
      id: 'usa',
      code: 'US',
      country: 'United States',
      city: 'New York & San Francisco',
      role: 'Enterprise Clients & International Interns',
      timezone: 'EST / PST (UTC -5 / -8)',
      status: 'Active Remote Cohort & Client Sync',
      statLabel: 'International Engineering',
      statValue: 'Enterprise Cloud & Web Delivery',
      overview: 'Delivering production enterprise software, cloud microservices, and 24/7 AI workflow automation for American businesses, while hosting remote engineering interns from top universities.',
      highlights: [
        'Custom enterprise web systems & 24/7 conversational AI agents',
        'Asynchronous GitHub pull requests, daily standups & sprint boards',
        'Cross-timezone project handoffs and architectural consultations'
      ],
      accentColor: '#ff5454'
    },
    {
      id: 'india',
      code: 'IN',
      country: 'India',
      city: 'Bengaluru & Delhi NCR',
      role: 'Subcontinent Tech Talent & Engineering',
      timezone: 'IST (UTC +5:30)',
      status: 'Distributed Developer Sprints',
      statLabel: 'Developer Collaboration',
      statValue: 'Cross-Border Engineering Sprints',
      overview: 'Fostering collaborative engineering cohorts across South Asia. Focusing on high-scale backend APIs, database optimization, and high-performance React frontends.',
      highlights: [
        'Scalable REST & GraphQL microservices with Node.js & MongoDB Atlas',
        'Rigorous 5-criteria objective code evaluation & code quality grading',
        'Full-stack architecture reviews and technical interview preparation'
      ],
      accentColor: '#d97706'
    },
    {
      id: 'australia',
      code: 'AU',
      country: 'Australia',
      city: 'Sydney & Melbourne',
      role: 'APAC Enterprise Systems & Mentorship',
      timezone: 'AEST (UTC +10:00)',
      status: 'APAC Timezone Operations',
      statLabel: 'Asia-Pacific Footprint',
      statValue: 'Systems Engineering & Deliveries',
      overview: 'Connecting Asia-Pacific clients and students with practical engineering methodologies, high-speed web apps, and automated business workflows.',
      highlights: [
        'Lighthouse 95+ performance optimization and responsive mobile design',
        'End-to-end integration testing, cloud hosting & domain security',
        'Timezone-synchronized communications and milestone updates'
      ],
      accentColor: '#0891b2'
    },
    {
      id: 'bangladesh',
      code: 'BD',
      country: 'Bangladesh',
      city: 'Dhaka',
      role: 'Regional Talent Acceleration Hub',
      timezone: 'BST (UTC +6:00)',
      status: 'Active Training Sync',
      statLabel: 'Regional Developers',
      statValue: 'Hands-on Production Training',
      overview: 'Empowering ambitious regional software developers with real production codebases, industry architectural patterns, and verified engineering credentials.',
      highlights: [
        'Full Stack MVC application development with modern React and Node.js',
        'Hands-on Git version control, branch management, and CI/CD pipelines',
        'Direct portfolio guidance for competitive international remote roles'
      ],
      accentColor: '#059669'
    },
    {
      id: 'nigeria',
      code: 'NG',
      country: 'Nigeria',
      city: 'Lagos',
      role: 'African Tech Innovation Cohort',
      timezone: 'WAT (UTC +1:00)',
      status: 'Global Remote Interns',
      statLabel: 'Global Talent Program',
      statValue: 'Remote Engineering Cohort',
      overview: 'Welcoming top-tier African engineering candidates into our remote internship tracks to build production-grade web systems and AI automations.',
      highlights: [
        'Real-world software features from design mockups to live deployment',
        'Direct constructive feedback and 1-on-1 code reviews from senior staff',
        'Global engineering network with verifiable credentials on LinkedIn'
      ],
      accentColor: '#7c3aed'
    }
  ];

  const currentHub = hubs.find(h => h.id === activeHubId) || hubs[0];

  return (
    <section style={{
      padding: '5rem 0',
      background: '#ffffff',
      color: '#0b0f19',
      position: 'relative',
      borderTop: '1px solid #e2e8f0',
      borderBottom: '1px solid #e2e8f0'
    }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* ── Section Header ── */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3rem auto' }}>
          <span style={{
            fontSize: '0.82rem',
            color: '#2563eb',
            fontWeight: '800',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            background: '#eff6ff',
            padding: '0.35rem 1.15rem',
            borderRadius: '9999px',
            border: '1px solid #dbeafe',
            display: 'inline-block',
            marginBottom: '0.85rem'
          }}>
            GLOBAL IMPACT & REACH
          </span>

          <h2 style={{
            fontSize: 'clamp(2rem, 3.4vw, 2.75rem)',
            color: '#0b0f19',
            fontWeight: '800',
            lineHeight: '1.25',
            letterSpacing: '-0.025em',
            margin: '0 0 0.85rem 0'
          }}>
            Connecting Talent & Enterprise <br />
            <span style={{ color: '#2563eb' }}>From Kathmandu to the World</span>
          </h2>

          <p style={{ color: '#64748b', fontSize: '1.02rem', lineHeight: '1.65', margin: 0 }}>
            Headquartered in Nepal, Velora Global bridges talented software engineers and businesses across 6+ countries through structured mentorship, production code reviews, and timezone-aligned deliveries.
          </p>
        </div>

        {/* ── 4 Key Metric Highlights ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          marginBottom: '3rem'
        }}>
          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '1.4rem 1.25rem',
            textAlign: 'center',
            transition: 'all 0.2s ease'
          }}>
            <span style={{ display: 'block', fontSize: '2.1rem', fontWeight: '900', color: '#0b0f19', lineHeight: '1.1', marginBottom: '0.35rem' }}>
              100+
            </span>
            <span style={{ fontSize: '0.86rem', color: '#64748b', fontWeight: '600' }}>
              Students & Interns Mentored
            </span>
          </div>

          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '1.4rem 1.25rem',
            textAlign: 'center',
            transition: 'all 0.2s ease'
          }}>
            <span style={{ display: 'block', fontSize: '2.1rem', fontWeight: '900', color: '#2563eb', lineHeight: '1.1', marginBottom: '0.35rem' }}>
              6+
            </span>
            <span style={{ fontSize: '0.86rem', color: '#64748b', fontWeight: '600' }}>
              Countries in Network
            </span>
          </div>

          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '1.4rem 1.25rem',
            textAlign: 'center',
            transition: 'all 0.2s ease'
          }}>
            <span style={{ display: 'block', fontSize: '2.1rem', fontWeight: '900', color: '#ff5454', lineHeight: '1.1', marginBottom: '0.35rem' }}>
              50+
            </span>
            <span style={{ fontSize: '0.86rem', color: '#64748b', fontWeight: '600' }}>
              Active Capstone Projects
            </span>
          </div>

          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '1.4rem 1.25rem',
            textAlign: 'center',
            transition: 'all 0.2s ease'
          }}>
            <span style={{ display: 'block', fontSize: '2.1rem', fontWeight: '900', color: '#059669', lineHeight: '1.1', marginBottom: '0.35rem' }}>
              5
            </span>
            <span style={{ fontSize: '0.86rem', color: '#64748b', fontWeight: '600' }}>
              Synchronized Timezones
            </span>
          </div>
        </div>

        {/* ── Interactive Hub Explorer (Split 2-Column Desktop, Stacked Mobile) ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 380px) 1fr',
          gap: '1.75rem',
          alignItems: 'stretch',
          marginBottom: '3.5rem'
        }}
        className="global-hub-grid"
        >
          {/* Left Column: Country / Region Selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <span style={{
              fontSize: '0.78rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#64748b',
              marginBottom: '0.25rem',
              display: 'block'
            }}>
              Select Regional Hub:
            </span>

            {hubs.map((hub) => {
              const isActive = hub.id === activeHubId;
              return (
                <button
                  key={hub.id}
                  onClick={() => setActiveHubId(hub.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1.15rem',
                    background: isActive ? '#ffffff' : '#f8fafc',
                    border: isActive ? `2px solid ${hub.accentColor}` : '1px solid #e2e8f0',
                    borderRadius: '14px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                    boxShadow: isActive ? `0 6px 20px -4px ${hub.accentColor}25` : 'none',
                    transform: isActive ? 'translateX(4px)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = '#ffffff';
                      e.currentTarget.style.borderColor = '#cbd5e1';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = '#f8fafc';
                      e.currentTarget.style.borderColor = '#e2e8f0';
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <span style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      background: `${hub.accentColor}14`,
                      color: hub.accentColor,
                      fontWeight: '800',
                      fontSize: '0.82rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `1px solid ${hub.accentColor}28`,
                      flexShrink: 0
                    }}>
                      {hub.code}
                    </span>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                        <span style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0b0f19' }}>
                          {hub.country}
                        </span>
                        {hub.id === 'nepal' && (
                          <span style={{
                            fontSize: '0.66rem',
                            fontWeight: '800',
                            background: '#eff6ff',
                            color: '#2563eb',
                            padding: '0.15rem 0.45rem',
                            borderRadius: '4px',
                            border: '1px solid #bfdbfe'
                          }}>
                            HQ
                          </span>
                        )}
                      </div>
                      <span style={{ fontSize: '0.78rem', color: '#64748b', display: 'block', fontWeight: '500' }}>
                        {hub.city}
                      </span>
                    </div>
                  </div>

                  <span style={{
                    fontSize: '0.92rem',
                    color: isActive ? hub.accentColor : '#94a3b8',
                    fontWeight: '800',
                    transition: 'all 0.2s ease'
                  }}>
                    ➔
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Hub Focus Card */}
          <div style={{
            background: '#ffffff',
            border: `1.5px solid ${currentHub.accentColor}40`,
            borderRadius: '20px',
            padding: '2.25rem',
            boxShadow: `0 12px 36px -8px ${currentHub.accentColor}18`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Top accent line */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: currentHub.accentColor
            }} />

            <div>
              {/* Card Header */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '1.25rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <span style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: `${currentHub.accentColor}15`,
                    color: currentHub.accentColor,
                    fontWeight: '900',
                    fontSize: '1.05rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `1.5px solid ${currentHub.accentColor}35`,
                    flexShrink: 0
                  }}>
                    {currentHub.code}
                  </span>
                  <div>
                    <h3 style={{ fontSize: '1.45rem', fontWeight: '900', color: '#0b0f19', margin: 0, lineHeight: '1.2' }}>
                      {currentHub.country} Hub
                    </h3>
                    <span style={{ fontSize: '0.85rem', color: currentHub.accentColor, fontWeight: '700' }}>
                      {currentHub.city}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: '0.76rem',
                    fontWeight: '700',
                    color: '#059669',
                    background: '#ecfdf5',
                    border: '1px solid #a7f3d0',
                    padding: '0.28rem 0.75rem',
                    borderRadius: '9999px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}>
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                    {currentHub.status}
                  </span>

                  <span style={{
                    fontSize: '0.76rem',
                    fontWeight: '700',
                    color: '#475569',
                    background: '#f1f5f9',
                    border: '1px solid #e2e8f0',
                    padding: '0.28rem 0.75rem',
                    borderRadius: '9999px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {currentHub.timezone}
                  </span>
                </div>
              </div>

              {/* Role Badge */}
              <div style={{ marginBottom: '1.15rem' }}>
                <span style={{
                  fontSize: '0.78rem',
                  fontWeight: '800',
                  color: currentHub.accentColor,
                  background: `${currentHub.accentColor}12`,
                  border: `1px solid ${currentHub.accentColor}25`,
                  padding: '0.25rem 0.85rem',
                  borderRadius: '6px',
                  display: 'inline-block'
                }}>
                  {currentHub.role}
                </span>
              </div>

              {/* Overview */}
              <p style={{
                color: '#475569',
                fontSize: '0.98rem',
                lineHeight: '1.65',
                marginBottom: '1.5rem'
              }}>
                {currentHub.overview}
              </p>

              {/* Key Deliverables / Highlights */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '1.25rem 1.4rem',
                marginBottom: '1.5rem'
              }}>
                <span style={{
                  display: 'block',
                  fontSize: '0.8rem',
                  fontWeight: '800',
                  color: '#0b0f19',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: '0.75rem'
                }}>
                  Core Focus & Capabilities:
                </span>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                  {currentHub.highlights.map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.88rem', color: '#334155' }}>
                      <span style={{ color: currentHub.accentColor, fontWeight: '900', fontSize: '1rem', lineHeight: '1.2' }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Outcome & Actions */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              borderTop: '1px solid #e2e8f0',
              paddingTop: '1.25rem'
            }}>
              <div>
                <span style={{ display: 'block', fontSize: '0.74rem', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>
                  {currentHub.statLabel}
                </span>
                <span style={{ fontSize: '1.05rem', fontWeight: '900', color: '#0b0f19' }}>
                  {currentHub.statValue}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '0.65rem' }}>
                {onConsultationClick && (
                  <button
                    onClick={onConsultationClick}
                    className="btn-coral"
                    style={{
                      padding: '0.6rem 1.25rem',
                      fontSize: '0.85rem',
                      fontWeight: '800',
                      borderRadius: '9999px',
                      cursor: 'pointer'
                    }}
                  >
                    Connect With Hub ➔
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── 3 Operational Principles ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
          }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: '#eff6ff',
              color: '#2563eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              border: '1px solid #bfdbfe'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0b0f19', marginBottom: '0.4rem' }}>
              Asynchronous & Timezone Aligned
            </h4>
            <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: '1.55', margin: 0 }}>
              Sprints, reviews, and client deliverables are synchronized across NPT (UTC+5:45), EST, IST, AEST, and WAT with clear documentation.
            </p>
          </div>

          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
          }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: '#ecfdf5',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              border: '1px solid #a7f3d0'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0b0f19', marginBottom: '0.4rem' }}>
              Production Engineering Standards
            </h4>
            <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: '1.55', margin: 0 }}>
              Every candidate and client system follows modern Git pull-request reviews, automated testing, and secure MVC microservice architecture.
            </p>
          </div>

          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
          }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: '#fef3c7',
              color: '#d97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              border: '1px solid #fde68a'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="6" />
                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
              </svg>
            </div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0b0f19', marginBottom: '0.4rem' }}>
              Globally Verified Credentials
            </h4>
            <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: '1.55', margin: 0 }}>
              Graduates receive tamper-proof certificates with public QR verification endpoints verifiable by employers and recruiters anywhere in the world.
            </p>
          </div>
        </div>

        {/* ── Bottom Section Actions ── */}
        <div style={{
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          {onConsultationClick && (
            <button
              onClick={onConsultationClick}
              className="btn-coral"
              style={{
                padding: '0.9rem 2.2rem',
                fontSize: '0.95rem',
                fontWeight: '800',
                borderRadius: '9999px',
                boxShadow: '0 4px 18px rgba(255, 84, 84, 0.35)',
                cursor: 'pointer'
              }}
            >
              Book 1-on-1 Counseling with Abhishek Sah
            </button>
          )}
        </div>

      </div>

      {/* Responsive Styles for the Hub Explorer */}
      <style>{`
        @media (max-width: 860px) {
          .global-hub-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
