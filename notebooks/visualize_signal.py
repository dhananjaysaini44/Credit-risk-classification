import os
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# Setup paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, 'data')
ORIG_PATH = os.path.join(DATA_DIR, 'credit_risk_dataset.csv')
X_RES_PATH = os.path.join(DATA_DIR, 'X_train_resampled.csv')
Y_RES_PATH = os.path.join(DATA_DIR, 'y_train_resampled.csv')
ASSETS_DIR = os.path.join(BASE_DIR, 'assets', 'eda')
os.makedirs(ASSETS_DIR, exist_ok=True)

def main():
    print("--- Starting Signal Diagnostic: Original vs SMOTE Comparison ---")
    
    # 1. Load Data
    try:
        df_orig = pd.read_csv(ORIG_PATH)
        X_res = pd.read_csv(X_RES_PATH)
        y_res = pd.read_csv(Y_RES_PATH)
        df_res = X_res.copy()
        df_res['Default'] = y_res['Default']
    except FileNotFoundError:
        print("Error: Required data files not found. Run preprocessing.py and balancing.py first.")
        return

    # 2. Side-by-Side Correlation Bar Chart
    plt.figure(figsize=(12, 6))
    
    # Original Correlation
    plt.subplot(1, 2, 1)
    corr_orig = df_orig.corr(numeric_only=True)['Default'].drop('Default').sort_values()
    corr_orig.plot(kind='barh', color='skyblue')
    plt.title('Original Data Correlation')
    plt.xlabel('Correlation with Default')
    plt.xlim(-0.2, 0.2)

    # SMOTE Correlation
    plt.subplot(1, 2, 2)
    corr_res = df_res.corr(numeric_only=True)['Default'].drop('Default').sort_values()
    corr_res.plot(kind='barh', color='salmon')
    plt.title('SMOTE Resampled Correlation')
    plt.xlabel('Correlation with Default')
    plt.xlim(-0.2, 0.2)

    plt.tight_layout()
    comp_path = os.path.join(ASSETS_DIR, 'correlation_comparison.png')
    plt.savefig(comp_path)
    plt.close()
    print(f"Comparison chart saved to {comp_path}")

    # 3. Simple Seaborn Correlation Heatmap (Update for SMOTE)
    print("--- Generating SMOTE Correlation Heatmap ---")
    plt.figure(figsize=(8, 6))
    sns.heatmap(df_res.corr(numeric_only=True), annot=True, cmap='coolwarm', fmt=".2f", center=0)
    plt.title('SMOTE Data: Correlation Heatmap')
    
    heatmap_path = os.path.join(ASSETS_DIR, 'smote_correlation_heatmap.png')
    plt.savefig(heatmap_path)
    plt.close()
    print(f"SMOTE correlation heatmap saved to {heatmap_path}")
    
    print("\nObservation: Notice if the bars (right side) are longer than the original (left side). SMOTE artificially strengthens these relationships to help the model learn.")

if __name__ == "__main__":
    main()
