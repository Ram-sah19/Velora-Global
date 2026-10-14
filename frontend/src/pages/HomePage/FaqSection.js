import React from 'react';
import SectionHead from '../../components/SectionHead';
import { FAQS } from '../../content/siteFacts';

export default function FaqSection() {
  const faqs = FAQS.home;

  return (
    <section className="hp-band hp-band--white">
      <div className="container hp-faq">
        <SectionHead
          variant="band"
          eyebrow="Transparent Answers"
          title="Frequently Asked Questions"
          lede="Everything you need to know about Velora Global internships, training, and credential verification."
        />

        <div className="page-faq__list">
          {faqs.map((faq, index) => (
            <details key={faq.question} className="page-faq__item" open={index === 0}>
              <summary className="page-faq__q">{faq.question}</summary>
              <p className="page-faq__a">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
