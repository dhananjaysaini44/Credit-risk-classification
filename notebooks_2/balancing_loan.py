import os
import pandas as pd
from imblearn.over_sampling import SMOTE

# Setup paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, 'data')

# Inputs
X_TRAIN_PATH = os.path.join(DATA_DIR, 'X_train_loan.csv')
Y_TRAIN_PATH = os.path.join(DATA_DIR, 'y_train_loan.csv')

# Outputs
X_RESAMPLED_PATH = os.path.join(DATA_DIR, 'X_train_resampled_loan.csv')
Y_RESAMPLED_PATH = os.path.join(DATA_DIR, 'y_train_resampled_loan.csv')

def main():
    print("--- Starting SMOTE Balancing for Loan Default Dataset ---")
    
    # 1. Load data
    try:
        X_train = pd.read_csv(X_TRAIN_PATH)
        y_train = pd.read_csv(Y_TRAIN_PATH).iloc[:, 0] # Handle single column df
    except FileNotFoundError:
        print(f"Error: Could not find training data in {DATA_DIR}")
        return
        
    print(f"Original counts:\n{y_train.value_counts()}")

    # 2. Apply SMOTE
    smote = SMOTE(random_state=42)
    X_resampled, y_resampled = smote.fit_resample(X_train, y_train)
    
    print(f"\nNew counts:\n{y_resampled.value_counts()}")
    
    # 3. Save Resampled Data
    X_resampled.to_csv(X_RESAMPLED_PATH, index=False)
    y_resampled.to_csv(Y_RESAMPLED_PATH, index=False)
    
    print(f"\nResampled data saved to: {X_RESAMPLED_PATH}")

if __name__ == "__main__":
    main()
