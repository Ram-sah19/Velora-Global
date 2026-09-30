import React from 'react';
import { LegalSections } from '../../components';
import { PRIVACY_SECTIONS, TERMS_SECTIONS, LAST_UPDATED } from '../../content/legal';
import { ORG_FACTS } from '../../content/siteFacts';

/**
 * Crawlable home for the two legal documents. The same section arrays back the
 * policy text, so an indexed page and an in-page disclosure cannot drift.
 * `kind` selects which document the route shows.
 */
const DOCS = {
  privacy: {
    badge: 'Data Protection',
    heading: 'Privacy Policy',
    href: '/privacy-policy',
    introduction:
      'This policy states what personal information Velora Global collects from students, internship applicants and corporate clients, what we do with it, who can see it, how long we keep it, and how to ask us to change or delete it. It covers both audiences in one document, so the same rules apply whether you enrolled in a program or commissioned software work.',
    sections: PRIVACY_SECTIONS,
    other: { kind: 'terms', label: 'Read the terms and conditions' }
  },
  terms: {
    badge: 'Governance',
    heading: 'Terms & Conditions',
    href: '/terms',
    introduction:
      'These terms govern enrollment in a Velora Global internship track or training program, and the delivery of custom software work for clients. They set out published fees, how project submissions are evaluated and graded, certificate issuance, refund eligibility, ownership of the work, and the support period after a client launch.',
    sections: TERMS_SECTIONS,
    other: { kind: 'privacy', label: 'Read the privacy policy' }
  }
};

export default function LegalPage({ kind = 'privacy', onNavigateKind, onHomeClick }) {
  const doc = DOCS[kind] || DOCS.privacy;

  return (
    <section style={{ padding: '4rem 0' }}>
      <div className="container" style={{ maxWidth: '860px' }}>

        <div style={{ marginBottom: '2rem' }}>
          <span className="badge badge-blue" style={{ marginBottom: '0.75rem' }}>{doc.badge}</span>
          <h1 style={{ fontSize: '2.25rem', color: '#0b0f19', marginBottom: '0.6rem' }}>
            {doc.heading}
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.88rem', margin: 0 }}>
            Last updated: {LAST_UPDATED}
          </p>
        </div>

        <p style={{
          fontSize: '1.02rem',
          lineHeight: '1.7',
          color: '#334155',
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '20px',
          padding: '1.5rem 1.75rem',
          marginBottom: '2.25rem',
          boxShadow: 'var(--shadow-sm)',
          fontWeight: 500
        }}>
          {doc.introduction}
        </p>

        <div
          className="corporate-card"
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '20px',
            padding: '2rem 2rem 2.25rem',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '2.25rem'
          }}
        >
          <LegalSections sections={doc.sections} />

          <p style={{ margin: '2rem 0 0', fontSize: '0.92rem', color: '#334155', lineHeight: '1.7' }}>
            Questions about this document: write to{' '}
            <a href={`mailto:${ORG_FACTS.email}`} style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>
              {ORG_FACTS.email}
            </a>
            .
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
          <a
            href={DOCS[doc.other.kind].href}
            onClick={(e) => {
              if (!onNavigateKind) return;
              e.preventDefault();
              onNavigateKind(doc.other.kind);
            }}
            style={{
              padding: '0.65rem 1.5rem',
              fontSize: '0.9rem',
              fontWeight: '700',
              borderRadius: '9999px',
              background: '#ffffff',
              border: '1px solid #dbeafe',
              color: '#1d4ed8',
              textDecoration: 'none',
              cursor: 'pointer'
            }}
          >
            {doc.other.label}
          </a>
          <a
            href="/"
            onClick={(e) => {
              if (!onHomeClick) return;
              e.preventDefault();
              onHomeClick();
            }}
            style={{
              padding: '0.65rem 1.5rem',
              fontSize: '0.9rem',
              fontWeight: '700',
              borderRadius: '9999px',
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              color: '#0b0f19',
              textDecoration: 'none',
              cursor: 'pointer'
            }}
          >
            Back to home
          </a>
        </div>
      </div>
    </section>
  );
}
