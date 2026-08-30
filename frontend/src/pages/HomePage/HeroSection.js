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

  // Scroll Progress tracker for Cinematic Sticky Horizon Storytelling
  const scrollContainerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let animId = null;
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      const rect = scrollContainerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;
      
      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);
      
      if (animId) cancelAnimationFrame(animId);
      animId = requestAnimationFrame(() => {
        setScrollProgress(progress);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  const scrollToSlide = (slideIndex) => {
    if (!scrollContainerRef.current) return;
    const containerTop = scrollContainerRef.current.offsetTop;
    const totalScrollable = scrollContainerRef.current.offsetHeight - window.innerHeight;
    const targetScroll = containerTop + (slideIndex === 0 ? 0 : slideIndex === 1 ? totalScrollable * 0.45 : totalScrollable * 0.85);
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

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

  return (
    <section style={{
      position: 'relative',
      background: 'transparent',
      padding: 0
    }}>

      {/* ── HERO VIEWPORT STAGE ── */}
      <div style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6rem 0 3rem 0'
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
              url('/media/hero_mountain.png'),
              url('/images/hero_mountain.png'),
              url('/media/hero_mountain.jpg'),
              url('/images/hero_mountain.jpg')
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
                <div style={{ marginBottom: '1rem', ...reveal(0) }}>
                  <span style={{
                    fontSize: '0.82rem',
                    color: '#2563eb',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    background: 'rgba(239, 246, 255, 0.90)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    padding: '0.35rem 1.1rem',
                    borderRadius: '9999px',
                    border: '1px solid rgba(219, 234, 254, 0.9)',
                    display: 'inline-block'
                  }}>
                    VELORA GLOBAL
                  </span>
                </div>

                {/* H1 — delay 100ms */}
                <h1 style={{
                  fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
                  lineHeight: '1.15',
                  fontWeight: '800',
                  color: '#0a2540',
                  marginBottom: '1.25rem',
                  letterSpacing: '-0.02em',
                  textShadow: '0 1px 12px rgba(255, 255, 255, 0.6)',
                  ...reveal(100)
                }}>
                  Technology. Training. <br />
                  <span className="text-coral">Opportunity.</span>
                </h1>

                {/* Subtitle — delay 200ms */}
                <p style={{
                  fontSize: '1.15rem',
                  color: '#1e293b',
                  fontWeight: '500',
                  marginBottom: '2.25rem',
                  maxWidth: '560px',
                  lineHeight: '1.65',
                  textShadow: '0 1px 4px rgba(255, 255, 255, 0.8)',
                  ...reveal(200)
                }}>
                  Delivering scalable enterprise IT solutions for businesses while empowering students and aspiring technology professionals through practical training and industry-focused internships.
                </p>

                {/* CTA Buttons — delay 320ms */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', ...reveal(320) }}>
                  <button 
                    onClick={() => unlockAndExplore(onExploreClick)} 
                    className="btn-coral" 
                    style={{ padding: '0.85rem 1.6rem', fontSize: '0.95rem', fontWeight: '800', borderRadius: '9999px', boxShadow: '0 4px 14px rgba(255, 107, 107, 0.35)', cursor: 'pointer' }}
                  >
                    Explore Internships
                  </button>

                  <button 
                    onClick={() => unlockAndExplore(onTrainingClick || onExploreClick)} 
                    className="btn-primary" 
                    style={{ padding: '0.85rem 1.6rem', fontSize: '0.95rem', fontWeight: '800', borderRadius: '9999px', boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)', cursor: 'pointer' }}
                  >
                    Tech Training
                  </button>

                  {onServicesClick && (
                    <button 
                      onClick={() => unlockAndExplore(onServicesClick)} 
                      style={{
                        padding: '0.85rem 1.6rem',
                        fontSize: '0.95rem',
                        fontWeight: '800',
                        color: '#0a2540',
                        background: 'rgba(255, 255, 255, 0.88)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        border: '1.5px solid rgba(203, 213, 225, 0.9)',
                        borderRadius: '9999px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.05)',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#0a2540'; e.currentTarget.style.background = '#ffffff'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(203, 213, 225, 0.9)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.88)'; }}
                    >
                      Enterprise Solutions ➔
                    </button>
                  )}
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
                    src="/media/ram_sah.jpg" 
                    alt="Ram Sah - Founder & CEO"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/ram_sah.jpg";
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
                      <h4 style={{ fontSize: '0.95rem', color: '#0b0f19', margin: 0, fontWeight: '800' }}>Ram Sah</h4>
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
        {/* STEP 1: LINE 1 (Classroom to Real-World Engineering)          */}
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
            <div style={{ marginBottom: '1.25rem' }}>
              <span style={{
                fontSize: '0.82rem',
                color: '#2563eb',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                background: 'rgba(255, 255, 255, 0.75)',
                backdropFilter: 'blur(12px)',
                padding: '0.4rem 1.25rem',
                borderRadius: '9999px',
                border: '1px solid rgba(255, 255, 255, 0.9)',
                display: 'inline-block'
              }}>
                THE PROBLEM WE SOLVE
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
              fontWeight: '900',
              color: '#0a2540',
              lineHeight: '1.2',
              letterSpacing: '-0.025em',
              marginBottom: '1.25rem',
              textShadow: '0 2px 16px rgba(255, 255, 255, 0.95), 0 1px 4px rgba(255, 255, 255, 0.8)'
            }}>
              We bridge the gap between <br />
              <span style={{ color: '#2563eb', textShadow: '0 0 24px rgba(37, 99, 235, 0.35)' }}>
                classroom theory
              </span> and <span style={{ color: '#ff5252', textShadow: '0 0 24px rgba(255, 82, 82, 0.35)' }}>
                real-world engineering.
              </span>
            </h2>

            <p style={{
              fontSize: 'clamp(1.15rem, 2vw, 1.45rem)',
              color: '#1e293b',
              fontWeight: '600',
              lineHeight: '1.6',
              textShadow: '0 1px 6px rgba(255, 255, 255, 0.9)'
            }}>
              At Velora Global, students don't just study software in textbooks.
            </p>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════ */}
        {/* STEP 2: LINE 2 (Ship Production Software)                     */}
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
            <div style={{ marginBottom: '1.25rem' }}>
              <span style={{
                fontSize: '0.82rem',
                color: '#ff5252',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                background: 'rgba(255, 255, 255, 0.75)',
                backdropFilter: 'blur(12px)',
                padding: '0.4rem 1.25rem',
                borderRadius: '9999px',
                border: '1px solid rgba(255, 255, 255, 0.9)',
                display: 'inline-block'
              }}>
                PRACTICAL PRODUCTION CODE
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
              fontWeight: '900',
              color: '#0a2540',
              lineHeight: '1.2',
              letterSpacing: '-0.025em',
              marginBottom: '1.25rem',
              textShadow: '0 2px 16px rgba(255, 255, 255, 0.95), 0 1px 4px rgba(255, 255, 255, 0.8)'
            }}>
              Students engineer and <span style={{ color: '#ff5252', textShadow: '0 0 24px rgba(255, 82, 82, 0.35)' }}>ship production software</span> directly for enterprise clients.
            </h2>

            <p style={{
              fontSize: 'clamp(1.15rem, 2vw, 1.45rem)',
              color: '#1e293b',
              fontWeight: '600',
              lineHeight: '1.6',
              textShadow: '0 1px 6px rgba(255, 255, 255, 0.9)'
            }}>
              From scalable full-stack apps to cloud infrastructure pipelines.
            </p>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════ */}
        {/* STEP 3: LINE 3 (Tracks, Mentors & Outcomes)                   */}
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
            <div style={{ marginBottom: '1.25rem' }}>
              <span style={{
                fontSize: '0.82rem',
                color: '#059669',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                background: 'rgba(255, 255, 255, 0.75)',
                backdropFilter: 'blur(12px)',
                padding: '0.4rem 1.25rem',
                borderRadius: '9999px',
                border: '1px solid rgba(255, 255, 255, 0.9)',
                display: 'inline-block'
              }}>
                CAREER ACCELERATION
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
              fontWeight: '900',
              color: '#0a2540',
              lineHeight: '1.2',
              letterSpacing: '-0.025em',
              marginBottom: '1.25rem',
              textShadow: '0 2px 16px rgba(255, 255, 255, 0.95), 0 1px 4px rgba(255, 255, 255, 0.8)'
            }}>
              <span style={{ color: '#2563eb', textShadow: '0 0 24px rgba(37, 99, 235, 0.35)' }}>10+ Tracks</span> • 
              <span style={{ color: '#0a2540' }}> 1-on-1 Mentorship</span> • 
              <span style={{ color: '#ff5252', textShadow: '0 0 24px rgba(255, 82, 82, 0.35)' }}> Verified Credentials.</span>
            </h2>

            <p style={{
              fontSize: 'clamp(1.15rem, 2vw, 1.45rem)',
              color: '#1e293b',
              fontWeight: '600',
              lineHeight: '1.6',
              textShadow: '0 1px 6px rgba(255, 255, 255, 0.9)'
            }}>
              Transforming ambitious developers into high-impact technology leaders.
            </p>
          </div>
        </div>

        {/* ── Minimalist Story Step Dots (No skip button) ── */}
        {isFrozen && storyStep < 4 && (
          <div style={{
            position: 'absolute',
            bottom: '2.5rem',
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
          
          {/* Stat 1: 10+ */}
          <div>
            <span style={{ fontSize: '2.75rem', fontWeight: '800', color: '#0b0f19', display: 'block', lineHeight: '1', letterSpacing: '-0.03em' }}>
              10+
            </span>
            <span style={{ fontSize: '0.92rem', color: '#334155', fontWeight: '700', marginTop: '0.65rem', display: 'block' }}>
              Specialized Domain Tracks
            </span>
          </div>

          {/* Stat 2: 100% */}
          <div>
            <span style={{ fontSize: '2.75rem', fontWeight: '800', color: '#2563eb', display: 'block', lineHeight: '1', letterSpacing: '-0.03em' }}>
              100%
            </span>
            <span style={{ fontSize: '0.92rem', color: '#334155', fontWeight: '700', marginTop: '0.65rem', display: 'block' }}>
              Verified Industry Credentials
            </span>
          </div>

          {/* Stat 3: 4 */}
          <div>
            <span style={{ fontSize: '2.75rem', fontWeight: '800', color: '#f87171', display: 'block', lineHeight: '1', letterSpacing: '-0.03em' }}>
              4
            </span>
            <span style={{ fontSize: '0.92rem', color: '#334155', fontWeight: '700', marginTop: '0.65rem', display: 'block' }}>
              Founding Executive Mentors
            </span>
          </div>

          {/* Stat 4: 1 Batch */}
          <div>
            <span style={{ fontSize: '2.75rem', fontWeight: '800', color: '#10b981', display: 'block', lineHeight: '1', letterSpacing: '-0.03em' }}>
              1 Batch
            </span>
            <span style={{ fontSize: '0.92rem', color: '#334155', fontWeight: '700', marginTop: '0.65rem', display: 'block', lineHeight: '1.4' }}>
              Students Trained & Projects Shipped
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
