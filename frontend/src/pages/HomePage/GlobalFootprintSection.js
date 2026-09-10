import React from 'react';

export default function GlobalFootprintSection({ onConsultationClick, onExploreClick }) {
  const hubs = [
    {
      id: 'nepal',
      country: 'Nepal',
      city: 'Kathmandu (HQ)',
      code: 'NP',
      badge: 'Headquarters & Core Engineering Hub',
      stat: '100+ Students Trained',
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
      id: 'global',
      country: 'Global & Multinational',
      city: 'Worldwide Remote Network',
      code: 'GL',
      badge: 'Cross-Border Deliveries',
      stat: '50+ Active Interns Across Tracks',
      description: 'Synchronized cross-timezone engineering sprints across NPT (UTC+5:45), EST, and PST timezones.',
      color: '#10b981'
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
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3.5rem auto' }}>
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
            fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
            color: '#ffffff',
            fontWeight: '800',
            lineHeight: '1.2',
            letterSpacing: '-0.02em',
            margin: '0 0 1rem 0'
          }}>
            Connecting Talent Across <br />
            <span style={{
              background: 'linear-gradient(90deg, #60a5fa 0%, #f87171 50%, #34d399 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Nepal, the USA & Global Clients
            </span>
          </h2>

          <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: '1.65', margin: '0 auto', maxWidth: '680px' }}>
            Over <strong>100+ students in active training</strong> and <strong>50+ interns</strong> building real-world software solutions. Our cohorts include interns from the USA collaborating with international clients and foreign multinational companies.
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
            height: '320px',
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
              viewBox="0 0 1000 320" 
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
            >
              <defs>
                <linearGradient id="arcGradUSANepal" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ff5252" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#a855f7" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="arcGradGlobal" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="80" x2="1000" y2="80" stroke="rgba(255, 255, 255, 0.04)" strokeDasharray="4 4" />
              <line x1="0" y1="160" x2="1000" y2="160" stroke="rgba(255, 255, 255, 0.04)" strokeDasharray="4 4" />
              <line x1="0" y1="240" x2="1000" y2="240" stroke="rgba(255, 255, 255, 0.04)" strokeDasharray="4 4" />
              <line x1="250" y1="0" x2="250" y2="320" stroke="rgba(255, 255, 255, 0.04)" strokeDasharray="4 4" />
              <line x1="500" y1="0" x2="500" y2="320" stroke="rgba(255, 255, 255, 0.04)" strokeDasharray="4 4" />
              <line x1="750" y1="0" x2="750" y2="320" stroke="rgba(255, 255, 255, 0.04)" strokeDasharray="4 4" />

              {/* Arc from USA (240, 130) to Nepal (720, 160) */}
              <path 
                d="M 240,130 Q 480,20 720,160" 
                fill="none" 
                stroke="url(#arcGradUSANepal)" 
                strokeWidth="2.5" 
                strokeDasharray="6 6"
              />

              {/* Arc from Europe/Global (520, 100) to Nepal (720, 160) */}
              <path 
                d="M 520,100 Q 620,80 720,160" 
                fill="none" 
                stroke="url(#arcGradGlobal)" 
                strokeWidth="2" 
                strokeDasharray="4 4"
              />
            </svg>

            {/* Hub Node 1: USA */}
            <div style={{
              position: 'absolute',
              left: '24%',
              top: '40%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              zIndex: 2
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(255, 82, 82, 0.2)',
                border: '2px solid #ff5252',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.85rem',
                fontWeight: '900',
                color: '#ffffff',
                margin: '0 auto 0.4rem auto',
                boxShadow: '0 0 25px rgba(255, 82, 82, 0.5)'
              }}>
                USA
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#ffffff', display: 'block' }}>
                USA Hub
              </span>
              <span style={{ fontSize: '0.72rem', color: '#f87171', fontWeight: '700' }}>
                Interns & Enterprise Clients
              </span>
            </div>

            {/* Hub Node 2: Nepal HQ */}
            <div style={{
              position: 'absolute',
              left: '72%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              zIndex: 2
            }}>
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                background: 'rgba(37, 99, 235, 0.25)',
                border: '2.5px solid #60a5fa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.9rem',
                fontWeight: '900',
                color: '#ffffff',
                margin: '0 auto 0.4rem auto',
                boxShadow: '0 0 35px rgba(37, 99, 235, 0.6)'
              }}>
                HQ
              </div>
              <span style={{ fontSize: '0.92rem', fontWeight: '800', color: '#ffffff', display: 'block' }}>
                Kathmandu (HQ)
              </span>
              <span style={{ fontSize: '0.75rem', color: '#60a5fa', fontWeight: '700' }}>
                100+ Students • 10 Tracks
              </span>
            </div>

            {/* Hub Node 3: Global / Remote */}
            <div style={{
              position: 'absolute',
              left: '52%',
              top: '30%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              zIndex: 2
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.2)',
                border: '2px solid #34d399',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem',
                fontWeight: '900',
                color: '#ffffff',
                margin: '0 auto 0.4rem auto',
                boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)'
              }}>
                INTL
              </div>
              <span style={{ fontSize: '0.82rem', fontWeight: '800', color: '#ffffff', display: 'block' }}>
                Multinational Network
              </span>
              <span style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: '700' }}>
                Global Client Delivery
              </span>
            </div>

          </div>

          {/* 3 Hub Cards Below Map */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
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
