import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import TrainingDetailsModal from './TrainingDetailsModal';
import { SkeletonCard } from '../../components/UIStates';
import { AnswerSection, CtaBand, PageFaq, SectionHead } from '../../components';
import { TRAINING_APPLICATION_FORM_URL } from '../../constants';
import { TRAINING_PROGRAMS as defaultTrainingPrograms } from '../../content/programs';
import { ANSWER_BLOCKS, FAQS } from '../../content/siteFacts';

const GOOGLE_FORM_URL = TRAINING_APPLICATION_FORM_URL;

const PROGRAM_FACTS = [
  { label: 'Format', value: 'Instructor-led, remote' },
  { label: 'Sessions', value: 'Live lectures and step-by-step builds' },
  { label: 'Mentoring', value: '1-on-1 code reviews' },
  { label: 'On completion', value: 'Verified certificate with ID' }
];

const GROUP_DOMAINS = {
  'Software Development': [
    'MERN Stack',
    'PERN Stack',
    'Full Stack with AI',
    'Frontend Development',
    'Backend Development',
    'UI/UX Design',
    'Software Testing'
  ],
  AIML: [
    'Artificial Intelligence & Machine Learning',
    'Deep Learning',
    'Full Stack with AI',
    'AI Tools'
  ],
  'Programming': ['JavaScript', 'Java', 'Python']
};

const FILTER_NAMES = ['All programs', ...Object.keys(GROUP_DOMAINS)];

const isExcludedProgram = (p) => {
  const text = ((p.domain || '') + " " + (p.title || '') + " " + (p.programTrack || '')).toLowerCase();
  return (
    text.includes('internship') ||
    text.includes('cyber') ||
    text.includes('cloud') ||
    text.includes('devops') ||
    text.includes('data science') ||
    text.includes('mobile')
  );
};

