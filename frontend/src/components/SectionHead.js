import React from 'react';

/**
 * The label + heading + lede block that opens a section. Two sizes ship: 'page' for
 * the hero head on a routed page, 'band' for a home page band. Pick a variant instead
 * of hand-writing the four elements again.
 */
const VARIANTS = {
  page: { head: 'svc-head', title: 'svc-title', lede: 'svc-lede' },
  band: { head: 'hp-head', title: 'hp-title', lede: 'hp-lede' }
};

export default function SectionHead({ eyebrow, title, lede, level = 2, variant = 'page', center = false }) {
  const classes = VARIANTS[variant];
  const Heading = `h${level}`;
  return (
    <header className={center ? `${classes.head} hp-head--center` : classes.head}>
      <p className="svc-eyebrow">{eyebrow}</p>
      <Heading className={classes.title}>{title}</Heading>
      {lede && <p className={classes.lede}>{lede}</p>}
    </header>
  );
}
