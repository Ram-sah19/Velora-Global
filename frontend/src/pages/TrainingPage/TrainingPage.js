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

const defaultTrainingPrograms = [
  {
    id: "prog-fe-training",
    title: "Frontend Development & Modern React.js Training",
    domain: "Frontend Development",
    fee: "NPR 3,000",
    feeAmount: 3000,
    description: "Build high-performance, responsive web interfaces using modern React, HTML5, CSS3, JavaScript ES6+, and state management.",
    skillsRequired: ["React.js", "JavaScript ES6+", "HTML5 & CSS3", "TailwindCSS", "Git"]
  },
  {
    id: "prog-be-training",
    title: "Backend Development & Node.js API Training",
    domain: "Backend Development",
    fee: "NPR 4,000",
    feeAmount: 4000,
    description: "Design RESTful APIs, manage MongoDB databases, write serverless functions, and implement secure authentication with Node.js and Express.",
    skillsRequired: ["Node.js", "Express.js", "MongoDB", "REST APIs", "JWT Auth"]
  },
  {
    id: "prog-fs-ai-training",
    title: "Full Stack Development with AI Integration Training",
    domain: "Full Stack with AI",
    fee: "NPR 10,000",
    feeAmount: 10000,
    description: "End-to-end full stack web engineering (React + Node.js + MongoDB) integrated with LLMs, OpenAI/Gemini APIs, and intelligent AI agents.",
    skillsRequired: ["React.js", "Node.js", "Express.js", "MongoDB", "AI/LLM APIs", "LangChain"]
  },
  {
    id: "prog-aiml-training",
    title: "AI & Machine Learning Engineering Training",
    domain: "Artificial Intelligence & Machine Learning",
    fee: "NPR 12,000",
    feeAmount: 12000,
    description: "Train machine learning models, implement computer vision and NLP algorithms, and deploy production-ready AI models with Python.",
    skillsRequired: ["Python", "TensorFlow / PyTorch", "Scikit-Learn", "Computer Vision", "Model Deployment"]
  },
  {
    id: "prog-dl-training",
    title: "Deep Learning & Neural Networks Training",
    domain: "Deep Learning",
    fee: "NPR 3,000",
    feeAmount: 3000,
    description: "Master Artificial Neural Networks (ANN), Convolutional Neural Networks (CNN), Recurrent Neural Networks (RNN), and PyTorch frameworks.",
    skillsRequired: ["PyTorch", "Neural Networks", "CNN / RNN", "Python", "GPU Acceleration"]
  },
  {
    id: "prog-js-training",
    title: "JavaScript & Modern ES6+ Training",
    domain: "JavaScript",
    fee: "NPR 3,000",
    feeAmount: 3000,
    description: "Master JavaScript fundamentals, asynchronous ES6+, DOM manipulation, Node.js runtime, and modern full stack web development.",
    skillsRequired: ["JavaScript ES6+", "Node.js", "Async/Await", "DOM Manipulation", "Express.js"]
  },
  {
    id: "prog-java-training",
    title: "Java Core, Spring Boot & Microservices Training",
    domain: "Java",
    fee: "NPR 3,000",
    feeAmount: 3000,
    description: "Master Object-Oriented Programming (OOP), Data Structures, Java Core, Spring Boot REST APIs, and enterprise microservices.",
    skillsRequired: ["Java Core", "Spring Boot", "OOP Concepts", "Hibernate / JPA", "REST Microservices"]
  },
  {
    id: "prog-py-training",
    title: "Python Programming, Automation & Scripting Training",
    domain: "Python",
    fee: "NPR 3,000",
    feeAmount: 3000,
    description: "Master Python syntax, object-oriented design, automated web scraping, data structures, and backend API development.",
    skillsRequired: ["Python 3", "OOP", "Django / FastAPI", "Web Scraping", "Data Structures"]
  },
  {
    id: "prog-mern-training",
    title: "MERN Stack Development Training",
    domain: "MERN Stack",
    fee: "NPR 10,000",
    feeAmount: 10000,
    description: "Complete hands-on mastery of MongoDB, Express.js, React.js, and Node.js to build scalable, full-stack web applications.",
    skillsRequired: ["MongoDB", "Express.js", "React.js", "Node.js", "Redux", "JWT Auth"]
  },
  {
    id: "prog-pern-training",
    title: "PERN Stack Development Training",
    domain: "PERN Stack",
    fee: "NPR 10,000",
    feeAmount: 10000,
    description: "Master PostgreSQL relational databases, Express.js, React.js, and Node.js for high-performance enterprise web systems.",
    skillsRequired: ["PostgreSQL", "Express.js", "React.js", "Node.js", "SQL / Sequelize", "REST APIs"]
  },
  {
    id: "prog-uiux-training",
    title: "UI/UX Product Design & Figma Training",
    domain: "UI/UX Design",
    fee: "NPR 3,000",
    feeAmount: 3000,
    description: "Master user research, wireframing, high-fidelity Figma UI design systems, and interactive prototyping.",
    skillsRequired: ["Figma", "User Research", "Wireframing", "Design Systems", "Prototyping"]
  },
  {
    id: "prog-qa-training",
    title: "Software Testing & QA Automation Training",
    domain: "Software Testing",
    fee: "NPR 3,000",
    feeAmount: 3000,
    description: "Learn manual and automated software testing, unit testing frameworks, end-to-end integration tests, and QA bug reporting.",
    skillsRequired: ["Jest", "Cypress / Selenium", "Manual Testing", "Bug Tracking", "QA Test Plans"]
  },
  {
    id: "prog-mobile-training",
    title: "Mobile App Engineering Training",
    domain: "Mobile App Development",
    fee: "NPR 4,000",
    feeAmount: 4000,
    description: "Create cross-platform mobile apps for iOS and Android using React Native / Flutter with seamless API integration.",
    skillsRequired: ["React Native", "Flutter", "Mobile UI", "REST APIs"]
  }
];

export default function TrainingPage({ activeRole, onApplySuccess, currentUser, onOpenAuth }) {
  const [programs, setPrograms] = useState([]);
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
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3rem auto' }}>
          <span className="badge badge-blue" style={{ marginBottom: '0.75rem' }}>Guided Skill Accelerator</span>
          <h2 style={{ fontSize: '2.5rem', color: '#0b0f19', marginBottom: '0.75rem' }}>
            Structured Skill <span className="text-blue">Training Programs</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Master in-demand tech stacks and programming languages under guided mentor instruction with verified QR credentials.
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
              type="text" 
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
          <div style={{
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

        {/* Programs Grid — Perfectly Aligned Equal Height Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))',
          gap: '1.75rem',
          width: '100%'
        }}>
          {programs.map((prog) => (
            <div 
              key={prog.id} 
              className="corporate-card" 
              style={{ 
                padding: '1.75rem', 
                display: 'flex', 
                flexDirection: 'column', 
                justify: 'space-between',
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
                    <span>QR Credentials</span>
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

                <button 
                  onClick={() => setSelectedProgramForDetails(prog)}
                  className="btn-primary"
                  style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem', fontWeight: '700', borderRadius: '10px' }}
                >
                  View Details ➔
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
