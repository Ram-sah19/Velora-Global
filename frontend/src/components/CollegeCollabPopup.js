import React, { useEffect, useRef, useState } from 'react';
import DialogShell from './DialogShell';
import { INTERNSHIP_PROGRAMS } from '../content/programs.js';
import { ORG_FACTS } from '../content/siteFacts.js';

const SEEN_KEY = 'velora_college_collab_seen';

const POINTS = [
  {
    title: 'Internships on real project work',
    body: `Students work a live client brief on one of ${INTERNSHIP_PROGRAMS.length} technology tracks, with 1-to-1 mentorship.`
  },
  {
    title: 'Training that fits the academic calendar',
    body: 'Guided programs in Software Development, AIML, Deep learning, with industry experts.'
  },
  {
    title: 'Certificates your office can check',
    body: 'Each certificate carries graded remarks and a unique ID any employer or university can verify publicly.'
  }
];

const MAIL_BODY = [
  'Dear Velora Global,',
  '',
  'We would like to discuss internship and training collaboration for our students.',
  '',
  'College / University: ',
  'Department: ',
  'Batch size: ',
  'Preferred months: ',
  'Contact person: '
].join('\n');

/**
 * The college-collaboration notice, shown on the home page as soon as the brand splash ends,
 * once per visit. onHoldChange tells the app when the notice is up so the cookie banner waits
 * for its turn instead of stacking under it.
 */
export default function CollegeCollabPopup({ onExploreClick, onTrainingClick, onHoldChange }) {
  const [open, setOpen] = useState(false);
  // Same idiom as DialogShell: the effect runs once per landing, so it reads the callback
  // through a ref instead of listing it as a dependency.
  const holdRef = useRef(onHoldChange);
  holdRef.current = onHoldChange;

  useEffect(() => {
    if (sessionStorage.getItem(SEEN_KEY)) return undefined;
    sessionStorage.setItem(SEEN_KEY, '1');
    holdRef.current(true);
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    // A class, not inline overflow: the hero's story freeze writes `body.style.overflow` itself,
    // and clearing that when the pop-up closes would unfreeze the locked hero (§1).
    const root = document.documentElement;
    root.classList.add('cc-locked');
    return () => root.classList.remove('cc-locked');
  }, [open]);

  const close = () => {
    setOpen(false);
    onHoldChange(false);
  };

  if (!open) return null;

  const mailto = `mailto:${ORG_FACTS.email}?subject=${encodeURIComponent('College collaboration for internships and training')}&body=${encodeURIComponent(MAIL_BODY)}`;
  const whatsapp = `https://wa.me/${ORG_FACTS.telephone.replace(/\D/g, '')}?text=${encodeURIComponent('Hello Velora Global, our college would like to discuss internship and training collaboration.')}`;
  const openPage = (go) => () => {
    close();
    go();
  };

  return (
    <DialogShell
      labelId="college-collab-title"
      onClose={close}
      panelClassName="svc-modal cc-modal"
      lockScroll={false}
    >
      <button type="button" className="svc-modal__close" aria-label="Close notice" onClick={close}>
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M2.5 2.5l9 9M11.5 2.5l-9 9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      </button>

      <div className="cc-band">
        <p className="cc-eyebrow">College &amp; university partnerships</p>
        <h2 id="college-collab-title" className="cc-title">Now open for college collaboration</h2>
        <p className="cc-lede">
          Velora Global is inviting colleges and universities to turn classroom learning into
          real-world experience through hands-on projects, industry-focused training, and guided
          mentorship.
        </p>
      </div>

      <div className="cc-body">
        <div className="svc-ruled cc-points">
          {POINTS.map((point) => (
            <div key={point.title} className="cc-point">
              <h3 className="cc-point__title">{point.title}</h3>
              <p className="cc-point__body">{point.body}</p>
            </div>
          ))}
        </div>

        <div className="cc-actions">
          <a className="svc-btn svc-btn--primary" href={mailto}>Email the partnership team</a>
          <button type="button" className="svc-btn svc-btn--quiet" onClick={openPage(onExploreClick)}>
            Internship tracks
          </button>
          <button type="button" className="svc-btn svc-btn--quiet" onClick={openPage(onTrainingClick)}>
            Training programs
          </button>
        </div>

        <p className="cc-contact">
          Include the department, batch size and the months that suit your calendar — or reach us on{' '}
          <a className="svc-link" href={`tel:${ORG_FACTS.telephone}`}>{ORG_FACTS.telephone}</a> or{' '}
          <a className="svc-link" href={whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>.
        </p>
      </div>
    </DialogShell>
  );
}
