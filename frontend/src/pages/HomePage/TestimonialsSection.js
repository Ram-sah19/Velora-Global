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
    <section style={{
      padding: '6rem 0',
      background: 'var(--premium-grad-light)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div aria-hidden="true" style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background: 'radial-gradient(900px 400px at 100% 100%, rgba(37, 99, 235, 0.06), transparent 60%)'
      }} />
      <div className="container" style={{ position: 'relative' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3.5rem auto' }}>
          <span className="premium-eyebrow" style={{
            fontSize: '0.82rem',
            color: '#1d4ed8',
            fontWeight: '700',
            marginBottom: '0.95rem'
          }}>
            Student Outcomes
          </span>
          
          <h2 className="premium-headline" style={{ fontSize: '2.7rem', fontWeight: '800', lineHeight: '1.15' }}>
            Built by Students, Verified by Mentors
          </h2>
          
          <p style={{ color: '#64748b', fontSize: '1.05rem', marginTop: '0.85rem', lineHeight: '1.6' }}>
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
              className="premium-card premium-glass"
              style={{
                background: 'rgba(255, 255, 255, 0.88)',
                border: '1px solid rgba(226, 232, 240, 0.9)',
                borderRadius: '22px',
                padding: '2.25rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative'
              }}
            >
              <span aria-hidden="true" style={{
                position: 'absolute',
                top: '1rem',
                right: '1.4rem',
                fontSize: '3.4rem',
                lineHeight: '1',
                fontFamily: 'Georgia, serif',
                fontWeight: '800',
                background: 'var(--premium-grad-brand)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
                opacity: 0.35
              }}>&rdquo;</span>

              <div>
                {/* Rating stars / badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    background: 'rgba(37, 99, 235, 0.07)',
                    color: '#2563eb',
                    padding: '0.25rem 0.7rem',
                    borderRadius: '9999px',
                    border: '1px solid rgba(37, 99, 235, 0.18)'
                  }}>
                    {t.batch}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: '#f59e0b', fontWeight: '800', letterSpacing: '0.08em' }}>★★★★★</span>
                </div>

                <p style={{ color: '#334155', fontSize: '0.95rem', lineHeight: '1.7', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                  "{t.quote}"
                </p>
              </div>

              <div style={{ borderTop: '1px solid #eef2f7', paddingTop: '1.25rem' }}>
                <h4 style={{ fontSize: '1.05rem', color: '#0b1220', fontWeight: '800', margin: '0 0 0.2rem 0' }}>
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
                  padding: '0.25rem 0.7rem',
                  borderRadius: '9999px',
                  border: '1px solid #a7f3d0',
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
