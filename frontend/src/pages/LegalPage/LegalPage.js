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

  const navigate = (handler, arg) => (event) => {
    if (!handler) return;
    event.preventDefault();
    handler(arg);
  };

  return (
    <section className="legal-page">
      <div className="container">

        <header className="svc-head">
          <p className="svc-eyebrow">{doc.badge}</p>
          <h1 className="svc-title">{doc.heading}</h1>
          <p className="lp-updated">Last updated: {LAST_UPDATED}</p>
        </header>

        <p className="svc-lede lp-intro">{doc.introduction}</p>

        <LegalSections sections={doc.sections} />

        <p className="lp-contact">
          Questions about this document: write to{' '}
          <a className="svc-link" href={`mailto:${ORG_FACTS.email}`}>{ORG_FACTS.email}</a>.
        </p>

        <div className="lp-actions">
          <a
            className="svc-btn svc-btn--quiet"
            href={DOCS[doc.other.kind].href}
            onClick={navigate(onNavigateKind, doc.other.kind)}
          >
            {doc.other.label}
          </a>
          <a className="svc-btn svc-btn--quiet" href="/" onClick={navigate(onHomeClick)}>
            Back to home
          </a>
        </div>
      </div>
    </section>
  );
}
