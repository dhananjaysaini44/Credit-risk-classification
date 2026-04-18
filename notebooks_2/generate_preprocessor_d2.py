import pandas as pd
import pickle
import os
from sklearn.preprocessing import StandardScaler, OrdinalEncoder
from sklearn.compose import ColumnTransformer

# Paths
DATA_PATH = 'data/Loan_default.csv'
SAVE_PATH = 'assets_2/models/preprocessor.pkl'

def generate_preprocessor():
    print(f"Loading data from {DATA_PATH}...")
    df = pd.read_csv(DATA_PATH)
    
    # Drop target and irrelevant columns
    X = df.drop(['Default', 'LoanID'], axis=1)
    
    # Identify column types
    categorical_cols = X.select_dtypes(include=['object']).columns.tolist()
    numeric_cols = X.select_dtypes(exclude=['object']).columns.tolist()
    
    print(f"Numeric Columns: {numeric_cols}")
    print(f"Categorical Columns: {categorical_cols}")
    
    # Create transformer
    # Using OrdinalEncoder for categoricals to keep feature count stable
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', StandardScaler(), numeric_cols),
            ('cat', OrdinalEncoder(), categorical_cols)
        ],
        remainder='passthrough'
    )
    
    print("Fitting preprocessor...")
    preprocessor.fit(X)
    
    # Save the artifact
    os.makedirs(os.path.dirname(SAVE_PATH), exist_ok=True)
    with open(SAVE_PATH, 'wb') as f:
        pickle.dump(preprocessor, f)
    
    print(f"Successfully saved preprocessor to {SAVE_PATH}")
    
    # Verify feature names out
    try:
        # Note: get_feature_names_out might require scikit-learn >= 1.0
        features_out = preprocessor.get_feature_names_out()
        print(f"Input features: {len(X.columns)}")
        print(f"Processed features: {len(features_out)}")
    except:
        print("Feature names out verification not supported in this environment.")

if __name__ == "__main__":
    generate_preprocessor()
