import React from 'react';
import { api } from '../../services/api';
import DialogShell from '../../components/DialogShell';
import { TRAINING_APPLICATION_FORM_URL } from '../../constants';

const GOOGLE_FORM_URL = TRAINING_APPLICATION_FORM_URL;

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
  if (name.includes('ai tools') || name.includes('prompt engineering')) {
    return [
      'ChatGPT & Gemini for Research, Writing and Summaries',
      'Prompt Writing Frameworks & Iterative Refinement',
      'AI-Assisted Documents, Spreadsheets & Presentation Workflows',
      'No-Code Automation with AI Tools & Templates',
      '1 Guided Capstone Built with Everyday AI Tools',
      '1-on-1 Mentor Review of Your AI Workflows',
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

export default function TrainingDetailsModal({ program, currentUser, onApplySuccess, onClose }) {
  const displayFee = program.fee || 'NPR 2,999';
  const deliverables = getTrainingDeliverables(program.title, program.domain);

  const handleEnrollClick = () => {
    // 1. Instantly close the popup modal
    onClose();

    // 2. Instantly open the official Google Form in a new tab
    window.open(GOOGLE_FORM_URL, '_blank');
    if (onApplySuccess) onApplySuccess();

    // 3. Record training application in backend in the background. Same session-only contract as
    // the internship record: identity and the program come from the session and programId.
    if (currentUser && program.id) {
      const feeMatch = displayFee.match(/\d[\d,]*/);
      const feeNum = program.feeAmount || (feeMatch ? parseInt(feeMatch[0].replace(/,/g, ''), 10) : 2999);

      api.submitApplication({
        programId: program.id,
        programTrack: 'Guided Skill Training',
        selectedDuration: 'Complete Track',
        feeAmount: feeNum,
        statementOfPurpose: 'Training enrollment via Google Form Link'
      }).catch((e) => {
        console.warn('Enrollment record was not stored:', e.message);
      });
    }
  };

  return (
    <DialogShell labelId="training-details-title" onClose={onClose} panelClassName="svc-modal">
      <button type="button" className="svc-modal__close" aria-label="Close dialog" onClick={onClose}>
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M2.5 2.5l9 9M11.5 2.5l-9 9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      </button>

      <p className="svc-eyebrow">Guided Skill Training</p>
      <h2 id="training-details-title" className="svc-modal__title">{program.title}</h2>
      <p className="svc-modal__note">{program.description}</p>

      <h3 className="ip-label">Technologies and tools taught</h3>
      <ul className="svc-features ip-modal__stack">
        {(program.skillsRequired || []).map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>

      <div className="ip-tiers">
        <h3 className="ip-label">Curriculum and deliverables included</h3>
        <ul className="svc-deliverables">
          {deliverables.map((item) => (
            <li key={item}>
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M5 10.5L8 13.5L15 6.5" stroke="#1d4ed8" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="ip-modal__foot">
        <div>
          <p className="ip-card__price-label">Program fee</p>
          <p className="ip-card__price-value">{displayFee}</p>
        </div>

        <button type="button" className="svc-btn svc-btn--primary" onClick={handleEnrollClick}>
          Enroll in Training Program
        </button>
      </div>
    </DialogShell>
  );
}
