/**
 * Program catalogue data for the internships and training pages.
 *
 * Extracted from the page components so the list is defined once. Interns pick
 * their duration from INTERNSHIP_TIERS in siteFacts.js when they apply, so the
 * internship entries below state no fixed duration; each training entry carries
 * the fee printed on its card. scripts/verify-route-seo.mjs checks that the
 * pages, the answer blocks and the edge JSON-LD graph agree with these lists.
 */

export const INTERNSHIP_PROGRAMS = [
  {
    id: "prog-fe-1",
    title: "Frontend Development Internship",
    domain: "Frontend Development",
    locationType: "Remote",
    level: "All Levels",
    description:
      "Build high-performance, responsive web interfaces using modern React, HTML5, CSS3, and JavaScript ES6+.",
    skillsRequired: ["React.js", "JavaScript ES6+", "HTML5 & CSS3", "TailwindCSS", "Git"],
    perks: ["Official Velora Global Certificate", "Mentorship from Co-Founders"],
    deliverables: ["Develop interactive responsive UI components", "Optimize lighthouse performance"],
    status: "Active"
  },
  {
    id: "prog-be-1",
    title: "Backend Development Internship",
    domain: "Backend Development",
    locationType: "Remote",
    level: "Intermediate",
    description:
      "Design RESTful APIs, manage databases, write serverless functions, and implement secure authentication with Node.js and Express.",
    skillsRequired: ["Node.js", "Express.js", "MongoDB", "REST APIs", "JWT"],
    perks: ["Verified Certificate", "Backend Architecture Mentorship"],
    deliverables: ["Build robust RESTful endpoints", "Implement database CRUD & authentication"],
    status: "Active"
  },
  {
    id: "prog-fs-1",
    title: "Full Stack Development Internship",
    domain: "Full Stack Development",
    locationType: "Remote / Hybrid",
    level: "Intermediate",
    description:
      "End-to-end web application development combining React client frontend with Node.js Express server and MongoDB database.",
    skillsRequired: ["React.js", "Node.js", "Express.js", "MongoDB", "MVC Architecture"],
    perks: ["Official Velora Global Certificate", "Executive Feedback"],
    deliverables: ["Build end-to-end full stack application", "Deploy production web bundle"],
    status: "Active"
  },
  {
    id: "prog-mobile-1",
    title: "Mobile App Development Internship",
    domain: "Mobile App Development",
    locationType: "Remote",
    level: "All Levels",
    description:
      "Create cross-platform mobile apps for iOS and Android using React Native / Flutter with seamless API integration.",
    skillsRequired: ["React Native", "Flutter", "Mobile UI", "REST APIs"],
    perks: ["Certificate of Excellence", "App Store Publishing Experience"],
    deliverables: ["Develop cross-platform mobile app UI", "Integrate push notifications and storage"],
    status: "Active"
  },
  {
    id: "prog-aiml-1",
    title: "Artificial Intelligence & Machine Learning Internship",
    domain: "Artificial Intelligence & Machine Learning",
    locationType: "Remote",
    level: "Intermediate / Advanced",
    description:
      "Train machine learning models, implement natural language processing algorithms, and deploy AI solutions.",
    skillsRequired: ["Python", "TensorFlow / PyTorch", "Scikit-Learn", "Model Deployment"],
    perks: ["Verified Velora Global Certificate", "AI Research Mentorship"],
    deliverables: ["Train predictive ML classification model", "Deploy AI model inference API"],
    status: "Active"
  },
  {
    id: "prog-ds-1",
    title: "Data Science Internship",
    domain: "Data Science",
    locationType: "Remote",
    level: "Intermediate",
    description:
      "Perform data wrangling, exploratory analysis, statistical modeling, and interactive data visualization.",
    skillsRequired: ["Python", "Pandas & NumPy", "SQL", "Data Visualization", "PowerBI"],
    perks: ["Verified Certificate", "Real-World Datasets"],
    deliverables: ["Perform exploratory dataset analysis", "Create executive data visualization report"],
    status: "Active"
  },
  {
    id: "prog-cyber-1",
    title: "Cybersecurity Internship",
    domain: "Cybersecurity",
    locationType: "Remote",
    level: "All Levels",
    description:
      "Understand network security fundamentals, penetration testing, vulnerability assessment, and security auditing.",
    skillsRequired: ["Network Security", "Ethical Hacking Basics", "Vulnerability Scanning", "Linux"],
    perks: ["Official Certificate", "Security Audit Experience"],
    deliverables: ["Conduct web vulnerability audit", "Formulate security patch documentation"],
    status: "Active"
  },
  {
    id: "prog-uiux-1",
    title: "UI/UX Design Internship",
    domain: "UI/UX Design",
    locationType: "Remote",
    level: "All Levels",
    description:
      "Master user research, wireframing, high-fidelity Figma UI design systems, and interactive prototyping.",
    skillsRequired: ["Figma", "User Research", "Wireframing", "Design Systems", "Prototyping"],
    perks: ["Certificate of Excellence", "Design Review Sessions"],
    deliverables: ["Create multi-device design system", "Deliver interactive Figma prototype"],
    status: "Active"
  },
  {
    id: "prog-cloud-1",
    title: "Cloud & DevOps Internship",
    domain: "Cloud & DevOps",
    locationType: "Remote",
    level: "Intermediate",
    description:
      "Implement CI/CD automation pipelines, containerize applications with Docker, and manage cloud infrastructure.",
    skillsRequired: ["Docker", "Kubernetes Basics", "AWS / GCP", "CI/CD Pipelines", "Linux"],
    perks: ["Verified Certificate", "Cloud Architecture Mentorship"],
    deliverables: ["Automate Docker container build", "Deploy CI/CD deployment pipeline"],
    status: "Active"
  },
  {
    id: "prog-qa-1",
    title: "Software Testing Internship",
    domain: "Software Testing",
    locationType: "Remote",
    level: "All Levels",
    description:
      "Learn manual and automated software testing, unit testing frameworks, end-to-end integration tests, and QA bug reporting.",
    skillsRequired: ["Jest", "Cypress / Selenium", "Manual Testing", "Bug Tracking", "QA Test Plans"],
    perks: ["Official Certificate", "QA Lead Mentorship"],
    deliverables: ["Write comprehensive QA test suite", "Conduct automated E2E integration test"],
    status: "Active"
  },
  {
    id: "prog-js-internship",
    title: "JavaScript & Modern ES6+ Full Stack Internship",
    domain: "JavaScript",
    locationType: "Remote",
    description:
      "Build high-performance, asynchronous web applications using JavaScript ES6+, Node.js runtime, REST APIs, and modern frontend frameworks.",
    skillsRequired: ["JavaScript ES6+", "Node.js", "Async/Await", "DOM Manipulation", "Express.js"]
  },
  {
    id: "prog-java-internship",
    title: "Java Core, Spring Boot & Microservices Internship",
    domain: "Java",
    locationType: "Remote",
    description:
      "Design enterprise REST APIs, database entity relationships, and microservice architecture using Java Core and Spring Boot.",
    skillsRequired: ["Java Core", "Spring Boot", "OOP Concepts", "Hibernate / JPA", "REST Microservices"]
  },
  {
    id: "prog-py-internship",
    title: "Python Programming, Scripting & Automation Internship",
    domain: "Python",
    locationType: "Remote",
    description:
      "Develop automated data processing pipelines, web scrapers, object-oriented software scripts, and backend REST APIs with Python.",
    skillsRequired: ["Python 3", "OOP", "Django / FastAPI", "Web Scraping", "Data Structures"]
  }
];

