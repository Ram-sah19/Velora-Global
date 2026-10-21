/**
 * Navigation mappings and per-page SEO metadata
 */

export const tabToPathMap = {
  home: '/',
  services: '/services',
  about: '/about',
  team: '/team',
  internships: '/internships',
  training: '/training',
  privacy: '/privacy-policy',
  terms: '/terms',
  client: '/client',
  admin: '/admin'
};

export const pathToTabMap = {
  '/': 'home',
  '/home': 'home',
  '/services': 'services',
  '/contact': 'services',
  '/team': 'team',
  '/about': 'about',
  '/internships': 'internships',
  '/training': 'training',
  '/student': 'internships',
  '/privacy-policy': 'privacy',
  '/terms': 'terms',
  '/workspace': 'home',
  '/client': 'client',
  '/admin': 'admin'
};

export const pageTitles = {
  home: 'Velora Global | Software Solutions in Nepal',
  services: 'IT Solutions & Software Development in Nepal | Velora Global',
  about: 'About Velora Global | Company, Leadership & How We Work',
  team: 'Executive Leadership & Mentors | Velora Global',
  internships: 'Tech Internships in Nepal for Students | Velora Global',
  training: 'Tech Training in Nepal | Velora Global',
  privacy: 'Privacy Policy | Velora Global',
  terms: 'Terms & Conditions | Velora Global',
  client: 'Corporate Client Workspace | Velora Global',
  admin: 'Staff Portal | Velora Global'
};

export const pageDescriptions = {
  home: 'Custom websites, mobile apps and AI chatbots for businesses. Internships and tech training for students. Built in Kathmandu, Nepal, delivered remotely.',
  services: 'IT solutions for businesses in Nepal: web platforms, mobile apps, AI tools, digital marketing and SEO. Published NPR fee bands, source code handed over.',
  about: 'A Kathmandu technology company: one team builds web, mobile and AI software for clients, the other runs internships and training for students across Nepal.',
  team: 'Meet the Velora Global leadership team: Abhishek Sah (Founder & CEO), Krishna Sah (Co-Founder & CTO), Rohit Sah (Co-Founder & COO) and Shivshankar Sah.',
  internships: 'Internships where students ship real client work with 1-to-1 mentors. One-time mentorship fee from NPR 500. Pick 2 weeks to 6 months, fully remote.',
  training: 'Instructor-led tech training in Nepal: frontend, backend, full stack, AI, machine learning, Python, Java, UI/UX, mobile and testing. From NPR 1,999.',
  privacy: 'How Velora Global collects, stores, shares and deletes personal data for students, interns and corporate clients, and how to request access or removal.',
  terms: 'The terms that govern Velora Global internship and training enrolment, client project delivery, certificates, fees and refunds.',
  client: 'Private client workspace for reviewing ongoing software deliverables, milestones, source code repositories and project timelines.',
  admin: 'Private staff sign-in for the Velora Global administration area.'
};

/**
 * Indexing policy for the signed-in app views. Their values match the `robots`
 * entries in functions/_shared/routeSeo.js, which the edge writes into the served
 * HTML; a tab absent here is open to the index. scripts/verify-route-seo.mjs fails
 * when the two layers disagree.
 */
export const pageRobots = {
  client: 'noindex, nofollow',
  admin: 'noindex, nofollow'
};

/**
 * A certificate lookup page exists per certificate ID, so its metadata is built
 * from the ID instead of sitting in the maps above. functions/_shared/routeSeo.js
 * carries the same copy for the served HTML, and scripts/verify-route-seo.mjs
 * fails when the two disagree.
 */
export const verifyPageMeta = (certificateId) => ({
  title: `Certificate Verification ${certificateId} | Velora Global`,
  description: `Checks the certificate record Velora Global holds against ${certificateId}: recipient, program, duration and issue date.`
});
