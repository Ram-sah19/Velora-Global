import React from 'react';

export default function HeroSection({ onExploreClick, onVerifyClick }) {
  const domains = [
    {
      icon: "💻",
      title: "Software Development",
      description: "Building robust, scalable full-stack applications with clean MVC architecture and modern tools."
    },
    {
      icon: "🧠",
      title: "AI & Data Science",
      description: "Leveraging raw data, machine learning, and predictive analytics to drive intelligent insights."
    },
    {
      icon: "🎨",
      title: "UI/UX Product Design",
      description: "Designing modern Figma interfaces, user journey maps, and high-converting design systems."
    },
    {
      icon: "📈",
      title: "Marketing & Strategy",
      description: "Growth marketing, SEO optimization, social campaigns, and strategic brand positioning."
    }
  ];

  return (
    <section style={{ padding: '4rem 0 2rem 0' }}>
      <div className="container">
        
        {/* Top Hero Split Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '3rem',
          alignItems: 'center',
          marginBottom: '5rem'
        }}>
          
          {/* Left Hero Text Column */}
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <span className="badge badge-coral" style={{ padding: '0.4rem 1.25rem', fontSize: '0.85rem' }}>
                ⚡ Official Career Gateway by Velora Global
              </span>
            </div>

            <h1 style={{
              fontSize: '3.4rem',
              lineHeight: '1.15',
              fontWeight: '800',
              color: '#0b0f19',
              marginBottom: '1.25rem'
            }}>
              Delivering Opportunities with <br />
              <span className="text-coral">Purpose & Precision</span>
            </h1>

            <p style={{
              fontSize: '1.15rem',
              color: '#64748b',
              marginBottom: '2.25rem',
              maxWidth: '540px',
              lineHeight: '1.6'
            }}>
              Connecting ambitious students with real-world learning opportunities, verified domain projects, and official industry certifications.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button onClick={onExploreClick} className="btn-primary" style={{ padding: '0.85rem 1.8rem', fontSize: '1rem' }}>
                Explore Internships
              </button>
              <button onClick={onVerifyClick} className="btn-secondary" style={{ padding: '0.85rem 1.8rem', fontSize: '1rem' }}>
                Verify Certificate
              </button>
            </div>
          </div>

          {/* Right Hero Graphic / Arch Portrait Container */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              position: 'relative',
              width: '380px',
              height: '420px',
              borderRadius: '200px 200px 24px 24px',
              background: 'linear-gradient(180deg, #dbeafe 0%, #2563eb 100%)',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-lg)',
              overflow: 'hidden'
            }}>
              {/* Leader Image */}
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80" 
                alt="Rambilas Sah - Founder"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />

              {/* Floating Floating Badge */}
              <div className="corporate-card" style={{
                position: 'absolute',
                bottom: '1.5rem',
                left: '1.5rem',
                right: '1.5rem',
                padding: '0.85rem 1.25rem',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <h4 style={{ fontSize: '0.95rem', color: '#0b0f19' }}>Rambilas Sah</h4>
                  <span style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: '700' }}>Founder & CEO • Velora Global</span>
                </div>
                <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>Co-Founded with Puja & Rohit</span>
              </div>
            </div>
          </div>

        </div>

        {/* "What We Offer" Section */}
        <div style={{ marginBottom: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: '#2563eb', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Domain Specializations</span>
            <h2 style={{ fontSize: '2.2rem', color: '#0b0f19', marginTop: '0.3rem' }}>What We Do</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem'
          }}>
            {domains.map((d, i) => (
              <div key={i} className="corporate-card" style={{ padding: '2rem', textAlign: 'left' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: '#eff6ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  marginBottom: '1.25rem'
                }}>
                  {d.icon}
                </div>
                <h3 style={{ fontSize: '1.2rem', color: '#0b0f19', marginBottom: '0.5rem' }}>{d.title}</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.5' }}>{d.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dark Callout Banner (Matching Midnight #0B0F19 reference) */}
        <div style={{
          background: '#0b0f19',
          borderRadius: '20px',
          padding: '3rem',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '2rem',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <div>
            <h3 style={{ fontSize: '2rem', color: 'white', marginBottom: '0.5rem' }}>
              Let's work together on your next career milestone.
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>
              Gain practical industry exposure, verified credentials, and continuous mentorship.
            </p>
          </div>

          <button onClick={onExploreClick} className="btn-coral" style={{ padding: '0.9rem 2.2rem', fontSize: '1rem' }}>
            Get In Touch ➔
          </button>
        </div>

      </div>
    </section>
  );
}
