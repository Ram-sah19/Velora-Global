import React, { useState, useRef, useCallback } from 'react';
import ClientInquiryModal from '../../components/ClientInquiryModal';

export default function ServicesPage({ selectedCategory = 'all', currentUser, onOpenClientAuth }) {
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
      title: 'AI Chatbot Integration in Web Apps',
      tagline: 'Intelligent Conversational Agents, Custom LLM Bots & Customer Support Automation for Web Platforms',
      icon: '',
      deliverables: [
        'Custom Conversational AI & Customer Support Bots',
        'LLM & OpenAI / Gemini API Custom Tuning',
        'Automated Lead Qualification & CRM Sync',
        'Predictive Analytics & Natural Language Processing'
      ],
      techStack: ['Python', 'PyTorch / TensorFlow', 'LangChain', 'OpenAI & Gemini APIs', 'Node.js'],
      description: 'Empower your business with cutting-edge artificial intelligence. We build custom conversational AI chatbots, smart customer support agents, and automated workflow pipelines that run 24/7 to boost productivity and conversion rates.'
    }
  ];

  const filteredServices = activeCategory === 'all' 
    ? servicesList 
    : servicesList.filter(s => s.category === activeCategory);

  const openInquiryModal = (serviceTitle) => {
    // If client is not logged in, prompt client signup / login modal first
    if (!currentUser) {
      if (onOpenClientAuth) {
        onOpenClientAuth();
      }
      return;
    }

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

        {/* ── 3D Coverflow: Delivered Client Projects ── */}
        <ProjectCarousel3D openInquiryModal={openInquiryModal} />


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
              Visit our office in Balkumari, Kathmandu, or book an interactive video session with Founder Ram Sah & our technical team to discuss your project requirements.
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

/* ═══════════════════════════════════════════════════════════════════
   3D Coverflow Carousel — CSS perspective + rotateY depth effect
   ═══════════════════════════════════════════════════════════════════ */

const PROJECTS_3D = [
  {
    id: 1,
    label: 'Education & Consultancy',
    labelColor: '#60a5fa',
    title: 'Overseas Education\nConsultancy Platform',
    tagline: 'Automated student inquiries for study abroad in Australia, USA, Canada & UK.',
    deliverables: [
      'Interactive visa eligibility assessment form',
      'University & course discovery directory',
      'Direct WhatsApp lead capture & consultation',
      'Mobile-first SEO ranking architecture',
    ],
    stack: ['React.js', 'Node.js', 'REST API', 'WhatsApp CRM', 'SEO Engine'],
    bg: 'linear-gradient(145deg, #0c1445 0%, #1a2a6c 50%, #1e3a5f 100%)',
    shimmer: '#3b82f6',
    accentColor: '#3b82f6',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{color:'rgba(255,255,255,0.15)'}}>
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
    inquireTitle: 'Education Consultancy Platform Discussion',
  },
  {
    id: 2,
    label: 'Hospitality & Food Tech',
    labelColor: '#fb923c',
    title: 'Restaurant Digital QR\nMenu & Ordering System',
    tagline: 'Contactless zero-install digital menu — scan table QR and browse instantly.',
    deliverables: [
      'Zero-app QR scan for instant menu access',
      'Live food & beverage catalog with search',
      'Dietary tags: Veg / Non-Veg / Spiciness',
      'Admin panel for real-time price updates',
    ],
    stack: ['React 19', 'Mobile-First', 'Cloud Storage', 'QR Generator', 'Admin Panel'],
    bg: 'linear-gradient(145deg, #1c0900 0%, #4a1800 50%, #7c2d12 100%)',
    shimmer: '#f97316',
    accentColor: '#f97316',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{color:'rgba(255,255,255,0.15)'}}>
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    ),
    inquireTitle: 'Restaurant Digital QR Menu System Discussion',
  },
  {
    id: 3,
    label: 'Retail & E-Commerce',
    labelColor: '#c084fc',
    title: 'E-Commerce Brand Store\n& Landing Page',
    tagline: 'Replaced Instagram DMs with an automated product catalog & order system.',
    deliverables: [
      'Visual product showcase with photo gallery',
      'One-click cart & WhatsApp order routing',
      'Payment ready — eSewa / Khalti / COD',
      'Stock toggle & customer review highlights',
    ],
    stack: ['MERN Stack', 'React.js', 'eSewa', 'Khalti', 'MongoDB Atlas'],
    bg: 'linear-gradient(145deg, #0d001a 0%, #1e0338 50%, #2e0657 100%)',
    shimmer: '#a855f7',
    accentColor: '#a855f7',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{color:'rgba(255,255,255,0.15)'}}>
        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      </svg>
    ),
    inquireTitle: 'E-Commerce Brand Store Discussion',
  },
];

