import React from 'react';

/**
 * The dark full-bleed band every page closes with: eyebrow, title, paragraphs,
 * an optional action row and a ruled fact column on the right. One component so
 * the five pages cannot drift apart the way the hand-written copies did.
 */
export default function CtaBand({ id, eyebrow, title, text, actions, facts = [] }) {
  const paragraphs = Array.isArray(text) ? text : [text];

  return (
    <section className="svc-cta" aria-labelledby={id}>
      <div className="container svc-cta__inner">
        <div>
          <p className="svc-eyebrow">{eyebrow}</p>
          <h2 id={id} className="svc-cta__title">{title}</h2>
          {paragraphs.map((paragraph, index) => (
            <p className="svc-cta__text" key={index}>{paragraph}</p>
          ))}
          {actions && <div className="svc-cta__actions">{actions}</div>}
        </div>

        {facts.length > 0 && (
          <dl className="svc-cta__facts">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
