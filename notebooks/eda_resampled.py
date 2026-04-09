import os
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# Setup paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, 'data')
ASSETS_DIR = os.path.join(BASE_DIR, 'assets', 'eda')
os.makedirs(ASSETS_DIR, exist_ok=True)

# File Paths
Y_TRAIN_PATH = os.path.join(DATA_DIR, 'y_train.csv')
Y_RESAMPLED_PATH = os.path.join(DATA_DIR, 'y_train_resampled.csv')
X_TRAIN_PATH = os.path.join(DATA_DIR, 'X_train.csv')
X_RESAMPLED_PATH = os.path.join(DATA_DIR, 'X_train_resampled.csv')

def main():
    print("--- Visualizing SMOTE Resampling Results ---")
    
    # 1. Load data
    try:
        y_orig = pd.read_csv(Y_TRAIN_PATH)['Default']
        y_res = pd.read_csv(Y_RESAMPLED_PATH)['Default']
        X_orig = pd.read_csv(X_TRAIN_PATH)
        X_res = pd.read_csv(X_RESAMPLED_PATH)
    except FileNotFoundError:
        print("Error: Required data files not found. Run preprocessing.py and balancing.py first.")
        return

    # 2. Target Distribution Comparison
    plt.figure(figsize=(12, 5))
    
    plt.subplot(1, 2, 1)
    sns.countplot(x=y_orig, palette='viridis')
    plt.title('Original Training Distribution')
    plt.xlabel('Default (0=No, 1=Yes)')
    
    plt.subplot(1, 2, 2)
    sns.countplot(x=y_res, palette='viridis')
    plt.title('SMOTE Balanced Distribution')
    plt.xlabel('Default (0=No, 1=Yes)')
    
    plt.tight_layout()
    comparison_path = os.path.join(ASSETS_DIR, 'smote_target_comparison.png')
    plt.savefig(comparison_path)
    plt.close()
    print(f"Target distribution comparison saved to {comparison_path}")

    # 3. Feature Distribution Check (Example: Age)
    # We want to ensure synthetic data follows similar distribution ranges
    plt.figure(figsize=(10, 5))
    sns.kdeplot(X_orig['Age'], label='Original', fill=True, alpha=0.3)
    sns.kdeplot(X_res['Age'], label='Resampled (SMOTE)', fill=True, alpha=0.3)
    plt.title('Age Distribution Comparison (Before vs After SMOTE)')
    plt.legend()
    
    feature_check_path = os.path.join(ASSETS_DIR, 'smote_feature_check.png')
    plt.savefig(feature_check_path)
    plt.close()
    print(f"Feature distribution check saved to {feature_check_path}")
    
    print("\n--- EDA for SMOTE Complete! ---")

if __name__ == "__main__":
    main()
