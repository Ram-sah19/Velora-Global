import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { api } from '../../services/api';
import { useDialog } from '../../components/DialogShell';
import { INTERNSHIP_APPLICATION_FORM_URL } from '../../constants';
import { INTERNSHIP_TIERS } from '../../content/siteFacts';
import { getTierContent } from '../../content/domainTiers';

const GOOGLE_FORM_URL = INTERNSHIP_APPLICATION_FORM_URL;

const TIER_IDS = ['2w', '1m', '2m', '3m', '6m'];

// The durations and fees are the ones published on the page and in the schema;
// only the track description differs per domain.
function getDomainDurationTiers(domainTitle = '', domainCategory = '') {
  const content = getTierContent(domainTitle, domainCategory);
  return INTERNSHIP_TIERS.map((tier, i) => ({
    id: TIER_IDS[i],
    duration: tier.duration,
    fee: tier.fee,
    bestFor: content[i].bestFor,
    deliverables: content[i].deliverables
  }));
}

export default function InternshipDetailsModal({ program, currentUser, onApplySuccess, onClose }) {
  const [selectedTier, setSelectedTier] = useState('2w');
  const panelRef = useDialog(!!program, onClose);

  if (!program) return null;

  const durationTiers = getDomainDurationTiers(program.title, program.domain);
  const activeT = durationTiers.find(t => t.id === selectedTier) || durationTiers[0];

  const handleApplyClick = () => {
    // 1. Instantly close the popup modal
    onClose();

    // 2. Instantly open the official Google Form in a new tab
    window.open(GOOGLE_FORM_URL, '_blank');
    if (onApplySuccess) onApplySuccess();

    // 3. Record application in backend in the background
    const feeMatch = (activeT.fee || '').match(/\d[\d,]*/);
    const feeNum = feeMatch ? parseInt(feeMatch[0].replace(/,/g, ''), 10) : 199;

    api.submitApplication({
      studentId: currentUser ? currentUser.id : `guest-${Date.now()}`,
      studentName: currentUser ? currentUser.name : '',
      studentEmail: currentUser ? currentUser.email : '',
      programId: program.id || `prog-${Date.now()}`,
      programTitle: program.title,
      domain: program.domain,
      programTrack: 'Practical Internship',
      selectedDuration: activeT.duration,
      feeAmount: feeNum,
      statementOfPurpose: 'Application via Google Form Link'
    }).catch(e => {
      console.warn("Recorded application locally", e);
    });
  };

  const modalJSX = (
    <div 
      className="modal-overlay" 
      onClick={onClose} 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(11, 15, 25, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        overflowY: 'auto',
        boxSizing: 'border-box'
      }}
    >
      <div 
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="internship-details-title"
        tabIndex={-1}
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{
          maxWidth: '680px',
          width: '100%',
          maxHeight: 'min(90vh, 760px)',
          overflowY: 'auto',
          borderRadius: '24px',
          padding: '2.25rem 2rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
          background: '#ffffff',
          position: 'relative',
          margin: 'auto',
          boxSizing: 'border-box'
        }}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          aria-label="Close dialog"
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
          <span aria-hidden="true">&#215;</span>
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <span className="badge badge-coral">{program.domain}</span>
            <span className="badge badge-blue">Practical Internship</span>
          </div>

          <h2 id="internship-details-title" style={{ fontSize: '2rem', color: '#0b0f19', marginBottom: '0.5rem', fontWeight: '800' }}>
            {program.title}
          </h2>

          <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6' }}>
            {program.description}
          </p>
        </div>

        {/* Required Tech Stack */}
        <div style={{ marginBottom: '1.75rem' }}>
          <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: '700', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Technologies & Tools Covered:
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
            {(program.skillsRequired || []).map((skill, i) => (
              <span key={i} style={{
                fontSize: '0.82rem',
                background: '#fff5f5',
                border: '1px solid #ffe3e3',
                padding: '0.3rem 0.75rem',
                borderRadius: '6px',
                color: '#0b0f19',
                fontWeight: '700'
              }}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Duration Tier & Deliverables Section */}
        <div style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '18px',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <span style={{ fontSize: '0.85rem', color: '#0b0f19', fontWeight: '800', display: 'block', marginBottom: '0.75rem' }}>
            Select Duration Tier for {program.domain}:
          </span>

          {/* Interactive Tier Selection Tabs */}
          <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
            {durationTiers.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTier(t.id)}
                style={{
                  padding: '0.55rem 0.95rem',
                  borderRadius: '10px',
                  border: selectedTier === t.id ? '2px solid #ff6b6b' : '1px solid #cbd5e1',
                  background: selectedTier === t.id ? '#ff6b6b' : '#ffffff',
                  color: selectedTier === t.id ? '#ffffff' : '#475569',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  boxShadow: selectedTier === t.id ? 'var(--shadow-sm)' : 'none'
                }}
              >
                {t.duration} ({t.fee})
              </button>
            ))}
          </div>

          {/* Active Selected Tier Card Details */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '1.25rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
              <span style={{ fontSize: '1rem', fontWeight: '800', color: '#0b0f19' }}>
                {activeT.duration} Track — <span style={{ color: '#ff6b6b' }}>{activeT.fee}</span>
              </span>
              <span className="badge badge-coral" style={{ fontSize: '0.75rem' }}>
                {activeT.bestFor}
              </span>
            </div>

            <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: '700', display: 'block', marginBottom: '0.6rem' }}>
              Included {program.domain} Deliverables:
            </span>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.88rem', color: '#334155' }}>
              {activeT.deliverables.map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#ff6b6b', fontWeight: '800' }}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
          <div>
            <span style={{ display: 'block', fontSize: '0.78rem', color: '#64748b' }}>Selected Tier Fee</span>
            <span style={{ fontSize: '1.3rem', fontWeight: '800', color: '#ff6b6b' }}>
              {activeT.fee} <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: '600' }}>({activeT.duration})</span>
            </span>
          </div>

          <button 
            onClick={handleApplyClick}
            className="btn-coral"
            style={{ padding: '0.75rem 1.75rem', fontSize: '0.95rem', fontWeight: '800', cursor: 'pointer', borderRadius: '10px' }}
          >
            Apply for Internship
          </button>
        </div>

      </div>
    </div>
  );

  return typeof document !== 'undefined' ? ReactDOM.createPortal(modalJSX, document.body) : modalJSX;
}
