/**
 * Site facts and answer-first content rendered by the visible pages.
 *
 * functions/_shared/entity.js carries the same facts into the JSON-LD graph the
 * edge injects. CRA cannot import files outside src/, so the two files are kept
 * parallel and scripts/verify-route-seo.mjs fails when they disagree — schema
 * that no visitor can read on the page is a claim, not metadata.
 */

// Extension kept explicit so scripts/verify-route-seo.mjs can import this file in Node.
import { INTERNSHIP_PROGRAMS, TRAINING_PROGRAMS } from './programs.js';

export const ORG_FACTS = {
  name: "Velora Global",
  url: "https://velora-global.online",
  email: "info@velora-global.online",
  telephone: "+977-9826031419",
  founded: "2026",
  city: "Kathmandu",
  country: "Nepal",
  description:
    "Technology company in Kathmandu, Nepal building custom web applications, cross-platform mobile apps and AI chatbots, and running project-driven internships and guided training programs."
};

export const LEADERSHIP = [
  { name: "Abhishek Sah", jobTitle: "Founder & CEO" },
  { name: "Krishna Sah", jobTitle: "Co-Founder & CTO" },
  { name: "Rohit Sah", jobTitle: "Co-Founder & COO" },
  { name: "Shivshankar Sah", jobTitle: "Contracts & Operations Director" },
  { name: "Aayush Shrestha", jobTitle: "Technical Programs Lead" },
  { name: "Sunita Thapa", jobTitle: "University Relations & Placement Lead" }
];

export const SITE_MAINTAINER = { name: "Ram Sah", jobTitle: "Website & Engineering" };

/** The five criteria the evaluation endpoint actually stores (see backend/models/Evaluation.js). */
export const GRADING_CRITERIA = [
  "Quality of Work",
  "Technical Skills",
  "Creativity",
  "Completion of Requirements",
  "Professional Approach"
];

export const INTERNSHIP_TIERS = [
  { duration: "2 Weeks" },
  { duration: "1 Month" },
  { duration: "2 Months" },
  { duration: "3 Months" },
  { duration: "6 Months" }
];

/** The three paid mentorship levels published on https://velora-global.online/internships. */
export const MENTORSHIP_LEVELS = [
  {
    name: "Basic",
    fee: "NPR 500",
    deliverables: "Resume review, introductory career guidance, and group mentorship."
  },
  {
    name: "Standard",
    fee: "NPR 999",
    deliverables: "Resume, LinkedIn, GitHub, and a defined one-to-one mentorship session.",
    popular: true
  },
  {
    name: "Advanced",
    fee: "NPR 1,999",
    deliverables:
      "More extensive one-to-one mentorship, portfolio feedback, mock interview practice, and a personalized career action plan."
  }
];

export const SERVICES_CATALOG = [
  {
    name: "Custom Web Application Development",
    serviceType: "Web Application Development",
    description:
      "Customer portals, booking platforms and business management systems built around your processes, with secure user accounts and easy-to-use dashboards."
  },
  {
    name: "Mobile App Development",
    serviceType: "Mobile Application Development",
    description:
      "Intuitive iOS and Android applications for customer-facing services and internal business tools, focused on usability and consistent performance."
  },
  {
    name: "AI Chatbots & Intelligent Agents",
    serviceType: "AI Chatbot Development",
    description:
      "Digital assistants that answer customer questions around the clock from your own documents, capture website enquiries, and take over repetitive internal tasks."
  },
  {
    name: "SEO & Digital Growth",
    serviceType: "SEO & Digital Marketing",
    description:
      "Search visibility work that starts with a written audit: page content and structure, keyword and competitor research, local search and Google Business Profile setup, page speed, and a closing report."
  },
  {
    name: "Digital Marketing",
    serviceType: "Digital Marketing",
    description:
      "Search, social and paid campaigns run together: social media management, Google Ads and Meta Ads, branding and content, lead generation, and conversion work on the pages your traffic lands on."
  },
  {
    name: "Website Maintenance & Support",
    serviceType: "Website Maintenance & Support",
    description:
      "Content and feature updates, bug fixing, security and uptime monitoring, backups, and hosting or migration support for systems already in production."
  }
];

