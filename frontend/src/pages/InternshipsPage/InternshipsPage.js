import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import InternshipDetailsModal from './InternshipDetailsModal';

const softwareDevSubDomains = [
  'Frontend Development',
  'Backend Development',
  'Full Stack Development',
  'Mobile App Development',
  'Software Development'
];

const languageInternshipPrograms = [
  {
    id: "prog-js-internship",
    title: "JavaScript & Modern ES6+ Full Stack Internship",
    domain: "JavaScript",
    description: "Build high-performance, asynchronous web applications using JavaScript ES6+, Node.js runtime, REST APIs, and modern frontend frameworks.",
    skillsRequired: ["JavaScript ES6+", "Node.js", "Async/Await", "DOM Manipulation", "Express.js"]
  },
  {
    id: "prog-java-internship",
    title: "Java Core, Spring Boot & Microservices Internship",
    domain: "Java",
    description: "Design enterprise REST APIs, database entity relationships, and microservice architecture using Java Core and Spring Boot.",
    skillsRequired: ["Java Core", "Spring Boot", "OOP Concepts", "Hibernate / JPA", "REST Microservices"]
  },
  {
    id: "prog-py-internship",
    title: "Python Programming, Scripting & Automation Internship",
    domain: "Python",
    description: "Develop automated data processing pipelines, web scrapers, object-oriented software scripts, and backend REST APIs with Python.",
    skillsRequired: ["Python 3", "OOP", "Django / FastAPI", "Web Scraping", "Data Structures"]
  }
];

export default function InternshipsPage({ activeRole, onApplySuccess, currentUser, onOpenAuth }) {
  const [programs, setPrograms] = useState([]);
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

      // Merge backend programs with explicit language internship programs
      const combined = [...languageInternshipPrograms, ...(data || [])];
      
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
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3rem auto' }}>
          <span className="badge badge-coral" style={{ marginBottom: '0.75rem' }}>Practical Work Experience</span>
          <h2 style={{ fontSize: '2.5rem', color: '#0b0f19', marginBottom: '0.75rem' }}>
            Practical Project <span className="text-coral">Internships</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Gain real industry work experience in key programming languages & domain tracks. Flexible durations from 2 Weeks (NPR 199) to 6 Months (NPR 3,000) with 1-to-1 mentorship and QR credentials.
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
              placeholder="Search internship by domain, language, or tech stack..."
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

        {/* Programs Grid — Clean, Spacious & Uncluttered */}
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

                <h3 style={{ fontSize: '1.3rem', color: '#0b0f19', marginBottom: '0.75rem', lineHeight: '1.3', fontWeight: '800' }}>
                  {prog.title}
                </h3>

                <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.25rem', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.6' }}>
                  {prog.description}
                </p>

                {/* Technology pill tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                  {(prog.skillsRequired || []).map((skill, i) => (
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

                {/* Key Highlights Strip */}
                <div style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '0.85rem 1rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: '#475569', fontWeight: '600' }}>
                    <span>1-to-1 Mentorship</span>
                    <span>•</span>
                    <span>2+ Live Projects</span>
                    <span>•</span>
                    <span>QR Credentials</span>
                  </div>
                </div>
              </div>

              {/* Card Footer with Details Action Button */}
              <div style={{ paddingTop: '1rem', borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748b' }}>Fee Starts At</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ff6b6b' }}>
                    NPR 199 <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>(2 Wks)</span>
                  </span>
                </div>

                <button 
                  onClick={() => setSelectedProgramForDetails(prog)}
                  className="btn-coral"
                  style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem', fontWeight: '700' }}
                >
                  View Program Details ➔
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Animated Program Details Modal */}
      {selectedProgramForDetails && (
        <InternshipDetailsModal 
          program={selectedProgramForDetails}
          currentUser={currentUser}
          onOpenAuth={onOpenAuth}
          onApplySuccess={onApplySuccess}
          onClose={() => setSelectedProgramForDetails(null)}
        />
      )}
    </section>
  );
}
