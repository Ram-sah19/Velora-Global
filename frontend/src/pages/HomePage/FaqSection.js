import React, { useState } from 'react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Are the Velora Global internship certificates officially verified?",
      answer: "Yes. Every certificate issued by Velora Global includes a unique certificate ID (e.g., VG-2026-88491) and a public QR code endpoint. Anyone, including employers and universities, can verify its authenticity on our public Verification Portal."
    },
    {
      question: "Who evaluates student project submissions?",
      answer: "Project deliverables are evaluated directly by our founding team led by Rohit Sah (Founder & CEO), Rambilas Sah (Co-Founder), and Puja Rouniyar (Co-Founder & COO) using our 5-criteria evaluation framework."
    },
    {
      question: "What are the 5 criteria used for project grading?",
      answer: "Evaluations assess Quality of Work, Technical Skills & Mastery, Creativity, Completion of Requirements, and Professional Approach. Students receive detailed written feedback along with their final grade."
    },
    {
      question: "What tech stacks are covered in the internships?",
      answer: "We offer 10 specialized domain tracks covering Frontend (React), Backend (Node.js & Express), Full Stack (MERN), Mobile Apps (React Native & Flutter), AI & ML (PyTorch & TensorFlow), Data Science (Pandas & SQL), Cybersecurity, UI/UX (Figma), Cloud & DevOps (Docker & AWS), and Software Testing (Jest & Cypress)."
    },
    {
      question: "Can I participate in the internship remotely?",
      answer: "Yes! All Velora Global internship programs support remote and hybrid participation with flexible schedules designed for university students and career switchers."
    }
  ];

  return (
    <section style={{ padding: '5rem 0', background: '#ffffff', borderTop: '1px solid #e2e8f0' }}>
      <div className="container" style={{ maxWidth: '850px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{
            fontSize: '0.82rem',
            color: '#2563eb',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            background: '#eff6ff',
            padding: '0.35rem 1rem',
            borderRadius: '9999px',
            border: '1px solid #dbeafe',
            display: 'inline-block',
            marginBottom: '0.75rem'
          }}>
            Got Questions?
          </span>
          <h2 style={{ fontSize: '2.5rem', color: '#0b0f19', marginTop: '0.3rem', fontWeight: '800' }}>
            Frequently Asked Questions
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem', marginTop: '0.5rem' }}>
            Everything you need to know about Velora Global internships and credential verification.
          </p>
        </div>

        {/* Accordion Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              style={{
                border: openIndex === idx ? '2px solid #2563eb' : '1px solid #e2e8f0',
                borderRadius: '14px',
                background: openIndex === idx ? '#ffffff' : '#f8fafc',
                overflow: 'hidden',
                transition: 'all 0.2s ease'
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
                  fontSize: '1.05rem',
                  fontWeight: '700',
                  color: '#0b0f19'
                }}
              >
                <span>{faq.question}</span>
                <span style={{ fontSize: '1.2rem', color: openIndex === idx ? '#2563eb' : '#64748b' }}>
                  {openIndex === idx ? '−' : '+'}
                </span>
              </button>

              {openIndex === idx && (
                <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }}>
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
