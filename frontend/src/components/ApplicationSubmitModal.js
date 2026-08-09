import React, { useState } from 'react';
import { api } from '../services/api';

export default function ApplicationSubmitModal({ program, selectedTier, currentUser, onClose, onSuccess }) {
  const [statementOfPurpose, setStatementOfPurpose] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      // Parse numeric fee from tier string e.g. "NPR 199" -> 199
      const feeMatch = (selectedTier.fee || '').match(/\d[\d,]*/);
      const feeNum = feeMatch ? parseInt(feeMatch[0].replace(/,/g, ''), 10) : 199;

      const appData = {
        studentId: currentUser.id,
        studentName: currentUser.name,
        studentEmail: currentUser.email,
        programId: program.id || `prog-${Date.now()}`,
        programTitle: program.title,
        domain: program.domain,
        programTrack: program.domain.includes('Training') ? 'Guided Skill Training' : 'Practical Internship',
        selectedDuration: selectedTier.duration,
        feeAmount: feeNum,
        statementOfPurpose,
        portfolioUrl,
        resumeUrl
      };

      const res = await api.submitApplication(appData);
      if (res) {
        alert('🎉 Application submitted successfully to the Velora Global Executive Desk for approval!');
        if (onSuccess) onSuccess();
        onClose();
      }
    } catch (err) {
      setErrorMsg(err.message || 'Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ padding: '1rem', zIndex: 1100 }}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{
          maxWidth: '560px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: '24px',
          padding: '2.25rem 2rem',
          boxShadow: 'var(--shadow-lg)',
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

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <span className="badge badge-coral" style={{ marginBottom: '0.5rem' }}>
            Official Application Submission
          </span>
          <h2 style={{ fontSize: '1.8rem', color: '#0b0f19', marginBottom: '0.35rem', fontWeight: '800' }}>
            {program.title}
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Selected Track: <strong style={{ color: '#0b0f19' }}>{selectedTier.duration} ({selectedTier.fee})</strong>
          </p>
        </div>

        {errorMsg && (
          <div style={{ padding: '0.85rem 1rem', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '10px', color: '#dc2626', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
            ⚠️ {errorMsg}
          </div>
        )}

        {/* Student Profile Info Preview Box */}
        <div style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '14px',
          padding: '1rem 1.25rem',
          marginBottom: '1.5rem',
          fontSize: '0.88rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
            <span style={{ color: '#64748b', fontWeight: '600' }}>Applicant Name:</span>
            <strong style={{ color: '#0b0f19' }}>{currentUser.name}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#64748b', fontWeight: '600' }}>Registered Email:</span>
            <strong style={{ color: '#0b0f19' }}>{currentUser.email}</strong>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '0.35rem' }}>
              Statement of Purpose / Why do you want to join this program? *
            </label>
            <textarea 
              required
              rows={3}
              placeholder="Briefly describe your interest and goals in this track..."
              value={statementOfPurpose}
              onChange={(e) => setStatementOfPurpose(e.target.value)}
              style={{ width: '100%', fontSize: '0.9rem', padding: '0.75rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '0.35rem' }}>
              Portfolio / GitHub Link (Optional)
            </label>
            <input 
              type="url" 
              placeholder="https://github.com/yourusername"
              value={portfolioUrl}
              onChange={(e) => setPortfolioUrl(e.target.value)}
              style={{ width: '100%', fontSize: '0.9rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '0.35rem' }}>
              Resume / CV Link (Optional)
            </label>
            <input 
              type="url" 
              placeholder="https://drive.google.com/your-resume-pdf"
              value={resumeUrl}
              onChange={(e) => setResumeUrl(e.target.value)}
              style={{ width: '100%', fontSize: '0.9rem' }}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.9rem',
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
            {loading ? 'Submitting Application...' : 'Submit Application to Admin ➔'}
          </button>
        </form>

      </div>
    </div>
  );
}
