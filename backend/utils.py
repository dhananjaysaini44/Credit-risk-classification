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
            print(f"Success: Loaded model from {model_path}")
        else:
            print(f"Critical: Model not found at {model_path}")

        # 2. Load Preprocessor
        pre_path = os.path.join(MODELS_DIR, 'preprocessor.pkl')
        if os.path.exists(pre_path):
            self.preprocessor = joblib.load(pre_path)
            print(f"Success: Loaded preprocessor from {pre_path}")
        else:
            print(f"Error: Preprocessor not found at {pre_path}")

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
