/**
 * Legal document content, shared by the disclosure modals and the crawlable
 * /privacy-policy and /terms routes.
 *
 * The modals and the pages used to carry separate copies of this text, and they
 * had already drifted (different contact inboxes, a grading threshold the
 * evaluation endpoint does not implement, emojis that AGENTS.md forbids). One
 * source renders both, so what a crawler indexes is what a visitor is shown.
 *
 * Every statement here must describe something the code or the business actually
 * does: storage keys named in the cookie section exist in src/store and
 * backend/controllers/userController.js, and the access controls described in
 * section 11 are implemented there.
 */

export const LAST_UPDATED = 'October 2026';

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
      'Student information is used to verify eligibility for the tracks we list, provision student dashboard accounts, arrange code reviews with the mentoring team, issue completion certificates carrying a unique verification ID, and respond to career questions. Client information is used to scope, price, build and support the software you commission. We do not process either kind of data for advertising.'
    ]
  },
  {
    heading: '4. Consent, and the Law We Answer To',
    paragraphs: [
      'Nepal’s Privacy Act, 2075 (2018) and the individual privacy rules issued under it require that personal data be collected for a stated purpose, with the data subject’s consent, and kept secure. That is what this policy does: the purposes are listed in section 3, the retention periods in section 12, and the safeguards in section 11.',
      'Submitting an application or an enquiry form is your consent to the processing described here for that purpose. Giving consent is voluntary; if you would rather not provide the details we list, we cannot enrol you or quote for work, and you may ask us to delete what we already hold at any time under section 13.'
    ]
  },
  {
    heading: '5. Confidentiality on Client Work',
    paragraphs: [
      'We treat client requirements, business logic, customer data models and custom source code as confidential. Client project information is used to deliver the contracted engineering work and for nothing else. Where an intern or trainee works on a client project, they are told in writing which parts of the work must stay private.'
    ]
  },
  {
    heading: '6. Who Can Access Client Repositories',
    paragraphs: [
      'Client source code and supplied credentials are accessible to the leadership team named on our team page and to the engineers assigned to that project. Work is kept in private repositories.'
    ]
  },
  {
    heading: '7. We Do Not Sell Your Data',
    paragraphs: [
      'We do not sell, rent, lease, or trade personal data or project scopes to advertisers, telemarketers, or third-party databases.'
    ]
  },
  {
    heading: '8. Services We Collect Through',
    paragraphs: [
      'Internship and training applications are submitted through Google Forms, so the answers you type into those forms are collected and stored by Google on our account before we transfer them into our own system. Our website is hosted on Cloudflare Pages and our application programming interface runs on Render, both of which process limited technical data (such as your IP address and request logs) as part of hosting those services. We publish no advertising or analytics trackers, so no third party profiles you through this site.'
    ]
  },
  {
    heading: '9. Cookies and Browser Storage',
    paragraphs: [
      'The site sets one cookie and writes two browser storage items, all strictly necessary:'
    ],
    listType: 'ul',
    items: [
      { label: 'velora_refresh_token', text: 'An HttpOnly, Secure session cookie that keeps you logged in. It expires after 30 days or when you sign out, whichever comes first.' },
      { label: 'velora_user', text: 'Your name, email and role, saved in this browser’s local storage so a returning visit loads your workspace without a second sign-in.' },
      { label: 'velora_cookie_consent', text: 'The choice you make on the cookie banner, saved in local storage so the banner does not reappear.' }
    ]
  },
  {
    heading: '10. What the Public Verification Record Shows',
    paragraphs: [
      'When an employer or university checks a certificate ID against our public verification endpoint, the record returns the certificate ID, recipient name, program, issue date and duration. Contact details such as email address, phone number or home address are not part of that public record.'
    ]
  },
  {
    heading: '11. Hosting and Security',
    paragraphs: [
      'Application data is held on managed cloud database infrastructure and every connection to this site is encrypted in transit. Account passwords are stored only as bcrypt hashes, never as the text you type. Sessions are recorded server-side with an expiry and can be revoked, which is what happens when you sign out or when we close an enrollment. Administrative access is limited to the team members who need it to run programs and deliver projects, and we remove staging credentials and temporary environment variables once a project is handed over.'
    ]
  },
  {
    heading: '12. Retention and Deletion',
    paragraphs: [
      'We keep application, enrollment and evaluation records for as long as your account is open, and afterwards only as long as we need them to issue or honour a certificate, handle a dispute, or meet record-keeping duties imposed on Nepali businesses. Backups are kept no longer than the post-launch support period requires.',
      'The public verification record described in section 10 is the one exception: it is retained indefinitely, because its whole purpose is to let an employer or university check a credential years after you finish. Deleting the rest of your file does not delete that record.'
    ]
  },
  {
    heading: '13. Your Rights, and How to Reach Us',
    paragraphs: [
      'You can ask to inspect, correct, or delete the personal information we hold about you at any time. Write to info@velora-global.online from the address you used to apply, or send a message to +977-9826031419, and we will action the request against our records. Where we cannot delete something, section 12 explains why, and we will tell you which limited retention applies. If you are not satisfied with how we handle a request, you may escalate it to the authority designated under the Privacy Act.'
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
      { label: 'Practical internship', text: 'You choose the length: 2 weeks (NPR 199), 1 month (NPR 499), 2 months (NPR 999), 3 months (NPR 1,999), or 6 months (NPR 4,999). Interns are assigned to a real-world project brief drawn from our client work.' },
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
      'On completion of evaluation, students receive a digital certificate of completion carrying a unique verification ID. Certificates are issued in the recipient’s name, are not transferable, and can be revoked if the underlying submission is found not to be the student’s own work. Anyone may check a certificate ID against our public verification endpoint, which returns the name, program, issue date and duration recorded on it; the fields shown are listed in our privacy policy.'
    ]
  },
  {
    heading: '5. Fees and Refunds',
    paragraphs: [
      'Fees are shown in Nepali Rupees and cover platform access, project evaluation, mentor feedback, infrastructure, and certificate issuance. A fee is not refundable once project assignments, course materials, or dashboard credentials have been issued.',
      'A program fee buys the mentorship and evaluation described above. It is not payment for a job, it does not entitle you to a job offer, and no fee guarantees placement.'
    ]
  },
  {
    heading: '6. Original Work',
    paragraphs: [
      'Students submit code they wrote themselves. Submitting someone else’s repository, or redistributing our course materials without permission, ends the enrollment without refund.'
    ]
  },
  {
    heading: '7. Ownership of Your Own Work',
    paragraphs: [
      'Students keep the right to show their own submissions in a portfolio, on GitHub, or on a resume. Our curriculum, assignment templates, branding, and platform source code remain ours.'
    ]
  },
  {
    heading: '8. Work You Produce on a Client Project',
    paragraphs: [
      'When your assignment is part of a client engagement, the client owns the resulting code once their invoice is settled, under section 11. That does not remove your portfolio rights under section 7: you may describe the project and show the parts we have cleared in writing, and you must keep confidential any part, credential or customer data we have marked private. Clearing your portfolio use is something we will do on request rather than leave you to guess at.'
    ]
  },
  {
    heading: '9. Suspension',
    paragraphs: [
      'We may suspend an enrollment for breach of the original-work rule, unexcused inactivity beyond 14 calendar days, or conduct that disrupts other participants.'
    ]
  },
  {
    heading: '10. Client Engagements: Scope and Payment',
    paragraphs: [
      'Custom software work is quoted per project after a scoping meeting. Fees are set out in the milestone proposal in NPR or USD. An initial deposit is required before kickoff, and remaining milestones are invoiced as each phase is accepted.'
    ]
  },
  {
    heading: '11. Client Engagements: Revisions and Ownership',
    paragraphs: [
      'Each milestone includes two rounds of revisions inside the agreed scope; work beyond it is scoped as a change request with its own pricing and timeline. Once invoices are settled in full, ownership of the custom source code, database schemas, and build artifacts transfers to the client.'
    ]
  },
  {
    heading: '12. Client Engagements: Post-Launch Support',
    paragraphs: [
      'Deliverables include 30 days of post-launch support, during which we fix defects that deviate from the agreed specification at no additional charge.'
    ]
  },
  {
    heading: '13. Who You Are Contracting With',
    paragraphs: [
      'Velora Global, operated from Balkumari, Ring Road, Kathmandu, Nepal, is the party to every enrollment and engagement described in these terms. Write to info@velora-global.online or call +977-9826031419 to reach the leadership team. Our company registration number and permanent account number (PAN) are stated on every invoice we issue, so you can verify who you are paying before you release funds.'
    ]
  },
  {
    heading: '14. Governing Law and Electronic Acceptance',
    paragraphs: [
      'These terms are governed by the laws of Nepal. Applying through our online forms, receiving these terms in electronic form, and accepting them electronically all have legal effect under the Electronic Transactions Act, 2063 (2008). Disputes are addressed through good-faith discussion first; anything unresolved is settled by arbitration, where arbitration applies.'
    ]
  }
];
