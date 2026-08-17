import React from 'react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Saurav K.",
      track: "Full Stack MERN Development Track",
      batch: "Batch 1 Graduate",
      quote: "The internship wasn't just watching tutorials. We built an actual authentication microservice and client dashboard with real pull request reviews from Rohit and the mentors.",
      deliverable: "Built & Deployed Enterprise E-Commerce Engine"
    },
    {
      name: "Anjali P.",
      track: "Frontend Web Engineering Track",
      batch: "Batch 1 Graduate",
      quote: "The emphasis on writing clean React components, state management, and Lighthouse performance scores helped me create a strong portfolio project that stands out.",
      deliverable: "Production SaaS Analytics Dashboard"
    },
    {
      name: "Bibek R.",
      track: "Backend System Architecture Track",
      batch: "Batch 1 Graduate",
      quote: "Getting 1-on-1 code reviews on database indexing and JWT cookie security made a huge difference. The verification ID on my certificate can be checked instantly by employers.",
      deliverable: "REST API Microservice with MongoDB & Redis"
    }
  ];

  return (
    <section style={{ padding: '5rem 0', background: '#ffffff' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3.5rem auto' }}>
          <span style={{
            fontSize: '0.82rem',
            color: '#2563eb',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            background: '#eff6ff',
            padding: '0.35rem 1.1rem',
            borderRadius: '9999px',
            border: '1px solid #dbeafe',
            display: 'inline-block',
            marginBottom: '0.85rem'
          }}>
            Student Outcomes
          </span>
          
          <h2 style={{ fontSize: '2.5rem', color: '#0b0f19', fontWeight: '800', lineHeight: '1.2' }}>
            Built by Students, <span className="text-coral">Verified by Mentors</span>
          </h2>
          
          <p style={{ color: '#64748b', fontSize: '1.05rem', marginTop: '0.75rem', lineHeight: '1.6' }}>
            Hear from our candidates who transitioned theoretical computer science knowledge into production-ready software repositories.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {testimonials.map((t, idx) => (
            <div 
              key={idx}
              className="corporate-card"
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '20px',
                padding: '2.25rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div>
                {/* Rating stars / badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    background: '#eff6ff',
                    color: '#2563eb',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '9999px',
                    border: '1px solid #dbeafe'
                  }}>
                    {t.batch}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: '#f59e0b', fontWeight: '800' }}>★★★★★</span>
                </div>

                <p style={{ color: '#334155', fontSize: '0.95rem', lineHeight: '1.65', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                  "{t.quote}"
                </p>
              </div>

              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1.25rem' }}>
                <h4 style={{ fontSize: '1.05rem', color: '#0b0f19', fontWeight: '800', margin: '0 0 0.2rem 0' }}>
                  {t.name}
                </h4>
                <span style={{ fontSize: '0.82rem', color: '#64748b', display: 'block', marginBottom: '0.5rem' }}>
                  {t.track}
                </span>
                <span style={{
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  color: '#059669',
                  background: '#ecfdf5',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '6px',
                  display: 'inline-block'
                }}>
                  Project: {t.deliverable}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
