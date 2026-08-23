import React from 'react';
import VeloraLogo from './VeloraLogo';

export default function CertificateModal({ certificate, onClose }) {
  if (!certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '850px',
          background: '#ffffff',
          color: '#0f172a',
          padding: '3rem',
          borderRadius: '16px',
          border: '12px solid #0b0f19',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
          fontFamily: 'serif',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: '#e2e8f0',
            color: '#0f172a',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            fontSize: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ✕
        </button>

        {/* Certificate Outer Border Frame */}
        <div style={{
          border: '2px solid #cbd5e1',
          padding: '2.5rem',
          textAlign: 'center',
          position: 'relative'
        }}>
          
          {/* Official Velora Logo Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <VeloraLogo width={52} height={52} showText={true} textColor="#0b0f19" />
          </div>

          <h1 style={{ fontSize: '2.5rem', fontWeight: '400', fontFamily: 'Georgia, serif', color: '#0b0f19', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Certificate of Completion
          </h1>
          <p style={{ fontSize: '1rem', fontStyle: 'italic', color: '#64748b', marginBottom: '1.75rem' }}>
            This is proudly awarded to
          </p>

          <h2 style={{ fontSize: '2.6rem', fontWeight: '700', color: '#0b0f19', fontFamily: "'Outfit', sans-serif", textDecoration: 'underline', textDecorationColor: '#e5a93c', marginBottom: '1.5rem' }}>
            {certificate.studentName}
          </h2>

          <p style={{ fontSize: '1.05rem', color: '#334155', maxWidth: '650px', margin: '0 auto 2rem auto', lineHeight: '1.7', fontFamily: 'Georgia, serif' }}>
            for successfully completing the <strong>{certificate.duration}</strong> practical program in <strong>{certificate.programTitle}</strong> at <strong>Velora Global</strong> with an overall performance grade of <strong style={{ color: '#059669' }}>{certificate.grade}</strong>.
          </p>

          {/* Verification Code Box */}
          <div style={{
            display: 'inline-block',
            background: '#f8fafc',
            border: '1px dashed #cbd5e1',
            padding: '0.5rem 1.5rem',
            borderRadius: '8px',
            marginBottom: '2.5rem',
            fontFamily: 'monospace',
            fontSize: '0.9rem',
            color: '#475569'
          }}>
            Certificate ID: <strong>{certificate.certificateId}</strong> • Issued: {certificate.issueDate}
          </div>

          {/* Signatures Section */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '2rem',
            alignItems: 'flex-end',
            marginTop: '1rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid #e2e8f0'
          }}>
            <div>
              <div style={{ fontFamily: "'Brush Script MT', cursive, sans-serif", fontSize: '1.8rem', color: '#0b0f19', marginBottom: '0.25rem' }}>
                Ram Sah
              </div>
              <div style={{ borderTop: '1px solid #94a3b8', paddingTop: '0.35rem', fontSize: '0.85rem', fontWeight: 'bold', color: '#0b0f19', fontFamily: 'sans-serif' }}>
                Ram Sah
              </div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'sans-serif' }}>Founder & CEO</span>
            </div>

            <div>
              <div style={{
                width: '70px',
                height: '70px',
                margin: '0 auto 0.25rem auto',
                border: '2px solid #cbd5e1',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.65rem',
                color: '#64748b',
                fontFamily: 'sans-serif',
                textAlign: 'center',
                padding: '0.25rem'
              }}>
                [QR Verified]
              </div>
              <span style={{ fontSize: '0.7rem', color: '#64748b', fontFamily: 'sans-serif' }}>Scan to Verify</span>
            </div>

            <div>
              <div style={{ fontFamily: "'Brush Script MT', cursive, sans-serif", fontSize: '1.8rem', color: '#0b0f19', marginBottom: '0.25rem' }}>
                Krishna & Rohit
              </div>
              <div style={{ borderTop: '1px solid #94a3b8', paddingTop: '0.35rem', fontSize: '0.85rem', fontWeight: 'bold', color: '#0b0f19', fontFamily: 'sans-serif' }}>
                Krishna S. & Rohit S.
              </div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'sans-serif' }}>Co-Founders</span>
            </div>
          </div>

        </div>

        {/* Action Button */}
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <button 
            onClick={handlePrint}
            className="btn-coral"
            style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}
          >
            🖨️ Print / Save Official Certificate PDF
          </button>
        </div>

      </div>
    </div>
  );
}
