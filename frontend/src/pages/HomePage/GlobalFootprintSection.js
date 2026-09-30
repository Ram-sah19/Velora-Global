import React, { useState } from 'react';
import { INTERNSHIP_PROGRAMS, TRAINING_PROGRAMS } from '../../content/programs';
import { GRADING_CRITERIA } from '../../content/siteFacts';

export default function GlobalFootprintSection({ onConsultationClick }) {
  const [activeHubId, setActiveHubId] = useState('nepal');

  const hubs = [
    {
      id: 'nepal',
      code: 'NP',
      country: 'Nepal',
      city: 'Kathmandu',
      role: 'Where Velora Global Is Based',
      timezone: 'NPT (UTC +5:45)',
      status: 'Primary Operations',
      statLabel: 'How We Work',
      statValue: 'Remote-first, reviewed against 5 published criteria',
      overview: 'Velora Global is run from Kathmandu. Founder & CEO Abhishek Sah, CTO Krishna Sah and COO Rohit Sah handle architecture, mentorship and project reviews from here, in person or over video depending on where you are.',
      highlights: [
        'Code walkthroughs, milestone reviews and capstone grading by the founding team',
        'MERN stack, AI/ML agent pipelines, and mobile app builds',
        'Certificates issued with a unique ID anyone can check at our public verification endpoint'
      ]
    },
    {
      id: 'usa',
      code: 'US',
      country: 'United States',
      city: 'Eastern & Pacific time',
      role: 'Remote Work Across Timezones',
      timezone: 'EST / PST (UTC -5 / -8)',
      status: 'Remote Scheduling Window',
      statLabel: 'How We Coordinate',
      statValue: 'Async pull requests and scheduled sync calls',
      overview: 'US-based applicants and clients work with us asynchronously. Handovers are written up so a review that ends in Kathmandu continues the same day in US hours.',
      highlights: [
        'Custom web systems and conversational AI agents',
        'Asynchronous GitHub pull requests, standup notes & sprint boards',
        'Cross-timezone project handoffs and architecture consultations'
      ]
    },
    {
      id: 'india',
      code: 'IN',
      country: 'India',
      city: 'Bengaluru & Delhi NCR',
      role: 'Remote Applicants & Collaborators',
      timezone: 'IST (UTC +5:30)',
      status: 'Remote Scheduling Window',
      statLabel: 'How We Coordinate',
      statValue: 'Same-day reviews in overlapping hours',
      overview: 'India is close to our own working hours, so interns and collaborators there usually get same-day turnaround on reviews. Focus areas are backend APIs, database work and React frontends.',
      highlights: [
        'REST & GraphQL services with Node.js and MongoDB',
        'The same 5-criteria evaluation used for every submission',
        'Architecture reviews and technical interview preparation'
      ]
    },
    {
      id: 'australia',
      code: 'AU',
      country: 'Australia',
      city: 'Sydney & Melbourne',
      role: 'Remote Work Across Timezones',
      timezone: 'AEST (UTC +10:00)',
      status: 'Remote Scheduling Window',
      statLabel: 'How We Coordinate',
      statValue: 'Four to four-and-a-half hours ahead of Kathmandu',
      overview: 'AEST sits ahead of us, so AU work tends to land at the start of our day. Reviews come back the same calendar day for anything submitted before our evening.',
      highlights: [
        'Core Web Vitals and Lighthouse performance work, plus responsive mobile design',
        'Integration testing, cloud hosting & domain configuration',
        'Timezone-aligned status updates and milestone reviews'
      ]
    },
    {
      id: 'bangladesh',
      code: 'BD',
      country: 'Bangladesh',
      city: 'Dhaka',
      role: 'Remote Applicants & Collaborators',
      timezone: 'BST (UTC +6:00)',
      status: 'Remote Scheduling Window',
      statLabel: 'How We Coordinate',
      statValue: 'One-and-a-quarter hours ahead of Kathmandu',
      overview: 'Dhaka overlaps almost fully with our working day, which makes live mentorship sessions easy to schedule. Training and internship tracks are the same as everywhere else on this site.',
      highlights: [
        'Full stack application development with React and Node.js',
        'Git version control, branch management, and CI/CD pipelines',
        'Portfolio guidance for remote engineering roles'
      ]
    },
    {
      id: 'nigeria',
      code: 'NG',
      country: 'Nigeria',
      city: 'Lagos',
      role: 'Remote Applicants & Collaborators',
      timezone: 'WAT (UTC +1:00)',
      status: 'Remote Scheduling Window',
      statLabel: 'How We Coordinate',
      statValue: 'Four-and-a-half hours behind Kathmandu',
      overview: 'West Africa is behind us, so submissions there are typically reviewed during our evening and answered before their next morning. Remote internship tracks are open to applicants in any country.',
      highlights: [
        'Building real features from design brief to deployment',
        'Written feedback and code reviews from the founding team',
        'A completion certificate with a public verification ID'
      ]
    }
  ];

  const currentHub = hubs.find(h => h.id === activeHubId) || hubs[0];

  return (
    <section style={{
      padding: '6rem 0',
      background: 'var(--premium-grad-light)',
      color: '#0b0f19',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div aria-hidden="true" style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background: 'radial-gradient(1000px 420px at 50% -5%, rgba(37, 99, 235, 0.07), transparent 60%)'
      }} />
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', position: 'relative' }}>
        
        {/* ── Section Header ── */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3rem auto' }}>
          <span className="premium-eyebrow" style={{
            fontSize: '0.82rem',
            color: '#1d4ed8',
            fontWeight: '800',
            marginBottom: '1rem'
          }}>
            How We Work Remotely
          </span>

          <h2 className="premium-headline" style={{
            fontSize: 'clamp(2rem, 3.4vw, 2.85rem)',
            fontWeight: '800',
            lineHeight: '1.18',
            margin: '0 0 0.95rem 0'
          }}>
            Based in Kathmandu, <br />
            Working Across Time Zones
          </h2>

          <p style={{ color: '#64748b', fontSize: '1.02rem', lineHeight: '1.65', margin: 0 }}>
            Velora Global runs from Kathmandu, Nepal. We have no other offices. What changes by region is simply the overlap between your working hours and ours, and that is what these panels describe.
          </p>
        </div>

        {/* ── 4 Key Metric Highlights ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          marginBottom: '3rem'
        }}>
          <div className="premium-card premium-glass" style={{
            background: 'rgba(255, 255, 255, 0.85)',
            border: '1px solid rgba(226, 232, 240, 0.9)',
            borderRadius: '18px',
            padding: '1.4rem 1.25rem',
            textAlign: 'center'
          }}>
            <span style={{ display: 'block', fontSize: '2.1rem', fontWeight: '900', color: '#0b0f19', lineHeight: '1.1', marginBottom: '0.35rem' }}>
              {INTERNSHIP_PROGRAMS.length}
            </span>
            <span style={{ fontSize: '0.86rem', color: '#64748b', fontWeight: '600' }}>
              Internship Domains Listed
            </span>
          </div>

          <div className="premium-card premium-glass" style={{
            background: 'rgba(255, 255, 255, 0.85)',
            border: '1px solid rgba(226, 232, 240, 0.9)',
            borderRadius: '18px',
            padding: '1.4rem 1.25rem',
            textAlign: 'center'
          }}>
            <span style={{ display: 'block', fontSize: '2.1rem', fontWeight: '900', color: '#0b0f19', lineHeight: '1.1', marginBottom: '0.35rem' }}>
              {TRAINING_PROGRAMS.length}
            </span>
            <span style={{ fontSize: '0.86rem', color: '#64748b', fontWeight: '600' }}>
              Guided Training Programs
            </span>
          </div>

          <div className="premium-card premium-glass" style={{
            background: 'rgba(255, 255, 255, 0.85)',
            border: '1px solid rgba(226, 232, 240, 0.9)',
            borderRadius: '18px',
            padding: '1.4rem 1.25rem',
            textAlign: 'center'
          }}>
            <span style={{ display: 'block', fontSize: '2.1rem', fontWeight: '900', color: '#0b0f19', lineHeight: '1.1', marginBottom: '0.35rem' }}>
              {GRADING_CRITERIA.length}
            </span>
            <span style={{ fontSize: '0.86rem', color: '#64748b', fontWeight: '600' }}>
              Published Grading Criteria
            </span>
          </div>

          <div className="premium-card premium-glass" style={{
            background: 'rgba(255, 255, 255, 0.85)',
            border: '1px solid rgba(226, 232, 240, 0.9)',
            borderRadius: '18px',
            padding: '1.4rem 1.25rem',
            textAlign: 'center'
          }}>
            <span style={{ display: 'block', fontSize: '2.1rem', fontWeight: '900', color: '#0b0f19', lineHeight: '1.1', marginBottom: '0.35rem' }}>
              UTC+5:45
            </span>
            <span style={{ fontSize: '0.86rem', color: '#64748b', fontWeight: '600' }}>
              Home Base in Kathmandu
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
              Select a region:
            </span>

            {hubs.map((hub) => {
              const isActive = hub.id === activeHubId;
              return (
                <button
                  key={hub.id}
                  onClick={() => setActiveHubId(hub.id)}
                  aria-pressed={isActive}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.8rem 1.1rem',
                    background: isActive ? '#2563eb' : '#ffffff',
                    border: isActive ? '1px solid #2563eb' : '1px solid #e2e8f0',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease, color 0.22s ease',
                    boxShadow: isActive
                      ? '0 10px 26px -8px rgba(37, 99, 235, 0.55)'
                      : '0 1px 3px rgba(11, 18, 32, 0.03)'
                  }}
                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.borderColor = '#cbd5e1'; }}
                  onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.borderColor = '#e2e8f0'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <span style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      background: isActive ? 'rgba(255, 255, 255, 0.16)' : '#f1f5f9',
                      color: isActive ? '#ffffff' : '#475569',
                      fontWeight: '800',
                      fontSize: '0.82rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: isActive ? '1px solid rgba(255, 255, 255, 0.28)' : '1px solid #e2e8f0',
                      flexShrink: 0
                    }}>
                      {hub.code}
                    </span>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                        <span style={{ fontSize: '0.95rem', fontWeight: '800', color: isActive ? '#ffffff' : '#0b0f19' }}>
                          {hub.country}
                        </span>
                        {hub.id === 'nepal' && (
                          <span style={{
                            fontSize: '0.66rem',
                            fontWeight: '800',
                            background: isActive ? 'rgba(255, 255, 255, 0.18)' : '#eff6ff',
                            color: isActive ? '#ffffff' : '#2563eb',
                            padding: '0.15rem 0.5rem',
                            borderRadius: '9999px',
                            border: isActive ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid #bfdbfe'
                          }}>
                            Head office
                          </span>
                        )}
                      </div>
                      <span style={{ fontSize: '0.78rem', color: isActive ? 'rgba(255, 255, 255, 0.82)' : '#64748b', display: 'block', fontWeight: '500' }}>
                        {hub.city}
                      </span>
                    </div>
                  </div>

                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={isActive ? '#ffffff' : '#94a3b8'} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, transition: 'stroke 0.22s ease' }} aria-hidden="true">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Hub Focus Card */}
          <div
            key={activeHubId}
            className="premium-glass"
            style={{
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.97) 0%, rgba(248, 250, 252, 0.97) 100%)',
            border: '1px solid rgba(226, 232, 240, 0.95)',
            borderRadius: '24px',
            padding: '2.25rem',
            boxShadow: '0 32px 70px -28px rgba(11, 18, 32, 0.16), 0 4px 14px rgba(11, 18, 32, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden',
            animation: 'projectSlideIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) both'
          }}>
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
                    borderRadius: '14px',
                    background: '#eff6ff',
                    color: '#2563eb',
                    fontWeight: '900',
                    fontSize: '1.05rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #dbeafe',
                    flexShrink: 0
                  }}>
                    {currentHub.code}
                  </span>
                  <div>
                    <h3 style={{ fontSize: '1.45rem', fontWeight: '900', color: '#0b0f19', margin: 0, lineHeight: '1.2' }}>
                      {currentHub.country} Working Window
                    </h3>
                    <span style={{ fontSize: '0.85rem', color: '#2563eb', fontWeight: '700' }}>
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
                  color: '#1d4ed8',
                  background: '#eff6ff',
                  border: '1px solid #dbeafe',
                  padding: '0.28rem 0.9rem',
                  borderRadius: '9999px',
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
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.88rem', color: '#334155' }}>
                      <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: '3px' }} aria-hidden="true">
                        <circle cx="10" cy="10" r="10" fill="#eff6ff" />
                        <path d="M6 10L8.5 12.5L14 7" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
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
                    Talk to Us
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
          <div className="premium-card premium-glass" style={{
            background: 'rgba(255, 255, 255, 0.88)',
            border: '1px solid rgba(226, 232, 240, 0.9)',
            borderRadius: '18px',
            padding: '1.5rem'
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

          <div className="premium-card premium-glass" style={{
            background: 'rgba(255, 255, 255, 0.88)',
            border: '1px solid rgba(226, 232, 240, 0.9)',
            borderRadius: '18px',
            padding: '1.5rem'
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

          <div className="premium-card premium-glass" style={{
            background: 'rgba(255, 255, 255, 0.88)',
            border: '1px solid rgba(226, 232, 240, 0.9)',
            borderRadius: '18px',
            padding: '1.5rem'
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
              Graduates receive a certificate with a unique ID that anyone — an employer, a university, a recruiter — can check against our public verification endpoint.
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
