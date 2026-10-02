import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import TrainingDetailsModal from './TrainingDetailsModal';
import { SkeletonCard } from '../../components/UIStates';
import { AnswerSection, PageFaq } from '../../components';
import { TRAINING_APPLICATION_FORM_URL } from '../../constants';
import { TRAINING_PROGRAMS as defaultTrainingPrograms } from '../../content/programs';
import { ANSWER_BLOCKS, FAQS } from '../../content/siteFacts';

const GOOGLE_FORM_URL = TRAINING_APPLICATION_FORM_URL;

const softwareDevSubDomains = [
  'Frontend Development',
  'Backend Development',
  'Full Stack Development',
  'Software Development'
];

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
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProgramForDetails, setSelectedProgramForDetails] = useState(null);

  const domains = [
    'All',
    'Frontend Development',
    'Backend Development',
    'Full Stack with AI',
    'Artificial Intelligence & Machine Learning',
    'Deep Learning',
    'JavaScript',
    'Java',
    'Python',
    'MERN Stack',
    'PERN Stack',
    'UI/UX Design',
    'Software Testing'
  ];

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        let data = [];
        try {
          const filterDomain = selectedDomain === 'Software Development' ? '' : selectedDomain;
          data = await api.getPrograms(filterDomain, searchQuery);
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

        if (selectedDomain !== 'All') {
          if (selectedDomain === 'Software Development') {
            filtered = filtered.filter(p => softwareDevSubDomains.includes(p.domain) || p.domain === 'Software Development');
          } else {
            filtered = filtered.filter(p => (p.domain || '').toLowerCase() === selectedDomain.toLowerCase());
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
        console.error("Failed to load training programs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, [selectedDomain, searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section style={{ padding: '4rem 0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 2.5rem auto' }}>
          <span className="badge badge-blue" style={{ marginBottom: '0.75rem' }}>Guided Skill Accelerator</span>
          <h1 style={{ fontSize: '2.5rem', color: '#0b0f19', marginBottom: '0.75rem' }}>
            Tech <span className="text-blue">Training in Nepal</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Instructor-led programs in high-demand stacks and languages, with live sessions, step-by-step builds and a full codebase walkthrough. Every program ends with a certificate carrying a verifiable ID.
          </p>
        </div>

        {/* Dashain & Tihar festival offer */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          maxWidth: '980px',
          margin: '0 auto 2.5rem auto',
          padding: '2rem 2.25rem',
          background: 'linear-gradient(135deg, #0a1628 0%, #0f2038 55%, #16294a 100%)',
          border: '1px solid rgba(201, 162, 39, 0.32)',
          borderRadius: '24px',
          boxShadow: 'var(--premium-shadow-card)'
        }}>
          <div style={{ flex: '1 1 340px' }}>
            <span className="premium-eyebrow premium-eyebrow--on-dark" style={{ marginBottom: '0.7rem' }}>
              Dashain &amp; Tihar Offer
            </span>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.4rem, 2.6vw, 1.85rem)',
              fontWeight: 800,
              lineHeight: 1.25,
              color: '#ffffff',
              margin: '0 0 0.5rem'
            }}>
              Up to 60% off program fees
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.65', margin: 0 }}>
              Enrol in any guided training program during the Dashain–Tihar season and the festival
              discount is applied to the published fee, which runs from NPR 3,000 to NPR 12,000
              depending on the stack. Mention the festival offer in your application form and the
              final fee is confirmed with you before any payment.
            </p>
          </div>
          <button
            type="button"
            onClick={() => { window.open(GOOGLE_FORM_URL, '_blank'); }}
            className="btn-premium"
            style={{ flex: '0 0 auto', background: '#c9a227', color: '#0a1628', whiteSpace: 'nowrap' }}
          >
            Apply with festival discount
          </button>
        </div>

        {/* Filter Bar & Search */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          marginBottom: '3rem'
        }}>
          
          {/* Search Bar Top */}
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.5rem', width: '100%', maxWidth: '520px', margin: '0 auto', flexWrap: 'wrap' }}>
            <input 
              type="search" 
              id="training-search"
              aria-label="Search training tracks by domain, language, or tech stack"
              placeholder="Search training track by domain, language, or tech stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ flex: '1 1 200px', width: '100%', fontSize: '0.95rem' }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '0.65rem 1.4rem', whiteSpace: 'nowrap' }}>
              Search Training Tracks
            </button>
          </form>

        {/* Domain Filter Pills — Clean flex wrap layout without scrollbars */}
          <div role="group" aria-label="Filter training tracks by domain" style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.65rem',
            width: '100%',
            margin: '0 auto'
          }}>
            {domains.map((dom) => (
              <button
                key={dom}
                type="button"
                aria-pressed={selectedDomain === dom}
                onClick={() => setSelectedDomain(dom)}
                style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  background: selectedDomain === dom ? '#2563eb' : '#ffffff',
                  border: selectedDomain === dom ? '1px solid #2563eb' : '1px solid #e2e8f0',
                  color: selectedDomain === dom ? '#ffffff' : '#64748b',
                  boxShadow: selectedDomain === dom ? 'var(--shadow-sm)' : 'none',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {dom}
              </button>
            ))}
          </div>

        </div>

        <p style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2rem auto', fontSize: '0.85rem', color: '#64748b', lineHeight: '1.6' }}>
          Applications go through a Google Form, so your answers are collected and stored by Google on
          our account before we set up your sessions. What we keep and why is set out in the{' '}
          <a href="/privacy-policy" style={{ color: '#2563eb', fontWeight: 600 }}>Privacy Policy</a>.
        </p>

        {/* Programs Grid — Perfectly Aligned Equal Height Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))',
          gap: '1.75rem',
          width: '100%'
        }}>
          {loading && programs.length === 0 ? (
            Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))
          ) : programs.length === 0 ? (
            <div style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '3.5rem 1.5rem',
              background: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #e2e8f0'
            }}>
              <h3 style={{ fontSize: '1.25rem', color: '#0b0f19', marginBottom: '0.5rem', fontWeight: '800' }}>
                No Training Programs Found
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.92rem', maxWidth: '460px', margin: '0 auto 1.5rem auto' }}>
                No active training bootcamps match your current filter or search criteria. Reset your search to view all guided programs.
              </p>
              <button
                onClick={() => {
                  setSelectedDomain('All');
                  setSearchQuery('');
                }}
                className="btn-primary"
                style={{ padding: '0.65rem 1.6rem', fontSize: '0.9rem', borderRadius: '9999px', cursor: 'pointer' }}
              >
                Reset Filters & View All
              </button>
            </div>
          ) : (
            programs.map((prog) => (
            <div 
              key={prog.id} 
              className="corporate-card" 
              style={{ 
                padding: '1.75rem', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                borderRadius: '20px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
                
                {/* Header Badge & Track Label — Collision-proof layout */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  <span className="badge badge-blue" style={{ fontSize: '0.75rem', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    {prog.domain}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: '#2563eb', fontWeight: '700', whiteSpace: 'nowrap' }}>
                    Guided Skill Training
                  </span>
                </div>

                {/* Fixed height title container for uniform row alignment */}
                <h3 style={{ 
                  fontSize: '1.2rem', 
                  color: '#0b0f19', 
                  marginBottom: '0.75rem', 
                  lineHeight: '1.4', 
                  fontWeight: '800',
                  minHeight: '3.3rem',
                  display: '-webkit-box',
                  WebkitLineClamp: '2',
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {prog.title}
                </h3>

                {/* Fixed height description container */}
                <p style={{ 
                  color: '#64748b', 
                  fontSize: '0.88rem', 
                  marginBottom: '1.25rem', 
                  display: '-webkit-box', 
                  WebkitLineClamp: '3', 
                  WebkitBoxOrient: 'vertical', 
                  overflow: 'hidden', 
                  lineHeight: '1.5',
                  minHeight: '3.9rem'
                }}>
                  {prog.description}
                </p>

                {/* Technology pill tags with fixed min height for grid alignment */}
                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '0.4rem', 
                  marginBottom: '1.25rem',
                  minHeight: '4.2rem',
                  alignContent: 'flex-start'
                }}>
                  {(prog.skillsRequired || []).map((skill, i) => (
                    <span key={i} style={{
                      fontSize: '0.78rem',
                      background: '#eff6ff',
                      border: '1px solid #dbeafe',
                      padding: '0.28rem 0.65rem',
                      borderRadius: '6px',
                      color: '#2563eb',
                      fontWeight: '600'
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Key Highlights Strip */}
                <div style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '0.75rem 1rem',
                  marginBottom: '1.5rem',
                  marginTop: 'auto'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', color: '#475569', fontWeight: '600' }}>
                    <span>Guided Labs</span>
                    <span>•</span>
                    <span>Mentor Code Review</span>
                    <span>•</span>
                    <span>Verifiable Certificate</span>
                  </div>
                </div>
              </div>

              {/* Card Footer with Details Action Button */}
              <div style={{ paddingTop: '1rem', borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748b' }}>Training Fee</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: '800', color: '#2563eb' }}>
                    {prog.fee || 'NPR 3,000'}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <button 
                    type="button"
                    aria-label={`View details for ${prog.title}`}
                    onClick={() => setSelectedProgramForDetails(prog)}
                    style={{ 
                      padding: '0.55rem 0.85rem', 
                      fontSize: '0.82rem', 
                      fontWeight: '700', 
                      borderRadius: '8px',
                      background: '#ffffff',
                      color: '#2563eb',
                      border: '1.5px solid #2563eb',
                      cursor: 'pointer'
                    }}
                  >
                    Details
                  </button>

                  <button 
                    type="button"
                    aria-label={`Enroll in ${prog.title}`}
                    onClick={() => {
                      window.open(GOOGLE_FORM_URL, '_blank');
                    }}
                    className="btn-primary"
                    style={{ padding: '0.55rem 0.95rem', fontSize: '0.82rem', fontWeight: '800', borderRadius: '8px', cursor: 'pointer' }}
                  >
                    Enroll
                  </button>
                </div>
              </div>
            </div>
          )))}
        </div>

        <PageFaq items={FAQS.training} />

        <AnswerSection
          heading={ANSWER_BLOCKS.training.heading}
          answer={ANSWER_BLOCKS.training.answer}
          specs={ANSWER_BLOCKS.training.specs}
          steps={ANSWER_BLOCKS.training.steps}
          table={ANSWER_BLOCKS.training.table}
        />

      </div>

      {/* Animated Training Details Modal */}
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
