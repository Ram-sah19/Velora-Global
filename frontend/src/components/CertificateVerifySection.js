import React, { useState } from 'react';
import { api } from '../services/api';

// The endpoint builds a case-insensitive RegExp from this value, so only the
// characters a real ID uses are allowed through.
const ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9-]{3,31}$/;

const FIELD_LABEL = {
  margin: 0,
  fontSize: '0.72rem',
  fontWeight: 800,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#64748b'
};

const FIELD_VALUE = {
  margin: '0.2rem 0 0',
  fontSize: '0.95rem',
  fontWeight: 700,
  color: '#0b0f19'
};

function Field({ label, value }) {
  return (
    <div>
      <p style={FIELD_LABEL}>{label}</p>
      <p style={FIELD_VALUE}>{value}</p>
    </div>
  );
}

export default function CertificateVerifySection() {
  const [certificateId, setCertificateId] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const id = certificateId.trim();
    if (!ID_PATTERN.test(id)) {
      setResult({ status: 'invalid' });
      return;
    }
    setResult({ status: 'checking', id });
    try {
      const data = await api.verifyCertificate(id);
      setResult({ status: 'verified', id, certificate: data.certificate });
    } catch (err) {
      setResult(
        /not found/i.test(err.message)
          ? { status: 'unknown', id }
          : { status: 'unavailable', id }
      );
    }
  };

  const checking = result && result.status === 'checking';

  return (
    <div
      id="verify-certificate"
      style={{
        maxWidth: '900px',
        margin: '0 auto 2.5rem auto',
        padding: '1.75rem 1.9rem',
        background: 'var(--premium-grad-tinted)',
        border: '1px solid #e2e8f0',
        borderRadius: '20px',
        boxShadow: 'var(--premium-shadow-card)'
      }}
    >
      <span className="premium-eyebrow">Credential check</span>
      <h2 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '1.35rem',
        fontWeight: 800,
        color: '#0b0f19',
        margin: '0.75rem 0 0.5rem'
      }}>
        Verify a Velora Global certificate
      </h2>
      <p style={{ margin: 0, color: '#475569', fontSize: '0.93rem', lineHeight: '1.7' }}>
        Enter the certificate ID printed on the certificate. We return the record held
        against it: recipient, program, issue date and duration. Contact details and
        grades are not part of the verification record.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.35rem' }}>
        <div style={{ flex: '1 1 260px' }}>
          <label htmlFor="certificate-id" style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
            Certificate ID
          </label>
          <input
            id="certificate-id"
            type="text"
            required
            aria-required="true"
            aria-describedby="certificate-id-hint"
            autoComplete="off"
            spellCheck="false"
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
            placeholder="VG-2026-12345"
            style={{
              width: '100%',
              padding: '0.7rem 0.9rem',
              border: '1px solid #cbd5e1',
              borderRadius: '10px',
              fontSize: '0.95rem',
              fontFamily: 'monospace',
              color: '#0b0f19',
              background: '#ffffff'
            }}
          />
          <span id="certificate-id-hint" style={{ fontSize: '0.75rem', color: '#64748b' }}>
            The ID printed on the certificate — letters, numbers and dashes
          </span>
        </div>
        <button
          type="submit"
          disabled={checking}
          className="btn-premium"
          style={{ alignSelf: 'flex-end', padding: '0.7rem 1.6rem', fontSize: '0.9rem', fontWeight: 700 }}
        >
          {checking ? 'Checking...' : 'Verify'}
        </button>
      </form>

      <div role="status" aria-live="polite" style={{ marginTop: '1.25rem' }}>
        {result && result.status === 'invalid' && (
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#475569' }}>
            That does not look like a certificate ID. IDs are printed on the certificate
            itself, in the form VG-2026-12345.
          </p>
        )}

        {result && result.status === 'verified' && (
          <div style={{ padding: '1.25rem 1.4rem', background: '#ffffff', border: '1px solid #a7f3d0', borderRadius: '14px' }}>
            <span className="badge badge-green">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Verified
            </span>
            <p style={{ margin: '0.75rem 0 1.1rem', fontSize: '0.92rem', color: '#334155', lineHeight: '1.65' }}>
              <strong style={{ fontFamily: 'monospace' }}>{result.certificate.certificateId}</strong> is
              recorded in the Velora Global certificate register.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.1rem 1.5rem' }}>
              <Field label="Recipient" value={result.certificate.name} />
              <Field label="Program" value={result.certificate.program} />
              <Field label="Issued" value={result.certificate.issuedDate} />
              <Field label="Duration" value={result.certificate.duration} />
            </div>
          </div>
        )}

        {result && result.status === 'unknown' && (
          <div style={{ padding: '1.1rem 1.3rem', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px' }}>
            <span className="badge badge-gold">Not found</span>
            <p style={{ margin: '0.7rem 0 0', fontSize: '0.92rem', color: '#475569', lineHeight: '1.65' }}>
              No certificate is recorded under{' '}
              <strong style={{ fontFamily: 'monospace' }}>{result.id}</strong>. Check the ID against the
              one printed on the certificate, or write to{' '}
              <a href="mailto:info@velora-global.online" style={{ color: '#1d4ed8', fontWeight: 700 }}>info@velora-global.online</a>{' '}
              and we will confirm it.
            </p>
          </div>
        )}

        {result && result.status === 'unavailable' && (
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#475569' }}>
            Verification is unavailable right now. We have not confirmed{' '}
            <strong style={{ fontFamily: 'monospace' }}>{result.id}</strong> either way — try again in a
            moment or write to{' '}
            <a href="mailto:info@velora-global.online" style={{ color: '#1d4ed8', fontWeight: 700 }}>info@velora-global.online</a>.
          </p>
        )}
      </div>
    </div>
  );
}
