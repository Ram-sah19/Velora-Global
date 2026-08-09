import React, { useState } from 'react';
import { api } from '../../services/api';

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/11D9YEYK13bavROGMxlvO35k46MzrDHTTiHFd-PQqfy4/preview";

// Helper function to get domain-tailored duration tiers
function getDomainDurationTiers(domainTitle = '', domainCategory = '') {
  const dName = (domainTitle + " " + domainCategory).toLowerCase();

  // 1. JAVASCRIPT SPECIFIC INTERNSHIP TRACK
  if (dName.includes('javascript') || dName.includes('js')) {
    return [
      {
        id: '2w',
        duration: '2 Weeks',
        fee: 'NPR 199',
        bestFor: 'Fast-Track JavaScript ES6+ Certificate',
        deliverables: [
          'JavaScript ES6+ Syntax & Asynchronous Code Review',
          '1 Guided DOM Manipulation & Fetch API Project',
          'JavaScript Developer Resume Formatting & Review',
          'QR-Verified Internship Certificate'
        ]
      },
      {
        id: '1m',
        duration: '1 Month',
        fee: 'NPR 299',
        bestFor: 'Node.js & Full-Stack Core Track',
        deliverables: [
          'Node.js REST API Architecture & Express.js Routes',
          'MongoDB Atlas Database Schemas & Middleware',
          'Work on 1 Live Production JavaScript Application',
          '1-on-1 Resume Building & QR Certificate'
        ]
      },
      {
        id: '2m',
        duration: '2 Months',
        fee: 'NPR 500',
        bestFor: 'MERN Stack + 2 Live Projects',
        deliverables: [
          'MERN Full Stack MVC Architecture (React, Node, Express, MongoDB)',
          'JWT Authentication, Password Hashing & Vercel Deployment',
          'Work on 2+ Production Full-Stack JavaScript Repositories',
          'Executive Recommendation & QR Certificate'
        ]
      },
      {
        id: '3m',
        duration: '3 Months',
        fee: 'NPR 1,500',
        bestFor: 'Advanced JavaScript Engineering Track',
        deliverables: [
          'WebSockets Real-Time Sync, Microservices & Performance Optimization',
          'Work on 3+ Enterprise JavaScript Applications',
          'Complete Portfolio & Resume Optimization',
          'Priority Placement Assistance & Career Referral'
        ]
      },
      {
        id: '6m',
        duration: '6 Months',
        fee: 'NPR 3,000',
        bestFor: 'Complete Full-Stack JavaScript Career Track',
        deliverables: [
          'Full End-to-End Principal JavaScript Engineer Track',
          'Work on 5+ Production Enterprise Client Systems',
          'Technical & System Architecture Interview Prep',
          'Direct Senior JavaScript Career Placement'
        ]
      }
    ];
  }

  // 2. JAVA SPECIFIC INTERNSHIP TRACK
  if (dName.includes('java')) {
    return [
      {
        id: '2w',
        duration: '2 Weeks',
        fee: 'NPR 199',
        bestFor: 'Fast-Track Java OOP Certificate',
        deliverables: [
          'Java Core Syntax & OOP Architecture Review',
          'Java Collections Framework (List, Map, Set) Labs',
          'Java Developer Resume Formatting & Review',
          'QR-Verified Internship Certificate'
        ]
      },
      {
        id: '1m',
        duration: '1 Month',
        fee: 'NPR 299',
        bestFor: 'Spring Boot REST Microservices Track',
        deliverables: [
          'Spring Boot REST Controller & JSON Endpoint Design',
          'Spring Data JPA ORM & PostgreSQL Database Setup',
          'Work on 1 Live Enterprise Spring Boot REST API',
          '1-on-1 Resume Building & QR Certificate'
        ]
      },
      {
        id: '2m',
        duration: '2 Months',
        fee: 'NPR 500',
        bestFor: 'Enterprise Java + 2 Live Repositories',
        deliverables: [
          'Spring Security Integration & JWT Token Authentication',
          'Dockerizing Spring Boot Services & Maven Build Pipelines',
          'Work on 2+ Production Enterprise Java Repositories',
          'Executive Recommendation & QR Certificate'
        ]
      },
      {
        id: '3m',
        duration: '3 Months',
        fee: 'NPR 1,500',
        bestFor: 'Advanced Java Microservices Track',
        deliverables: [
          'Spring Cloud Config, Eureka Service Discovery & Kafka Queues',
          'Work on 3+ Enterprise Microservice Projects',
          'Complete Portfolio & Resume Optimization',
          'Priority Placement Referral'
        ]
      },
      {
        id: '6m',
        duration: '6 Months',
        fee: 'NPR 3,000',
        bestFor: 'Complete Enterprise Java Engineer Career Track',
        deliverables: [
          'Full End-to-End Senior Java Enterprise Track',
          'Work on 5+ Production Enterprise Java Systems',
          'Technical Assessment & System Design Prep',
          'Direct Senior Java Career Placement'
        ]
      }
    ];
  }

  // 3. PYTHON SPECIFIC INTERNSHIP TRACK
  if (dName.includes('python') || dName.includes('py')) {
    return [
      {
        id: '2w',
        duration: '2 Weeks',
        fee: 'NPR 199',
        bestFor: 'Fast-Track Python Scripting Certificate',
        deliverables: [
          'Python 3 Core Syntax & Data Structure Labs',
          'Automated Web Scraping Script (BeautifulSoup/Requests)',
          'Python Developer Resume Review',
          'QR-Verified Internship Certificate'
        ]
      },
      {
        id: '1m',
        duration: '1 Month',
        fee: 'NPR 299',
        bestFor: 'FastAPI / Django Web API Track',
        deliverables: [
          'Asynchronous Web API Endpoint Design with FastAPI / Django',
          'PostgreSQL ORM Integration & Pydantic Data Models',
          'Work on 1 Live Python Web API & Automation Script',
          '1-on-1 Resume Building & QR Certificate'
        ]
      },
      {
        id: '2m',
        duration: '2 Months',
        fee: 'NPR 500',
        bestFor: 'Python Backend + 2 Live Projects',
        deliverables: [
          'Celery Background Worker Tasks, Redis Caching & Docker',
          'Deploying Python Backend Services to Render / AWS Cloud',
          'Work on 2+ Production Python Automation Repositories',
          'Executive Recommendation & QR Certificate'
        ]
      },
      {
        id: '3m',
        duration: '3 Months',
        fee: 'NPR 1,500',
        bestFor: 'Advanced Python Systems Track',
        deliverables: [
          'AsyncIO Event Loops, PyTest Automated Testing & API Hardening',
          'Work on 3+ Enterprise Python Backend Pipelines',
          'Complete Portfolio & Resume Optimization',
          'Priority Placement Referral'
        ]
      },
      {
        id: '6m',
        duration: '6 Months',
        fee: 'NPR 3,000',
        bestFor: 'Complete Python Systems & Automation Career Track',
        deliverables: [
          'Full End-to-End Senior Python Engineer Track',
          'Work on 5+ Production Enterprise Python Systems',
          'Technical & Algorithmic Code Assessment Prep',
          'Direct Senior Python Career Placement'
        ]
      }
    ];
  }

  // DEFAULT / SOFTWARE DEVELOPMENT TRACK
  return [
    {
      id: '2w',
      duration: '2 Weeks',
      fee: 'NPR 199',
      bestFor: 'Fast-Track Project Certificate',
      deliverables: [
        'Domain Mentorship Guidance Intro',
        '1 Guided Practical Domain Project',
        'Basic Resume Review & Formatting',
        'QR-Verified Internship Certificate'
      ]
    },
    {
      id: '1m',
      duration: '1 Month',
      fee: 'NPR 299',
      bestFor: 'Core Skill Building + 1 Live Project',
      deliverables: [
        'Domain Mentorship from Industry Experts',
        'Work on 1 Live Production Project',
        '1-on-1 Professional Resume Building',
        'QR-Verified Certificate of Completion'
      ]
    },
    {
      id: '2m',
      duration: '2 Months',
      fee: 'NPR 500',
      bestFor: 'Full Stack Track + 2 Live Projects',
      deliverables: [
        'Advanced Domain Guidance',
        'Work on 2+ Live Client Projects',
        '1-on-1 Professional Resume Building',
        'Executive Recommendation & QR Certificate'
      ]
    },
    {
      id: '3m',
      duration: '3 Months',
      fee: 'NPR 1,500',
      bestFor: 'Advanced Industry Track',
      deliverables: [
        'Weekly 1-on-1 Code Architecture Reviews',
        'Work on 3+ Complex Enterprise Repositories',
        'Complete Portfolio & Resume Optimization',
        'Priority Career & Placement Assistance'
      ]
    },
    {
      id: '6m',
      duration: '6 Months',
      fee: 'NPR 3,000',
      bestFor: 'Complete Full-Stack & Software Engineering Career Track',
      deliverables: [
        'Full End-to-End Domain Track',
        'Work on 5+ Production Client Projects',
        'Complete Technical & Behavioral Interview Prep',
        'Direct Industry Career Placement Referral'
      ]
    }
  ];
}

