import React, { useState } from 'react';
import { api } from '../../services/api';

// Password criteria validator helper
function getPasswordValidation(password, confirmPassword = null) {
  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
  const isMatching = confirmPassword === null || (password.length > 0 && password === confirmPassword);

  const isValid = hasMinLength && hasNumber && hasSpecialChar && isMatching;

  let errorMessage = null;
  if (!hasMinLength) {
    errorMessage = 'Password must be at least 8 characters long.';
  } else if (!hasNumber) {
    errorMessage = 'Password must contain at least 1 number (0-9).';
  } else if (!hasSpecialChar) {
    errorMessage = 'Password must contain at least 1 special character (e.g. @, #, $, !, %).';
  } else if (confirmPassword !== null && password !== confirmPassword) {
    errorMessage = 'Passwords do not match. Please make sure both fields match.';
  }

  return { hasMinLength, hasNumber, hasSpecialChar, isMatching, isValid, errorMessage };
}

// Reusable Eye Toggle Icon Button
function EyeToggleButton({ show, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      style={{
        position: 'absolute',
        right: '0.75rem',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'none',
        border: 'none',
        color: '#64748b',
        cursor: 'pointer',
        padding: '0.2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      title={show ? "Hide password" : "Show password"}
    >
      {show ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f94d4d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
          <line x1="1" y1="1" x2="23" y2="23"></line>
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      )}
    </button>
  );
}

// Password Requirements Checklist Component
function PasswordChecklist({ password, confirmPassword }) {
  const { hasMinLength, hasNumber, hasSpecialChar, isMatching } = getPasswordValidation(password, confirmPassword);

  return (
    <div style={{ marginTop: '0.4rem', display: 'flex', flexDirection: 'column', gap: '0.2rem', fontSize: '0.78rem', background: '#f8fafc', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
      <span style={{ color: hasMinLength ? '#059669' : '#64748b', fontWeight: '600' }}>
        {hasMinLength ? '✓' : '•'} At least 8 characters
      </span>
      <span style={{ color: hasNumber ? '#059669' : '#64748b', fontWeight: '600' }}>
        {hasNumber ? '✓' : '•'} At least 1 number (0-9)
      </span>
      <span style={{ color: hasSpecialChar ? '#059669' : '#64748b', fontWeight: '600' }}>
        {hasSpecialChar ? '✓' : '•'} At least 1 special character (@, #, $, !, %)
      </span>
      {confirmPassword !== undefined && (
        <span style={{ color: password && isMatching ? '#059669' : '#64748b', fontWeight: '600' }}>
          {password && isMatching ? '✓' : '•'} Passwords match
        </span>
      )}
    </div>
  );
}

export default function AuthModal({ initialMode = 'login', onClose, onAuthSuccess }) {
  const [authMode, setAuthMode] = useState(initialMode); // 'login', 'signup', 'forgot'
  const [signupRole, setSignupRole] = useState('student'); // 'student' or 'client'

  // Visibility Toggles
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showStudentPassword, setShowStudentPassword] = useState(false);
  const [showStudentConfirmPassword, setShowStudentConfirmPassword] = useState(false);
  const [showClientPassword, setShowClientPassword] = useState(false);
  const [showClientConfirmPassword, setShowClientConfirmPassword] = useState(false);

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Student Form State
  const [studentData, setStudentData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    university: '',
    fieldOfStudy: ''
  });

  // Client Form State
  const [clientData, setClientData] = useState({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [unverifiedEmail, setUnverifiedEmail] = useState('');
  const [resendStatus, setResendStatus] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!otpInput || otpInput.trim().length !== 6) {
      setErrorMsg('Please enter the 6-digit verification code sent to your email.');
      return;
    }

    setOtpLoading(true);
    try {
      const targetEmail = registeredEmail || unverifiedEmail || loginEmail;
      const res = await api.verifyOtp(targetEmail, otpInput.trim());
      if (res && res.user) {
        if (onAuthSuccess) onAuthSuccess(res.user);
        onClose();
      }
    } catch (err) {
      setErrorMsg(err.message || 'Incorrect 6-digit code or code expired (10 min limit).');
    } finally {
      setOtpLoading(false);
    }
  };

  // Unified Role-Agnostic Login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await api.loginUser(loginEmail, loginPassword);
      if (res && res.user) {
        if (onAuthSuccess) onAuthSuccess(res.user);
        onClose();
      }
    } catch (err) {
      if (err.requiresVerification || (err.message && err.message.includes('verify your email'))) {
        setRegisteredEmail(loginEmail.trim().toLowerCase());
        setUnverifiedEmail(loginEmail.trim().toLowerCase());
        setAuthMode('verify_otp');
        setErrorMsg('Please enter the 6-digit verification code sent to your email (valid for 10 minutes).');
      } else {
        setErrorMsg(err.message || 'Login failed. Please check your email and password.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Forgot Password Submit
  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      await api.forgotPassword(forgotEmail.trim().toLowerCase());
      setForgotSent(true);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to send reset email. Try again.');
    } finally {
      setLoading(false);
    }
  };

  // Student Signup Submit
  const handleStudentSignup = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const validation = getPasswordValidation(studentData.password, studentData.confirmPassword);
    if (!validation.isValid) {
      setErrorMsg(validation.errorMessage);
      return;
    }

    setLoading(true);
    try {
      const res = await api.registerStudent({
        name: studentData.name.trim(),
        email: studentData.email.trim().toLowerCase(),
        password: studentData.password,
        university: studentData.university.trim(),
        fieldOfStudy: studentData.fieldOfStudy.trim()
      });

      if (res && (res.requiresOtp || res.requiresVerification)) {
        setRegisteredEmail(studentData.email.trim().toLowerCase());
        setAuthMode('verify_otp');
      } else if (res && res.user) {
        if (onAuthSuccess) onAuthSuccess(res.user);
        onClose();
      }
    } catch (err) {
      if (err.requiresVerification || err.requiresOtp) {
        setRegisteredEmail(studentData.email.trim().toLowerCase());
        setAuthMode('verify_otp');
      } else {
        setErrorMsg(err.message || 'Student registration failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Client Signup Submit
  const handleClientSignup = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const validation = getPasswordValidation(clientData.password, clientData.confirmPassword);
    if (!validation.isValid) {
      setErrorMsg(validation.errorMessage);
      return;
    }

    setLoading(true);
    try {
      const res = await api.registerClient({
        name: clientData.name.trim(),
        companyName: clientData.companyName.trim(),
        email: clientData.email.trim().toLowerCase(),
        phone: clientData.phone.trim(),
        password: clientData.password
      });

      if (res && (res.requiresOtp || res.requiresVerification)) {
        setRegisteredEmail(clientData.email.trim().toLowerCase());
        setAuthMode('verify_otp');
      } else if (res && res.user) {
        if (onAuthSuccess) onAuthSuccess(res.user);
        onClose();
      }
    } catch (err) {
      if (err.requiresVerification || err.requiresOtp) {
        setRegisteredEmail(clientData.email.trim().toLowerCase());
        setAuthMode('verify_otp');
      } else {
        setErrorMsg(err.message || 'Corporate client registration failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ padding: '1rem', zIndex: 1000 }}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{
          maxWidth: '540px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          borderRadius: '24px',
          padding: '1.5rem 1.25rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          animation: 'modalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
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
            width: '32px',
            height: '32px',
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

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <span className="badge badge-coral" style={{ marginBottom: '0.5rem' }}>Velora Global Portal</span>
          <h2 style={{ fontSize: '1.7rem', color: '#0b0f19', marginBottom: '0.35rem', fontWeight: '800' }}>
            {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.88rem' }}>
            {authMode === 'login' 
              ? 'Enter your email and password to access your workspace.' 
              : 'Register as a Student Candidate or Corporate Partner.'}
          </p>
        </div>

        {errorMsg && (
          <div style={{ padding: '0.85rem 1rem', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '10px', color: '#dc2626', fontSize: '0.85rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Mode Selector (Login vs Signup) */}
        <div style={{ display: 'flex', borderBottom: '2px solid #e2e8f0', marginBottom: '1.5rem' }}>
          <button
            type="button"
            onClick={() => { setAuthMode('login'); setErrorMsg(''); }}
            style={{
              flex: 1,
              padding: '0.65rem',
              background: 'none',
              border: 'none',
              borderBottom: authMode === 'login' ? '3px solid #f94d4d' : '3px solid transparent',
              color: authMode === 'login' ? '#f94d4d' : '#64748b',
              fontWeight: '800',
              fontSize: '0.95rem',
              cursor: 'pointer',
              marginBottom: '-2px',
              transition: 'all 0.2s ease'
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setAuthMode('signup'); setErrorMsg(''); }}
            style={{
              flex: 1,
              padding: '0.65rem',
              background: 'none',
              border: 'none',
              borderBottom: authMode === 'signup' ? '3px solid #f94d4d' : '3px solid transparent',
              color: authMode === 'signup' ? '#f94d4d' : '#64748b',
              fontWeight: '800',
              fontSize: '0.95rem',
              cursor: 'pointer',
              marginBottom: '-2px',
              transition: 'all 0.2s ease'
            }}
          >
            Create Account
          </button>
        </div>

        {/* UNIFIED LOGIN FORM */}
        {authMode === 'login' && (
          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '0.35rem' }}>
                Account Email Address *
              </label>
              <input 
                type="email" 
                required
                placeholder="name@example.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                style={{ width: '100%', fontSize: '0.95rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '0.35rem' }}>
                Password *
              </label>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showLoginPassword ? "text" : "password"} 
                  required
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  style={{ width: '100%', paddingRight: '2.5rem', fontSize: '0.95rem' }}
                />
                <EyeToggleButton 
                  show={showLoginPassword} 
                  onToggle={() => setShowLoginPassword(!showLoginPassword)} 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.85rem',
                fontSize: '1rem',
                marginTop: '0.5rem',
                fontWeight: '800',
                background: '#f94d4d',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(249, 77, 77, 0.35)',
                transition: 'all 0.2s ease'
              }}
            >
              {loading ? 'Authenticating...' : 'Sign In ➔'}
            </button>

            {/* Unverified Email Warning & Resend Button */}
            {unverifiedEmail && (
              <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '12px', padding: '0.85rem 1rem', textAlign: 'center' }}>
                <p style={{ color: '#b45309', fontSize: '0.85rem', fontWeight: '700', margin: '0 0 0.5rem' }}>
                  ✉️ Email Verification Required
                </p>
                <p style={{ color: '#92400e', fontSize: '0.8rem', margin: '0 0 0.75rem', lineHeight: '1.4' }}>
                  Please check your inbox for <strong>{unverifiedEmail}</strong> and click the link to activate your account.
                </p>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await api.resendVerification(unverifiedEmail);
                      setResendStatus('Verification link resent!');
                    } catch (e) {
                      setResendStatus('Failed to resend link.');
                    }
                  }}
                  style={{ background: '#f59e0b', color: '#ffffff', border: 'none', padding: '0.45rem 1rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer' }}
                >
                  Resend Verification Email ✉️
                </button>
                {resendStatus && <p style={{ fontSize: '0.78rem', color: '#059669', fontWeight: '700', marginTop: '0.4rem', marginBottom: 0 }}>{resendStatus}</p>}
              </div>
            )}

            {/* Forgot Password Link */}
            <div style={{ textAlign: 'center' }}>
              <button
                type="button"
                onClick={() => { setAuthMode('forgot'); setErrorMsg(''); setForgotSent(false); }}
                style={{ background: 'none', border: 'none', color: '#f94d4d', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '2px' }}
              >
                Forgot your password?
              </button>
            </div>
          </form>
        )}

        {/* FORGOT PASSWORD FORM */}
        {authMode === 'forgot' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {forgotSent ? (
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📧</div>
                <h3 style={{ fontSize: '1.15rem', color: '#0b0f19', fontWeight: '800', marginBottom: '0.5rem' }}>Check Your Inbox!</h3>
                <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                  If <strong>{forgotEmail}</strong> is registered with Velora Global, you'll receive a reset link shortly. Check your spam folder too.
                </p>
                <button onClick={() => { setAuthMode('login'); setForgotSent(false); setErrorMsg(''); }} className="btn-coral" style={{ padding: '0.7rem 1.5rem' }}>
                  Back to Login
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '0.25rem' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>🔑</div>
                  <h3 style={{ fontSize: '1.15rem', color: '#0b0f19', fontWeight: '800', margin: '0 0 0.25rem' }}>Reset Your Password</h3>
                  <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>Enter your account email and we'll send you a secure reset link.</p>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '0.35rem' }}>Account Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={forgotEmail}
                    onChange={e => setForgotEmail(e.target.value)}
                    style={{ width: '100%' }}
                  />
                </div>
                {errorMsg && (
                  <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '0.7rem 1rem', color: '#b91c1c', fontSize: '0.85rem', fontWeight: '600' }}>
                    ⚠️ {errorMsg}
                  </div>
                )}
                <button type="submit" disabled={loading} className="btn-coral" style={{ padding: '0.85rem', fontSize: '1rem', fontWeight: '800', opacity: loading ? 0.7 : 1 }}>
                  {loading ? 'Sending Reset Link...' : 'Send Reset Link 📧'}
                </button>
                <button type="button" onClick={() => { setAuthMode('login'); setErrorMsg(''); }} style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '0.85rem', cursor: 'pointer', textAlign: 'center' }}>
                  ← Back to Login
                </button>
              </form>
            )}
          </div>
        )}

        {/* 6-DIGIT OTP VERIFICATION VIEW (10-Minute Expiry) */}
        {(authMode === 'verify_otp' || authMode === 'verify_notice') && (
          <form onSubmit={handleOtpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'center', padding: '1rem 0' }}>
            <div>
              <span className="badge badge-blue" style={{ marginBottom: '0.5rem' }}>10-Minute Security OTP</span>
              <h3 style={{ fontSize: '1.4rem', color: '#0b0f19', fontWeight: '800', marginBottom: '0.35rem' }}>
                Enter 6-Digit Code
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: '1.5' }}>
                We sent a 6-digit verification code to <strong>{registeredEmail || unverifiedEmail || loginEmail}</strong>.<br />
                The code is valid for <strong>10 minutes</strong>.
              </p>
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
                  fontSize: '1.8rem',
                  letterSpacing: '0.4em',
                  textAlign: 'center',
                  fontWeight: '900',
                  padding: '0.75rem',
                  borderRadius: '14px',
                  border: '2px solid #2563eb',
                  background: '#f8fafc',
                  fontFamily: 'monospace',
                  width: '100%',
                  maxWidth: '280px',
                  margin: '0 auto'
                }}
              />
            </div>

            {errorMsg && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '0.75rem 1rem', color: '#dc2626', fontSize: '0.85rem', fontWeight: '600' }}>
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={otpLoading}
              className="btn-primary"
              style={{ padding: '0.85rem 2rem', fontSize: '1rem', fontWeight: '800', width: '100%' }}
            >
              {otpLoading ? 'Verifying Code...' : 'Verify Code & Sign In ➔'}
            </button>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
              <button
                type="button"
                onClick={async () => {
                  try {
                    const target = registeredEmail || unverifiedEmail || loginEmail;
                    await api.resendOtp(target);
                    setErrorMsg('');
                    alert('A new 6-digit verification code has been sent to your email (valid for 10 minutes).');
                  } catch (e) {
                    setErrorMsg('Failed to resend 6-digit code. Please try again.');
                  }
                }}
                style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer' }}
              >
                Resend Code ✉️
              </button>

              <button
                type="button"
                onClick={() => { setAuthMode('login'); setErrorMsg(''); }}
                style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '0.85rem', cursor: 'pointer' }}
              >
                ← Back to Sign In
              </button>
            </div>
          </form>
        )}

        {/* ROLE-BASED SIGNUP FORM */}
        {authMode === 'signup' && (
          <div>
            {/* Signup Role Selector Toggle */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', background: '#f8fafc', padding: '0.35rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <button
                type="button"
                onClick={() => { setSignupRole('student'); setErrorMsg(''); }}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: signupRole === 'student' ? '#f94d4d' : 'transparent',
                  color: signupRole === 'student' ? '#ffffff' : '#64748b',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                Student Candidate
              </button>
              <button
                type="button"
                onClick={() => { setSignupRole('client'); setErrorMsg(''); }}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: signupRole === 'client' ? '#f94d4d' : 'transparent',
                  color: signupRole === 'client' ? '#ffffff' : '#64748b',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                Corporate Client
              </button>
            </div>

            {/* Student Registration Form */}
            {signupRole === 'student' && (
              <form onSubmit={handleStudentSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '0.35rem' }}>
                    Full Name *
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Aarav Sharma"
                    value={studentData.name}
                    onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
                    style={{ width: '100%', fontSize: '0.95rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '0.35rem' }}>
                    Email Address *
                  </label>
                  <input 
                    type="email" 
                    required
                    placeholder="student@example.com"
                    value={studentData.email}
                    onChange={(e) => setStudentData({ ...studentData, email: e.target.value })}
                    style={{ width: '100%', fontSize: '0.95rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '0.35rem' }}>
                    Create Password *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type={showStudentPassword ? "text" : "password"} 
                      required
                      placeholder="Min 8 chars, 1 number & 1 special char"
                      value={studentData.password}
                      onChange={(e) => setStudentData({ ...studentData, password: e.target.value })}
                      style={{ width: '100%', paddingRight: '2.5rem', fontSize: '0.95rem' }}
                    />
                    <EyeToggleButton 
                      show={showStudentPassword} 
                      onToggle={() => setShowStudentPassword(!showStudentPassword)} 
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '0.35rem' }}>
                    Confirm Password *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type={showStudentConfirmPassword ? "text" : "password"} 
                      required
                      placeholder="Re-enter password"
                      value={studentData.confirmPassword}
                      onChange={(e) => setStudentData({ ...studentData, confirmPassword: e.target.value })}
                      style={{ width: '100%', paddingRight: '2.5rem', fontSize: '0.95rem' }}
                    />
                    <EyeToggleButton 
                      show={showStudentConfirmPassword} 
                      onToggle={() => setShowStudentConfirmPassword(!showStudentConfirmPassword)} 
                    />
                  </div>
                  {studentData.password && (
                    <PasswordChecklist 
                      password={studentData.password} 
                      confirmPassword={studentData.confirmPassword} 
                    />
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '0.35rem' }}>
                    University / Institution
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. Tribhuvan University"
                    value={studentData.university}
                    onChange={(e) => setStudentData({ ...studentData, university: e.target.value })}
                    style={{ width: '100%', fontSize: '0.95rem' }}
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '0.85rem',
                    fontSize: '1rem',
                    marginTop: '0.5rem',
                    fontWeight: '800',
                    background: '#f94d4d',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(249, 77, 77, 0.35)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {loading ? 'Creating Account...' : 'Register as Student Candidate ➔'}
                </button>
              </form>
            )}

            {/* Corporate Client Registration Form */}
            {signupRole === 'client' && (
              <form onSubmit={handleClientSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '0.35rem' }}>
                    Full Name / Representative *
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Puja Rouniyar"
                    value={clientData.name}
                    onChange={(e) => setClientData({ ...clientData, name: e.target.value })}
                    style={{ width: '100%', fontSize: '0.95rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '0.35rem' }}>
                    Company / Organization Name *
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Velora Enterprises"
                    value={clientData.companyName}
                    onChange={(e) => setClientData({ ...clientData, companyName: e.target.value })}
                    style={{ width: '100%', fontSize: '0.95rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '0.35rem' }}>
                    Business Email *
                  </label>
                  <input 
                    type="email" 
                    required
                    placeholder="contact@company.com"
                    value={clientData.email}
                    onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
                    style={{ width: '100%', fontSize: '0.95rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '0.35rem' }}>
                    Create Password *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type={showClientPassword ? "text" : "password"} 
                      required
                      placeholder="Min 8 chars, 1 number & 1 special char"
                      value={clientData.password}
                      onChange={(e) => setClientData({ ...clientData, password: e.target.value })}
                      style={{ width: '100%', paddingRight: '2.5rem', fontSize: '0.95rem' }}
                    />
                    <EyeToggleButton 
                      show={showClientPassword} 
                      onToggle={() => setShowClientPassword(!showClientPassword)} 
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '0.35rem' }}>
                    Confirm Password *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type={showClientConfirmPassword ? "text" : "password"} 
                      required
                      placeholder="Re-enter password"
                      value={clientData.confirmPassword}
                      onChange={(e) => setClientData({ ...clientData, confirmPassword: e.target.value })}
                      style={{ width: '100%', paddingRight: '2.5rem', fontSize: '0.95rem' }}
                    />
                    <EyeToggleButton 
                      show={showClientConfirmPassword} 
                      onToggle={() => setShowClientConfirmPassword(!showClientConfirmPassword)} 
                    />
                  </div>
                  {clientData.password && (
                    <PasswordChecklist 
                      password={clientData.password} 
                      confirmPassword={clientData.confirmPassword} 
                    />
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '0.35rem' }}>
                    Phone Number
                  </label>
                  <input 
                    type="tel" 
                    placeholder="+977 9800000000"
                    value={clientData.phone}
                    onChange={(e) => setClientData({ ...clientData, phone: e.target.value })}
                    style={{ width: '100%', fontSize: '0.95rem' }}
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '0.85rem',
                    fontSize: '1rem',
                    marginTop: '0.5rem',
                    fontWeight: '800',
                    background: '#f94d4d',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(249, 77, 77, 0.35)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {loading ? 'Creating Account...' : 'Register Corporate Client ➔'}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
