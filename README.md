# Credit Risk Classification

![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=flat&logo=python&logoColor=white) ![Next.js](https://img.shields.io/badge/Next.js-15.5.15-000000?style=flat&logo=nextdotjs&logoColor=white) ![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688?style=flat&logo=fastapi&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript&logoColor=white) ![Three.js](https://img.shields.io/badge/Three.js-r171-000000?style=flat&logo=threedotjs&logoColor=white) ![Tailwind_CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat&logo=tailwindcss&logoColor=white) ![Scikit--Learn](https://img.shields.io/badge/Scikit--Learn-1.5.2-F7931E?style=flat&logo=scikit-learn&logoColor=white) ![XGBoost](https://img.shields.io/badge/XGBoost-2.1-20BEFF?style=flat&logo=xgboost&logoColor=white) ![KNN](https://img.shields.io/badge/KNN-v2.1-yellow?style=flat&logo=analytics&logoColor=white) ![Framer_Motion](https://img.shields.io/badge/Framer_Motion-12.0-0055FF?style=flat&logo=framer&logoColor=white) ![GSAP](https://img.shields.io/badge/GSAP-3.14-88CE02?style=flat&logo=greensock&logoColor=white) ![Zustand](https://img.shields.io/badge/Zustand-State-433923?style=flat&logo=react&logoColor=white) ![Render](https://img.shields.io/badge/Render-Deployed-46E3B7?style=flat&logo=render&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=flat&logo=vercel&logoColor=white)

## Overview
This project is a high-fidelity, full-stack Credit Risk Classification platform. It bridges the gap between raw data science and premium user experiences. Using an AI-driven predictive pipeline, the application classifies loan applicant default risks while providing a cinematic, interactive storytelling layer built with modern web technologies.

## Key Features
- **Cinematic Interactive UI**: A high-end scrolling experience powered by GSAP and Lenis for smooth, frame-based storytelling.
- **Real-Time Risk Engine**: High-concurrency FastAPI backend providing sub-100ms inference for credit probability analysis.
- **Advanced ML Pipeline**: Implementation of SMOTE balancing, Robust Scaling, and Optimized XGBoost ensembles.
- **Mobile-Responsive Interface**: Fully optimized for diverse display architectures, ensuring a seamless experience across all device classes.
- **Unified Development**: Single-command startup for both frontend and backend environments.

## Live Deployment
The platform is fully deployed and accessible in the cloud. 

> [!IMPORTANT]
> **Wake Up the Engine**: The backend is hosted on Render's free tier and may "sleep" after inactivity. Please click the **[Backend Health Check](https://credit-risk-classification-fg0q.onrender.com)** first to wake up the service (may take 30-60s).

### Cloud URLs
- **Backend API**: https://credit-risk-classification-fg0q.onrender.com
- **Frontend Dashboard**: https://credit-risk-classification-q1ny-au967ssa1.vercel.app/

### How to use the Live Platform
1.  **Initiate Connection**: Click the Health Check link above.
2.  **Access UI**: Open the Frontend Dashboard link.
3.  **Run Inference**: Scroll down to the "Try it Yourself" section, enter loan details, and click **Calculate Risk** to see the ML model's prediction in real-time.

## Quick Start
You can start both the Next.js frontend and FastAPI backend with a single command:
```bash
# Recommended for all platforms
npm run dev:all

# Windows Native Alternative
.\start.ps1
```
Open [http://localhost:3000](http://localhost:3000) to view the live dashboard.

## Project Architecture
```text
Credit-risk Classification/
├── assets_1/                    # Dataset 1: Behavioral Analytics (32k Samples)
│   ├── models/                  # Models based on Dataset 1
│   ├── eda/                     # Distribution Plots & Correlation Heatmaps
│   └── eval/                    # Threshold-Specific Confusion Matrices
├── assets_2/                    # Dataset 2: Market-Scale Data (255k Samples)
│   ├── models/                  # Optimized Heavy-Duty ML Models
│   │   ├── KNN.pkl
│   │   ├── Logistic_Regression.pkl
│   │   ├── Random_Forest.pkl
│   │   ├── XGBoost.pkl
│   │   ├── preprocessor.pkl
│   ├── eval/                    # Threshold-Specific Confusion Matrices
│   └── eda/                     # Precision-Recall Optimization Curves
├── backend/                     # Inference Layer (FastAPI)
│   ├── main.py                  # API endpoints with Pydantic Schema Validation
│   └── utils.py                 # High-Concurrency Predictor Implementation
├── data/                        # Data Repository (Git Ignored)
│   ├── Loan_default.csv         # Raw Market Instance Data
│   ├── Loan_default_simulated.csv# Real-World Behavioral Simulation
│   └── credit_risk_dataset.csv  # Base Research Dataset
├── docs/                        # Technical Knowledge Base
│   ├── ML_Pipeline.md           # Engineering, Resampling, & SMOTE Logic
│   └── Frontend.md              # Cinematic UI & WebGL Sequence Specs
├── notebooks_1/                 # Research Kernels (Dataset 1)
├── notebooks_2/                 # Research Kernels (Dataset 2)
├── public/                      # Static Media & 4K Frame Sequences
│   ├── assets/                  # UI Textures (Exosphere, Particles)
│   └── frames/                  # High-Fiddle Cinematic Sequence Frames
├── src/                         # Next.js 15 Cinematic Frontend
│   ├── app/                     # App Router, Layouts, & Global Glassmorphism
│   ├── components/              # Modular UI (GSAP/Three.js/Interactive)
│   └── store/                   # Zustand-based Global State Management
├── requirements.txt             # Backend ML Dependencies (NumPy, SciPy, etc.)
├── package.json                 # Web Development Scripts & NPM Packages
├── start.ps1                    # Windows-native Dev Environment Bootstrapper
├── .gitignore                   # Git Ignore File
└── render.yaml                  # Render Configuration File
```

## Documentation & Methodology
For a detailed breakdown of our technical approach, model selection, and frontend architecture, please refer to the dedicated documentation:

*   **[Machine Learning Pipeline (Methodology, Thresholds, & Evaluation)](docs/ML_Pipeline.md)**
*   **[Frontend Architecture (Cinematic UI & Component Specs)](docs/Frontend.md)**

--- 

