import os
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import joblib
from sklearn.metrics import precision_recall_curve, f1_score, confusion_matrix

# Setup paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODELS_DIR = os.path.join(BASE_DIR, 'assets', 'models')
DATA_DIR = os.path.join(BASE_DIR, 'data')
ASSETS_DIR = os.path.join(BASE_DIR, 'assets', 'eval')
os.makedirs(ASSETS_DIR, exist_ok=True)

# Load data (Test set only for evaluation)
X_TEST_PATH = os.path.join(DATA_DIR, 'X_test.csv')
Y_TEST_PATH = os.path.join(DATA_DIR, 'y_test.csv')

def main():
    print("--- Starting Probability Threshold Tuning ---")
    
    # 1. Load Data
    try:
        X_test = pd.read_csv(X_TEST_PATH)
        y_test = pd.read_csv(Y_TEST_PATH)['Default']
    except FileNotFoundError:
        print("Error: Missing test data. Run preprocessing.py first.")
        return

    # 2. Load the best training result (Logistic Regression is best for seeing the prob trade-off)
    MODEL_PATH = os.path.join(MODELS_DIR, 'Logistic_Regression.pkl')
    try:
        model = joblib.load(MODEL_PATH)
        print(f"Loaded model from {MODEL_PATH}")
    except FileNotFoundError:
        print("Error: Required model not found. Run train_model.py first.")
        return

    # 3. Get probabilities
    probs = model.predict_proba(X_test)[:, 1]

    # 4. Precision-Recall Curve
    precision, recall, thresholds = precision_recall_curve(y_test, probs)
    
    # 5. Iterative Threshold Analysis
    results = []
    test_thresholds = np.linspace(0.1, 0.9, 20)
    
    for t in test_thresholds:
        preds = (probs >= t).astype(int)
        cm = confusion_matrix(y_test, preds)
        tn, fp, fn, tp = cm.ravel()
        
        results.append({
            'Threshold': t,
            'Precision': tp / (tp + fp) if (tp + fp) > 0 else 0,
            'Recall': tp / (tp + fn) if (tp + fn) > 0 else 0,
            'F1': f1_score(y_test, preds),
            'Caught_Defaults': tp,
            'False_Alarms': fp
        })
    
    df_res = pd.DataFrame(results)

    # 6. Visualization
    plt.figure(figsize=(12, 6))
    
    plt.subplot(1, 2, 1)
    plt.plot(df_res['Threshold'], df_res['Recall'], label='Recall (Catch Rate)', color='green', lw=2)
    plt.plot(df_res['Threshold'], df_res['Precision'], label='Precision (Accuracy of Alarms)', color='blue', linestyle='--')
    plt.axvline(x=0.5, color='red', linestyle=':', label='Default 0.5 Cutoff')
    plt.title('Threshold vs Performance')
    plt.xlabel('Probability Threshold')
    plt.ylabel('Score')
    plt.legend()

    plt.subplot(1, 2, 2)
    plt.plot(df_res['Threshold'], df_res['Caught_Defaults'], label='Defaults Caught', color='orange', lw=2)
    plt.axhline(y=y_test.sum(), color='black', linestyle='--', label='Total Possible Defaults')
    plt.title('Threshold vs Defaults Caught')
    plt.xlabel('Probability Threshold')
    plt.ylabel('Count')
    plt.legend()

    plt.tight_layout()
    plot_path = os.path.join(ASSETS_DIR, 'threshold_tuning_impact.png')
    plt.savefig(plot_path)
    plt.close()
    
    print(f"\nThreshold impact chart saved to {plot_path}")
    print("\n--- Key Finding ---")
    best_recall_point = df_res[df_res['Recall'] > 0.7].iloc[0] if not df_res[df_res['Recall'] > 0.7].empty else df_res.iloc[0]
    print(f"At Threshold {best_recall_point['Threshold']:.2f}:")
    print(f"- You catch {best_recall_point['Caught_Defaults']} out of {y_test.sum()} actual defaults.")
    print(f"- You generate {best_recall_point['False_Alarms']} false alarms (refusing safe customers).")

if __name__ == "__main__":
    main()
