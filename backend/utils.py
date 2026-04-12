import os
import joblib
import pandas as pd
import numpy as np
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OrdinalEncoder, OneHotEncoder, StandardScaler

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODELS_DIR = os.path.join(BASE_DIR, 'assets', 'models')
DATA_PATH = os.path.join(BASE_DIR, 'data', 'credit_risk_dataset.csv')

class RiskModel:
    def __init__(self):
        self.model = None
        self.preprocessor = None
        self.load()

    def load(self):
        # 1. Load Model
        model_path = os.path.join(MODELS_DIR, 'Logistic_Regression_v2.pkl')
        if os.path.exists(model_path):
            self.model = joblib.load(model_path)
            print(f"Loaded model from {model_path}")
        else:
            print(f"Warning: Model not found at {model_path}")

        # 2. Recreate & Fit Preprocessor (since it wasn't saved)
        self.preprocessor = self._create_preprocessor()
        self._fit_preprocessor()

    def _create_preprocessor(self):
        numeric_features = [
            'Age', 'Income', 'Loan_Amount', 'Credit_Score', 'Employment_Years', 
            'Loan_to_Income_Ratio', 'Stability_Index', 'Risk_Index'
        ]
        numeric_transformer = Pipeline(steps=[
            ('imputer', SimpleImputer(strategy='mean')),
            ('scaler', StandardScaler())
        ])
        
        ordinal_features = ['Education_Level']
        edu_categories = [['High School', 'Bachelors', 'Masters', 'PhD']]
        ordinal_transformer = Pipeline(steps=[
            ('ordinal', OrdinalEncoder(categories=edu_categories))
        ])
        
        nominal_features = ['Housing_Status']
        nominal_transformer = Pipeline(steps=[
            ('onehot', OneHotEncoder(drop='first', sparse_output=False))
        ])
        
        return ColumnTransformer(
            transformers=[
                ('num', numeric_transformer, numeric_features),
                ('ord', ordinal_transformer, ordinal_features),
                ('nom', nominal_transformer, nominal_features)
            ],
            remainder='drop'
        )

    def _fit_preprocessor(self):
        if not os.path.exists(DATA_PATH):
            print(f"Error: Cannot fit preprocessor. Data missing at {DATA_PATH}")
            return

        df = pd.read_csv(DATA_PATH)
        X = df.drop(columns=['Default'])
        
        # Apply same feature engineering as training
        X['Loan_to_Income_Ratio'] = X['Loan_Amount'] / X['Income']
        X['Stability_Index'] = X['Credit_Score'] * X['Employment_Years']
        X['Risk_Index'] = (X['Loan_Amount'] / (X['Income'] + 1)) / (X['Credit_Score'] + 1)
        
        self.preprocessor.fit(X)
        print("Preprocessor successfully fitted on baseline data.")

    def predict(self, input_data: dict):
        if not self.model or not self.preprocessor:
            return None, None

        # Convert input to DataFrame
        df = pd.DataFrame([input_data])
        
        # Mapping frontend names to model names
        mapping = {
            'age': 'Age',
            'income': 'Income',
            'loanAmount': 'Loan_Amount',
            'creditScore': 'Credit_Score',
            'employmentYears': 'Employment_Years',
            'educationLevel': 'Education_Level',
            'housingStatus': 'Housing_Status'
        }
        df = df.rename(columns=mapping)

        # Feature Engineering
        df['Loan_to_Income_Ratio'] = df['Loan_Amount'] / df['Income']
        df['Stability_Index'] = df['Credit_Score'] * df['Employment_Years']
        df['Risk_Index'] = (df['Loan_Amount'] / (df['Income'] + 1)) / (df['Credit_Score'] + 1)

        # Preprocess
        X_processed = self.preprocessor.transform(df)
        
        # Predict
        # Threshold 0.40 as per user's train_model.py
        probs = self.model.predict_proba(X_processed)[:, 1]
        prediction = (probs >= 0.40).astype(int)[0]
        
        return int(prediction), float(probs[0])

risk_engine = RiskModel()
