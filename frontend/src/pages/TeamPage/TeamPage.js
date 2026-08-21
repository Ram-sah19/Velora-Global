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
      accentColor: "#2563eb"
    },
    {
      name: "Krishna Sah",
      role: "Co-Founder & CTO",
      image: "/media/rambilas_sah.png",
      badge: "Co-Founder & CTO",
      bio: "Directing technical infrastructure, cloud deployments, platform engineering, AI integrations, and full-stack curriculum roadmaps across all domain specializations.",
      expertise: ["Cloud Architecture", "Platform Engineering", "Technical Strategy", "AI Systems"],
      accentColor: "#ff6b6b"
    },
    {
      name: "Puja Rouniyar",
      role: "Co-Founder & COO",
      image: "/media/puja_rouniyar.jpg",
      badge: "Co-Founder & COO",
      bio: "Operations executive overseeing program execution, candidate onboarding, quality assurance standards, and talent evaluation workflows across all 10 domain specializations.",
      expertise: ["Global Operations", "Talent Onboarding", "Program Quality", "Workflow Optimization"],
      accentColor: "#10b981"
    },
    {
      name: "Shivshankar Sah",
      role: "Contracts & Operations Manager",
      image: "/media/shivshankar_sah.jpg",
      badge: "Contracts Manager",
      bio: "Directs enterprise contracts, corporate agreements, vendor operations, institutional MoUs, and legal compliance workflows for all student and client engagements.",
      expertise: ["Contracts Management", "Corporate MoUs", "SLA Compliance", "Vendor Operations"],
      accentColor: "#f59e0b"
    }
  ];

  const managementTeam = [
    {
      name: "Aayush Shrestha",
      role: "Technical Programs Lead",
      badge: "Programs Lead",
      bio: "Manages technical cohort sprints, domain syllabus roadmaps, and technical mentor allocations across engineering tracks.",
      expertise: ["Cohort Management", "Sprint Planning", "Technical Roadmaps"],
      accentColor: "#6366f1"
    },
    {
      name: "Sunita Thapa",
      role: "University Relations & Placement Lead",
      badge: "University Relations",
      bio: "Leads academic outreach, institutional agreements, candidate onboarding verification, and post-internship career placement.",
      expertise: ["University Partnerships", "Candidate Placement", "Campus Outreach"],
      accentColor: "#ec4899"
    }
  ];

  return (
    <section style={{ padding: '4rem 0 5rem 0', background: '#f8fafc' }}>
      <div className="container">
        
        {/* Page Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 4rem auto' }}>
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
            About Us & Executive Leadership
          </span>
          
          <h1 style={{ fontSize: '3.2rem', color: '#0b0f19', marginTop: '0.2rem', fontWeight: '800', lineHeight: '1.15' }}>
            Empowering Careers Through <br />
            <span className="text-coral">Real-World Innovation</span>
          </h1>

          <p style={{ color: '#64748b', fontSize: '1.15rem', marginTop: '1rem', lineHeight: '1.6' }}>
            Velora Global was founded by engineering leaders and industry mentors dedicated to bridging the gap between academic theory and high-impact industry execution.
          </p>
        </div>

        {/* 4 Executive Leadership Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
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
                padding: '2.5rem 1.75rem',
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
                background: member.accentColor,
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
                      e.target.src = member.image.replace('/media/', '/images/');
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: `4px solid ${member.accentColor || '#2563eb'}`,
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)'
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
                    background: member.accentColor || '#2563eb',
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

              {/* Official Social / LinkedIn Link */}
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1.25rem' }}>
                <a 
                  href="https://www.linkedin.com/company/veloraglo-bal/"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontSize: '0.85rem',
                    color: '#2563eb',
                    fontWeight: '700',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    textDecoration: 'none'
                  }}
                >
                  Connect on LinkedIn ➔
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* Operations & Management Team Section */}
        <div style={{ marginBottom: '5rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 2.5rem auto' }}>
            <span style={{ fontSize: '0.8rem', color: '#2563eb', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Operations & Student Success
            </span>
            <h3 style={{ fontSize: '2rem', color: '#0b0f19', marginTop: '0.3rem', fontWeight: '800' }}>
              Departmental Management
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
              Dedicated domain leaders overseeing curriculum delivery, institutional MoUs, contracts, and student career outcomes.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            {managementTeam.map((member, idx) => (
              <div 
                key={idx}
                className="corporate-card"
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '20px',
                  padding: '2rem',
                  textAlign: 'center',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  height: '4px',
                  width: '100%',
                  background: member.accentColor,
                  position: 'absolute',
                  top: 0,
                  left: 0
                }} />

                <div>
                  <div style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    background: '#f1f5f9',
                    color: member.accentColor,
                    border: `2px solid ${member.accentColor}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.3rem',
                    fontWeight: '800',
                    margin: '0 auto 1rem auto',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                  }}>
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>

                  <span style={{
                    display: 'inline-block',
                    fontSize: '0.72rem',
                    fontWeight: '800',
                    color: '#ffffff',
                    background: member.accentColor,
                    padding: '0.22rem 0.8rem',
                    borderRadius: '9999px',
                    marginBottom: '0.65rem'
                  }}>
                    {member.badge}
                  </span>

                  <h3 style={{ fontSize: '1.35rem', color: '#0b0f19', fontWeight: '800', marginBottom: '0.2rem' }}>
                    {member.name}
                  </h3>
                  <div style={{ color: '#2563eb', fontWeight: '700', fontSize: '0.88rem', marginBottom: '1rem' }}>
                    {member.role}
                  </div>

                  <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: '1.55', marginBottom: '1.25rem' }}>
                    {member.bio}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', justifyContent: 'center' }}>
                    {member.expertise.map((exp, i) => (
                      <span key={i} style={{
                        fontSize: '0.72rem',
                        background: '#f1f5f9',
                        color: '#334155',
                        fontWeight: '600',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '6px'
                      }}>
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
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
            Apply for our structured practical 6 to 8-week internship programs across 10 specialized domain tracks.
          </p>
          <button onClick={onExploreClick} className="btn-coral" style={{ padding: '0.9rem 2.4rem', fontSize: '1rem' }}>
            Explore Internship Opportunities ➔
          </button>
        </div>

      </div>
    </section>
  );
}
