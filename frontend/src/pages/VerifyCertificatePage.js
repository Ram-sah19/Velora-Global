import React, { useEffect, useState } from 'react';
import VeloraLogo from '../components/VeloraLogo';
import { api } from '../services/api';

const issuedOn = (date) => {
  const parsed = new Date(`${date}T00:00:00`);
  return Number.isNaN(parsed.getTime())
    ? date
    : parsed.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
};

const icon = (paths) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {paths}
  </svg>
);

const SHELL = {
  maxWidth: '620px',
  margin: '0 auto',
  padding: '2.5rem 1.1rem 3.5rem'
};

const HEAD = { textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.9rem' };

const CARD = {
  marginTop: '1.6rem',
  padding: '1.6rem 1.4rem',
  background: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '18px',
  boxShadow: 'var(--premium-shadow-card)'
};

const VERIFIED_CARD = { ...CARD, borderColor: '#a7f3d0' };

const EYEBROW = {
  margin: 0,
  fontSize: '0.7rem',
  fontWeight: 800,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: '#64748b'
};

const STATUS = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginTop: '0.4rem',
  fontSize: '1.02rem',
  fontWeight: 800,
  letterSpacing: '0.08em',
  textTransform: 'uppercase'
};

const MESSAGE = { margin: '0.9rem 0 0', fontSize: '0.93rem', lineHeight: '1.7', color: '#475569' };

const GRID = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
  gap: '1.2rem 1.4rem',
  marginTop: '1.5rem',
  paddingTop: '1.4rem',
  borderTop: '1px solid #e2e8f0'
};

const LABEL = {
  margin: 0,
  fontSize: '0.68rem',
  fontWeight: 800,
  letterSpacing: '0.11em',
  textTransform: 'uppercase',
  color: '#64748b'
};

const VALUE = { margin: '0.25rem 0 0', fontSize: '0.96rem', fontWeight: 700, color: '#0b0f19', wordBreak: 'break-word' };

function Field({ label, value, mono }) {
  return (
    <div>
      <p style={LABEL}>{label}</p>
      <p style={{ ...VALUE, fontFamily: mono ? 'monospace' : undefined }}>{value}</p>
    </div>
  );
}

export default function VerifyCertificatePage({ certificateId }) {
  const [state, setState] = useState({ status: 'checking' });

  useEffect(() => {
    let active = true;
    setState({ status: 'checking' });
    api
      .verifyCertificate(certificateId)
      .then((data) => {
        if (active) setState({ status: 'verified', certificate: data.certificate });
      })
      .catch((err) => {
        if (!active) return;
        setState(/not found/i.test(err.message) ? { status: 'notfound' } : { status: 'unavailable' });
      });
    return () => { active = false; };
  }, [certificateId]);

  const certificate = state.certificate;

  return (
    <div style={SHELL}>
      <header style={HEAD}>
        <VeloraLogo showText={false} width={46} height={46} />
        <p style={EYEBROW}>Velora Global</p>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: '#0b0f19', margin: 0 }}>
          Certificate Verification
        </h1>
      </header>

      <div role="status" aria-live="polite">
        {state.status === 'checking' && (
          <div style={CARD}>
            <p style={MESSAGE}>
              Checking <strong style={{ fontFamily: 'monospace' }}>{certificateId}</strong> against the
              Velora Global certificate records…
            </p>
          </div>
        )}

        {state.status === 'verified' && (
          <div style={VERIFIED_CARD}>
            <p style={{ ...STATUS, color: '#047857' }}>
              {icon(<path d="M20 6 9 17l-5-5" />)}
              Verified certificate
            </p>
            <p style={MESSAGE}>
              This certificate has been successfully verified against the official Velora Global
              certificate records.
            </p>
            <div style={GRID}>
              <Field label="Certificate ID" value={certificate.certificateId} mono />
              <Field label="Recipient" value={certificate.name} />
              <Field label="Program" value={certificate.program} />
              <Field label="Duration" value={certificate.duration} />
              <Field label="Issued" value={issuedOn(certificate.issuedDate)} />
              <Field label="Organization" value={certificate.organization} />
            </div>
          </div>
        )}

        {state.status === 'notfound' && (
          <div style={CARD}>
            <p style={{ ...STATUS, color: '#b91c1c' }}>
              {icon(<path d="M18 6 6 18M6 6l12 12" />)}
              Invalid certificate
            </p>
            <p style={MESSAGE}>
              This certificate could not be verified against Velora Global records. No certificate is
              recorded under <strong style={{ fontFamily: 'monospace' }}>{certificateId}</strong>. Check
              the ID against the one printed on the certificate, or write to{' '}
              <a href="mailto:info@velora-global.online" style={{ color: '#1d4ed8', fontWeight: 700 }}>
                info@velora-global.online
              </a>{' '}
              and we will confirm it.
            </p>
          </div>
        )}

        {state.status === 'unavailable' && (
          <div style={CARD}>
            <p style={{ ...STATUS, color: '#92400e' }}>
              {icon(<circle cx="12" cy="12" r="9" />)}
              Verification unavailable
            </p>
            <p style={MESSAGE}>
              We could not reach the certificate records right now, so{' '}
              <strong style={{ fontFamily: 'monospace' }}>{certificateId}</strong> has not been
              confirmed either way. Try again in a moment or write to{' '}
              <a href="mailto:info@velora-global.online" style={{ color: '#1d4ed8', fontWeight: 700 }}>
                info@velora-global.online
              </a>.
            </p>
          </div>
        )}
      </div>

      <p style={{ ...MESSAGE, textAlign: 'center', fontSize: '0.85rem' }}>
        Only the recipient, program, duration and issue date are published for a certificate.
        Contact details and grades are not part of the verification record.
      </p>
    </div>
  );
}
