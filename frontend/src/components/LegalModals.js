import React from 'react';

export function TermsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(11, 15, 25, 0.65)',
      backdropFilter: 'blur(4px)',
      zIndex: 99999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '20px',
        width: '100%',
        maxWidth: '720px',
        maxHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 60px rgba(0,0,0,0.2)',
        overflow: 'hidden'
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '1.5rem 2rem',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <span style={{ fontSize: '0.78rem', color: '#2563eb', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Governance & Policies
            </span>
            <h3 style={{ margin: '0.2rem 0 0 0', fontSize: '1.4rem', color: '#0a2540', fontWeight: '800' }}>
              Terms & Conditions
            </h3>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: '#f1f5f9',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              cursor: 'pointer',
              fontSize: '1.2rem',
              fontWeight: '700',
              color: '#64748b'
            }}
          >
            ✕
          </button>
        </div>

        {/* Modal Body Scrollable */}
        <div style={{
          padding: '2rem',
          overflowY: 'auto',
          color: '#334155',
          fontSize: '0.92rem',
          lineHeight: '1.7'
        }}>
          <p><strong>Last Updated: August 2026</strong></p>
          
          <h4 style={{ color: '#0a2540', marginTop: '1.25rem', marginBottom: '0.4rem' }}>1. Acceptance of Terms</h4>
          <p>By accessing or enrolling in any program, training track, or internship offered by Velora Global ("the Platform"), you agree to abide by these Terms and Conditions. If you do not agree, please discontinue platform usage.</p>

          <h4 style={{ color: '#0a2540', marginTop: '1.25rem', marginBottom: '0.4rem' }}>2. Programs & Deliverables</h4>
          <p>Velora Global provides practical project-oriented internships and skill development programs. Candidates are required to submit original code deliverables according to domain milestones. All submissions are reviewed under our 5-criteria evaluation framework.</p>

          <h4 style={{ color: '#0a2540', marginTop: '1.25rem', marginBottom: '0.4rem' }}>3. Academic Integrity & Code Originality</h4>
          <p>All project work must represent the candidate's authentic effort. Plagiarism, direct repository duplication without attribution, or submitting fraudulent repositories will result in immediate disqualification without credential issuance.</p>

          <h4 style={{ color: '#0a2540', marginTop: '1.25rem', marginBottom: '0.4rem' }}>4. Certificate Verification & Credentials</h4>
          <p>Completion certificates are issued upon successful completion of required milestones and passing grade marks. Each certificate possesses a unique verification ID verifiable via our public verification registry.</p>

          <h4 style={{ color: '#0a2540', marginTop: '1.25rem', marginBottom: '0.4rem' }}>5. Contact & Inquiries</h4>
          <p>For questions regarding terms, enrollment, or client solutions, email: <strong>support@velora-global.online</strong>.</p>
        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '1.25rem 2rem',
          borderTop: '1px solid #e2e8f0',
          background: '#f8fafc',
          textAlign: 'right'
        }}>
          <button 
            onClick={onClose}
            className="btn-primary"
            style={{ padding: '0.6rem 1.6rem', fontSize: '0.9rem' }}
          >
            I Understand & Close
          </button>
        </div>
      </div>
    </div>
  );
}

export function PrivacyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(11, 15, 25, 0.65)',
      backdropFilter: 'blur(4px)',
      zIndex: 99999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '20px',
        width: '100%',
        maxWidth: '720px',
        maxHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 60px rgba(0,0,0,0.2)',
        overflow: 'hidden'
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '1.5rem 2rem',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <span style={{ fontSize: '0.78rem', color: '#2563eb', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Data & Privacy
            </span>
            <h3 style={{ margin: '0.2rem 0 0 0', fontSize: '1.4rem', color: '#0a2540', fontWeight: '800' }}>
              Privacy Policy
            </h3>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: '#f1f5f9',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              cursor: 'pointer',
              fontSize: '1.2rem',
              fontWeight: '700',
              color: '#64748b'
            }}
          >
            ✕
          </button>
        </div>

        {/* Modal Body Scrollable */}
        <div style={{
          padding: '2rem',
          overflowY: 'auto',
          color: '#334155',
          fontSize: '0.92rem',
          lineHeight: '1.7'
        }}>
          <p><strong>Last Updated: August 2026</strong></p>
          
          <h4 style={{ color: '#0a2540', marginTop: '1.25rem', marginBottom: '0.4rem' }}>1. Information We Collect</h4>
          <p>We collect personal information necessary to deliver educational and enterprise services, including your name, email address, contact information, project submissions, and authentication logs.</p>

          <h4 style={{ color: '#0a2540', marginTop: '1.25rem', marginBottom: '0.4rem' }}>2. Use of Essential Session Cookies</h4>
          <p>Velora Global uses strictly necessary HTTP-only session cookies (<code>velora_refresh_token</code>) to maintain secure user login sessions. <strong>We do not use advertising cookies, third-party tracking pixels, or sell user data.</strong></p>

          <h4 style={{ color: '#0a2540', marginTop: '1.25rem', marginBottom: '0.4rem' }}>3. Data Protection & Security</h4>
          <p>All sensitive information, passwords, and sessions are encrypted using industry-standard hashing (bcrypt) and SSL/TLS cryptographic communication protocols.</p>

          <h4 style={{ color: '#0a2540', marginTop: '1.25rem', marginBottom: '0.4rem' }}>4. Your Rights</h4>
          <p>You may request access, corrections, or full deletion of your user account and personal data at any time by contacting our data protection team at <strong>support@velora-global.online</strong>.</p>
        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '1.25rem 2rem',
          borderTop: '1px solid #e2e8f0',
          background: '#f8fafc',
          textAlign: 'right'
        }}>
          <button 
            onClick={onClose}
            className="btn-primary"
            style={{ padding: '0.6rem 1.6rem', fontSize: '0.9rem' }}
          >
            Close Policy
          </button>
        </div>
      </div>
    </div>
  );
}
