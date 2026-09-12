import React, { useState } from 'react';
import ClientInquiryModal from '../../components/ClientInquiryModal';

export default function ServicesPage({ selectedCategory = 'all', currentUser }) {
  const [activeCategory, setActiveCategory] = useState(selectedCategory);
  const [showClientModal, setShowClientModal] = useState(false);
  const [targetServiceTitle, setTargetServiceTitle] = useState('Web Application Development');

  React.useEffect(() => {
    if (selectedCategory) {
      setActiveCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const servicesList = [
    {
      id: 'web-dev',
      category: 'web',
      badge: 'Web Solutions',
      title: 'Web Application Development',
      tagline: 'Custom SaaS, Enterprise Web Portals & High-Performance Full Stack Systems',
      icon: '',
      deliverables: [
        'MERN Full Stack MVC Architecture (MongoDB, Express, React, Node.js)',
        'Custom Enterprise Web Portals & High-Performance SaaS Systems',
        'Scalable REST & GraphQL Microservice APIs',
        'Responsive Mobile-First UI/UX & Cloud DB Infrastructure'
      ],
      techStack: ['MERN Stack', 'Full Stack MVC', 'React.js', 'Node.js', 'Express', 'MongoDB Atlas'],
      description: 'We build high-performance, secure, and scalable web applications tailored to your business goals. Powered by MERN Full Stack MVC Architecture, our platform delivers production-ready code with modern enterprise standards.'
    },
    {
      id: 'mobile-dev',
      category: 'mobile',
      badge: 'Mobile Solutions',
      title: 'Mobile Application Development',
      tagline: 'Cross-Platform iOS & Android Apps with Native Performance & Fluid UX',
      icon: '',
      deliverables: [
        'iOS & Android Cross-Platform Mobile Apps',
        'Real-Time Offline Data Sync & Push Notifications',
        'Native Device Hardware API Integration',
        'App Store & Google Play Store Publishing'
      ],
      techStack: ['React Native', 'Flutter', 'iOS & Android Native UI', 'REST APIs', 'Firebase'],
      description: 'Transform your ideas into intuitive, high-speed mobile applications. We design cross-platform apps using React Native and Flutter, ensuring cost-efficient deployment across iOS and Android with single-codebase efficiency.'
    },
    {
      id: 'ai-chatbot',
      category: 'ai',
      badge: 'AI & Automation',
      title: 'AI Chatbots & Intelligent Agents',
      tagline: 'Autonomous Support Agents, Conversational LLM Bots & Smart Workflow Automation',
      icon: '',
      deliverables: [
        'Custom 24/7 AI Customer Support Chatbots',
        'Gemini & OpenAI LLM RAG System Integrations',
        'Natural Language FAQ & Smart Lead Capture Systems',
        'Automated Business Workflow Pipeline Automations'
      ],
      techStack: ['Python', 'PyTorch / TensorFlow', 'LangChain', 'OpenAI & Gemini APIs', 'Node.js'],
      description: 'Empower your business with cutting-edge artificial intelligence. We build custom conversational AI chatbots, smart customer support agents, and automated workflow pipelines that run 24/7 to boost productivity and conversion rates.'
    }
  ];

  const filteredServices = activeCategory === 'all' 
    ? servicesList 
    : servicesList.filter(s => s.category === activeCategory);

  const openInquiryModal = (serviceTitle) => {
    setTargetServiceTitle(serviceTitle || 'Web Application Development');
    setShowClientModal(true);
  };

  return (
    <section style={{ padding: '4rem 0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem auto' }}>
          <span className="badge badge-coral" style={{ marginBottom: '0.75rem' }}>Enterprise Tech Solutions</span>
          <h2 style={{ fontSize: '2.6rem', color: '#0b0f19', marginBottom: '1rem', lineHeight: '1.2' }}>
            Transforming Ideas into Digital <span className="text-coral">Excellence</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: '1.6' }}>
            Velora Global delivers end-to-end software development services — from scalable web portals and native cross-platform mobile apps to intelligent AI chatbots.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3rem' }}>
          <button
            onClick={() => setActiveCategory('all')}
            style={{
              padding: '0.6rem 1.3rem',
              borderRadius: '9999px',
              fontSize: '0.9rem',
              fontWeight: '700',
              background: activeCategory === 'all' ? '#0b0f19' : '#ffffff',
              border: activeCategory === 'all' ? '1px solid #0b0f19' : '1px solid #e2e8f0',
              color: activeCategory === 'all' ? '#ffffff' : '#64748b',
              boxShadow: 'var(--shadow-sm)',
              cursor: 'pointer'
            }}
          >
            All Services
          </button>
          <button
            onClick={() => setActiveCategory('web')}
            style={{
              padding: '0.6rem 1.3rem',
              borderRadius: '9999px',
              fontSize: '0.9rem',
              fontWeight: '700',
              background: activeCategory === 'web' ? '#2563eb' : '#ffffff',
              border: activeCategory === 'web' ? '1px solid #2563eb' : '1px solid #e2e8f0',
              color: activeCategory === 'web' ? '#ffffff' : '#64748b',
              boxShadow: 'var(--shadow-sm)',
              cursor: 'pointer'
            }}
          >
            Web App Development
          </button>
          <button
            onClick={() => setActiveCategory('mobile')}
            style={{
              padding: '0.6rem 1.3rem',
              borderRadius: '9999px',
              fontSize: '0.9rem',
              fontWeight: '700',
              background: activeCategory === 'mobile' ? '#2563eb' : '#ffffff',
              border: activeCategory === 'mobile' ? '1px solid #2563eb' : '1px solid #e2e8f0',
              color: activeCategory === 'mobile' ? '#ffffff' : '#64748b',
              boxShadow: 'var(--shadow-sm)',
              cursor: 'pointer'
            }}
          >
            Mobile App Development
          </button>
          <button
            onClick={() => setActiveCategory('ai')}
            style={{
              padding: '0.6rem 1.3rem',
              borderRadius: '9999px',
              fontSize: '0.9rem',
              fontWeight: '700',
              background: activeCategory === 'ai' ? '#2563eb' : '#ffffff',
              border: activeCategory === 'ai' ? '1px solid #2563eb' : '1px solid #e2e8f0',
              color: activeCategory === 'ai' ? '#ffffff' : '#64748b',
              boxShadow: 'var(--shadow-sm)',
              cursor: 'pointer'
            }}
          >
            AI Chatbot Integration
          </button>
        </div>

        {/* Services Showcase Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {filteredServices.map((service) => (
            <div 
              key={service.id} 
              className="corporate-card" 
              style={{
                padding: '2.5rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '2.5rem',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '2rem' }}>{service.icon}</span>
                  <span className="badge badge-blue" style={{ fontSize: '0.8rem' }}>{service.badge}</span>
                </div>

                <h3 style={{ fontSize: '1.8rem', color: '#0b0f19', marginBottom: '0.5rem', fontWeight: '800' }}>
                  {service.title}
                </h3>

                <p style={{ color: '#2563eb', fontWeight: '700', fontSize: '1rem', marginBottom: '1.25rem' }}>
                  {service.tagline}
                </p>

                <p style={{ color: '#64748b', fontSize: '0.98rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                  {service.description}
                </p>

                {/* Tech Stack Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.5rem' }}>
                  {service.techStack.map((tech, i) => (
                    <span 
                      key={i} 
                      style={{
                        fontSize: '0.8rem',
                        background: '#f1f5f9',
                        border: '1px solid #cbd5e1',
                        padding: '0.3rem 0.75rem',
                        borderRadius: '6px',
                        color: '#0b0f19',
                        fontWeight: '700'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Deliverables List Box & Call to Action */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '1.75rem'
              }}>
                <h4 style={{ fontSize: '1.05rem', color: '#0b0f19', marginBottom: '1rem', fontWeight: '800' }}>
                  ⚡ Key Deliverables Included:
                </h4>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem', fontSize: '0.92rem', color: '#334155' }}>
                  {service.deliverables.map((item, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                      <span style={{ color: '#10b981', fontWeight: '800' }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => openInquiryModal(service.title)}
                  className="btn-coral"
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    width: '100%',
                    padding: '0.85rem 1.25rem',
                    fontSize: '0.95rem',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  Inquire for {service.title}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Face-to-Face & Virtual Project Discovery Engagement Framework */}
        <div style={{
          marginTop: '5rem',
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '24px',
          padding: '3.5rem 2.5rem',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 3rem auto' }}>
            <span className="badge badge-blue" style={{ marginBottom: '0.65rem' }}>How We Deliver Excellence</span>
            <h3 style={{ fontSize: '2.2rem', color: '#0b0f19', fontWeight: '800', lineHeight: '1.25' }}>
              Our 4-Step Client Engagement Process
            </h3>
            <p style={{ color: '#64748b', fontSize: '1.05rem', marginTop: '0.5rem', lineHeight: '1.6' }}>
              Every serious project is unique. We believe in direct, face-to-face consultation to understand your exact business workflow before writing a single line of code.
            </p>
          </div>

          {/* 4 Process Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.75rem',
            marginBottom: '3.5rem'
          }}>
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '1.75rem'
            }}>
              <span style={{ fontSize: '0.82rem', fontWeight: '800', color: '#2563eb', background: '#eff6ff', border: '1px solid #dbeafe', padding: '0.25rem 0.65rem', borderRadius: '6px', display: 'inline-block', marginBottom: '1rem' }}>
                STEP 01
              </span>
              <h4 style={{ fontSize: '1.15rem', color: '#0b0f19', fontWeight: '700', marginBottom: '0.6rem' }}>
                1-on-1 Discovery Meeting
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: '1.55', margin: 0 }}>
                We meet in-person at our Balkumari headquarters or via Google Meet / Zoom to understand your exact business model, target audience, and feature goals.
              </p>
            </div>

            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '1.75rem'
            }}>
              <span style={{ fontSize: '0.82rem', fontWeight: '800', color: '#2563eb', background: '#eff6ff', border: '1px solid #dbeafe', padding: '0.25rem 0.65rem', borderRadius: '6px', display: 'inline-block', marginBottom: '1rem' }}>
                STEP 02
              </span>
              <h4 style={{ fontSize: '1.15rem', color: '#0b0f19', fontWeight: '700', marginBottom: '0.6rem' }}>
                Tailored Scope Blueprint
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: '1.55', margin: 0 }}>
                Our leadership team drafts a comprehensive technical architecture, UI wireframe roadmap, transparent budget milestones, and realistic delivery schedule.
              </p>
            </div>

            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '1.75rem'
            }}>
              <span style={{ fontSize: '0.82rem', fontWeight: '800', color: '#2563eb', background: '#eff6ff', border: '1px solid #dbeafe', padding: '0.25rem 0.65rem', borderRadius: '6px', display: 'inline-block', marginBottom: '1rem' }}>
                STEP 03
              </span>
              <h4 style={{ fontSize: '1.15rem', color: '#0b0f19', fontWeight: '700', marginBottom: '0.6rem' }}>
                Agile Sprints & Live Demos
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: '1.55', margin: 0 }}>
                You get live staging previews and sprint updates with our engineering team, allowing your direct feedback to shape the product iteratively.
              </p>
            </div>

            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '1.75rem'
            }}>
              <span style={{ fontSize: '0.82rem', fontWeight: '800', color: '#2563eb', background: '#eff6ff', border: '1px solid #dbeafe', padding: '0.25rem 0.65rem', borderRadius: '6px', display: 'inline-block', marginBottom: '1rem' }}>
                STEP 04
              </span>
              <h4 style={{ fontSize: '1.15rem', color: '#0b0f19', fontWeight: '700', marginBottom: '0.6rem' }}>
                Launch, Training & Warranty
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: '1.55', margin: 0 }}>
                We deploy your system to cloud servers, transfer 100% full source code ownership, train your internal staff, and provide 30-day dedicated post-launch support.
              </p>
            </div>
          </div>

          {/* Direct Face-to-Face Meeting Booking Card */}
          <div style={{
            background: 'linear-gradient(135deg, #0b0f19 0%, #1e293b 100%)',
            borderRadius: '20px',
            padding: '3rem',
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <span className="badge badge-coral" style={{ marginBottom: '1rem' }}>Direct Leadership Consultation</span>
            <h3 style={{ fontSize: '2rem', fontWeight: '800', color: '#ffffff', marginBottom: '0.85rem' }}>
              Schedule a Face-to-Face Project Discussion
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '1.05rem', maxWidth: '680px', margin: '0 auto 2rem auto', lineHeight: '1.6' }}>
              Visit our office in Balkumari, Kathmandu, or book an interactive video session with Founder Abhishek Sah & our technical team to discuss your project requirements.
            </p>

            <div style={{
              display: 'flex',
              gap: '1.5rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginBottom: '2rem',
              fontSize: '0.9rem',
              color: '#94a3b8'
            }}>
              <div>
                <strong style={{ color: '#ffffff' }}>Office Location:</strong> Balkumari, Ring Road, Kathmandu
              </div>
              <div>
                <strong style={{ color: '#ffffff' }}>Virtual Meeting:</strong> Google Meet / Zoom / WhatsApp
              </div>
              <div>
                <strong style={{ color: '#ffffff' }}>Helpline:</strong> +977 9826031419
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a
                href="https://wa.me/9779826031419?text=Hello%20Velora%20Global%20Team%2C%20I%20would%20like%20to%20schedule%20a%20face-to-face%20meeting%20to%20discuss%20a%20custom%20software%20project."
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '0.85rem 1.75rem',
                  fontSize: '0.95rem',
                  fontWeight: '700',
                  background: '#25D366',
                  color: '#ffffff',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  textDecoration: 'none',
                  borderRadius: '10px',
                  boxShadow: '0 4px 14px rgba(37, 211, 102, 0.35)'
                }}
              >
                Schedule via WhatsApp (+977 9826031419)
              </a>

              <button
                onClick={() => openInquiryModal('Direct Face-to-Face Project Discussion')}
                className="btn-coral"
                style={{ padding: '0.85rem 1.75rem', fontSize: '0.95rem', fontWeight: '700', borderRadius: '10px' }}
              >
                Request In-Person Consultation
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Dedicated Client Project Inquiry Modal */}
      {showClientModal && (
        <ClientInquiryModal 
          defaultService={targetServiceTitle}
          currentUser={currentUser}
          onClose={() => setShowClientModal(false)}
        />
      )}
    </section>
  );
}



