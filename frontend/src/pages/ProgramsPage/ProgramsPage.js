import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

export default function ProgramsPage({ activeRole = 'student', onApplySuccess }) {
  const [programs, setPrograms] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [applySuccessMsg, setApplySuccessMsg] = useState('');

  // Application form state
  const [formData, setFormData] = useState({
    studentName: 'Aarav Sharma',
    studentEmail: 'aarav.sharma@example.com',
    statementOfPurpose: 'I am excited to join this Velora Global internship to hone my real-world skills under industry guidance.',
    portfolioUrl: 'https://github.com/aaravsharma-dev',
    resumeUrl: 'https://example.com/resume/aarav.pdf'
  });

  const domains = [
    'All',
    'Frontend Development',
    'Backend Development',
    'Full Stack Development',
    'Mobile App Development',
    'Artificial Intelligence & Machine Learning',
    'Data Science',
    'Cybersecurity',
    'UI/UX Design',
    'Cloud & DevOps',
    'Software Testing'
  ];

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const data = await api.getPrograms(selectedDomain, searchQuery);
        setPrograms(data);
      } catch (err) {
        console.error("Failed to load programs", err);
      }
    };
    fetchPrograms();
  }, [selectedDomain, searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    api.getPrograms(selectedDomain, searchQuery).then(setPrograms).catch(console.error);
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    if (!selectedProgram) return;

    setSubmitting(true);
    try {
      await api.submitApplication({
        studentId: activeRole === 'student' ? 'user-student-1' : `user-temp-${Date.now()}`,
        studentName: formData.studentName,
        studentEmail: formData.studentEmail,
        programId: selectedProgram.id,
        statementOfPurpose: formData.statementOfPurpose,
        portfolioUrl: formData.portfolioUrl,
        resumeUrl: formData.resumeUrl
      });

      setApplySuccessMsg('Application submitted successfully to Velora Global!');
      setTimeout(() => {
        setShowApplyModal(false);
        setApplySuccessMsg('');
        if (onApplySuccess) onApplySuccess();
      }, 2000);
    } catch (err) {
      alert(err.message || 'Failed to submit application');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section style={{ padding: '4rem 0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem auto' }}>
          <span className="badge badge-blue" style={{ marginBottom: '0.75rem' }}>Featured Programs</span>
          <h2 style={{ fontSize: '2.5rem', color: '#0b0f19', marginBottom: '0.75rem' }}>
            Internship Opportunities by <span className="text-coral">Domain</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem' }}>
            Explore accredited internship opportunities across engineering, artificial intelligence, security, cloud, and design.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          marginBottom: '2.5rem'
        }}>
          
          {/* Search Bar Top */}
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.5rem', width: '100%', maxWidth: '500px', margin: '0 auto' }}>
            <input 
              type="text" 
              placeholder="Search by role, programming language, or framework..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', fontSize: '0.95rem' }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '0.65rem 1.4rem' }}>
              Search
            </button>
          </form>

          {/* Domain Filter Pills */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {domains.map((dom) => (
              <button
                key={dom}
                onClick={() => setSelectedDomain(dom)}
                style={{
                  padding: '0.55rem 1.15rem',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  background: selectedDomain === dom ? '#2563eb' : '#ffffff',
                  border: selectedDomain === dom ? '1px solid #2563eb' : '1px solid #e2e8f0',
                  color: selectedDomain === dom ? '#ffffff' : '#64748b',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                {dom}
              </button>
            ))}
          </div>

        </div>

        {/* Programs Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '1.75rem'
        }}>
          {programs.map((prog) => (
            <div key={prog.id} className="corporate-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span className="badge badge-blue" style={{ fontSize: '0.75rem' }}>
                    {prog.domain}
                  </span>
                  <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: '600' }}>Duration: {prog.duration}</span>
                </div>

                <h3 style={{ fontSize: '1.25rem', color: '#0b0f19', marginBottom: '0.75rem', lineHeight: '1.3' }}>
                  {prog.title}
                </h3>

                <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.25rem', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {prog.description}
                </p>

                {/* Technology pill tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                  {prog.skillsRequired.map((skill, i) => (
                    <span key={i} style={{
                      fontSize: '0.78rem',
                      background: '#f1f5f9',
                      border: '1px solid #e2e8f0',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '6px',
                      color: '#0b0f19',
                      fontWeight: '600'
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div style={{ paddingTop: '1rem', borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748b' }}>Stipend / Support</span>
                  <span style={{ fontSize: '0.95rem', fontWeight: '700', color: '#10b981' }}>{prog.stipend}</span>
                </div>

                <button 
                  onClick={() => {
                    setSelectedProgram(prog);
                    setShowApplyModal(true);
                  }}
                  className="btn-coral"
                  style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem' }}
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Application Modal */}
      {showApplyModal && selectedProgram && (
        <div className="modal-overlay" onClick={() => setShowApplyModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setShowApplyModal(false)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: '#f1f5f9',
                color: '#64748b',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                fontSize: '1rem'
              }}
            >
              ✕
            </button>

            <span className="badge badge-blue" style={{ marginBottom: '0.5rem' }}>{selectedProgram.domain}</span>
            <h2 style={{ fontSize: '1.8rem', color: '#0b0f19', marginBottom: '0.35rem' }}>{selectedProgram.title}</h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Duration: <strong>{selectedProgram.duration}</strong> • Location: <strong>{selectedProgram.locationType}</strong>
            </p>

            {applySuccessMsg ? (
              <div style={{ padding: '2rem', textAlign: 'center', background: '#ecfdf5', border: '1px solid #10b981', borderRadius: '12px', color: '#059669' }}>
                <p style={{ fontSize: '1.1rem', fontWeight: '700' }}>{applySuccessMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.35rem', fontWeight: '600' }}>Applicant Name</label>
                  <input 
                    type="text"
                    required
                    value={formData.studentName}
                    onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.35rem', fontWeight: '600' }}>Email Address</label>
                  <input 
                    type="email"
                    required
                    value={formData.studentEmail}
                    onChange={(e) => setFormData({...formData, studentEmail: e.target.value})}
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.35rem', fontWeight: '600' }}>Portfolio / GitHub Link</label>
                  <input 
                    type="url"
                    value={formData.portfolioUrl}
                    onChange={(e) => setFormData({...formData, portfolioUrl: e.target.value})}
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.35rem', fontWeight: '600' }}>Statement of Purpose</label>
                  <textarea 
                    rows={3}
                    required
                    value={formData.statementOfPurpose}
                    onChange={(e) => setFormData({...formData, statementOfPurpose: e.target.value})}
                    style={{ width: '100%' }}
                  />
                </div>

                <div style={{ marginTop: '0.5rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                  <button type="button" onClick={() => setShowApplyModal(false)} className="btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" disabled={submitting} className="btn-coral">
                    {submitting ? 'Submitting...' : 'Confirm Application'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
