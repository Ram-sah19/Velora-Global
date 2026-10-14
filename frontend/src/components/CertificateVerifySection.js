import React, { useState } from 'react';
import { api } from '../services/api';

// The endpoint builds a case-insensitive RegExp from this value, so only the
// characters a real ID uses are allowed through.
const ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9-]{3,31}$/;

const EMAIL = 'info@velora-global.online';

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
    <section id="verify-certificate" className="ip-verify" aria-labelledby="ip-verify-title">
      <p className="svc-eyebrow">Credential check</p>
      <h2 id="ip-verify-title" className="svc-section-title">Verify a Velora Global certificate</h2>
      <p className="svc-section-lede">
        Enter the certificate ID printed on the certificate. We return the record held
        against it: recipient, program, issue date and duration. Contact details and
        grades are not part of the verification record.
      </p>

      <form onSubmit={handleSubmit} className="ip-verify__form">
        <div className="svc-field ip-verify__field">
          <label className="svc-field__label" htmlFor="certificate-id">Certificate ID</label>
          <input
            id="certificate-id"
            className="svc-input ip-verify__input"
            type="text"
            required
            aria-required="true"
            aria-describedby="certificate-id-hint"
            autoComplete="off"
            spellCheck="false"
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
            placeholder="VG-2026-12345"
          />
        </div>
        <span id="certificate-id-hint" className="ip-verify__hint">
          The ID printed on the certificate — letters, numbers and dashes
        </span>
        <button type="submit" className="svc-btn svc-btn--blue" disabled={checking}>
          {checking ? 'Checking...' : 'Verify'}
        </button>
      </form>

      <div role="status" aria-live="polite">
        {result && result.status === 'invalid' && (
          <p className="ip-verify__note">
            That does not look like a certificate ID. IDs are printed on the certificate
            itself, in the form VG-2026-12345.
          </p>
        )}

        {result && result.status === 'verified' && (
          <>
            <p className="ip-verify__state ip-verify__state--ok">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Verified
            </p>
            <p className="ip-verify__note">
              <strong className="ip-verify__id">{result.certificate.certificateId}</strong> is
              recorded in the Velora Global certificate register.
            </p>
            <dl className="ip-facts">
              <div>
                <dt>Recipient</dt>
                <dd>{result.certificate.name}</dd>
              </div>
              <div>
                <dt>Program</dt>
                <dd>{result.certificate.program}</dd>
              </div>
              <div>
                <dt>Issued</dt>
                <dd>{result.certificate.issuedDate}</dd>
              </div>
              <div>
                <dt>Duration</dt>
                <dd>{result.certificate.duration}</dd>
              </div>
            </dl>
          </>
        )}

        {result && result.status === 'unknown' && (
          <>
            <p className="ip-verify__state ip-verify__state--unknown">Not found</p>
            <p className="ip-verify__note">
              No certificate is recorded under{' '}
              <strong className="ip-verify__id">{result.id}</strong>. Check the ID against the
              one printed on the certificate, or write to{' '}
              <a className="svc-link" href={`mailto:${EMAIL}`}>{EMAIL}</a>{' '}
              and we will confirm it.
            </p>
          </>
        )}

        {result && result.status === 'unavailable' && (
          <p className="ip-verify__note">
            Verification is unavailable right now. We have not confirmed{' '}
            <strong className="ip-verify__id">{result.id}</strong> either way — try again in a
            moment or write to{' '}
            <a className="svc-link" href={`mailto:${EMAIL}`}>{EMAIL}</a>.
          </p>
        )}
      </div>
    </section>
  );
}
