import React, { useState } from 'react';
import { api } from '../../services/api';

export default function ClientAuthModal({ initialMode = 'login', onClose, onAuthSuccess }) {
  const [authMode, setAuthMode] = useState(initialMode); // 'login' or 'signup'
  const [showPassword, setShowPassword] = useState(false);

  // Client Form State
  const [clientData, setClientData] = useState({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    password: ''
  });

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await api.loginUser(loginEmail, loginPassword);
      if (res && res.user) {
        if (onAuthSuccess) onAuthSuccess(res.user, res.token);
        onClose();
      }
    } catch (err) {
      setErrorMsg(err.message || 'Client login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleClientSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await api.registerClient(clientData);
      if (res && res.user) {
        if (onAuthSuccess) onAuthSuccess(res.user);
        onClose();
      }
    } catch (err) {
      setErrorMsg(err.message || 'Client registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ padding: '1rem' }}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{
          maxWidth: '520px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: '24px',
          padding: '2.25rem 2rem',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: '#f1f5f9',
            color: '#64748b',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            fontSize: '1rem',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
        >
          ✕
        </button>

        {/* Header Title */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <span className="badge badge-coral" style={{ marginBottom: '0.5rem' }}>
            Enterprise Technical Solutions
          </span>
          <h2 style={{ fontSize: '1.8rem', color: '#0b0f19', marginBottom: '0.35rem', fontWeight: '800' }}>
            {authMode === 'login' ? 'Corporate Client Portal Sign In' : 'Register Corporate Client'}
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: '1.5' }}>
            Request custom software services, review project scopes, and manage technical contracts.
          </p>
        </div>

        {errorMsg && (
          <div style={{ padding: '0.85rem 1rem', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '10px', color: '#dc2626', fontSize: '0.85rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>⚠️</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Mode Selector (Login vs Signup) */}
        <div style={{ display: 'flex', borderBottom: '2px solid #e2e8f0', marginBottom: '1.5rem' }}>
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            style={{
              flex: 1,
              padding: '0.6rem',
              background: 'none',
              border: 'none',
              borderBottom: authMode === 'login' ? '3px solid #ff6b6b' : '3px solid transparent',
              color: authMode === 'login' ? '#ff6b6b' : '#64748b',
              fontWeight: '800',
              fontSize: '0.95rem',
              cursor: 'pointer',
              marginBottom: '-2px',
              transition: 'all 0.2s ease'
            }}
          >
            Client Sign In
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('signup')}
            style={{
              flex: 1,
              padding: '0.6rem',
              background: 'none',
              border: 'none',
              borderBottom: authMode === 'signup' ? '3px solid #ff6b6b' : '3px solid transparent',
              color: authMode === 'signup' ? '#ff6b6b' : '#64748b',
              fontWeight: '800',
              fontSize: '0.95rem',
              cursor: 'pointer',
              marginBottom: '-2px',
              transition: 'all 0.2s ease'
            }}
          >
            Register Corporate Client
          </button>
        </div>

        {/* LOGIN FORM */}
        {authMode === 'login' && (
          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: '#64748b', marginBottom: '0.35rem', fontWeight: '700' }}>Business Email Address *</label>
              <input 
                type="email"
                required
                placeholder="client@company.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  fontSize: '0.95rem',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: '#64748b', marginBottom: '0.35rem', fontWeight: '700' }}>Password *</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 2.8rem 0.75rem 1rem',
                    fontSize: '0.95rem',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  style={{
                    position: 'absolute',
                    right: '0.85rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    color: '#64748b'
                  }}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="btn-coral" 
              style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem', fontSize: '0.98rem', fontWeight: '800' }}
            >
              {loading ? 'Authenticating Client...' : 'Sign In to Client Portal ➔'}
            </button>
          </form>
        )}

        {/* CLIENT SIGNUP FORM */}
        {authMode === 'signup' && (
          <form onSubmit={handleClientSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: '#64748b', marginBottom: '0.35rem', fontWeight: '700' }}>Executive Name *</label>
              <input 
                type="text"
                required
                placeholder="e.g. Rajesh Shrestha"
                value={clientData.name}
                onChange={(e) => setClientData({...clientData, name: e.target.value})}
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#64748b', marginBottom: '0.35rem', fontWeight: '700' }}>Company / Organization *</label>
                <input 
                  type="text"
                  required
                  placeholder="Acme Tech Pvt. Ltd."
                  value={clientData.companyName}
                  onChange={(e) => setClientData({...clientData, companyName: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#64748b', marginBottom: '0.35rem', fontWeight: '700' }}>Phone / WhatsApp *</label>
                <input 
                  type="tel"
                  required
                  placeholder="+977 9800000000"
                  value={clientData.phone}
                  onChange={(e) => setClientData({...clientData, phone: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: '#64748b', marginBottom: '0.35rem', fontWeight: '700' }}>Business Email Address *</label>
              <input 
                type="email"
                required
                placeholder="client@company.com"
                value={clientData.email}
                onChange={(e) => setClientData({...clientData, email: e.target.value})}
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: '#64748b', marginBottom: '0.35rem', fontWeight: '700' }}>Create Password *</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Create secure password"
                  value={clientData.password}
                  onChange={(e) => setClientData({...clientData, password: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem 2.8rem 0.75rem 1rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  style={{
                    position: 'absolute',
                    right: '0.85rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    color: '#64748b'
                  }}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-coral" style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem', fontWeight: '800' }}>
              {loading ? 'Creating Client Account...' : 'Register Corporate Client Account ➔'}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
