import React from 'react';

export default function GlobalFootprintSection({ onConsultationClick, onExploreClick }) {
  const hubs = [
    {
      id: 'nepal',
      country: 'Nepal',
      city: 'Kathmandu (HQ)',
      code: 'NP',
      badge: 'Headquarters & Core Engineering Hub',
      stat: '100+ Trained & Placed / Hired',
      description: 'Core campus engineering center, live mentoring facility, and full-stack curriculum delivery.',
      color: '#2563eb'
    },
    {
      id: 'usa',
      country: 'United States',
      city: 'New York & San Francisco',
      code: 'US',
      badge: 'International Interns & Enterprise Clients',
      stat: 'Active US Cohort & Client Projects',
      description: 'Hosting remote engineering interns from the US and delivering cloud/AI systems for American businesses.',
      color: '#ff5252'
    },
    {
      id: 'india',
      country: 'India',
      city: 'Bengaluru & Delhi NCR',
      code: 'IN',
      badge: 'Subcontinent Engineering & Tech Talent',
      stat: 'Cross-Border Engineering Sprints',
      description: 'Collaborative development pipelines, high-scale backend services, and distributed engineering cohorts.',
      color: '#f59e0b'
    },
    {
      id: 'australia',
      country: 'Australia',
      city: 'Sydney & Melbourne',
      code: 'AU',
      badge: 'APAC Enterprise & Systems Delivery',
      stat: 'APAC Client Projects & Mentorship',
      description: 'Delivering enterprise software systems, cross-timezone client support, and specialized technology internships.',
      color: '#06b6d4'
    },
    {
      id: 'bangladesh',
      country: 'Bangladesh',
      city: 'Dhaka',
      code: 'BD',
      badge: 'South Asia Regional Talent Hub',
      stat: 'Active Developer Training & Sync',
      description: 'Regional talent training cohorts, full-stack MVC applications, and real-world client deliverables.',
      color: '#10b981'
    },
    {
      id: 'nigeria',
      country: 'Nigeria',
      city: 'Lagos',
      code: 'NG',
      badge: 'African Tech Innovation & Talent',
      stat: 'Global Remote Internship Cohort',
      description: 'Empowering top African engineering talent with hands-on production code, microservices, and AI integrations.',
      color: '#8b5cf6'
    },
    {
      id: 'global',
      country: 'Global & Multinational',
      city: 'Worldwide Remote Network',
      code: 'GL',
      badge: 'Cross-Border Deliveries',
      stat: '50+ Active Interns Across Tracks',
      description: 'Synchronized cross-timezone engineering sprints across NPT (UTC+5:45), EST, IST, AEST, and WAT.',
      color: '#ec4899'
    }
  ];

  return (
    <section style={{
      padding: '5.5rem 0',
      background: 'linear-gradient(180deg, #0b0f19 0%, #0f172a 50%, #0b0f19 100%)',
      color: '#ffffff',
      position: 'relative',
      overflow: 'hidden',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
    }}>
      {/* Ambient background lights */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '10%', left: '5%', width: 450, height: 450,
        background: 'radial-gradient(circle, rgba(37, 99, 235, 0.18) 0%, transparent 70%)',
        filter: 'blur(50px)', pointerEvents: 'none'
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: '10%', right: '5%', width: 450, height: 450,
        background: 'radial-gradient(circle, rgba(255, 107, 107, 0.15) 0%, transparent 70%)',
        filter: 'blur(50px)', pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '880px', margin: '0 auto 3.5rem auto' }}>
          <span style={{
            fontSize: '0.82rem',
            color: '#60a5fa',
            fontWeight: '800',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            background: 'rgba(37, 99, 235, 0.2)',
            padding: '0.4rem 1.25rem',
            borderRadius: '9999px',
            border: '1px solid rgba(96, 165, 250, 0.35)',
            display: 'inline-block',
            marginBottom: '0.9rem'
          }}>
            GLOBAL FOOTPRINT • NEPAL TO THE WORLD
          </span>

          <h2 style={{
            fontSize: 'clamp(2rem, 3.8vw, 3.1rem)',
            color: '#ffffff',
            fontWeight: '800',
            lineHeight: '1.2',
            letterSpacing: '-0.02em',
            margin: '0 0 1rem 0'
          }}>
            Connecting Talent Across <br />
            <span style={{
              background: 'linear-gradient(90deg, #60a5fa 0%, #f87171 25%, #fbbf24 50%, #34d399 75%, #a78bfa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Nepal, USA, India, Bangladesh, Nigeria, Australia & Global Clients
            </span>
          </h2>

          <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: '1.65', margin: '0 auto', maxWidth: '750px' }}>
            Over <strong>100+ students in active training</strong> and <strong>50+ interns</strong> building real-world software solutions. Our cohorts include interns from the <strong>USA, India, Bangladesh, Nigeria, and Australia</strong> collaborating with international clients and foreign multinational companies.
          </p>
        </div>

        {/* Interactive World Map & Network Visual */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '24px',
          padding: '2.5rem',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.35)',
          marginBottom: '3.5rem',
          position: 'relative'
        }}>
          
          {/* World Vector Network Grid */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '350px',
            borderRadius: '16px',
            background: 'radial-gradient(ellipse at center, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            
            {/* SVG Connecting Arcs */}
            <svg 
              viewBox="0 0 1000 350" 
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
            >
              <defs>
                <linearGradient id="arcGradUSANepal" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ff5252" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#a855f7" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity="0.85" />
                </linearGradient>
                <linearGradient id="arcGradNigeria" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity="0.85" />
                </linearGradient>
                <linearGradient id="arcGradIndia" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity="0.85" />
                </linearGradient>
                <linearGradient id="arcGradBangladesh" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity="0.85" />
                </linearGradient>
                <linearGradient id="arcGradAustralia" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity="0.85" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="90" x2="1000" y2="90" stroke="rgba(255, 255, 255, 0.04)" strokeDasharray="4 4" />
              <line x1="0" y1="180" x2="1000" y2="180" stroke="rgba(255, 255, 255, 0.04)" strokeDasharray="4 4" />
              <line x1="0" y1="270" x2="1000" y2="270" stroke="rgba(255, 255, 255, 0.04)" strokeDasharray="4 4" />
              <line x1="200" y1="0" x2="200" y2="350" stroke="rgba(255, 255, 255, 0.04)" strokeDasharray="4 4" />
              <line x1="450" y1="0" x2="450" y2="350" stroke="rgba(255, 255, 255, 0.04)" strokeDasharray="4 4" />
              <line x1="700" y1="0" x2="700" y2="350" stroke="rgba(255, 255, 255, 0.04)" strokeDasharray="4 4" />
              <line x1="880" y1="0" x2="880" y2="350" stroke="rgba(255, 255, 255, 0.04)" strokeDasharray="4 4" />

              {/* Arc from USA (180, 120) to Nepal (700, 140) */}
              <path 
                d="M 180,120 Q 440,20 700,140" 
                fill="none" 
                stroke="url(#arcGradUSANepal)" 
                strokeWidth="2.5" 
                strokeDasharray="6 6"
              />

              {/* Arc from Nigeria (460, 200) to Nepal (700, 140) */}
              <path 
                d="M 460,200 Q 580,120 700,140" 
                fill="none" 
                stroke="url(#arcGradNigeria)" 
                strokeWidth="2" 
                strokeDasharray="5 5"
              />

              {/* Arc from India (630, 180) to Nepal (700, 140) */}
              <path 
                d="M 630,180 Q 665,150 700,140" 
                fill="none" 
                stroke="url(#arcGradIndia)" 
                strokeWidth="2" 
                strokeDasharray="4 4"
              />

              {/* Arc from Bangladesh (760, 180) to Nepal (700, 140) */}
              <path 
                d="M 760,180 Q 730,150 700,140" 
                fill="none" 
                stroke="url(#arcGradBangladesh)" 
                strokeWidth="2" 
                strokeDasharray="4 4"
              />

              {/* Arc from Australia (880, 260) to Nepal (700, 140) */}
              <path 
                d="M 880,260 Q 820,130 700,140" 
                fill="none" 
                stroke="url(#arcGradAustralia)" 
                strokeWidth="2" 
                strokeDasharray="5 5"
              />
            </svg>

            {/* Hub Node 1: USA */}
            <div style={{
              position: 'absolute',
              left: '18%',
              top: '34%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              zIndex: 2
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(255, 82, 82, 0.2)',
                border: '2px solid #ff5252',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem',
                fontWeight: '900',
                color: '#ffffff',
                margin: '0 auto 0.35rem auto',
                boxShadow: '0 0 20px rgba(255, 82, 82, 0.5)'
              }}>
                USA
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#ffffff', display: 'block' }}>
                USA Hub
              </span>
              <span style={{ fontSize: '0.68rem', color: '#f87171', fontWeight: '700' }}>
                Interns & Clients
              </span>
            </div>

            {/* Hub Node 2: Nigeria */}
            <div style={{
              position: 'absolute',
              left: '46%',
              top: '57%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              zIndex: 2
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(139, 92, 246, 0.2)',
                border: '2px solid #a78bfa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.78rem',
                fontWeight: '900',
                color: '#ffffff',
                margin: '0 auto 0.35rem auto',
                boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)'
              }}>
                NG
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#ffffff', display: 'block' }}>
                Nigeria
              </span>
              <span style={{ fontSize: '0.68rem', color: '#c084fc', fontWeight: '700' }}>
                Tech Cohort
              </span>
            </div>

            {/* Hub Node 3: India */}
            <div style={{
              position: 'absolute',
              left: '63%',
              top: '51%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              zIndex: 2
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(245, 158, 11, 0.2)',
                border: '2px solid #fbbf24',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.78rem',
                fontWeight: '900',
                color: '#ffffff',
                margin: '0 auto 0.35rem auto',
                boxShadow: '0 0 20px rgba(245, 158, 11, 0.4)'
              }}>
                IN
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#ffffff', display: 'block' }}>
                India
              </span>
              <span style={{ fontSize: '0.68rem', color: '#fbbf24', fontWeight: '700' }}>
                Engineering
              </span>
            </div>

            {/* Hub Node 4: Nepal HQ (Central Hub) */}
            <div style={{
              position: 'absolute',
              left: '70%',
              top: '40%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              zIndex: 3
            }}>
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                background: 'rgba(37, 99, 235, 0.3)',
                border: '2.5px solid #60a5fa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.9rem',
                fontWeight: '900',
                color: '#ffffff',
                margin: '0 auto 0.35rem auto',
                boxShadow: '0 0 35px rgba(37, 99, 235, 0.7)'
              }}>
                HQ
              </div>
              <span style={{ fontSize: '0.92rem', fontWeight: '800', color: '#ffffff', display: 'block' }}>
                Kathmandu (HQ)
              </span>
              <span style={{ fontSize: '0.72rem', color: '#60a5fa', fontWeight: '700' }}>
                100+ Students • 10 Tracks
              </span>
            </div>

            {/* Hub Node 5: Bangladesh */}
            <div style={{
              position: 'absolute',
              left: '77%',
              top: '51%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              zIndex: 2
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.2)',
                border: '2px solid #34d399',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.78rem',
                fontWeight: '900',
                color: '#ffffff',
                margin: '0 auto 0.35rem auto',
                boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)'
              }}>
                BD
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#ffffff', display: 'block' }}>
                Bangladesh
              </span>
              <span style={{ fontSize: '0.68rem', color: '#34d399', fontWeight: '700' }}>
                Developers
              </span>
            </div>

            {/* Hub Node 6: Australia */}
            <div style={{
              position: 'absolute',
              left: '88%',
              top: '74%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              zIndex: 2
            }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'rgba(6, 182, 212, 0.2)',
                border: '2px solid #22d3ee',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.78rem',
                fontWeight: '900',
                color: '#ffffff',
                margin: '0 auto 0.35rem auto',
                boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)'
              }}>
                AU
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#ffffff', display: 'block' }}>
                Australia
              </span>
              <span style={{ fontSize: '0.68rem', color: '#22d3ee', fontWeight: '700' }}>
                APAC Enterprise
              </span>
            </div>

          </div>

          {/* Hub Cards Below Map */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
            marginTop: '2rem'
          }}>
            {hubs.map((h) => (
              <div 
                key={h.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s ease'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <span style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: `${h.color}25`,
                      border: `1px solid ${h.color}50`,
                      color: '#ffffff',
                      fontSize: '0.75rem',
                      fontWeight: '900',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {h.code}
                    </span>
                    <div>
                      <h3 style={{ fontSize: '1.15rem', color: '#ffffff', fontWeight: '800', margin: 0 }}>
                        {h.country}
                      </h3>
                      <span style={{ fontSize: '0.78rem', color: h.color, fontWeight: '700' }}>
                        {h.city}
                      </span>
                    </div>
                  </div>

                  <span style={{
                    fontSize: '0.74rem',
                    fontWeight: '800',
                    color: h.color,
                    background: 'rgba(255, 255, 255, 0.06)',
                    padding: '0.2rem 0.65rem',
                    borderRadius: '6px',
                    display: 'inline-block',
                    marginBottom: '0.75rem'
                  }}>
                    {h.badge}
                  </span>

                  <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: '1.55', margin: '0 0 1rem 0' }}>
                    {h.description}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '0.85rem' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: '800', color: '#ffffff' }}>
                    {h.stat}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom CTA Row */}
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
                padding: '0.9rem 2rem',
                fontSize: '0.95rem',
                fontWeight: '800',
                borderRadius: '9999px',
                boxShadow: '0 4px 18px rgba(255, 107, 107, 0.35)',
                cursor: 'pointer'
              }}
            >
              Book 1-on-1 Discovery with Ram Sah
            </button>
          )}

          {onExploreClick && (
            <button 
              onClick={onExploreClick}
              style={{
                padding: '0.9rem 2rem',
                fontSize: '0.95rem',
                fontWeight: '800',
                color: '#ffffff',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1.5px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '9999px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Explore 10 Domain Internships ➔
            </button>
          )}
        </div>

      </div>
    </section>
  );
}