export default function TrainingPage({ activeRole, onApplySuccess, currentUser }) {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('All programs');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProgramForDetails, setSelectedProgramForDetails] = useState(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        let data = [];
        try {
          data = await api.getPrograms('', searchQuery);
        } catch (err) {
          // Quietly fallback to static program list if backend is unavailable
        }

        // Combine default training programs with any backend programs and exclude internships
        const validPrograms = [...defaultTrainingPrograms, ...(data || [])].filter(p => !isExcludedProgram(p));

        // Deduplicate programs cleanly by domain or title key
        const uniqueMap = new Map();
        for (const p of validPrograms) {
          const key = (p.id || p.domain || p.title).toLowerCase().trim();
          if (!uniqueMap.has(key)) {
            uniqueMap.set(key, p);
          }
        }

        let filtered = Array.from(uniqueMap.values());

        const groupDomains = GROUP_DOMAINS[selectedFilter];
        if (groupDomains) {
          const domains = groupDomains.map((dom) => dom.toLowerCase());
          filtered = filtered.filter(p => domains.includes((p.domain || '').toLowerCase()));
        }

        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          filtered = filtered.filter(p => 
            (p.title || '').toLowerCase().includes(q) || 
            (p.domain || '').toLowerCase().includes(q) ||
            (p.skillsRequired || []).some(s => s.toLowerCase().includes(q))
          );
        }

        setPrograms(filtered);
      } catch (err) {
        console.error("Failed to load training programs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, [selectedFilter, searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Search is handled via searchQuery state in useEffect
  };

  return (
    <section className="training-page">
      <div className="container">

        <SectionHead
          level={1}
          eyebrow="Guided Skill Training"
          title="Tech Training in Nepal"
          lede="Instructor-led programs in high-demand stacks and languages, with live sessions, step-by-step builds and a full codebase walkthrough. Every program ends with a certificate carrying a verifiable ID."
        />

        <dl className="ip-facts">
          {PROGRAM_FACTS.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>

        <section className="ip-notice" aria-labelledby="tp-offer-title">
          <p className="ip-label">Dashain &amp; Tihar Offer</p>
          <h2 id="tp-offer-title" className="ip-notice__title">Up to 40% off program fees</h2>
          <p className="ip-notice__note">
            Enrol in any guided training program during the Dashain–Tihar season and the festival
            discount is applied to the published fee, which runs from NPR 1,999 to NPR 11,999
            depending on the stack. Mention the festival offer in your application form and the
            final fee is confirmed with you before any payment.
          </p>
          <div className="ip-notice__foot">
            <button
              type="button"
              className="svc-btn svc-btn--primary"
              onClick={() => { window.open(GOOGLE_FORM_URL, '_blank'); }}
            >
              Apply with festival discount
            </button>
          </div>
        </section>

        <form className="ip-search" role="search" onSubmit={handleSearchSubmit}>
          <label className="visually-hidden" htmlFor="training-search">
            Search training tracks by domain, language, or tech stack
          </label>
          <input
            id="training-search"
            className="svc-input"
            type="search"
            placeholder="Search by domain, language or tech stack..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="svc-btn svc-btn--primary">Search</button>
        </form>

        <div className="svc-toolbar" role="group" aria-label="Filter training programs by group">
          {FILTER_NAMES.map((name) => (
            <button
              key={name}
              type="button"
              className="svc-filter"
              aria-pressed={selectedFilter === name}
              onClick={() => setSelectedFilter(name)}
            >
              {name}
            </button>
          ))}
        </div>

        <p className="ip-consent">
          Applications go through a Google Form, so your answers are collected and stored by Google on
          our account before we set up your sessions. What we keep and why is set out in the{' '}
          <a className="svc-link" href="/privacy-policy">Privacy Policy</a>.
        </p>

        <h2 className="visually-hidden">Training programs</h2>
        <div className="ip-grid">
          {loading && programs.length === 0 ? (
            Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard
                key={i}
                style={{
                  borderRadius: 'var(--svc-radius)',
                  border: '1px solid var(--svc-hairline)',
                  boxShadow: 'var(--svc-shadow)'
                }}
              />
            ))
          ) : programs.length === 0 ? (
            <div className="ip-empty">
              <h3>No training programs match your filter</h3>
              <p>
                No active training programs match your current filter or search criteria. Reset your
                search to view all guided programs.
              </p>
              <button
                type="button"
                className="svc-btn svc-btn--quiet"
                onClick={() => {
                  setSelectedFilter('All programs');
                  setSearchQuery('');
                }}
              >
                Reset filters and view all
              </button>
            </div>
          ) : (
            programs.map((prog) => (
              <article key={prog.id} className="ip-card">
                <p className="svc-eyebrow">{prog.domain}</p>

                <h3 className="ip-card__title">{prog.title}</h3>
                {prog.locationType && <p className="ip-card__meta">{prog.locationType}</p>}
                <p className="ip-card__desc">{prog.description}</p>

                <ul className="svc-features ip-card__stack">
                  {(prog.skillsRequired || []).map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>

                <div className="ip-card__foot">
                  <div>
                    <span className="ip-card__price-label">Program fee</span>
                    <span className="ip-card__price-value">{prog.fee || 'NPR 2,999'}</span>
                  </div>

                  <div className="ip-card__actions">
                    <button
                      type="button"
                      className="svc-btn svc-btn--quiet"
                      aria-label={`View details for ${prog.title}`}
                      onClick={() => setSelectedProgramForDetails(prog)}
                    >
                      Details
                    </button>
                    <button
                      type="button"
                      className="svc-btn svc-btn--primary"
                      aria-label={`Enroll in ${prog.title}`}
                      onClick={() => {
                        window.open(GOOGLE_FORM_URL, '_blank');
                      }}
                    >
                      Enroll
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>

      {/* Full-bleed band: outside the container so the colour covers the viewport. */}
      <CtaBand
        id="tp-cta-title"
        eyebrow="Enroll"
        title="Enroll in a guided training program"
        text="Pick a stack, open the training application form, then join the live sessions for that program. The final fee is confirmed with you before any payment, and every program ends with a certificate that carries a unique verification ID."
        actions={
          <>
            <a className="svc-btn svc-btn--primary" href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer">
              Open the Training Application Form
            </a>
            <a
              className="svc-btn svc-btn--whatsapp"
              href="https://wa.me/9779826031419?text=Hello%20Velora%20Global%20Team%2C%20I%20would%20like%20to%20ask%20about%20a%20training%20program."
              target="_blank"
              rel="noopener noreferrer"
            >
              Ask about a program on WhatsApp
            </a>
          </>
        }
        facts={[
          { label: 'Office Location', value: 'Balkumari, Ring Road, Kathmandu' },
          { label: 'How you apply', value: 'Training application form' },
          { label: 'Helpline', value: '+977 9826031419' }
        ]}
      />

      <div className="container">
        <PageFaq items={FAQS.training} />

        <AnswerSection
          heading={ANSWER_BLOCKS.training.heading}
          answer={ANSWER_BLOCKS.training.answer}
          specs={ANSWER_BLOCKS.training.specs}
          steps={ANSWER_BLOCKS.training.steps}
          table={ANSWER_BLOCKS.training.table}
        />
      </div>

      {selectedProgramForDetails && (
        <TrainingDetailsModal
          program={selectedProgramForDetails}
          currentUser={currentUser}
          onApplySuccess={onApplySuccess}
          onClose={() => setSelectedProgramForDetails(null)}
        />
      )}
    </section>
  );
}
