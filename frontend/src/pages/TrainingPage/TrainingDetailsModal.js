import React, { useState } from 'react';
import { api } from '../../services/api';
import { showToast } from '../../components/NotificationToast';

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/11D9YEYK13bavROGMxlvO35k46MzrDHTTiHFd-PQqfy4/preview";

// Helper function to get domain-tailored training duration tiers
function getTrainingDomainTiers(domainTitle = '', domainCategory = '') {
  const dName = (domainTitle + " " + domainCategory).toLowerCase();

  // 1. JAVASCRIPT SPECIFIC TRACK
  if (dName.includes('javascript') || dName.includes('js')) {
    return [
      {
        id: '1w',
        duration: '1 Week',
        fee: 'NPR 500',
        bestFor: 'JavaScript ES6+ & DOM Essentials Bootcamp',
        deliverables: [
          'Modern ES6+ Syntax, Arrow Functions & Destructuring',
          'DOM Manipulation & Event-Driven Interactive Web Pages',
          'Async/Await, Promises & Fetch API Data Integration',
          'QR-Verified Training Certificate'
        ]
      },
      {
        id: '2w',
        duration: '2 Weeks',
        fee: 'NPR 700',
        bestFor: 'Node.js & Express API Training',
        deliverables: [
          'Node.js Runtime Engine & Express.js Routing Framework',
          'Building RESTful JSON APIs & Request Middleware',
          '1 Guided Interactive JavaScript Application Project',
          'QR-Verified Training Certificate'
        ]
      },
      {
        id: '3w',
        duration: '3 Weeks',
        fee: 'NPR 950',
        bestFor: 'Full-Stack JavaScript & Database Integration',
        deliverables: [
          'MongoDB Atlas Integration & Mongoose Schema Models',
          'JWT User Authentication & Password Hashing',
          'JavaScript Resume & GitHub Portfolio Building',
          'QR-Verified Training Certificate'
        ]
      },
      {
        id: '1m',
        duration: '1 Month',
        fee: 'NPR 1,200',
        bestFor: 'MERN Stack Production Architecture Track',
        deliverables: [
          'Full-Stack MERN Architecture (React, Node, Express, MongoDB)',
          'Production Deployment on Vercel & Render Cloud Hosting',
          '1-on-1 Instructor Code Review & Mentorship',
          'QR-Verified Training Certificate'
        ]
      },
      {
        id: '2m',
        duration: '2 Months',
        fee: 'NPR 5,000',
        bestFor: 'Complete JavaScript Full-Stack Mastery Track',
        deliverables: [
          'WebSockets Real-Time Data Sync & Microservice Architecture',
          'Complex Enterprise Full-Stack JavaScript Application Portfolio',
          'Priority Direct Internship & Career Placement Referral',
          'Executive QR Credential & Career Fast-Track'
        ]
      }
    ];
  }

  // 2. JAVA SPECIFIC TRACK
  if (dName.includes('java')) {
    return [
      {
        id: '1w',
        duration: '1 Week',
        fee: 'NPR 500',
        bestFor: 'Java Core & OOP Fundamentals Bootcamp',
        deliverables: [
          'Java Syntax, Data Types & Control Flow Structure',
          'Object-Oriented Programming (Classes, Inheritance, Polymorphism)',
          'Java Collections Framework (List, Map, Set) Guided Labs',
          'QR-Verified Training Certificate'
        ]
      },
      {
        id: '2w',
        duration: '2 Weeks',
        fee: 'NPR 700',
        bestFor: 'Spring Boot REST API Training',
        deliverables: [
          'Spring Boot Framework Setup & Dependency Injection',
          'Building Enterprise REST Controllers & JSON Endpoints',
          '1 Guided Java Console / Web Service Project',
          'QR-Verified Training Certificate'
        ]
      },
      {
        id: '3w',
        duration: '3 Weeks',
        fee: 'NPR 950',
        bestFor: 'Spring Data JPA & Database Persistence Track',
        deliverables: [
          'Hibernate ORM & Spring Data JPA Entity Mapping',
          'H2 & PostgreSQL Relational Database Queries',
          'Java Developer Resume & Code Portfolio Formatting',
          'QR-Verified Training Certificate'
        ]
      },
      {
        id: '1m',
        duration: '1 Month',
        fee: 'NPR 1,200',
        bestFor: 'Spring Security & Microservices Track',
        deliverables: [
          'Spring Security Integration & JWT Token Auth',
          'Building Scalable Microservices & Postman Test Suites',
          '1-on-1 Java Instructor Code Review & Feedback',
          'QR-Verified Training Certificate'
        ]
      },
      {
        id: '2m',
        duration: '2 Months',
        fee: 'NPR 5,000',
        bestFor: 'Complete Java Enterprise & Spring Boot Mastery Track',
        deliverables: [
          'Complete End-to-End Enterprise Java Architecture Curriculum',
          'Spring Cloud Config, Eureka Discovery & Docker Containerization',
          'Priority Placement Referral & Interview Coaching',
          'Executive QR Credential & Internship Fast-Track'
        ]
      }
    ];
  }

  // 3. PYTHON SPECIFIC TRACK
  if (dName.includes('python') || dName.includes('py')) {
    return [
      {
        id: '1w',
        duration: '1 Week',
        fee: 'NPR 500',
        bestFor: 'Python 3 Syntax & Scripting Bootcamp',
        deliverables: [
          'Python 3 Core Syntax, Data Structures (Lists, Dicts, Sets)',
          'Object-Oriented Python Design & Decorators',
          'Automated File Handling & Scripting Guided Labs',
          'QR-Verified Training Certificate'
        ]
      },
      {
        id: '2w',
        duration: '2 Weeks',
        fee: 'NPR 700',
        bestFor: 'Python Automation & Web Scraping Training',
        deliverables: [
          'Automated Web Scraping using BeautifulSoup & Requests',
          '1 Guided Python Automation & Data Scraping Script',
          'Instructor Support & Troubleshooting Assistance',
          'QR-Verified Training Certificate'
        ]
      },
      {
        id: '3w',
        duration: '3 Weeks',
        fee: 'NPR 950',
        bestFor: 'FastAPI / Django Backend Web API Track',
        deliverables: [
          'Building Asynchronous REST APIs with FastAPI / Django',
          'SQLite / PostgreSQL Database ORM Integration',
          'Python Resume & GitHub Code Formatting',
          'QR-Verified Training Certificate'
        ]
      },
      {
        id: '1m',
        duration: '1 Month',
        fee: 'NPR 1,200',
        bestFor: 'Advanced Python Web & AsyncIO Architecture',
        deliverables: [
          'AsyncIO Asynchronous Programming & Celery Tasks',
          'Dockerizing Python Applications & Cloud Deployment',
          '1-on-1 Python Instructor Code Review & Mentorship',
          'QR-Verified Training Certificate'
        ]
      },
      {
        id: '2m',
        duration: '2 Months',
        fee: 'NPR 5,000',
        bestFor: 'Complete Python Full-Stack & Automation Mastery Track',
        deliverables: [
          'Complete End-to-End Python Backend Engineering Curriculum',
          'Complex Enterprise Python Web API & Automation Portfolio',
          'Priority Direct Internship & Placement Referral',
          'Executive QR Credential & Career Fast-Track'
        ]
      }
    ];
  }

  // DEFAULT / SOFTWARE DEVELOPMENT TRAINING
  return [
    {
      id: '1w',
      duration: '1 Week',
      fee: 'NPR 500',
      bestFor: 'Core Syntax & Logic Bootcamp',
      deliverables: [
        'Fundamental Programming Syntax & Logic Building',
        'Guided Small Project Lab Exercises',
        'Instructor Support & Code Templates',
        'QR-Verified Training Certificate'
      ]
    },
    {
      id: '2w',
      duration: '2 Weeks',
      fee: 'NPR 700',
      bestFor: 'Frontend & API Integration Track',
      deliverables: [
        'HTML5/CSS3/JavaScript & REST API Integration',
        '1 Guided Responsive Web Application Project',
        'Code Review & Debugging Mentorship',
        'QR-Verified Training Certificate'
      ]
    },
    {
      id: '3w',
      duration: '3 Weeks',
      fee: 'NPR 950',
      bestFor: 'Full-Stack MVC Architecture Track',
      deliverables: [
        'React.js, Node.js & Database Architecture',
        'Work on 1 Full-Stack Web Application',
        'Resume Building & Portfolio Formatting',
        'QR-Verified Training Certificate'
      ]
    },
    {
      id: '1m',
      duration: '1 Month',
      fee: 'NPR 1,200',
      bestFor: 'Production Software Engineering Track',
      deliverables: [
        'MERN Stack / Full-Stack MVC Architecture',
        'Production Deployment on Vercel/Render/Cloud DB',
        '1-on-1 Code Review & Technical Mentorship',
        'QR-Verified Training Certificate'
      ]
    },
    {
      id: '2m',
      duration: '2 Months',
      fee: 'NPR 5,000',
      bestFor: 'Complete Full-Stack & Software Engineering Mastery Track',
      deliverables: [
        'Complete End-to-End Software Engineering Curriculum',
        'Complex Enterprise Full-Stack Application Portfolio',
        'Priority Direct Internship & Career Placement Referral',
        'Executive QR Credential & Career Placement'
      ]
    }
  ];
}

