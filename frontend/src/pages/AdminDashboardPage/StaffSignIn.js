import React, { useEffect, useRef, useState } from 'react';
import { api } from '../../services/api';

export default function StaffSignIn({ onSignedIn }) {
  const [step, setStep] = useState('credentials');
  const [email, setEmail] = useState('');
  const [maskedEmail, setMaskedEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const otpRef = useRef(null);

  useEffect(() => {
    if (step === 'code') otpRef.current?.focus();
  }, [step]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await api.loginUser(email.trim());
      if (res.otpRequired) {
        // Nothing is stored here: no session cookie exists until the code is verified.
        setMaskedEmail(res.maskedEmail || 'your work email');
        setOtp('');
        setStep('code');
      }
    } catch (err) {
      // This page never sends a password, so a 400 from the shared login endpoint can
      // only mean the account is a student or client one.
      setError(err.status === 400
        ? 'That account is not a staff account.'
        : (err.message || 'Sign in failed. Please try again.'));
    } finally {
      setBusy(false);
    }
  };

  const handleVerify = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await api.verifyLoginOtp(email.trim(), otp.trim());
      onSignedIn(res.user);
    } catch (err) {
      setError(err.message || 'That code was not accepted. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const backToCredentials = () => {
    setStep('credentials');
    setOtp('');
    setError('');
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
          {step === 'code' ? 'Confirm it is you' : 'Velora staff portal'}
        </h1>
        <p style={{ margin: '0 0 1.5rem', fontSize: '0.88rem', color: '#64748b', lineHeight: '1.6' }}>
          {step === 'code'
            ? `We sent a 6-digit code to ${maskedEmail}. It expires in 5 minutes and works once.`
            : 'We will email a 6-digit code that expires in 5 minutes. This portal is not linked from the public site.'}
        </p>

        {step === 'code' ? (
          <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <div>
              <label htmlFor="staff-otp" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                6-digit code
              </label>
              <input
                id="staff-otp"
                ref={otpRef}
                type="text"
                required
                aria-required="true"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                pattern="\d{6}"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                style={{ ...inputStyle, letterSpacing: '0.5rem', fontFamily: 'monospace', fontSize: '1.1rem' }}
              />
            </div>

            <button
              type="submit"
              disabled={busy || otp.length !== 6}
              className="btn-premium"
              style={{ padding: '0.75rem', fontSize: '0.92rem', fontWeight: 700 }}
            >
              {busy ? 'Verifying...' : 'Verify and sign in'}
            </button>

            <button
              type="button"
              onClick={backToCredentials}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#2563eb',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              Wrong email, or code expired — request a new one
            </button>
          </form>
        ) : (
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
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
              />
            </div>

            <button
              type="submit"
              disabled={busy}
              className="btn-premium"
              style={{ padding: '0.75rem', fontSize: '0.92rem', fontWeight: 700 }}
            >
              {busy ? 'Sending code...' : 'Email me a code'}
            </button>
          </form>
        )}

        <div role="alert" aria-live="assertive" style={{ minHeight: '1.4rem', marginTop: '1rem' }}>
          {error && <p style={{ margin: 0, fontSize: '0.85rem', color: '#b91c1c' }}>{error}</p>}
        </div>
      </div>
    </div>
  );
}
