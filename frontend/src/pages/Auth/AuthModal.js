import React, { useState } from 'react';
import { api } from '../../services/api';

// Password criteria validator helper
function getPasswordValidation(password, confirmPassword = null) {
  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
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
  const [authMode, setAuthMode] = useState(initialMode); // 'login' or 'signup'
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

  // Unified Role-Agnostic Login
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
      setErrorMsg(err.message || 'Login failed. Please check your email and password.');
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
        name: studentData.name,
        email: studentData.email,
        password: studentData.password,
        university: studentData.university,
        fieldOfStudy: studentData.fieldOfStudy
      });

      if (res && res.user) {
        if (onAuthSuccess) onAuthSuccess(res.user);
        onClose();
      }
    } catch (err) {
      setErrorMsg(err.message || 'Student registration failed.');
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
        name: clientData.name,
        companyName: clientData.companyName,
        email: clientData.email,
        phone: clientData.phone,
        password: clientData.password
      });

      if (res && res.user) {
        if (onAuthSuccess) onAuthSuccess(res.user);
        onClose();
      }
    } catch (err) {
      setErrorMsg(err.message || 'Corporate client registration failed.');
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
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: '24px',
          padding: '2.25rem 2rem',
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
            <span>⚠️</span>
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
