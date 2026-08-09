require('dotenv').config();
const mongoose = require('mongoose');
const dns = require('dns');

// Force IPv4 and Google DNS for SRV resolution
try {
  if (dns.setDefaultResultOrder) {
    dns.setDefaultResultOrder('ipv4first');
  }
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {}

const User = require('./models/User');
const Program = require('./models/Program');
const Application = require('./models/Application');
const Task = require('./models/Task');
const Evaluation = require('./models/Evaluation');
const Certificate = require('./models/Certificate');

const initialData = {
  users: [
    {
      id: "user-admin-1",
      name: "Rambilas Sah",
      email: "rambilas@veloraglobal.com",
      role: "Founder & CEO",
      userType: "admin",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      bio: "Founder & CEO of Velora Global. Passionate about empowering students with real-world industry experience."
    },
    {
      id: "user-cofounder-1",
      name: "Puja Rouniyar",
      email: "puja@veloraglobal.com",
      role: "Co-Founder & COO",
      userType: "admin",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      bio: "Co-Founder driving operations and student success programs at Velora Global."
    },
    {
      id: "user-cofounder-2",
      name: "Rohit Sah",
      email: "rohit@veloraglobal.com",
      role: "Co-Founder & CTO",
      userType: "admin",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      bio: "Co-Founder leading technology strategy and engineering mentorship at Velora Global."
    },
    {
      id: "user-student-1",
      name: "Aarav Sharma",
      email: "aarav.sharma@example.com",
      role: "Full Stack Engineering Intern",
      userType: "student",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
      university: "Tribhuvan University / Kathmandu Tech",
      fieldOfStudy: "Computer Science & Engineering",
      skills: ["React", "Node.js", "JavaScript", "MongoDB", "CSS3"],
      bio: "Aspiring full stack developer dedicated to building scalable web applications."
    }
  ],
  programs: [
    {
      id: "prog-fe-1",
      title: "Frontend Development Internship",
      domain: "Frontend Development",
      duration: "6 Weeks",
      stipend: "NPR 299 (1 Mon Internship) / NPR 1,200 (Training + Internship)",
      locationType: "Remote",
      level: "All Levels",
      description: "Build high-performance, responsive web interfaces using modern React, HTML5, CSS3, and JavaScript ES6+.",
      skillsRequired: ["React.js", "JavaScript ES6+", "HTML5 & CSS3", "TailwindCSS", "Git"],
      perks: ["Official Velora Global Certificate", "Mentorship from Co-Founders"],
      deliverables: ["Develop interactive responsive UI components", "Optimize lighthouse performance"],
      openPositions: 15,
      appliedCount: 42,
      status: "Active"
    },
    {
      id: "prog-be-1",
      title: "Backend Development Internship",
      domain: "Backend Development",
      duration: "8 Weeks",
      stipend: "NPR 299 (1 Mon Internship) / NPR 1,200 (Training + Internship)",
      locationType: "Remote",
      level: "Intermediate",
      description: "Design RESTful APIs, manage databases, write serverless functions, and implement secure authentication with Node.js and Express.",
      skillsRequired: ["Node.js", "Express.js", "MongoDB", "REST APIs", "JWT"],
      perks: ["Verified Certificate", "Backend Architecture Mentorship"],
      deliverables: ["Build robust RESTful endpoints", "Implement database CRUD & authentication"],
      openPositions: 12,
      appliedCount: 38,
      status: "Active"
    },
    {
      id: "prog-fs-1",
      title: "Full Stack Development Internship",
      domain: "Full Stack Development",
      duration: "8 Weeks",
      stipend: "NPR 299 (1 Mon Internship) / NPR 1,200 (Training + Internship)",
      locationType: "Remote / Hybrid",
      level: "Intermediate",
      description: "End-to-end web application development combining React client frontend with Node.js Express server and MongoDB database.",
      skillsRequired: ["React.js", "Node.js", "Express.js", "MongoDB", "MVC Architecture"],
      perks: ["Official Velora Global Certificate", "Executive Feedback"],
      deliverables: ["Build end-to-end full stack application", "Deploy production web bundle"],
      openPositions: 20,
      appliedCount: 55,
      status: "Active"
    },
    {
      id: "prog-mobile-1",
      title: "Mobile App Development Internship",
      domain: "Mobile App Development",
      duration: "8 Weeks",
      stipend: "NPR 299 (1 Mon Internship) / NPR 1,200 (Training + Internship)",
      locationType: "Remote",
      level: "All Levels",
      description: "Create cross-platform mobile apps for iOS and Android using React Native / Flutter with seamless API integration.",
      skillsRequired: ["React Native", "Flutter", "Mobile UI", "REST APIs"],
      perks: ["Certificate of Excellence", "App Store Publishing Experience"],
      deliverables: ["Develop cross-platform mobile app UI", "Integrate push notifications and storage"],
      openPositions: 10,
      appliedCount: 26,
      status: "Active"
    },
    {
      id: "prog-aiml-1",
      title: "Artificial Intelligence & Machine Learning Internship",
      domain: "Artificial Intelligence & Machine Learning",
      duration: "8 Weeks",
      stipend: "NPR 299 (1 Mon Internship) / NPR 1,200 (Training + Internship)",
      locationType: "Remote",
      level: "Intermediate / Advanced",
      description: "Train machine learning models, implement natural language processing algorithms, and deploy AI solutions.",
      skillsRequired: ["Python", "TensorFlow / PyTorch", "Scikit-Learn", "Model Deployment"],
      perks: ["Verified Velora Global Certificate", "AI Research Mentorship"],
      deliverables: ["Train predictive ML classification model", "Deploy AI model inference API"],
      openPositions: 8,
      appliedCount: 31,
      status: "Active"
    },
    {
      id: "prog-ds-1",
      title: "Data Science Internship",
      domain: "Data Science",
      duration: "8 Weeks",
      stipend: "NPR 299 (1 Mon Internship) / NPR 1,200 (Training + Internship)",
      locationType: "Remote",
      level: "Intermediate",
      description: "Perform data wrangling, exploratory analysis, statistical modeling, and interactive data visualization.",
      skillsRequired: ["Python", "Pandas & NumPy", "SQL", "Data Visualization", "PowerBI"],
      perks: ["Verified Certificate", "Real-World Datasets"],
      deliverables: ["Perform exploratory dataset analysis", "Create executive data visualization report"],
      openPositions: 10,
      appliedCount: 33,
      status: "Active"
    },
    {
      id: "prog-cyber-1",
      title: "Cybersecurity Internship",
      domain: "Cybersecurity",
      duration: "6 Weeks",
      stipend: "NPR 299 (1 Mon Internship) / NPR 1,200 (Training + Internship)",
      locationType: "Remote",
      level: "All Levels",
      description: "Understand network security fundamentals, penetration testing, vulnerability assessment, and security auditing.",
      skillsRequired: ["Network Security", "Ethical Hacking Basics", "Vulnerability Scanning", "Linux"],
      perks: ["Official Certificate", "Security Audit Experience"],
      deliverables: ["Conduct web vulnerability audit", "Formulate security patch documentation"],
      openPositions: 8,
      appliedCount: 24,
      status: "Active"
    },
    {
      id: "prog-uiux-1",
      title: "UI/UX Design Internship",
      domain: "UI/UX Design",
      duration: "6 Weeks",
      stipend: "NPR 299 (1 Mon Internship) / NPR 1,200 (Training + Internship)",
      locationType: "Remote",
      level: "All Levels",
      description: "Master user research, wireframing, high-fidelity Figma UI design systems, and interactive prototyping.",
      skillsRequired: ["Figma", "User Research", "Wireframing", "Design Systems", "Prototyping"],
      perks: ["Certificate of Excellence", "Design Review Sessions"],
      deliverables: ["Create multi-device design system", "Deliver interactive Figma prototype"],
      openPositions: 12,
      appliedCount: 29,
      status: "Active"
    },
    {
      id: "prog-cloud-1",
      title: "Cloud & DevOps Internship",
      domain: "Cloud & DevOps",
      duration: "8 Weeks",
      stipend: "NPR 299 (1 Mon Internship) / NPR 1,200 (Training + Internship)",
      locationType: "Remote",
      level: "Intermediate",
      description: "Implement CI/CD automation pipelines, containerize applications with Docker, and manage cloud infrastructure.",
      skillsRequired: ["Docker", "Kubernetes Basics", "AWS / GCP", "CI/CD Pipelines", "Linux"],
      perks: ["Verified Certificate", "Cloud Architecture Mentorship"],
      deliverables: ["Automate Docker container build", "Deploy CI/CD deployment pipeline"],
      openPositions: 8,
      appliedCount: 22,
      status: "Active"
    },
    {
      id: "prog-qa-1",
      title: "Software Testing Internship",
      domain: "Software Testing",
      duration: "6 Weeks",
      stipend: "NPR 299 (1 Mon Internship) / NPR 1,200 (Training + Internship)",
      locationType: "Remote",
      level: "All Levels",
      description: "Learn manual and automated software testing, unit testing frameworks, end-to-end integration tests, and QA bug reporting.",
      skillsRequired: ["Jest", "Cypress / Selenium", "Manual Testing", "Bug Tracking", "QA Test Plans"],
      perks: ["Official Certificate", "QA Lead Mentorship"],
      deliverables: ["Write comprehensive QA test suite", "Conduct automated E2E integration test"],
      openPositions: 10,
      appliedCount: 18,
      status: "Active"
    },
    {
      id: "prog-js-1",
      title: "JavaScript & Modern ES6+ Full Stack Training",
      domain: "JavaScript",
      duration: "6 Weeks",
      stipend: "NPR 500 (1 Wk Training) / NPR 1,200 (1 Mon Training)",
      locationType: "Remote",
      level: "All Levels",
      description: "Master JavaScript fundamentals, asynchronous ES6+, DOM manipulation, Node.js runtime, and modern web application development.",
      skillsRequired: ["JavaScript ES6+", "Node.js", "Async/Await", "DOM Manipulation", "Express.js"],
      perks: ["Official Velora Global Certificate", "1-on-1 Code Review"],
      deliverables: ["Build interactive ES6+ web application", "Implement asynchronous API data integration"],
      openPositions: 20,
      appliedCount: 45,
      status: "Active"
    },
    {
      id: "prog-java-1",
      title: "Java Core, Spring Boot & Microservices Training",
      domain: "Java",
      duration: "8 Weeks",
      stipend: "NPR 500 (1 Wk Training) / NPR 1,200 (1 Mon Training)",
      locationType: "Remote",
      level: "Intermediate",
      description: "Master Object-Oriented Programming (OOP), Data Structures, Java Core, Spring Boot REST APIs, and enterprise microservice architecture.",
      skillsRequired: ["Java Core", "Spring Boot", "OOP Concepts", "Hibernate / JPA", "REST Microservices"],
      perks: ["Verified Certificate", "Enterprise Java Architecture Mentorship"],
      deliverables: ["Build enterprise Spring Boot REST API", "Implement JPA database entity relations"],
      openPositions: 15,
      appliedCount: 36,
      status: "Active"
    },
    {
      id: "prog-py-1",
      title: "Python Programming & Scripting Training",
      domain: "Python",
      duration: "6 Weeks",
      stipend: "NPR 500 (1 Wk Training) / NPR 1,200 (1 Mon Training)",
      locationType: "Remote",
      level: "All Levels",
      description: "Master Python syntax, object-oriented design, automated web scraping, data structures, and backend API development.",
      skillsRequired: ["Python 3", "OOP", "Django / FastAPI", "Web Scraping", "Data Structures"],
      perks: ["Verified Certificate", "Python Code Review"],
      deliverables: ["Write automated Python data scraping script", "Develop FastAPI backend endpoints"],
      openPositions: 18,
      appliedCount: 40,
      status: "Active"
    },
    {
      id: "prog-cpp-1",
      title: "C++ & Data Structures Systems Training",
      domain: "C++",
      duration: "8 Weeks",
      stipend: "NPR 500 (1 Wk Training) / NPR 1,200 (1 Mon Training)",
      locationType: "Remote",
      level: "Intermediate",
      description: "Master C++ pointers, memory management, object-oriented design, STL containers, and algorithmic problem-solving.",
      skillsRequired: ["C++17", "Data Structures & Algorithms", "Pointers & Memory", "STL", "OOP"],
      perks: ["Official Certificate", "Algorithmic Problem Solving"],
      deliverables: ["Implement custom data structures in C++", "Solve complex algorithmic optimization problems"],
      openPositions: 12,
      appliedCount: 28,
      status: "Active"
    }
  ],
  applications: [
    {
      id: "app-101",
      studentId: "user-student-1",
      studentName: "Aarav Sharma",
      studentEmail: "aarav.sharma@example.com",
      programId: "prog-fs-1",
      programTitle: "Full Stack Development Internship",
      domain: "Full Stack Development",
      status: "In-Progress",
      appliedDate: "2026-07-15",
      statementOfPurpose: "I am passionate about full stack engineering and building scalable web applications.",
      portfolioUrl: "https://github.com/aaravsharma-dev",
      resumeUrl: "https://example.com/resume/aarav.pdf"
    }
  ],
  tasks: [
    {
      id: "task-201",
      applicationId: "app-101",
      studentId: "user-student-1",
      studentName: "Aarav Sharma",
      programId: "prog-fs-1",
      programTitle: "Full Stack Development Internship",
      title: "Build Responsive Multi-User Dashboard & API Integration",
      description: "Develop a complete frontend React dashboard connected to Express backend REST APIs.",
      assignedDate: "2026-07-22",
      dueDate: "2026-08-15",
      status: "Submitted",
      submission: {
        submittedDate: "2026-08-04",
        githubUrl: "https://github.com/aaravsharma-dev/velora-internship-project",
        liveUrl: "https://velora-dashboard-demo.vercel.app",
        notes: "Implemented all required endpoints, responsive UI, and form validation."
      }
    }
  ],
  evaluations: [
    {
      id: "eval-301",
      taskId: "task-201",
      applicationId: "app-101",
      studentId: "user-student-1",
      studentName: "Aarav Sharma",
      programTitle: "Full Stack Development Internship",
      evaluatorName: "Rambilas Sah (Founder & CEO)",
      scores: { qualityOfWork: 9.5, technicalSkills: 9.2, creativity: 9.0, completionOfRequirements: 10.0, professionalApproach: 9.8 },
      overallScore: 9.5,
      grade: "A+",
      feedback: "Outstanding performance! Aarav demonstrated exceptional technical mastery.",
      evaluatedDate: "2026-08-05"
    }
  ],
  certificates: [
    {
      certificateId: "VG-2026-88491",
      studentId: "user-student-1",
      studentName: "Aarav Sharma",
      programTitle: "Full Stack Development Internship",
      domain: "Full Stack Development",
      issueDate: "2026-08-05",
      duration: "8 Weeks",
      grade: "A+",
      founderSignature: "Rambilas Sah",
      founderTitle: "Founder & CEO",
      coFounders: ["Puja Rouniyar", "Rohit Sah"],
      verificationUrl: "https://veloraglobal.com/verify/VG-2026-88491"
    }
  ]
};

async function seedAtlas() {
  const uri = process.env.MONGODB_URI;
  console.log("Connecting to MongoDB Atlas...");
  
  try {
    await mongoose.connect(uri, { family: 4, serverSelectionTimeoutMS: 8000 });
    console.log("Connected successfully to MongoDB Atlas database: velora_global");

    await User.deleteMany({});
    await Program.deleteMany({});
    await Application.deleteMany({});
    await Task.deleteMany({});
    await Evaluation.deleteMany({});
    await Certificate.deleteMany({});

    console.log("Inserting users...");
    await User.insertMany(initialData.users);
    console.log("Inserting 10 domain programs...");
    await Program.insertMany(initialData.programs);
    console.log("Inserting applications...");
    await Application.insertMany(initialData.applications);
    console.log("Inserting tasks...");
    await Task.insertMany(initialData.tasks);
    console.log("Inserting evaluations...");
    await Evaluation.insertMany(initialData.evaluations);
    console.log("Inserting certificates...");
    await Certificate.insertMany(initialData.certificates);

    console.log("🎉 SUCCESS! All collections created and populated in MongoDB Atlas database: velora_global");
    process.exit(0);
  } catch (err) {
    console.error("❌ Atlas Seeding Error:", err.message);
    process.exit(1);
  }
}

seedAtlas();
