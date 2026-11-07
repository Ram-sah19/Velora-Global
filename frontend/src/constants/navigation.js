/**
 * Navigation mappings and per-page SEO metadata
 */

export const tabToPathMap = {
  home: '/',
  services: '/services',
  about: '/about',
  careers: '/careers',
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
  '/careers': 'careers',
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
  home: 'Software Solutions, Internships & Training in Nepal | Velora Global',
  services: 'Software Solutions for Businesses in Nepal | Velora Global',
  about: 'Velora Global | Software Solutions, Internships & Training',
  careers: 'Careers & Open Jobs at Velora Global | Nepal',
  team: 'Executive Leadership & Mentors | Velora Global',
  internships: 'Student Tech Internships in Nepal | Real Project Experience',
  training: 'Practical Tech Training in Nepal for Students | Velora Global',
  privacy: 'Privacy Policy | Velora Global',
  terms: 'Terms & Conditions | Velora Global',
  client: 'Corporate Client Workspace | Velora Global',
  admin: 'Staff Portal | Velora Global'
};

export const pageDescriptions = {
  home: 'Custom software solutions for businesses in Nepal, plus real-project internships and practical tech training for students. Built in Kathmandu and delivered remotely.',
  services: 'Custom software solutions for Nepalese businesses: web platforms, mobile apps, AI chatbots, SEO and digital marketing with clear NPR pricing.',
  about: 'Velora Global builds software for businesses and provides project-based internships and practical training for students in Nepal.',
  careers: 'Apply for current Velora Global openings: Sales Intern, Business Development Intern and Code Instructor.',
  team: 'Meet the Velora Global leadership team: Abhishek Sah (Founder & CEO), Krishna Sah (Co-Founder & CTO), Rohit Sah (Co-Founder & COO) and Shivshankar Sah.',
  internships: 'Student internships in Nepal where you build real project deliverables with 1-to-1 mentors, code reviews and a verified certificate. Remote durations from 2 weeks to 6 months.',
  training: 'Practical tech training in Nepal for students and working professionals: frontend, backend, full stack, AI, Python, Java, UI/UX, mobile and testing.',
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