/** Fee bands published on /services, keyed by the matching SERVICES_CATALOG name. */
export const SERVICE_PACKAGES = {
  "Custom Web Application Development": {
    label: "Project scope",
    feeLabel: "Indicative project fee",
    rows: [
      {
        name: "Business dashboards, customer portals, booking platforms, and management systems",
        fee: "NPR 50,000–300,000+"
      }
    ],
    note: "Larger enterprise platforms: custom quotation."
  },
  "Mobile App Development": {
    label: "Project scope",
    feeLabel: "Indicative project fee",
    rows: [
      {
        name: "Customer apps, ordering, bookings, profiles, and mobile business tools",
        fee: "NPR 80,000–500,000+"
      }
    ],
    note: "Complex apps and separate native iOS/Android builds: custom quotation."
  },
  "AI Chatbots & Intelligent Agents": {
    label: "Project scope",
    feeLabel: "Indicative project fee",
    rows: [
      {
        name: "Website chatbots, document-based answers, lead capture, and business automation",
        fee: "NPR 25,000–150,000+"
      }
    ],
    note: "AI usage, third-party integrations, and ongoing hosting may cost extra."
  },
  "SEO & Digital Growth": {
    label: "Search & Growth",
    feeLabel: "Indicative fee",
    rows: [{ fee: "NPR 10,000–15,000" }]
  },
  "Website Maintenance & Support": {
    label: "Ongoing support",
    feeLabel: "Indicative fee",
    rows: [{ fee: "NPR 10,000–15,000" }]
  },
  "Digital Marketing": {
    label: "Monthly packages",
    feeLabel: "Illustrative monthly fee",
    rows: [
      { name: "Social media management", fee: "NPR 8,000–15,000" },
      { name: "SEO services", fee: "NPR 10,000–20,000" },
      { name: "Social media + creative content", fee: "NPR 12,000–25,000" },
      { name: "Digital advertising management", fee: "NPR 8,000–20,000" },
      { name: "Website + digital marketing", fee: "NPR 25,000–60,000+" }
    ],
    note: "The final scope and monthly amount are agreed in writing before work begins."
  }
};

export const ENGAGEMENT_STEPS = [
  {
    name: "1-on-1 Discovery Meeting",
    text:
      "We meet in person at our Balkumari office or over Google Meet / Zoom to understand your business model, target audience and feature goals."
  },
  {
    name: "Tailored Scope Blueprint",
    text:
      "Our leadership team drafts the technical architecture, UI wireframe roadmap, budget milestones and delivery schedule."
  },
  {
    name: "Agile Sprints & Live Demos",
    text:
      "You get live staging previews and sprint updates with our engineering team, so your feedback shapes the product iteratively."
  },
  {
    name: "Launch, Training & Warranty",
    text:
      "We deploy your system to cloud servers, transfer full source code ownership, train your internal staff and provide 30 days of dedicated post-launch support."
  }
];

