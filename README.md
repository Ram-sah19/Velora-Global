# Velora Global — Internship & Career Development Platform

> **Official Career Gateway delivering industry-aligned internship & training opportunities with purpose, precision, and verified credentials.**

---

## 🌟 Executive Summary

**Velora Global** is a modern MERN stack platform designed to empower students and early-career developers with practical project experience, executive mentorship, and official verified certifications across 10 specialized technology and design domains.

Founding Leadership:
- **Rambilas Sah** — Founder & CEO
- **Puja Rouniyar** — Co-Founder & COO
- **Rohit Sah** — Co-Founder & CTO

---

## 🚀 Dedicated Program Pages

### 1. 🎯 Practical Internships Page (`/internships`)
- **Focus**: Real-world production project work, 5-criteria evaluation, and QR-verified certificate.
- **Duration Pricing Options**:
  - `2 Weeks`: **NPR 199**
  - `1 Month`: **NPR 299**
  - `2 Months`: **NPR 500**
  - `3 Months`: **NPR 1,000**
  - `6 Months`: **NPR 7,000**

### 2. 🚀 Training Programs Page (`/training`)
- **Focus**: Structured skill curriculum modules, hands-on lab projects, co-founder mentorship, and practical internship placement.
- **Duration Pricing Options**:
  - `1 Week`: **NPR 500**
  - `2 Weeks`: **NPR 700**
  - `3 Weeks`: **NPR 950**
  - `1 Month`: **NPR 1,200** *(Base)*
  - `2 Months`: **NPR 5,000**

---

## 📂 Modular Frontend Architecture (`frontend/src/`)

```text
src/
├── components/                  # Global shared UI components
│   ├── Navbar.js                # Top Navigation Header with separate Internships & Training links
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
│   ├── InternshipsPage/         # Dedicated Practical Internships Module
│   │   └── InternshipsPage.js   # NPR 199 to NPR 7,000 Duration Calculator
│   ├── TrainingPage/            # Dedicated Guided Training Module
│   │   └── TrainingPage.js      # NPR 500 to NPR 5,000 Training Calculator
│   ├── StudentPortalPage/       # Student Workspace Module
│   │   └── StudentPortalPage.js
│   └── AdminDashboardPage/      # Founder Panel Module
│       └── AdminDashboardPage.js
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
```env
PORT=5000
MONGODB_URI=mongodb+srv://ram6070246_db_user:jkHUZssys6IyCqXo@cluster0.7iotdng.mongodb.net/velora_global?retryWrites=true&w=majority&appName=Cluster0
```

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
