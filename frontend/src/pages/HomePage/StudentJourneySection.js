import React from 'react';

export default function StudentJourneySection({ onApplyClick }) {
  const steps = [
    {
      step: "01",
      title: "Select Domain & Apply",
      description: "Browse 10 specialized technology & design tracks. Submit your statement of purpose and portfolio link."
    },
    {
      step: "02",
      title: "Work on Live Projects",
      description: "Receive practical assignments, write clean production code, and follow industry standard workflows."
    },
    {
      step: "03",
      title: "5-Criteria Executive Grading",
      description: "Projects are graded on Quality of Work, Technical Mastery, Creativity, Requirements & Professionalism."
    },
    {
      step: "04",
      title: "Earn Verified Certificate",
      description: "Receive an official Velora Global Certificate signed by Founder Abhishek Sah with a public QR code."
    }
  ];

  return (
    <section className="premium-band-dark" style={{ padding: '6rem 0', position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative' }}>
        
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem auto' }}>
          <span className="premium-eyebrow premium-eyebrow--on-dark" style={{
            fontSize: '0.82rem',
            fontWeight: '800',
            marginBottom: '0.9rem'
          }}>
            OUR TALENT & ACADEMY ENGINE
          </span>
          <h2 className="premium-headline--on-dark" style={{ fontSize: '2.7rem', color: '#ffffff', marginTop: '0.3rem', fontWeight: '800', lineHeight: '1.15' }}>
            How We Cultivate &amp; Mentor Top Engineering Talent
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', marginTop: '0.65rem' }}>
            A transparent 4-step framework taking candidates through real code reviews, practical software projects, and verified credentials.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2rem',
          position: 'relative'
        }}>
          {steps.map((item, index) => (
            <div 
              key={item.step}
              className="premium-glass"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '20px',
                padding: '2.25rem 1.75rem',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 8px 32px -16px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
                transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.35s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.5)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'; }}
            >
              <div>
                <span style={{
                  fontSize: '2.2rem',
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: '#60a5fa',
                  fontFamily: 'monospace',
                  display: 'block',
                  marginBottom: '1rem',
                  lineHeight: '1'
                }}>
                  {item.step}
                </span>

                <h3 style={{ fontSize: '1.2rem', color: '#f1f5f9', fontWeight: '700', marginBottom: '0.65rem' }}>
                  {item.title}
                </h3>

                <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.65' }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '3.5rem', textAlign: 'center' }}>
          <button onClick={onApplyClick} className="btn-premium btn-premium--green">
            Start Your Journey Today ➔
          </button>
        </div>

      </div>
    </section>
  );
}
