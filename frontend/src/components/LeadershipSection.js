import React from 'react';

export default function LeadershipSection() {
  const team = [
    {
      name: "Rambilas Sah",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      bio: "Visionary leader dedicated to building Velora Global into a global career bridge. Guiding strategy, student development, and industry partnerships.",
      badge: "Founder"
    },
    {
      name: "Puja Rouniyar",
      role: "Co-Founder & COO",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      bio: "Operations executive driving program execution, intern onboarding, quality standards, and talent evaluation workflows across all domains.",
      badge: "Co-Founder"
    },
    {
      name: "Rohit Sah",
      role: "Co-Founder & CTO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      bio: "Tech leader managing technical curriculum, project evaluation criteria, platform architecture, and hands-on engineering mentorship.",
      badge: "Co-Founder"
    }
  ];

  return (
    <section style={{ padding: '4rem 0', background: '#ffffff', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
          <span className="badge badge-coral" style={{ marginBottom: '0.75rem' }}>Founding Leadership</span>
          <h2 style={{ fontSize: '2.5rem', color: '#0b0f19', marginBottom: '0.75rem' }}>
            Meet the Team Behind <span className="text-blue">Velora Global</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem' }}>
            Driven by educational transformation, practical skill development, and creating verified career pathways.
          </p>
        </div>

        {/* Leadership Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {team.map((member, idx) => (
            <div key={idx} className="corporate-card" style={{ padding: '2.25rem', textAlign: 'center' }}>
              <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 1.5rem auto' }}>
                <img 
                  src={member.image} 
                  alt={member.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '3px solid #2563eb',
                    boxShadow: '0 4px 15px rgba(37, 99, 235, 0.25)'
                  }}
                />
                <span className="badge badge-coral" style={{
                  position: 'absolute',
                  bottom: '-8px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: '0.72rem',
                  whiteSpace: 'nowrap'
                }}>
                  {member.badge}
                </span>
              </div>

              <h3 style={{ fontSize: '1.35rem', color: '#0b0f19', marginBottom: '0.25rem' }}>{member.name}</h3>
              <div style={{ color: '#2563eb', fontWeight: '700', fontSize: '0.9rem', marginBottom: '1rem' }}>
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
