# Credit Risk Classification

![Python](https://img.shields.io/badge/Python-3.13-3776AB?logo=python&logoColor=white) ![Pandas](https://img.shields.io/badge/Pandas-2.0+-150458?logo=pandas&logoColor=white) ![Scikit--Learn](https://img.shields.io/badge/Scikit--Learn-1.3+-F7931E?logo=scikit-learn&logoColor=white) ![XGBoost](https://img.shields.io/badge/XGBoost-2.0+-20BEFF?logo=xgboost&logoColor=white)

## Overview
This project builds a predictive machine learning pipeline to classify if a loan applicant is likely to default on their credit. It utilizes advanced techniques such as SMOTE, interaction engineering, and gradient boosting to handle imbalanced and noisy financial data.

## Project Structure
```text
CRC Project/
├── assets/
│   ├── eda/              # Exploratory Analysis (Correlation, Overlap)
│   ├── eval/             # Model Performance (Confusion Matrices, Threshold Tuning)
│   └── models/           # Saved Model Pipelines (.pkl)
├── data/                 # Raw/Processed Data (.csv)
├── docs/                 # Workflow documentation and planning
├── notebooks/
│   ├── Project.ipynb     # Jupyter Notebook for experimental development
│   ├── preprocessing.py  # Data cleaning and feature engineering
│   ├── balancing.py      # SMOTE class balancing
│   ├── eda.py            # Statistical analysis of raw data
│   ├── eda_resampled.py  # Analysis of balanced data
│   ├── train_model.py    # XGBoost and Baseline training
│   ├── threshold_tuning.py # Probability cutoff analysis
│   └── visualize_signal.py # Signal diagnostic visualizations
├── requirements.txt      # Project dependencies (XGBoost, etc.)
└── README.md             # Project documentation
```

## Methodology and Machine Learning Workflow

### Phase 1: Data Processing Strategy
To ensure our model learns real-world patterns reliably without data leakage, we enforce strict data hygiene:
- **Train-Test Split First**: The raw data is strictly split 80/20 before any statistics are calculated.
- **Scikit-Learn Pipelines**:
  - **SimpleImputer**: Used exclusively to handle missing values based only on the training data mean.
  - **StandardScaler**: Applied to all numeric features so that large-magnitude values do not computationally overwhelm smaller scales.
  - **OrdinalEncoder**: Explicitly orders Education_Level (High School -> PhD).
  - **OneHotEncoder**: Converts categorical variables into binary points.

### Phase 2: Feature Engineering
#### Loan to Income Ratio
Instead of having the algorithm guess the burden of a loan, we explicitly calculate the exact ratio of the requested Loan_Amount against income. A high ratio is functionally one of the most powerful predictors of default risk.

#### Advanced Interaction Engineering
We introduced synthetic interaction terms to create a stronger mathematical separation between classes:
- **Risk Index**: (Loan_Amount / Income) / Credit_Score. This captures the magnitude of risk by weighting the burden of debt against the applicant's reputation.
- **Stability Index**: Credit_Score * Employment_Years. This rewards long-term employment stability combined with high credit honor.

### Phase 3: Model Training and Optimization

#### Addressing Class Imbalance with SMOTE
In our initial analysis, we found a severe class imbalance. This caused baseline models to become biased towards the majority class. We utilized Synthetic Minority Over-sampling Technique (SMOTE) to synthesize new, mathematically plausible minority examples using a K-Nearest Neighbors approach.

#### Gradient Boosting and Hyperparameter Tuning
We deployed XGBoost (eXtreme Gradient Boosting) to handle high variance. We utilized RandomizedSearchCV targeting Recall specifically, as missing a default is significantly more expensive than accidentally rejecting a safe customer.

#### Probability Threshold Tuning
Standard models use a generic 0.50 probability cutoff. However, credit risk is an asymmetric problem. We implement a strategy to lower the threshold (e.g., to 0.30) to catch nearly 100% of defaults, allowing the business to calibrate its specific risk appetite.

## Performance Diagnosis and Results

### The Signal to Noise Barrier
Our signal diagnostic analysis revealed that for this specific dataset, standard features overlap heavily between safe and defaulting customers. This high class overlap (often > 90%) makes it difficult for standard models to find a clear decision boundary without threshold tuning.

### Final Summary of Model Performance
| Strategy | Best Metric | Significance |
| :--- | :--- | :--- |
| **Baseline** | Accuracy (86%) | Misleading due to imbalance; missed most defaults. |
| **SMOTE** | F1-Score (Improved) | Balanced the classes, forcing the model to acknowledge defaults. |
| **Threshold Tuning** | **Recall (Up to 100%)** | Provides a full-risk alert setting for the business. |
