import React, { useState } from 'react';
import SectionHead from '../../components/SectionHead';
import { ENGAGEMENT_STEPS, SERVICES_CATALOG } from '../../content/siteFacts';

const PRINCIPLES = [
  {
    title: 'Dedicated Project Ownership',
    text: 'Our leadership team drafts the architecture, wireframe roadmap, budget milestones and delivery schedule, and you take full source code ownership at launch.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M2 13h20" />
      </svg>
    )
  },
  {
    title: 'Structured Sprint Communication',
    text: 'Live staging previews and written sprint updates keep you in the loop, so your feedback shapes the product while it is being built.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    )
  },
  {
    title: 'Documented Scope and Support',
    text: 'Scope, pricing and the delivery schedule are agreed in writing before work starts, and every launch closes with staff training and 30 days of post-launch support.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M9 15h6M9 11h2" />
      </svg>
    )
  }
];

export default function GlobalFootprintSection({ onServicesClick }) {
  const [activeHubId, setActiveHubId] = useState('nepal');

  const hubs = [
    {
      id: 'nepal',
      code: 'NP',
      country: 'Nepal',
      city: 'Kathmandu',
      role: 'Client Delivery & Architecture Hub',
      timezone: 'NPT (UTC +5:45)',
      status: 'Primary Operations',
      statLabel: 'How Work Is Led',
      statValue: 'Founder-reviewed scope, builds and handovers',
      overview: 'Velora Global is run from Kathmandu. Abhishek Sah (Founder & CEO), Krishna Sah (Co-Founder & CTO) and Rohit Sah (Co-Founder & COO) lead discovery, architecture and project reviews from here, in person at our Balkumari office or over Google Meet / Zoom.',
      highlights: [
        'Discovery meetings in Kathmandu or on video, whichever suits your team',
        'A written scope blueprint: architecture, wireframe roadmap, budget milestones and delivery schedule',
        'Launch, staff training and 30 days of dedicated post-launch support'
      ]
    },
    {
      id: 'usa',
      code: 'US',
      country: 'United States',
      city: 'Eastern & Pacific time',
      role: 'Remote Client Engagements',
      timezone: 'EST / PST (UTC -5 / -8)',
      status: 'Remote Scheduling Window',
      statLabel: 'How We Coordinate',
      statValue: 'Written handovers so reviews continue the same day',
      overview: 'US-based clients work with us asynchronously. Handovers are written up so a review that ends in Kathmandu continues the same day in US hours, and calls are scheduled in your early morning or evening.',
      highlights: [
        'Customer portals, booking platforms and internal business management systems',
        'Digital assistants that answer customer questions from your own documents',
        'Live demos on staging builds while both teams are online'
      ]
    },
    {
      id: 'india',
      code: 'IN',
      country: 'India',
      city: 'Bengaluru & Delhi NCR',
      role: 'Remote Client Engagements',
      timezone: 'IST (UTC +5:30)',
      status: 'Remote Scheduling Window',
      statLabel: 'How We Coordinate',
      statValue: 'Same-day reviews in overlapping hours',
      overview: 'India is close to our own working hours, so client work there usually turns around the same day. Discovery calls, sprint demos and reviews land inside overlapping business hours.',
      highlights: [
        'Cross-platform iOS and Android applications for customer-facing services',
        'Search visibility work that opens with a written audit and closes with a report',
        'Content and feature updates once your system is live'
      ]
    },
    {
      id: 'australia',
      code: 'AU',
      country: 'Australia',
      city: 'Sydney & Melbourne',
      role: 'Remote Client Engagements',
      timezone: 'AEST (UTC +10:00)',
      status: 'Remote Scheduling Window',
      statLabel: 'How We Coordinate',
      statValue: 'Four to four-and-a-half hours ahead of Kathmandu',
      overview: 'AEST sits ahead of us, so Australian work tends to land at the start of our day. Reviews come back the same calendar day for anything sent before our evening.',
      highlights: [
        'Page speed, content and technical structure work from the written SEO audit',
        'Hosting, migration and uptime monitoring for systems already in production',
        'Milestone reviews written up so nothing waits on a timezone gap'
      ]
    },
    {
      id: 'bangladesh',
      code: 'BD',
      country: 'Bangladesh',
      city: 'Dhaka',
      role: 'Remote Client Engagements',
      timezone: 'BST (UTC +6:00)',
      status: 'Remote Scheduling Window',
      statLabel: 'How We Coordinate',
      statValue: 'One-and-a-quarter hours ahead of Kathmandu',
      overview: 'Dhaka overlaps almost fully with our working day, which makes live calls easy to schedule. Scope documents, sprint demos and support follow the same process as everywhere else we work.',
      highlights: [
        'Internal business tools and dashboards built around your processes',
        'Live demo sessions while both teams are at work',
        'Bug fixing, security checks and backups after launch'
      ]
    },
    {
      id: 'nigeria',
      code: 'NG',
      country: 'Nigeria',
      city: 'Lagos',
      role: 'Remote Client Engagements',
      timezone: 'WAT (UTC +1:00)',
      status: 'Remote Scheduling Window',
      statLabel: 'How We Coordinate',
      statValue: 'Four-and-a-half hours behind Kathmandu',
      overview: 'West Africa is behind us, so work from there is typically reviewed during our evening and answered before your next morning. Client engagements are open to businesses in any country.',
      highlights: [
        'Booking platforms and customer-facing web systems',
        'Digital assistants that capture enquiries from your website',
        'Written status updates that bridge our working day and yours'
      ]
    }
  ];

  const currentHub = hubs.find(h => h.id === activeHubId) || hubs[0];

  return (
    <section className="hp-band">
      <div className="container">
        <SectionHead
          variant="band"
          eyebrow="Delivery, Support and Communication"
          title="Based in Kathmandu, Working to Your Business Hours"
          lede="Velora Global builds and maintains custom web platforms, mobile applications and AI assistants for business clients, from Kathmandu, Nepal. We have no other offices — what changes by region is how your working hours overlap with ours, and what that means for meetings, demos and support."
        />

        <div className="hp-facts">
          <div className="hp-fact">
            <span className="hp-fact__value">{SERVICES_CATALOG.length}</span>
            <span className="hp-fact__label">Service lines delivered</span>
          </div>
          <div className="hp-fact">
            <span className="hp-fact__value">{ENGAGEMENT_STEPS.length}</span>
            <span className="hp-fact__label">Steps from brief to launch</span>
          </div>
          <div className="hp-fact">
            <span className="hp-fact__value">30 Days</span>
            <span className="hp-fact__label">Post-launch support</span>
          </div>
          <div className="hp-fact">
            <span className="hp-fact__value">UTC+5:45</span>
            <span className="hp-fact__label">Home base in Kathmandu</span>
          </div>
        </div>

        <div className="hp-grid">
          <div className="hp-picker">
            <span className="hp-picker__label">Select your region</span>
            {hubs.map((hub) => (
              <button
                key={hub.id}
                type="button"
                className="hp-region"
                onClick={() => setActiveHubId(hub.id)}
                aria-pressed={hub.id === activeHubId}
              >
                <span className="hp-region__id">
                  <span className="hp-code">{hub.code}</span>
                  <span>
                    <span className="hp-region__name">{hub.country}</span>
                    <span className="hp-region__city">{hub.city}</span>
                  </span>
                </span>
                {hub.id === 'nepal' && <span className="hp-tag">Head office</span>}
              </button>
            ))}
          </div>

          <article key={activeHubId} className="hp-panel">
            <div className="hp-panel__head">
              <div className="hp-panel__who">
                <span className="hp-code hp-code--lg">{currentHub.code}</span>
                <div>
                  <h3 className="hp-panel__title">{currentHub.country} Delivery Window</h3>
                  <span className="hp-panel__city">{currentHub.city}</span>
                </div>
              </div>
              <div className="hp-panel__chips">
                <span className="hp-tag">
                  <span className="hp-tag__dot" aria-hidden="true" />
                  {currentHub.status}
                </span>
                <span className="hp-tag hp-tag--quiet">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {currentHub.timezone}
                </span>
                <span className="hp-tag hp-tag--quiet">{currentHub.role}</span>
              </div>
            </div>

            <p className="hp-panel__text">{currentHub.overview}</p>

            <div className="hp-focus">
              <span className="hp-focus__label">What we deliver</span>
              <ul className="hp-focus__list">
                {currentHub.highlights.map((item) => (
                  <li key={item}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--svc-accent)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="4 12 9 17 20 6" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hp-panel__foot">
              <div>
                <span className="hp-panel__stat-label">{currentHub.statLabel}</span>
                <span className="hp-panel__stat-value">{currentHub.statValue}</span>
              </div>
            </div>
          </article>
        </div>

        <div className="hp-pillars">
          {PRINCIPLES.map((principle) => (
            <div key={principle.title} className="hp-pillar">
              <span className="hp-pillar__icon">{principle.icon}</span>
              <h4 className="hp-pillar__title">{principle.title}</h4>
              <p className="hp-pillar__text">{principle.text}</p>
            </div>
          ))}
        </div>

        {onServicesClick && (
          <div className="hp-actions">
            <button type="button" className="svc-btn svc-btn--primary" onClick={onServicesClick}>
              Discuss Your Project
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

