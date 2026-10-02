import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import InternshipDetailsModal from './InternshipDetailsModal';
import { SkeletonCard } from '../../components/UIStates';
import { AnswerSection, PageFaq } from '../../components';
import CertificateVerifySection from '../../components/CertificateVerifySection';
import { INTERNSHIP_APPLICATION_FORM_URL } from '../../constants';
import { INTERNSHIP_PROGRAMS } from '../../content/programs';
import { ANSWER_BLOCKS, FAQS } from '../../content/siteFacts';

const GOOGLE_FORM_URL = INTERNSHIP_APPLICATION_FORM_URL;

const softwareDevSubDomains = [
  'Frontend Development',
  'Backend Development',
  'Full Stack Development',
  'Mobile App Development',
  'Software Development'
];

export default function InternshipsPage({ activeRole, onApplySuccess, currentUser }) {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProgramForDetails, setSelectedProgramForDetails] = useState(null);

  const domains = [
    'All',
    'Software Development',
    'Artificial Intelligence & Machine Learning',
    'Data Science',
    'Cybersecurity',
    'UI/UX Design',
    'Cloud & DevOps',
    'Software Testing'
  ];

  useEffect(() => {
    fetchPrograms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDomain, searchQuery]);

  const fetchPrograms = async () => {
    try {
      let data = [];
      try {
        const filterDomain = selectedDomain === 'Software Development' ? '' : selectedDomain;
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
    <section style={{ padding: '4rem 0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 2.5rem auto' }}>
          <span className="badge badge-coral" style={{ marginBottom: '0.75rem' }}>Practical Work Experience</span>
          <h1 style={{ fontSize: '2.5rem', color: '#0b0f19', marginBottom: '0.75rem' }}>
            Project-Based <span className="text-coral">Tech Internships in Nepal</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Build real deliverables in the domain you choose, with 1-to-1 mentor reviews. You pick the
            length when you apply, from two weeks to six months.
          </p>
        </div>

        {/* What the fee pays for, and what the intern does */}
        <div style={{
          maxWidth: '900px',
          margin: '0 auto 2.5rem auto',
          padding: '1.75rem 1.9rem',
          background: 'rgba(241, 245, 249, 0.75)',
          border: '1px solid #e2e8f0',
          borderRadius: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.9rem' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
              <circle cx="12" cy="12" r="9" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 800, color: '#0b0f19', margin: 0 }}>
              The fee is for mentorship. The work is real client projects.
            </h2>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem 2.25rem' }}>
            <div style={{ flex: '1 1 300px' }}>
              <h3 className="notice-label" style={{ fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#475569', margin: '0 0 0.6rem' }}>
                What your fee pays for
              </h3>
              <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#475569', fontSize: '0.93rem', lineHeight: '1.75' }}>
                <li>1-to-1 mentor reviews of your code and architecture</li>
                <li>Grading against the five published criteria</li>
                <li>Workspace access, evaluation time and infrastructure</li>
                <li>A completion certificate carrying a verification ID</li>
              </ul>
              <p style={{ margin: '0.7rem 0 0', color: '#64748b', fontSize: '0.9rem', lineHeight: '1.65' }}>
                It is a mentorship fee, not payment for a job, and it buys nothing on its own: the
                certificate is issued only after a graded deliverable.
              </p>
            </div>

            <div style={{ flex: '1 1 300px' }}>
              <h3 className="notice-label" style={{ fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#475569', margin: '0 0 0.6rem' }}>
                What you actually work on
              </h3>
              <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#475569', fontSize: '0.93rem', lineHeight: '1.75' }}>
                <li>A real-world project brief assigned to you in client work, in your track, not a simulation or a practice dataset</li>
                <li>Reviewed the way production code is reviewed: your mentor reads the code and sends written remarks back</li>
                <li>The stacks our client teams ship in: React, Node, React Native or Flutter, Python and AI tooling</li>
                <li>Milestones that go out: you build, deploy, then submit for grading against the five published criteria</li>
              </ul>
            </div>
          </div>

          <p style={{ margin: '1.35rem 0 0', paddingTop: '1.1rem', borderTop: '1px solid #e2e8f0', color: '#334155', fontSize: '0.95rem', lineHeight: '1.7' }}>
            You finish with a deployed project, a grade recorded against five
            published criteria, and a certificate any employer or university can check on our{' '}
            <a href="#verify-certificate" style={{ color: '#1d4ed8', fontWeight: 700 }}>public verification
            form</a>.
          </p>
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
              id="internship-search"
              aria-label="Search internships by domain, language, or tech stack"
              placeholder="Search internship by domain, language, or tech stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ flex: '1 1 200px', width: '100%', fontSize: '0.95rem' }}
            />
            <button type="submit" className="btn-coral" style={{ padding: '0.65rem 1.4rem', whiteSpace: 'nowrap' }}>
              Search Internships
            </button>
          </form>

          {/* Domain Filter Pills — Clean flex wrap layout without scrollbars */}
          <div role="group" aria-label="Filter internship programs by domain" style={{
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
                  background: selectedDomain === dom ? '#ff6b6b' : '#ffffff',
                  border: selectedDomain === dom ? '1px solid #ff6b6b' : '1px solid #e2e8f0',
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
          our account before we move them into your student workspace. What we keep and why is set out
          in the <a href="/privacy-policy" style={{ color: '#2563eb', fontWeight: 600 }}>Privacy Policy</a>.
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
                No Internship Programs Found
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.92rem', maxWidth: '460px', margin: '0 auto 1.5rem auto' }}>
                No active internship tracks match your current filter or search criteria. Reset your search to browse all available tracks.
              </p>
              <button
                onClick={() => {
                  setSelectedDomain('All');
                  setSearchQuery('');
                }}
                className="btn-coral"
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
                  <span className="badge badge-coral" style={{ fontSize: '0.75rem', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    {prog.domain}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: '#ff6b6b', fontWeight: '700', whiteSpace: 'nowrap' }}>
                    Practical Internship
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
                      background: '#fff5f5',
                      border: '1px solid #ffe3e3',
                      padding: '0.28rem 0.65rem',
                      borderRadius: '6px',
                      color: '#0b0f19',
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
                    <span>1-to-1 Mentorship</span>
                    <span>•</span>
                    <span>Project Deliverables</span>
                    <span>•</span>
                    <span>Verifiable Certificate</span>
                  </div>
                </div>
              </div>

              {/* Card Footer with Details Action Button */}
              <div style={{ paddingTop: '1rem', borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748b' }}>Fee Starts At</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: '800', color: '#ff6b6b' }}>
                    NPR 199 <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>(2 Wks)</span>
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
                    aria-label={`Apply for ${prog.title}`}
                    onClick={() => {
                      window.open(GOOGLE_FORM_URL, '_blank');
                    }}
                    className="btn-coral"
                    style={{ padding: '0.55rem 0.95rem', fontSize: '0.82rem', fontWeight: '800', borderRadius: '8px', cursor: 'pointer' }}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )))}
        </div>

        <CertificateVerifySection />

        <PageFaq items={FAQS.internships} />

        <AnswerSection
          heading={ANSWER_BLOCKS.internships.heading}
          answer={ANSWER_BLOCKS.internships.answer}
          specs={ANSWER_BLOCKS.internships.specs}
          steps={ANSWER_BLOCKS.internships.steps}
          table={ANSWER_BLOCKS.internships.table}
        />

      </div>

      {/* Animated Program Details Modal */}
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
