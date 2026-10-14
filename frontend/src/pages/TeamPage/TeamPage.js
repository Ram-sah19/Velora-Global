import React from 'react';
import CtaBand from '../../components/CtaBand';
import SectionHead from '../../components/SectionHead';
import { INTERNSHIP_PROGRAMS, TRAINING_PROGRAMS } from '../../content/programs';

const LINKEDIN_URL = 'https://www.linkedin.com/company/veloraglo-bal/';

const FOUNDERS = [
  {
    name: 'Abhishek Sah',
    role: 'Founder & CEO • Full Stack & AI/ML Engineer',
    image: '/media/abhishek_sah.jpg',
    bio: 'Full Stack Developer and AI/ML Engineer from Nepal. Leading platform engineering, open-source innovation, enterprise solutions, and career mentorship for global engineering talent.',
    expertise: ['Full Stack Development', 'AI/ML Engineering', 'Enterprise Systems', 'System Architecture', 'Tech Leadership']
  },
  {
    name: 'Krishna Sah',
    role: 'Co-Founder & CTO',
    image: '/media/rambilas_sah.png',
    bio: 'Directing technical infrastructure, cloud deployments, platform engineering, AI integrations, and full-stack curriculum roadmaps across all domain specializations.',
    expertise: ['Cloud Architecture', 'Platform Engineering', 'Technical Strategy', 'AI Systems']
  },
  {
    name: 'Rohit Sah',
    role: 'Co-Founder & COO',
    image: '/media/rohit_sah.jpg',
    bio: 'Directing company operations, cohort execution, student mentorship systems, strategic partnerships, and operational excellence across all internship programs.',
    expertise: ['Operations Strategy', 'Cohort Execution', 'Mentorship Systems', 'Strategic Partnerships']
  },
  {
    name: 'Shivshankar Sah',
    role: 'Contracts & Operations Director',
    image: '/media/shivshankar_sah.jpg',
    bio: 'Directs enterprise contracts, corporate agreements, vendor operations, institutional MoUs, and legal compliance workflows for all student and client engagements.',
    expertise: ['Contracts Strategy', 'Corporate MoUs', 'SLA Compliance', 'Vendor Operations']
  }
];

const PROGRAM_LEADS = [
  {
    name: 'Aayush Shrestha',
    role: 'Technical Programs Lead',
    bio: 'Manages technical cohort sprints, domain syllabus roadmaps, and technical mentor allocations across engineering tracks.',
    expertise: ['Cohort Management', 'Sprint Planning', 'Technical Roadmaps']
  },
  {
    name: 'Sunita Thapa',
    role: 'University Relations & Placement Lead',
    bio: 'Leads academic outreach, institutional agreements, candidate onboarding verification, and post-internship career placement.',
    expertise: ['University Partnerships', 'Candidate Placement', 'Campus Outreach']
  }
];

const MILESTONES = [
  {
    num: '01',
    title: 'Village Roots & Grit',
    text: 'Rose from a rural village in Nepal, mastering computing, data structures, and modern software architectures through self-driven perseverance.'
  },
  {
    num: '02',
    title: 'Full Stack & Open Source Contributor',
    text: 'Engineered scalable web applications across the MERN and cloud stacks while contributing to open-source developer toolkits and repositories.'
  },
  {
    num: '03',
    title: `${INTERNSHIP_PROGRAMS.length} Internship Tracks & ${TRAINING_PROGRAMS.length} Training Programs`,
    text: `Reviews and mentorship run across the ${INTERNSHIP_PROGRAMS.length} internship domains and ${TRAINING_PROGRAMS.length} guided training programs listed on this site. Interns work on deliverables in the domain they choose, remote or in person, and every submission is scored against the same five published criteria.`
  }
];

const PRINCIPLES = [
  {
    title: 'Practical Mastery',
    text: 'We believe true learning comes from building real production codebases, not just theoretical tutorials.'
  },
  {
    title: 'Credential Trust',
    text: 'Every completion certificate carries a unique verification ID that anyone can check at our public verification endpoint.'
  },
  {
    title: 'Direct Mentorship',
    text: 'Our founding leaders actively review, grade, and provide actionable feedback on student deliverables.'
  }
];

