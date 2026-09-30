/**
 * Canonical organization identity, used to build the JSON-LD graph that the
 * edge injects into the served HTML of every route.
 *
 * CRA cannot import files that live outside src/, so the client copy of these
 * facts is src/constants/links.js + src/content/siteFacts.js. scripts/verify-
 * route-seo.mjs compares the two, because a schema property that no visitor
 * can see is a fabricated claim, not metadata.
 *
 * Only properties that match text actually rendered on the site are declared.
 * There is deliberately no postal address, geo coordinate, opening hours,
 * priceRange or paymentAccepted: none of them can be verified, and LocalBusiness
 * NAP data is read as a trust signal by search engines.
 */

const SITE = "https://velora-global.online";

export const ORG_ID = `${SITE}/#organization`;
export const WEB_ID = `${SITE}/#website`;

export const ORG = {
  name: "Velora Global",
  url: SITE,
  logo: `${SITE}/logo.png`,
  image: `${SITE}/og-image.png`,
  description:
    "Technology company in Kathmandu, Nepal building custom web applications, cross-platform mobile apps and AI chatbots, and running project-driven internships and guided training programs.",
  email: "info@velora-global.online",
  telephone: "+977-9826031419",
  founded: "2026",
  sameAs: [
    "https://www.linkedin.com/company/veloraglo-bal/",
    "https://www.instagram.com/veloraglobal_/",
    "https://www.facebook.com/veloraglobal02"
  ]
};

/**
 * People the site publishes. Roles are copied from the /team page; the website
 * maintainer is credited on /about. Nobody here carries a title the site does
 * not show, and no profile URLs are asserted because none could be verified.
 */
export const PEOPLE = [
  { slug: "abhishek-sah", name: "Abhishek Sah", jobTitle: "Founder & CEO", listedOn: "/team" },
  { slug: "krishna-sah", name: "Krishna Sah", jobTitle: "Co-Founder & CTO", listedOn: "/team" },
  { slug: "rohit-sah", name: "Rohit Sah", jobTitle: "Co-Founder & COO", listedOn: "/team" },
  {
    slug: "shivshankar-sah",
    name: "Shivshankar Sah",
    jobTitle: "Contracts & Operations Director",
    listedOn: "/team"
  },
  {
    slug: "aayush-shrestha",
    name: "Aayush Shrestha",
    jobTitle: "Technical Programs Lead",
    listedOn: "/team"
  },
  {
    slug: "sunita-thapa",
    name: "Sunita Thapa",
    jobTitle: "University Relations & Placement Lead",
    listedOn: "/team"
  },
  { slug: "ram-sah", name: "Ram Sah", jobTitle: "Website & Engineering", listedOn: "/about" }
];

export function personId(slug) {
  return `${SITE}/#${slug}`;
}

/** The five criteria the evaluation endpoint stores — mirror of backend/models/Evaluation.js. */
export const GRADING_CRITERIA = [
  "Quality of Work",
  "Technical Skills",
  "Creativity",
  "Completion of Requirements",
  "Professional Approach"
];

