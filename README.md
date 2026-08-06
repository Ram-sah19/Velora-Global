# Velora Global — Internship & Career Development Platform

> **Official Career Gateway delivering industry-aligned internship opportunities with purpose, precision, and verified credentials.**

---

## 🌟 Executive Summary

**Velora Global** is a modern MERN stack platform designed to empower students and early-career developers with practical project experience, executive mentorship, and official verified certifications across 10 specialized technology and design domains.

Founding Leadership:
- **Rambilas Sah** — Founder & CEO
- **Puja Rouniyar** — Co-Founder & COO
- **Rohit Sah** — Co-Founder & CTO

---

## 🚀 Key Features & Capabilities

### 1. 10 Specialized Technology & Design Domains
- **Frontend Development**: React.js, JavaScript ES6+, HTML5 & CSS3, TailwindCSS.
- **Backend Development**: Node.js, Express.js, REST APIs, MongoDB.
- **Full Stack Development**: MERN Stack, MVC Architecture, End-to-End Delivery.
- **Mobile App Development**: React Native, Flutter, Cross-Platform Mobile UI.
- **Artificial Intelligence & Machine Learning**: Python, PyTorch, TensorFlow, NLP.
- **Data Science**: Python, Pandas, NumPy, SQL, Data Visualization.
- **Cybersecurity**: Network Security Auditing, Penetration Testing, Linux.
- **UI/UX Design**: Figma, User Journey Mapping, Design Systems, Prototyping.
- **Cloud & DevOps**: Docker, Kubernetes, AWS/GCP, CI/CD Pipelines.
- **Software Testing**: Jest, Cypress, Automated QA, E2E Test Suites.

### 2. Executive Leadership & Team Hub (`/team`)
- Dedicated **Our Team** page featuring executive profiles for **Rambilas Sah**, **Puja Rouniyar**, and **Rohit Sah**.
- Highlights direct contact links, core guiding principles, and executive leadership bios.

### 3. 5-Criteria Objective Evaluation Engine
Projects submitted by interns are evaluated across 5 core criteria:
1. **Quality of Work**
2. **Technical Skills & Mastery**
3. **Creativity & Innovation**
4. **Completion of Requirements**
5. **Professional Approach**

### 4. Official QR-Verified Certificates
- Generates official certificates with a unique ID format (`VG-2026-XXXXX`).
- Features a public QR-verification portal where employers can validate credential authenticity.

---

## 📂 Modular Frontend Architecture (`frontend/src/`)

```text
src/
├── components/                  # Global shared UI components
│   ├── Navbar.js                # Top Navigation Header with Our Team link
│   ├── Footer.js                # Global Midnight Footer
│   ├── VeloraLogo.js            # Monogram SVG Logo
│   └── CertificateModal.js      # Printable Certificate Modal
├── pages/                       # Organized Feature Page Modules
│   ├── HomePage/                # Home / Landing Page Module
│   │   ├── LandingPage.js       # Home Page Main Entry Component
│   │   ├── HeroSection.js       # Split Hero & Interactive Domain Spotlight
│   │   ├── StudentJourneySection.js # 4-Step Student Path
│   │   ├── FeaturesSection.js   # Credential Trust & Platform Features
│   │   └── FaqSection.js        # Frequently Asked Questions Accordion
│   ├── TeamPage/                # Dedicated Executive Team Module
│   │   └── TeamPage.js          # Rambilas Sah, Puja Rouniyar & Rohit Sah Profiles
│   ├── ProgramsPage/            # Explore Programs Module
│   │   └── ProgramsPage.js
│   ├── StudentPortalPage/       # Student Workspace Module
│   │   └── StudentPortalPage.js
│   ├── AdminDashboardPage/      # Founder Panel Module
│   │   └── AdminDashboardPage.js
│   └── CertificateVerifyPage/   # Public Credential Verification Module
│       └── CertificateVerifyPage.js
├── services/
│   └── api.js                   # API Client Service
├── App.js                       # Root Application Router
└── index.css                    # Pro Corporate Design Tokens
```

---

## 🛠️ Technology Stack

| Layer | Technology Used |
| :--- | :--- |
| **Frontend** | React 19, Modular Pages Architecture, Vanilla CSS3 |
| **Backend** | Node.js, Express.js, MVC Pattern, CORS, Dotenv |
| **Database** | MongoDB Atlas (`velora_global` database), Mongoose ODM |
| **Branding** | Custom Velora SVG Monogram, Unsplash/Local Leadership Assets |

---

## ⚙️ Quick Start & Setup Guide

### 1. Configure Environment Variables
Verify your connection string in `backend/.env`:


### 2. Seed MongoDB Atlas Database
In the root directory, run the database seed script:
```bash
cd backend
npm run seed
```

### 3. Start Backend Server
```bash
cd backend
npm start
```
*Backend server runs on `http://localhost:5000`.*

### 4. Start Frontend React Application
In a new terminal window:
```bash
cd frontend
npm start
```
*Frontend application launches at `http://localhost:3000`.*

---

## 📜 License & Ownership

© 2026 **Velora Global**. All rights reserved.  
Founded by **Rambilas Sah** • Co-Founded by **Puja Rouniyar** & **Rohit Sah**.
