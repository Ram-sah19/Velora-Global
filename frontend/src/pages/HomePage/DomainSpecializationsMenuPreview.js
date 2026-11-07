import React from 'react';
import { SERVICES_CATALOG } from '../../content/siteFacts';

export default function DomainSpecializationsMenuPreview({ onServicesClick }) {
  return (
    <section className="hp-band hp-menu">
      <div className="container">
        <header className="hp-menu__head">
          <p className="hp-menu__eyebrow">Service Lines</p>
          <h2 className="hp-menu__title">What We Do</h2>
          <p className="hp-menu__lede">We build and maintain digital systems for business clients: the platforms your team runs daily operations on, the applications your customers use, and the support that keeps both working after launch. Each line below is scoped to what your business actually needs rather than sold as a fixed package.</p>
        </header>

        <div className="hp-menu__index">
          {SERVICES_CATALOG.map((service, index) => (
            <article key={service.name} className="hp-menu__entry">
              {service.serviceType !== service.name && (
                // The maintenance line's serviceType is verbatim its name.
                <p className="hp-menu__label">{service.serviceType}</p>
              )}
              <div className="hp-menu__line">
                <h3 className="hp-menu__name">{service.name}</h3>
                <span className="hp-menu__leader" aria-hidden="true" />
                <span className="hp-menu__num">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <p className="hp-menu__text">{service.description}</p>
            </article>
          ))}
        </div>

        {onServicesClick && (
          <div className="hp-menu__cta">
            <button type="button" className="svc-btn svc-btn--primary" onClick={onServicesClick}>
              Explore Our Services
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
