import React, { useState, useEffect } from 'react';

const COOKIE_KEY = 'velora_cookie_consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      // Small delay so it doesn't flash immediately on load
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const dismiss = (choice) => {
    setLeaving(true);
    setTimeout(() => {
      localStorage.setItem(COOKIE_KEY, JSON.stringify({ choice, timestamp: Date.now() }));
      setVisible(false);
      setLeaving(false);
    }, 350);
  };

  if (!visible) return null;

  return (
    <>
      {/* Backdrop blur on mobile */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 99998,
        display: 'flex',
        justifyContent: 'center',
        padding: '1rem',
        pointerEvents: 'none'
      }} />

      {/* Cookie Banner */}
      <div style={{
        position: 'fixed',
        bottom: '1.25rem',
        left: '50%',
        transform: `translateX(-50%) translateY(${leaving ? '120%' : '0'})`,
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        zIndex: 99999,
        width: 'min(680px, calc(100vw - 2rem))',
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '20px',
        boxShadow: '0 25px 60px rgba(0,0,0,0.15), 0 8px 20px rgba(0,0,0,0.08)',
        overflow: 'hidden'
      }}>
        {/* Top accent bar */}
        <div style={{ height: '4px', background: 'linear-gradient(90deg, #f94d4d 0%, #ff8c00 100%)' }} />

        <div style={{ padding: '1.5rem 1.75rem' }}>
          {/* Header Row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.9rem' }}>
            <div style={{
              width: '44px',
              height: '44px',
              minWidth: '44px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #fff3f3 0%, #ffe0e0 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem'
            }}>
              🍪
            </div>

            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0b0f19', margin: '0 0 0.2rem' }}>
                Velora Global uses cookies
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.55', margin: 0 }}>
                We use an essential session cookie to keep you securely logged in. No tracking, no ads, no third-party analytics.
              </p>
            </div>
          </div>

          {/* Expandable Details */}
          {showDetails && (
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '1rem',
              marginBottom: '1rem',
              fontSize: '0.82rem',
              color: '#334155',
              lineHeight: '1.6'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '0.78rem' }}>
                    <th style={{ padding: '0.4rem 0.5rem' }}>Cookie Name</th>
                    <th style={{ padding: '0.4rem 0.5rem' }}>Purpose</th>
                    <th style={{ padding: '0.4rem 0.5rem' }}>Duration</th>
                    <th style={{ padding: '0.4rem 0.5rem' }}>Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '0.5rem', fontFamily: 'monospace', color: '#f94d4d', fontWeight: '700' }}>velora_refresh_token</td>
                    <td style={{ padding: '0.5rem' }}>Keeps you securely logged in to your account</td>
                    <td style={{ padding: '0.5rem' }}>30 days</td>
                    <td style={{ padding: '0.5rem' }}>
                      <span style={{ background: '#ecfdf5', color: '#065f46', padding: '0.1rem 0.5rem', borderRadius: '99px', fontWeight: '700', fontSize: '0.75rem' }}>
                        Essential
                      </span>
                    </td>
                  </tr>
                  <tr style={{ borderTop: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '0.5rem', fontFamily: 'monospace', color: '#2563eb', fontWeight: '700' }}>velora_user</td>
                    <td style={{ padding: '0.5rem' }}>Stores your basic profile (name, email, role) in browser for fast page loads</td>
                    <td style={{ padding: '0.5rem' }}>30 days</td>
                    <td style={{ padding: '0.5rem' }}>
                      <span style={{ background: '#eff6ff', color: '#1e40af', padding: '0.1rem 0.5rem', borderRadius: '99px', fontWeight: '700', fontSize: '0.75rem' }}>
                        LocalStorage
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p style={{ marginTop: '0.75rem', marginBottom: 0, color: '#64748b', fontSize: '0.8rem' }}>
                ✅ We do <strong>not</strong> use advertising cookies, tracking pixels, or any third-party analytics. These cookies are strictly necessary to operate the platform.
              </p>
            </div>
          )}

          {/* Actions Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => dismiss('accepted')}
              style={{
                padding: '0.65rem 1.5rem',
                borderRadius: '9999px',
                background: '#f94d4d',
                color: '#ffffff',
                fontWeight: '800',
                fontSize: '0.88rem',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.15s',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={e => e.target.style.background = '#e03131'}
              onMouseLeave={e => e.target.style.background = '#f94d4d'}
            >
              Accept All Cookies ✓
            </button>

            <button
              onClick={() => dismiss('essential_only')}
              style={{
                padding: '0.65rem 1.25rem',
                borderRadius: '9999px',
                background: 'transparent',
                color: '#334155',
                fontWeight: '700',
                fontSize: '0.88rem',
                border: '1.5px solid #cbd5e1',
                cursor: 'pointer',
                transition: 'border-color 0.15s',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={e => e.target.style.borderColor = '#94a3b8'}
              onMouseLeave={e => e.target.style.borderColor = '#cbd5e1'}
            >
              Essential Only
            </button>

            <button
              onClick={() => setShowDetails(v => !v)}
              style={{
                padding: '0.65rem 1rem',
                borderRadius: '9999px',
                background: 'transparent',
                color: '#64748b',
                fontWeight: '600',
                fontSize: '0.85rem',
                border: 'none',
                cursor: 'pointer',
                marginLeft: 'auto',
                textDecoration: 'underline',
                textUnderlineOffset: '2px',
                whiteSpace: 'nowrap'
              }}
            >
              {showDetails ? 'Hide Details ▲' : 'Cookie Details ▼'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
