import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { showToast } from './NotificationToast';

export default function VerifyEmailModal({ token, onClose, onVerifySuccess }) {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    let isMounted = true;
    const doVerify = async () => {
      try {
        const res = await api.verifyEmail(token);
        if (isMounted) {
          setSuccess(true);
          setLoading(false);
          showToast('✅ Email verified! Account activated successfully.', 'success');
          // Clean URL token
          window.history.replaceState({}, document.title, window.location.pathname);
          if (onVerifySuccess && res.user) {
            onVerifySuccess(res.user);
          }
        }
      } catch (err) {
        if (isMounted) {
          setErrorMsg(err.message || 'Verification failed. Link may be invalid or expired.');
          setLoading(false);
        }
      }
    };
    doVerify();
    return () => { isMounted = false; };
  }, [token, onVerifySuccess]);

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)',
      zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
    }}>
      <div style={{
        background: '#ffffff', borderRadius: '20px', width: 'min(480px, 100%)',
        boxShadow: '0 25px 60px rgba(0,0,0,0.25)', overflow: 'hidden',
        animation: 'slideUp 0.3s cubic-bezier(0.16,1,0.3,1)'
      }}>
        <div style={{ height: '5px', background: success ? 'linear-gradient(90deg,#059669,#10b981)' : 'linear-gradient(90deg,#f94d4d,#ff8c00)' }} />

        <div style={{ padding: '2.25rem 2rem', textAlign: 'center' }}>
          {loading ? (
            /* ── Loading State ── */
            <div>
              <div style={{ fontSize: '3rem', marginBottom: '1rem', animation: 'spin 1.5s linear infinite' }}>⏳</div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0b0f19', margin: '0 0 0.5rem' }}>
                Verifying Your Email...
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>
                Please wait while we confirm your activation token.
              </p>
            </div>
          ) : success ? (
            /* ── Success State ── */
            <div>
              <div style={{ fontSize: '3.5rem', marginBottom: '0.75rem' }}>🎉</div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0b0f19', margin: '0 0 0.5rem' }}>
                Email Verified & Account Active!
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                Thank you for verifying your email. You now have full access to Velora Global!
              </p>
              <button
                onClick={onClose}
                className="btn-coral"
                style={{ padding: '0.8rem 2rem', fontSize: '1rem', fontWeight: '800' }}
              >
                Access My Workspace 🚀
              </button>
            </div>
          ) : (
            /* ── Error State ── */
            <div>
              <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>⚠️</div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#0b0f19', margin: '0 0 0.5rem' }}>
                Verification Link Invalid or Expired
              </h2>
              <p style={{ color: '#dc2626', fontSize: '0.88rem', fontWeight: '600', marginBottom: '1.25rem' }}>
                {errorMsg}
              </p>
              <button
                onClick={onClose}
                style={{ background: '#f1f5f9', color: '#334155', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