export const FAQS = {
  home: [
    {
      question: "What does Velora Global do?",
      answer:
        "Velora Global is a technology company based in Kathmandu, Nepal. It builds custom web applications, cross-platform iOS and Android mobile apps and AI chatbot systems for business clients, and runs project-driven internships and guided training programs for students and working professionals."
    },
    {
      question: "Are Velora Global internship certificates verifiable?",
      answer:
        "Yes. Every certificate we issue carries a unique verification ID such as VG-2026-88491. Anyone, including an employer or a university, can check it on our public verification page at https://velora-global.online/verify/{certificateId} — the QR code printed on the certificate opens that page — which shows the recipient, program, issue date and duration on record."
    },
    {
      question: "Who evaluates student project submissions?",
      answer:
        "Project deliverables and code repositories are reviewed by our founding team: Abhishek Sah (Founder & CEO), Krishna Sah (Co-Founder & CTO) and Rohit Sah (Co-Founder & COO). Each submission is scored against five published criteria and returned with written remarks."
    },
    {
      question: "What is the difference between the Internship and Training programs?",
      answer:
        "The Internship program is project-driven and task-oriented: you work on deliverables with mentor feedback and milestone reviews. The Guided Training program is lecture-led, with step-by-step development, full codebase walkthroughs and an option to continue into an internship track."
    },
    {
      question: "What are the 5 criteria used for project grading?",
      answer:
        `Evaluations assess ${GRADING_CRITERIA.join(', ')}. Candidates receive written feedback along with their final certificate record.`
    },
    {
      question: "Can I participate in the internship remotely?",
      answer:
        "Yes. Every internship and training track supports remote participation, with schedules designed for university students and working professionals."
    }
  ],
  services: [
    {
      question: "How does Velora Global price a custom software project?",
      answer:
        "Each service line on this page publishes an indicative NPR fee band for its usual scope. Anything beyond that — a larger enterprise platform, a complex native app, heavy AI usage — is quoted after a scoping meeting, when we put the plan in writing: system design, screen-by-screen wireframes, budget milestones and a delivery schedule, before any work begins."
    },
    {
      question: "What do software and marketing services cost in Nepal?",
      answer:
        "Every service line on this page publishes an indicative NPR band: custom web applications NPR 50,000–300,000+, mobile apps NPR 80,000–500,000+, AI chatbots and agents NPR 25,000–150,000+, SEO and website maintenance NPR 10,000–15,000 each, and digital marketing packages from NPR 8,000 a month. Work outside that usual scope is quoted after a scoping meeting, and ad spend is billed separately by Google or Meta."
    },
    {
      question: "Do we keep ownership of the source code?",
      answer:
        "Yes. At launch we deploy your system to your cloud servers, transfer full source code ownership, train your internal staff, and provide 30 days of dedicated post-launch support."
    },
    {
      question: "Can we meet the team in person?",
      answer:
        "Yes. Discovery meetings are held at our office in Balkumari, Kathmandu, or remotely over Google Meet or Zoom, with Founder Abhishek Sah and the delivery team."
    },
    {
      question: "Do we need to choose the technology or platforms?",
      answer:
        "No. You decide the outcomes — what the system must do, who will use it, and what it can cost — and we recommend how to build it, explaining the trade-offs in business terms: upfront cost, how easily the system can grow later, and how well it runs on the devices your customers already use."
    },
    {
      question: "Do you run marketing as well as building the site?",
      answer:
        "Yes. The Digital Marketing line covers social media management, SEO and Google Business Profile work, Google Ads and Meta Ads, branding and content, lead generation, and conversion optimization on the pages your traffic lands on. The monthly packages published on this page are indicative and the exact scope is agreed in writing before work begins. Ad budget is spent from your own Google or Meta account and billed by them, separately from our service fee; no ranking or sales result is guaranteed."
    }
  ],
  internships: [
    {
      question: "How long does a Velora Global internship run?",
      answer:
        "You choose the length: 2 weeks, 1 month, 2 months, 3 months or 6 months. Every track runs remotely with 1-to-1 mentorship."
    },
    {
      question: "What does Velora Global mentorship cost?",
      answer:
        "Three one-time fee levels: Basic NPR 500 (resume review, introductory career guidance and group mentorship), Standard NPR 999 (resume, LinkedIn, GitHub and a defined one-to-one mentorship session), and Advanced NPR 1,999 (more extensive one-to-one mentorship, portfolio feedback, mock interview practice and a personalized career action plan). Enrolment is confirmed once the fee is received; the amount and payment instructions are sent after you apply."
    },
    {
      question: "What is the internship fee for?",
      answer:
        "It covers the mentorship and assessment side of the program: 1-to-1 code reviews, milestone grading against the five published criteria, workspace access, evaluation time and infrastructure, and the certificate record issued once your deliverable passes review. It is not payment for a job, and no fee guarantees placement."
    },
    {
      question: "Who can apply for a technology internship?",
      answer:
        "Frontend, mobile, cybersecurity, UI/UX and software testing tracks are open to all levels. Backend, full stack, data science and cloud DevOps tracks expect intermediate knowledge, and the AI/ML track expects intermediate to advanced experience."
    },
    {
      question: "What do interns actually work on?",
      answer:
        "Interns are assigned to a real-world client project brief in their track and build deliverables rather than watch lectures: responsive interface components, RESTful endpoints with authentication, deployed full stack or cross-platform applications, trained models behind an inference API, vulnerability audits, or automated test suites, depending on the project."
    },
    {
      question: "Is the completion certificate real?",
      answer:
        "Yes. Each certificate carries a unique verification ID and opens a public verification page at https://velora-global.online/verify/{certificateId} showing the recipient, program, issue date and duration on record."
    }
  ],
  training: [
    {
      question: "What do Velora Global training programs cost?",
      answer:
        "Program fees are printed on each program card and range from NPR 1,999 for the AI tools program up to NPR 11,999 for AI and machine learning engineering, with most single-stack programs such as JavaScript, Python, Java, frontend, deep learning, UI/UX and testing at NPR 2,999."
    },
    {
      question: "Which subjects can I be trained in?",
      answer:
        "Frontend with React, backend with Node.js, full stack with AI integration, artificial intelligence and machine learning, deep learning, AI tools and prompt engineering, JavaScript, Java with Spring Boot, Python, MERN, PERN, UI/UX design in Figma, mobile app engineering and software testing."
    },
    {
      question: "How do I join a training program?",
      answer:
        "Open the program card, review the technologies it covers, then select Apply. Applications are collected through one Google Form and our team follows up with the next steps from there."
    }
  ],
  about: [
    {
      question: "What kind of organization is Velora Global?",
      answer:
        "Velora Global is a Kathmandu-based technology company with two sides: a software team that builds web, mobile and AI systems for business clients, and a training arm that runs project-driven internships and guided programs for students and working professionals."
    },
    {
      question: "Who runs Velora Global?",
      answer:
        "Abhishek Sah is the Founder and CEO. Krishna Sah is Co-Founder and CTO, Rohit Sah is Co-Founder and COO, and Shivshankar Sah leads contracts and operations. Program delivery is coordinated by the Technical Programs Lead and the University Relations Lead."
    },
    {
      question: "How do I contact Velora Global?",
      answer:
        "Email info@velora-global.online for general enquiries, call or message the number published in the site footer, or submit the project enquiry form on the services page. We work remotely and can also meet in person in Kathmandu."
    }
  ]
};

