import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { api } from '../../services/api';
import { showToast } from '../../components/NotificationToast';

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/11D9YEYK13bavROGMxlvO35k46MzrDHTTiHFd-PQqfy4/preview";

// Helper function to get domain-tailored training deliverables
function getTrainingDeliverables(domainTitle = '', domainCategory = '') {
  const name = (domainTitle + " " + domainCategory).toLowerCase();

  if (name.includes('frontend')) {
    return [
      'Modern React.js, Component Architecture & Hooks',
      'HTML5, CSS3, Flexbox/Grid & TailwindCSS Styling',
      'JavaScript ES6+, Async/Await & REST API Integration',
      'State Management, Routing & Performance Optimization',
      '1 Guided Production Frontend Portfolio Project',
      '1-on-1 Mentor Code Reviews & Live Technical Feedback',
      'Official Verified Industry Skill Credential'
    ];
  }
  if (name.includes('backend')) {
    return [
      'Node.js Server Runtime & Express.js Routing Framework',
      'MongoDB Atlas Database & Mongoose Schema Design',
      'RESTful JSON API Architecture & Express Middleware',
      'JWT Authentication, Password Hashing & Security Best Practices',
      '1 Guided Enterprise Backend Microservice Project',
      '1-on-1 Mentor Code Reviews & Postman API Testing',
      'Official Verified Industry Skill Credential'
    ];
  }
  if (name.includes('full stack with ai')) {
    return [
      'End-to-End MERN Stack Architecture (React, Node, Express, MongoDB)',
      'Integrating OpenAI / Gemini LLM APIs & Prompt Engineering',
      'Building Autonomous AI Agents & Vector Database Embeddings',
      'Real-Time WebSockets & AI Streaming Responses',
      '1 Production Full Stack + AI Application Project',
      '1-on-1 Executive Mentorship & Portfolio Review',
      'Official Verified Executive Credential'
    ];
  }
  if (name.includes('ai & machine learning') || name.includes('artificial intelligence') || name.includes('aiml')) {
    return [
      'Python Machine Learning Ecosystem (NumPy, Pandas, Scikit-Learn)',
      'Supervised & Unsupervised ML Algorithms (Regression, Classification)',
      'Neural Networks & Deep Learning Foundations (TensorFlow / PyTorch)',
      'Natural Language Processing (NLP) & Computer Vision (OpenCV)',
      'Model Training, Evaluation Metrics & Cloud Deployment',
      '1 Guided AI Model Engineering Capstone Project',
      'Official Verified Executive Credential'
    ];
  }
  if (name.includes('deep learning')) {
    return [
      'Artificial Neural Networks (ANN) & Backpropagation Math',
      'Convolutional Neural Networks (CNN) for Image Recognition',
      'Recurrent Neural Networks (RNN) & LSTM for Sequential Data',
      'PyTorch / TensorFlow Framework Deep Dives & GPU Acceleration',
      '1 Guided Computer Vision / Neural Network Project',
      '1-on-1 Mentor Code Review & Model Debugging',
      'Official Verified Training Credential'
    ];
  }
  if (name.includes('javascript') || name.includes('js')) {
    return [
      'Modern JavaScript ES6+ Syntax, Scope, Closures & Async',
      'DOM Manipulation, Event Loop & Promises / Async-Await',
      'Node.js Core Modules & Building HTTP JSON Servers',
      'Modern Package Managers (npm), Module Systems & Tooling',
      '1 Guided Interactive JavaScript Application',
      '1-on-1 Code Review & GitHub Code Formatting',
      'Official Verified Training Credential'
    ];
  }
  if (name.includes('java')) {
    return [
      'Java 17+ Core Syntax, Data Types & Control Structures',
      'Object-Oriented Programming (OOP), Interfaces & Polymorphism',
      'Spring Boot 3 Framework, Dependency Injection & REST Controllers',
      'Spring Data JPA, Hibernate ORM & PostgreSQL Integration',
      '1 Guided Java Enterprise Microservice Project',
      '1-on-1 Mentor Code Review & Architecture Guidance',
      'Official Verified Training Credential'
    ];
  }
  if (name.includes('python')) {
    return [
      'Python 3 Syntax, Data Structures (Lists, Dicts, Sets, Tuples)',
      'Object-Oriented Python, Decorators & Generators',
      'Automated Web Scraping (BeautifulSoup, Selenium) & Scripting',
      'FastAPI / Django REST API Development & SQLite/PostgreSQL',
      '1 Guided Python Automation & Backend API Project',
      '1-on-1 Mentor Code Review & Portfolio Formatting',
      'Official Verified Training Credential'
    ];
  }
  if (name.includes('mern')) {
    return [
      'MongoDB Atlas Database Design & Aggregation Pipelines',
      'Express.js Middleware & RESTful Backend API Architecture',
      'React.js Modern SPA Development & State Management',
      'Node.js Runtime & Full-Stack Deployment on Cloud Hosting',
      '1 Guided Production MERN Stack Capstone Application',
      '1-on-1 Mentor Code Review & Career Fast-Track',
      'Official Verified Training Credential'
    ];
  }
  if (name.includes('pern')) {
    return [
      'PostgreSQL Relational Database Schemas, SQL & Sequelize ORM',
      'Express.js Server Framework & REST Controller Architecture',
      'React.js Client Interface & Component State Management',
      'Node.js Backend System & Production Server Configuration',
      '1 Guided Production PERN Stack Capstone Application',
      '1-on-1 Mentor Code Review & Direct Career Referral',
      'Official Verified Training Credential'
    ];
  }

  return [
    'Comprehensive Structured Curriculum & Practical Assignments',
    'Hands-on Guided Project Labs & Real-World Code Repositories',
    '1-on-1 Mentor Code Reviews & Troubleshooting Assistance',
    'GitHub Portfolio Formatting & Technical Resume Guidance',
    'Official Verified Training Credential'
  ];
}

