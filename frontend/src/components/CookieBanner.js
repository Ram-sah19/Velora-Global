import React, { useState, useEffect } from 'react';

const COOKIE_KEY = 'velora_cookie_consent';

const COOKIES = [
  {
    name: 'velora_refresh_token',
    purpose: 'Keeps you securely logged in to your account',
    duration: '30 days',
    type: 'Essential'
  },
  {
    name: 'velora_user',
    purpose: 'Stores your basic profile (name, email, role) in browser for fast page loads',
    duration: '30 days',
    type: 'LocalStorage'
  }
];

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
    <div role="region" aria-label="Cookie consent" className={leaving ? 'cb cb--leaving' : 'cb'}>
      <h3 className="cb__title">Velora Global uses cookies</h3>
      <p className="cb__text">
        We use an essential session cookie to keep you securely logged in. No tracking, no ads, no
        third-party analytics.{' '}
        <a className="svc-link" href="/privacy-policy">Read the privacy policy</a>.
      </p>

      {showDetails && (
        <div id="cookie-details" className="cb__details">
          <ul className="cb__list">
            {COOKIES.map((cookie) => (
              <li key={cookie.name} className="cb__row">
                <div className="cb__row__id">
                  <p className="cb__name">{cookie.name}</p>
                  <p className="cb__purpose">{cookie.purpose}</p>
                </div>
                <p className="cb__meta">
                  {cookie.duration}
                  <span className="cb__chip">{cookie.type}</span>
                </p>
              </li>
            ))}
          </ul>
          <p className="cb__note">
            We do <strong>not</strong> use advertising cookies, tracking pixels, or any third-party
            analytics. These cookies are strictly necessary to operate the platform.
          </p>
        </div>
      )}

      <div className="cb__actions">
        <button type="button" className="svc-btn svc-btn--blue" onClick={() => dismiss('accepted')}>
          Accept All Cookies
        </button>
        <button type="button" className="svc-btn svc-btn--quiet" onClick={() => dismiss('essential_only')}>
          Essential Only
        </button>
        <button
          type="button"
          className="cb__toggle"
          aria-expanded={showDetails}
          aria-controls={showDetails ? 'cookie-details' : undefined}
          onClick={() => setShowDetails((value) => !value)}
        >
          {showDetails ? 'Hide details' : 'Cookie details'}
        </button>
      </div>
    </div>
  );
}
