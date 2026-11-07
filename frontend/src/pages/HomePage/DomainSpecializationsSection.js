import React from 'react';
import { SERVICES_CATALOG } from '../../content/siteFacts';

export default function DomainSpecializationsSection({ onServicesClick }) {
  return (
    <section className="hp-band hp-band--white hp-lux">
      <div className="container">
        <header className="hp-lux__head">
          <p className="hp-lux__eyebrow">Service Lines</p>
          <h2 className="hp-lux__title">What We Do</h2>
          <span className="hp-lux__divider" aria-hidden="true" />
          <p className="hp-lux__lede">We build and maintain digital systems for business clients: the platforms your team runs daily operations on, the applications your customers use, and the support that keeps both working after launch. Each line below is scoped to what your business actually needs rather than sold as a fixed package.</p>
        </header>

        <div className="hp-lux__index">
          {SERVICES_CATALOG.map((service, index) => (
            <div key={service.name} className="hp-lux__entry">
              <span className="hp-lux__num">{String(index + 1).padStart(2, '0')}</span>
              <div className="hp-lux__id">
                {service.serviceType !== service.name && (
                  // The maintenance line's serviceType is verbatim its name.
                  <span className="hp-lux__cat">{service.serviceType}</span>
                )}
                <h3 className="hp-lux__name">{service.name}</h3>
              </div>
              <p className="hp-lux__text">{service.description}</p>
            </div>
          ))}
        </div>

        {onServicesClick && (
          <div className="hp-lux__cta">
            <button type="button" className="svc-btn svc-btn--primary" onClick={onServicesClick}>
              Explore Our Services
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
