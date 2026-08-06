import React from 'react';

export default function LeadershipSection() {
  const team = [
    {
      name: "Rambilas Sah",
      role: "Founder & CEO",
      image: "/media/rambilas_sah.jpg",
      bio: "Visionary leader dedicated to building Velora Global into a global career bridge. Guiding strategy, student development, and industry partnerships.",
      badge: "Founder & CEO"
    },
    {
      name: "Puja Rouniyar",
      role: "Co-Founder & COO",
      image: "/media/puja_rouniyar.jpg",
      bio: "Operations executive driving program execution, intern onboarding, quality standards, and talent evaluation workflows across all domains.",
      badge: "Co-Founder & COO"
    },
    {
      name: "Rohit Sah",
      role: "Co-Founder & CTO",
      image: "/media/rohit_sah.jpg",
      bio: "Tech leader managing technical curriculum, project evaluation criteria, platform architecture, and hands-on engineering mentorship.",
      badge: "Co-Founder & CTO"
    }
  ];

  return (
    <section style={{ padding: '5rem 0', background: '#ffffff', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
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
            padding: '0.35rem 1rem',
            borderRadius: '9999px',
            border: '1px solid #dbeafe',
            display: 'inline-block',
            marginBottom: '0.75rem'
          }}>
            Executive Leadership
          </span>
          <h2 style={{ fontSize: '2.5rem', color: '#0b0f19', marginTop: '0.3rem', fontWeight: '800' }}>
            Meet the Founders of <span className="text-coral">Velora Global</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem', marginTop: '0.5rem' }}>
            Driven by educational transformation, practical skill development, and creating verified career pathways.
          </p>
        </div>

        {/* Leadership Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2.25rem'
        }}>
          {team.map((member, idx) => (
            <div 
              key={idx} 
              className="corporate-card" 
              style={{
                padding: '2.5rem 2rem',
                textAlign: 'center',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '20px',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ position: 'relative', width: '150px', height: '150px', margin: '0 auto 1.5rem auto' }}>
                <img 
                  src={member.image} 
                  alt={member.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = idx === 0 ? "/images/rambilas_sah.jpg"
                      : idx === 1 ? "/images/puja_rouniyar.jpg"
                      : "/images/rohit_sah.jpg";
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '4px solid #2563eb',
                    boxShadow: '0 8px 25px rgba(37, 99, 235, 0.25)'
                  }}
                />
                <span style={{
                  position: 'absolute',
                  bottom: '-10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: '0.75rem',
                  fontWeight: '800',
                  color: '#ffffff',
                  background: '#ff6b6b',
                  padding: '0.25rem 0.85rem',
                  borderRadius: '9999px',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 2px 8px rgba(255, 107, 107, 0.4)'
                }}>
                  {member.badge}
                </span>
              </div>

              <h3 style={{ fontSize: '1.45rem', color: '#0b0f19', fontWeight: '800', marginBottom: '0.25rem' }}>
                {member.name}
              </h3>
              <div style={{ color: '#2563eb', fontWeight: '700', fontSize: '0.92rem', marginBottom: '1.25rem' }}>
                {member.role}
              </div>
              <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: '1.6' }}>
                {member.bio}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
