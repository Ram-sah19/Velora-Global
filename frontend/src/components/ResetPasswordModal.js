import React, { useState } from 'react';
import { api } from '../services/api';
import { showToast } from './NotificationToast';

function getPasswordValidation(password, confirmPassword = null) {
  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
  const isMatching = confirmPassword === null || (password.length > 0 && password === confirmPassword);
  const isValid = hasMinLength && hasNumber && hasSpecialChar && isMatching;
  let errorMessage = null;
  if (!hasMinLength) errorMessage = 'Password must be at least 8 characters.';
  else if (!hasNumber) errorMessage = 'Password must contain at least 1 number.';
  else if (!hasSpecialChar) errorMessage = 'Password must contain at least 1 special character.';
  else if (confirmPassword !== null && password !== confirmPassword) errorMessage = 'Passwords do not match.';
  return { hasMinLength, hasNumber, hasSpecialChar, isMatching, isValid, errorMessage };
}

export default function ResetPasswordModal({ token, onClose }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [done, setDone] = useState(false);

  const validation = getPasswordValidation(newPassword, confirmPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!validation.isValid) {
      setErrorMsg(validation.errorMessage);
      return;
    }

    setLoading(true);
    try {
      await api.resetPassword(token, newPassword);
      setDone(true);
      showToast('✅ Password reset successfully! Please log in.', 'success');
      // Remove token from URL without page reload
      window.history.replaceState({}, document.title, window.location.pathname);
    } catch (err) {
      setErrorMsg(err.message || 'Reset failed. This link may have expired. Please request a new one.');
    } finally {
      setLoading(false);
    }
  };

  const EyeIcon = ({ show }) => show ? (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#f94d4d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
  ) : (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)',
      zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
    }}>
      <div style={{
        background: '#ffffff', borderRadius: '20px', padding: '0',
        width: 'min(480px, 100%)', boxShadow: '0 25px 60px rgba(0,0,0,0.2)',
        overflow: 'hidden', animation: 'slideUp 0.3s cubic-bezier(0.16,1,0.3,1)'
      }}>
        {/* Accent bar */}
        <div style={{ height: '5px', background: 'linear-gradient(90deg, #f94d4d, #ff8c00)' }} />

        <div style={{ padding: '2rem' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <div>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>🔐</div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0b0f19', margin: 0 }}>Set New Password</h2>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0.25rem 0 0' }}>
                Velora Global · Password Reset
              </p>
            </div>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: '1.5rem', lineHeight: 1, padding: '0.2rem' }}>×</button>
          </div>

          {done ? (
            /* ── Success State ── */
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
              <h3 style={{ fontSize: '1.25rem', color: '#0b0f19', fontWeight: '800', marginBottom: '0.5rem' }}>
                Password Reset Successful!
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                Your password has been updated. You can now log in with your new password.
              </p>
              <button onClick={onClose} className="btn-coral" style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>
                Go to Login →
              </button>
            </div>
          ) : (
            /* ── Reset Form ── */
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>

              {/* New Password */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '0.35rem' }}>
                  New Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="Create a strong password"
                    required
                    style={{ width: '100%', paddingRight: '2.75rem', boxSizing: 'border-box' }}
                  />
                  <button type="button" onClick={() => setShowPw(v => !v)} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <EyeIcon show={showPw} />
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '0.35rem' }}>
                  Confirm New Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Repeat your new password"
                    required
                    style={{ width: '100%', paddingRight: '2.75rem', boxSizing: 'border-box' }}
                  />
                  <button type="button" onClick={() => setShowConfirm(v => !v)} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <EyeIcon show={showConfirm} />
                  </button>
                </div>
              </div>

              {/* Password Criteria Checklist */}
              {newPassword.length > 0 && (
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.65rem 0.9rem', display: 'flex', flexDirection: 'column', gap: '0.2rem', fontSize: '0.78rem' }}>
                  {[
                    { met: validation.hasMinLength, label: 'At least 8 characters' },
                    { met: validation.hasNumber, label: 'At least 1 number (0–9)' },
                    { met: validation.hasSpecialChar, label: 'At least 1 special character' },
                    { met: validation.isMatching && confirmPassword.length > 0, label: 'Passwords match' }
                  ].map(({ met, label }) => (
                    <span key={label} style={{ color: met ? '#059669' : '#94a3b8', fontWeight: '600' }}>
                      {met ? '✓' : '•'} {label}
                    </span>
                  ))}
                </div>
              )}

              {/* Error */}
              {errorMsg && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '0.75rem 1rem', color: '#b91c1c', fontSize: '0.85rem', fontWeight: '600' }}>
                  ⚠️ {errorMsg}
                </div>
              )}

              <button type="submit" disabled={loading} className="btn-coral" style={{ padding: '0.85rem', fontSize: '1rem', fontWeight: '800', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Resetting Password...' : 'Reset Password 🔐'}
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
