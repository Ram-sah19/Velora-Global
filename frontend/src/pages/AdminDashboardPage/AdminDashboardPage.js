import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { showToast } from '../../components/NotificationToast';

const ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9-]{3,31}$/;

const LABEL = { display: 'block', fontSize: '0.85rem', color: '#475569', marginBottom: '0.35rem', fontWeight: 700 };
const INPUT = { width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.95rem', color: '#0b0f19', background: '#ffffff', boxSizing: 'border-box' };
const TILE = { textAlign: 'center', padding: '0.5rem 1rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', minWidth: '92px' };

function navStyle(active) {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.75rem 1rem',
    borderRadius: '10px',
    border: 'none',
    background: active ? '#2563eb' : 'transparent',
    color: active ? '#ffffff' : '#334155',
    fontWeight: 700,
    fontSize: '0.88rem',
    cursor: 'pointer',
    textAlign: 'left'
  };
}

export default function AdminDashboardPage({ currentUser, onCertificateOpen, onLogout }) {
  const [section, setSection] = useState('issue');
  const [certificates, setCertificates] = useState([]);
  const [form, setForm] = useState({
    certificateId: '',
    studentName: '',
    programTitle: '',
    duration: '',
    issueDate: new Date().toISOString().slice(0, 10)
  });
  const [issued, setIssued] = useState(null);
  const [saving, setSaving] = useState(false);

  const loadRecords = async () => {
    const certs = await api.getCertificates().catch(() => []);
    setCertificates(Array.isArray(certs) ? certs : []);
  };

  useEffect(() => {
    loadRecords();
  }, []);

  const set = (key) => (event) => setForm(prev => ({ ...prev, [key]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    const certificateId = form.certificateId.trim().toUpperCase();
    if (!ID_PATTERN.test(certificateId)) {
      showToast('Use letters, numbers and dashes for the certificate number (at least 4 characters).', 'error');
      return;
    }
    setSaving(true);
    try {
      const res = await api.createCertificate({
        certificateId,
        studentName: form.studentName.trim(),
        programTitle: form.programTitle.trim(),
        duration: form.duration.trim(),
        issueDate: form.issueDate
      });
      setIssued(res.certificate);
      onCertificateOpen?.(res.certificate);
      showToast(`Certificate ${certificateId} issued.`, 'success');
      loadRecords();
    } catch (err) {
      showToast(err.message || 'Could not issue the certificate.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section style={{ padding: '2rem 0 4rem', minHeight: '80vh', width: '100%', background: '#f8fafc' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>

        {/* Staff header with register counts */}
        <div className="corporate-card" style={{
          padding: '1.5rem 2rem',
          marginBottom: '1.5rem',
          background: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.25rem',
          borderRadius: '16px',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <img
              src="/media/rambilas_sah.jpg"
              alt="Rambilas Sah"
              style={{ width: '65px', height: '65px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #2563eb' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.15rem', flexWrap: 'wrap' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: '#0b0f19', margin: 0 }}>Rambilas Sah</h2>
                <span className="badge badge-coral" style={{ fontSize: '0.72rem' }}>Founder &amp; CEO</span>
              </div>
              <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>
                Staff desk • signed in as {currentUser?.name || 'administrator'}
              </p>
              <span style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: '600' }}>
                Co-founders: Krishna Sah (CTO) &amp; Rohit Sah (COO)
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{ ...TILE, background: '#eff6ff', borderColor: '#bfdbfe' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#2563eb', display: 'block' }}>{certificates.length}</span>
              <span style={{ fontSize: '0.72rem', color: '#1e40af', fontWeight: 700 }}>Certificates Issued</span>
            </div>
          </div>
        </div>

        <div className="staff-layout">
          {/* Sidebar */}
          <aside style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '1.25rem',
            border: '1px solid #e2e8f0',
            alignSelf: 'start'
          }}>
            <div style={{ paddingBottom: '0.75rem', marginBottom: '0.75rem', borderBottom: '1px solid #f1f5f9' }}>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', fontWeight: 700 }}>
                Certificates
              </span>
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <button onClick={() => setSection('issue')} style={navStyle(section === 'issue')}>
                <span>Issue Certificate</span>
                <span style={{ fontSize: '0.75rem', opacity: 0.85 }}>+</span>
              </button>
              <button onClick={() => setSection('register')} style={navStyle(section === 'register')}>
                <span>Issued Register</span>
                <span style={{
                  fontSize: '0.72rem',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '12px',
                  background: section === 'register' ? 'rgba(255,255,255,0.25)' : '#f1f5f9',
                  color: section === 'register' ? '#ffffff' : '#64748b'
                }}>
                  {certificates.length}
                </span>
              </button>
            </nav>
            <button onClick={onLogout} className="btn-secondary" style={{ marginTop: '1.25rem', width: '100%', padding: '0.6rem', fontSize: '0.82rem' }}>
              Sign out
            </button>
          </aside>

          {/* Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: 0 }}>
            {section === 'issue' && (
              <div className="corporate-card" style={{ padding: '2rem', background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: '#0b0f19', margin: '0 0 0.35rem' }}>
                  Issue a certificate
                </h1>
                <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '0 0 1.75rem' }}>
                  The certificate number you enter here is the number the recipient writes on their
                  certificate and the number the public verification form looks up.
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem', maxWidth: '560px' }}>
                  <div>
                    <label htmlFor="cert-id" style={LABEL}>Certificate number *</label>
                    <input
                      id="cert-id"
                      type="text"
                      required
                      autoComplete="off"
                      spellCheck="false"
                      value={form.certificateId}
                      onChange={set('certificateId')}
                      placeholder="VG-2026-48213"
                      aria-describedby="cert-id-hint"
                      style={{ ...INPUT, fontFamily: 'monospace', textTransform: 'uppercase' }}
                    />
                    <span id="cert-id-hint" style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      Letters, numbers and dashes. Must not already be in use.
                    </span>
                  </div>

                  <div>
                    <label htmlFor="cert-name" style={LABEL}>Recipient name *</label>
                    <input id="cert-name" type="text" required value={form.studentName} onChange={set('studentName')} placeholder="As it should appear on the certificate" style={INPUT} />
                  </div>

                  <div>
                    <label htmlFor="cert-program" style={LABEL}>Internship name *</label>
                    <input id="cert-program" type="text" required value={form.programTitle} onChange={set('programTitle')} placeholder="Full Stack Development with AI Internship" style={INPUT} />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label htmlFor="cert-duration" style={LABEL}>Duration *</label>
                      <input id="cert-duration" type="text" required value={form.duration} onChange={set('duration')} placeholder="2 Weeks" style={INPUT} />
                    </div>
                    <div>
                      <label htmlFor="cert-date" style={LABEL}>Date of issue *</label>
                      <input id="cert-date" type="date" required value={form.issueDate} onChange={set('issueDate')} style={INPUT} />
                    </div>
                  </div>

                  <button type="submit" className="btn-premium" disabled={saving} style={{ padding: '0.8rem' }}>
                    {saving ? 'Issuing...' : 'Issue certificate'}
                  </button>
                </form>

                {issued && (
                  <div style={{ marginTop: '1.5rem', padding: '1rem 1.15rem', background: '#f0fdf4', border: '1px solid #a7f3d0', borderRadius: '12px' }}>
                    <span className="badge badge-green">Now verifiable</span>
                    <p style={{ margin: '0.6rem 0 0', fontSize: '0.88rem', color: '#334155', lineHeight: '1.65' }}>
                      <strong style={{ fontFamily: 'monospace' }}>{issued.certificateId}</strong> is in the
                      certificate register. Anyone who enters it on the{' '}
                      <a href="https://velora-global.online/internships#verify-certificate" style={{ color: '#1d4ed8', fontWeight: 700 }}>verification form</a>{' '}
                      now sees {issued.studentName}.
                    </p>
                  </div>
                )}
              </div>
            )}

            {section === 'register' && (
              <div className="corporate-card" style={{ padding: '2rem', background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: '#0b0f19', margin: '0 0 0.35rem' }}>
                  Certificates issued ({certificates.length})
                </h1>
                <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '0 0 1.5rem' }}>
                  Every number below is live on the public verification form.
                </p>

                {certificates.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2.5rem 1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
                    <p style={{ color: '#475569', fontSize: '0.9rem', margin: '0 0 1rem' }}>
                      No certificates have been issued yet.
                    </p>
                    <button onClick={() => setSection('issue')} className="btn-premium" style={{ padding: '0.6rem 1.4rem', fontSize: '0.85rem' }}>
                      Issue the first one
                    </button>
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                      <thead>
                        <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#64748b', fontSize: '0.8rem' }}>
                          <th style={{ padding: '0.7rem 0.6rem' }}>Certificate number</th>
                          <th style={{ padding: '0.7rem 0.6rem' }}>Recipient</th>
                          <th style={{ padding: '0.7rem 0.6rem' }}>Internship</th>
                          <th style={{ padding: '0.7rem 0.6rem' }}>Duration</th>
                          <th style={{ padding: '0.7rem 0.6rem' }}>Issued</th>
                          <th style={{ padding: '0.7rem 0.6rem', textAlign: 'right' }}>Document</th>
                        </tr>
                      </thead>
                      <tbody>
                        {certificates.map((cert) => (
                          <tr key={cert.certificateId || cert._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '0.8rem 0.6rem', fontFamily: 'monospace', color: '#2563eb', fontWeight: 700 }}>{cert.certificateId}</td>
                            <td style={{ padding: '0.8rem 0.6rem', color: '#0b0f19' }}>{cert.studentName}</td>
                            <td style={{ padding: '0.8rem 0.6rem', color: '#475569' }}>{cert.programTitle}</td>
                            <td style={{ padding: '0.8rem 0.6rem', color: '#475569' }}>{cert.duration}</td>
                            <td style={{ padding: '0.8rem 0.6rem', color: '#475569' }}>{cert.issueDate}</td>
                            <td style={{ padding: '0.8rem 0.6rem', textAlign: 'right' }}>
                              <button
                                type="button"
                                className="btn-secondary"
                                onClick={() => onCertificateOpen?.(cert)}
                                style={{ padding: '0.45rem 0.9rem', fontSize: '0.78rem' }}
                              >
                                Open
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
