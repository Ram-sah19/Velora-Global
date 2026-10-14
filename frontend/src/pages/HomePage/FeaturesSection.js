import React from 'react';
import SectionHead from '../../components/SectionHead';
import { GRADING_CRITERIA } from '../../content/siteFacts';

export default function FeaturesSection() {
  const features = [
    {
      badge: "Verified credentials",
      title: "Certificates With a Public Verification Endpoint",
      description: "Every completion certificate is issued with a unique verification ID that resolves against our public endpoint for employer and university checks."
    },
    {
      badge: "Direct mentorship",
      title: "Executive Founding Leadership",
      description: "Direct evaluation and mentorship from Abhishek Sah (Founder & CEO), Krishna Sah (Co-Founder & CTO), and Rohit Sah (Co-Founder & COO)."
    },
    {
      badge: "Portfolio projects",
      title: "Production-Grade Codebase",
      description: "Build real-world MERN, AI model pipelines, and DevOps workflows ready to feature on your GitHub and resume."
    },
    {
      badge: `${GRADING_CRITERIA.length}-criteria evaluation`,
      title: "Objective Performance Grading",
      description: `Evaluated across ${GRADING_CRITERIA.join(', ')} — the same five fields the evaluation endpoint records.`
    }
  ];

  return (
    <section className="hp-band hp-band--white">
      <div className="container">
        <SectionHead
          variant="band"
          eyebrow="Why Velora Global"
          title="Built for Excellence & Career Trust"
          lede="Our platform combines rigorous project standards, verified credentials, and founding leadership support."
        />

        <div className="hp-cells">
          {features.map((feature) => (
            <article key={feature.title} className="hp-cell">
              <span className="hp-cell__label">{feature.badge}</span>
              <h3 className="hp-cell__title">{feature.title}</h3>
              <p className="hp-cell__text">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
