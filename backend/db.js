const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const User = require('./models/User');
const Program = require('./models/Program');
const Application = require('./models/Application');
const Task = require('./models/Task');
const Evaluation = require('./models/Evaluation');
const Certificate = require('./models/Certificate');

const DB_FILE = path.join(__dirname, 'db.json');

// Initial seed dataset for Velora Global platform
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
      role: "Software Engineering Intern",
      userType: "student",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
      university: "Tribhuvan University / Kathmandu Tech",
      fieldOfStudy: "Computer Science & Engineering",
      skills: ["React", "Node.js", "JavaScript", "MongoDB", "CSS3"],
      bio: "Aspiring full-stack developer dedicated to building scalable web applications and learning modern tools."
    }
  ],
  programs: [
    {
      id: "prog-tech-1",
      title: "Full-Stack Web Development Internship",
      domain: "Technology",
      duration: "8 Weeks",
      stipend: "$350 - $500 / month",
      locationType: "Remote / Hybrid",
      level: "Intermediate",
      description: "Hands-on experience building modern single-page applications using React, Express, Node.js, and MongoDB. Work on real-world projects with industry code standards.",
      skillsRequired: ["JavaScript (ES6+)", "React.js", "Node.js & Express", "REST APIs", "Git"],
      perks: ["Official Velora Global Certificate", "Mentorship from Co-Founders", "Flexible Hours"],
      deliverables: ["Develop an end-to-end full-stack web dashboard", "Implement secure RESTful API endpoints"],
      openPositions: 15,
      appliedCount: 42,
      status: "Active"
    },
    {
      id: "prog-design-1",
      title: "Product UI/UX Design Program",
      domain: "Design",
      duration: "6 Weeks",
      stipend: "$300 - $450 / month",
      locationType: "Remote",
      level: "All Levels",
      description: "Master modern product design workflows from user research and wireframing to pixel-perfect Figma UI component libraries and interactive prototypes.",
      skillsRequired: ["Figma", "User Journey Mapping", "Design Systems", "Prototyping"],
      perks: ["Certificate of Excellence", "Portfolio Projects"],
      deliverables: ["Complete user flow audit", "Build a multi-device UI Design System in Figma"],
      openPositions: 10,
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
      programId: "prog-tech-1",
      programTitle: "Full-Stack Web Development Internship",
      domain: "Technology",
      status: "In-Progress",
      appliedDate: "2026-07-15",
      statementOfPurpose: "I am passionate about full-stack engineering and want to contribute to Velora Global platform.",
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
      programId: "prog-tech-1",
      programTitle: "Full-Stack Web Development Internship",
      title: "Build Responsive Multi-User Dashboard & API Integration",
      description: "Develop a complete frontend React dashboard connected to Express backend REST APIs.",
      assignedDate: "2026-07-22",
      dueDate: "2026-08-15",
      status: "Submitted",
      submission: {
        submittedDate: "2026-08-04",
        githubUrl: "https://github.com/aaravsharma-dev/velora-internship-project",
        liveUrl: "https://velora-dashboard-demo.vercel.app",
        notes: "Implemented all required endpoints, responsive dark mode UI, and form validation."
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
      programTitle: "Full-Stack Web Development Internship",
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
      programTitle: "Full-Stack Web Development Internship",
      domain: "Technology",
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

let isConnectedToMongo = false;

async function connectDB() {
  const mongoURI = process.env.MONGODB_URI;
  if (!mongoURI || mongoURI.includes('<db_password>')) {
    console.log("ℹ️ MongoDB Atlas URI pending password substitution. Operating on persistent storage layer.");
    return false;
  }

  try {
    await mongoose.connect(mongoURI);
    isConnectedToMongo = true;
    console.log("🟢 Connected to MongoDB Atlas Database: velora_global");
    await seedAtlasData();
    return true;
  } catch (err) {
    console.warn("⚠️ MongoDB Atlas connection error:", err.message);
    return false;
  }
}

async function seedAtlasData() {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log("🌱 Seeding MongoDB Atlas with initial data...");
      await User.insertMany(initialData.users);
      await Program.insertMany(initialData.programs);
      await Application.insertMany(initialData.applications);
      await Task.insertMany(initialData.tasks);
      await Evaluation.insertMany(initialData.evaluations);
      await Certificate.insertMany(initialData.certificates);
      console.log("✅ Seed completed on MongoDB Atlas!");
    }
  } catch (err) {
    console.error("Error seeding Atlas data:", err.message);
  }
}

// Local File DB fallback functions
function initializeDb() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf8');
  }
}

function readDb() {
  initializeDb();
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return initialData;
  }
}

function writeDb(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error("Error writing db file:", err);
  }
}

module.exports = {
  connectDB,
  readDb,
  writeDb,
  getIsConnected: () => isConnectedToMongo
};
