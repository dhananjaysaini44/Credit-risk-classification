# Credit Risk Classification

![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white) ![Pandas](https://img.shields.io/badge/Pandas-150458?style=flat&logo=pandas&logoColor=white) ![Scikit--Learn](https://img.shields.io/badge/Scikit_Learn-F7931E?style=flat&logo=scikit-learn&logoColor=white)

## Overview
This project builds a predictive machine learning pipeline to classify if a loan applicant is likely to default on their credit.

## Project Structure
```text
CRC Project/
├── assets/
│   ├── eda/              # Visualizations and text summaries from Exploratory Data Analysis
│   ├── eval/             # Confusion Matrices and evaluation plots for the trained models
│   └── models/           # Exported trained models (.pkl files)
├── data/                 # Raw and processed datasets (X_train.csv, y_test.csv, etc.)
├── docs/                 # Workflow documentation and planning files
├── notebooks/
│   ├── eda.py            # Script executing statistical breakdown of raw data
│   ├── preprocessing.py  # Script handling imputation, encodings, and feature engineering
│   └── train_model.py    # Script training ML classification models
└── README.md             # This document
```

## Methodology & Machine Learning Workflow

### 1. Data Processing Strategy (`preprocessing.py`)
To ensure our model learns real-world patterns reliably without "Data Leakage", we enforce strict data hygiene:
- **Train-Test Split First:** The raw data is strictly split 80/20 before any statistics are calculated.
- **Scikit-Learn Pipelines:**
  - `SimpleImputer(strategy='mean')`: Used exclusively to handle missing `Income` values based *only* on the training data mean.
  - `StandardScaler`: Applied to all numeric features (`Age`, `Income`, `Loan_Amount`, `Credit_Score`, `Employment_Years`) so that large-magnitude values (like $50k loans) don't computationally overwhelm smaller scales (like 5 years employment) for distance-based ML algorithms.
  - `OrdinalEncoder`: Explicitly orders `Education_Level` (High School -> PhD).
  - `OneHotEncoder`: Converts `Housing_Status` into mathematically readable binary points.

### 2. Feature Engineering
- **`Loan_to_Income_Ratio`**: Instead of having the algorithm guess the burden of a loan, we explicitly calculate the exact ratio of the requested `Loan_Amount` against their `Income`. A high ratio is functionally one of the most powerful predictors of default risk.
  - *Real-Life Example:* Imagine an applicant asking for a **$50,000 loan**. If the ML model only looks at the loan size in isolation, it struggles to gauge true risk. But if Applicant A has an income of **$500,000/year** (Ratio: 0.10 or 10%) and Applicant B has an income of **$25,000/year** (Ratio: 2.0 or 200%), the ratio instantly tells the algorithm exactly who is financially overburdened and highly likely to default.

### 3. Model Training (`train_model.py`)
Because our dataset is heavily imbalanced (~86% No Default / ~14% Default), basic accuracy is a highly misleading metric. 
- **Algorithms Used:**
  - **Logistic Regression (Baseline):** Interpretable and fast.
  - **Random Forest:** Capable of learning non-linear structures.
- **Handling Imbalance:** We pass `class_weight='balanced'` into our estimators. This mathematically forces the algorithm to heavily penalize mistakes made on the minority class ("Defaults") so it doesn't ignore them.
- **Evaluation:** Instead of accuracy, models are evaluated heavily on **Recall** (Ability to catch true defaults) and **Precision** (Limiting false alarms) combined using the **F1-Score**. Visual progress is tracked via Confusion Matrices.
