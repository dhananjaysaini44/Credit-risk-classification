import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import os

# Setup Paths (Dynamic)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
METRICS_PATH = os.path.join(BASE_DIR, 'assets', 'eval', 'metrics_log.csv')
OUTPUT_DIR = os.path.join(BASE_DIR, 'assets', 'eval')

def visualize():
    if not os.path.exists(METRICS_PATH):
        print(f"Error: {METRICS_PATH} not found.")
        return

    # Load and Prepare Data
    df = pd.read_csv(METRICS_PATH)
    
    # Reshape data for Seaborn (Melt metrics into a single column)
    df_melted = df.melt(
        id_vars=['Model', 'Version', 'Threshold'], 
        value_vars=['Recall', 'Precision', 'F1-Score'],
        var_name='Metric', value_name='Score'
    )
    
    # Sort for consistent X-axis
    df_melted['Model'] = pd.Categorical(
        df_melted['Model'], 
        categories=['Logistic Regression', 'Optimized Random Forest', 'XGBoost', 'KNN'], 
        ordered=True
    )

    # Visualization Setup
    sns.set_theme(style="whitegrid", context="talk")
    plt.figure(figsize=(15, 6))
    
    # Use FacetGrid for 3 separate metrics
    g = sns.FacetGrid(
        df_melted, col="Metric", hue="Threshold", 
        palette={0.5: "#3498db", 0.4: "#e67e22"},
        height=5, aspect=1.2, sharey=True
    )
    
    # Plot lines + markers
    g.map(sns.lineplot, "Model", "Score", marker="o", markersize=10, linewidth=3)
    
    # Formatting
    g.set_axis_labels("", "Metric Score")
    g.set_titles("{col_name}")
    g.add_legend(title="Threshold")
    
    for ax in g.axes.flat:
        labels = ax.get_xticklabels()
        ax.set_xticklabels(labels, rotation=30, ha='right')
        ax.set_ylim(0, 1.05)

    plt.subplots_adjust(top=0.85)
    g.fig.suptitle("Model Performance Comparison: Threshold 0.5 vs 0.4", fontsize=20, weight='bold')

    # Save Static PNG
    output_path = os.path.join(OUTPUT_DIR, 'model_performance_comparison.png')
    plt.savefig(output_path, bbox_inches='tight', dpi=300)
    plt.close()
    
    print(f"Success: Seaborn visualization saved to {output_path}")

if __name__ == "__main__":
    visualize()