export default function InternshipDetailsModal({ program, currentUser, onOpenAuth, onApplySuccess, onClose }) {
  const [selectedTier, setSelectedTier] = useState('2w');

  if (!program) return null;

  const durationTiers = getDomainDurationTiers(program.title, program.domain);
  const activeT = durationTiers.find(t => t.id === selectedTier) || durationTiers[0];

  const handleApplyClick = async () => {
    if (!currentUser) {
      onClose();
      if (onOpenAuth) onOpenAuth();
      return;
    }

    try {
      const feeMatch = (activeT.fee || '').match(/\d[\d,]*/);
      const feeNum = feeMatch ? parseInt(feeMatch[0].replace(/,/g, ''), 10) : 199;

      await api.submitApplication({
        studentId: currentUser.id,
        studentName: currentUser.name,
        studentEmail: currentUser.email,
        programId: program.id || `prog-${Date.now()}`,
        programTitle: program.title,
        domain: program.domain,
        programTrack: 'Practical Internship',
        selectedDuration: activeT.duration,
        feeAmount: feeNum,
        statementOfPurpose: 'Application via Google Form Link'
      });
    } catch (e) {
      console.warn("Recorded application locally", e);
    }

    // Open Official Google Form in new browser tab
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
            <span className="badge badge-coral">{program.domain}</span>
            <span className="badge badge-blue">Practical Internship</span>
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
            Technologies & Tools Covered:
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
            {(program.skillsRequired || []).map((skill, i) => (
              <span key={i} style={{
                fontSize: '0.82rem',
                background: '#fff5f5',
                border: '1px solid #ffe3e3',
                padding: '0.3rem 0.75rem',
                borderRadius: '6px',
                color: '#0b0f19',
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
            Select Duration Tier for {program.domain}:
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
                  border: selectedTier === t.id ? '2px solid #ff6b6b' : '1px solid #cbd5e1',
                  background: selectedTier === t.id ? '#ff6b6b' : '#ffffff',
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
                {activeT.duration} Track — <span style={{ color: '#ff6b6b' }}>{activeT.fee}</span>
              </span>
              <span className="badge badge-coral" style={{ fontSize: '0.75rem' }}>
                {activeT.bestFor}
              </span>
            </div>

            <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: '700', display: 'block', marginBottom: '0.6rem' }}>
              Included {program.domain} Deliverables:
            </span>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.88rem', color: '#334155' }}>
              {activeT.deliverables.map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#ff6b6b', fontWeight: '800' }}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
          <div>
            <span style={{ display: 'block', fontSize: '0.78rem', color: '#64748b' }}>Selected Tier Fee</span>
            <span style={{ fontSize: '1.3rem', fontWeight: '800', color: '#ff6b6b' }}>
              {activeT.fee} <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: '600' }}>({activeT.duration})</span>
            </span>
          </div>

          <button 
            onClick={handleApplyClick}
            className="btn-coral"
            style={{ padding: '0.75rem 1.75rem', fontSize: '0.95rem', fontWeight: '800', cursor: 'pointer' }}
          >
            Apply for Internship ➔
          </button>
        </div>

      </div>
    </div>
  );
}
