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
        self.models = {}
        self.preprocessor = None
        self.model_files = {
            'Logistic Regression': 'Logistic_Regression_v2.pkl',
            'Random Forest': 'Optimized_Random_Forest_v2.pkl',
            'XGBoost': 'XGBoost_v2.pkl',
            'KNN': 'KNN_v2.pkl'
        }
        self.load()

    def load(self):
        # 1. Load Preprocessor
        pre_path = os.path.join(MODELS_DIR, 'preprocessor.pkl')
        if os.path.exists(pre_path):
            self.preprocessor = joblib.load(pre_path)
            print(f"Success: Loaded preprocessor from {pre_path}")
        else:
            print(f"Error: Preprocessor not found at {pre_path}")

        # 2. Load all available models
        for name, filename in self.model_files.items():
            path = os.path.join(MODELS_DIR, filename)
            if os.path.exists(path):
                self.models[name] = joblib.load(path)
                print(f"Success: Loaded {name} from {path}")
            else:
                print(f"Critical: {name} not found at {path}")

    def predict(self, input_data: dict, model_name: str):
        """
        Predict probability and class using the specified model.
        Args:
            input_data: Dict of raw feature values
            model_name: Name of the model to use (must be in self.models)
        """
        model = self.models.get(model_name)
        if not model:
            print(f"Error: Model '{model_name}' not found or failed to load.")
            return None, None
            
        if not self.preprocessor:
            print("Error: Preprocessor missing.")
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

        # Feature Engineering (Must match training logic)
        df['Loan_to_Income_Ratio'] = df['Loan_Amount'] / (df['Income'] + 1)
        df['Stability_Index'] = df['Credit_Score'] * df['Employment_Years']
        df['Risk_Index'] = (df['Loan_Amount'] / (df['Income'] + 1)) / (df['Credit_Score'] + 1)

        # Preprocess
        X_processed = self.preprocessor.transform(df)
        
        # Eliminate UserWarning and ValueError by providing exact feature names
        try:
            # Strip prefixes like 'num__', 'nom__', 'ord__' from names
            feature_names = [name.split('__')[-1] for name in self.preprocessor.get_feature_names_out()]
            X_final = pd.DataFrame(X_processed, columns=feature_names)
        except Exception:
            # Fallback if names can't be resolved
            X_final = X_processed

        # Predict
        # Threshold 0.40 as per user's requirement
        probs = model.predict_proba(X_final)[:, 1]
        prediction = (probs >= 0.40).astype(int)[0]
        
        return int(prediction), float(probs[0])

risk_engine = RiskModel()
