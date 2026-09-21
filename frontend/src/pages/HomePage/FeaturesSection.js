import React from 'react';

export default function FeaturesSection() {
  const features = [
    {
      badge: "VERIFIED CREDENTIALS",
      title: "QR Code Tamper-Proof Certificates",
      description: "Every completion certificate is issued with a unique verification code and public QR endpoint for instant employer validation."
    },
    {
      badge: "DIRECT MENTORSHIP",
      title: "Executive Founding Leadership",
      description: "Direct evaluation and mentorship from Abhishek Sah (Founder & CEO), Krishna Sah (Co-Founder & CTO), and Rohit Sah (Co-Founder & COO)."
    },
    {
      badge: "PORTFOLIO PROJECTS",
      title: "Production-Grade Codebase",
      description: "Build real-world MERN, AI model pipelines, and DevOps workflows ready to feature on your GitHub and resume."
    },
    {
      badge: "5-CRITERIA EVALUATION",
      title: "Objective Performance Grading",
      description: "Evaluated across Quality of Work, Technical Mastery, Creativity, Requirements Completion, and Professional Approach."
    }
  ];

  return (
    <section style={{
      padding: '6rem 0',
      background: 'var(--premium-grad-tinted)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div aria-hidden="true" style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background: 'radial-gradient(800px 360px at 10% 0%, rgba(124, 58, 237, 0.05), transparent 55%)'
      }} />
      <div className="container" style={{ position: 'relative' }}>
        
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem auto' }}>
          <span className="premium-eyebrow" style={{
            fontSize: '0.82rem',
            color: '#1d4ed8',
            fontWeight: '700',
            marginBottom: '0.9rem'
          }}>
            Why Velora Global
          </span>
          <h2 className="premium-headline" style={{ fontSize: '2.7rem', marginTop: '0.3rem', fontWeight: '800', lineHeight: '1.15' }}>
            Built for Excellence & Career Trust
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem', marginTop: '0.65rem' }}>
            Our platform combines rigorous project standards, verified credentials, and founding leadership support.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
          gap: '1.75rem'
        }}>
          {features.map((f, i) => (
            <div 
              key={i}
              className="premium-card premium-glass"
              style={{
                padding: '2.25rem',
                background: 'rgba(255, 255, 255, 0.86)',
                border: '1px solid rgba(226, 232, 240, 0.9)',
                borderRadius: '20px',
                textAlign: 'left'
              }}
            >
              <span style={{
                fontSize: '0.72rem',
                fontWeight: '800',
                color: '#475569',
                letterSpacing: '0.08em',
                background: '#f1f5f9',
                padding: '0.3rem 0.75rem',
                borderRadius: '9999px',
                border: '1px solid #e2e8f0',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                marginBottom: '1.1rem'
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#94a3b8', display: 'inline-block' }} />
                {f.badge}
              </span>

              <h3 style={{ fontSize: '1.25rem', color: '#0b1220', fontWeight: '800', marginBottom: '0.65rem', lineHeight: '1.3', letterSpacing: '-0.015em' }}>
                {f.title}
              </h3>

              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.65' }}>
                {f.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
