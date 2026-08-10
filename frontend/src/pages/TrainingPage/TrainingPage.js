import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import TrainingDetailsModal from './TrainingDetailsModal';

const softwareDevSubDomains = [
  'Frontend Development',
  'Backend Development',
  'Full Stack Development',
  'Software Development'
];

const isExcludedProgram = (p) => {
  const text = ((p.domain || '') + " " + (p.title || '')).toLowerCase();
  return (
    text.includes('cyber') ||
    text.includes('cloud') ||
    text.includes('devops') ||
    text.includes('data science') ||
    text.includes('mobile')
  );
};

const defaultTrainingPrograms = [
  {
    id: "prog-js-training",
    title: "JavaScript & Modern ES6+ Full Stack Training",
    domain: "JavaScript",
    description: "Master JavaScript fundamentals, asynchronous ES6+, DOM manipulation, Node.js runtime, and modern full stack web development.",
    skillsRequired: ["JavaScript ES6+", "Node.js", "Async/Await", "DOM Manipulation", "Express.js"]
  },
  {
    id: "prog-java-training",
    title: "Java Core, Spring Boot & Microservices Training",
    domain: "Java",
    description: "Master Object-Oriented Programming (OOP), Data Structures, Java Core, Spring Boot REST APIs, and enterprise microservices.",
    skillsRequired: ["Java Core", "Spring Boot", "OOP Concepts", "Hibernate / JPA", "REST Microservices"]
  },
  {
    id: "prog-py-training",
    title: "Python Programming, Automation & Scripting Training",
    domain: "Python",
    description: "Master Python syntax, object-oriented design, automated web scraping, data structures, and backend API development.",
    skillsRequired: ["Python 3", "OOP", "Django / FastAPI", "Web Scraping", "Data Structures"]
  },
  {
    id: "prog-fe-training",
    title: "Frontend Development & Modern React.js Training",
    domain: "Frontend Development",
    description: "Build high-performance, responsive web interfaces using modern React, HTML5, CSS3, and JavaScript ES6+.",
    skillsRequired: ["React.js", "JavaScript ES6+", "HTML5 & CSS3", "TailwindCSS", "Git"]
  },
  {
    id: "prog-be-training",
    title: "Backend Development & Node.js API Training",
    domain: "Backend Development",
    description: "Design RESTful APIs, manage databases, write serverless functions, and implement secure authentication with Node.js and Express.",
    skillsRequired: ["Node.js", "Express.js", "MongoDB", "REST APIs", "JWT"]
  },
  {
    id: "prog-fs-training",
    title: "Full Stack Web Engineering Training",
    domain: "Full Stack Development",
    description: "End-to-end web application development combining React client frontend with Node.js Express server and MongoDB database.",
    skillsRequired: ["React.js", "Node.js", "Express.js", "MongoDB", "MVC Architecture"]
  },
  {
    id: "prog-uiux-training",
    title: "UI/UX Product Design & Figma Training",
    domain: "UI/UX Design",
    description: "Master user research, wireframing, high-fidelity Figma UI design systems, and interactive prototyping.",
    skillsRequired: ["Figma", "User Research", "Wireframing", "Design Systems", "Prototyping"]
  },
  {
    id: "prog-aiml-training",
    title: "AI & Machine Learning Foundations Training",
    domain: "Artificial Intelligence & Machine Learning",
    description: "Train machine learning models, implement natural language processing algorithms, and deploy AI solutions.",
    skillsRequired: ["Python", "TensorFlow / PyTorch", "Scikit-Learn", "Model Deployment"]
  },
  {
    id: "prog-mobile-training",
    title: "Mobile App Engineering Training",
    domain: "Mobile App Development",
    description: "Create cross-platform mobile apps for iOS and Android using React Native / Flutter with seamless API integration.",
    skillsRequired: ["React Native", "Flutter", "Mobile UI", "REST APIs"]
  },
  {
    id: "prog-qa-training",
    title: "Software Testing & QA Automation Training",
    domain: "Software Testing",
    description: "Learn manual and automated software testing, unit testing frameworks, end-to-end integration tests, and QA bug reporting.",
    skillsRequired: ["Jest", "Cypress / Selenium", "Manual Testing", "Bug Tracking", "QA Test Plans"]
  }
];

export default function TrainingPage({ activeRole, onApplySuccess, currentUser, onOpenAuth }) {
  const [programs, setPrograms] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProgramForDetails, setSelectedProgramForDetails] = useState(null);

  const domains = [
    'All',
    'Software Development',
    'Artificial Intelligence & Machine Learning',
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

        // Merge backend programs with full default training programs
        const combined = [...defaultTrainingPrograms, ...(data || [])];
        
        // Remove duplicates by id
        const unique = Array.from(new Map(combined.map(item => [item.id || item.title, item])).values());

        let filtered = unique.filter(p => !isExcludedProgram(p));

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
      }
    };
    fetchPrograms();
  }, [selectedDomain, searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Search is handled via searchQuery state in useEffect
  };

  return (
    <section style={{ padding: '4rem 0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3rem auto' }}>
          <span className="badge badge-blue" style={{ marginBottom: '0.75rem' }}>Guided Skill Accelerator</span>
          <h2 style={{ fontSize: '2.5rem', color: '#0b0f19', marginBottom: '0.75rem' }}>
            Structured Skill <span className="text-blue">Training Programs</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Master in-demand tech stacks and programming languages under guided mentor instruction. Flexible durations from 1 Week (NPR 500) to 2 Months (NPR 5,000) with verified QR credentials.
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
              placeholder="Search training track by domain, language, or tech stack..."
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
                  <span className="badge badge-blue" style={{ fontSize: '0.75rem' }}>
                    {prog.domain}
                  </span>
                  <span style={{ fontSize: '0.82rem', color: '#2563eb', fontWeight: '700' }}>Guided Skill Training</span>
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

                {/* Key Highlights Strip */}
                <div style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '0.85rem 1rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: '#475569', fontWeight: '600' }}>
                    <span>Guided Labs</span>
                    <span>•</span>
                    <span>Mentor Code Review</span>
                    <span>•</span>
                    <span>QR Credentials</span>
                  </div>
                </div>
              </div>

              {/* Card Footer with Details Action Button */}
              <div style={{ paddingTop: '1rem', borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748b' }}>Fee Starts At</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: '800', color: '#2563eb' }}>
                    NPR 500 <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>(1 Wk)</span>
                  </span>
                </div>

                <button 
                  onClick={() => setSelectedProgramForDetails(prog)}
                  className="btn-primary"
                  style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem', fontWeight: '700' }}
                >
                  View Training Details ➔
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Animated Training Details Modal */}
      {selectedProgramForDetails && (
        <TrainingDetailsModal 
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
