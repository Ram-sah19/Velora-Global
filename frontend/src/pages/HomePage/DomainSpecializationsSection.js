import React, { useState } from 'react';

export default function DomainSpecializationsSection({ onExploreClick, onTrainingClick }) {
  const [selectedDomainIndex, setSelectedDomainIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('eng');

  const categories = [
    { id: 'eng', label: 'Software Development', color: '#2563eb', bg: '#eff6ff' },
    { id: 'ai', label: 'AI & Data Science', color: '#059669', bg: '#ecfdf5' },
    { id: 'ops', label: 'Cloud, Security & QA', color: '#7c3aed', bg: '#f5f3ff' },
    { id: 'design', label: 'Product & Design', color: '#e11d48', bg: '#fff1f2' }
  ];

  const domains = [
    {
      num: "01",
      categoryKey: "eng",
      title: "Frontend Development",
      category: "Web Engineering",
      color: "#2563eb",
      trainingFee: "NPR 3,000",
      tech: ["React.js", "JavaScript ES6+", "HTML5 & CSS3", "TailwindCSS"],
      fee: "NPR 199 (Internship) / NPR 3,000 (Training)",
      duration: "6 Weeks",
      deliverables: ["Responsive UI Component Library", "Lighthouse Performance Optimization", "State Management Architecture"],
      description: "Construct high-performance, accessible web interfaces utilizing component-driven React architecture and modern design systems."
    },
    {
      num: "02",
      categoryKey: "eng",
      title: "Backend Development",
      category: "System Architecture",
      color: "#2563eb",
      trainingFee: "NPR 4,000",
      tech: ["Node.js", "Express.js", "MongoDB Atlas", "RESTful APIs", "JWT Authentication"],
      fee: "NPR 199 (Internship) / NPR 4,000 (Training)",
      duration: "8 Weeks",
      deliverables: ["Microservice REST Endpoints", "Database CRUD & Indexing", "Secure HttpOnly Cookie Authentication"],
      description: "Engineer scalable backend APIs, optimized database schemas, server middleware, and robust session security."
    },
    {
      num: "03",
      categoryKey: "eng",
      title: "Full Stack MERN Development",
      category: "Full Lifecycle",
      color: "#2563eb",
      trainingFee: "NPR 10,000",
      tech: ["React.js", "Node.js", "Express", "MongoDB", "MVC Architecture"],
      fee: "NPR 199 (Internship) / NPR 10,000 (Training)",
      duration: "8 Weeks",
      deliverables: ["1 Batch Students Trained & Projects Shipped to Clients", "End-to-End MERN Application & Full Stack MVC", "Production Web Bundle & DB Integration"],
      description: "End-to-end full-stack web engineering integrating dynamic frontend interfaces with scalable backend API services and database persistence."
    },
    {
      num: "04",
      categoryKey: "eng",
      title: "Mobile App Engineering",
      category: "Cross-Platform",
      color: "#2563eb",
      trainingFee: "NPR 4,000",
      tech: ["React Native", "Flutter", "iOS & Android UI", "REST APIs"],
      fee: "NPR 199 (Internship) / NPR 4,000 (Training)",
      duration: "8 Weeks",
      deliverables: ["Cross-Platform Mobile App", "Push Notification Architecture", "Local Storage & Offline Sync"],
      description: "Build performant mobile apps for Android and iOS featuring state management, push alerts, and mobile backend integration."
    },
    {
      num: "05",
      categoryKey: "ai",
      title: "AI & Machine Learning",
      category: "Intelligent Systems",
      color: "#059669",
      trainingFee: "NPR 12,000",
      tech: ["Python", "PyTorch", "TensorFlow", "Scikit-Learn", "Model Deployment"],
      fee: "NPR 199 (Internship) / NPR 12,000 (Training)",
      duration: "8 Weeks",
      deliverables: ["Predictive ML Classification Model", "NLP Pipeline", "AI Model Inference API"],
      description: "Develop predictive machine learning models, statistical natural language pipelines, and containerized model inference endpoints."
    },
    {
      num: "06",
      categoryKey: "ai",
      title: "Data Science & Business Analytics",
      category: "Analytics & Insights",
      color: "#059669",
      trainingFee: "NPR 4,000",
      tech: ["Python", "Pandas & NumPy", "SQL", "Data Visualization", "PowerBI"],
      fee: "NPR 199 (Internship) / NPR 4,000 (Training)",
      duration: "8 Weeks",
      deliverables: ["Exploratory Data Analysis Report", "Predictive Trend Analysis", "Interactive Business Dashboard"],
      description: "Analyze complex structured datasets, perform statistical modeling, and generate data-driven decision visualizations."
    },
    {
      num: "07",
      categoryKey: "ops",
      title: "Cybersecurity & Systems Auditing",
      category: "Security Auditing",
      color: "#7c3aed",
      trainingFee: "NPR 4,000",
      tech: ["Network Security", "Vulnerability Scanning", "OWASP Top 10", "Linux Security"],
      fee: "NPR 199 (Internship) / NPR 4,000 (Training)",
      duration: "6 Weeks",
      deliverables: ["Web Application Vulnerability Audit", "Security Remediation Plan", "API Encryption Validation"],
      description: "Identify system vulnerabilities, conduct security audits, enforce authentication protocols, and protect web infrastructure."
    },
    {
      num: "08",
      categoryKey: "design",
      title: "UI/UX & Product Design",
      category: "Product Experience",
      color: "#e11d48",
      trainingFee: "NPR 3,000",
      tech: ["Figma", "User Journey Mapping", "Design Systems", "Interactive Prototyping"],
      fee: "NPR 199 (Internship) / NPR 3,000 (Training)",
      duration: "6 Weeks",
      deliverables: ["Multi-Device UI Design System", "Interactive Figma Prototype", "User Experience Audit"],
      description: "Design user journeys, accessible interface components, wireframes, and production-ready interactive Figma prototypes."
    },
    {
      num: "09",
      categoryKey: "ops",
      title: "Cloud Engineering & DevOps",
      category: "Infrastructure & CI/CD",
      color: "#7c3aed",
      trainingFee: "NPR 4,000",
      tech: ["Docker", "GitHub Actions", "AWS / Cloud Basics", "Linux Administration", "CI/CD"],
      fee: "NPR 199 (Internship) / NPR 4,000 (Training)",
      duration: "8 Weeks",
      deliverables: ["Docker Container Automation", "CI/CD GitHub Actions Pipeline", "Cloud Deployment Architecture"],
      description: "Automate containerized build workflows, configure deployment pipelines, and maintain cloud hosting environments."
    },
    {
      num: "10",
      categoryKey: "ops",
      title: "Software Quality Assurance & Testing",
      category: "Quality Assurance",
      color: "#7c3aed",
      trainingFee: "NPR 3,000",
      tech: ["Jest", "Cypress / Selenium", "Manual Testing", "Bug Tracking", "QA Test Plans"],
      fee: "NPR 199 (Internship) / NPR 3,000 (Training)",
      duration: "6 Weeks",
      deliverables: ["Comprehensive Unit Test Suite", "Automated E2E Integration Tests", "QA Defect Log & Audit"],
      description: "Ensure software reliability through automated test suites, end-to-end user flow testing, and structured QA bug tracking."
    }
  ];

  const filteredDomains = domains.filter(d => d.categoryKey === activeCategory);
  const activeSpotlight = filteredDomains[selectedDomainIndex] || filteredDomains[0] || domains[0];

  return (
    <section className="domain-specializations-section" style={{ position: 'relative', zIndex: 5, paddingTop: '4rem', paddingBottom: '5rem' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem auto' }}>
          <span style={{
            fontSize: '0.8rem',
            color: '#2563eb',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            background: '#eff6ff',
            padding: '0.4rem 1.1rem',
            borderRadius: '9999px',
            border: '1px solid #dbeafe',
            display: 'inline-block',
            marginBottom: '0.85rem'
          }}>
            DOMAIN SPECIALIZATIONS
          </span>

          <h2 style={{ fontSize: '2.6rem', color: '#0b0f19', fontWeight: '800', margin: '0 0 0.65rem 0', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
            What We Do
          </h2>

          <p style={{ color: '#64748b', fontSize: '1.05rem', margin: '0 auto', maxWidth: '640px', lineHeight: '1.6' }}>
            Select a domain category below to explore curriculum deliverables, tech stacks, and career outcomes.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="horizontal-scroll-mobile" style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.85rem',
          marginBottom: '2.75rem',
          paddingBottom: '0.5rem',
          width: '100%'
        }}>
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSelectedDomainIndex(0);
                }}
                style={{
                  padding: '0.7rem 1.6rem',
                  borderRadius: '9999px',
                  fontSize: '0.92rem',
                  fontWeight: isActive ? '700' : '600',
                  background: isActive ? '#0b0f19' : '#ffffff',
                  color: isActive ? '#ffffff' : '#475569',
                  border: isActive ? '1px solid #0b0f19' : '1px solid #e2e8f0',
                  boxShadow: isActive ? '0 4px 14px rgba(11, 15, 25, 0.15)' : 'none',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.target.style.background = '#f8fafc';
                    e.target.style.borderColor = '#cbd5e1';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.target.style.background = '#ffffff';
                    e.target.style.borderColor = '#e2e8f0';
                  }
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Dual Column Spotlight Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          alignItems: 'stretch'
        }}>
          
          {/* Left Domain List Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {filteredDomains.map((dom, idx) => {
              const isSelected = activeSpotlight.title === dom.title;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedDomainIndex(idx)}
                  style={{
                    padding: '1.25rem 1.5rem',
                    background: isSelected ? 'rgba(239, 246, 255, 0.92)' : 'rgba(255, 255, 255, 0.78)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: isSelected ? '2px solid #2563eb' : '1px solid rgba(226, 232, 240, 0.8)',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    boxShadow: isSelected ? '0 4px 16px rgba(37, 99, 235, 0.12)' : '0 2px 8px rgba(0, 0, 0, 0.02)',
                    transition: 'all 0.18s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.2rem' }}>
                      <span style={{
                        fontSize: '0.85rem',
                        fontWeight: '800',
                        color: isSelected ? '#2563eb' : '#94a3b8'
                      }}>
                        {dom.num}
                      </span>
                      <h3 style={{
                        fontSize: '1.05rem',
                        fontWeight: '800',
                        color: isSelected ? '#0b0f19' : '#334155',
                        margin: 0
                      }}>
                        {dom.title}
                      </h3>
                    </div>
                    <span style={{ fontSize: '0.82rem', color: '#64748b', marginLeft: '1.6rem', display: 'block' }}>
                      {dom.category}
                    </span>
                  </div>

                  <span style={{
                    fontSize: '1.2rem',
                    color: isSelected ? '#2563eb' : '#cbd5e1',
                    fontWeight: '800'
                  }}>
                    ➔
                  </span>
                </div>
              );
            })}
          </div>

          {/* Right Interactive Detailed Spotlight Card */}
          <div className="corporate-card" style={{
            background: 'rgba(255, 255, 255, 0.82)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.85)',
            borderRadius: '24px',
            padding: '2.5rem',
            boxShadow: '0 12px 35px rgba(10, 37, 64, 0.06)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  background: '#eff6ff',
                  color: '#2563eb',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '9999px',
                  border: '1px solid #dbeafe',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase'
                }}>
                  TRACK {activeSpotlight.num} • {activeSpotlight.category.toUpperCase()}
                </span>
                <span style={{ fontSize: '0.88rem', color: '#2563eb', fontWeight: '700' }}>
                  Training Fee: {activeSpotlight.trainingFee || 'NPR 3,000'}
                </span>
              </div>

              <h3 style={{ fontSize: '1.85rem', color: '#0b0f19', fontWeight: '800', marginBottom: '0.75rem', lineHeight: '1.2' }}>
                {activeSpotlight.title}
              </h3>

              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                {activeSpotlight.description}
              </p>

              {/* Tech Stack */}
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Mastered Technologies & Tools
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                  {(activeSpotlight.tech || []).map((t, i) => (
                    <span key={i} style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      color: '#0b0f19',
                      fontSize: '0.82rem',
                      fontWeight: '700',
                      padding: '0.3rem 0.75rem',
                      borderRadius: '8px'
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Deliverables List */}
              <div style={{ marginBottom: '2rem' }}>
                <span style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Key Student Deliverables & Outcomes
                </span>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {(activeSpotlight.deliverables || []).map((del, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.88rem', color: '#334155' }}>
                      <span style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        background: '#eff6ff',
                        color: '#2563eb',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.72rem',
                        fontWeight: '800'
                      }}>✓</span>
                      {del}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  try { sessionStorage.setItem('velora_hero_unlocked', 'true'); } catch (_) {}
                  document.body.style.overflow = 'unset';
                  if (onExploreClick) onExploreClick();
                }}
                style={{
                  flex: 1,
                  padding: '0.8rem 1.25rem',
                  fontSize: '0.92rem',
                  fontWeight: '700',
                  background: '#2563eb',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'background 0.15s ease'
                }}
                onMouseEnter={(e) => e.target.style.background = '#1d4ed8'}
                onMouseLeave={(e) => e.target.style.background = '#2563eb'}
              >
                Apply for Internship
              </button>
              <button
                onClick={() => {
                  try { sessionStorage.setItem('velora_hero_unlocked', 'true'); } catch (_) {}
                  document.body.style.overflow = 'unset';
                  if (onTrainingClick) onTrainingClick();
                  else if (onExploreClick) onExploreClick();
                }}
                style={{
                  flex: 1,
                  padding: '0.8rem 1.25rem',
                  fontSize: '0.92rem',
                  fontWeight: '700',
                  background: '#ffffff',
                  color: '#0b0f19',
                  border: '1px solid #cbd5e1',
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => { e.target.style.background = '#f8fafc'; e.target.style.borderColor = '#94a3b8'; }}
                onMouseLeave={(e) => { e.target.style.background = '#ffffff'; e.target.style.borderColor = '#cbd5e1'; }}
              >
                View Training Specs
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
