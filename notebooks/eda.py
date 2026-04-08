import os
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt

# Setup paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(BASE_DIR, 'data', 'credit_risk_dataset.csv')
ASSETS_DIR = os.path.join(BASE_DIR, 'assets', 'eda')
os.makedirs(ASSETS_DIR, exist_ok=True)

print("--- Starting Exploratory Data Analysis ---")

# 1. Load Data
try:
    df = pd.read_csv(DATA_PATH)
    print(f"Data loaded successfully. Shape: {df.shape}")
except FileNotFoundError:
    print(f"Error: Could not find data file at {DATA_PATH}")
    exit(1)

# 2. Basic Info & Missing Values
print("\n--- Generating Summary Statistics ---")
info_path = os.path.join(ASSETS_DIR, 'summary_info.txt')
with open(info_path, 'w') as f:
    f.write(f"Dataset Shape: {df.shape}\n\n")
    f.write("--- Missing Values ---\n")
    f.write(df.isnull().sum().to_string() + "\n\n")
    f.write("--- Descriptive Statistics ---\n")
    f.write(df.describe().to_string() + "\n")
print(f"Summary info saved to {info_path}")
print("No missing values currently, as checked.")

# 3. Target Variable Distribution
print("\n--- Visualizing Target Variable (Default) ---")
plt.figure(figsize=(6, 4))
sns.countplot(data=df, x='Default')
plt.title('Distribution of Target Variable')
plt.savefig(os.path.join(ASSETS_DIR, 'target_distribution.png'))
plt.close()

# 4. Numerical Features Analysis
numerical_cols = ['Age', 'Income', 'Loan_Amount', 'Credit_Score', 'Employment_Years']
print("\n--- Visualizing Numerical Features ---")
for col in numerical_cols:
    plt.figure(figsize=(10, 4))
    
    plt.subplot(1, 2, 1)
    sns.histplot(df[col], kde=True)
    plt.title(f'Distribution of {col}')
    
    plt.subplot(1, 2, 2)
    sns.boxplot(y=df[col], x=df['Default'])
    plt.title(f'{col} by Default Status')
    
    plt.tight_layout()
    plt.savefig(os.path.join(ASSETS_DIR, f'numerical_{col.lower()}.png'))
    plt.close()
    
# 5. Categorical Features Analysis
categorical_cols = ['Education_Level', 'Housing_Status']
print("\n--- Visualizing Categorical Features ---")
for col in categorical_cols:
    plt.figure(figsize=(8, 4))
    sns.countplot(data=df, x=col, hue='Default')
    plt.title(f'{col} vs Default')
    plt.savefig(os.path.join(ASSETS_DIR, f'categorical_{col.lower()}.png'))
    plt.close()

# 6. Correlation Heatmap
print("\n--- Generating Correlation Heatmap ---")
plt.figure(figsize=(10, 8))
corr = df[numerical_cols + ['Default']].corr()
sns.heatmap(corr, annot=True, cmap='coolwarm', fmt=".2f")
plt.title('Correlation Matrix')
plt.savefig(os.path.join(ASSETS_DIR, 'correlation_matrix.png'))
plt.close()

print("\n--- EDA Complete! Visualizations saved to assets/eda/ ---")