/** FAQ answers rendered by the client, mirrored here for the schema layer. */
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
        "Yes. Every certificate we issue carries a unique verification ID such as VG-2026-88491. Anyone, including an employer or a university, can check it against our public verification endpoint at https://velora-global.online/api/certificates/verify/{certificateId}, which returns the recipient, domain, issue date, duration and grade on record."
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
      question: "Who can apply for a technology internship?",
      answer:
        "Frontend, mobile, cybersecurity, UI/UX and software testing tracks are open to all levels. Backend, full stack, data science and cloud DevOps tracks expect intermediate knowledge, and the AI/ML track expects intermediate to advanced experience."
    },
    {
      question: "What do interns actually work on?",
      answer:
        "Interns build deliverables rather than watch lectures: responsive interface components, RESTful endpoints with authentication, deployed full stack or cross-platform applications, trained models behind an inference API, vulnerability audits, or automated test suites, depending on the track."
    },
    {
      question: "Is the completion certificate real?",
      answer:
        "Yes. Each certificate carries a unique verification ID and is checked against our public endpoint at https://velora-global.online/api/certificates/verify/{certificateId}, which returns the recipient, domain, issue date, duration and grade on record."
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

/** Duration tiers shown in the internship details modal and the page header. */
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

/** Track names shown on the internship program cards. */
export const INTERNSHIP_TRACKS = [
  "Frontend Development Internship",
  "Backend Development Internship",
  "Full Stack Development Internship",
  "Mobile App Development Internship",
  "Artificial Intelligence & Machine Learning Internship",
  "Data Science Internship",
  "Cybersecurity Internship",
  "UI/UX Design Internship",
  "Cloud & DevOps Internship",
  "Software Testing Internship",
  "JavaScript & Modern ES6+ Full Stack Internship",
  "Java Core, Spring Boot & Microservices Internship",
  "Python Programming, Scripting & Automation Internship"
];

/** The four engagement steps shown on https://velora-global.online/services. */
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

/** Program titles and fees shown on https://velora-global.online/training. */
export const TRAINING_PROGRAMS = [
  { title: "Frontend Development & Modern React.js Training", fee: "NPR 3,000" },
  { title: "Backend Development & Node.js API Training", fee: "NPR 4,000" },
  { title: "Full Stack Development with AI Integration Training", fee: "NPR 10,000" },
  { title: "AI & Machine Learning Engineering Training", fee: "NPR 12,000" },
  { title: "Deep Learning & Neural Networks Training", fee: "NPR 3,000" },
  { title: "JavaScript & Modern ES6+ Training", fee: "NPR 3,000" },
  { title: "Java Core, Spring Boot & Microservices Training", fee: "NPR 3,000" },
  { title: "Python Programming, Automation & Scripting Training", fee: "NPR 3,000" },
  { title: "MERN Stack Development Training", fee: "NPR 10,000" },
  { title: "PERN Stack Development Training", fee: "NPR 10,000" },
  { title: "UI/UX Product Design & Figma Training", fee: "NPR 3,000" },
  { title: "Software Testing & QA Automation Training", fee: "NPR 3,000" },
  { title: "Mobile App Engineering Training", fee: "NPR 4,000" }
];

function personNodes() {
  return PEOPLE.map((person) => ({
    "@type": "Person",
    "@id": personId(person.slug),
    "name": person.name,
    "jobTitle": person.jobTitle,
    "worksFor": { "@id": ORG_ID }
  }));
}

function organizationNode() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    "name": ORG.name,
    "url": ORG.url,
    "logo": {
      "@type": "ImageObject",
      "@id": `${ORG_ID}-logo`,
      "url": ORG.logo,
      "width": 500,
      "height": 500
    },
    "image": ORG.image,
    "description": ORG.description,
    "email": ORG.email,
    "telephone": ORG.telephone,
    "foundingDate": ORG.founded,
    "sameAs": ORG.sameAs,
    "founder": [{ "@id": personId("abhishek-sah") }],
    "employee": personNodes().map((person) => ({ "@id": person["@id"] }))
  };
}

function webSiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEB_ID,
    "url": SITE,
    "name": ORG.name,
    "inLanguage": "en",
    "publisher": { "@id": ORG_ID }
  };
}

/*
 * WebSite carries no SearchAction: the internship search box filters the list
 * in the browser and never issues a GET request with a query term, so a search
 * target here would describe a URL that does not exist.
 */

