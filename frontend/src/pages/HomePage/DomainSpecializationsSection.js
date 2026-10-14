import React from 'react';
import { SERVICES_CATALOG } from '../../content/siteFacts';

export default function DomainSpecializationsSection({ onServicesClick }) {
  return (
    <section className="hp-band hp-band--white">
      <div className="container">
        <div className="hp-head">
          <span className="svc-eyebrow">Service Lines</span>
          <h2 className="hp-title">What We Do</h2>
          <p className="hp-lede">
            We build and maintain digital systems for business clients: the platforms your team runs daily
            operations on, the applications your customers use, and the support that keeps both working after
            launch. Each line below is scoped to what your business actually needs rather than sold as a fixed
            package.
          </p>
        </div>

        <div className="hp-svc">
          {SERVICES_CATALOG.map((service) => (
            <div key={service.name} className="hp-svc__row">
              <div className="hp-svc__id">
                {service.serviceType !== service.name && (
                  // The maintenance line's serviceType is verbatim its name.
                  <span className="hp-cell__label">{service.serviceType}</span>
                )}
                <h3 className="hp-cell__title">{service.name}</h3>
              </div>
              <p className="hp-cell__text">{service.description}</p>
            </div>
          ))}
        </div>

        {onServicesClick && (
          <div className="hp-actions">
            <button type="button" className="svc-btn svc-btn--primary" onClick={onServicesClick}>
              Explore Our Services
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
