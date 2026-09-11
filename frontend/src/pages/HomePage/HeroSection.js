import React, { useState, useEffect, useRef } from 'react';

export default function HeroSection({ onExploreClick, onTrainingClick, onServicesClick }) {
  const [selectedDomainIndex, setSelectedDomainIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('eng');

  // Premium entrance animation — triggers once on mount
  const [heroReady, setHeroReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 60);
    return () => clearTimeout(t);
  }, []);

  // Staggered reveal helper: returns inline transition styles per element
  const reveal = (delay = 0) => ({
    opacity: heroReady ? 1 : 0,
    transform: heroReady ? 'translateY(0px)' : 'translateY(22px)',
    transition: `opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 0.65s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
    willChange: 'opacity, transform',
  });

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

  // Story Mode: Step-by-Step Controlled Reveal (0: Hero, 1: Line 1, 2: Line 2, 3: Line 3 & Unfrozen)
  const [storyStep, setStoryStep] = useState(0);
  const [isFrozen, setIsFrozen] = useState(true);
  const isTransitioningRef = useRef(false);

  useEffect(() => {
    let touchStartY = 0;

    const handleWheel = (e) => {
      const isAtTop = window.scrollY <= 10;

      // If we are at the top and the user scrolls UP while on step 3, re-freeze and reverse back to step 2!
      if (isAtTop && !isFrozen && storyStep === 3 && e.deltaY < -15) {
        e.preventDefault();
        if (isTransitioningRef.current) return;
        isTransitioningRef.current = true;
        setIsFrozen(true);
        setStoryStep(2);
        setTimeout(() => {
          isTransitioningRef.current = false;
        }, 380);
        return;
      }

      // If we are in story mode at the top
      if (isFrozen && isAtTop) {
        if (Math.abs(e.deltaY) < 14) return;
        e.preventDefault();

        if (isTransitioningRef.current) return;
        isTransitioningRef.current = true;

        if (e.deltaY > 0) {
          // Scrolling down: 0 -> 1 -> 2 -> 3 (unfreeze)
          setStoryStep((prev) => {
            if (prev < 2) {
              return prev + 1;
            } else {
              setIsFrozen(false);
              return 3;
            }
          });
        } else {
          // Scrolling up in reverse: 3 -> 2 -> 1 -> 0
          setStoryStep((prev) => Math.max(0, prev - 1));
        }

        setTimeout(() => {
          isTransitioningRef.current = false;
        }, 380);
      }
    };

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const isAtTop = window.scrollY <= 10;
      const touchEndY = e.touches[0].clientY;
      const diff = touchStartY - touchEndY; // > 0 is scroll down, < 0 is scroll up

      if (isAtTop && !isFrozen && storyStep === 3 && diff < -30) {
        e.preventDefault();
        if (isTransitioningRef.current) return;
        isTransitioningRef.current = true;
        setIsFrozen(true);
        setStoryStep(2);
        setTimeout(() => {
          isTransitioningRef.current = false;
        }, 380);
        return;
      }

      if (isFrozen && isAtTop) {
        if (Math.abs(diff) < 22) return;
        e.preventDefault();

        if (isTransitioningRef.current) return;
        isTransitioningRef.current = true;

        if (diff > 0) {
          setStoryStep((prev) => {
            if (prev < 2) return prev + 1;
            setIsFrozen(false);
            return 3;
          });
        } else {
          setStoryStep((prev) => Math.max(0, prev - 1));
        }

        setTimeout(() => {
          isTransitioningRef.current = false;
        }, 380);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isFrozen, storyStep]);

  const unlockAndExplore = (callback) => {
    setIsFrozen(false);
    setStoryStep(3);
    if (callback) callback();
  };

  // Lock window / body scroll when story is in frozen mode
  useEffect(() => {
    if (isFrozen) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleKeyDown = (e) => {
      if (!isFrozen) return;

      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        if (isTransitioningRef.current) return;
        isTransitioningRef.current = true;
        setStoryStep((prev) => {
          if (prev < 2) return prev + 1;
          setIsFrozen(false);
          return 3;
        });
        setTimeout(() => {
          isTransitioningRef.current = false;
        }, 380);
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        if (isTransitioningRef.current) return;
        isTransitioningRef.current = true;
        setStoryStep((prev) => Math.max(0, prev - 1));
        setTimeout(() => {
          isTransitioningRef.current = false;
        }, 380);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFrozen]);

  return (
    <section style={{
      position: 'relative',
      background: 'transparent',
      padding: 0
    }}>

      {/* ── HERO VIEWPORT STAGE (Exact 100vh so next section cannot bleed in) ── */}
      <div style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0
      }}>

        {/* ── Cinematic Mountain Horizon Hero Background Image ─────────── */}
        <div 
          aria-hidden="true" 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
            backgroundImage: `
              linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 40%, transparent 100%),
              url('/api/media/hero-bg'),
              url('/media/hero_mountain.png'),
              url('/images/hero_mountain.png'),
              url('/media/hero_mountain.jpg')
            `,
            backgroundSize: 'cover',
            backgroundPosition: 'center 22%',
            backgroundRepeat: 'no-repeat',
            pointerEvents: 'none'
          }}
        />

        {/* Glowing Ambient Orbs */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: '-5%', left: '-5%', zIndex: 0, pointerEvents: 'none',
          width: 550, height: 550, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.14) 0%, rgba(37,99,235,0.04) 45%, transparent 70%)',
          filter: 'blur(28px)',
          animation: 'vgOrb1 14s ease-in-out infinite alternate',
        }} />
        <div aria-hidden="true" style={{
          position: 'absolute', top: '-10%', right: '-8%', zIndex: 0, pointerEvents: 'none',
          width: 520, height: 520, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,107,0.16) 0%, rgba(255,107,107,0.03) 48%, transparent 70%)',
          filter: 'blur(30px)',
          animation: 'vgOrb2 17s ease-in-out infinite alternate',
        }} />

        {/* Orb keyframes */}
        <style>{`
          @keyframes vgOrb1 {
            0%   { transform: translate(0px,   0px)   scale(1); }
            50%  { transform: translate(40px,  30px)  scale(1.08); }
            100% { transform: translate(-20px, 50px)  scale(0.95); }
          }
          @keyframes vgOrb2 {
            0%   { transform: translate(0px,   0px)   scale(1); }
            50%  { transform: translate(-35px, 45px)  scale(1.06); }
            100% { transform: translate(25px, -30px)  scale(0.97); }
          }
        `}</style>

        {/* ═════════════════════════════════════════════════════════════ */}
        {/* STEP 0: MAIN HERO SPLIT                                       */}
        {/* ═════════════════════════════════════════════════════════════ */}
        <div style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: storyStep === 0 ? 1 : 0,
          transform: storyStep === 0 ? 'translate3d(0, 0, 0)' : 'translate3d(0, -30px, 0)',
          pointerEvents: storyStep === 0 ? 'auto' : 'none',
          transition: 'opacity 0.45s ease, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: storyStep === 0 ? 5 : 1
        }}>
          <div className="container" style={{ width: '100%' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '3.5rem',
              alignItems: 'center'
            }}>
              
              {/* Left Hero Text Column */}
              <div>
                {/* Badge — delay 0ms */}
                <div style={{ marginBottom: '0.85rem', ...reveal(0) }}>
                  <span style={{
                    fontSize: '0.75rem',
                    color: '#2563eb',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    background: 'rgba(239, 246, 255, 0.90)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    padding: '0.3rem 0.95rem',
                    borderRadius: '9999px',
                    border: '1px solid rgba(219, 234, 254, 0.9)',
                    display: 'inline-block'
                  }}>
                    GLOBAL ENTERPRISE IT & AI SOLUTIONS
                  </span>
                </div>

                {/* H1 — delay 100ms */}
                <h1 style={{
                  fontSize: 'clamp(1.85rem, 3.6vw, 2.75rem)',
                  lineHeight: '1.2',
                  fontWeight: '800',
                  color: '#0a2540',
                  marginBottom: '1rem',
                  letterSpacing: '-0.02em',
                  textShadow: '0 1px 12px rgba(255, 255, 255, 0.6)',
                  ...reveal(100)
                }}>
                  Enterprise Software & AI. <br />
                  <span className="text-coral">Built for Global Scale.</span>
                </h1>

                {/* Subtitle — delay 200ms */}
                <p style={{
                  fontSize: '0.98rem',
                  color: '#1e293b',
                  fontWeight: '500',
                  marginBottom: '1.75rem',
                  maxWidth: '560px',
                  lineHeight: '1.6',
                  textShadow: '0 1px 4px rgba(255, 255, 255, 0.8)',
                  ...reveal(200)
                }}>
                  Delivering production-grade web applications, cross-platform mobile platforms, and AI automation for corporate clients across the <strong>USA, Nepal, and international markets</strong> — powered by an elite engineering talent academy.
                </p>

                {/* CTA Buttons — delay 320ms */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-start', ...reveal(320) }}>
                  {/* Row 1: Explore Internships & Tech Training */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <button 
                      onClick={() => unlockAndExplore(onExploreClick)} 
                      style={{
                        padding: '0.75rem 1.6rem',
                        fontSize: '0.92rem',
                        fontWeight: '800',
                        color: '#ffffff',
                        background: '#ff5454',
                        border: 'none',
                        borderRadius: '9999px',
                        boxShadow: '0 4px 18px rgba(255, 84, 84, 0.4)',
                        cursor: 'pointer',
                        transition: 'all 0.18s ease'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 22px rgba(255, 84, 84, 0.55)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 18px rgba(255, 84, 84, 0.4)'; }}
                    >
                      Explore Internships
                    </button>

                    <button 
                      onClick={() => unlockAndExplore(onTrainingClick)} 
                      style={{
                        padding: '0.75rem 1.6rem',
                        fontSize: '0.92rem',
                        fontWeight: '800',
                        color: '#ffffff',
                        background: '#1d68ff',
                        border: 'none',
                        borderRadius: '9999px',
                        boxShadow: '0 4px 18px rgba(29, 104, 255, 0.4)',
                        cursor: 'pointer',
                        transition: 'all 0.18s ease'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 22px rgba(29, 104, 255, 0.55)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 18px rgba(29, 104, 255, 0.4)'; }}
                    >
                      Tech Training
                    </button>
                  </div>

                  {/* Row 2: Enterprise Solutions ➔ */}
                  <div>
                    <button 
                      onClick={() => unlockAndExplore(onServicesClick)} 
                      style={{
                        padding: '0.75rem 1.75rem',
                        fontSize: '0.92rem',
                        fontWeight: '800',
                        color: '#0a2540',
                        background: '#e2e8f0',
                        border: '1px solid rgba(255, 255, 255, 0.5)',
                        borderRadius: '9999px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.18s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 22px rgba(0, 0, 0, 0.15)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = '#e2e8f0'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)'; }}
                    >
                      Enterprise Solutions ➔
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Hero Founder Image Spotlight */}
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%', ...reveal(180) }}>
                <div style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '380px',
                  height: '430px',
                  borderRadius: '200px 200px 24px 24px',
                  background: 'linear-gradient(180deg, #dbeafe 0%, #0a2540 100%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  boxShadow: '0 20px 50px rgba(10, 37, 64, 0.18)',
                  overflow: 'hidden'
                }}>
                  <img 
                    src="/media/abhishek_sah.jpg" 
                    alt="Abhishek Sah - Founder & CEO"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/media/ram_sah.jpg";
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />

                  <div className="corporate-card" style={{
                    position: 'absolute',
                    bottom: '1.5rem',
                    left: '1.25rem',
                    right: '1.25rem',
                    padding: '0.85rem 1.25rem',
                    background: 'rgba(255, 255, 255, 0.88)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: '14px',
                    border: '1px solid rgba(255, 255, 255, 0.9)',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.12)'
                  }}>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', color: '#0b0f19', margin: 0, fontWeight: '800' }}>Abhishek Sah</h4>
                      <span style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: '700' }}>Founder & CEO • Velora Global</span>
                    </div>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      background: '#f1f5f9',
                      color: '#334155',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '6px'
                    }}>
                      Founding Team
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════ */}
        {/* STEP 1: LINE 1 (Enterprise Software Solutions)               */}
        {/* ═════════════════════════════════════════════════════════════ */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem 2rem',
          opacity: storyStep === 1 ? 1 : 0,
          transform: storyStep === 1 ? 'translate3d(0, 0, 0)' : storyStep < 1 ? 'translate3d(0, 30px, 0)' : 'translate3d(0, -30px, 0)',
          pointerEvents: storyStep === 1 ? 'auto' : 'none',
          transition: 'opacity 0.45s ease, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: storyStep === 1 ? 5 : 1
        }}>
          <div style={{ maxWidth: '960px', textAlign: 'center' }}>
            <div style={{ marginBottom: '0.85rem' }}>
              <span style={{
                fontSize: '0.75rem',
                color: '#2563eb',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                background: 'rgba(255, 255, 255, 0.75)',
                backdropFilter: 'blur(12px)',
                padding: '0.3rem 0.95rem',
                borderRadius: '9999px',
                border: '1px solid rgba(255, 255, 255, 0.9)',
                display: 'inline-block'
              }}>
                ENTERPRISE SOFTWARE SOLUTIONS
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(1.55rem, 3.2vw, 2.35rem)',
              fontWeight: '900',
              color: '#0a2540',
              lineHeight: '1.25',
              letterSpacing: '-0.02em',
              marginBottom: '0.85rem',
              textShadow: '0 2px 16px rgba(255, 255, 255, 0.95), 0 1px 4px rgba(255, 255, 255, 0.8)'
            }}>
              Tailored Web, Mobile & AI Solutions for <br />
              <span style={{ color: '#ff5252', textShadow: '0 0 24px rgba(255, 82, 82, 0.35)' }}>
                Modern Global Businesses.
              </span>
            </h2>

            <p style={{
              fontSize: 'clamp(0.95rem, 1.4vw, 1.12rem)',
              color: '#1e293b',
              fontWeight: '600',
              lineHeight: '1.55',
              textShadow: '0 1px 6px rgba(255, 255, 255, 0.9)'
            }}>
              We engineer custom SaaS architectures, high-concurrency cloud systems, and native mobile apps with enterprise precision.
            </p>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════ */}
        {/* STEP 2: LINE 2 (Global Client Deliveries)                    */}
        {/* ═════════════════════════════════════════════════════════════ */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem 2rem',
          opacity: storyStep === 2 ? 1 : 0,
          transform: storyStep === 2 ? 'translate3d(0, 0, 0)' : storyStep < 2 ? 'translate3d(0, 30px, 0)' : 'translate3d(0, -30px, 0)',
          pointerEvents: storyStep === 2 ? 'auto' : 'none',
          transition: 'opacity 0.45s ease, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: storyStep === 2 ? 5 : 1
        }}>
          <div style={{ maxWidth: '960px', textAlign: 'center' }}>
            <div style={{ marginBottom: '0.85rem' }}>
              <span style={{
                fontSize: '0.75rem',
                color: '#ff5252',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                background: 'rgba(255, 255, 255, 0.75)',
                backdropFilter: 'blur(12px)',
                padding: '0.3rem 0.95rem',
                borderRadius: '9999px',
                border: '1px solid rgba(255, 255, 255, 0.9)',
                display: 'inline-block'
              }}>
                GLOBAL CLIENT DELIVERIES
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(1.55rem, 3.2vw, 2.35rem)',
              fontWeight: '900',
              color: '#0a2540',
              lineHeight: '1.25',
              letterSpacing: '-0.02em',
              marginBottom: '0.85rem',
              textShadow: '0 2px 16px rgba(255, 255, 255, 0.95), 0 1px 4px rgba(255, 255, 255, 0.8)'
            }}>
              Shipping production software for corporate clients in the <span style={{ color: '#ff5252', textShadow: '0 0 24px rgba(255, 82, 82, 0.35)' }}>USA, Nepal & International Markets</span>.
            </h2>

            <p style={{
              fontSize: 'clamp(0.95rem, 1.4vw, 1.12rem)',
              color: '#1e293b',
              fontWeight: '600',
              lineHeight: '1.55',
              textShadow: '0 1px 6px rgba(255, 255, 255, 0.9)'
            }}>
              From scalable cloud platforms to custom LLM chatbots and enterprise business automation.
            </p>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════ */}
        {/* STEP 3: LINE 3 (Talent Engine & Scale)                       */}
        {/* ═════════════════════════════════════════════════════════════ */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem 2rem',
          opacity: storyStep === 3 ? 1 : 0,
          transform: storyStep === 3 ? 'translate3d(0, 0, 0)' : storyStep < 3 ? 'translate3d(0, 30px, 0)' : 'translate3d(0, -30px, 0)',
          pointerEvents: storyStep === 3 ? 'auto' : 'none',
          transition: 'opacity 0.45s ease, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: storyStep === 3 ? 5 : 1
        }}>
          <div style={{ maxWidth: '960px', textAlign: 'center' }}>
            <div style={{ marginBottom: '0.85rem' }}>
              <span style={{
                fontSize: '0.75rem',
                color: '#059669',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                background: 'rgba(255, 255, 255, 0.75)',
                backdropFilter: 'blur(12px)',
                padding: '0.3rem 0.95rem',
                borderRadius: '9999px',
                border: '1px solid rgba(255, 255, 255, 0.9)',
                display: 'inline-block'
              }}>
                HIGH-CALIBER TALENT ECOSYSTEM
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(1.55rem, 3.2vw, 2.35rem)',
              fontWeight: '900',
              color: '#0a2540',
              lineHeight: '1.25',
              letterSpacing: '-0.02em',
              marginBottom: '0.85rem',
              textShadow: '0 2px 16px rgba(255, 255, 255, 0.95), 0 1px 4px rgba(255, 255, 255, 0.8)'
            }}>
              <span style={{ color: '#2563eb', textShadow: '0 0 24px rgba(37, 99, 235, 0.35)' }}>USA & Global Delivery</span> • 
              <span style={{ color: '#0a2540' }}> 50+ Active Engineers</span> • 
              <span style={{ color: '#ff5252', textShadow: '0 0 24px rgba(255, 82, 82, 0.35)' }}> 100+ Trained & Placed Developers.</span>
            </h2>

            <p style={{
              fontSize: 'clamp(0.95rem, 1.4vw, 1.12rem)',
              color: '#1e293b',
              fontWeight: '600',
              lineHeight: '1.55',
              textShadow: '0 1px 6px rgba(255, 255, 255, 0.9)'
            }}>
              Combining founder-led engineering excellence with an agile global talent pipeline.
            </p>
          </div>
        </div>

        {/* Step Indicator Bullets */}
        {isFrozen && (
          <div style={{
            position: 'absolute',
            bottom: '1.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 20,
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            background: 'rgba(255, 255, 255, 0.65)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            padding: '0.4rem 0.9rem',
            borderRadius: '9999px',
            border: '1px solid rgba(255, 255, 255, 0.85)',
            boxShadow: '0 4px 18px rgba(0, 0, 0, 0.05)'
          }}>
            {[0, 1, 2, 3].map((step) => (
              <div
                key={step}
                style={{
                  width: storyStep === step ? '18px' : '6px',
                  height: '6px',
                  borderRadius: '9999px',
                  background: storyStep === step ? '#2563eb' : '#94a3b8',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              />
            ))}
          </div>
        )}

      </div>

      {/* ── UNIFIED 4-METRICS BANNER (Placed directly in natural document flow) ── */}
      <div className="container" style={{ position: 'relative', zIndex: 1, marginTop: '2rem', marginBottom: '4.5rem' }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.65)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.85)',
          borderRadius: '24px',
          padding: '2.25rem 2.75rem',
          boxShadow: '0 12px 35px rgba(0, 0, 0, 0.05)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2.5rem',
          alignItems: 'flex-start'
        }}>
          
          {/* Stat 1: USA & Global */}
          <div>
            <span style={{ fontSize: '2.3rem', fontWeight: '800', color: '#10b981', display: 'block', lineHeight: '1.15', letterSpacing: '-0.02em' }}>
              USA & Global
            </span>
            <span style={{ fontSize: '0.92rem', color: '#334155', fontWeight: '700', marginTop: '0.65rem', display: 'block', lineHeight: '1.4' }}>
              Clients & International Delivery
            </span>
          </div>

          {/* Stat 2: 10+ */}
          <div>
            <span style={{ fontSize: '2.75rem', fontWeight: '800', color: '#2563eb', display: 'block', lineHeight: '1', letterSpacing: '-0.03em' }}>
              10+
            </span>
            <span style={{ fontSize: '0.92rem', color: '#334155', fontWeight: '700', marginTop: '0.65rem', display: 'block' }}>
              Enterprise Solutions & Tracks
            </span>
          </div>

          {/* Stat 3: 50+ */}
          <div>
            <span style={{ fontSize: '2.75rem', fontWeight: '800', color: '#f87171', display: 'block', lineHeight: '1', letterSpacing: '-0.03em' }}>
              50+
            </span>
            <span style={{ fontSize: '0.92rem', color: '#334155', fontWeight: '700', marginTop: '0.65rem', display: 'block' }}>
              Active Engineers & Tech Interns
            </span>
          </div>

          {/* Stat 4: 100+ */}
          <div>
            <span style={{ fontSize: '2.75rem', fontWeight: '800', color: '#0b0f19', display: 'block', lineHeight: '1', letterSpacing: '-0.03em' }}>
              100+
            </span>
            <span style={{ fontSize: '0.92rem', color: '#334155', fontWeight: '700', marginTop: '0.65rem', display: 'block' }}>
              Developers Trained, Mentored & Placed / Hired
            </span>
          </div>

        </div>
      </div>

      {/* ── DOMAIN SPECIALIZATIONS (Smoothly unpinned downstream section) ── */}
      <div className="container" style={{ position: 'relative', zIndex: 5, paddingTop: '4rem', paddingBottom: '5rem' }}>
          
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
                      →
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
                  onClick={onExploreClick}
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
                  onClick={onTrainingClick || onExploreClick}
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
