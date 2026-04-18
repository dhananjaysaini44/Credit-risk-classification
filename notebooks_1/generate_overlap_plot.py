import os
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Setup paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, 'data')
EDA_DIR = os.path.join(BASE_DIR, 'assets', 'eda')

os.makedirs(EDA_DIR, exist_ok=True)

def main():
    print("--- Generating Overlap Analysis Plot ---")
    
    # 1. Load Data
    try:
        # Load processed data to get the engineered features
        X_train = pd.read_csv(os.path.join(DATA_DIR, 'X_train.csv'))
        y_train = pd.read_csv(os.path.join(DATA_DIR, 'y_train.csv'))['Default']
    except FileNotFoundError:
        print("Error: Training data not found. Run preprocessing.py first.")
        return

    # Combine for plotting
    df = X_train.copy()
    df['Default'] = y_train

    # 2. Plot Overlap (Using Risk_Index as it is our most important feature)
    plt.figure(figsize=(10, 6))
    
    # KDE plot to show density overlap
    sns.kdeplot(data=df[df['Default'] == 0], x='Risk_Index', label='Safe (Non-Default)', fill=True, color='blue', alpha=0.4)
    sns.kdeplot(data=df[df['Default'] == 1], x='Risk_Index', label='Default', fill=True, color='red', alpha=0.4)
    
    plt.title('Overlap Analysis: Risk Index Distribution by Class')
    plt.xlabel('Risk Index (Higher = More Theoretical Risk)')
    plt.ylabel('Density')
    plt.grid(True, alpha=0.2)
    plt.legend()

    # Save to requested path
    save_path = os.path.join(EDA_DIR, 'overlap_analysis.png')
    plt.savefig(save_path)
    plt.close()
    
    print(f"Success: Plot saved to {save_path}")

if __name__ == "__main__":
    main()
