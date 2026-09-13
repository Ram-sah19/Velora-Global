import React, { useState, useEffect, useRef } from 'react';

export default function HeroSection({ onExploreClick, onTrainingClick, onServicesClick }) {
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

  // Story Mode: Step-by-Step Controlled Reveal (0: Hero, 1: Line 1, 2: Line 2, 3: Line 3, 4: Unfrozen)
  const [isFrozen, setIsFrozen] = useState(() => {
    return sessionStorage.getItem('velora_hero_unlocked') !== 'true';
  });
  const [storyStep, setStoryStep] = useState(() => {
    return sessionStorage.getItem('velora_hero_unlocked') === 'true' ? 4 : 0;
  });
  const isTransitioningRef = useRef(false);
  const isUnfreezingRef = useRef(false);

  // Manage body overflow locking only when frozen at the top
  useEffect(() => {
    if (isFrozen) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isFrozen]);

  useEffect(() => {
    let touchStartY = 0;

    const handleWheel = (e) => {
      // If unfreezing transition is in progress, swallow residual scroll momentum so page doesn't fling fast
      if (isUnfreezingRef.current) {
        e.preventDefault();
        return;
      }

      const isAtTop = window.scrollY <= 10;

      // If we are at the top and the user scrolls UP while unfrozen (step 4), re-freeze and reverse!
      if (isAtTop && !isFrozen && e.deltaY < -15) {
        e.preventDefault();
        if (isTransitioningRef.current) return;
        isTransitioningRef.current = true;
        setIsFrozen(true);
        setStoryStep(3);
        setTimeout(() => {
          isTransitioningRef.current = false;
        }, 380);
        return;
      }

      // If we are frozen at the top
      if (isFrozen && isAtTop) {
        if (Math.abs(e.deltaY) < 14) return;
        e.preventDefault();

        if (isTransitioningRef.current) return;
        isTransitioningRef.current = true;

        if (e.deltaY > 0) {
          // Scrolling down: 0 -> 1 -> 2 -> 3 -> 4 (unfreeze with momentum buffer)
          setStoryStep((prev) => {
            if (prev < 3) {
              return prev + 1;
            } else {
              setIsFrozen(false);
              sessionStorage.setItem('velora_hero_unlocked', 'true');
              isUnfreezingRef.current = true;
              setTimeout(() => {
                isUnfreezingRef.current = false;
              }, 420);
              return 4;
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
      if (isUnfreezingRef.current) {
        e.preventDefault();
        return;
      }

      const isAtTop = window.scrollY <= 10;
      const touchEndY = e.touches[0].clientY;
      const diff = touchStartY - touchEndY; // > 0 is scroll down, < 0 is scroll up

      if (isAtTop && !isFrozen && diff < -30) {
        e.preventDefault();
        if (isTransitioningRef.current) return;
        isTransitioningRef.current = true;
        setIsFrozen(true);
        setStoryStep(3);
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
            if (prev < 3) return prev + 1;
            setIsFrozen(false);
            sessionStorage.setItem('velora_hero_unlocked', 'true');
            isUnfreezingRef.current = true;
            setTimeout(() => {
              isUnfreezingRef.current = false;
            }, 420);
            return 4;
          });
        } else {
          setStoryStep((prev) => Math.max(0, prev - 1));
        }

        setTimeout(() => {
          isTransitioningRef.current = false;
        }, 380);
      }
    };

    const handleKeyDown = (e) => {
      const isAtTop = window.scrollY <= 10;
      if (isFrozen && isAtTop) {
        if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
          e.preventDefault();
          if (isTransitioningRef.current) return;
          isTransitioningRef.current = true;
          setStoryStep((prev) => {
            if (prev < 3) return prev + 1;
            setIsFrozen(false);
            sessionStorage.setItem('velora_hero_unlocked', 'true');
            isUnfreezingRef.current = true;
            setTimeout(() => {
              isUnfreezingRef.current = false;
            }, 420);
            return 4;
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
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFrozen]);

  const unlockAndExplore = (callback) => {
    setIsFrozen(false);
    setStoryStep(4);
    sessionStorage.setItem('velora_hero_unlocked', 'true');
    document.body.style.overflow = 'unset';
    if (callback) callback();
  };

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
          opacity: storyStep >= 3 ? 1 : 0,
          transform: storyStep >= 3 ? 'translate3d(0, 0, 0)' : storyStep < 3 ? 'translate3d(0, 30px, 0)' : 'translate3d(0, -30px, 0)',
          pointerEvents: storyStep >= 3 ? 'auto' : 'none',
          transition: 'opacity 0.45s ease, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: storyStep >= 3 ? 5 : 1
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

        {/* Step Indicator Bullets (Visible during frozen story steps) */}
        {isFrozen && storyStep < 4 && (
          <div style={{
            position: 'absolute',
            bottom: '1.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 20,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(255, 255, 255, 0.75)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            padding: '0.4rem 0.95rem',
            borderRadius: '9999px',
            border: '1px solid rgba(255, 255, 255, 0.85)',
            boxShadow: '0 4px 18px rgba(0, 0, 0, 0.06)'
          }}>
            {[0, 1, 2, 3].map((step) => (
              <button
                key={step}
                onClick={() => setStoryStep(step)}
                aria-label={`Show slide ${step + 1}`}
                style={{
                  width: (storyStep === step || (storyStep >= 3 && step === 3)) ? '20px' : '7px',
                  height: '7px',
                  borderRadius: '9999px',
                  background: (storyStep === step || (storyStep >= 3 && step === 3)) ? '#2563eb' : '#94a3b8',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
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

    </section>
  );
}
