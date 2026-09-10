import React, { useState } from 'react';

export default function LiveProjectsShowcase({ onConsultationClick, onServicesClick }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const projects = [
    {
      id: 1,
      category: 'cloud',
      title: 'Enterprise Multi-Tenant SaaS Platform',
      clientBadge: '🇺🇸 US Corporate Client Delivery',
      internRole: 'Full Stack MERN & Cloud DevOps Interns',
      description: 'A scalable multi-tenant corporate governance dashboard with role-based access control (RBAC), real-time team collaboration, and automated audit logging.',
      metrics: [
        { label: 'Latency', value: '<180ms' },
        { label: 'Test Coverage', value: '96%' },
        { label: 'Architecture', value: 'Docker Microservices' }
      ],
      tags: ['React.js', 'Node.js', 'MongoDB', 'Docker', 'AWS ECS', 'Tailwind CSS'],
      status: 'Live in Production',
      statusColor: '#10b981'
    },
    {
      id: 2,
      category: 'ai',
      title: 'Intelligent 24/7 AI Knowledge & Document Agent',
      clientBadge: '🌐 Multinational Enterprise Integration',
      internRole: 'Python AI/ML & NLP Engineering Interns',
      description: 'Custom Retrieval-Augmented Generation (RAG) agent that parses internal enterprise documentation and answers employee and customer queries in real-time.',
      metrics: [
        { label: 'Accuracy', value: '99.2%' },
        { label: 'Query Resolution', value: '2.1s avg' },
        { label: 'Vector Store', value: 'ChromaDB' }
      ],
      tags: ['Python', 'FastAPI', 'OpenAI / Gemini', 'LangChain', 'Vector Search', 'Redis'],
      status: 'Active Deployment',
      statusColor: '#6366f1'
    },
    {
      id: 3,
      category: 'mobile',
      title: 'Cross-Platform Real-Time Logistics & Tracking Suite',
      clientBadge: '📦 Commercial Retail & Logistics Partner',
      internRole: 'Mobile App Engineering Interns (React Native / Flutter)',
      description: 'High-performance mobile application for iOS and Android featuring live GPS fleet tracking, automated delivery receipts, and secure in-app payments.',
      metrics: [
        { label: 'Platform', value: 'iOS & Android' },
        { label: 'Sync Speed', value: 'Real-Time WebSockets' },
        { label: 'Crash-Free', value: '99.8%' }
      ],
      tags: ['React Native', 'Flutter', 'WebSockets', 'Firebase', 'Node.js', 'Stripe API'],
      status: 'Deployed App Store & Play Store',
      statusColor: '#f59e0b'
    }
  ];

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section style={{ padding: '5.5rem 0', background: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem auto' }}>
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
            PRODUCTION DELIVERABLES & PORTFOLIO
          </span>
          
          <h2 style={{ fontSize: '2.5rem', color: '#0b0f19', fontWeight: '800', lineHeight: '1.2' }}>
            Real Code. Real Clients. <span className="text-coral">Real Engineering Impact.</span>
          </h2>
          
          <p style={{ color: '#64748b', fontSize: '1.05rem', marginTop: '0.75rem', lineHeight: '1.6' }}>
            Inspect actual production software engineered by Velora Global interns under executive mentorship for <strong>clients in the USA and foreign multinational companies</strong>.
          </p>

          {/* Filter Tabs */}
          <div style={{
            display: 'inline-flex',
            background: '#ffffff',
            padding: '0.35rem',
            borderRadius: '9999px',
            border: '1px solid #e2e8f0',
            marginTop: '1.75rem',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
          }}>
            {[
              { key: 'all', label: 'All Projects' },
              { key: 'cloud', label: 'Cloud & SaaS' },
              { key: 'ai', label: 'AI & Data Agents' },
              { key: 'mobile', label: 'Mobile Apps' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveCategory(tab.key)}
                style={{
                  padding: '0.5rem 1.25rem',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  borderRadius: '9999px',
                  border: 'none',
                  cursor: 'pointer',
                  background: activeCategory === tab.key ? '#2563eb' : 'transparent',
                  color: activeCategory === tab.key ? '#ffffff' : '#64748b',
                  transition: 'all 0.2s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {filteredProjects.map((p) => (
            <div 
              key={p.id}
              className="corporate-card"
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '20px',
                padding: '2.25rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div>
                {/* Header Badges */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: '800',
                    color: '#0b0f19',
                    background: '#f1f5f9',
                    padding: '0.3rem 0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0'
                  }}>
                    {p.clientBadge}
                  </span>

                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: '800',
                    color: p.statusColor,
                    background: `${p.statusColor}15`,
                    padding: '0.25rem 0.65rem',
                    borderRadius: '9999px',
                    border: `1px solid ${p.statusColor}40`,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: p.statusColor }} />
                    {p.status}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.3rem', color: '#0b0f19', fontWeight: '800', marginBottom: '0.5rem', lineHeight: '1.3' }}>
                  {p.title}
                </h3>

                <span style={{ fontSize: '0.8rem', color: '#2563eb', fontWeight: '700', display: 'block', marginBottom: '1rem' }}>
                  👥 {p.internRole}
                </span>

                <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  {p.description}
                </p>

                {/* Metrics Pill Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '0.5rem',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '0.75rem 0.5rem',
                  textAlign: 'center',
                  marginBottom: '1.5rem'
                }}>
                  {p.metrics.map((m, idx) => (
                    <div key={idx}>
                      <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: '600', display: 'block' }}>
                        {m.label}
                      </span>
                      <span style={{ fontSize: '0.85rem', color: '#0b0f19', fontWeight: '800', marginTop: '2px', display: 'block' }}>
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {/* Tech Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                  {p.tags.map((t, i) => (
                    <span key={i} style={{
                      fontSize: '0.74rem',
                      background: '#f1f5f9',
                      color: '#334155',
                      fontWeight: '700',
                      padding: '0.2rem 0.55rem',
                      borderRadius: '6px'
                    }}>
                      {t}
                    </span>
                  ))}
                </div>

                {onConsultationClick && (
                  <button
                    onClick={onConsultationClick}
                    style={{
                      width: '100%',
                      padding: '0.65rem 1rem',
                      fontSize: '0.88rem',
                      fontWeight: '700',
                      background: '#ffffff',
                      color: '#2563eb',
                      border: '1.5px solid #2563eb',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    Request Similar Architecture ➔
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Global CTA Bar */}
        <div style={{
          background: 'linear-gradient(135deg, #0b0f19 0%, #1e293b 100%)',
          borderRadius: '20px',
          padding: '2.5rem 3rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          color: '#ffffff'
        }}>
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', margin: '0 0 0.4rem 0', color: '#ffffff' }}>
              Want our engineering teams to build your software?
            </h3>
            <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.95rem' }}>
              We build custom cloud platforms, mobile apps, and AI integrations for startups & enterprises in Nepal and the USA.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {onConsultationClick && (
              <button 
                onClick={onConsultationClick}
                className="btn-coral"
                style={{
                  padding: '0.85rem 1.75rem',
                  fontSize: '0.92rem',
                  fontWeight: '800',
                  borderRadius: '9999px',
                  cursor: 'pointer'
                }}
              >
                Schedule Discovery Call
              </button>
            )}

            {onServicesClick && (
              <button 
                onClick={onServicesClick}
                style={{
                  padding: '0.85rem 1.5rem',
                  fontSize: '0.92rem',
                  fontWeight: '700',
                  color: '#ffffff',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '9999px',
                  cursor: 'pointer'
                }}
              >
                View Enterprise Services ➔
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
