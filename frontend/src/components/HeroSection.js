import React from 'react';

export default function HeroSection({ onExploreClick, onVerifyClick }) {
  return (
    <section style={{
      position: 'relative',
      padding: '5rem 0 4rem 0',
      overflow: 'hidden'
    }}>
      {/* Background Lighting Gradients */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '800px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, rgba(6, 182, 212, 0.1) 40%, rgba(11, 15, 25, 0) 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        
        {/* Top Tagline Badge */}
        <div className="animate-fade-in" style={{ marginBottom: '1.5rem' }}>
          <span className="badge badge-indigo" style={{ padding: '0.4rem 1.25rem', fontSize: '0.85rem' }}>
            ⚡ Official Career & Internship Gateway by Velora Global
          </span>
        </div>

        {/* Main Hero Heading */}
        <h1 className="animate-fade-in" style={{
          fontSize: '3.6rem',
          lineHeight: '1.15',
          maxWidth: '900px',
          margin: '0 auto 1.5rem auto'
        }}>
          Bridge the Gap Between <span className="gradient-text">Academic Learning</span> and <span className="gradient-text">Industry Mastery</span>
        </h1>

        {/* Subheading / Vision & Mission snippet */}
        <p className="animate-fade-in" style={{
          fontSize: '1.2rem',
          color: '#94a3b8',
          maxWidth: '750px',
          margin: '0 auto 2.5rem auto',
          fontWeight: '400'
        }}>
          Velora Global connects ambitious students with verified real-world internships, domain projects, continuous evaluation, and official industry certifications across Technology, Design, Data, and Business.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
          <button onClick={onExploreClick} className="btn-primary" style={{ padding: '0.9rem 2rem', fontSize: '1.05rem' }}>
            Explore Internship Programs ➔
          </button>
          <button onClick={onVerifyClick} className="btn-secondary" style={{ padding: '0.9rem 2rem', fontSize: '1.05rem' }}>
            Verify Certificate ID 🔍
          </button>
        </div>

        {/* Live Metrics Grid */}
        <div className="glass-card" style={{
          padding: '2rem 3rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          textAlign: 'center',
          maxWidth: '1000px',
          margin: '0 auto 4rem auto'
        }}>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#6366f1' }}>10,000+</div>
            <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: '0.2rem' }}>Student Aspirants</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#06b6d4' }}>500+</div>
            <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: '0.2rem' }}>Active Projects Completed</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#10b981' }}>98%</div>
            <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: '0.2rem' }}>Student Satisfaction</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#f59e0b' }}>100%</div>
            <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: '0.2rem' }}>Verified Certificates</div>
          </div>
        </div>

        {/* Vision & Mission Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          textAlign: 'left'
        }}>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(99, 102, 241, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              color: '#818cf8',
              marginBottom: '1rem'
            }}>
              🎯
            </div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>Our Vision</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.98rem', lineHeight: '1.6' }}>
              "To empower students with practical experience, industry exposure, and opportunities that help them build successful careers."
            </p>
          </div>

          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(6, 182, 212, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              color: '#22d3ee',
              marginBottom: '1rem'
            }}>
              🚀
            </div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>Our Mission</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.98rem', lineHeight: '1.6' }}>
              "Connecting students with meaningful internships while helping organizations discover and develop future talent."
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
