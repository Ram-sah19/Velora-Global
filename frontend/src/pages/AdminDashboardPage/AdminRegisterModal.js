import React, { useState } from 'react';
import { api } from '../../services/api';

export default function AdminRegisterModal({ onClose, onAdminSuccess }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminSecretKey, setAdminSecretKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await api.registerAdmin({
        name,
        email,
        password,
        adminSecretKey
      });

      if (res && res.user) {
        if (onAdminSuccess) onAdminSuccess(res.user);
        onClose();
      }
    } catch (err) {
      setErrorMsg(err.message || 'Super Admin Registration failed. Check secret key.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: '#f1f5f9',
            color: '#64748b',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            fontSize: '1rem',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          ✕
        </button>

        <span className="badge badge-coral" style={{ marginBottom: '0.5rem' }}>Restricted Executive Access</span>
        <h2 style={{ fontSize: '1.7rem', color: '#0b0f19', marginBottom: '0.35rem', fontWeight: '800' }}>
          Super Admin Registration
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
          Authorized executive administration portal. Enter your security key to register a Super Admin account.
        </p>

        {errorMsg && (
          <div style={{ padding: '0.75rem 1rem', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '8px', color: '#dc2626', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
            ⚠️ {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', color: '#64748b', marginBottom: '0.3rem', fontWeight: '600' }}>Super Admin Security Key *</label>
            <input 
              type="password"
              required
              placeholder="Enter VELORA_SUPER_ADMIN_2026 key"
              value={adminSecretKey}
              onChange={(e) => setAdminSecretKey(e.target.value)}
              style={{ width: '100%', borderColor: '#ef4444', background: '#fff5f5' }}
            />
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem', display: 'block' }}>
              Default Secret Key: <code>VELORA_SUPER_ADMIN_2026</code>
            </span>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', color: '#64748b', marginBottom: '0.3rem', fontWeight: '600' }}>Executive Name *</label>
            <input 
              type="text"
              required
              placeholder="e.g. Rambilas Sah"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', color: '#64748b', marginBottom: '0.3rem', fontWeight: '600' }}>Executive Email Address *</label>
            <input 
              type="email"
              required
              placeholder="rambilas@veloraglobal.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', color: '#64748b', marginBottom: '0.3rem', fontWeight: '600' }}>Admin Password *</label>
            <input 
              type="password"
              required
              placeholder="Create secure admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          <button type="submit" disabled={loading} className="btn-coral" style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem' }}>
            {loading ? 'Validating Secret Key...' : 'Register Super Admin Account ➔'}
          </button>
        </form>

      </div>
    </div>
  );
}
