import React from 'react';

export default function EnterpriseSolutionsSection({ onServicesClick, onContactClick }) {
  const services = [
    {
      title: "Custom Web Application Development",
      icon: "🌐",
      description: "Modern, high-performance web applications built using React.js, Node.js, Express, and secure database architectures.",
      tags: ["Full Stack MVC", "REST APIs", "Cloud Deployment", "Responsive UI"]
    },
    {
      title: "Mobile App Engineering",
      icon: "📱",
      description: "Cross-platform mobile applications for iOS and Android tailored for startups, retail, and business management.",
      tags: ["React Native", "Flutter", "Offline Sync", "Push Notifications"]
    },
    {
      title: "AI Chatbot & Automation Integration",
      icon: "🤖",
      description: "Intelligent customer service chatbots, NLP pipelines, and workflow automation embedded into existing platforms.",
      tags: ["OpenAI / LLM APIs", "Workflow Automation", "Data Analysis", "Python"]
    }
  ];

  return (
    <section style={{ padding: '5rem 0', background: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
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
            Client & Enterprise Solutions
          </span>
          
          <h2 style={{ fontSize: '2.5rem', color: '#0b0f19', fontWeight: '800', lineHeight: '1.2' }}>
            Tailored Technology Solutions for <span className="text-coral">Modern Businesses</span>
          </h2>
          
          <p style={{ color: '#64748b', fontSize: '1.05rem', marginTop: '0.75rem', lineHeight: '1.6' }}>
            Beyond student training, Velora Global develops custom web systems, mobile products, and AI workflow tools for emerging businesses and corporate clients.
          </p>
        </div>

        {/* 3 Solution Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {services.map((item, idx) => (
            <div 
              key={idx}
              className="corporate-card"
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '20px',
                padding: '2.5rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div>
                <h3 style={{ fontSize: '1.35rem', color: '#0b0f19', fontWeight: '800', marginBottom: '0.75rem' }}>
                  {item.title}
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  {item.description}
                </p>
              </div>

              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                  {item.tags.map((t, i) => (
                    <span key={i} style={{
                      fontSize: '0.75rem',
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

                <button 
                  onClick={onServicesClick}
                  style={{
                    width: '100%',
                    padding: '0.7rem 1.25rem',
                    background: '#f8fafc',
                    color: '#2563eb',
                    border: '1px solid #cbd5e1',
                    borderRadius: '10px',
                    fontWeight: '700',
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => { e.target.style.background = '#2563eb'; e.target.style.color = '#ffffff'; }}
                  onMouseLeave={(e) => { e.target.style.background = '#f8fafc'; e.target.style.color = '#2563eb'; }}
                >
                  View Solution Specs ➔
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
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
          boxShadow: 'var(--shadow-md)'
        }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', margin: '0 0 0.4rem 0', color: '#ffffff' }}>
              Have a Project in Mind?
            </h3>
            <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.95rem' }}>
              Consult directly with our technical team to discuss project requirements, deliverables, and timelines.
            </p>
          </div>
          <button 
            onClick={onServicesClick}
            className="btn-coral"
            style={{ padding: '0.75rem 1.8rem', fontSize: '0.92rem' }}
          >
            Submit Client Inquiry ➔
          </button>
        </div>

      </div>
    </section>
  );
}
