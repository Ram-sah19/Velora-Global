import React, { useState } from 'react';

export default function FaqSection() {
  const [activeTab, setActiveTab] = useState('all');
  const [openIndex, setOpenIndex] = useState(0);

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'students', label: 'Students & Internships' },
    { id: 'enterprise', label: 'Enterprise & IT Solutions' },
    { id: 'verification', label: 'Certificates & Verification' }
  ];

  const allFaqs = [
    {
      category: 'verification',
      question: "Are Velora Global internship completion certificates officially verifiable?",
      answer: "Yes, 100%. Every certificate issued by Velora Global features a tamper-proof QR code and a unique Certificate Verification ID (e.g. VG-2026-88491). Prospective employers, recruiters, and university boards can scan the QR code or look up the ID directly on our public Verification Portal to inspect the student's evaluated grade, completed tasks, and verified deliverables."
    },
    {
      category: 'students',
      question: "What is the difference between the Internship and Guided Training programs?",
      answer: "The Practical Internship track is project-driven and milestone-based (6 to 8 weeks), where candidates build real production deliverables with weekly mentor feedback and code reviews. The Guided Tech Training program includes structured live lectures, step-by-step full-stack development, direct architectural mentorship, and guaranteed internship placement upon completion."
    },
    {
      category: 'enterprise',
      question: "What custom software and enterprise IT solutions does Velora Global build for businesses?",
      answer: "We engineer scalable full-stack web applications, MERN SaaS platforms, cross-platform mobile apps (React Native / iOS & Android), custom AI chatbots with LLM integration, and cloud automation pipelines. We work with startups, SMEs, and corporate enterprises under structured sprint milestones."
    },
    {
      category: 'students',
      question: "Who reviews and evaluates student project submissions?",
      answer: "Every code repository and milestone deliverable is reviewed directly by our founding executive mentors: Rohit Sah (Founder & CEO), Krishna Sah (Co-Founder), and Puja Rouniyar (Co-Founder & COO). Feedback is provided through pull request comments, architectural assessments, and rubric grading."
    },
    {
      category: 'enterprise',
      question: "Who owns the Intellectual Property (IP) and source code for client projects?",
      answer: "The client maintains 100% full ownership of all custom source code, design assets, database schemas, and intellectual property. We execute strict Non-Disclosure Agreements (NDAs) and transfer complete repository rights upon final project delivery."
    },
    {
      category: 'students',
      question: "Can I participate in the internship or training remotely with a flexible schedule?",
      answer: "Yes. All Velora Global programs are 100% remote-first with asynchronous milestone deadlines. University students and working professionals can coordinate their schedule around classes and personal commitments while meeting weekly pull request deliverables."
    },
    {
      category: 'enterprise',
      question: "Can companies hire top-performing engineering talent directly through Velora Global?",
      answer: "Absolutely. We connect our corporate partners and enterprise clients directly with top-ranked graduates who have demonstrated exceptional problem-solving, clean code hygiene, and verified project completion across our 10 specialized domain tracks."
    },
    {
      category: 'students',
      question: "What are the 5 core evaluation criteria for certificate qualification?",
      answer: "Students are graded on: (1) Code Hygiene & Architecture, (2) Technical Mastery & Framework Implementation, (3) Creative Problem Solving, (4) Requirement & Specification Completion, and (5) Professional Documentation & Git Version Control."
    }
  ];

  const filteredFaqs = activeTab === 'all' 
    ? allFaqs 
    : allFaqs.filter(f => f.category === activeTab);

  return (
    <section style={{ padding: '5.5rem 0', background: '#ffffff', borderTop: '1px solid #e2e8f0' }}>
      <div className="container" style={{ maxWidth: '880px' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{
            fontSize: '0.8rem',
            color: '#2563eb',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            background: '#eff6ff',
            padding: '0.35rem 1.1rem',
            borderRadius: '9999px',
            border: '1px solid #dbeafe',
            display: 'inline-block',
            marginBottom: '0.85rem'
          }}>
            FREQUENTLY ASKED QUESTIONS
          </span>

          <h2 style={{ fontSize: '2.5rem', color: '#0b0f19', fontWeight: '800', margin: '0 0 0.65rem 0', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
            Frequently Asked Questions
          </h2>

          <p style={{ color: '#64748b', fontSize: '1.05rem', margin: '0 auto', maxWidth: '620px', lineHeight: '1.6' }}>
            Clear answers about our student internships, hands-on tech training tracks, enterprise IT solutions, and verified credentials.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="horizontal-scroll-mobile" style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.65rem',
          marginBottom: '2.5rem',
          paddingBottom: '0.5rem',
          width: '100%'
        }}>
          {categories.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveTab(cat.id);
                  setOpenIndex(0);
                }}
                style={{
                  padding: '0.6rem 1.3rem',
                  borderRadius: '9999px',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? '700' : '600',
                  background: isActive ? '#0b0f19' : '#ffffff',
                  color: isActive ? '#ffffff' : '#475569',
                  border: isActive ? '1px solid #0b0f19' : '1px solid #e2e8f0',
                  boxShadow: isActive ? '0 4px 14px rgba(11, 15, 25, 0.12)' : 'none',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = '#f8fafc';
                    e.currentTarget.style.borderColor = '#cbd5e1';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = '#ffffff';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                  }
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Accordion FAQ Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                style={{
                  border: isOpen ? '1.5px solid #2563eb' : '1px solid #e2e8f0',
                  borderRadius: '16px',
                  background: isOpen ? '#ffffff' : '#f8fafc',
                  boxShadow: isOpen ? '0 4px 20px rgba(37, 99, 235, 0.08)' : '0 1px 2px rgba(0, 0, 0, 0.02)',
                  overflow: 'hidden',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    textAlign: 'left',
                    background: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    fontSize: '1.02rem',
                    fontWeight: '700',
                    color: isOpen ? '#0b0f19' : '#1e293b',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ lineHeight: '1.4' }}>{faq.question}</span>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: isOpen ? '#eff6ff' : '#ffffff',
                    border: isOpen ? '1px solid #dbeafe' : '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.2s ease'
                  }}>
                    <svg 
                      width="14" 
                      height="14" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke={isOpen ? '#2563eb' : '#64748b'} 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease'
                      }}
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </button>

                {isOpen && (
                  <div style={{
                    padding: '0 1.5rem 1.35rem 1.5rem',
                    color: '#475569',
                    fontSize: '0.95rem',
                    lineHeight: '1.65',
                    borderTop: '1px solid #f1f5f9',
                    paddingTop: '0.9rem'
                  }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Banner */}
        <div style={{
          marginTop: '3.5rem',
          padding: '2rem 2.25rem',
          background: 'linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)',
          border: '1px solid #dbeafe',
          borderRadius: '18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.25rem'
        }}>
          <div>
            <h4 style={{ fontSize: '1.15rem', color: '#0b0f19', fontWeight: '800', margin: '0 0 0.25rem 0' }}>
              Still have questions or need custom solutions?
            </h4>
            <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0 }}>
              Our executive desk is available to assist students, mentors, and corporate partners.
            </p>
          </div>

          <a 
            href="mailto:contact@velora-global.online"
            style={{
              padding: '0.75rem 1.4rem',
              background: '#0b0f19',
              color: '#ffffff',
              borderRadius: '9999px',
              fontSize: '0.88rem',
              fontWeight: '700',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              transition: 'background 0.15s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#2563eb'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#0b0f19'}
          >
            Contact Support Desk ➔
          </a>
        </div>

      </div>
    </section>
  );
}

