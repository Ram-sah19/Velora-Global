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
    <section className="container page-faq" aria-labelledby="page-faq-heading">
      <h2 id="page-faq-heading" className="page-faq__heading">
        {heading}
      </h2>

      <div className="page-faq__list">
        {items.map((item) => (
          <details key={item.question} className="page-faq__item">
            <summary className="page-faq__q">{item.question}</summary>
            <p className="page-faq__a">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
