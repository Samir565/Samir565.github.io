# Premium Engineering Portfolio — Muhammad Samir Malik

A modern, high-precision, responsive personal portfolio website for **Muhammad Samir Malik**, Electrical Engineering graduate from Information Technology University (ITU), Lahore, Pakistan.

---

## ⚡ Overview & Vision

Designed with the clean, structured, and authoritative presentation principles of academic and engineering profiles (inspired by [drahmad.net](https://drahmad.net/)), this portfolio positions **Muhammad Samir Malik** as an Electrical Engineering graduate combining:

- **Hardware & Smart Systems:** Capstone 3-phase smart metering prototype (*Energy Tracker*) and autonomous feedback control (*Ball Balancing Table*).
- **Data, Computing & Research:** CNN-based image classification, customer dataset clustering, MATLAB audio bandpass filter synthesis, and literature research on Neuromorphic VLSI systems.
- **Operations & Industrial Leadership:** Industrial procurement cycles and SAP ERP workflows at **DESCON Engineering**, experimental research at **IMAL Lab**, and executive leadership directing 45+ university-scale events as **President of the Event Management Society (EMS)**.

> **Integrity Guarantee:** Strictly mirrors verified CV credentials. No fabricated GitHub accounts, arbitrary percentage progress bars, fake citations, or artificial portrait photos.

---

## 🛠️ Technology Stack

- **Framework:** React 18 + TypeScript
- **Bundler & Build Tool:** Vite
- **Styling:** Tailwind CSS (Custom theme: Deep Navy `#0B1526` / Slate `#1E293B` typography with Electric-Blue `#0A84FF` accents)
- **Icons:** Lucide Icons (`lucide-react`)
- **Graphics:** High-precision SVG technical telemetry graphics (3-Phase waveform vector, Embedded core schematic, DSP frequency response, Memristive crossbar array, and 2-DOF control plate).
- **Architecture:** Modular, component-driven architecture with centralized content data store in `src/data/portfolio.ts`.

---

## 📂 Project Architecture

```
portfolio/
├── index.html                   # HTML entry point with metadata & favicon
├── package.json                 # Project dependencies & scripts
├── postcss.config.js            # PostCSS configuration
├── tailwind.config.js           # Custom theme colors & fonts
├── tsconfig.json                # TypeScript compiler configuration
├── vite.config.ts               # Vite configuration
└── src/
    ├── main.tsx                 # App mounting
    ├── App.tsx                  # Root layout, modal state & routing
    ├── index.css                # Tailwind directives, print styles & grid patterns
    ├── types.ts                 # TypeScript data interfaces
    ├── data/
    │   └── portfolio.ts         # Centralized verified CV data store
    └── components/
        ├── Navbar.tsx           # Sticky nav with active anchor tracking & CV action
        ├── HeroSection.tsx      # 2-column layout with CTA and technical visual
        ├── TechnicalGraphic.tsx # Interactive 3-phase waveform & schematic HUD
        ├── AboutSection.tsx     # 3 engineering pillars & background narrative
        ├── ExperienceTimeline.tsx # Vertical timeline (DESCON, IMAL Lab, EMS)
        ├── ProjectGrid.tsx      # Polished editorial layout (Flagship + 3 projects)
        ├── ProjectModal.tsx     # In-depth technical dossier modal with architecture
        ├── ProjectVisuals.tsx   # Custom SVG visuals for all 4 featured projects
        ├── SkillsSection.tsx    # 4 authentic categories (Zero arbitrary bars)
        ├── LeadershipSection.tsx# EMS President & 4 society appointments
        ├── EducationSection.tsx # ITU BS Electrical Engineering & Languages
        ├── ContactSection.tsx   # Direct verified channels, copy tool & validated form
        ├── CVModal.tsx          # Formatted digital résumé with print/PDF support
        └── Footer.tsx           # Understated footer with auto-updating copyright
```

---

## 🚀 Local Development & Execution

### 1. Prerequisites
Ensure **Node.js (v18+)** and **npm** are installed.

### 2. Install Dependencies
```bash
npm install
```

### 3. Launch Development Server
```bash
npm run dev
```
Navigate to `http://localhost:5173` in your browser.

### 4. Build for Production
```bash
npm run build
```
Creates an optimized production bundle inside `dist/`.

### 5. Preview Production Build
```bash
npm run preview
```
Serves the generated build locally at `http://localhost:4173`.

---

## 🌐 Deployment Instructions

### Vercel
1. Connect your repository to [Vercel](https://vercel.com).
2. Framework Preset: **Vite**.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.

### Netlify
1. Drag and drop the `dist/` folder into Netlify Drop, or connect via Git.
2. Publish Directory: `dist`.

---

## 📄 Contact & Verified Details

- **Name:** Muhammad Samir Malik
- **Location:** Lahore, Pakistan
- **Education:** BS Electrical Engineering, Information Technology University (ITU), 2022–2026
- **Email:** [samiramir377@gmail.com](mailto:samiramir377@gmail.com)
- **Phone:** +92 336 4416765
- **LinkedIn:** [linkedin.com/in/samir-malik-98a336264](https://linkedin.com/in/samir-malik-98a336264)
