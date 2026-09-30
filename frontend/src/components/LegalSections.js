import React from 'react';

/**
 * Renders the legal sections from src/content/legal.js. The disclosure modals and
 * the /privacy-policy and /terms routes both use it, so an indexed page and a
 * popup can no longer show different terms.
 */
export default function LegalSections({ sections = [], idPrefix = 'legal' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.92rem', color: '#334155', lineHeight: '1.7' }}>
      {sections.map((section) => (
        <section key={section.heading}>
          <h3 style={{ fontSize: '1.1rem', color: '#0b0f19', fontWeight: '700', marginBottom: '0.35rem' }}>
            {section.heading}
          </h3>
          {section.paragraphs.map((paragraph) => (
            <p key={`${idPrefix}-${paragraph.slice(0, 24)}`} style={{ margin: '0 0 0.5rem' }}>
              {paragraph}
            </p>
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
    <Tag style={{ paddingLeft: '1.25rem', margin: '0.35rem 0 0' }}>
      {items.map((item) => (
        <li key={item.text} style={{ marginBottom: '0.3rem' }}>
          {item.label ? <strong>{item.label}:</strong> : null}
          {item.label ? ' ' : ''}
          {item.text}
        </li>
      ))}
    </Tag>
  );
}
