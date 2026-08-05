import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function DomainExplorer({ activeRole = 'student', onApplySuccess }) {
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

  const domains = ['All', 'Technology', 'Design', 'Data Science', 'Business', 'Marketing'];

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
  }, [selectedDomain]);

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

      setApplySuccessMsg('🎉 Application submitted successfully to Velora Global! Track status in your Student Workspace.');
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
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
          <span className="badge badge-indigo" style={{ marginBottom: '0.75rem' }}>Explore Opportunities</span>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            Internship Programs by <span className="gradient-text">Domain</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>
            Discover curated internships designed to match your educational field and career aspirations. Work on real industry tasks and receive accredited feedback.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          marginBottom: '2.5rem'
        }}>
          {/* Domain Filter Buttons */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {domains.map((dom) => (
              <button
                key={dom}
                onClick={() => setSelectedDomain(dom)}
                style={{
                  padding: '0.6rem 1.2rem',
                  borderRadius: '9999px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  background: selectedDomain === dom ? '#6366f1' : 'rgba(255, 255, 255, 0.05)',
                  border: selectedDomain === dom ? '1px solid #818cf8' : '1px solid rgba(255, 255, 255, 0.08)',
                  color: selectedDomain === dom ? '#ffffff' : '#94a3b8'
                }}
              >
                {dom}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.5rem', flex: '1', maxWidth: '350px' }}>
            <input 
              type="text" 
              placeholder="Search by keyword, skill, or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', fontSize: '0.9rem' }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '0.6rem 1rem' }}>
              Search
            </button>
          </form>
        </div>

        {/* Programs Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '1.75rem'
        }}>
          {programs.map((prog) => (
            <div key={prog.id} className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span className={`badge ${
                    prog.domain === 'Technology' ? 'badge-indigo' :
                    prog.domain === 'Design' ? 'badge-cyan' :
                    prog.domain === 'Data Science' ? 'badge-green' : 'badge-gold'
                  }`}>
                    {prog.domain}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>⏱ {prog.duration}</span>
                </div>

                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem', lineHeight: '1.3' }}>
                  {prog.title}
                </h3>

                <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.25rem', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {prog.description}
                </p>

                {/* Skills tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                  {prog.skillsRequired.map((skill, i) => (
                    <span key={i} style={{
                      fontSize: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.06)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '6px',
                      color: '#cbd5e1'
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8' }}>Stipend / Support</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#10b981' }}>{prog.stipend}</span>
                </div>

                <button 
                  onClick={() => {
                    setSelectedProgram(prog);
                    setShowApplyModal(true);
                  }}
                  className="btn-primary"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                >
                  Apply Now ➔
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
                top: '1rem',
                right: '1rem',
                background: 'transparent',
                color: '#94a3b8',
                fontSize: '1.5rem'
              }}
            >
              ✕
            </button>

            <span className="badge badge-indigo" style={{ marginBottom: '0.5rem' }}>{selectedProgram.domain}</span>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{selectedProgram.title}</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Duration: <strong>{selectedProgram.duration}</strong> • Location: <strong>{selectedProgram.locationType}</strong>
            </p>

            {applySuccessMsg ? (
              <div style={{ padding: '2rem', textAlign: 'center', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', borderRadius: '12px', color: '#34d399' }}>
                <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>{applySuccessMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Applicant Name</label>
                  <input 
                    type="text"
                    required
                    value={formData.studentName}
                    onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Email Address</label>
                  <input 
                    type="email"
                    required
                    value={formData.studentEmail}
                    onChange={(e) => setFormData({...formData, studentEmail: e.target.value})}
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Portfolio / GitHub URL</label>
                  <input 
                    type="url"
                    placeholder="https://github.com/username or portfolio link"
                    value={formData.portfolioUrl}
                    onChange={(e) => setFormData({...formData, portfolioUrl: e.target.value})}
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Statement of Purpose / Why Velora Global?</label>
                  <textarea 
                    rows={3}
                    required
                    value={formData.statementOfPurpose}
                    onChange={(e) => setFormData({...formData, statementOfPurpose: e.target.value})}
                    style={{ width: '100%' }}
                  />
                </div>

                <div style={{ marginTop: '0.5rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                  <button 
                    type="button" 
                    onClick={() => setShowApplyModal(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={submitting}
                    className="btn-primary"
                  >
                    {submitting ? 'Submitting...' : 'Confirm & Submit Application'}
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
