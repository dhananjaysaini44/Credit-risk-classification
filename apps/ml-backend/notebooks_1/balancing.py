import os
import pandas as pd
from imblearn.over_sampling import SMOTE

# Setup paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, 'data')

# Inputs
X_TRAIN_PATH = os.path.join(DATA_DIR, 'X_train.csv')
Y_TRAIN_PATH = os.path.join(DATA_DIR, 'y_train.csv')

# Outputs
X_RESAMPLED_PATH = os.path.join(DATA_DIR, 'X_train_resampled.csv')
Y_RESAMPLED_PATH = os.path.join(DATA_DIR, 'y_train_resampled.csv')

def main():
    print("--- Starting SMOTE Balancing ---")
    
    # 1. Load data
    try:
        X_train = pd.read_csv(X_TRAIN_PATH)
        y_train = pd.read_csv(Y_TRAIN_PATH)['Default']
    except FileNotFoundError:
        print(f"Error: Could not find training data in {DATA_DIR}")
        return
        
    print(f"Original class distribution:\n{y_train.value_counts(normalize=True) * 100}")
    print(f"Original counts: {y_train.value_counts().to_dict()}")

    # 2. Apply SMOTE
    # k_neighbors defaults to 5. We use a random_state for consistency.
    smote = SMOTE(random_state=42)
    X_resampled, y_resampled = smote.fit_resample(X_train, y_train)
    
    print("\n--- SMOTE Applied ---")
    print(f"New class distribution:\n{y_resampled.value_counts(normalize=True) * 100}")
    print(f"New counts: {y_resampled.value_counts().to_dict()}")
    
    # 3. Save Resampled Data
    X_resampled.to_csv(X_RESAMPLED_PATH, index=False)
    y_resampled.to_csv(Y_RESAMPLED_PATH, index=False)
    
    print(f"\nResampled data saved to:")
    print(f"- {X_RESAMPLED_PATH}")
    print(f"- {Y_RESAMPLED_PATH}")

if __name__ == "__main__":
    main()
