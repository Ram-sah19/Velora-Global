import React from 'react';
import { AnswerSection, PageFaq } from '../../components';
import { ORG_FACTS, LEADERSHIP, GRADING_CRITERIA, ENGAGEMENT_STEPS, ANSWER_BLOCKS, FAQS } from '../../content/siteFacts';
import { INTERNSHIP_PROGRAMS, TRAINING_PROGRAMS } from '../../content/programs';

/**
 * Company page. The /team route carries the long leadership profiles; this page
 * answers the company-level questions an answer engine quotes, and links out to
 * the routes that carry the detail. All copy reads from content/siteFacts.js so
 * the page and the edge JSON-LD graph cannot drift apart.
 */
export default function AboutPage({ onServicesClick, onExploreClick, onTrainingClick, onTeamClick }) {
  return (
    <section style={{ padding: '4rem 0' }}>
      <div className="container">

        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 2.5rem auto' }}>
          <span className="badge badge-coral" style={{ marginBottom: '0.75rem' }}>The Company</span>
          <h1 style={{ fontSize: '2.5rem', color: '#0b0f19', marginBottom: '0.75rem' }}>
            About <span className="text-coral">Velora Global</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: '1.6' }}>
            {ORG_FACTS.name} is a technology company in Kathmandu, Nepal. One team builds software for
            business clients; the same team runs internships and training for students and working
            professionals.
          </p>
        </div>

        {/* What the two arms actually cover */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.75rem',
          marginBottom: '3rem'
        }}>
          <article className="corporate-card" style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.35rem',
              color: '#0b0f19',
              margin: '0 0 0.6rem'
            }}>
              Client engineering
            </h2>
            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.7', margin: '0 0 1.25rem' }}>
              Custom web applications, cross-platform mobile apps and AI assistant systems, quoted per
              project after a scoping meeting rather than from a price list.
            </p>
            <h3 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.03em', color: '#1d4ed8', margin: '0 0 0.6rem' }}>
              How an engagement runs
            </h3>
            <ol style={{ margin: 0, paddingLeft: '1.25rem', color: '#475569', fontSize: '0.92rem', lineHeight: '1.7' }}>
              {ENGAGEMENT_STEPS.map((step) => (
                <li key={step.name} style={{ marginBottom: '0.5rem' }}>
                  <strong style={{ color: '#0b0f19' }}>{step.name}.</strong> {step.text}
                </li>
              ))}
            </ol>
            {onServicesClick && (
              <button
                onClick={onServicesClick}
                className="btn-coral"
                style={{ marginTop: '1.5rem', padding: '0.65rem 1.5rem', fontSize: '0.9rem' }}
              >
                See the services we list
              </button>
            )}
          </article>

          <article className="corporate-card" style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.35rem',
              color: '#0b0f19',
              margin: '0 0 0.6rem'
            }}>
              Talent programs
            </h2>
            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.7', margin: '0 0 1.25rem' }}>
              {INTERNSHIP_PROGRAMS.length} project-driven internship tracks and {TRAINING_PROGRAMS.length}{' '}
              instructor-led training programs, all delivered remotely and reviewed against the same
              five criteria.
            </p>
            <h3 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.03em', color: '#1d4ed8', margin: '0 0 0.6rem' }}>
              The five grading criteria
            </h3>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#475569', fontSize: '0.92rem', lineHeight: '1.7' }}>
              {GRADING_CRITERIA.map((criterion) => (
                <li key={criterion} style={{ marginBottom: '0.35rem' }}>{criterion}</li>
              ))}
            </ul>
            <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
              {onExploreClick && (
                <button onClick={onExploreClick} className="btn-coral" style={{ padding: '0.65rem 1.4rem', fontSize: '0.9rem' }}>
                  Internship tracks
                </button>
              )}
              {onTrainingClick && (
                <button
                  onClick={onTrainingClick}
                  style={{
                    padding: '0.65rem 1.4rem',
                    fontSize: '0.9rem',
                    fontWeight: '700',
                    borderRadius: '9999px',
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    color: '#0b0f19',
                    cursor: 'pointer'
                  }}
                >
                  Training programs
                </button>
              )}
            </div>
          </article>
        </div>

        {/* Who is responsible for what */}
        <div style={{ maxWidth: '900px', margin: '0 auto 3rem auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.6rem',
            color: '#0b0f19',
            margin: '0 0 0.5rem',
            textAlign: 'center'
          }}>
            Who runs Velora Global?
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.98rem', lineHeight: '1.7', textAlign: 'center', margin: '0 auto 1.75rem', maxWidth: '660px' }}>
            {LEADERSHIP[0].name} is the Founder and Chief Executive Officer. The named leads below are
            the people a client or applicant actually works with.
          </p>

          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '0.75rem' }}>
            {LEADERSHIP.map((person) => (
              <li
                key={person.name}
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  gap: '0.35rem 1rem',
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '14px',
                  padding: '0.95rem 1.25rem'
                }}
              >
                <span style={{ fontSize: '1rem', fontWeight: 800, color: '#0b0f19' }}>{person.name}</span>
                <span style={{ fontSize: '0.9rem', color: '#2563eb', fontWeight: 600 }}>{person.jobTitle}</span>
              </li>
            ))}
          </ul>

          {onTeamClick && (
            <p style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <button
                onClick={onTeamClick}
                style={{
                  padding: '0.65rem 1.5rem',
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  borderRadius: '9999px',
                  background: '#ffffff',
                  border: '1px solid #dbeafe',
                  color: '#1d4ed8',
                  cursor: 'pointer'
                }}
              >
                Read the full leadership and mentor profiles
              </button>
            </p>
          )}
        </div>

        {/* Practical facts */}
        <div style={{
          maxWidth: '900px',
          margin: '0 auto 3rem auto',
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.5rem',
            color: '#0b0f19',
            margin: '0 0 1.25rem'
          }}>
            Company facts
          </h2>
          <dl style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.35rem 2rem',
            margin: 0
          }}>
            <div>
              <dt style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.03em', textTransform: 'uppercase', color: '#1d4ed8', marginBottom: '0.35rem' }}>
                Organization
              </dt>
              <dd style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.65', color: '#475569' }}>{ORG_FACTS.name}</dd>
            </div>
            <div>
              <dt style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.03em', textTransform: 'uppercase', color: '#1d4ed8', marginBottom: '0.35rem' }}>
                Founded
              </dt>
              <dd style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.65', color: '#475569' }}>{ORG_FACTS.founded}</dd>
            </div>
            <div>
              <dt style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.03em', textTransform: 'uppercase', color: '#1d4ed8', marginBottom: '0.35rem' }}>
                Location
              </dt>
              <dd style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.65', color: '#475569' }}>
                {`${ORG_FACTS.city}, ${ORG_FACTS.country}`}
              </dd>
            </div>
            <div>
              <dt style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.03em', textTransform: 'uppercase', color: '#1d4ed8', marginBottom: '0.35rem' }}>
                Contact
              </dt>
              <dd style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.65', color: '#475569' }}>
                <a href={`mailto:${ORG_FACTS.email}`} style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>{ORG_FACTS.email}</a>
                {' · '}
                <a href={`tel:${ORG_FACTS.telephone.replace(/[^+\d]/g, '')}`} style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>{ORG_FACTS.telephone}</a>
              </dd>
            </div>
            <div>
              <dt style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.03em', textTransform: 'uppercase', color: '#1d4ed8', marginBottom: '0.35rem' }}>
                Website
              </dt>
              <dd style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.65', color: '#475569' }}>
                <a href={ORG_FACTS.url} style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>
                  {ORG_FACTS.url.replace(/^https?:\/\//, '')}
                </a>
              </dd>
            </div>
          </dl>
        </div>

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
