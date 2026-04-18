import os
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import joblib
from sklearn.metrics import f1_score, precision_score, recall_score

# Setup paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODELS_DIR = os.path.join(BASE_DIR, 'assets', 'models')
DATA_DIR = os.path.join(BASE_DIR, 'data')
ASSETS_DIR = os.path.join(BASE_DIR, 'assets', 'eval')

os.makedirs(ASSETS_DIR, exist_ok=True)

def main():
    print("--- Starting F1-Score Optimization ---")
    
    # 1. Load Data
    try:
        X_test = pd.read_csv(os.path.join(DATA_DIR, 'X_test.csv'))
        y_test = pd.read_csv(os.path.join(DATA_DIR, 'y_test.csv'))['Default']
    except FileNotFoundError:
        print("Error: Missing test data. Run preprocessing.py first.")
        return

    # 2. Load Model (Using Logistic Regression as it has the best base signal)
    MODEL_PATH = os.path.join(MODELS_DIR, 'Logistic_Regression.pkl')
    try:
        model = joblib.load(MODEL_PATH)
        print(f"Analyzing model: {MODEL_PATH}")
    except FileNotFoundError:
        print("Error: Model not found. Run train_model.py first.")
        return

    # 3. Get Probabilities
    probs = model.predict_proba(X_test)[:, 1]

    # 4. Search for Max F1
    thresholds = np.arange(0.01, 0.99, 0.01)
    f1_scores = []
    precisions = []
    recalls = []

    for t in thresholds:
        preds = (probs >= t).astype(int)
        f1_scores.append(f1_score(y_test, preds))
        precisions.append(precision_score(y_test, preds, zero_division=0))
        recalls.append(recall_score(y_test, preds))

    # 5. Identify Optimal Point
    max_f1 = max(f1_scores)
    best_t = thresholds[np.argmax(f1_scores)]
    best_recall = recalls[np.argmax(f1_scores)]
    best_precision = precisions[np.argmax(f1_scores)]

    print("\n--- Optimization Result ---")
    print(f"Optimal Threshold: {best_t:.2f}")
    print(f"Max F1-Score:      {max_f1:.4f}")
    print(f"Resulting Recall:    {best_recall:.4f}")
    print(f"Resulting Precision: {best_precision:.4f}")

    # 6. Visualization
    plt.figure(figsize=(10, 6))
    plt.plot(thresholds, f1_scores, label='F1-Score', color='purple', lw=3)
    plt.plot(thresholds, precisions, label='Precision', color='blue', linestyle='--')
    plt.plot(thresholds, recalls, label='Recall', color='green', linestyle='--')
    
    # Highlight the max
    plt.axvline(x=best_t, color='red', linestyle=':', label=f'Optimal T: {best_t:.2f}')
    plt.scatter([best_t], [max_f1], color='red', zorder=5)

    plt.title('F1-Score Optimization (Finding the Perfect Balance)')
    plt.xlabel('Probability Threshold')
    plt.ylabel('Score')
    plt.grid(True, alpha=0.3)
    plt.legend()
    
    plot_path = os.path.join(ASSETS_DIR, 'f1_optimization.png')
    plt.savefig(plot_path)
    plt.close()
    
    print(f"\nOptimization plot saved to: {plot_path}")

if __name__ == "__main__":
    main()
