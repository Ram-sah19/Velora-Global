import React from 'react';
import { CtaBand, SectionHead } from '../../components';
import { INTERNSHIP_APPLICATION_FORM_URL } from '../../constants';

const OPEN_POSITIONS = [
  {
    title: 'Sales Intern',
    type: 'Business Growth',
    description: 'Support lead generation, prospect research, outreach, and client communication for Velora Global services.',
    skills: ['Communication', 'Lead generation', 'Client research']
  },
  {
    title: 'Business Development Intern',
    type: 'Business Growth',
    description: 'Help identify partnership opportunities, prepare proposals, and support business growth across our software and learning programs.',
    skills: ['Market research', 'Proposal writing', 'Relationship building']
  },
  {
    title: 'Code Instructor',
    type: 'Learning & Mentorship',
    description: 'Teach and mentor learners through practical programming projects, code reviews, and technical guidance.',
    skills: ['Programming fundamentals', 'Mentoring', 'Technical communication']
  }
];

export default function CareersPage() {
  return (
    <section className="careers-page">
      <div className="container">
        <SectionHead
          level={1}
          eyebrow="Join Velora Global"
          title="Careers & Open Jobs at Velora Global"
          lede="Join a Kathmandu-based technology company helping businesses ship better software and students build practical technical skills. We are currently hiring for business, sales and teaching roles."
        />

        <div className="careers-intro">
          <div>
            <p className="careers-intro__label">Build meaningful work</p>
            <p className="careers-intro__text">
              Work with a small, ambitious team across software delivery, business growth and
              technical education.
            </p>
          </div>
          <div className="careers-intro__meta">
            <span>03</span>
            <small>Open positions</small>
          </div>
        </div>

        <div className="ip-grid careers-positions">
          {OPEN_POSITIONS.map((position) => (
            <article key={position.title} className="ip-card careers-card">
              <div className="careers-card__topline">
                <span className="careers-card__status">Open role</span>
                <span className="careers-card__number">0{OPEN_POSITIONS.indexOf(position) + 1}</span>
              </div>
              <p className="careers-card__type">{position.type}</p>
              <h2 className="ip-card__title">{position.title}</h2>
              <p className="ip-card__desc">{position.description}</p>
              <ul className="svc-features ip-card__stack">
                {position.skills.map((skill) => <li key={skill}>{skill}</li>)}
              </ul>
              <div className="ip-card__foot">
                <div className="ip-card__actions">
                  <a
                    className="svc-btn svc-btn--primary"
                    href={INTERNSHIP_APPLICATION_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View position &amp; apply
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <CtaBand
        eyebrow="Applications"
        title="Interested in joining the team?"
        text="Open the application form and mention the position you are applying for."
        actions={
          <a
            className="svc-btn svc-btn--primary"
            href={INTERNSHIP_APPLICATION_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open the Application Form
          </a>
        }
      />
    </section>
  );
}
