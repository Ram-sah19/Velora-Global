import React from 'react';

/**
 * Renders the legal sections from src/content/legal.js as a ruled document: clauses
 * separated by hairlines, no card around them. /privacy-policy and /terms are its only
 * routes, so what a crawler indexes is what a visitor is shown.
 */
export default function LegalSections({ sections = [] }) {
  return (
    <div className="svc-ruled lp-doc">
      {sections.map((section) => (
        <section key={section.heading} className="lp-section">
          <h2 className="lp-section__title">{section.heading}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
          {section.items && (
            <List listType={section.listType} items={section.items} />
          )}
        </section>
      ))}
    </div>
  );
}

function List({ listType = 'ul', items }) {
  const Tag = listType === 'ol' ? 'ol' : 'ul';
  return (
    <Tag className="lp-list">
      {items.map((item) => (
        <li key={item.text}>
          {item.label ? <strong>{item.label}: </strong> : null}
          {item.text}
        </li>
      ))}
    </Tag>
  );
}
