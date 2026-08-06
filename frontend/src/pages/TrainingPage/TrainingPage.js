import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

export default function TrainingPage({ activeRole = 'student', onApplySuccess }) {
  const [programs, setPrograms] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [selectedDurationFilter, setSelectedDurationFilter] = useState('All Durations');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [applySuccessMsg, setApplySuccessMsg] = useState('');

  // Selected duration for the training track
  const [selectedDuration, setSelectedDuration] = useState('1 Month');

  // Pricing matrix for Guided Training + Internship
  const trainingDurations = [
    { duration: '1 Week', fee: 500, text: 'NPR 500' },
    { duration: '2 Weeks', fee: 700, text: 'NPR 700' },
    { duration: '3 Weeks', fee: 950, text: 'NPR 950' },
    { duration: '1 Month', fee: 1200, text: 'NPR 1,200 (Base)' },
    { duration: '2 Months', fee: 5000, text: 'NPR 5,000' }
  ];

  // Application form state
  const [formData, setFormData] = useState({
    studentName: 'Aarav Sharma',
    studentEmail: 'aarav.sharma@example.com',
    statementOfPurpose: 'I am excited to enroll in this guided training program to gain structured skill modules, hands-on labs, and a practical internship with founder mentorship.',
    portfolioUrl: 'https://github.com/aaravsharma-dev',
    resumeUrl: 'https://example.com/resume/aarav.pdf'
  });

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

  const durationFilterOptions = [
    'All Durations',
    '1 Week',
    '2 Weeks',
    '3 Weeks',
    '1 Month',
    '2 Months'
  ];

  const softwareDevSubDomains = [
    'Frontend Development',
    'Backend Development',
    'Full Stack Development',
    'Mobile App Development',
    'Software Development'
  ];

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const filterDomain = selectedDomain === 'Software Development' ? '' : selectedDomain;
        const data = await api.getPrograms(filterDomain, searchQuery);
        
        let filtered = data;
        if (selectedDomain === 'Software Development') {
          filtered = filtered.filter(p => softwareDevSubDomains.includes(p.domain));
        }

        if (selectedDurationFilter !== 'All Durations') {
          filtered = filtered.filter(p => p.duration.includes(selectedDurationFilter) || selectedDurationFilter === '1 Month');
        }

        setPrograms(filtered);
      } catch (err) {
        console.error("Failed to load training programs", err);
      }
    };
    fetchPrograms();
  }, [selectedDomain, selectedDurationFilter, searchQuery]);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const filterDomain = selectedDomain === 'Software Development' ? '' : selectedDomain;
      const data = await api.getPrograms(filterDomain, searchQuery);
      let filtered = data;
      if (selectedDomain === 'Software Development') {
        filtered = filtered.filter(p => softwareDevSubDomains.includes(p.domain));
      }
      setPrograms(filtered);
    } catch (err) {
      console.error(err);
    }
  };

  const currentPricingObj = trainingDurations.find(o => o.duration === selectedDuration) || trainingDurations[3];

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
        statementOfPurpose: `[Guided Training + Internship Track | Duration: ${currentPricingObj.duration} | Fee: ${currentPricingObj.text}] ${formData.statementOfPurpose}`,
        portfolioUrl: formData.portfolioUrl,
        resumeUrl: formData.resumeUrl
      });

      setApplySuccessMsg('Training & Internship enrollment submitted successfully to Velora Global!');
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
          <span className="badge badge-blue" style={{ marginBottom: '0.75rem' }}>Skill Accelerator</span>
          <h2 style={{ fontSize: '2.5rem', color: '#0b0f19', marginBottom: '0.75rem' }}>
            Guided Skill Training + <span className="text-blue">Internship</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem' }}>
            Structured curriculum modules, hands-on lab projects, executive founder mentorship, and practical internship placement.
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
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.5rem', width: '100%', maxWidth: '520px', margin: '0 auto' }}>
            <input 
              type="text" 
              placeholder="Search training track by domain, language, or stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', fontSize: '0.95rem' }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '0.65rem 1.4rem' }}>
              Search Training Tracks
            </button>
          </form>

          {/* Domain Filter Pills */}
          <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {domains.map((dom) => (
              <button
                key={dom}
                onClick={() => setSelectedDomain(dom)}
                style={{
                  padding: '0.5rem 1.1rem',
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
                  <span style={{ fontSize: '0.82rem', color: '#2563eb', fontWeight: '700' }}>Training + Internship</span>
                </div>

                <h3 style={{ fontSize: '1.25rem', color: '#0b0f19', marginBottom: '0.75rem', lineHeight: '1.3' }}>
                  {prog.title}
                </h3>

                <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.25rem', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {prog.description}
                </p>

                {/* Technology pill tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                  {prog.skillsRequired.map((skill, i) => (
                    <span key={i} style={{
                      fontSize: '0.78rem',
                      background: '#eff6ff',
                      border: '1px solid #dbeafe',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '6px',
                      color: '#2563eb',
                      fontWeight: '600'
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>

                {/* All Available Duration Pricing Options */}
                <div style={{
                  background: '#eff6ff',
                  border: '1px solid #dbeafe',
                  borderRadius: '12px',
                  padding: '0.85rem 1rem',
                  marginBottom: '1.5rem'
                }}>
                  <span style={{ fontSize: '0.75rem', color: '#1d4ed8', fontWeight: '800', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    ⏱️ Available Durations & Fees:
                  </span>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(85px, 1fr))',
                    gap: '0.4rem'
                  }}>
                    <div style={{ background: '#ffffff', border: '1px solid #bfdbfe', padding: '0.35rem 0.5rem', borderRadius: '6px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block', fontWeight: '600' }}>1 Week</span>
                      <strong style={{ fontSize: '0.85rem', color: '#1d4ed8' }}>NPR 500</strong>
                    </div>
                    <div style={{ background: '#ffffff', border: '1px solid #bfdbfe', padding: '0.35rem 0.5rem', borderRadius: '6px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block', fontWeight: '600' }}>2 Weeks</span>
                      <strong style={{ fontSize: '0.85rem', color: '#1d4ed8' }}>NPR 700</strong>
                    </div>
                    <div style={{ background: '#ffffff', border: '1px solid #bfdbfe', padding: '0.35rem 0.5rem', borderRadius: '6px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block', fontWeight: '600' }}>3 Weeks</span>
                      <strong style={{ fontSize: '0.85rem', color: '#1d4ed8' }}>NPR 950</strong>
                    </div>
                    <div style={{ background: '#ffffff', border: '1px solid #bfdbfe', padding: '0.35rem 0.5rem', borderRadius: '6px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block', fontWeight: '600' }}>1 Month</span>
                      <strong style={{ fontSize: '0.85rem', color: '#1d4ed8' }}>NPR 1,200</strong>
                    </div>
                    <div style={{ background: '#ffffff', border: '1px solid #bfdbfe', padding: '0.35rem 0.5rem', borderRadius: '6px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block', fontWeight: '600' }}>2 Months</span>
                      <strong style={{ fontSize: '0.85rem', color: '#1d4ed8' }}>NPR 5,000</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer with Duration Price Summary */}
              <div style={{ paddingTop: '1rem', borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748b' }}>Training Fee Starts At</span>
                  <span style={{ fontSize: '1.05rem', fontWeight: '800', color: '#2563eb' }}>
                    NPR 500 <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>(1 Wk)</span> • NPR 1,200 <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>(1 Mon)</span>
                  </span>
                </div>

                <button 
                  onClick={() => {
                    setSelectedProgram(prog);
                    setShowApplyModal(true);
                  }}
                  className="btn-primary"
                  style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem' }}
                >
                  Enroll in Training Track
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Application Modal */}
      {showApplyModal && selectedProgram && (
        <div className="modal-overlay" onClick={() => setShowApplyModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '620px' }}>
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
            <h2 style={{ fontSize: '1.7rem', color: '#0b0f19', marginBottom: '0.25rem' }}>{selectedProgram.title}</h2>
            <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
              Track: <strong>Guided Skill Training + Internship</strong> • Certificate: <strong>QR Verified</strong>
            </p>

            {applySuccessMsg ? (
              <div style={{ padding: '2rem', textAlign: 'center', background: '#ecfdf5', border: '1px solid #10b981', borderRadius: '12px', color: '#059669' }}>
                <p style={{ fontSize: '1.1rem', fontWeight: '700' }}>{applySuccessMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                
                {/* Duration Selector */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.4rem', fontWeight: '600' }}>
                    Select Training Duration
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {trainingDurations.map((opt) => (
                      <button
                        type="button"
                        key={opt.duration}
                        onClick={() => setSelectedDuration(opt.duration)}
                        style={{
                          padding: '0.55rem 0.95rem',
                          borderRadius: '8px',
                          fontSize: '0.82rem',
                          fontWeight: '700',
                          background: selectedDuration === opt.duration ? '#2563eb' : '#f8fafc',
                          color: selectedDuration === opt.duration ? '#ffffff' : '#334155',
                          border: selectedDuration === opt.duration ? '1px solid #2563eb' : '1px solid #cbd5e1'
                        }}
                      >
                        {opt.duration} ({opt.text})
                      </button>
                    ))}
                  </div>
                </div>

                {/* Total Calculated Fee Summary Box */}
                <div style={{
                  background: '#eff6ff',
                  border: '1px solid #2563eb',
                  borderRadius: '12px',
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'space-between'
                }}>
                  <div>
                    <span style={{ fontSize: '0.78rem', color: '#2563eb', fontWeight: '700', display: 'block' }}>Total Training & Internship Fee</span>
                    <strong style={{ fontSize: '1.3rem', color: '#1d4ed8' }}>
                      {currentPricingObj ? currentPricingObj.text : 'NPR 1,200'}
                    </strong>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#2563eb', background: '#ffffff', padding: '0.3rem 0.75rem', borderRadius: '9999px', border: '1px solid #dbeafe', fontWeight: '700' }}>
                    Training + Internship • {selectedDuration}
                  </span>
                </div>

                {/* Applicant Info Fields */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: '#64748b', marginBottom: '0.3rem', fontWeight: '600' }}>Applicant Name</label>
                    <input 
                      type="text"
                      required
                      value={formData.studentName}
                      onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: '#64748b', marginBottom: '0.3rem', fontWeight: '600' }}>Email Address</label>
                    <input 
                      type="email"
                      required
                      value={formData.studentEmail}
                      onChange={(e) => setFormData({...formData, studentEmail: e.target.value})}
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#64748b', marginBottom: '0.3rem', fontWeight: '600' }}>Portfolio / GitHub Link</label>
                  <input 
                    type="url"
                    value={formData.portfolioUrl}
                    onChange={(e) => setFormData({...formData, portfolioUrl: e.target.value})}
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#64748b', marginBottom: '0.3rem', fontWeight: '600' }}>Statement of Purpose</label>
                  <textarea 
                    rows={2}
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
                  <button type="submit" disabled={submitting} className="btn-primary">
                    {submitting ? 'Submitting...' : `Confirm Enrollment (${currentPricingObj ? currentPricingObj.text : 'NPR 1,200'})`}
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
