import React, { useState } from 'react';

export default function HeroSection({ onExploreClick }) {
  const [selectedDomainIndex, setSelectedDomainIndex] = useState(0);

  const categories = [
    { id: 'eng', label: 'Software Development' },
    { id: 'ai', label: 'AI & Data Science' },
    { id: 'ops', label: 'Cloud, Security & QA' },
    { id: 'design', label: 'Product & Design' }
  ];

  const [activeCategory, setActiveCategory] = useState('eng');

  const domains = [
    {
      num: "01",
      categoryKey: "eng",
      title: "Frontend Development",
      category: "Web Engineering",
      tech: ["React.js", "JavaScript ES6+", "HTML5 & CSS3", "TailwindCSS"],
      stipend: "NPR 299 (Internship) / NPR 1,200 (Training + Internship)",
      duration: "6 Weeks",
      deliverables: ["Responsive UI Component Library", "Lighthouse Performance Optimization", "State Management Integration"],
      description: "Build high-performance, responsive web interfaces with component-driven architecture and modern design systems."
    },
    {
      num: "02",
      categoryKey: "eng",
      title: "Backend Development",
      category: "System Architecture",
      tech: ["Node.js", "Express.js", "MongoDB Atlas", "RESTful APIs", "JWT"],
      stipend: "NPR 299 (Internship) / NPR 1,200 (Training + Internship)",
      duration: "8 Weeks",
      deliverables: ["Microservice REST Endpoints", "Database CRUD Operations", "Secure JWT Authentication"],
      description: "Design scalable backend APIs, database schemas, serverless logic, and secure authentication protocols."
    },
    {
      num: "03",
      categoryKey: "eng",
      title: "Full Stack Development",
      category: "Full Lifecycle",
      tech: ["React.js", "Node.js", "Express", "MongoDB", "MVC Architecture"],
      stipend: "NPR 299 (Internship) / NPR 1,200 (Training + Internship)",
      duration: "8 Weeks",
      deliverables: ["10+ Students Trained & Projects Shipped to Clients", "End-to-End MERN Application & Full Stack MVC", "Production Web Bundle & DB Integration"],
      description: "End-to-end web engineering integrating responsive client applications with robust server endpoints and database layers."
    },
    {
      num: "04",
      categoryKey: "eng",
      title: "Mobile App Development",
      category: "Cross-Platform",
      tech: ["React Native", "Flutter", "iOS & Android UI", "REST APIs"],
      stipend: "NPR 299 (Internship) / NPR 1,200 (Training + Internship)",
      duration: "8 Weeks",
      deliverables: ["Cross-Platform Mobile App", "Push Notification Setup", "Mobile Storage Sync"],
      description: "Create fluid, native-feel mobile applications for iOS and Android with real-time state management and mobile API integration."
    },
    {
      num: "05",
      categoryKey: "ai",
      title: "Artificial Intelligence & Machine Learning",
      category: "Intelligent Systems",
      tech: ["Python", "PyTorch", "TensorFlow", "Scikit-Learn", "Model Deployment"],
      stipend: "NPR 299 (Internship) / NPR 1,200 (Training + Internship)",
      duration: "8 Weeks",
      deliverables: ["Predictive ML Classification Model", "NLP Sentiment Pipeline", "AI Model Inference API"],
      description: "Develop predictive machine learning models, natural language processing pipelines, and production AI inference APIs."
    },
    {
      num: "06",
      categoryKey: "ai",
      title: "Data Science",
      category: "Analytics & Insights",
      tech: ["Python", "Pandas & NumPy", "SQL", "Data Visualization", "PowerBI"],
      stipend: "NPR 299 (Internship) / NPR 1,200 (Training + Internship)",
      duration: "8 Weeks",
      deliverables: ["Exploratory Data Analysis Report", "Predictive Business Model", "Interactive Dashboard"],
      description: "Transform raw complex datasets into actionable business intelligence through statistical analysis and exploratory models."
    },
    {
      num: "07",
      categoryKey: "ops",
      title: "Cybersecurity",
      category: "Security Auditing",
      tech: ["Network Security", "Ethical Hacking", "Vulnerability Scanning", "Linux"],
      stipend: "NPR 299 (Internship) / NPR 1,200 (Training + Internship)",
      duration: "6 Weeks",
      deliverables: ["Web Application Vulnerability Audit", "Security Patch Documentation", "Encryption Setup"],
      description: "Identify system vulnerabilities, conduct security audits, enforce encryption standards, and fortify application infrastructure."
    },
    {
      num: "08",
      categoryKey: "design",
      title: "UI/UX Design",
      category: "Product Experience",
      tech: ["Figma", "User Journey Mapping", "Design Systems", "Prototyping"],
      stipend: "NPR 299 (Internship) / NPR 1,200 (Training + Internship)",
      duration: "6 Weeks",
      deliverables: ["Multi-Device UI Design System", "Interactive Figma Prototype", "User Journey Audit"],
      description: "Craft intuitive user experiences, wireframes, accessible component libraries, and interactive high-fidelity prototypes."
    },
    {
      num: "09",
      categoryKey: "ops",
      title: "Cloud & DevOps",
      category: "Infrastructure & CI/CD",
      tech: ["Docker", "Kubernetes Basics", "AWS / GCP", "CI/CD Pipelines", "Linux"],
      stipend: "NPR 299 (Internship) / NPR 1,200 (Training + Internship)",
      duration: "8 Weeks",
      deliverables: ["Docker Container Build Automation", "CI/CD GitHub Actions Pipeline", "Cloud Deployment Setup"],
      description: "Automate containerized build pipelines, configure cloud infrastructure, and maintain continuous delivery operations."
    },
    {
      num: "10",
      categoryKey: "ops",
      title: "Software Testing",
      category: "Quality Assurance",
      tech: ["Jest", "Cypress / Selenium", "Manual Testing", "Bug Tracking", "QA Test Plans"],
      stipend: "NPR 299 (Internship) / NPR 1,200 (Training + Internship)",
      duration: "6 Weeks",
      deliverables: ["Comprehensive Unit Test Suite", "Automated E2E Integration Tests", "QA Bug Report Log"],
      description: "Validate code quality through unit testing, integration suites, automated end-to-end tests, and comprehensive QA reporting."
    }
  ];

  const filteredDomains = domains.filter(d => d.categoryKey === activeCategory);
  const activeSpotlight = filteredDomains[selectedDomainIndex] || filteredDomains[0] || domains[0];

  return (
    <section style={{ padding: '4rem 0 2rem 0' }}>
      <div className="container">
        
        {/* Top Hero Split Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '3rem',
          alignItems: 'center',
          marginBottom: '4rem'
        }}>
          
          {/* Left Hero Text Column */}
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <span className="badge badge-coral" style={{ padding: '0.4rem 1.25rem', fontSize: '0.85rem' }}>
                Official Career Gateway by Velora Global
              </span>
            </div>

            <h1 style={{
              fontSize: '3.4rem',
              lineHeight: '1.15',
              fontWeight: '800',
              color: '#0b0f19',
              marginBottom: '1.25rem'
            }}>
              Delivering Opportunities with <br />
              <span className="text-coral">Purpose & Precision</span>
            </h1>

            <p style={{
              fontSize: '1.15rem',
              color: '#64748b',
              marginBottom: '2.25rem',
              maxWidth: '540px',
              lineHeight: '1.6'
            }}>
              Connecting ambitious students with real-world learning opportunities, verified domain projects, and official industry certifications.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button onClick={onExploreClick} className="btn-primary" style={{ padding: '0.85rem 1.8rem', fontSize: '1rem' }}>
                Explore Internships
              </button>
            </div>
          </div>

          {/* Right Hero Graphic / Arch Portrait Container */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              position: 'relative',
              width: '380px',
              height: '420px',
              borderRadius: '200px 200px 24px 24px',
              background: 'linear-gradient(180deg, #dbeafe 0%, #2563eb 100%)',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-lg)',
              overflow: 'hidden'
            }}>
              {/* Leader Image */}
              <img 
                src="/media/rambilas_sah.jpg" 
                alt="Rambilas Sah - Founder & CEO"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/rambilas_sah.jpg";
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />

              {/* Floating Badge */}
              <div className="corporate-card" style={{
                position: 'absolute',
                bottom: '1.5rem',
                left: '1.5rem',
                right: '1.5rem',
                padding: '0.85rem 1.25rem',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <h4 style={{ fontSize: '0.95rem', color: '#0b0f19' }}>Rambilas Sah</h4>
                  <span style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: '700' }}>Founder & CEO • Velora Global</span>
                </div>
                <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>Co-Founded with Puja & Rohit</span>
              </div>
            </div>
          </div>

        </div>

        {/* Enterprise Metrics Strip */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '5rem',
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <span style={{ fontSize: '2rem', fontWeight: '800', color: '#0b0f19', display: 'block', lineHeight: '1' }}>10+</span>
            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600' }}>Specialized Domain Tracks</span>
          </div>
          <div>
            <span style={{ fontSize: '2rem', fontWeight: '800', color: '#2563eb', display: 'block', lineHeight: '1' }}>100%</span>
            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600' }}>Official QR Verified Credentials</span>
          </div>
          <div>
            <span style={{ fontSize: '2rem', fontWeight: '800', color: '#ff6b6b', display: 'block', lineHeight: '1' }}>3</span>
            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600' }}>Founding Executive Mentors</span>
          </div>
          <div>
            <span style={{ fontSize: '2rem', fontWeight: '800', color: '#10b981', display: 'block', lineHeight: '1' }}>10+</span>
            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600' }}>Students Trained & Projects Shipped to Clients (MERN Stack MVC)</span>
          </div>
        </div>

        {/* State-of-the-Art Interactive Domain Navigator */}
        <div style={{ marginBottom: '6rem' }}>
          
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
            <span style={{
              fontSize: '0.82rem',
              color: '#2563eb',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              background: '#eff6ff',
              padding: '0.35rem 1rem',
              borderRadius: '9999px',
              border: '1px solid #dbeafe',
              display: 'inline-block',
              marginBottom: '0.75rem'
            }}>
              Domain Specializations
            </span>
            <h2 style={{ fontSize: '2.5rem', color: '#0b0f19', marginTop: '0.3rem', fontWeight: '800', lineHeight: '1.2' }}>
              What We Do
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem', marginTop: '0.5rem' }}>
              Select a domain category below to explore curriculum deliverables, tech stacks, and career outcomes.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div style={{
            display: 'flex',
            justify: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
            marginBottom: '2.5rem'
          }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSelectedDomainIndex(0);
                }}
                style={{
                  padding: '0.65rem 1.4rem',
                  borderRadius: '9999px',
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  background: activeCategory === cat.id ? '#0b0f19' : '#ffffff',
                  color: activeCategory === cat.id ? '#ffffff' : '#64748b',
                  border: activeCategory === cat.id ? '1px solid #0b0f19' : '1px solid #cbd5e1',
                  boxShadow: activeCategory === cat.id ? 'var(--shadow-md)' : 'none'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Interactive Showcase Hub Split Canvas */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(280px, 1fr) minmax(360px, 1.6fr)',
            gap: '2rem',
            alignItems: 'stretch'
          }}>
            
            {/* Left Domain List Selector */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem'
            }}>
              {filteredDomains.map((dom, idx) => (
                <div
                  key={dom.num}
                  onClick={() => setSelectedDomainIndex(idx)}
                  style={{
                    padding: '1.25rem 1.5rem',
                    borderRadius: '14px',
                    background: selectedDomainIndex === idx ? '#ffffff' : '#f8fafc',
                    border: selectedDomainIndex === idx ? '2px solid #2563eb' : '1px solid #e2e8f0',
                    boxShadow: selectedDomainIndex === idx ? '0 10px 25px rgba(37, 99, 235, 0.12)' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{
                      fontSize: '0.85rem',
                      fontWeight: '800',
                      color: selectedDomainIndex === idx ? '#2563eb' : '#94a3b8',
                      fontFamily: 'monospace'
                    }}>
                      {dom.num}
                    </span>
                    <div>
                      <h4 style={{
                        fontSize: '1.05rem',
                        color: selectedDomainIndex === idx ? '#0b0f19' : '#475569',
                        fontWeight: '700',
                        marginBottom: '0.15rem'
                      }}>
                        {dom.title}
                      </h4>
                      <span style={{ fontSize: '0.78rem', color: '#64748b' }}>{dom.category}</span>
                    </div>
                  </div>
                  <span style={{
                    fontSize: '1.1rem',
                    color: selectedDomainIndex === idx ? '#2563eb' : '#cbd5e1',
                    fontWeight: '800'
                  }}>
                    →
                  </span>
                </div>
              ))}
            </div>

            {/* Right Active Domain Spotlight Card */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '20px',
              padding: '2.75rem',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Blue Ambient Glow Accent */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '180px',
                height: '180px',
                background: 'radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, rgba(255,255,255,0) 70%)',
                pointerEvents: 'none'
              }} />

              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <span style={{
                    background: '#eff6ff',
                    color: '#2563eb',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: '800',
                    letterSpacing: '0.04em'
                  }}>
                    TRACK {activeSpotlight.num} • {activeSpotlight.category.toUpperCase()}
                  </span>

                  <span style={{ fontSize: '0.85rem', color: '#059669', fontWeight: '700' }}>
                    Duration: {activeSpotlight.duration}
                  </span>
                </div>

                <h3 style={{ fontSize: '2rem', color: '#0b0f19', fontWeight: '800', marginBottom: '1rem', lineHeight: '1.2' }}>
                  {activeSpotlight.title}
                </h3>

                <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '1.75rem' }}>
                  {activeSpotlight.description}
                </p>

                {/* Tech Stack Pills */}
                <div style={{ marginBottom: '1.75rem' }}>
                  <span style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.65rem' }}>
                    Mastered Technologies & Frameworks
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {activeSpotlight.tech.map((t, i) => (
                      <span key={i} style={{
                        background: '#f1f5f9',
                        border: '1px solid #cbd5e1',
                        color: '#0b0f19',
                        fontSize: '0.82rem',
                        fontWeight: '700',
                        padding: '0.3rem 0.75rem',
                        borderRadius: '6px'
                      }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Deliverables List */}
                <div style={{ marginBottom: '2rem' }}>
                  <span style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.65rem' }}>
                    Key Student Deliverables & Outcomes
                  </span>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {activeSpotlight.deliverables.map((del, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.92rem', color: '#334155' }}>
                        <span style={{ color: '#2563eb', fontWeight: '800' }}>✓</span> {del}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div style={{
                borderTop: '1px solid #f1f5f9',
                paddingTop: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748b' }}>Program Fee & Options</span>
                  <span style={{ fontSize: '1.05rem', fontWeight: '800', color: '#059669' }}>
                    NPR 199 <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>(2 Wks)</span> • NPR 299 <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>(1 Mon)</span> • NPR 1,200 <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>(Training)</span>
                  </span>
                </div>

                <button
                  onClick={onExploreClick}
                  className="btn-coral"
                  style={{ padding: '0.75rem 1.6rem', fontSize: '0.95rem' }}
                >
                  Explore & Apply for this Domain ➔
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* Dark Executive Callout Banner (Midnight #0B0F19) */}
        <div style={{
          background: '#0b0f19',
          borderRadius: '24px',
          padding: '3.5rem',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '2rem',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ maxWidth: '650px' }}>
            <span style={{ fontSize: '0.8rem', color: '#ff6b6b', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Velora Global Career Accelerator
            </span>
            <h3 style={{ fontSize: '2.2rem', color: 'white', marginTop: '0.4rem', marginBottom: '0.75rem', fontWeight: '800' }}>
              Let's work together on your next career milestone.
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: '1.6' }}>
              Gain practical industry exposure, verified credentials, and continuous mentorship from Rambilas Sah, Puja Rouniyar, and Rohit Sah.
            </p>
          </div>

          <button onClick={onExploreClick} className="btn-coral" style={{ padding: '1rem 2.5rem', fontSize: '1.05rem' }}>
            Get In Touch
          </button>
        </div>

      </div>
    </section>
  );
}
