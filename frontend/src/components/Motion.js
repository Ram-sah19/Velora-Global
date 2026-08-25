import React, { useState, useEffect, useRef } from 'react';
import VeloraLogo from './VeloraLogo';

/* ─────────────────────────────────────────────────────────────────
   1. VELORA BRAND INTRO SPLASH SCREEN
   Plays for ~1.8s on first visit per session, never again
   ───────────────────────────────────────────────────────────────── */
export function VeloraIntro({ onComplete }) {
  const hasRun = sessionStorage.getItem('vg_intro_done');
  const [phase, setPhase] = useState('enter'); // 'enter' | 'hold' | 'exit' | 'done'

  useEffect(() => {
    if (hasRun) {
      onComplete?.();
      return;
    }
    const t1 = setTimeout(() => setPhase('hold'), 300);
    const t2 = setTimeout(() => setPhase('exit'), 1600);
    const t3 = setTimeout(() => {
      sessionStorage.setItem('vg_intro_done', '1');
      setPhase('done');
      onComplete?.();
    }, 2100);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (hasRun || phase === 'done') return null;

  const isVisible = phase === 'hold' || phase === 'exit';

  return (
    <div aria-hidden="true" style={{
      position: 'fixed',
      inset: 0,
      zIndex: 99999,
      background: '#0b0f19',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      transition: phase === 'exit'
        ? 'transform 0.55s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.55s ease'
        : 'none',
      transform: phase === 'exit' ? 'translateY(-100%)' : 'translateY(0)',
      opacity: phase === 'exit' ? 0 : 1,
    }}>

      {/* Real VeloraLogo with white text — matches exact website logo */}
      <div style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(18px) scale(0.97)',
        transition: 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
        display: 'flex',
        alignItems: 'center',
      }}>
        <VeloraLogo width={64} height={64} showText={true} textColor="#ffffff" />
      </div>

      {/* Divider line */}
      <div style={{
        width: 40,
        height: 1,
        background: 'rgba(255,255,255,0.15)',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.45s ease 0.15s',
      }} />

      {/* Tagline — matches the website's muted text style */}
      <div style={{
        fontSize: '0.72rem',
        color: 'rgba(255,255,255,0.38)',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        fontWeight: '600',
        fontFamily: "'Outfit', sans-serif",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
        transition: 'opacity 0.45s ease 0.22s, transform 0.45s ease 0.22s',
      }}>
        Technology · Training · Internships
      </div>

      {/* Progress bar — blue (#2563eb) to coral (#ff6b6b) matching brand */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 3,
        background: 'linear-gradient(90deg, #2563eb, #ff6b6b)',
        animation: 'vgBarGrow 1.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        opacity: phase === 'exit' ? 0 : 1,
        transition: 'opacity 0.2s',
      }} />

      <style>{`
        @keyframes vgBarGrow {
          from { width: 0% }
          to   { width: 100% }
        }
      `}</style>
    </div>
  );
}


/* ─────────────────────────────────────────────────────────────────
   2. PAGE TRANSITION — Smooth fade + slide-up on every tab change
   ───────────────────────────────────────────────────────────────── */
export function PageTransition({ children, tabKey }) {
  const [visible, setVisible] = useState(false);
  const prevKey = useRef(tabKey);

  useEffect(() => {
    if (prevKey.current !== tabKey) {
      setVisible(false);
      const t = setTimeout(() => setVisible(true), 35);
      prevKey.current = tabKey;
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, [tabKey]);

  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(16px)',
      transition: 'opacity 0.38s cubic-bezier(0.22, 1, 0.36, 1), transform 0.38s cubic-bezier(0.22, 1, 0.36, 1)',
      willChange: visible ? 'auto' : 'opacity, transform',
    }}>
      {children}
    </div>
  );
}


/* ─────────────────────────────────────────────────────────────────
   3. FADEIN — Staggered reveal wrapper for sections & cards
   ───────────────────────────────────────────────────────────────── */
export function FadeIn({ children, delay = 0, up = true, style = {} }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0px)' : (up ? 'translateY(20px)' : 'none'),
      transition: `opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
      willChange: 'opacity, transform',
      ...style,
    }}>
      {children}
    </div>
  );
}
