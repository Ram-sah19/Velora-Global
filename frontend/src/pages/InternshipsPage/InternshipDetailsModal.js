import React, { useState } from 'react';
import { api } from '../../services/api';
import DialogShell from '../../components/DialogShell';
import { INTERNSHIP_APPLICATION_FORM_URL } from '../../constants';
import { INTERNSHIP_TIERS } from '../../content/siteFacts';
import { getTierContent } from '../../content/domainTiers';

const GOOGLE_FORM_URL = INTERNSHIP_APPLICATION_FORM_URL;

const TIER_IDS = ['2w', '1m', '2m', '3m', '6m'];

// The durations are the ones published on the page and in the schema; only the
// track description differs per domain.
function getDomainDurationTiers(domainTitle = '', domainCategory = '') {
  const content = getTierContent(domainTitle, domainCategory);
  return INTERNSHIP_TIERS.map((tier, i) => ({
    id: TIER_IDS[i],
    duration: tier.duration,
    bestFor: content[i].bestFor,
    deliverables: content[i].deliverables
  }));
}

export default function InternshipDetailsModal({ program, currentUser, onApplySuccess, onClose }) {
  const [selectedTier, setSelectedTier] = useState('2w');

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
    api.submitApplication({
      studentId: currentUser ? currentUser.id : `guest-${Date.now()}`,
      studentName: currentUser ? currentUser.name : '',
      studentEmail: currentUser ? currentUser.email : '',
      programId: program.id || `prog-${Date.now()}`,
      programTitle: program.title,
      domain: program.domain,
      programTrack: 'Practical Internship',
      selectedDuration: activeT.duration,
      statementOfPurpose: 'Application via Google Form Link'
    }).catch(e => {
      console.warn("Recorded application locally", e);
    });
  };

  return (
    <DialogShell labelId="internship-details-title" onClose={onClose} panelClassName="svc-modal">
      <button type="button" className="svc-modal__close" aria-label="Close dialog" onClick={onClose}>
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M2.5 2.5l9 9M11.5 2.5l-9 9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      </button>

      <p className="svc-eyebrow">Practical Internship</p>
      <h2 id="internship-details-title" className="svc-modal__title">{program.title}</h2>
      <p className="svc-modal__note">{program.description}</p>

      <h3 className="ip-label">Technologies and tools covered</h3>
      <ul className="svc-features ip-modal__stack">
        {(program.skillsRequired || []).map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>

      <div className="ip-tiers">
        <h3 className="ip-label">Select a duration tier for {program.domain}</h3>

        <div className="ip-tiers__row" role="group" aria-label="Internship duration tier">
          {durationTiers.map((t) => (
            <button
              key={t.id}
              type="button"
              className="ip-tier"
              aria-pressed={selectedTier === t.id}
              onClick={() => setSelectedTier(t.id)}
            >
              <span className="ip-tier__duration">{t.duration}</span>
            </button>
          ))}
        </div>

        <div className="ip-tier__detail">
          <div className="ip-tier__head">
            <p className="ip-tier__title">{activeT.duration} track</p>
            <p className="ip-tier__best">{activeT.bestFor}</p>
          </div>

          <h4 className="ip-label">Included {program.domain} deliverables</h4>
          <ul className="svc-deliverables">
            {activeT.deliverables.map((item) => (
              <li key={item}>
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M5 10.5L8 13.5L15 6.5" stroke="#1d4ed8" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="ip-notice__note">
        Duration does not set the fee: mentorship is a one-time charge by level, as listed on this
        page, and enrolment is confirmed once that fee is received.
      </p>

      <div className="ip-modal__foot">
        <button type="button" className="svc-btn svc-btn--primary" onClick={handleApplyClick}>
          Apply for Internship
        </button>
      </div>
    </DialogShell>
  );
}
