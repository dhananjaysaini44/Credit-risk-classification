import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OrdinalEncoder, OneHotEncoder, StandardScaler

# Setup paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INPUT_DATA_PATH = os.path.join(BASE_DIR, 'data', 'Loan_default.csv')
OUTPUT_TRAIN_X = os.path.join(BASE_DIR, 'data', 'X_train_loan.csv')
OUTPUT_TEST_X = os.path.join(BASE_DIR, 'data', 'X_test_loan.csv')
OUTPUT_TRAIN_Y = os.path.join(BASE_DIR, 'data', 'y_train_loan.csv')
OUTPUT_TEST_Y = os.path.join(BASE_DIR, 'data', 'y_test_loan.csv')

def main():
    print("--- Starting Preprocessing for Loan Default Dataset ---")
    try:
        df = pd.read_csv(INPUT_DATA_PATH)
    except FileNotFoundError:
        print(f"Error: Could not find data file at {INPUT_DATA_PATH}")
        return
    
    # 1. SPLIT FIRST
    # Drop LoanID as it is just an identifier
    X = df.drop(columns=['Default', 'LoanID'])
    y = df['Default']
    
    # --- FEATURE ENGINEERING ---
    X['Loan_to_Income_Ratio'] = X['LoanAmount'] / (X['Income'] + 1)
    X['Stability_Index'] = X['CreditScore'] * X['MonthsEmployed']
    
    # 1. Custom Binary Mapping for LoanPurpose: {Other: 0, Others: 1}
    X['LoanPurpose_IsBinary'] = X['LoanPurpose'].apply(lambda x: 0 if x == 'Other' else 1)
    X = X.drop(columns=['LoanPurpose'])
    
    # 80% train, 20% test split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    print(f"Data split -> Train: {X_train.shape[0]}, Test: {X_test.shape[0]}")

    # 2. DEFINING THE PIPELINES
    numeric_features = [
        'Age', 'Income', 'LoanAmount', 'CreditScore', 'MonthsEmployed', 
        'NumCreditLines', 'InterestRate', 'LoanTerm', 'DTIRatio',
        'Loan_to_Income_Ratio', 'Stability_Index', 'LoanPurpose_IsBinary'
    ]
    numeric_transformer = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='mean')),
        ('scaler', StandardScaler())
    ])
    
    # Ordinal features (Education and EmploymentType)
    ordinal_features = ['Education', 'EmploymentType']
    edu_categories = [['High School', "Bachelor's", "Master's", 'PhD']]
    emp_categories = [['Unemployed', 'Part-time', 'Self-employed', 'Full-time']]
    
    ordinal_transformer = Pipeline(steps=[
        ('ordinal', OrdinalEncoder(categories=edu_categories + emp_categories))
    ])
    
    # Nominal features (Updated: removed EmploymentType and LoanPurpose)
    nominal_features = ['MaritalStatus', 'HasMortgage', 'HasDependents', 'HasCoSigner']
    nominal_transformer = Pipeline(steps=[
        ('onehot', OneHotEncoder(drop='first', sparse_output=False))
    ])
    
    # 3. COMBINE
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', numeric_transformer, numeric_features),
            ('ord', ordinal_transformer, ordinal_features),
            ('nom', nominal_transformer, nominal_features)
        ],
        remainder='drop'
    )
    
    # 4. FIT & TRANSFORM
    X_train_processed = preprocessor.fit_transform(X_train)
    X_test_processed = preprocessor.transform(X_test)
    
    # Extract feature names
    feature_names = preprocessor.get_feature_names_out()
    feature_names = [name.split('__')[-1] for name in feature_names]
        
    X_train_final = pd.DataFrame(X_train_processed, columns=feature_names)
    X_test_final = pd.DataFrame(X_test_processed, columns=feature_names)
    
    # 5. SAVE
    X_train_final.to_csv(OUTPUT_TRAIN_X, index=False)
    X_test_final.to_csv(OUTPUT_TEST_X, index=False)
    y_train.to_csv(OUTPUT_TRAIN_Y, index=False)
    y_test.to_csv(OUTPUT_TEST_Y, index=False)
    
    print("\nPreprocessing Complete. Processed files saved with '_loan' suffix in 'data/'.")

if __name__ == "__main__":
    main()
