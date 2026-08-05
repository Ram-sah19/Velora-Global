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

### 2. Executive Leadership & Mentorship Hub
- High-visibility founding team profiles for **Rambilas Sah**, **Puja Rouniyar**, and **Rohit Sah**.
- Direct evaluation and project feedback from executive leaders.

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

### 5. MVC Architecture & MongoDB Atlas Backend
- Structured Express backend using **Model-View-Controller (MVC)** design pattern.
- Native **Mongoose schemas** connected directly to **MongoDB Atlas** (`velora_global` database).

---

## 🎨 Pro Corporate UI/UX Design Palette

The platform follows a custom enterprise color system:
- **Cool Slate (`#F1F5F9`)**: Primary background for clean contrast.
- **Midnight (`#0B0F19`)**: Dark navigation header, callout banners, and footer.
- **Deep Blue (`#2563EB`)**: Primary brand color for active states and links.
- **Warm Coral (`#FF6B6B`)**: High-impact call-to-action buttons ("Apply Now", "Get In Touch").
- **SVG Branding Mark**: Vector monogram logo combining silver crescent, gold swoosh, and 4-point star accent.

---

## 🛠️ Technology Stack

| Layer | Technology Used |
| :--- | :--- |
| **Frontend** | React 19, Vanilla CSS3 (Custom Design System), SVG Vectors |
| **Backend** | Node.js, Express.js, MVC Pattern, CORS, Dotenv |
| **Database** | MongoDB Atlas (`velora_global` database), Mongoose ODM |
| **Branding** | Custom Velora SVG Monogram, Unsplash/Local Leadership Assets |

---

## 📂 Project Structure

```text
Company/
├── backend/
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── programController.js
│   │   ├── applicationController.js
│   │   ├── taskController.js
│   │   ├── evaluationController.js
│   │   ├── certificateController.js
│   │   └── statsController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Program.js
│   │   ├── Application.js
│   │   ├── Task.js
│   │   ├── Evaluation.js
│   │   └── Certificate.js
│   ├── routes/
│   ├── db.js
│   ├── seed_atlas.js
│   ├── copy_media.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   │   ├── media/          # Executive Founder Photos
│   │   ├── favicon.svg     # Official Velora Monogram Logo
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── VeloraLogo.js
│   │   │   ├── Navbar.js
│   │   │   ├── HeroSection.js
│   │   │   ├── StudentJourneySection.js
│   │   │   ├── FeaturesSection.js
│   │   │   ├── LeadershipSection.js
│   │   │   ├── FaqSection.js
│   │   │   ├── DomainExplorer.js
│   │   │   ├── StudentPortal.js
│   │   │   ├── AdminDashboard.js
│   │   │   ├── CertificateModal.js
│   │   │   ├── CertificateVerifier.js
│   │   │   └── Footer.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.css
│   └── package.json
├── .gitignore
└── README.md
```

---

## ⚙️ Quick Start & Setup Guide

### 1. Prerequisites
- Node.js (v16+ or v18+ recommended)
- npm or yarn
- MongoDB Atlas account (Cluster0 configured)

### 2. Configure Environment Variables
Verify your connection string in `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://ram6070246_db_user:jkHUZssys6IyCqXo@cluster0.7iotdng.mongodb.net/velora_global?retryWrites=true&w=majority&appName=Cluster0
```

### 3. Seed MongoDB Atlas Database
In the root directory, run the database seed script:
```bash
cd backend
npm run seed
```
This populates the `velora_global` database with 10 domain programs and executive leadership records.

### 4. Start Backend Server
```bash
cd backend
npm start
```
*Backend server runs on `http://localhost:5000`.*

### 5. Start Frontend React Application
In a new terminal window:
```bash
cd frontend
npm start
```
*Frontend application launches at `http://localhost:3000`.*

---

## 🔒 Verification API Route

Employers and students can verify credentials programmatically or via UI:
- **API Endpoint**: `GET /api/certificates/verify/:certId`
- **Example ID**: `VG-2026-88491`

---

## 📜 License & Ownership

© 2026 **Velora Global**. All rights reserved.  
Founded by **Rambilas Sah** • Co-Founded by **Puja Rouniyar** & **Rohit Sah**.
