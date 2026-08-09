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
      description: "Direct evaluation and mentorship from Rohit Sah (Founder & CEO), Rambilas Sah (Co-Founder), and Puja Rouniyar (Co-Founder & COO)."
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
    <section style={{ padding: '5rem 0', background: '#f1f5f9' }}>
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
            Why Velora Global
          </span>
          <h2 style={{ fontSize: '2.5rem', color: '#0b0f19', marginTop: '0.3rem', fontWeight: '800' }}>
            Built for Excellence & Career Trust
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem', marginTop: '0.5rem' }}>
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
              className="corporate-card"
              style={{
                padding: '2.25rem',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                textAlign: 'left'
              }}
            >
              <span style={{
                fontSize: '0.72rem',
                fontWeight: '800',
                color: '#2563eb',
                letterSpacing: '0.08em',
                background: '#eff6ff',
                padding: '0.25rem 0.65rem',
                borderRadius: '6px',
                display: 'inline-block',
                marginBottom: '1rem'
              }}>
                {f.badge}
              </span>

              <h3 style={{ fontSize: '1.25rem', color: '#0b0f19', fontWeight: '700', marginBottom: '0.65rem', lineHeight: '1.3' }}>
                {f.title}
              </h3>

              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.6' }}>
                {f.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