export const TRAINING_PROGRAMS = [
  {
    id: "prog-fe-training",
    title: "Frontend Development & Modern React.js Training",
    domain: "Frontend Development",
    fee: "NPR 3,000",
    feeAmount: 3000,
    locationType: "Remote",
    description:
      "Build high-performance, responsive web interfaces using modern React, HTML5, CSS3, JavaScript ES6+, and state management.",
    skillsRequired: ["React.js", "JavaScript ES6+", "HTML5 & CSS3", "TailwindCSS", "Git"]
  },
  {
    id: "prog-be-training",
    title: "Backend Development & Node.js API Training",
    domain: "Backend Development",
    fee: "NPR 4,000",
    feeAmount: 4000,
    locationType: "Remote",
    description:
      "Design RESTful APIs, manage MongoDB databases, write serverless functions, and implement secure authentication with Node.js and Express.",
    skillsRequired: ["Node.js", "Express.js", "MongoDB", "REST APIs", "JWT Auth"]
  },
  {
    id: "prog-fs-ai-training",
    title: "Full Stack Development with AI Integration Training",
    domain: "Full Stack with AI",
    fee: "NPR 10,000",
    feeAmount: 10000,
    locationType: "Remote",
    description:
      "End-to-end full stack web engineering (React + Node.js + MongoDB) integrated with LLMs, OpenAI/Gemini APIs, and intelligent AI agents.",
    skillsRequired: ["React.js", "Node.js", "Express.js", "MongoDB", "AI/LLM APIs", "LangChain"]
  },
  {
    id: "prog-aiml-training",
    title: "AI & Machine Learning Engineering Training",
    domain: "Artificial Intelligence & Machine Learning",
    fee: "NPR 12,000",
    feeAmount: 12000,
    locationType: "Remote",
    description:
      "Train machine learning models, implement computer vision and NLP algorithms, and deploy production-ready AI models with Python.",
    skillsRequired: ["Python", "TensorFlow / PyTorch", "Scikit-Learn", "Computer Vision", "Model Deployment"]
  },
  {
    id: "prog-dl-training",
    title: "Deep Learning & Neural Networks Training",
    domain: "Deep Learning",
    fee: "NPR 3,000",
    feeAmount: 3000,
    locationType: "Remote",
    description:
      "Master Artificial Neural Networks (ANN), Convolutional Neural Networks (CNN), Recurrent Neural Networks (RNN), and PyTorch frameworks.",
    skillsRequired: ["PyTorch", "Neural Networks", "CNN / RNN", "Python", "GPU Acceleration"]
  },
  {
    id: "prog-js-training",
    title: "JavaScript & Modern ES6+ Training",
    domain: "JavaScript",
    fee: "NPR 3,000",
    feeAmount: 3000,
    locationType: "Remote",
    description:
      "Master JavaScript fundamentals, asynchronous ES6+, DOM manipulation, Node.js runtime, and modern full stack web development.",
    skillsRequired: ["JavaScript ES6+", "Node.js", "Async/Await", "DOM Manipulation", "Express.js"]
  },
  {
    id: "prog-java-training",
    title: "Java Core, Spring Boot & Microservices Training",
    domain: "Java",
    fee: "NPR 3,000",
    feeAmount: 3000,
    locationType: "Remote",
    description:
      "Master Object-Oriented Programming (OOP), Data Structures, Java Core, Spring Boot REST APIs, and enterprise microservices.",
    skillsRequired: ["Java Core", "Spring Boot", "OOP Concepts", "Hibernate / JPA", "REST Microservices"]
  },
  {
    id: "prog-py-training",
    title: "Python Programming, Automation & Scripting Training",
    domain: "Python",
    fee: "NPR 3,000",
    feeAmount: 3000,
    locationType: "Remote",
    description:
      "Master Python syntax, object-oriented design, automated web scraping, data structures, and backend API development.",
    skillsRequired: ["Python 3", "OOP", "Django / FastAPI", "Web Scraping", "Data Structures"]
  },
  {
    id: "prog-mern-training",
    title: "MERN Stack Development Training",
    domain: "MERN Stack",
    fee: "NPR 10,000",
    feeAmount: 10000,
    locationType: "Remote",
    description:
      "Complete hands-on mastery of MongoDB, Express.js, React.js, and Node.js to build scalable, full-stack web applications.",
    skillsRequired: ["MongoDB", "Express.js", "React.js", "Node.js", "Redux", "JWT Auth"]
  },
  {
    id: "prog-pern-training",
    title: "PERN Stack Development Training",
    domain: "PERN Stack",
    fee: "NPR 10,000",
    feeAmount: 10000,
    locationType: "Remote",
    description:
      "Master PostgreSQL relational databases, Express.js, React.js, and Node.js for high-performance enterprise web systems.",
    skillsRequired: ["PostgreSQL", "Express.js", "React.js", "Node.js", "SQL / Sequelize", "REST APIs"]
  },
  {
    id: "prog-uiux-training",
    title: "UI/UX Product Design & Figma Training",
    domain: "UI/UX Design",
    fee: "NPR 3,000",
    feeAmount: 3000,
    locationType: "Remote",
    description:
      "Master user research, wireframing, high-fidelity Figma UI design systems, and interactive prototyping.",
    skillsRequired: ["Figma", "User Research", "Wireframing", "Design Systems", "Prototyping"]
  },
  {
    id: "prog-qa-training",
    title: "Software Testing & QA Automation Training",
    domain: "Software Testing",
    fee: "NPR 3,000",
    feeAmount: 3000,
    locationType: "Remote",
    description:
      "Learn manual and automated software testing, unit testing frameworks, end-to-end integration tests, and QA bug reporting.",
    skillsRequired: ["Jest", "Cypress / Selenium", "Manual Testing", "Bug Tracking", "QA Test Plans"]
  },
  {
    id: "prog-mobile-training",
    title: "Mobile App Engineering Training",
    domain: "Mobile App Development",
    fee: "NPR 4,000",
    feeAmount: 4000,
    locationType: "Remote",
    description:
      "Create cross-platform mobile apps for iOS and Android using React Native / Flutter with seamless API integration.",
    skillsRequired: ["React Native", "Flutter", "Mobile UI", "REST APIs"]
  }
];
