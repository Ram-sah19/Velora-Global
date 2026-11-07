import React from 'react';
import { CtaBand, SectionHead } from '../../components';
import { INTERNSHIP_APPLICATION_FORM_URL } from '../../constants';

const OPEN_POSITIONS = [
  {
    title: 'Sales Intern',
    description: 'Support lead generation, prospect research, outreach, and client communication for Velora Global services.',
    skills: ['Communication', 'Lead generation', 'Client research']
  },
  {
    title: 'Business Development Intern',
    description: 'Help identify partnership opportunities, prepare proposals, and support business growth across our software and learning programs.',
    skills: ['Market research', 'Proposal writing', 'Relationship building']
  },
  {
    title: 'Code Instructor',
    description: 'Teach and mentor learners through practical programming projects, code reviews, and technical guidance.',
    skills: ['Programming fundamentals', 'Mentoring', 'Technical communication']
  }
];

export default function CareersPage() {
  return (
    <section className="internships-page">
      <div className="container">
        <SectionHead
          level={1}
          eyebrow="Join Velora Global"
          title="Current Open Positions"
          lede="We are hiring people who want to help businesses ship better software and learners build practical technical skills."
        />

        <div className="ip-grid">
          {OPEN_POSITIONS.map((position) => (
            <article key={position.title} className="ip-card">
              <p className="svc-eyebrow">Now hiring</p>
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
                    Apply for this role
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
