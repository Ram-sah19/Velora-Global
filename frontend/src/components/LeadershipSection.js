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
    <section style={{ padding: '4rem 0', background: 'rgba(15, 23, 42, 0.4)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
          <span className="badge badge-cyan" style={{ marginBottom: '0.75rem' }}>Leadership & Founding Team</span>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            Meet the Founders of <span className="gradient-text">Velora Global</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>
            Driven by a shared passion for educational transformation, practical skill development, and creating verified career pathways for talented students worldwide.
          </p>
        </div>

        {/* Leadership Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {team.map((member, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 1.5rem auto' }}>
                <img 
                  src={member.image} 
                  alt={member.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '3px solid #6366f1',
                    boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)'
                  }}
                />
                <span className="badge badge-gold" style={{
                  position: 'absolute',
                  bottom: '-5px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: '0.7rem',
                  whiteSpace: 'nowrap'
                }}>
                  {member.badge}
                </span>
              </div>

              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.25rem' }}>{member.name}</h3>
              <div style={{ color: '#6366f1', fontWeight: '600', fontSize: '0.9rem', marginBottom: '1rem' }}>
                {member.role}
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: '1.6' }}>
                {member.bio}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