export default function TrainingDetailsModal({ program, currentUser, onOpenAuth, onApplySuccess, onClose }) {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (!program) return null;

  const displayFee = program.fee || 'NPR 3,000';
  const deliverables = getTrainingDeliverables(program.title, program.domain);

  const handleEnrollClick = async () => {
    if (!currentUser) {
      onClose();
      if (onOpenAuth) onOpenAuth();
      return;
    }

    try {
      const feeMatch = displayFee.match(/\d[\d,]*/);
      const feeNum = program.feeAmount || (feeMatch ? parseInt(feeMatch[0].replace(/,/g, ''), 10) : 3000);

      await api.submitApplication({
        studentId: currentUser.id,
        studentName: currentUser.name,
        studentEmail: currentUser.email,
        programId: program.id || `prog-${Date.now()}`,
        programTitle: program.title,
        domain: program.domain,
        programTrack: 'Guided Skill Training',
        selectedDuration: 'Complete Track',
        feeAmount: feeNum,
        statementOfPurpose: 'Training enrollment via Google Form Link'
      });
    } catch (e) {
      console.warn("Recorded training application locally", e);
    }

    // Open Official Google Form in new browser tab
    showToast(`Enrollment submitted for ${program.title}! Opening verification form...`, 'success');
    window.open(GOOGLE_FORM_URL, '_blank');
    onClose();
    if (onApplySuccess) onApplySuccess();
  };

  const modalJSX = (
    <div 
      className="modal-overlay" 
      onClick={onClose} 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(11, 15, 25, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        overflowY: 'auto',
        boxSizing: 'border-box'
      }}
    >
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{
          maxWidth: '680px',
          width: '100%',
          maxHeight: 'min(90vh, 760px)',
          overflowY: 'auto',
          borderRadius: '24px',
          padding: '2.25rem 2rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
          background: '#ffffff',
          position: 'relative',
          margin: 'auto',
          boxSizing: 'border-box'
        }}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          aria-label="Close dialog"
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
            transition: 'all 0.2s ease',
            zIndex: 10
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#e2e8f0'; e.currentTarget.style.color = '#0b0f19'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.color = '#64748b'; }}
        >
          ✕
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: '1.5rem', paddingRight: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
            <span className="badge badge-blue">{program.domain}</span>
            <span className="badge badge-coral">Guided Skill Training</span>
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', color: '#0b0f19', marginBottom: '0.5rem', fontWeight: '800', lineHeight: 1.25 }}>
            {program.title}
          </h2>

          <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: '1.6', margin: 0 }}>
            {program.description}
          </p>
        </div>

        {/* Required Tech Stack */}
        <div style={{ marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '800', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Technologies & Tools Taught:
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
            {(program.skillsRequired || []).map((skill, i) => (
              <span key={i} style={{
                fontSize: '0.8rem',
                background: '#eff6ff',
                border: '1px solid #dbeafe',
                padding: '0.28rem 0.7rem',
                borderRadius: '6px',
                color: '#2563eb',
                fontWeight: '700'
              }}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Deliverables Section */}
        <div style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '18px',
          padding: '1.25rem',
          marginBottom: '1.75rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0b0f19' }}>
              Curriculum & Deliverables Included
            </span>
            <span className="badge badge-blue" style={{ fontSize: '0.85rem', fontWeight: '800' }}>
              {displayFee}
            </span>
          </div>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.88rem', color: '#334155', margin: 0, padding: 0 }}>
            {deliverables.map((item, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', lineHeight: '1.45' }}>
                <span style={{ color: '#2563eb', fontWeight: '800', fontSize: '0.95rem', flexShrink: 0 }}>✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Call to Action */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid #e2e8f0', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>Training Program Fee</span>
            <span style={{ fontSize: '1.35rem', fontWeight: '800', color: '#2563eb' }}>
              {displayFee}
            </span>
          </div>

          <button 
            onClick={handleEnrollClick}
            className="btn-primary"
            style={{ padding: '0.75rem 1.75rem', fontSize: '0.92rem', fontWeight: '800', cursor: 'pointer', borderRadius: '10px' }}
          >
            Enroll in Training Program
          </button>
        </div>

      </div>
    </div>
  );

  return typeof document !== 'undefined' ? ReactDOM.createPortal(modalJSX, document.body) : modalJSX;
}

