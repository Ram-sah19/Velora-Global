import React, { useState } from 'react';
import { api } from '../services/api';
import { showToast } from './NotificationToast';

export default function PhoneOtpModal({ onClose, onVerified, defaultPhone = '' }) {
  const [countryCode, setCountryCode] = useState('+977'); // +977 for Nepal, +91 for India
  const [phone, setPhone] = useState(defaultPhone);
  const [step, setStep] = useState('input'); // 'input' | 'verify'
  const [otpInput, setOtpInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [waLink, setWaLink] = useState('');
  const [devCode, setDevCode] = useState('');

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const clean = phone.replace(/\D/g, '');
    if (clean.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.sendPhoneOtp(clean, countryCode, 'Candidate');
      if (res) {
        setWaLink(res.waLink || '');
        if (res.devOtpCode) setDevCode(res.devOtpCode);
        setStep('verify');
        showToast(`💬 WhatsApp OTP sent to ${countryCode} ${clean}!`, 'success');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Failed to send WhatsApp OTP code.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!otpInput || otpInput.trim().length !== 6) {
      setErrorMsg('Please enter the 6-digit WhatsApp code.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.verifyPhoneOtp(phone, countryCode, otpInput.trim());
      if (res && res.isPhoneVerified) {
        showToast(`✅ WhatsApp number ${countryCode} ${phone} verified!`, 'success');
        if (onVerified) onVerified(res.phone);
        onClose();
      }
    } catch (err) {
      setErrorMsg(err.message || 'Incorrect 6-digit WhatsApp code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)',
      zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
    }}>
      <div style={{
        background: '#ffffff', borderRadius: '24px', width: 'min(440px, 100%)',
        boxShadow: '0 25px 60px rgba(0,0,0,0.3)', overflow: 'hidden',
        animation: 'slideUp 0.3s cubic-bezier(0.16,1,0.3,1)'
      }}>
        {/* Top Accent Header Bar */}
        <div style={{ height: '6px', background: 'linear-gradient(90deg, #25D366, #128C7E)' }} />

        <div style={{ padding: '2rem 1.75rem', position: 'relative' }}>
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: '1rem', right: '1rem', background: '#f1f5f9',
              border: 'none', width: '32px', height: '32px', borderRadius: '50%',
              fontSize: '1rem', fontWeight: '800', cursor: 'pointer', color: '#64748b'
            }}
          >
            ✕
          </button>

          {/* Header Title */}
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.35rem' }}>💬</div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0b0f19', margin: '0 0 0.35rem' }}>
              WhatsApp Phone OTP
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>
              Verify your mobile number for Nepal 🇳🇵 & India 🇮🇳 candidates
            </p>
          </div>

          {step === 'input' ? (
            /* STEP 1: PHONE NUMBER & COUNTRY SELECTOR */
            <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {/* Country Code Toggle Selector */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '0.5rem' }}>
                  Select Country *
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setCountryCode('+977')}
                    style={{
                      flex: 1, padding: '0.65rem', borderRadius: '12px',
                      border: countryCode === '+977' ? '2px solid #25D366' : '1px solid #cbd5e1',
                      background: countryCode === '+977' ? '#e8f5e9' : '#ffffff',
                      fontWeight: '800', fontSize: '0.9rem', cursor: 'pointer',
                      color: countryCode === '+977' ? '#1b5e20' : '#475569',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem'
                    }}
                  >
                    🇳🇵 Nepal (+977)
                  </button>

                  <button
                    type="button"
                    onClick={() => setCountryCode('+91')}
                    style={{
                      flex: 1, padding: '0.65rem', borderRadius: '12px',
                      border: countryCode === '+91' ? '2px solid #25D366' : '1px solid #cbd5e1',
                      background: countryCode === '+91' ? '#e8f5e9' : '#ffffff',
                      fontWeight: '800', fontSize: '0.9rem', cursor: 'pointer',
                      color: countryCode === '+91' ? '#1b5e20' : '#475569',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem'
                    }}
                  >
                    🇮🇳 India (+91)
                  </button>
                </div>
              </div>

              {/* Mobile Phone Input */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '0.35rem' }}>
                  10-Digit Mobile Number *
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <span style={{
                    padding: '0.75rem 0.85rem', background: '#f8fafc', border: '1px solid #cbd5e1',
                    borderRadius: '12px', fontWeight: '800', color: '#334155', fontSize: '0.95rem'
                  }}>
                    {countryCode}
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder={countryCode === '+977' ? '9801234567' : '9876543210'}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    style={{ width: '100%', fontSize: '1rem', fontWeight: '700' }}
                  />
                </div>
              </div>

              {errorMsg && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '0.7rem', color: '#dc2626', fontSize: '0.85rem', fontWeight: '600', textAlign: 'center' }}>
                  ⚠️ {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%', padding: '0.85rem', fontSize: '1rem', fontWeight: '800',
                  background: '#25D366', color: '#ffffff', border: 'none', borderRadius: '14px',
                  cursor: 'pointer', boxShadow: '0 4px 14px rgba(37, 211, 102, 0.35)', transition: 'all 0.2s ease'
                }}
              >
                {loading ? 'Sending WhatsApp OTP...' : 'Send WhatsApp Code 💬'}
              </button>
            </form>
          ) : (
            /* STEP 2: ENTER 6-DIGIT WHATSAPP OTP CODE */
            <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'center' }}>
              <div>
                <p style={{ color: '#64748b', fontSize: '0.88rem', margin: '0 0 0.5rem' }}>
                  We sent a 6-digit WhatsApp code to<br />
                  <strong style={{ color: '#0b0f19', fontSize: '1rem' }}>{countryCode} {phone}</strong>
                </p>



                {waLink && (
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-block', background: '#e8f5e9', color: '#1b5e20',
                      padding: '0.5rem 1rem', borderRadius: '99px', fontSize: '0.8rem',
                      fontWeight: '800', textDecoration: 'none', border: '1px solid #a5d6a7'
                    }}
                  >
                    Open in WhatsApp App 💬
                  </a>
                )}
              </div>

              <div>
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="1 2 3 4 5 6"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                  style={{
                    fontSize: '1.8rem', letterSpacing: '0.4em', textAlign: 'center',
                    fontWeight: '900', padding: '0.75rem', borderRadius: '14px',
                    border: '2px solid #25D366', background: '#f8fafc', fontFamily: 'monospace',
                    width: '100%', maxWidth: '280px', margin: '0 auto'
                  }}
                />
              </div>

              {errorMsg && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '0.7rem', color: '#dc2626', fontSize: '0.85rem', fontWeight: '600' }}>
                  ⚠️ {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%', padding: '0.85rem', fontSize: '1rem', fontWeight: '800',
                  background: '#25D366', color: '#ffffff', border: 'none', borderRadius: '14px',
                  cursor: 'pointer', boxShadow: '0 4px 14px rgba(37, 211, 102, 0.35)'
                }}
              >
                {loading ? 'Verifying Code...' : 'Verify WhatsApp Code ✅'}
              </button>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => { setStep('input'); setErrorMsg(''); }}
                  style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '0.85rem', cursor: 'pointer' }}
                >
                  ← Change Number
                </button>

                <button
                  type="button"
                  onClick={handleSendOtp}
                  style={{ background: 'none', border: 'none', color: '#25D366', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer' }}
                >
                  Resend Code 💬
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
