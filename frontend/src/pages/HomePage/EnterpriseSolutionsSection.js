import React from 'react';

export default function EnterpriseSolutionsSection({ onServicesClick, onContactClick }) {
  const solutions = [
    {
      id: 'web-development',
      badge: 'FULL-STACK SAAS & WEB',
      title: 'Custom Web Application Development',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
      description: 'Production-ready, highly secure web applications built using MERN Stack MVC architecture, high-concurrency Node.js microservices, and modern React interfaces.',
      tags: ['Full Stack MVC', 'REST & GraphQL', 'Cloud Deployment', 'High Performance UI'],
      deliverables: ['Custom SaaS Platforms', 'Enterprise Admin Portals', 'Automated Payment & Auth']
    },
    {
      id: 'mobile-engineering',
      badge: 'CROSS-PLATFORM MOBILE',
      title: 'Mobile App Engineering',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      ),
      description: 'High-speed iOS and Android applications developed with React Native and Flutter, featuring offline sync, push notifications, and native hardware integration.',
      tags: ['React Native', 'Flutter', 'Offline Sync', 'App Store Deploy'],
      deliverables: ['Consumer & Fintech Apps', 'Real-Time Sync Systems', 'Clean Native UX']
    },
    {
      id: 'ai-automation',
      badge: 'INTELLIGENT AI SYSTEMS',
      title: 'AI Chatbot & Automation Integration',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="10" rx="2" />
          <circle cx="12" cy="5" r="2" />
          <path d="M12 7v4" />
          <line x1="8" y1="16" x2="8.01" y2="16" />
          <line x1="16" y1="16" x2="16.01" y2="16" />
        </svg>
      ),
      description: 'Intelligent conversational agents, custom LLM fine-tuning, NLP pipelines, and automated customer workflows integrated directly into your existing business stack.',
      tags: ['OpenAI / LLM APIs', 'Workflow Automation', 'NLP Pipelines', 'Python Backend'],
      deliverables: ['24/7 Smart Support Bots', 'Lead Generation AI', 'Automated Workflows']
    }
  ];

  return (
    <section style={{ 
      padding: '5.5rem 0', 
      background: '#f8fafc', 
      borderTop: '1px solid #e2e8f0', 
      borderBottom: '1px solid #e2e8f0',
      position: 'relative'
    }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem auto' }}>
          <span style={{
            fontSize: '0.8rem',
            color: '#2563eb',
            fontWeight: '800',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            background: '#eff6ff',
            padding: '0.35rem 1.1rem',
            borderRadius: '9999px',
            border: '1px solid #dbeafe',
            display: 'inline-block',
            marginBottom: '0.85rem'
          }}>
            Client & Enterprise Solutions
          </span>
          
          <h2 style={{ 
            fontSize: 'clamp(2rem, 4vw, 2.6rem)', 
            color: '#0b0f19', 
            fontWeight: '800', 
            lineHeight: '1.2',
            letterSpacing: '-0.02em'
          }}>
            Tailored Technology Solutions for <span className="text-coral">Modern Global Businesses</span>
          </h2>
          
          <p style={{ 
            color: '#64748b', 
            fontSize: '1.05rem', 
            marginTop: '0.9rem', 
            lineHeight: '1.65' 
          }}>
            Delivering scalable enterprise software, mobile platforms, and AI automation for corporate clients across the <strong>USA, Nepal, and international markets</strong> with production-grade engineering excellence.
          </p>
        </div>

        {/* 3 Solution Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          marginBottom: '3.5rem'
        }}>
          {solutions.map((item, idx) => (
            <div 
              key={idx}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '20px',
                padding: '2.25rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 16px 36px rgba(11, 15, 25, 0.09)';
                e.currentTarget.style.borderColor = '#93c5fd';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.04)';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: '#eff6ff',
                    border: '1px solid #dbeafe',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {item.icon}
                  </div>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: '800',
                    letterSpacing: '0.06em',
                    color: '#2563eb',
                    background: '#f8fafc',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0'
                  }}>
                    {item.badge}
                  </span>
                </div>

                <h3 style={{ 
                  fontSize: '1.28rem', 
                  color: '#0b0f19', 
                  fontWeight: '800', 
                  marginBottom: '0.75rem', 
                  lineHeight: '1.3' 
                }}>
                  {item.title}
                </h3>
                
                <p style={{ 
                  color: '#64748b', 
                  fontSize: '0.92rem', 
                  lineHeight: '1.6', 
                  marginBottom: '1.5rem' 
                }}>
                  {item.description}
                </p>

                {/* Deliverables Bullet List */}
                <div style={{ marginBottom: '1.5rem', background: '#f8fafc', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: '0.74rem', fontWeight: '800', color: '#475569', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                    Key Deliverables
                  </span>
                  {item.deliverables.map((deliv, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.84rem', color: '#334155', marginBottom: '0.25rem' }}>
                      <span style={{ color: '#2563eb', fontWeight: 'bold' }}>•</span>
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {/* Tech Stack Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                  {item.tags.map((t, i) => (
                    <span key={i} style={{
                      fontSize: '0.74rem',
                      background: '#f1f5f9',
                      color: '#334155',
                      fontWeight: '700',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '6px',
                      border: '1px solid #e2e8f0'
                    }}>
                      {t}
                    </span>
                  ))}
                </div>

                {/* Dual Action Buttons */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                  <button 
                    onClick={onServicesClick}
                    style={{
                      padding: '0.65rem 0.85rem',
                      background: '#ffffff',
                      color: '#2563eb',
                      border: '1.5px solid #2563eb',
                      borderRadius: '8px',
                      fontWeight: '700',
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      textAlign: 'center'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#eff6ff'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = '#ffffff'; }}
                  >
                    Tech Specs
                  </button>

                  <button 
                    onClick={onContactClick}
                    className="btn-coral"
                    style={{
                      padding: '0.65rem 0.85rem',
                      fontSize: '0.82rem',
                      fontWeight: '800',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    Request Build
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner for Direct Founder Consultation */}
        <div style={{
          background: 'linear-gradient(135deg, #0a2540 0%, #1e3a5f 100%)',
          borderRadius: '20px',
          padding: '2.5rem 3rem',
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)'
        }}>
          <div style={{ maxWidth: '640px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span style={{
                fontSize: '0.72rem',
                background: 'rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                padding: '0.2rem 0.6rem',
                borderRadius: '4px',
                fontWeight: '800',
                letterSpacing: '0.05em'
              }}>
                FOUNDER & TECHNICAL LEADERSHIP
              </span>
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', margin: '0 0 0.4rem 0', color: '#ffffff' }}>
              Have a Project in Mind?
            </h3>
            <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.5' }}>
              Consult directly with <strong>Ram Sah (Founder & CEO)</strong> and our senior engineering team to discuss system architecture, deliverables, and timelines.
            </p>
          </div>
          
          <button 
            onClick={onContactClick || onServicesClick}
            className="btn-coral"
            style={{
              padding: '0.85rem 1.85rem',
              fontSize: '0.95rem',
              fontWeight: '800',
              borderRadius: '9999px',
              cursor: 'pointer',
              boxShadow: '0 4px 18px rgba(255, 107, 107, 0.35)',
              whiteSpace: 'nowrap'
            }}
          >
            Schedule 1-on-1 Discovery ➔
          </button>
        </div>

      </div>
    </section>
  );
}
