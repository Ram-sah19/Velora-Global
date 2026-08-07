import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/11D9YEYK13bavROGMxlvO35k46MzrDHTTiHFd-PQqfy4/preview";

const softwareDevSubDomains = [
  'Frontend Development',
  'Backend Development',
  'Full Stack Development',
  'Mobile App Development',
  'Software Development'
];

export default function InternshipsPage() {
  const [programs, setPrograms] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

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
    const fetchPrograms = async () => {
      try {
        const filterDomain = selectedDomain === 'Software Development' ? '' : selectedDomain;
        const data = await api.getPrograms(filterDomain, searchQuery);
        
        let filtered = data;
        if (selectedDomain === 'Software Development') {
          filtered = filtered.filter(p => softwareDevSubDomains.includes(p.domain));
        }

        setPrograms(filtered);
      } catch (err) {
        console.error("Failed to load internship programs", err);
      }
    };
    fetchPrograms();
  }, [selectedDomain, searchQuery]);

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

  return (
    <section style={{ padding: '4rem 0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem auto' }}>
          <span className="badge badge-coral" style={{ marginBottom: '0.75rem' }}>Practical Work Experience</span>
          <h2 style={{ fontSize: '2.5rem', color: '#0b0f19', marginBottom: '0.75rem' }}>
            Practical Project <span className="text-coral">Internships</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem' }}>
            Gain real industry work experience. Flexible durations starting from 2 Weeks (NPR 199) to 6 Months (NPR 4,000) with verified QR certification.
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
              placeholder="Search internship by domain or tech stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', fontSize: '0.95rem' }}
            />
            <button type="submit" className="btn-coral" style={{ padding: '0.65rem 1.4rem' }}>
              Search Internships
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
                  background: selectedDomain === dom ? '#ff6b6b' : '#ffffff',
                  border: selectedDomain === dom ? '1px solid #ff6b6b' : '1px solid #e2e8f0',
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
                  <span className="badge badge-coral" style={{ fontSize: '0.75rem' }}>
                    {prog.domain}
                  </span>
                  <span style={{ fontSize: '0.82rem', color: '#ff6b6b', fontWeight: '700' }}>Practical Internship</span>
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
                      background: '#fff5f5',
                      border: '1px solid #ffe3e3',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '6px',
                      color: '#0b0f19',
                      fontWeight: '600'
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>

                {/* All Available Duration Pricing Options */}
                <div style={{
                  background: '#fff5f5',
                  border: '1px solid #ffe3e3',
                  borderRadius: '12px',
                  padding: '0.85rem 1rem',
                  marginBottom: '1.5rem'
                }}>
                  <span style={{ fontSize: '0.75rem', color: '#e03131', fontWeight: '800', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    ⏱️ Available Durations & Fees:
                  </span>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(85px, 1fr))',
                    gap: '0.4rem'
                  }}>
                    <div style={{ background: '#ffffff', border: '1px solid #fcc4c4', padding: '0.35rem 0.5rem', borderRadius: '6px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block', fontWeight: '600' }}>2 Weeks</span>
                      <strong style={{ fontSize: '0.85rem', color: '#e03131' }}>NPR 199</strong>
                    </div>
                    <div style={{ background: '#ffffff', border: '1px solid #fcc4c4', padding: '0.35rem 0.5rem', borderRadius: '6px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block', fontWeight: '600' }}>1 Month</span>
                      <strong style={{ fontSize: '0.85rem', color: '#e03131' }}>NPR 299</strong>
                    </div>
                    <div style={{ background: '#ffffff', border: '1px solid #fcc4c4', padding: '0.35rem 0.5rem', borderRadius: '6px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block', fontWeight: '600' }}>2 Months</span>
                      <strong style={{ fontSize: '0.85rem', color: '#e03131' }}>NPR 500</strong>
                    </div>
                    <div style={{ background: '#ffffff', border: '1px solid #fcc4c4', padding: '0.35rem 0.5rem', borderRadius: '6px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block', fontWeight: '600' }}>3 Months</span>
                      <strong style={{ fontSize: '0.85rem', color: '#e03131' }}>NPR 2,000</strong>
                    </div>
                    <div style={{ background: '#ffffff', border: '1px solid #fcc4c4', padding: '0.35rem 0.5rem', borderRadius: '6px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block', fontWeight: '600' }}>6 Months</span>
                      <strong style={{ fontSize: '0.85rem', color: '#e03131' }}>NPR 4,000</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer with Direct Google Form Redirect Link */}
              <div style={{ paddingTop: '1rem', borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748b' }}>Internship Fee Starts At</span>
                  <span style={{ fontSize: '1.05rem', fontWeight: '800', color: '#ff6b6b' }}>
                    NPR 199 <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>(2 Wks)</span> • NPR 299 <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>(1 Mon)</span>
                  </span>
                </div>

                <a 
                  href={GOOGLE_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-coral"
                  style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-block' }}
                >
                  Apply for Internship ➔
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
