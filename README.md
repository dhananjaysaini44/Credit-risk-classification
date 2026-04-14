# Credit Risk Classification

![Python](https://img.shields.io/badge/Python-3.14-3776AB?style=flat&logo=python&logoColor=white) ![Next.js](https://img.shields.io/badge/Next.js-15+-000000?style=flat&logo=nextdotjs&logoColor=white) ![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=flat&logo=fastapi&logoColor=white) ![Tailwind_CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat&logo=tailwindcss&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript&logoColor=white) ![Scikit--Learn](https://img.shields.io/badge/Scikit--Learn-1.5.2-F7931E?style=flat&logo=scikit-learn&logoColor=white) ![Zustand](https://img.shields.io/badge/Zustand-State-433923?style=flat&logo=react&logoColor=white) ![GSAP](https://img.shields.io/badge/GSAP-3.14-88CE02?style=flat&logo=greensock&logoColor=white) ![Three.js](https://img.shields.io/badge/Three.js-r171-000000?style=flat&logo=threedotjs&logoColor=white) ![XGBoost](https://img.shields.io/badge/XGBoost-2.1-20BEFF?style=flat&logo=xgboost&logoColor=white) ![KNN](https://img.shields.io/badge/KNN-v2.1-FFD700?style=flat&logo=scikit-learn&logoColor=black) ![Render](https://img.shields.io/badge/Render-Deployed-46E3B7?style=flat&logo=render&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=flat&logo=vercel&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-300A24?style=flat&logo=github&logoColor=white)

## Overview
This project is a high-fidelity, full-stack Credit Risk Classification platform. It bridges the gap between raw data science and premium user experiences. Using an AI-driven predictive pipeline, the application classifies loan applicant default risks while providing a cinematic, interactive storytelling layer built with modern web technologies.

## Key Features
- **Cinematic Interactive UI**: A high-end scrolling experience powered by GSAP, Three.js, and Lenis for smooth, frame-based storytelling.
- **Real-Time Risk Engine**: High-concurrency FastAPI backend providing sub-100ms inference for credit probability analysis.
- **Advanced ML Pipeline**: Implementation of SMOTE balancing, Robust Scaling, and Optimized XGBoost ensembles.
- **Unified Development**: Single-command startup for both frontend and backend environments.

## Live Deployment
The platform is fully deployed and accessible in the cloud. 

> [!IMPORTANT]
> **Wake Up the Engine**: The backend is hosted on Render's free tier and may "sleep" after inactivity. Please click the **[Backend Health Check](https://credit-risk-classification-fg0q.onrender.com/)** first to wake up the service (may take 30-60s).

### Cloud URLs
- **Backend API**: https://credit-risk-classification-fg0q.onrender.com
- **Frontend Dashboard**: https://credit-risk-classification-q1ny-ffv17ha98.vercel.app/

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

## Project Structure
```text
Credit-risk Classification/
├── assets/               # Analytics and Model Assets
│   ├── models/           # Production-ready Binary Artifacts (.pkl)
│   │   ├── Logistic_Regression_v2.pkl
│   │   └── preprocessor.pkl
│   ├── eda/              # Exploratory Analysis (Correlation, Overlap)
│   └── eval/             # Model Performance (Confusion Matrices, Threshold Tuning)
├── docs/                 # Workflow documentation and planning
├── notebooks/            # ML Development & Research (Advanced Analysis)
├── backend/              # Optimized Prediction Engine (FastAPI)
│   ├── __init__.py       # Initializes the backend package
│   ├── main.py           # API Entrypoint and CORS config
│   └── utils.py          # Real-time Risk Engine class
├── data/                 # Financial Data Repository
│   └── raw/              # Primary Source: Loan_Data.csv
├── public/               # Static Media Assets
│   └── frames/           # Cinematic Image Sequence (ezgif-frame-xxx.jpg)
├── src/                  # Next.js 15 Cinematic Frontend
│   ├── app/              # App Router and Global Styles
│   │   ├── layout.tsx    # Root layout with Smooth Scroll
│   │   ├── page.tsx      # Landing Dashboard
│   │   └── globals.css   # Tailored Production CSS
│   ├── components/       # Modular UI Components
│   │   ├── cinematic/    # Hero, ScrollSequence, StorySection, Preloader
│   │   └── interactive/  # RiskForm, ResultsDisplay
│   └── store/            # State Management (Zustand)
├── render.yaml           # Blueprint for Render Deployment
├── requirements.txt      # Inference-optimized Dependencies
├── package.json          # Frontend scripts and unified dev commands
└── start.ps1             # All-in-one Windows Dev Startup
```

## Implementation Research & ML Methodology

### Optimal Threshold Selection
Our mathematical analysis concludes that the **Default (0.50)** probability threshold is suboptimal for this specific credit risk profile. 

By analyzing the Precision-Recall trade-off, we identified an **Optimal Threshold of 0.40**, which maximizes the **F1-Score (0.30)** while maintaining an aggressive catch-rate for defaults.

![F1 Optimization Curve](assets/eval/f1_optimization.png)
![Logistic Regression v2 Confusion Matrix](assets/eval/Logistic_Regression_v2_cm_0.4.png)

| Factor                  | Baseline (0.50) | Optimized (0.40) | Impact                           |
| :---------------------- | :-------------- | :--------------- | :------------------------------- |
| **Recall (Catch Rate)** | 54%             | **93%**          | **+39%** increase in protection. |
| **F1-Score**            | 0.23            | **0.30**         | Maximum mathematical balance.    |

> [!TIP]
> **Conclusion**: For real-world deployment, setting the detection threshold to **0.40** provides the best survival rate for the bank by catching nearly every default before it happens, without significantly increasing the false alarm rate.

### Data Processing Strategy
To ensure our model learns real-world patterns reliably without data leakage, we enforce strict data hygiene:
- **Train-Test Split First**: The raw data is strictly split 80/20 before any statistics are calculated.
- **Scikit-Learn Pipelines**:
  - **SimpleImputer**: Used exclusively to handle missing values based only on the training data mean.
  - **StandardScaler**: Applied to all numeric features.
  - **OrdinalEncoder**: Explicitly orders Education_Level stability.
  - **OneHotEncoder**: Converts categorical variables into binary features.

### Feature Engineering
#### Loan to Income Ratio
Instead of having the algorithm guess the burden of a loan, we explicitly calculate the exact ratio of the requested Loan_Amount against income. This is functionally one of the most powerful predictors of default risk.

#### Advanced Interaction Engineering
We introduced synthetic interaction terms to create a stronger mathematical separation between classes:
- **Risk Index**: (Loan_Amount / Income) / Credit_Score.
- **Stability Index**: Credit_Score * Employment_Years.

### Model Training and Optimization
#### Addressing Class Imbalance with SMOTE
We utilized Synthetic Minority Over-sampling Technique (SMOTE) to synthesize new, mathematically plausible minority examples using a K-Nearest Neighbors approach.

#### Gradient Boosting and Hyperparameter Tuning
We deployed XGBoost (eXtreme Gradient Boosting) to handle high variance. Missing a default is significantly more expensive than accidentally rejecting a safe customer.