function faqNode(canonical, key) {
  const faqs = FAQS[key];
  if (!faqs || !faqs.length) return null;
  return {
    "@type": "FAQPage",
    "@id": `${canonical}#faq`,
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

function webPageNode(seo) {
  const canonical = seo.canonical;
  return {
    "@type": seo.graph === "about" ? "AboutPage" : "WebPage",
    "@id": `${canonical}#webpage`,
    "url": canonical,
    "name": seo.title,
    "description": seo.description,
    "inLanguage": "en",
    "isPartOf": { "@id": WEB_ID },
    "about": { "@id": ORG_ID }
  };
}

function serviceNode(seo) {
  const canonical = seo.canonical;
  return {
    "@type": "Service",
    "@id": `${canonical}#service`,
    "name": "Enterprise Software Development Services",
    "serviceType": [
      "Web Application Development",
      "Mobile Application Development",
      "AI Chatbot Development"
    ],
    "description":
      "Custom web applications, cross-platform mobile applications and AI chatbot systems, delivered through a four-step engagement: discovery meeting, scope blueprint, agile sprints with live demos, then launch with source code transfer and 30 days of post-launch support.",
    "provider": { "@id": ORG_ID },
    "url": canonical,
    "areaServed": "Remote and in-person from Kathmandu, Nepal",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Software Development Services",
      "itemListElement": SERVICES_CATALOG.map((service, index) => ({
        "@type": "Offer",
        "position": index + 1,
        "itemOffered": {
          "@type": "Service",
          "@id": `${canonical}#service-${index + 1}`,
          "name": service.name,
          "serviceType": service.serviceType,
          "description": service.description,
          "provider": { "@id": ORG_ID }
        }
      }))
    }
  };
}

function internshipProgramNode(seo) {
  const canonical = seo.canonical;
  return {
    "@type": "EducationalOccupationalProgram",
    "@id": `${canonical}#program`,
    "name": "Practical Technology Internship",
    "programType": "Internship",
    "description":
      "Project-driven internship in which the intern builds real deliverables with mentor feedback, milestone reviews and grading against five published criteria, followed by a certificate with a unique verification ID.",
    "provider": { "@id": ORG_ID },
    "url": canonical,
    "educationalCredentialAwarded":
      "Velora Global internship completion certificate with a unique verification ID",
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "199",
      "highPrice": "4999",
      "priceCurrency": "NPR",
      "offerCount": String(INTERNSHIP_TIERS.length),
      "description": `Fee depends on the duration chosen: ${INTERNSHIP_TIERS.map(
        (tier) => `${tier.duration} ${tier.fee}`
      ).join(", ")}.`
    },
    "coursePrerequisites":
      "Varies by track: frontend, mobile, cybersecurity, UI/UX and testing accept all levels; backend, full stack, data science and cloud DevOps expect intermediate knowledge; AI/ML expects intermediate to advanced experience.",
    "teaches": INTERNSHIP_TRACKS.map((track) => ({
      "@type": "DefinedTerm",
      "name": track
    }))
  };
}

function trainingCourseNode(seo) {
  const canonical = seo.canonical;
  return {
    "@type": "Course",
    "@id": `${canonical}#course`,
    "name": "Guided Technology Training",
    "description":
      "Hands-on training programs covering frontend, backend, full stack with AI, machine learning, deep learning, JavaScript, Java, Python, MERN, PERN, UI/UX, mobile and software testing.",
    "provider": { "@id": ORG_ID },
    "url": canonical,
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "Remote",
      "offers": {
        "@type": "AggregateOffer",
        "lowPrice": "3000",
        "highPrice": "12000",
        "priceCurrency": "NPR",
        "description":
          "Program fee is printed on each program card, from NPR 3,000 for single-stack programs to NPR 12,000 for AI and machine learning engineering."
      }
    }
  };
}

/**
 * Build the complete @graph for one route. `seo.graph` selects the page-specific
 * main entity, `seo.faq` selects the answers published as FAQPage.
 */
export function buildRouteGraph(seo) {
  if (!seo) return null;
  const canonical = seo.canonical;
  const graph = [organizationNode(), webSiteNode(), webPageNode(seo)];

  if (seo.graph === "service") graph.push(serviceNode(seo));
  if (seo.graph === "program") graph.push(internshipProgramNode(seo));
  if (seo.graph === "course") graph.push(trainingCourseNode(seo));

  if (seo.graph === "team" || seo.graph === "about") {
    graph.push(...personNodes());
  }

  const faq = faqNode(canonical, seo.faq);
  if (faq) graph.push(faq);

  return { "@context": "https://schema.org", "@graph": graph };
}

/** Serialize a graph for safe embedding inside an inline <script> element. */
export function serializeGraph(graph) {
  return JSON.stringify(graph, null, 2).replace(/</g, "\\u003c").replace(/\u2028|\u2029/g, "");
}
