import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import InternshipDetailsModal from './InternshipDetailsModal';
import { SkeletonCard } from '../../components/UIStates';
import { AnswerSection, CtaBand, PageFaq, SectionHead } from '../../components';
import CertificateVerifySection from '../../components/CertificateVerifySection';
import { INTERNSHIP_APPLICATION_FORM_URL } from '../../constants';
import { INTERNSHIP_PROGRAMS } from '../../content/programs';
import { ANSWER_BLOCKS, FAQS, MENTORSHIP_LEVELS } from '../../content/siteFacts';

const GOOGLE_FORM_URL = INTERNSHIP_APPLICATION_FORM_URL;

const softwareDevSubDomains = [
  'Frontend Development',
  'Backend Development',
  'Full Stack Development',
  'Mobile App Development',
  'UI/UX Design',
  'Software Testing',
  'Software Development'
];

const PROGRAM_FACTS = [
  { label: 'Format', value: 'Remote, per track' },
  { label: 'Duration', value: '2 weeks to 6 months' },
  { label: 'Mentoring', value: '1-to-1 code reviews' },
  { label: 'On completion', value: 'Grade + verified certificate' }
];

const REAL_WORK = [
  'A real-world project brief assigned to you in client work, in your track, not a simulation or a practice dataset',
  'Reviewed the way production code is reviewed: your mentor reads the code and sends written remarks back',
  'The stacks our client teams ship in: React, Node, React Native or Flutter, Python and AI tooling',
  'Milestones that go out: you build, deploy, then submit for grading against the five published criteria'
];