/**
 * Answer-first blocks: a direct 40-80 word answer under a question-formatted
 * heading, then the supporting detail an answer engine can quote on its own.
 */
export const ANSWER_BLOCKS = {
  services: {
    heading: "What software does Velora Global build for clients?",
    answer:
      "Velora Global builds and maintains digital systems for businesses in six areas: custom web platforms such as customer portals and booking systems, iOS and Android mobile applications, digital assistants that answer customer questions from your own documents, search visibility, digital marketing across social and paid channels, and ongoing maintenance after launch. Work moves through four published steps — discovery meeting, written scope blueprint, demos of the working product, then launch with full code ownership and 30 days of post-launch support.",
    specs: [
      {
        label: "Who is this for",
        text:
          "Teams that need an internal system, a customer-facing product or an automated support agent built to specification, and that want to deal directly with the people building it."
      },
      {
        label: "What is included",
        text:
          "A written plan covering system design, wireframes and budget milestones; development of the agreed features; deployment to your servers; full ownership of the code; staff training; and 30 days of post-launch support."
      },
      {
        label: "How it works",
        text:
          "A discovery meeting first, then a written scope blueprint with budget milestones, then scheduled demos of the working product so your feedback shapes the next round, then launch and handover."
      },
      {
        label: "Timeline",
        text:
          "Set in the scope blueprint for each project. This page publishes no standard timeline because every build is scoped individually."
      },
      {
        label: "Pricing",
        text:
          "Indicative NPR fee bands are published for every service line on this page. Work outside the usual scope is quoted after the discovery meeting; internship and training figures are published separately."
      }
    ]
  },
  internships: {
    heading: "What is a Velora Global internship?",
    answer:
      "An internship here is project work, not a lecture series. You join one track — frontend, backend, full stack, mobile, AI and machine learning, data science, cybersecurity, UI/UX, cloud DevOps, testing, JavaScript, Java or Python — and build a real-world client deliverable while a mentor reviews your code. You choose the length when you apply, from two weeks to six months, and finish with graded remarks and a certificate that carries a unique verification ID.",
    specs: [
      {
        label: "Who is this for",
        text:
          "University students and working professionals. Frontend, mobile, cybersecurity, UI/UX and testing accept all levels; backend, full stack, data science and cloud DevOps expect intermediate knowledge; AI/ML expects intermediate to advanced experience."
      },
      {
        label: "What is included",
        text:
          "A defined deliverable for your track, 1-to-1 code architecture reviews, milestone feedback, grading against five published criteria, written remarks, and a completion certificate with a verification ID."
      },
      {
        label: "How it works",
        text:
          "Select a track, apply through the application form, build the deliverables with mentor reviews, submit for milestone grading, then receive the certificate record."
      },
      {
        label: "Duration",
        text:
          "You pick the tier: 2 weeks, 1 month, 2 months, 3 months or 6 months. The mentorship fee is a one-time charge set by the level, not by the duration."
      },
      {
        label: "Requirements",
        text:
          "The technology pills on each program card are the starting point for that track. Participation is remote, so no commute or fixed office hours are required."
      }
    ],
    steps: [
      "Choose a domain track and open its details.",
      "Submit the internship application form with your preferred duration.",
      "Build the assigned deliverables, reviewed 1-to-1 with a mentor.",
      "Submit for milestone grading against the five published criteria.",
      "Receive written remarks and a certificate with a unique verification ID."
    ]
  },
  training: {
    heading: "What is guided training at Velora Global?",
    answer:
      "Guided training is instructor-led rather than project-assigned: live lectures, step-by-step development, and a walkthrough of the complete codebase for the stack you choose, from frontend and backend engineering through AI and machine learning, deep learning, AI tools, Python, Java, MERN, PERN, UI/UX, mobile and software testing. The fee is printed on each program card and runs from NPR 1,999 to NPR 11,999.",
    specs: [
      {
        label: "Who is this for",
        text:
          "Beginners and self-taught developers who want a structured, instructor-led path before taking on the project workload of an internship."
      },
      {
        label: "What is included",
        text:
          "Structured live lectures, hands-on step-by-step builds, and a full codebase walkthrough for the selected program."
      },
      {
        label: "How it works",
        text:
          "Pick a program, apply through the training application form, then join the sessions for that stack. Graduates can continue into an internship track."
      },
      {
        label: "Requirements",
        text:
          "Each program lists the technologies it covers. That list is the starting point, not an entrance test."
      },
      {
        label: "Fee",
        text:
          "NPR 1,999 for AI tools and prompt engineering, NPR 2,999 for single-stack programs, NPR 3,999 for backend and mobile engineering, NPR 9,999 for full stack with AI, MERN and PERN, and NPR 11,999 for AI and machine learning engineering."
      }
    ],
    table: {
      caption: "Training programs and published fees",
      columns: ["Program", "Fee"],
      rows: TRAINING_PROGRAMS.map((program) => [program.title, program.fee])
    }
  },
  about: {
    heading: "What kind of company is Velora Global?",
    answer:
      "Velora Global is a technology company based in Kathmandu, Nepal, with two sides that share the same engineers. One side builds software for clients: web applications, cross-platform mobile apps and AI chatbot systems. The other side runs talent programs: project-driven internships and instructor-led training for students and working professionals, delivered remotely.",
    specs: [
      {
        label: "What we build",
        text:
          "Custom web applications on the MERN stack, cross-platform iOS and Android apps, and AI chatbots and automation built with Python, LangChain and the OpenAI and Gemini APIs."
      },
      {
        label: "What we teach",
        text:
          `${INTERNSHIP_PROGRAMS.length} internship tracks and ${TRAINING_PROGRAMS.length} training programs covering frontend, backend, full stack, mobile, AI and machine learning, data science, cybersecurity, UI/UX, cloud DevOps and software testing.`
      },
      {
        label: "How we work",
        text:
          "Client work follows a four-step engagement — discovery meeting, scope blueprint, agile sprints with live demos, then launch with source code transfer and 30 days of support. Student work is graded against five published criteria and ends in a verifiable certificate."
      },
      {
        label: "Where we operate",
        text:
          "From Kathmandu, Nepal. Client discovery meetings can be held in person at the Balkumari office or over Google Meet or Zoom, and every program runs remotely."
      }
    ]
  }
};
