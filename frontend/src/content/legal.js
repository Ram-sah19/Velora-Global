/**
 * Legal document content, shared by the disclosure modals and the crawlable
 * /privacy-policy and /terms routes.
 *
 * The modals and the pages used to carry separate copies of this text, and they
 * had already drifted (different contact inboxes, a grading threshold the
 * evaluation endpoint does not implement, emojis that AGENTS.md forbids). One
 * source renders both, so what a crawler indexes is what a visitor is shown.
 */

export const LAST_UPDATED = 'September 2026';

export const PRIVACY_SECTIONS = [
  {
    heading: '1. Information We Collect From Students',
    paragraphs: [
      'To process program enrollments and issue completion certificates, we collect the following student data:'
    ],
    listType: 'ul',
    items: [
      { label: 'Identity and contact details', text: 'Full name, email address, phone or WhatsApp number, permanent and current city.' },
      { label: 'Academic and career background', text: 'College or university, current level of study, tech stack proficiency, portfolio links, and resume.' },
      { label: 'Program progress and submissions', text: 'Assigned project codebases, pull request links, evaluation scores, and mentor feedback notes.' }
    ]
  },
  {
    heading: '2. Information We Collect From Corporate Clients',
    paragraphs: [
      'When a client requests custom software work, we collect:'
    ],
    listType: 'ul',
    items: [
      { label: 'Corporate contacts', text: 'Contact name, company name, business email, phone or WhatsApp number.' },
      { label: 'Project specifications', text: 'Technical requirements, scope documents, budget range, and wireframes.' },
      { label: 'Technical assets and credentials', text: 'API keys, server access tokens, or database connection strings a client provides for integration work.' }
    ]
  },
  {
    heading: '3. How We Use It',
    paragraphs: [
      'Student information is used to verify eligibility for the tracks we list, provision student dashboard accounts, arrange code reviews with the mentoring team, issue completion certificates carrying a unique verification ID, and respond to career questions.'
    ]
  },
  {
    heading: '4. Confidentiality on Client Work',
    paragraphs: [
      'We treat client requirements, business logic, customer data models and custom source code as confidential. Client project information is used to deliver the contracted engineering work and for nothing else.'
    ]
  },
  {
    heading: '5. Who Can Access Client Repositories',
    paragraphs: [
      'Client source code and supplied credentials are accessible to the leadership team named on our team page and to the engineers assigned to that project. Work is kept in private repositories.'
    ]
  },
  {
    heading: '6. We Do Not Sell Your Data',
    paragraphs: [
      'We do not sell, rent, lease, or trade personal data or project scopes to advertisers, telemarketers, or third-party databases.'
    ]
  },
  {
    heading: '7. What the Public Verification Record Shows',
    paragraphs: [
      'When an employer or university checks a certificate ID against our public verification endpoint, the record returns the certificate ID, recipient name, domain track, issue date, duration and grade. Contact details such as email address, phone number or home address are not part of that public record.'
    ]
  },
  {
    heading: '8. Hosting and Security',
    paragraphs: [
      'Application data is hosted on managed cloud database infrastructure with encryption in transit. Administrative access is limited to the team members who need it to run programs and deliver projects.'
    ]
  },
  {
    heading: '9. Retention and Deletion',
    paragraphs: [
      'After a project is handed over, staging credentials and temporary environment variables are removed. Backups are kept only as long as the post-launch support period requires, unless you ask us in writing to delete them sooner.'
    ]
  },
  {
    heading: '10. Your Rights, and How to Reach Us',
    paragraphs: [
      'You can ask to inspect, correct, or delete the personal information we hold about you at any time. Write to info@velora-global.online and we will action the request against our records.'
    ]
  }
];

export const TERMS_SECTIONS = [
  {
    heading: '1. Who These Terms Apply To',
    paragraphs: [
      'Enrolling in a Practical Internship Track or a Guided Training Program, or commissioning custom software work, means you are agreeing to the terms below. Student terms are administered by the leadership team listed on our team page.'
    ]
  },
  {
    heading: '2. Programs and Published Fees',
    paragraphs: [
      'We run two pathways, and the prices on this site are the prices we charge:'
    ],
    listType: 'ul',
    items: [
      { label: 'Practical internship', text: 'You choose the length: 2 weeks (NPR 199), 1 month (NPR 499), 2 months (NPR 999), 3 months (NPR 1,999), or 6 months (NPR 4,999).' },
      { label: 'Guided training', text: 'Instructor-led programs priced per program, from NPR 3,000 to NPR 12,000. The fee printed on each program card is the fee charged.' }
    ]
  },
  {
    heading: '3. How Project Work Is Evaluated',
    paragraphs: [
      'Submissions are scored on each of the following criteria on a 1 to 10 scale. The overall score is the average of the five, and the letter grade follows it: 9.5 and above is A+, 8.5 to 9.4 is A, 7.5 to 8.4 is B+, 6.5 to 7.4 is B, below 6.5 is C. Written remarks accompany every evaluation.'
    ],
    listType: 'ol',
    items: [
      { text: 'Quality of Work' },
      { text: 'Technical Skills' },
      { text: 'Creativity' },
      { text: 'Completion of Requirements' },
      { text: 'Professional Approach' }
    ]
  },
  {
    heading: '4. Certificates',
    paragraphs: [
      'On completion of evaluation, students receive a digital certificate of completion carrying a unique verification ID. Certificates are issued in the recipient’s name, are not transferable, and can be revoked if the underlying submission is found not to be the student’s own work.'
    ]
  },
  {
    heading: '5. Fees and Refunds',
    paragraphs: [
      'Fees are shown in Nepali Rupees and cover platform access, project evaluation, mentor feedback, infrastructure, and certificate issuance. A fee is not refundable once project assignments, course materials, or dashboard credentials have been issued.'
    ]
  },
  {
    heading: '6. Original Work',
    paragraphs: [
      'Students submit code they wrote themselves. Submitting someone else’s repository, or redistributing our course materials without permission, ends the enrollment without refund.'
    ]
  },
  {
    heading: '7. Ownership of Work',
    paragraphs: [
      'Students keep the right to show their own submissions in a portfolio, on GitHub, or on a resume. Our curriculum, assignment templates, branding, and platform source code remain ours.'
    ]
  },
  {
    heading: '8. Suspension',
    paragraphs: [
      'We may suspend an enrollment for breach of the original-work rule, unexcused inactivity beyond 14 calendar days, or conduct that disrupts other participants.'
    ]
  },
  {
    heading: '9. Client Engagements: Scope and Payment',
    paragraphs: [
      'Custom software work is quoted per project after a scoping meeting. Fees are set out in the milestone proposal in NPR or USD. An initial deposit is required before kickoff, and remaining milestones are invoiced as each phase is accepted.'
    ]
  },
  {
    heading: '10. Client Engagements: Revisions and Ownership',
    paragraphs: [
      'Each milestone includes two rounds of revisions inside the agreed scope; work beyond it is scoped as a change request with its own pricing and timeline. Once invoices are settled in full, ownership of the custom source code, database schemas, and build artifacts transfers to the client.'
    ]
  },
  {
    heading: '11. Client Engagements: Post-Launch Support',
    paragraphs: [
      'Deliverables include 30 days of post-launch support, during which we fix defects that deviate from the agreed specification at no additional charge.'
    ]
  },
  {
    heading: '12. Governing Law',
    paragraphs: [
      'These terms are governed by the laws of Nepal. Disputes are addressed through good-faith discussion first; anything unresolved is settled by arbitration, where arbitration applies.'
    ]
  }
];
