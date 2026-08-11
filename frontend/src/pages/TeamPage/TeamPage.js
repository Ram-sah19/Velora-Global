import React from 'react';

export default function TeamPage({ onExploreClick }) {
  const founders = [
    {
      name: "Rohit Sah",
      role: "Founder & CEO",
      image: "/media/rohit_sah.jpg",
      badge: "Founder & CEO",
      bio: "Technology leader and founder directing platform architecture, technical curriculum design, project evaluation criteria, and strategic engineering growth.",
      expertise: ["System Architecture", "Executive Leadership", "Technical Evaluation", "Curriculum Design"],
      email: ""
    },
    {
      name: "Krishna Sah",
      role: "Co-Founder",
      image: "/media/rambilas_sah.png",
      badge: "Co-Founder",
      bio: "Co-Founder dedicated to building Velora Global into a premier career bridge. Driving strategic growth, student success initiatives, university relations, and industry partner alignments.",
      expertise: ["Strategic Growth", "Industry Partnerships", "Career Pathways", "Student Success"],
      email: ""
    },
    {
      name: "Puja Rouniyar",
      role: "Co-Founder & COO",
      image: "/media/puja_rouniyar.jpg",
      badge: "Co-Founder & COO",
      bio: "Operations executive overseeing program execution, candidate onboarding, quality assurance standards, and talent evaluation workflows across all 10 domain specializations.",
      expertise: ["Global Operations", "Talent Onboarding", "Program Quality", "Workflow Optimization"],
      email: ""
    }
  ];

  return (
    <section style={{ padding: '4rem 0 5rem 0' }}>
      <div className="container">
        
        {/* Page Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 4rem auto' }}>
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
            Executive Leadership & Team
          </span>
          
          <h1 style={{ fontSize: '3.2rem', color: '#0b0f19', marginTop: '0.2rem', fontWeight: '800', lineHeight: '1.15' }}>
            Meet the Minds Behind <br />
            <span className="text-coral">Velora Global</span>
          </h1>

          <p style={{ color: '#64748b', fontSize: '1.15rem', marginTop: '1rem', lineHeight: '1.6' }}>
            Our founding team brings together vision, operational rigor, and engineering excellence to shape the future of student career development.
          </p>
        </div>

        {/* 3 Executive Founders Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          marginBottom: '5rem'
        }}>
          {founders.map((member, idx) => (
            <div 
              key={idx}
              className="corporate-card"
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '24px',
                padding: '2.75rem 2rem',
                textAlign: 'center',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Top Highlight Bar */}
              <div style={{
                height: '5px',
                width: '100%',
                background: idx === 0 ? '#2563eb' : idx === 1 ? '#ff6b6b' : '#10b981',
                position: 'absolute',
                top: 0,
                left: 0
              }} />

              <div>
                {/* Founder Photo */}
                <div style={{ position: 'relative', width: '160px', height: '160px', margin: '0 auto 1.75rem auto' }}>
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
                      boxShadow: '0 10px 25px rgba(37, 99, 235, 0.25)'
                    }}
                  />
                  <span style={{
                    position: 'absolute',
                    bottom: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '0.78rem',
                    fontWeight: '800',
                    color: '#ffffff',
                    background: idx === 0 ? '#0b0f19' : idx === 1 ? '#ff6b6b' : '#2563eb',
                    padding: '0.3rem 0.9rem',
                    borderRadius: '9999px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.15)'
                  }}>
                    {member.badge}
                  </span>
                </div>

                <h2 style={{ fontSize: '1.6rem', color: '#0b0f19', fontWeight: '800', marginBottom: '0.25rem' }}>
                  {member.name}
                </h2>
                <div style={{ color: '#2563eb', fontWeight: '700', fontSize: '0.95rem', marginBottom: '1.25rem' }}>
                  {member.role}
                </div>

                <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '1.75rem' }}>
                  {member.bio}
                </p>

                {/* Expertise Badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  {member.expertise.map((exp, i) => (
                    <span key={i} style={{
                      fontSize: '0.75rem',
                      background: '#f1f5f9',
                      color: '#334155',
                      fontWeight: '700',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '6px',
                      border: '1px solid #e2e8f0'
                    }}>
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct Email Link */}
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1.25rem' }}>
                <a 
                  href={`mailto:${member.email}`}
                  style={{
                    fontSize: '0.85rem',
                    color: '#2563eb',
                    fontWeight: '700',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                   {member.email}
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* Company Vision & Values Section */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '24px',
          padding: '3.5rem',
          boxShadow: 'var(--shadow-md)',
          marginBottom: '4rem'
        }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
            <span style={{ fontSize: '0.8rem', color: '#ff6b6b', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Our Guiding Principles
            </span>
            <h3 style={{ fontSize: '2.2rem', color: '#0b0f19', marginTop: '0.3rem', fontWeight: '800' }}>
              Driven by Impact & Excellence
            </h3>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ fontSize: '1.2rem', color: '#0b0f19', fontWeight: '700', marginBottom: '0.5rem' }}>Practical Mastery</h4>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.6' }}>
                We believe true learning comes from building real production codebases, not just theoretical tutorials.
              </p>
            </div>

            <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ fontSize: '1.2rem', color: '#0b0f19', fontWeight: '700', marginBottom: '0.5rem' }}>Credential Trust</h4>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Every completion certificate is backed by public QR endpoints and tamper-proof verification IDs.
              </p>
            </div>

            <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ fontSize: '1.2rem', color: '#0b0f19', fontWeight: '700', marginBottom: '0.5rem' }}>Direct Mentorship</h4>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Our founding leaders actively review, grade, and provide actionable feedback on student deliverables.
              </p>
            </div>
          </div>
        </div>

        {/* Join Us Callout Banner */}
        <div style={{
          background: '#0b0f19',
          borderRadius: '24px',
          padding: '3.5rem',
          color: '#ffffff',
          textAlign: 'center',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <h3 style={{ fontSize: '2.2rem', color: '#ffffff', marginBottom: '0.75rem', fontWeight: '800' }}>
            Ready to Mentored by Founding Industry Leaders?
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
            Apply for our accredited 6 to 8-week internship programs across 10 specialized domain tracks.
          </p>
          <button onClick={onExploreClick} className="btn-coral" style={{ padding: '0.9rem 2.4rem', fontSize: '1rem' }}>
            Explore Internship Opportunities ➔
          </button>
        </div>

      </div>
    </section>
  );
}
