import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import os
import joblib
import numpy as np
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

# Setup Paths (Dynamic)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
METRICS_PATH = os.path.join(BASE_DIR, 'assets_2', 'eval', 'metrics_log.csv')
OUTPUT_DIR = os.path.join(BASE_DIR, 'assets_2', 'eval')
MODELS_DIR = os.path.join(BASE_DIR, 'assets_2', 'models')
DATA_DIR = os.path.join(BASE_DIR, 'data')

# Processed test data
X_TEST_PATH = os.path.join(DATA_DIR, 'X_test_loan.csv')
Y_TEST_PATH = os.path.join(DATA_DIR, 'y_test_loan.csv')

def load_test_data():
    X_test = pd.read_csv(X_TEST_PATH)
    y_test = pd.read_csv(Y_TEST_PATH).iloc[:, 0]
    return X_test, y_test

def generate_optimization_data(model, X_test, y_test):
    thresholds = np.linspace(0.05, 0.95, 20)
    results = []
    probs = model.predict_proba(X_test)[:, 1]
    for t in thresholds:
        preds = (probs >= t).astype(int)
        results.append({
            'Threshold': t,
            'Accuracy': accuracy_score(y_test, preds),
            'Precision': precision_score(y_test, preds, zero_division=0),
            'Recall': recall_score(y_test, preds, zero_division=0),
            'F1-Score': f1_score(y_test, preds, zero_division=0)
        })
    return pd.DataFrame(results)

def visualize():
    if not os.path.exists(METRICS_PATH):
        print(f"Error: {METRICS_PATH} not found.")
        return

    print("--- Generating Visualizations for Loan Default Dataset (Replicating Metrics Style) ---")
    
    # 1. LOAD AND PREPARE DATA
    df = pd.read_csv(METRICS_PATH)
    
    # Reshape data for Seaborn FacetGrid
    df_melted = df.melt(
        id_vars=['Model', 'Threshold'], 
        value_vars=['Recall', 'Precision', 'F1-Score'],
        var_name='Metric', value_name='Score'
    )
    
    # Sort for consistent X-axis
    df_melted['Model'] = pd.Categorical(
        df_melted['Model'], 
        categories=['Logistic Regression', 'Random Forest', 'XGBoost', 'KNN'], 
        ordered=True
    )

    # 2. MODEL PERFORMANCE COMPARISON (FacetGrid Style)
    sns.set_theme(style="whitegrid", context="talk")
    
    # Update palette to include 0.35
    palette = {0.5: "#3498db", 0.4: "#e67e22", 0.35: "#2ecc71"}
    
    g = sns.FacetGrid(
        df_melted, col="Metric", hue="Threshold", 
        palette=palette,
        height=5, aspect=1.2, sharey=True
    )
    
    # Plot lines + markers
    g.map(sns.lineplot, "Model", "Score", marker="o", markersize=10, linewidth=3)
    
    # Formatting
    g.set_axis_labels("", "Metric Score")
    g.set_titles("{col_name}", weight='bold')
    g.add_legend(title="Threshold")
    
    for ax in g.axes.flat:
        labels = ax.get_xticklabels()
        ax.set_xticklabels(labels, rotation=30, ha='right')
        ax.set_ylim(0, 1.05)

    plt.subplots_adjust(top=0.85)
    g.fig.suptitle("Model Performance Comparison: Multi-Threshold Benchmarking", fontsize=20, weight='bold')

    # Save Comparison
    comp_output_path = os.path.join(OUTPUT_DIR, 'model_performance_comparison.png')
    plt.savefig(comp_output_path, bbox_inches='tight', dpi=300)
    plt.close()
    print(f"Saved: {comp_output_path}")

    # 3. F1 OPTIMIZATION (Styled)
    print("Plotting Threshold Optimization with Benchmark...")
    lr_path = os.path.join(MODELS_DIR, 'Logistic_Regression.pkl')
    if os.path.exists(lr_path):
        X_test, y_test = load_test_data()
        model = joblib.load(lr_path)
        opt_df = generate_optimization_data(model, X_test, y_test)
        
        plt.figure(figsize=(12, 6))
        sns.lineplot(data=opt_df, x='Threshold', y='Accuracy', label='Accuracy', alpha=0.5)
        sns.lineplot(data=opt_df, x='Threshold', y='Precision', label='Precision')
        sns.lineplot(data=opt_df, x='Threshold', y='Recall', label='Recall')
        sns.lineplot(data=opt_df, x='Threshold', y='F1-Score', label='F1-Score', linewidth=4, color='black')
        
        # Add benchmark line at 0.35
        plt.axvline(x=0.35, color='#c0392b', linestyle='--', linewidth=2)
        plt.text(0.36, 0.95, '0.35 Bank Benchmark', color='#c0392b', weight='bold')
        
        plt.title('Threshold Optimization: Finding the Sweet Spot', fontsize=16, weight='bold')
        plt.xlabel('Probability Threshold')
        plt.ylabel('Score')
        plt.legend(bbox_to_anchor=(1.05, 1), loc='upper left')
        plt.grid(True, alpha=0.3)
        
        opt_output_path = os.path.join(OUTPUT_DIR, 'f1_optimization.png')
        plt.savefig(opt_output_path, bbox_inches='tight', dpi=300)
        plt.close()
        print(f"Saved: {opt_output_path}")

    print("\nVisualizations complete!")

if __name__ == "__main__":
    visualize()