const Check = () => (
  <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M5 10.5L8 13.5L15 6.5" stroke="#1d4ed8" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function InternshipsPage({ activeRole, onApplySuccess, currentUser }) {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProgramForDetails, setSelectedProgramForDetails] = useState(null);

  const domains = [
    'All',
    'Software Development',
    'AIML',
    'Data Science',
    'Cybersecurity',
    'Cloud & DevOps'
  ];

  useEffect(() => {
    fetchPrograms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDomain, searchQuery]);

  const fetchPrograms = async () => {
    try {
      // The AIML pill is shorter than the domain it filters on.
      const selectedDomainValue = selectedDomain === 'AIML'
        ? 'Artificial Intelligence & Machine Learning'
        : selectedDomain;
      let data = [];
      try {
        const filterDomain = selectedDomain === 'Software Development' ? '' : selectedDomainValue;
        data = await api.getPrograms(filterDomain, searchQuery);
      } catch (err) {
        // Quietly fallback to static program list if backend is unavailable
      }

      // Merge backend programs with full default internship programs
      const combined = [...INTERNSHIP_PROGRAMS, ...(data || [])];

      // Remove duplicates by id
      const unique = Array.from(new Map(combined.map(item => [item.id || item.title, item])).values());

      let filtered = unique;

      if (selectedDomain !== 'All') {
        if (selectedDomain === 'Software Development') {
          filtered = filtered.filter(p => softwareDevSubDomains.includes(p.domain) || p.domain === 'Software Development');
        } else {
          filtered = filtered.filter(p => (p.domain || '').toLowerCase() === selectedDomainValue.toLowerCase());
        }
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
      console.error("Failed to load internship programs", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Search is handled via searchQuery state in useEffect
  };

  return (
    <section className="internships-page">
      <div className="container">

        <SectionHead
          level={1}
          eyebrow="Practical Work Experience"
          title="Project-Based Tech Internships in Nepal"
          lede="Build real deliverables in the domain you choose, with 1-to-1 mentor reviews. You pick the length when you apply, from two weeks to six months."
        />

        <dl className="ip-facts">
          {PROGRAM_FACTS.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>

        <section className="ip-notice" aria-labelledby="ip-notice-title">
          <h2 id="ip-notice-title" className="ip-notice__title">
            Three mentorship levels. One one-time fee.
          </h2>

          <div className="svc-ruled ip-levels">
            {MENTORSHIP_LEVELS.map((level) => (
              <div key={level.name} className="ip-level">
                <div>
                  <h3 className="ip-level__name">
                    {level.name}
                    {level.popular && <span className="ip-level__badge">Most popular</span>}
                  </h3>
                  <p className="ip-level__text">{level.deliverables}</p>
                </div>

                <p className="ip-level__fee">
                  {level.fee}
                  <span className="ip-level__once">One-time</span>
                </p>
              </div>
            ))}
          </div>

          <p className="ip-notice__note">
            Enrolment is confirmed once the one-time fee is received: the amount and payment
            instructions reach you after you apply. It is a mentorship fee, not payment for a job,
            and no fee guarantees placement.
          </p>

          <p className="ip-label ip-notice__work">What you actually work on</p>
          <ul className="svc-deliverables">
            {REAL_WORK.map((item) => (
              <li key={item}><Check /><span>{item}</span></li>
            ))}
          </ul>

          <p className="ip-notice__foot">
            You finish with a deployed project, a grade recorded against five published criteria, and a
            certificate any employer or university can check on our{' '}
            <a className="svc-link" href="#verify-certificate">public verification form</a>.
          </p>
        </section>

        <form className="ip-search" role="search" onSubmit={handleSearchSubmit}>
          <label className="visually-hidden" htmlFor="internship-search">
            Search internships by domain, language, or tech stack
          </label>
          <input
            id="internship-search"
            className="svc-input"
            type="search"
            placeholder="Search by domain, language or tech stack..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="svc-btn svc-btn--primary">Search</button>
        </form>

        <div className="svc-toolbar" role="group" aria-label="Filter internship programs by domain">
          {domains.map((dom) => (
            <button
              key={dom}
              type="button"
              className="svc-filter"
              aria-pressed={selectedDomain === dom}
              onClick={() => setSelectedDomain(dom)}
            >
              {dom}
            </button>
          ))}
        </div>

        <p className="ip-consent">
          Applications go through a Google Form, so your answers are collected and stored by Google on
          our account before we move them into your student workspace. What we keep and why is set out
          in the <a className="svc-link" href="/privacy-policy">Privacy Policy</a>.
        </p>

        <h2 className="visually-hidden">Internship tracks</h2>
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
              <h3>No internship tracks match your filter</h3>
              <p>
                No active internship tracks match your current filter or search. Reset your search to
                browse all available tracks.
              </p>
              <button
                type="button"
                className="svc-btn svc-btn--quiet"
                onClick={() => {
                  setSelectedDomain('All');
                  setSearchQuery('');
                }}
              >
                Reset filters and view all
              </button>
            </div>
          ) : (
            programs.map((prog) => {
              const meta = [prog.locationType, prog.level].filter(Boolean).join(' · ');
              return (
                <article key={prog.id} className="ip-card">
                  <p className="svc-eyebrow">{prog.domain}</p>

                  <h3 className="ip-card__title">{prog.title}</h3>
                  {meta && <p className="ip-card__meta">{meta}</p>}
                  <p className="ip-card__desc">{prog.description}</p>

                  <ul className="svc-features ip-card__stack">
                    {(prog.skillsRequired || []).map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>

                  <div className="ip-card__foot">
                    <div className="ip-card__actions">
                      <span className="ip-card__hint">Choose your track duration</span>
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
                        aria-label={`Apply for ${prog.title}`}
                        onClick={() => {
                          window.open(GOOGLE_FORM_URL, '_blank');
                        }}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>

      {/* Full-bleed band: outside the container so the colour covers the viewport. */}
      <CtaBand
        id="ip-cta-title"
        eyebrow="Applications"
        title="Apply for a project-based internship"
        text="Open the application form, choose your track and the duration you want. Every internship here is project-driven and ends with a graded deliverable and a certificate that carries a unique verification ID."
        actions={
          <>
            <a className="svc-btn svc-btn--primary" href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer">
              Open the Application Form
            </a>
            <a
              className="svc-btn svc-btn--whatsapp"
              href="https://wa.me/9779826031419?text=Hello%20Velora%20Global%20Team%2C%20I%20would%20like%20to%20ask%20about%20an%20internship%20track."
              target="_blank"
              rel="noopener noreferrer"
            >
              Ask about a track on WhatsApp
            </a>
          </>
        }
        facts={[
          { label: 'Office Location', value: 'Balkumari, Ring Road, Kathmandu' },
          { label: 'How you apply', value: 'Internship application form' },
          { label: 'Helpline', value: '+977 9826031419' }
        ]}
      />

      <div className="container">
        <CertificateVerifySection />

        <PageFaq items={FAQS.internships} />

        <AnswerSection
          heading={ANSWER_BLOCKS.internships.heading}
          answer={ANSWER_BLOCKS.internships.answer}
          specs={ANSWER_BLOCKS.internships.specs}
          steps={ANSWER_BLOCKS.internships.steps}
        />
      </div>

      {/* Program details dialog */}
      {selectedProgramForDetails && (
        <InternshipDetailsModal
          program={selectedProgramForDetails}
          currentUser={currentUser}
          onApplySuccess={onApplySuccess}
          onClose={() => setSelectedProgramForDetails(null)}
        />
      )}
    </section>
  );
}
