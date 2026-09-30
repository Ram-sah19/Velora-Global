import React from 'react';

/**
 * Renders a published question-and-answer set as native disclosure elements.
 * The text stays in the DOM whether open or closed, so an answer engine reads
 * the same content the visitor sees, and the JSON-LD FAQPage block at the edge
 * describes exactly these strings.
 */
export default function PageFaq({ items = [], heading = 'Questions this page answers' }) {
  if (!items.length) return null;

  return (
    <section className="container" style={{ maxWidth: '900px', margin: '3rem auto 0', padding: '0 1.5rem' }} aria-labelledby="page-faq-heading">
      <h2 id="page-faq-heading" style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '1.6rem',
        color: '#0b0f19',
        margin: '0 0 1.25rem'
      }}>
        {heading}
      </h2>

      <div style={{ display: 'grid', gap: '0.75rem' }}>
        {items.map((item) => (
          <details
            key={item.question}
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '14px',
              padding: '1rem 1.25rem',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <summary style={{
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '1rem',
              color: '#0b0f19',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1rem'
            }}>
              {item.question}
            </summary>
            <p style={{
              margin: '0.75rem 0 0',
              color: '#475569',
              fontSize: '0.95rem',
              lineHeight: 1.7
            }}>
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
