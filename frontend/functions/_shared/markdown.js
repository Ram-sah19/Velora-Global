/**
 * Answer-first markdown for agents that send `Accept: text/markdown`.
 *
 * A crawler or an LLM that cannot execute React still needs the actual answer,
 * so each route serves a short direct answer followed by the same facts the
 * page renders, and every statement here is also visible on that page.
 */

import {
  FAQS,
  ORG,
  PEOPLE,
  GRADING_CRITERIA,
  INTERNSHIP_TIERS,
  INTERNSHIP_TRACKS,
  SERVICES_CATALOG,
  ENGAGEMENT_STEPS,
  TRAINING_PROGRAMS
} from "./entity.js";

const SITE = "https://velora-global.online";

const LEADERSHIP = PEOPLE.filter((person) => person.jobTitle !== "Website & Engineering");

function answers(key) {
  const faqs = FAQS[key] || [];
  return faqs
    .map((faq) => `### ${faq.question}\n\n${faq.answer}`)
    .join("\n\n");
}

const SECTION = {
  home: () =>
    [
      "## What Velora Global does",
      "Velora Global is a technology company based in Kathmandu, Nepal. It has two sides:",
      "",
      "1. **Enterprise software** — custom web applications, cross-platform iOS and Android apps, and AI chatbot systems for business clients.",
      "2. **Talent programs** — project-driven internships and guided training for students and working professionals, both run remotely.",
      "",
      "## Services",
      ...SERVICES_CATALOG.map(
        (service) => `- **${service.name}** — ${service.description}`
      ),
      "",
      "## Internship tracks",
      INTERNSHIP_TRACKS.map((track) => track.replace(/ Internship$/, "")).join(", ") + ".",
      "",
      "## Internship fees by duration",
      "| Duration | Fee |",
      "| --- | --- |",
      ...INTERNSHIP_TIERS.map((tier) => `| ${tier.duration} | ${tier.fee} |`),
      "",
      "## Training programs and fees",
      "| Program | Fee |",
      "| --- | --- |",
      ...TRAINING_PROGRAMS.map((program) => `| ${program.title} | ${program.fee} |`),
      "",
      "## How student work is graded",
      `Each submission is scored on ${GRADING_CRITERIA.length} criteria — ${GRADING_CRITERIA.join(
        ", "
      )} — and returned with written remarks.`,
      "",
      "## Certificate verification",
      "Every completion certificate carries a unique ID. To check one, call:",
      "",
      "```",
      "GET https://velora-global.online/api/certificates/verify/{certificateId}",
      "```",
      "",
      "A known ID returns the recipient, domain, issue date, duration and grade. An unknown ID returns HTTP 404 with `{\"valid\": false}`."
    ].join("\n"),

  services: () =>
    [
      "## What is included",
      ...SERVICES_CATALOG.map(
        (service) => `- **${service.name}** — ${service.description}`
      ),
      "",
      "## How an engagement runs",
      ...ENGAGEMENT_STEPS.map(
        (step, index) => `${index + 1}. **${step.name}** — ${step.text}`
      ),
      "",
      "## Pricing",
      "Projects are scoped and quoted individually; the site publishes no fixed price list for client work.",
      "",
      "## Contact",
      `- Email ${ORG.email}`,
      `- WhatsApp ${ORG.telephone}`,
      "- Project enquiry form: https://velora-global.online/services"
    ].join("\n"),

  internships: () =>
    [
      "## Tracks",
      ...INTERNSHIP_TRACKS.map((track) => `- ${track}`),
      "",
      "## Duration and fee",
      "| Duration | Fee |",
      "| --- | --- |",
      ...INTERNSHIP_TIERS.map((tier) => `| ${tier.duration} | ${tier.fee} |`),
      "",
      "## What you do",
      "Work is project-driven: you build deliverables for your track, review them 1-to-1 with a mentor, and are graded on " +
        `${GRADING_CRITERIA.length} published criteria (${GRADING_CRITERIA.join(", ")}).`,
      "",
      "## On completion",
      "Velora Global issues a certificate with a unique verification ID, checked at:",
      "",
      "```",
      "GET https://velora-global.online/api/certificates/verify/{certificateId}",
      "```",
      "",
      "## Apply",
      "Every track lists an Apply button that opens the internship application form."
    ].join("\n"),

  training: () =>
    [
      "## Programs and fees",
      "| Program | Fee |",
      "| --- | --- |",
      ...TRAINING_PROGRAMS.map((program) => `| ${program.title} | ${program.fee} |`),
      "",
      "## Format",
      "Training is guided and lecture-led, with step-by-step development and full codebase walkthroughs, and can be followed by an internship track.",
      "",
      "## Apply",
      "Every program card has an Apply button that opens the training application form."
    ].join("\n"),

  about: () =>
    [
      "## Organization",
      ORG.description,
      "",
      "## Leadership",
      ...LEADERSHIP.map((person) => `- **${person.name}** — ${person.jobTitle}`),
      "",
      "## Website & Engineering",
      "- Ram Sah",
      "",
      "## Contact",
      `- Email: ${ORG.email}`,
      `- Telephone / WhatsApp: ${ORG.telephone}`,
      "- City of operation: Kathmandu, Nepal",
      "",
      "## Elsewhere",
      ...ORG.sameAs.map((profile) => `- ${profile}`)
    ].join("\n"),

  team: () =>
    [
      "## Leadership and team",
      ...PEOPLE.map((person) => `- **${person.name}** — ${person.jobTitle}`)
    ].join("\n")
};

const GRAPH_TO_SECTION = {
  home: "home",
  service: "services",
  program: "internships",
  course: "training",
  about: "about",
  team: "team"
};

export function routeMarkdown(seo) {
  if (!seo) return null;
  const key = GRAPH_TO_SECTION[seo.graph];
  const body = key && SECTION[key] ? SECTION[key]() : seo.description;
  const faq = key ? answers(key) : "";

  return [
    `# ${seo.title}`,
    "",
    `> ${seo.description}`,
    "",
    `Canonical URL: ${seo.canonical}`,
    "",
    body,
    "",
    faq ? `## Questions\n\n${faq}` : "",
    "",
    `Publisher: ${ORG.name} — ${ORG.url}`
  ]
    .filter(Boolean)
    .join("\n");
}
