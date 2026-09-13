/**
 * Navigation mappings and per-page SEO metadata
 */

export const tabToPathMap = {
  home: '/',
  services: '/services',
  team: '/team',
  internships: '/internships',
  training: '/training',
  client: '/client',
  admin: '/admin'
};

export const pathToTabMap = {
  '/': 'home',
  '/home': 'home',
  '/services': 'services',
  '/contact': 'services',
  '/team': 'team',
  '/about': 'team',
  '/internships': 'internships',
  '/training': 'training',
  '/student': 'internships',
  '/workspace': 'home',
  '/client': 'client',
  '/admin': 'admin'
};

export const pageTitles = {
  home: 'Velora Global | Technology Training, Internships & Enterprise Solutions',
  services: 'Enterprise IT Solutions & Services | Velora Global',
  team: 'About Us & Executive Leadership | Velora Global',
  internships: 'Practical Technology Internships | Velora Global',
  training: 'Guided Skills Training & Bootcamps | Velora Global',
  client: 'Corporate Client Workspace | Velora Global',
  admin: 'Executive Admin Dashboard | Velora Global'
};

export const pageDescriptions = {
  home: 'Practical technology training, project-driven internships, and scalable enterprise IT solutions (Web, Mobile & AI) in Kathmandu, Nepal. Founded in 2024 by Abhishek Sah.',
  services: 'Custom web development (MERN Stack), cross-platform iOS & Android mobile apps, and 24/7 AI chatbot integrations for modern businesses.',
  team: 'Learn about Velora Global (Founded in 2024) and our executive leadership: Abhishek Sah (Founder & CEO, Full Stack & AI/ML Engineer), Krishna Sah (CTO), Rohit Sah (COO), and Shivshankar Sah.',
  internships: 'Explore 10 specialized technology internship tracks with production code reviews, verified certificates, and industry mentorship.',
  training: 'Practical technology bootcamps from 1 week to 2 months covering Full Stack MERN, Python AI/ML, and cloud engineering with live capstones.',
  client: 'Private client workspace for reviewing ongoing software deliverables, milestones, source code repositories, and project timelines.',
  admin: 'Executive management portal for Velora Global administrators to oversee applications, internships, task reviews, and student certifications.'
};
