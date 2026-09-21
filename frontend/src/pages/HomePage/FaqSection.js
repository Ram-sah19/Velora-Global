import React, { useState } from 'react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Are the Velora Global internship completion certificates verifiable?",
      answer: "Yes. Every certificate issued by Velora Global includes a unique certificate verification ID (e.g., VG-2026-88491) and a public verification endpoint. Anyone, including prospective employers and universities, can verify its authenticity on our public Verification Portal."
    },
    {
      question: "Who evaluates student project submissions?",
      answer: "Project deliverables and code repositories are reviewed directly by our founding team led by Abhishek Sah (Founder & CEO), Krishna Sah (Co-Founder & CTO), and Rohit Sah (Co-Founder & COO) using our 5-criteria structured evaluation framework."
    },
    {
      question: "What is the difference between the Internship and Training programs?",
      answer: "The Internship program is project-driven and task-oriented, where candidates work independently on deliverables with mentor feedback and milestone reviews. The Guided Training program includes structured live lectures, hands-on step-by-step development, full codebase walkthroughs, and guaranteed internship placement."
    },
    {
      question: "What are the 5 criteria used for project grading?",
      answer: "Evaluations assess Quality of Code, Technical Mastery, Creative Problem Solving, Completion of Requirements, and Professional Documentation. Candidates receive detailed written feedback along with their final certificate record."
    },
    {
      question: "Can I participate in the internship remotely?",
      answer: "Yes. All Velora Global internship and training tracks support remote participation with flexible schedules designed for university students and working professionals."
    }
  ];

  return (
    <section style={{ padding: '6rem 0', background: 'var(--premium-grad-tinted)' }}>
      <div className="container" style={{ maxWidth: '850px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="premium-eyebrow" style={{
            fontSize: '0.82rem',
            color: '#1d4ed8',
            fontWeight: '700',
            marginBottom: '0.9rem'
          }}>
            Transparent Answers
          </span>
          <h2 className="premium-headline" style={{ fontSize: '2.7rem', marginTop: '0.3rem', fontWeight: '800', lineHeight: '1.15' }}>
            Frequently Asked Questions
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem', marginTop: '0.65rem' }}>
            Everything you need to know about Velora Global internships, training, and credential verification.
          </p>
        </div>

        {/* Accordion Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="premium-glass"
              style={{
                border: openIndex === idx ? '1px solid rgba(37, 99, 235, 0.45)' : '1px solid rgba(226, 232, 240, 0.9)',
                borderRadius: '16px',
                background: openIndex === idx ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.75)',
                overflow: 'hidden',
                boxShadow: openIndex === idx ? 'var(--premium-shadow-card)' : '0 1px 4px rgba(11, 18, 32, 0.04)',
                transition: 'all 0.25s ease'
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                style={{
                  width: '100%',
                  padding: '1.25rem 1.5rem',
                  textAlign: 'left',
                  background: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  fontSize: '1.05rem',
                  fontWeight: '700',
                  color: '#0b1220',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <span>{faq.question}</span>
                <span aria-hidden="true" style={{
                  width: '30px',
                  height: '30px',
                  flexShrink: 0,
                  borderRadius: '50%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.05rem',
                  fontWeight: '800',
                  lineHeight: '1',
                  background: openIndex === idx ? 'var(--premium-grad-brand)' : '#f1f5f9',
                  color: openIndex === idx ? '#ffffff' : '#64748b',
                  border: openIndex === idx ? '1px solid transparent' : '1px solid #e2e8f0',
                  boxShadow: openIndex === idx ? '0 4px 12px -4px rgba(37, 99, 235, 0.5)' : 'none',
                  transition: 'all 0.25s ease'
                }}>
                  {openIndex === idx ? '−' : '+'}
                </span>
              </button>

              {openIndex === idx && (
                <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', color: '#475569', fontSize: '0.95rem', lineHeight: '1.65' }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
