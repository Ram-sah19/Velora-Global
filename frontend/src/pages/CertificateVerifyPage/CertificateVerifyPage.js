import React, { useState } from 'react';
import { api } from '../../services/api';

export default function CertificateVerifyPage() {
  const [certId, setCertId] = useState('VG-2026-88491');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!certId.trim()) return;

    setLoading(true);
    setSearched(true);
    try {
      const data = await api.verifyCertificate(certId.trim());
      setResult(data);
    } catch (err) {
      setResult({ valid: false, message: err.message || 'Certificate ID not found in Velora Global database' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ padding: '4rem 0', minHeight: '70vh' }}>
      <div className="container" style={{ maxWidth: '750px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="badge badge-coral" style={{ marginBottom: '0.75rem' }}>Credential Verification</span>
          <h2 style={{ fontSize: '2.5rem', color: '#0b0f19', marginBottom: '1rem' }}>
            Verify Official <span className="text-blue">Velora Global</span> Certificate
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem' }}>
            Instantly verify authentic internship completion credentials issued by Velora Global.
          </p>
        </div>

        {/* Verification Form Card */}
        <div className="corporate-card" style={{ padding: '2.5rem', marginBottom: '2.5rem' }}>
          <form onSubmit={handleVerify} style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
            <label style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: '600' }}>Enter Certificate ID / Reference Number</label>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <input 
                type="text" 
                placeholder="e.g. VG-2026-88491"
                required
                value={certId}
                onChange={(e) => setCertId(e.target.value)}
                style={{ flex: 1, fontSize: '1.1rem', letterSpacing: '0.05em', fontWeight: '700' }}
              />
              <button type="submit" className="btn-primary" style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}>
                {loading ? 'Verifying...' : 'Verify Now 🔍'}
              </button>
            </div>
          </form>
        </div>

        {/* Verification Result Display */}
        {searched && (
          <div>
            {result && result.valid ? (
              <div className="corporate-card" style={{ padding: '2.5rem', border: '2px solid #10b981', background: '#ecfdf5' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '2rem' }}>✅</span>
                  <div>
                    <h3 style={{ fontSize: '1.5rem', color: '#059669' }}>Official Certificate Verified</h3>
                    <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: '600' }}>Authentic Credential Issued by Velora Global</span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', padding: '1.25rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block' }}>Student Candidate</span>
                    <strong style={{ fontSize: '1.1rem', color: '#0b0f19' }}>{result.certificate.studentName}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block' }}>Program & Domain</span>
                    <strong style={{ fontSize: '1.1rem', color: '#0b0f19' }}>{result.certificate.programTitle}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block' }}>Overall Grade</span>
                    <strong style={{ fontSize: '1.1rem', color: '#059669' }}>{result.certificate.grade}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block' }}>Issue Date</span>
                    <strong style={{ fontSize: '1.1rem', color: '#0b0f19' }}>{result.certificate.issueDate}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block' }}>Founder Signature</span>
                    <strong style={{ fontSize: '1.1rem', color: '#2563eb' }}>{result.certificate.founderSignature} (Founder & CEO)</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block' }}>Co-Founders</span>
                    <strong style={{ fontSize: '1.1rem', color: '#ff6b6b' }}>Puja Rouniyar & Rohit Sah</strong>
                  </div>
                </div>
              </div>
            ) : (
              <div className="corporate-card" style={{ padding: '2.5rem', border: '2px solid #ff6b6b', background: '#fff5f5', textAlign: 'center' }}>
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.5rem' }}>⚠️</span>
                <h3 style={{ fontSize: '1.4rem', color: '#e03131', marginBottom: '0.5rem' }}>Certificate Not Found</h3>
                <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
                  The Certificate ID <strong>"{certId}"</strong> was not matched in official Velora Global records.
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
