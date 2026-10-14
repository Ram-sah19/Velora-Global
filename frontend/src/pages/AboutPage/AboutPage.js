import React from 'react';
import { AnswerSection, CtaBand, PageFaq, SectionHead } from '../../components';
import { ORG_FACTS, LEADERSHIP, GRADING_CRITERIA, ENGAGEMENT_STEPS, ANSWER_BLOCKS, FAQS } from '../../content/siteFacts';
import { INTERNSHIP_PROGRAMS, TRAINING_PROGRAMS } from '../../content/programs';

/**
 * Company page. /team carries the long leadership profiles; this page answers the
 * company-level questions an answer engine quotes. All copy reads from
 * content/siteFacts.js so the page and the edge JSON-LD graph cannot drift apart.
 */

const COMPANY_FACTS = [
  { label: 'Organization', value: ORG_FACTS.name },
  { label: 'Founded', value: ORG_FACTS.founded },
  { label: 'Location', value: `${ORG_FACTS.city}, ${ORG_FACTS.country}` },
  { label: 'Website', value: ORG_FACTS.url.replace(/^https?:\/\//, ''), href: ORG_FACTS.url }
];

const CONTACT_FACTS = [
  { label: 'Email', value: ORG_FACTS.email, href: `mailto:${ORG_FACTS.email}` },
  {
    label: 'Phone',
    value: ORG_FACTS.telephone,
    href: `tel:${ORG_FACTS.telephone.replace(/[^+\d]/g, '')}`
  },
  { label: 'Office', value: `Balkumari, ${ORG_FACTS.city}, ${ORG_FACTS.country}` }
];

const WHATSAPP_URL = `https://wa.me/${ORG_FACTS.telephone.replace(/\D/g, '')}` +
  '?text=Hello%20Velora%20Global%20Team%2C%20I%20would%20like%20to%20ask%20about%20Velora%20Global.';

/** The four directors, with the same photo per person /team already publishes. */
const LEADERSHIP_PHOTOS = {
  'Abhishek Sah': '/media/abhishek_sah.jpg',
  'Krishna Sah': '/media/rambilas_sah.png',
  'Rohit Sah': '/media/rohit_sah.jpg',
  'Shivshankar Sah': '/media/shivshankar_sah.jpg'
};

export default function AboutPage({ onServicesClick, onExploreClick, onTrainingClick, onTeamClick }) {
  return (
    <section className="about-page">
      <div className="container">

        <SectionHead
          level={1}
          eyebrow="The Company"
          title="About Velora Global"
          lede={`${ORG_FACTS.name} is a technology company in Kathmandu, Nepal. One team builds software for business clients; the same team runs internships and training for students and working professionals.`}
        />

        <dl className="ip-facts">
          {COMPANY_FACTS.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>
                {fact.href
                  ? <a href={fact.href} rel="noopener noreferrer">{fact.value}</a>
                  : fact.value}
              </dd>
            </div>
          ))}
        </dl>

        <section className="svc-process" aria-labelledby="about-arms-title">
          <p className="ip-label">Two sides</p>
          <h2 id="about-arms-title" className="svc-section-title">One team, two sides of the business</h2>
          <div className="ip-notice__cols">
            <div>
              <p className="ip-label">Client engineering</p>
              <p className="ip-notice__note">
                Custom web applications, cross-platform mobile apps and AI assistant systems, quoted per
                project after a scoping meeting rather than from a price list.
              </p>
              {onServicesClick && (
                <div className="svc-cta__actions">
                  <button type="button" className="svc-btn svc-btn--primary" onClick={onServicesClick}>
                    See the services we list
                  </button>
                </div>
              )}
            </div>

            <div>
              <p className="ip-label">Talent programs</p>
              <p className="ip-notice__note">
                {INTERNSHIP_PROGRAMS.length} project-driven internship tracks and{' '}
                {TRAINING_PROGRAMS.length} instructor-led training programs, all delivered remotely and
                reviewed against the same five criteria.
              </p>
              <ul className="svc-features">
                {GRADING_CRITERIA.map((criterion) => (
                  <li key={criterion}>{criterion}</li>
                ))}
              </ul>
              <div className="svc-cta__actions">
                {onExploreClick && (
                  <button type="button" className="svc-btn svc-btn--quiet" onClick={onExploreClick}>
                    Internship tracks
                  </button>
                )}
                {onTrainingClick && (
                  <button type="button" className="svc-btn svc-btn--quiet" onClick={onTrainingClick}>
                    Training programs
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="svc-process" aria-labelledby="about-process-title">
          <p className="ip-label">How we work</p>
          <h2 id="about-process-title" className="svc-section-title">Four steps from first meeting to launch</h2>
          <ol className="svc-steps">
            {ENGAGEMENT_STEPS.map((step, index) => (
              <li key={step.name} className="svc-step">
                <span className="svc-step__num">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="svc-step__title">{step.name}</h3>
                <p className="svc-step__text">{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="svc-process" aria-labelledby="about-team-title">
          <p className="ip-label">Leadership</p>
          <h2 id="about-team-title" className="svc-section-title">Who runs Velora Global?</h2>
          <p className="svc-section-lede">
            {LEADERSHIP[0].name} is the Founder and Chief Executive Officer. The directors below are
            the people a client actually works with.
          </p>

          <div className="ip-grid ip-grid--people">
            {LEADERSHIP.filter((person) => LEADERSHIP_PHOTOS[person.name]).map((person) => (
              <article key={person.name} className="ip-person">
                <img
                  className="ip-person__photo"
                  src={LEADERSHIP_PHOTOS[person.name]}
                  alt={`${person.name}, ${person.jobTitle} at Velora Global`}
                  width="400"
                  height="500"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = LEADERSHIP_PHOTOS[person.name].replace('/media/', '/images/');
                  }}
                />
                <h3 className="ip-person__name">{person.name}</h3>
                <p className="svc-card__tagline">{person.jobTitle}</p>
              </article>
            ))}
          </div>

          {onTeamClick && (
            <div className="svc-cta__actions">
              <button type="button" className="svc-btn svc-btn--quiet" onClick={onTeamClick}>
                Read the full leadership and mentor profiles
              </button>
            </div>
          )}
        </section>
      </div>

      {/* Full-bleed band: outside the container so the colour covers the viewport. */}
      <CtaBand
        id="about-cta-title"
        eyebrow="Get in touch"
        title="Talk to us about a project or a program"
        text="Email us for general enquiries, call the number listed here, or submit the project enquiry form on the services page. We work remotely and can also meet in person in Kathmandu."
        actions={
          <>
            <a className="svc-btn svc-btn--primary" href={`mailto:${ORG_FACTS.email}`}>
              Email the team
            </a>
            <a className="svc-btn svc-btn--whatsapp" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              Message on WhatsApp
            </a>
          </>
        }
        facts={CONTACT_FACTS.map((fact) => ({
          label: fact.label,
          value: fact.href
            ? <a href={fact.href} rel="noopener noreferrer">{fact.value}</a>
            : fact.value
        }))}
      />

      <div className="container">
        <PageFaq items={FAQS.about} />

        <AnswerSection
          heading={ANSWER_BLOCKS.about.heading}
          answer={ANSWER_BLOCKS.about.answer}
          specs={ANSWER_BLOCKS.about.specs}
        />
      </div>
    </section>
  );
}
