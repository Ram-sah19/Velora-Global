import React from 'react';
import SectionHead from '../../components/SectionHead';
import { GRADING_CRITERIA } from '../../content/siteFacts';
import { INTERNSHIP_PROGRAMS } from '../../content/programs';

export default function StudentJourneySection({ onApplyClick }) {
  const steps = [
    {
      step: "01",
      title: "Select Domain & Apply",
      description: `Browse the ${INTERNSHIP_PROGRAMS.length} technology & design tracks listed on the internship page. Submit your statement of purpose and portfolio link.`
    },
    {
      step: "02",
      title: "Work on Live Projects",
      description: "Receive practical assignments, write clean production code, and follow industry standard workflows."
    },
    {
      step: "03",
      title: "5-Criteria Executive Grading",
      description: `Projects are graded on ${GRADING_CRITERIA.join(', ')}.`
    },
    {
      step: "04",
      title: "Earn Verified Certificate",
      description: "Receive an official Velora Global Certificate signed by Founder Abhishek Sah, carrying a unique verification ID."
    }
  ];

  return (
    <section className="hp-band hp-band--dark">
      <div className="container">
        <SectionHead
          variant="band"
          eyebrow="Our Talent & Academy Engine"
          title="How We Cultivate & Mentor Top Engineering Talent"
          lede="A transparent 4-step framework taking candidates through real code reviews, practical software projects, and verified credentials."
        />

        <div className="hp-cells">
          {steps.map((item) => (
            <article key={item.step} className="hp-cell">
              <span className="hp-cell__num">{item.step}</span>
              <h3 className="hp-cell__title">{item.title}</h3>
              <p className="hp-cell__text">{item.description}</p>
            </article>
          ))}
        </div>

        <div className="hp-actions">
          <button type="button" className="svc-btn svc-btn--emerald" onClick={onApplyClick}>
            Start Your Journey Today
          </button>
        </div>
      </div>
    </section>
  );
}
