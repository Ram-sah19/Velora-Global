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
  { duration: "2 Weeks", fee: "NPR 199" },
  { duration: "1 Month", fee: "NPR 499" },
  { duration: "2 Months", fee: "NPR 999" },
  { duration: "3 Months", fee: "NPR 1,999" },
  { duration: "6 Months", fee: "NPR 4,999" }
];

export const SERVICES_CATALOG = [
  {
    name: "Web Application Development",
    serviceType: "Web Application Development",
    description:
      "Custom SaaS products, enterprise web portals and full stack systems built on the MERN stack with REST and GraphQL APIs."
  },
  {
    name: "Mobile Application Development",
    serviceType: "Mobile Application Development",
    description:
      "Cross-platform iOS and Android applications built on a single React Native or Flutter codebase, published to the App Store and Google Play."
  },
  {
    name: "AI Chatbots & Intelligent Agents",
    serviceType: "AI Chatbot Development",
    description:
      "Conversational support agents and workflow automation built with Python, LangChain and the OpenAI and Gemini APIs."
  }
];

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
        "Yes. Every certificate we issue carries a unique verification ID such as VG-2026-88491. Anyone, including an employer or a university, can check it against our public verification endpoint at https://velora-global.online/api/certificates/verify/{certificateId}, which returns the recipient, program, issue date and duration on record."
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
        "Each project is quoted after a scoping meeting rather than from a fixed price list. Once we understand your business model and feature goals, our leadership team drafts the technical architecture, a UI wireframe roadmap, budget milestones and a delivery schedule before any code is written."
    },
    {
      question: "Do we keep ownership of the source code?",
      answer:
        "Yes. At launch we deploy your system to your cloud servers, transfer full source code ownership, train your internal staff, and provide 30 days of dedicated post-launch support."
    },
    {
      question: "Can we meet the team in person?",
      answer:
        "Yes. Discovery meetings are held at our office in Balkumari, Kathmandu, or remotely over Google Meet or Zoom, with Founder Abhishek Sah and the technical team."
    },
    {
      question: "Which technologies does Velora Global build with?",
      answer:
        "Web applications use the MERN stack (MongoDB, Express, React, Node.js) with REST and GraphQL APIs. Mobile apps use React Native or Flutter on a single codebase. AI work uses Python with LangChain and the OpenAI and Gemini APIs."
    }
  ],
  internships: [
    {
      question: "What does a Velora Global internship cost and how long does it run?",
      answer:
        "You choose the duration and the fee follows it: 2 weeks for NPR 199, 1 month for NPR 499, 2 months for NPR 999, 3 months for NPR 1,999, or 6 months for NPR 4,999. Every track runs remotely with 1-to-1 mentorship."
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
        "Yes. Each certificate carries a unique verification ID and is checked against our public endpoint at https://velora-global.online/api/certificates/verify/{certificateId}, which returns the recipient, program, issue date and duration on record."
    }
  ],
  training: [
    {
      question: "What do Velora Global training programs cost?",
      answer:
        "Program fees are printed on each program card and range from NPR 3,000 for single-stack programs such as JavaScript, Python, Java, frontend, deep learning, UI/UX and testing, up to NPR 12,000 for AI and machine learning engineering."
    },
    {
      question: "Which subjects can I be trained in?",
      answer:
        "Frontend with React, backend with Node.js, full stack with AI integration, artificial intelligence and machine learning, deep learning, JavaScript, Java with Spring Boot, Python, MERN, PERN, UI/UX design in Figma, mobile app engineering and software testing."
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
      "Velora Global builds custom software in three areas: web applications on the MERN stack, cross-platform iOS and Android apps on one React Native or Flutter codebase, and AI chatbots wired to the OpenAI and Gemini APIs. Work moves through four published steps — discovery meeting, written scope blueprint, agile sprints with live demos, then launch with full source code transfer and 30 days of post-launch support.",
    specs: [
      {
        label: "Who is this for",
        text:
          "Teams that need an internal system, a customer-facing product or an automated support agent built to specification, and that want to deal directly with the people writing the code."
      },
      {
        label: "What is included",
        text:
          "Technical architecture and wireframe roadmap, development of the agreed deliverables, deployment to your cloud servers, full source code transfer, staff training, and 30 days of post-launch support."
      },
      {
        label: "How it works",
        text:
          "A discovery meeting first, then a written scope blueprint with budget milestones, then sprint reviews against a live staging preview, then launch and handover."
      },
      {
        label: "Timeline",
        text:
          "Set in the scope blueprint for each project. This page publishes no standard timeline because every build is scoped individually."
      },
      {
        label: "Pricing",
        text:
          "Quoted after the discovery meeting; there is no fixed rate card for client work. The published NPR figures on this site apply to internship and training programs only."
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
          "You pick the tier: 2 weeks, 1 month, 2 months, 3 months or 6 months. The fee follows the duration you choose."
      },
      {
        label: "Requirements",
        text:
          "The technology pills on each program card are the starting point for that track. Participation is remote, so no commute or fixed office hours are required."
      },
      {
        label: "Fee",
        text:
          "NPR 199 for 2 weeks, NPR 499 for 1 month, NPR 999 for 2 months, NPR 1,999 for 3 months, NPR 4,999 for 6 months."
      }
    ],
    steps: [
      "Choose a domain track and open its details.",
      "Submit the internship application form with your preferred duration.",
      "Build the assigned deliverables, reviewed 1-to-1 with a mentor.",
      "Submit for milestone grading against the five published criteria.",
      "Receive written remarks and a certificate with a unique verification ID."
    ],
    table: {
      caption: "Internship duration and fee",
      columns: ["Duration", "Fee"],
      rows: INTERNSHIP_TIERS.map((tier) => [tier.duration, tier.fee])
    }
  },
  training: {
    heading: "What is guided training at Velora Global?",
    answer:
      "Guided training is instructor-led rather than project-assigned: live lectures, step-by-step development, and a walkthrough of the complete codebase for the stack you choose, from frontend and backend engineering through AI and machine learning, deep learning, Python, Java, MERN, PERN, UI/UX, mobile and software testing. The fee is printed on each program card and runs from NPR 3,000 to NPR 12,000.",
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
          "NPR 3,000 for single-stack programs, NPR 4,000 for backend and mobile engineering, NPR 10,000 for full stack with AI, MERN and PERN, and NPR 12,000 for AI and machine learning engineering."
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

export const VERIFICATION_ENDPOINT =
  "https://velora-global.online/api/certificates/verify/{certificateId}";
