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

const defaultInternshipPrograms = [
  {
    id: "prog-fe-1",
    title: "Frontend Development Internship",
    domain: "Frontend Development",
    duration: "6 Weeks",
    stipend: "NPR 299 (1 Mon Internship) / NPR 1,200 (Training + Internship)",
    locationType: "Remote",
    level: "All Levels",
    description: "Build high-performance, responsive web interfaces using modern React, HTML5, CSS3, and JavaScript ES6+.",
    skillsRequired: ["React.js", "JavaScript ES6+", "HTML5 & CSS3", "TailwindCSS", "Git"],
    perks: ["Official Velora Global Certificate", "Mentorship from Co-Founders"],
    deliverables: ["Develop interactive responsive UI components", "Optimize lighthouse performance"],
    status: "Active"
  },
  {
    id: "prog-be-1",
    title: "Backend Development Internship",
    domain: "Backend Development",
    duration: "8 Weeks",
    stipend: "NPR 299 (1 Mon Internship) / NPR 1,200 (Training + Internship)",
    locationType: "Remote",
    level: "Intermediate",
    description: "Design RESTful APIs, manage databases, write serverless functions, and implement secure authentication with Node.js and Express.",
    skillsRequired: ["Node.js", "Express.js", "MongoDB", "REST APIs", "JWT"],
    perks: ["Verified Certificate", "Backend Architecture Mentorship"],
    deliverables: ["Build robust RESTful endpoints", "Implement database CRUD & authentication"],
    status: "Active"
  },
  {
    id: "prog-fs-1",
    title: "Full Stack Development Internship",
    domain: "Full Stack Development",
    duration: "8 Weeks",
    stipend: "NPR 299 (1 Mon Internship) / NPR 1,200 (Training + Internship)",
    locationType: "Remote / Hybrid",
    level: "Intermediate",
    description: "End-to-end web application development combining React client frontend with Node.js Express server and MongoDB database.",
    skillsRequired: ["React.js", "Node.js", "Express.js", "MongoDB", "MVC Architecture"],
    perks: ["Official Velora Global Certificate", "Executive Feedback"],
    deliverables: ["Build end-to-end full stack application", "Deploy production web bundle"],
    status: "Active"
  },
  {
    id: "prog-mobile-1",
    title: "Mobile App Development Internship",
    domain: "Mobile App Development",
    duration: "8 Weeks",
    stipend: "NPR 299 (1 Mon Internship) / NPR 1,200 (Training + Internship)",
    locationType: "Remote",
    level: "All Levels",
    description: "Create cross-platform mobile apps for iOS and Android using React Native / Flutter with seamless API integration.",
    skillsRequired: ["React Native", "Flutter", "Mobile UI", "REST APIs"],
    perks: ["Certificate of Excellence", "App Store Publishing Experience"],
    deliverables: ["Develop cross-platform mobile app UI", "Integrate push notifications and storage"],
    status: "Active"
  },
  {
    id: "prog-aiml-1",
    title: "Artificial Intelligence & Machine Learning Internship",
    domain: "Artificial Intelligence & Machine Learning",
    duration: "8 Weeks",
    stipend: "NPR 299 (1 Mon Internship) / NPR 1,200 (Training + Internship)",
    locationType: "Remote",
    level: "Intermediate / Advanced",
    description: "Train machine learning models, implement natural language processing algorithms, and deploy AI solutions.",
    skillsRequired: ["Python", "TensorFlow / PyTorch", "Scikit-Learn", "Model Deployment"],
    perks: ["Verified Velora Global Certificate", "AI Research Mentorship"],
    deliverables: ["Train predictive ML classification model", "Deploy AI model inference API"],
    status: "Active"
  },
  {
    id: "prog-ds-1",
    title: "Data Science Internship",
    domain: "Data Science",
    duration: "8 Weeks",
    stipend: "NPR 299 (1 Mon Internship) / NPR 1,200 (Training + Internship)",
    locationType: "Remote",
    level: "Intermediate",
    description: "Perform data wrangling, exploratory analysis, statistical modeling, and interactive data visualization.",
    skillsRequired: ["Python", "Pandas & NumPy", "SQL", "Data Visualization", "PowerBI"],
    perks: ["Verified Certificate", "Real-World Datasets"],
    deliverables: ["Perform exploratory dataset analysis", "Create executive data visualization report"],
    status: "Active"
  },
  {
    id: "prog-cyber-1",
    title: "Cybersecurity Internship",
    domain: "Cybersecurity",
    duration: "6 Weeks",
    stipend: "NPR 299 (1 Mon Internship) / NPR 1,200 (Training + Internship)",
    locationType: "Remote",
    level: "All Levels",
    description: "Understand network security fundamentals, penetration testing, vulnerability assessment, and security auditing.",
    skillsRequired: ["Network Security", "Ethical Hacking Basics", "Vulnerability Scanning", "Linux"],
    perks: ["Official Certificate", "Security Audit Experience"],
    deliverables: ["Conduct web vulnerability audit", "Formulate security patch documentation"],
    status: "Active"
  },
  {
    id: "prog-uiux-1",
    title: "UI/UX Design Internship",
    domain: "UI/UX Design",
    duration: "6 Weeks",
    stipend: "NPR 299 (1 Mon Internship) / NPR 1,200 (Training + Internship)",
    locationType: "Remote",
    level: "All Levels",
    description: "Master user research, wireframing, high-fidelity Figma UI design systems, and interactive prototyping.",
    skillsRequired: ["Figma", "User Research", "Wireframing", "Design Systems", "Prototyping"],
    perks: ["Certificate of Excellence", "Design Review Sessions"],
    deliverables: ["Create multi-device design system", "Deliver interactive Figma prototype"],
    status: "Active"
  },
  {
    id: "prog-cloud-1",
    title: "Cloud & DevOps Internship",
    domain: "Cloud & DevOps",
    duration: "8 Weeks",
    stipend: "NPR 299 (1 Mon Internship) / NPR 1,200 (Training + Internship)",
    locationType: "Remote",
    level: "Intermediate",
    description: "Implement CI/CD automation pipelines, containerize applications with Docker, and manage cloud infrastructure.",
    skillsRequired: ["Docker", "Kubernetes Basics", "AWS / GCP", "CI/CD Pipelines", "Linux"],
    perks: ["Verified Certificate", "Cloud Architecture Mentorship"],
    deliverables: ["Automate Docker container build", "Deploy CI/CD deployment pipeline"],
    status: "Active"
  },
  {
    id: "prog-qa-1",
    title: "Software Testing Internship",
    domain: "Software Testing",
    duration: "6 Weeks",
    stipend: "NPR 299 (1 Mon Internship) / NPR 1,200 (Training + Internship)",
    locationType: "Remote",
    level: "All Levels",
    description: "Learn manual and automated software testing, unit testing frameworks, end-to-end integration tests, and QA bug reporting.",
    skillsRequired: ["Jest", "Cypress / Selenium", "Manual Testing", "Bug Tracking", "QA Test Plans"],
    perks: ["Official Certificate", "QA Lead Mentorship"],
    deliverables: ["Write comprehensive QA test suite", "Conduct automated E2E integration test"],
    status: "Active"
  },
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

      // Merge backend programs with full default internship programs
      const combined = [...defaultInternshipPrograms, ...(data || [])];
      
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
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.5rem', width: '100%', maxWidth: '520px', margin: '0 auto', flexWrap: 'wrap' }}>
            <input 
              type="text" 
              placeholder="Search internship by domain, language, or tech stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ flex: '1 1 200px', width: '100%', fontSize: '0.95rem' }}
            />
            <button type="submit" className="btn-coral" style={{ padding: '0.65rem 1.4rem', whiteSpace: 'nowrap' }}>
              Search Internships
            </button>
          </form>

          {/* Domain Filter Pills — Horizontal swipeable bar on mobile */}
          <div className="horizontal-scroll-mobile">
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
                  boxShadow: 'var(--shadow-sm)',
                  whiteSpace: 'nowrap'
                }}
              >
                {dom}
              </button>
            ))}
          </div>

        </div>

        {/* Programs Grid — Mobile & Tablet Adaptive Card Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1.5rem',
          width: '100%'
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
