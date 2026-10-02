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
  home: 'Velora Global | Tech Training & Software Development in Nepal',
  services: 'Tech Services & Software Development in Nepal | Velora Global',
  about: 'About Velora Global | Company, Leadership & How We Work',
  team: 'Executive Leadership & Mentors | Velora Global',
  internships: 'Project-Based Tech Internships in Nepal | Velora Global',
  training: 'Tech Training in Nepal | Guided Programs | Velora Global',
  privacy: 'Privacy Policy | Velora Global',
  terms: 'Terms & Conditions | Velora Global',
  client: 'Corporate Client Workspace | Velora Global',
  admin: 'Staff Portal | Velora Global'
};

export const pageDescriptions = {
  home: 'Custom web and mobile software, AI chatbot systems, project-driven internships and guided technology training from Velora Global in Kathmandu, Nepal.',
  services: 'Custom MERN web applications, cross-platform iOS and Android apps and AI chatbot systems, delivered in four steps with 30 days of post-launch support.',
  about: 'Velora Global is a Kathmandu-based technology company building web, mobile and AI software for clients and running internships and training programs.',
  team: 'Meet the Velora Global leadership team: Abhishek Sah (Founder & CEO), Krishna Sah (Co-Founder & CTO), Rohit Sah (Co-Founder & COO) and Shivshankar Sah.',
  internships: 'Project-driven technology internships with 1-to-1 mentorship, published grading criteria and a verifiable completion certificate, from NPR 199 for two weeks.',
  training: 'Guided technology training in frontend, backend, full stack with AI, machine learning, Python, Java, MERN, PERN, UI/UX and testing, from NPR 3,000 per program.',
  privacy: 'How Velora Global collects, stores, shares and deletes personal data for students, interns and corporate clients, and how to request access or removal.',
  terms: 'The terms that govern Velora Global internship and training enrolment, client project delivery, certificates, fees and refunds.',
  client: 'Private client workspace for reviewing ongoing software deliverables, milestones, source code repositories, and project timelines.',
  admin: 'Private staff sign-in for the Velora Global administration area.'
};