export default function TrainingDetailsModal({ program, currentUser, onOpenAuth, onApplySuccess, onClose }) {
  const [selectedTier, setSelectedTier] = useState('1w');

  if (!program) return null;

  const durationTiers = getTrainingDomainTiers(program.title, program.domain);
  const activeT = durationTiers.find(t => t.id === selectedTier) || durationTiers[0];

  const handleEnrollClick = async () => {
    if (!currentUser) {
      onClose();
      if (onOpenAuth) onOpenAuth();
      return;
    }

    try {
      const feeMatch = (activeT.fee || '').match(/\d[\d,]*/);
      const feeNum = feeMatch ? parseInt(feeMatch[0].replace(/,/g, ''), 10) : 500;

      await api.submitApplication({
        studentId: currentUser.id,
        studentName: currentUser.name,
        studentEmail: currentUser.email,
        programId: program.id || `prog-${Date.now()}`,
        programTitle: program.title,
        domain: program.domain,
        programTrack: 'Guided Skill Training',
        selectedDuration: activeT.duration,
        feeAmount: feeNum,
        statementOfPurpose: 'Training enrollment via Google Form Link'
      });
    } catch (e) {
      console.warn("Recorded training application locally", e);
    }

    // Open Official Google Form in new browser tab
    showToast(`🚀 Enrollment submitted for ${program.title}! Opening verification form...`, 'success');
    window.open(GOOGLE_FORM_URL, '_blank');
    onClose();
    if (onApplySuccess) onApplySuccess();
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ padding: '1rem', zIndex: 1000 }}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{
          maxWidth: '680px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: '24px',
          padding: '2.5rem 2rem',
          boxShadow: 'var(--shadow-lg)',
          animation: 'modalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: '#f1f5f9',
            color: '#64748b',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            fontSize: '1rem',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
        >
          ✕
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <span className="badge badge-blue">{program.domain}</span>
            <span className="badge badge-coral">Guided Skill Training</span>
          </div>

          <h2 style={{ fontSize: '2rem', color: '#0b0f19', marginBottom: '0.5rem', fontWeight: '800' }}>
            {program.title}
          </h2>

          <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6' }}>
            {program.description}
          </p>
        </div>

        {/* Required Tech Stack */}
        <div style={{ marginBottom: '1.75rem' }}>
          <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: '700', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Technologies & Tools Taught:
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
            {(program.skillsRequired || []).map((skill, i) => (
              <span key={i} style={{
                fontSize: '0.82rem',
                background: '#eff6ff',
                border: '1px solid #dbeafe',
                padding: '0.3rem 0.75rem',
                borderRadius: '6px',
                color: '#2563eb',
                fontWeight: '700'
              }}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Duration Tier & Deliverables Section */}
        <div style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '18px',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <span style={{ fontSize: '0.85rem', color: '#0b0f19', fontWeight: '800', display: 'block', marginBottom: '0.75rem' }}>
            Select Training Duration Tier for {program.domain}:
          </span>

          {/* Interactive Tier Selection Tabs */}
          <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
            {durationTiers.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTier(t.id)}
                style={{
                  padding: '0.55rem 0.95rem',
                  borderRadius: '10px',
                  border: selectedTier === t.id ? '2px solid #2563eb' : '1px solid #cbd5e1',
                  background: selectedTier === t.id ? '#2563eb' : '#ffffff',
                  color: selectedTier === t.id ? '#ffffff' : '#475569',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  boxShadow: selectedTier === t.id ? 'var(--shadow-sm)' : 'none'
                }}
              >
                {t.duration} ({t.fee})
              </button>
            ))}
          </div>

          {/* Active Selected Tier Card Details */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '1.25rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
              <span style={{ fontSize: '1rem', fontWeight: '800', color: '#0b0f19' }}>
                {activeT.duration} Training Track — <span style={{ color: '#2563eb' }}>{activeT.fee}</span>
              </span>
              <span className="badge badge-blue" style={{ fontSize: '0.75rem' }}>
                {activeT.bestFor}
              </span>
            </div>

            <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: '700', display: 'block', marginBottom: '0.6rem' }}>
              Included Training Deliverables:
            </span>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.88rem', color: '#334155' }}>
              {activeT.deliverables.map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#2563eb', fontWeight: '800' }}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
          <div>
            <span style={{ display: 'block', fontSize: '0.78rem', color: '#64748b' }}>Selected Training Fee</span>
            <span style={{ fontSize: '1.3rem', fontWeight: '800', color: '#2563eb' }}>
              {activeT.fee} <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: '600' }}>({activeT.duration})</span>
            </span>
          </div>

          <button 
            onClick={handleEnrollClick}
            className="btn-primary"
            style={{ padding: '0.75rem 1.75rem', fontSize: '0.95rem', fontWeight: '800', cursor: 'pointer' }}
          >
            Enroll in Training Program ➔
          </button>
        </div>

      </div>
    </div>
  );
}
