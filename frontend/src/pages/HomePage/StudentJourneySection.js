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
      description: "Receive an official Velora Global Certificate signed by Founder Rambilas Sah with a public QR code."
    }
  ];

  return (
    <section style={{ padding: '5rem 0', background: '#ffffff', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem auto' }}>
          <span style={{
            fontSize: '0.82rem',
            color: '#2563eb',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            background: '#eff6ff',
            padding: '0.35rem 1rem',
            borderRadius: '9999px',
            border: '1px solid #dbeafe',
            display: 'inline-block',
            marginBottom: '0.75rem'
          }}>
            Structured Learning Path
          </span>
          <h2 style={{ fontSize: '2.5rem', color: '#0b0f19', marginTop: '0.3rem', fontWeight: '800' }}>
            How Velora Global Works
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem', marginTop: '0.5rem' }}>
            A transparent 4-step framework designed to take you from candidate to certified industry professional.
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
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '2.25rem 1.75rem',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <span style={{
                  fontSize: '2.2rem',
                  fontWeight: '800',
                  color: '#2563eb',
                  fontFamily: 'monospace',
                  display: 'block',
                  marginBottom: '1rem',
                  lineHeight: '1'
                }}>
                  {item.step}
                </span>

                <h3 style={{ fontSize: '1.2rem', color: '#0b0f19', fontWeight: '700', marginBottom: '0.65rem' }}>
                  {item.title}
                </h3>

                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '3.5rem', textAlign: 'center' }}>
          <button onClick={onApplyClick} className="btn-primary" style={{ padding: '0.9rem 2.2rem', fontSize: '1rem' }}>
            Start Your Journey Today ➔
          </button>
        </div>

      </div>
    </section>
  );
}
