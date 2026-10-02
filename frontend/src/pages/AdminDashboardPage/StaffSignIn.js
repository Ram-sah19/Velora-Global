import React, { useState } from 'react';
import { api } from '../../services/api';

const STAFF_TYPES = ['admin', 'superadmin'];

export default function StaffSignIn({ onSignedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await api.loginUser(email.trim(), password);
      if (!STAFF_TYPES.includes(res.user.userType)) {
        // The endpoint issues a session cookie for any valid account, so a
        // non-staff sign-in has to be undone before we show this page again.
        await api.logoutUser().catch(() => {});
        setError('That account is not a staff account.');
        return;
      }
      onSignedIn(res.user);
    } catch (err) {
      setError(err.message || 'Sign in failed. Please try again.');
    } finally {
      setBusy(false);
      setPassword('');
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 0.9rem',
    border: '1px solid #cbd5e1',
    borderRadius: '10px',
    fontSize: '0.95rem',
    color: '#0b0f19',
    background: '#ffffff'
  };

  return (
    <div style={{
      minHeight: '70vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem 1.25rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        padding: '2rem',
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '20px',
        boxShadow: 'var(--premium-shadow-card)'
      }}>
        <span className="premium-eyebrow">Staff only</span>
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.5rem',
          fontWeight: 800,
          color: '#0b0f19',
          margin: '0.85rem 0 0.4rem'
        }}>
          Velora staff portal
        </h1>
        <p style={{ margin: '0 0 1.5rem', fontSize: '0.88rem', color: '#64748b', lineHeight: '1.6' }}>
          Not linked from the public site and excluded from search indexing.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          <div>
            <label htmlFor="staff-email" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
              Work email
            </label>
            <input
              id="staff-email"
              type="email"
              required
              aria-required="true"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <label htmlFor="staff-password" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
              Password
            </label>
            <input
              id="staff-password"
              type="password"
              required
              aria-required="true"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />
          </div>

          <button
            type="submit"
            disabled={busy}
            className="btn-premium"
            style={{ padding: '0.75rem', fontSize: '0.92rem', fontWeight: 700 }}
          >
            {busy ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div role="alert" aria-live="assertive" style={{ minHeight: '1.4rem', marginTop: '1rem' }}>
          {error && <p style={{ margin: 0, fontSize: '0.85rem', color: '#b91c1c' }}>{error}</p>}
        </div>
      </div>
    </div>
  );
}