function ProjectCarousel3D({ openInquiryModal }) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [dragDelta, setDragDelta] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef(null);
  const lastWheelTime = useRef(0);
  const activeCardRef = useRef(null);
  const total = PROJECTS_3D.length;

  const goTo = useCallback((idx) => {
    if (animating || idx === current || idx < 0 || idx >= total) return;
    setAnimating(true);
    setCurrent(idx);
    setTilt({ x: 0, y: 0 });
    setTimeout(() => setAnimating(false), 700);
  }, [animating, current, total]);

  // Mouse wheel listener for natural up-down scroll flipping
  const handleWheel = (e) => {
    const now = Date.now();
    if (now - lastWheelTime.current < 450) return;
    if (Math.abs(e.deltaY) < 16) return;

    if (e.deltaY > 0) {
      if (current < total - 1) {
        goTo(current + 1);
        lastWheelTime.current = now;
      }
    } else {
      if (current > 0) {
        goTo(current - 1);
        lastWheelTime.current = now;
      }
    }
  };

  // Mouse tilt on active card
  const handleMouseMove = (e) => {
    if (!activeCardRef.current || isDragging) return;
    const rect = activeCardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -9, y: dx * 10 });
  };
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  // Vertical Drag/Swipe
  const onDragStart = (e) => {
    const y = e.clientY ?? e.touches?.[0]?.clientY;
    if (y !== undefined) {
      dragStart.current = y;
      setIsDragging(true);
    }
  };
  const onDragMove = (e) => {
    if (!isDragging || dragStart.current === null) return;
    const y = e.clientY ?? e.touches?.[0]?.clientY;
    if (y !== undefined) {
      setDragDelta(y - dragStart.current);
    }
  };
  const onDragEnd = () => {
    if (dragDelta < -50 && current < total - 1) {
      goTo(current + 1);
    } else if (dragDelta > 50 && current > 0) {
      goTo(current - 1);
    }
    setIsDragging(false);
    setDragDelta(0);
    dragStart.current = null;
  };

  // Vertical 3D perspective geometry
  const getCardStyle = (i) => {
    const offset = i - current;
    const absOffset = Math.abs(offset);

    if (absOffset > 1) return { display: 'none' };

    const rotateX    = offset * 46;                   // 3D tilt up/down
    const translateY = offset * 68;                   // % offset vertically
    const translateZ = absOffset === 0 ? 0 : -240;    // recede in 3D depth
    const scale      = absOffset === 0 ? 1 : 0.82;
    const opacity    = absOffset === 0 ? 1 : 0.42;
    const zIndex     = absOffset === 0 ? 10 : 5;
    const blur       = absOffset === 0 ? 0 : 2;

    const tiltX = absOffset === 0 ? tilt.x + (isDragging ? dragDelta * 0.08 : 0) : 0;
    const tiltY = absOffset === 0 ? tilt.y : 0;

    return {
      position: 'absolute',
      width: '88%',
      maxWidth: '680px',
      height: 'clamp(340px,46vw,440px)',
      left: '50%',
      top: '50%',
      borderRadius: '24px',
      overflow: 'hidden',
      cursor: absOffset === 0 ? 'default' : 'pointer',
      zIndex,
      opacity,
      filter: blur > 0 ? `blur(${blur}px) brightness(0.6)` : 'none',
      transform: `
        translate(-50%, -50%)
        translateY(${translateY}%)
        perspective(1200px)
        rotateX(${rotateX + tiltX}deg)
        rotateY(${tiltY}deg)
        translateZ(${translateZ}px)
        scale(${scale})
      `,
      transition: isDragging ? 'none' : 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.7s ease, filter 0.7s ease',
      boxShadow: absOffset === 0
        ? '0 32px 70px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.1)'
        : '0 16px 36px rgba(0,0,0,0.3)',
      background: PROJECTS_3D[i].bg,
      willChange: 'transform',
    };
  };

  return (
    <div style={{ marginTop: '5rem' }}>
      {/* Section header */}
      <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2.5rem auto' }}>
        <span style={{
          display: 'inline-block', fontSize: '0.7rem', fontWeight: '800',
          letterSpacing: '0.1em', textTransform: 'uppercase', color: '#ef4444',
          background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.22)',
          padding: '0.3rem 0.9rem', borderRadius: '9999px', marginBottom: '0.75rem',
        }}>Proven Track Record</span>
        <h3 style={{
          fontSize: 'clamp(1.65rem,3vw,2.3rem)', color: '#0b0f19',
          fontWeight: '800', lineHeight: '1.2', margin: '0 0 0.55rem 0',
        }}>Delivered Client Projects</h3>
        <p style={{ color: '#64748b', fontSize: '0.97rem', lineHeight: '1.65', margin: 0 }}>
          Scroll your mouse wheel down / up over the stage to flip between delivered client platforms.
        </p>
      </div>

      {/* Stage Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 'clamp(460px,58vw,620px)',
          background: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)',
          borderRadius: '32px',
          overflow: 'hidden',
          userSelect: 'none',
          boxShadow: '0 12px 36px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)',
        }}
        onWheel={handleWheel}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseDown={onDragStart}
        onMouseMoveCapture={onDragMove}
        onMouseUp={onDragEnd}
        onTouchStart={onDragStart}
        onTouchMove={onDragMove}
        onTouchEnd={onDragEnd}
      >
        {/* Ambient colored glow */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${PROJECTS_3D[current].shimmer}22 0%, transparent 70%)`,
          transition: 'background 0.7s ease',
        }} />

        {/* Scroll helper hint pill (top right) */}
        <div style={{
          position: 'absolute', top: '1.25rem', right: '1.25rem', zIndex: 30,
          display: 'flex', alignItems: 'center', gap: '0.45rem',
          background: 'rgba(15,23,42,0.7)', backdropFilter: 'blur(10px)',
          borderRadius: '9999px', padding: '0.4rem 0.9rem',
          fontSize: '0.75rem', color: '#ffffff', fontWeight: '700',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          pointerEvents: 'none',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="7" />
            <line x1="12" y1="6" x2="12" y2="10" />
          </svg>
          Scroll Wheel Up / Down
        </div>

        {/* 3D Vertical Cards Deck */}
        {PROJECTS_3D.map((proj, i) => {
          const offset = i - current;
          if (Math.abs(offset) > 1) return null;
          const isActive = i === current;

          return (
            <div
              key={proj.id}
              ref={isActive ? activeCardRef : null}
              style={getCardStyle(i)}
              onClick={() => !isActive && goTo(i)}
            >
              {/* Mesh texture */}
              <div style={{
                position: 'absolute', inset: 0, zIndex: 0,
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }} />

              {/* Decorative category icon */}
              <div style={{
                position: 'absolute', top: '1.25rem', right: '1.25rem',
                zIndex: 0, transform: 'scale(2.2)', transformOrigin: 'top right', opacity: 0.4,
              }}>
                {proj.icon}
              </div>

              {/* Accent light sphere */}
              <div style={{
                position: 'absolute', top: '-60px', left: '-60px', zIndex: 0,
                width: '240px', height: '240px', borderRadius: '50%',
                background: `radial-gradient(circle, ${proj.accentColor}35 0%, transparent 65%)`,
              }} />

              {/* Bottom dark gradient for text legibility */}
              <div style={{
                position: 'absolute', inset: 0, zIndex: 1,
                background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)',
              }} />

              {/* Top rim shimmer */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '1px', zIndex: 2,
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
              }} />

              {/* Card Main Content */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3,
                padding: 'clamp(1.2rem,2.8vw,2.2rem)',
              }}>
                <span style={{
                  display: 'inline-block', fontSize: '0.65rem', fontWeight: '800',
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: proj.labelColor, background: `${proj.labelColor}20`,
                  border: `1px solid ${proj.labelColor}45`,
                  padding: '0.22rem 0.7rem', borderRadius: '9999px',
                  marginBottom: '0.6rem', backdropFilter: 'blur(6px)',
                }}>{proj.label}</span>

                <h3 style={{
                  fontSize: 'clamp(1.15rem,2.2vw,1.75rem)', color: '#ffffff',
                  fontWeight: '800', lineHeight: '1.2', margin: '0 0 0.4rem 0',
                  whiteSpace: 'pre-line', textShadow: '0 2px 12px rgba(0,0,0,0.5)',
                }}>{proj.title}</h3>

                <p style={{
                  color: 'rgba(255,255,255,0.68)',
                  fontSize: 'clamp(0.75rem,1.2vw,0.88rem)',
                  lineHeight: '1.45', margin: '0 0 0.8rem 0', maxWidth: '480px',
                }}>{proj.tagline}</p>

                {isActive && (
                  <ul style={{ margin: '0 0 0.9rem 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.22rem' }}>
                    {proj.deliverables.map((d, di) => (
                      <li key={di} style={{
                        fontSize: '0.77rem', color: 'rgba(255,255,255,0.65)',
                        display: 'flex', alignItems: 'center', gap: '0.4rem',
                      }}>
                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: proj.accentColor, flexShrink: 0 }} />
                        {d}
                      </li>
                    ))}
                  </ul>
                )}

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: isActive ? '1.1rem' : '0' }}>
                  {proj.stack.map((t, ti) => (
                    <span key={ti} style={{
                      fontSize: '0.67rem', fontWeight: '700', color: '#fff',
                      background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.13)',
                      padding: '0.18rem 0.5rem', borderRadius: '5px', backdropFilter: 'blur(4px)',
                    }}>{t}</span>
                  ))}
                </div>

                {isActive && (
                  <button
                    onClick={(e) => { e.stopPropagation(); openInquiryModal(proj.inquireTitle); }}
                    style={{
                      padding: '0.6rem 1.4rem', fontSize: '0.83rem', fontWeight: '700',
                      background: proj.accentColor, color: '#fff', border: 'none',
                      borderRadius: '9px', cursor: 'pointer',
                      boxShadow: `0 4px 22px ${proj.accentColor}55`,
                      transition: 'opacity 0.18s, transform 0.18s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'scale(1.03)'; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)'; }}
                  >
                    Inquire for Similar Platform
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {/* Vertical Navigation Controls (Right Side) */}
        <div style={{
          position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)',
          zIndex: 25, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem',
        }}>
          {/* Up button */}
          <button
            onClick={() => goTo(current - 1)}
            disabled={current === 0}
            aria-label="Previous project up"
            style={{
              width: '42px', height: '42px', borderRadius: '50%',
              border: '1.5px solid rgba(15,23,42,0.15)', background: current === 0 ? 'rgba(255,255,255,0.4)' : '#ffffff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: current === 0 ? 'not-allowed' : 'pointer',
              opacity: current === 0 ? 0.35 : 1,
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { if (current > 0) e.currentTarget.style.transform = 'scale(1.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0b0f19" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
          </button>

          {/* Vertical Step Dots */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', padding: '0.3rem 0' }}>
            {PROJECTS_3D.map((p, i) => (
              <button
                key={p.id}
                onClick={() => goTo(i)}
                aria-label={`Project ${i + 1}`}
                style={{
                  width: '8px', height: i === current ? '26px' : '8px',
                  borderRadius: '9999px',
                  background: i === current ? PROJECTS_3D[current].accentColor : '#94a3b8',
                  border: 'none', padding: 0, cursor: 'pointer',
                  transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
                  boxShadow: i === current ? `0 0 10px ${PROJECTS_3D[current].accentColor}` : 'none',
                }}
              />
            ))}
          </div>

          {/* Down button */}
          <button
            onClick={() => goTo(current + 1)}
            disabled={current === total - 1}
            aria-label="Next project down"
            style={{
              width: '42px', height: '42px', borderRadius: '50%',
              border: '1.5px solid rgba(15,23,42,0.15)', background: current === total - 1 ? 'rgba(255,255,255,0.4)' : '#ffffff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: current === total - 1 ? 'not-allowed' : 'pointer',
              opacity: current === total - 1 ? 0.35 : 1,
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { if (current < total - 1) e.currentTarget.style.transform = 'scale(1.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0b0f19" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
        </div>
      </div>

      {/* Counter */}
      <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
        <span style={{ color: '#64748b', fontSize: '0.82rem', fontWeight: '700', letterSpacing: '0.05em' }}>
          PROJECT {current + 1} OF {total}
        </span>
      </div>
    </div>
  );
}


