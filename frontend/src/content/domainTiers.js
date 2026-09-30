/**
 * Per-domain track content for the internship details modal.
 *
 * The five durations and their fees come from INTERNSHIP_TIERS in siteFacts.js
 * and the edge entity graph; this file deliberately carries no fee or duration
 * text so the ladder cannot drift from what the page and schema publish.
 * Tiers are indexed by position: 2 weeks, 1 month, 2 months, 3 months, 6 months.
 */

const JAVASCRIPT_TIERS = [
  {
    bestFor: 'Fast-Track JavaScript ES6+ Certificate',
    deliverables: [
      'JavaScript ES6+ syntax and asynchronous code review',
      'One guided DOM manipulation and Fetch API project',
      'JavaScript developer resume formatting and review',
      'Certificate with a unique verification ID'
    ]
  },
  {
    bestFor: 'Node.js & full-stack core track',
    deliverables: [
      'Node.js REST API architecture and Express.js routes',
      'MongoDB Atlas database schemas and middleware',
      'Work on one live JavaScript application',
      'One-to-one resume review and a verifiable certificate'
    ]
  },
  {
    bestFor: 'MERN stack with two projects',
    deliverables: [
      'MERN full-stack MVC architecture (React, Node, Express, MongoDB)',
      'JWT authentication, password hashing and deployment',
      'Work on two or more full-stack JavaScript repositories',
      'Written mentor assessment and a verifiable certificate'
    ]
  },
  {
    bestFor: 'Advanced JavaScript engineering',
    deliverables: [
      'WebSocket real-time sync, service decomposition and performance work',
      'Work on three or more JavaScript applications',
      'Portfolio and resume build-out',
      'Interview practice and referral introduction where relevant roles are open'
    ]
  },
  {
    bestFor: 'Full-stack JavaScript engineering track',
    deliverables: [
      'End-to-end ownership of a JavaScript codebase',
      'Work on five or more production-style client systems',
      'Technical and system design interview preparation',
      'Career guidance and interview practice with the founding team'
    ]
  }
];

const JAVA_TIERS = [
  {
    bestFor: 'Fast-Track Java OOP certificate',
    deliverables: [
      'Java core syntax and OOP architecture review',
      'Java collections framework (List, Map, Set) labs',
      'Java developer resume formatting and review',
      'Certificate with a unique verification ID'
    ]
  },
  {
    bestFor: 'Spring Boot REST API track',
    deliverables: [
      'Spring Boot REST controller and JSON endpoint design',
      'Spring Data JPA and PostgreSQL setup',
      'Work on one live Spring Boot REST API',
      'One-to-one resume review and a verifiable certificate'
    ]
  },
  {
    bestFor: 'Enterprise Java with two repositories',
    deliverables: [
      'Spring Security integration and JWT token authentication',
      'Containerising Spring Boot services and Maven build pipelines',
      'Work on two or more enterprise Java repositories',
      'Written mentor assessment and a verifiable certificate'
    ]
  },
  {
    bestFor: 'Advanced Java microservices',
    deliverables: [
      'Spring Cloud configuration, service discovery and message queues',
      'Work on three or more microservice projects',
      'Portfolio and resume build-out',
      'Interview practice and referral introduction where relevant roles are open'
    ]
  },
  {
    bestFor: 'Enterprise Java engineer track',
    deliverables: [
      'End-to-end ownership of a Java service tier',
      'Work on five or more enterprise Java systems',
      'Technical assessment and system design preparation',
      'Career guidance and interview practice with the founding team'
    ]
  }
];

const PYTHON_TIERS = [
  {
    bestFor: 'Fast-Track Python scripting certificate',
    deliverables: [
      'Python 3 core syntax and data structure labs',
      'Automated web scraping script (BeautifulSoup / Requests)',
      'Python developer resume review',
      'Certificate with a unique verification ID'
    ]
  },
  {
    bestFor: 'FastAPI / Django web API track',
    deliverables: [
      'Asynchronous web API endpoint design with FastAPI or Django',
      'PostgreSQL ORM integration and Pydantic data models',
      'Work on one live Python web API and automation script',
      'One-to-one resume review and a verifiable certificate'
    ]
  },
  {
    bestFor: 'Python backend with two projects',
    deliverables: [
      'Celery background tasks, Redis caching and Docker',
      'Deploying Python backend services to a cloud host',
      'Work on two or more Python automation repositories',
      'Written mentor assessment and a verifiable certificate'
    ]
  },
  {
    bestFor: 'Advanced Python systems',
    deliverables: [
      'Async event loops, pytest automation and API hardening',
      'Work on three or more Python backend pipelines',
      'Portfolio and resume build-out',
      'Interview practice and referral introduction where relevant roles are open'
    ]
  },
  {
    bestFor: 'Python systems and automation track',
    deliverables: [
      'End-to-end ownership of a Python engineering stack',
      'Work on five or more production-style Python systems',
      'Technical and algorithmic assessment preparation',
      'Career guidance and interview practice with the founding team'
    ]
  }
];

const GENERAL_TIERS = [
  {
    bestFor: 'Fast-Track project certificate',
    deliverables: [
      'Introductory mentorship in your chosen domain',
      'One guided practical domain project',
      'Resume review and formatting',
      'Certificate with a unique verification ID'
    ]
  },
  {
    bestFor: 'Core skill building with one project',
    deliverables: [
      'Domain mentorship from the engineering team',
      'Work on one live project',
      'One-to-one professional resume building',
      'Verifiable certificate of completion'
    ]
  },
  {
    bestFor: 'Extended track with two projects',
    deliverables: [
      'Advanced domain guidance',
      'Work on two or more client projects',
      'One-to-one professional resume building',
      'Written mentor assessment and a verifiable certificate'
    ]
  },
  {
    bestFor: 'Advanced industry track',
    deliverables: [
      'Weekly one-to-one code architecture reviews',
      'Work on three or more complex repositories',
      'Portfolio and resume build-out',
      'Interview practice and referral introduction where relevant roles are open'
    ]
  },
  {
    bestFor: 'Full domain engineering track',
    deliverables: [
      'End-to-end ownership of your domain deliverables',
      'Work on five or more client projects',
      'Technical and behavioural interview preparation',
      'Career guidance and interview practice with the founding team'
    ]
  }
];

/** Matches the order of INTERNSHIP_TIERS. */
export function getTierContent(domainTitle = '', domainCategory = '') {
  const text = `${domainTitle} ${domainCategory}`.toLowerCase();
  if (text.includes('javascript')) return JAVASCRIPT_TIERS;
  if (text.includes('java')) return JAVA_TIERS;
  if (text.includes('python')) return PYTHON_TIERS;
  return GENERAL_TIERS;
}
