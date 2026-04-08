import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OrdinalEncoder, OneHotEncoder, StandardScaler

# Setup paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INPUT_DATA_PATH = os.path.join(BASE_DIR, 'data', 'credit_risk_dataset.csv')
OUTPUT_TRAIN_X = os.path.join(BASE_DIR, 'data', 'X_train.csv')
OUTPUT_TEST_X = os.path.join(BASE_DIR, 'data', 'X_test.csv')
OUTPUT_TRAIN_Y = os.path.join(BASE_DIR, 'data', 'y_train.csv')
OUTPUT_TEST_Y = os.path.join(BASE_DIR, 'data', 'y_test.csv')

def main():
    print("--- Starting Correct Preprocessing (Pipeline-Based) ---")
    try:
        df = pd.read_csv(INPUT_DATA_PATH)
    except FileNotFoundError:
        print(f"Error: Could not find data file at {INPUT_DATA_PATH}")
        return
    
    # 1. SPLIT FIRST (Before Any Processing)
    # Target variable is 'Default'
    X = df.drop(columns=['Default'])
    y = df['Default']
    
    # --- FEATURE ENGINEERING ---
    # We produce Loan_to_Income_Ratio prior to splitting so it naturally flows into the handling pipelines.
    # Any rows with missing Income will generate a missing Ratio, which the imputer securely solves next.
    X['Loan_to_Income_Ratio'] = X['Loan_Amount'] / X['Income']
    
    # 80% train, 20% test split. Random state for reproducibility.
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    print(f"Data successfully split -> Train: {X_train.shape[0]} rows, Test: {X_test.shape[0]} rows")

    # Note on Data Leakage:
    # We cannot impute 'Income' using the mean categorized by 'Default' 
    # because 'Default' is the target variable which is hidden during testing/real-world predictions.
    # Doing that is the biggest form of Target Leakage.
    # Instead, we will impute 'Income' using the overall mean calculated ONLY on the training sets.
    
    # 2. DEFINING THE PIPELINES
    
    # Numeric features: Ensure full coverage and scaling.
    # SimpleImputer guarantees safety against future nulls, StandardScaler scales them to 0 mean and 1 variance.
    numeric_features = ['Age', 'Income', 'Loan_Amount', 'Credit_Score', 'Employment_Years', 'Loan_to_Income_Ratio']
    numeric_transformer = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='mean')),
        ('scaler', StandardScaler())
    ])
    
    # Ordinal feature (Education_Level)
    # We define the explicit order that you requested earlier 
    # (High School=0, Bachelors=1, Masters=2, PhD=3)
    ordinal_features = ['Education_Level']
    edu_categories = [['High School', 'Bachelors', 'Masters', 'PhD']]
    ordinal_transformer = Pipeline(steps=[
        ('ordinal', OrdinalEncoder(categories=edu_categories))
    ])
    
    # Nominal feature (Housing_Status)
    nominal_features = ['Housing_Status']
    nominal_transformer = Pipeline(steps=[
        ('onehot', OneHotEncoder(drop='first', sparse_output=False)) # drop='first' avoids multi-collinearity issues
    ])
    
    # 3. COMBINE INTO COLUMN TRANSFORMER
    # Every feature is explicitly handled, so anything missing will be dropped.
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', numeric_transformer, numeric_features),
            ('ord', ordinal_transformer, ordinal_features),
            ('nom', nominal_transformer, nominal_features)
        ],
        remainder='drop'
    )
    
    # 4. FIT ON TRAIN, TRANSFORM ON BOTH
    print("Fitting the preprocessing pipelines exclusively on the Training set...")
    
    # Fit the pipeline on training data and transform it
    X_train_processed = preprocessor.fit_transform(X_train)
    
    # Transform test data using the parameters learned from training data (no leakage!)
    X_test_processed = preprocessor.transform(X_test)
    
    # Extract feature names if possible (OneHotEncoder creates new columns so mapping changes slightly)
    # We'll just convert to DataFrames directly to save as clean files.
    try:
        # For sklearn >= 1.2
        feature_names = preprocessor.get_feature_names_out()
        # Clean up column names (sklearn sometimes prefixes them with step names like 'num__Income')
        feature_names = [name.split('__')[-1] for name in feature_names]
    except Exception:
        feature_names = None # Fallback if error
        
    X_train_final = pd.DataFrame(X_train_processed, columns=feature_names)
    X_test_final = pd.DataFrame(X_test_processed, columns=feature_names)
    
    # 5. SAVE DATASETS
    X_train_final.to_csv(OUTPUT_TRAIN_X, index=False)
    X_test_final.to_csv(OUTPUT_TEST_X, index=False)
    y_train.to_csv(OUTPUT_TRAIN_Y, index=False)
    y_test.to_csv(OUTPUT_TEST_Y, index=False)
    
    print("\n--- Summary ---")
    print("1. Data split into Train and Test perfectly.")
    print("2. Income missing values imputed based on Training set mean.")
    print("3. Education_Level ordinally encoded based on explicit map.")
    print("4. Housing_Status one-hot encoded.")
    print("Outputs saved in the 'data' folder: X_train.csv, X_test.csv, y_train.csv, y_test.csv")

if __name__ == "__main__":
    main()