export default function TeamPage({ onExploreClick, onConsultationClick }) {
  return (
    <section className="team-page">
      <div className="container">

        <SectionHead
          level={1}
          eyebrow="About Us & Executive Leadership"
          title="Empowering Careers Through Real-World Innovation"
          lede="Velora Global was founded in 2026 by engineers who wanted to close the gap between academic theory and production software work."
        />

        <section className="svc-process" aria-labelledby="team-founders-title">
          <p className="ip-label">The founding team</p>
          <h2 id="team-founders-title" className="svc-section-title">Who leads the work</h2>

          <div className="tp-founders">
            {FOUNDERS.map((person, index) => (
              <article key={person.name} className="tp-founder">
                <img
                  className="tp-founder__photo"
                  src={person.image}
                  alt={`${person.name} - ${person.role} at Velora Global Nepal`}
                  width="400"
                  height="400"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = person.image.replace('/media/', '/images/');
                  }}
                />
                <div className="tp-founder__body">
                  <span className="svc-step__num">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="svc-card__title">{person.name}</h3>
                  <p className="svc-card__tagline">{person.role}</p>
                  <p className="svc-card__desc">{person.bio}</p>
                  <ul className="svc-features ip-card__stack">
                    {person.expertise.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                  <a
                    className="svc-btn svc-btn--quiet"
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Connect on LinkedIn
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* Full-bleed band: outside the container so the colour covers the viewport. */}
      <CtaBand
        id="team-story-title"
        eyebrow="Founder's Journey & Vision"
        title="From a Village in Nepal to Engineering the Future of Tech"
        text={[
          <>
            Born and raised in Nepal, <strong>Abhishek Sah</strong> embarked on his journey into
            technology with pure curiosity, relentless discipline, and a drive to solve real-world
            problems through code. Overcoming geographical and institutional constraints, he
            transformed himself into an accomplished <strong>Full Stack Developer and AI/ML Engineer</strong>.
          </>,
          <>
            At Velora Global, Abhishek architects the systems we build, leads{' '}
            <strong>Full Stack &amp; AI development</strong> on live deliverables, and reviews student
            project submissions.
          </>,
          <>
            <strong>Our mandate</strong> — Velora Global was founded to give developers structured,
            mentored project work and to give clients software built to the same standard.
          </>
        ]}
        facts={MILESTONES.map((milestone) => ({
          label: `${milestone.num} · ${milestone.title}`,
          value: milestone.text
        }))}
      />

      <div className="container">
        <section className="svc-process" aria-labelledby="team-leads-title">
          <p className="ip-label">Operations &amp; Student Success</p>
          <h2 id="team-leads-title" className="svc-section-title">Departmental Management</h2>
          <p className="svc-section-lede">
            Dedicated domain leaders overseeing curriculum delivery, institutional MoUs, contracts, and
            student career outcomes.
          </p>

          <ol className="svc-steps svc-steps--two">
            {PROGRAM_LEADS.map((person) => (
              <li key={person.name} className="svc-step">
                <h3 className="svc-step__title">{person.name}</h3>
                <p className="ip-card__meta">{person.role}</p>
                <p className="svc-card__desc">{person.bio}</p>
                <ul className="svc-features">
                  {person.expertise.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <section className="svc-process" aria-labelledby="team-values-title">
          <p className="ip-label">Our Guiding Principles</p>
          <h2 id="team-values-title" className="svc-section-title">Driven by Impact &amp; Excellence</h2>

          <ol className="svc-steps svc-steps--three">
            {PRINCIPLES.map((principle, index) => (
              <li key={principle.title} className="svc-step">
                <span className="svc-step__num">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="svc-step__title">{principle.title}</h3>
                <p className="svc-step__text">{principle.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="svc-process" aria-labelledby="team-join-title">
          <p className="ip-label">Work with the founding team</p>
          <h2 id="team-join-title" className="svc-section-title">Ready to Work With the Founding Team?</h2>
          <p className="svc-section-lede">
            Apply for one of {INTERNSHIP_PROGRAMS.length} internship tracks or{' '}
            {TRAINING_PROGRAMS.length} guided training programs, and work alongside the founding team on
            live deliverables.
          </p>
          <div className="svc-cta__actions">
            {onExploreClick && (
              <button type="button" className="svc-btn svc-btn--primary" onClick={onExploreClick}>
                Explore Internship Opportunities
              </button>
            )}
            {onConsultationClick && (
              <button type="button" className="svc-btn svc-btn--quiet" onClick={onConsultationClick}>
                Book 1-on-1 with Abhishek Sah
              </button>
            )}
          </div>
        </section>
      </div>
    </section>
  );
}
