import os
import joblib
import pandas as pd
import numpy as np
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OrdinalEncoder, OneHotEncoder, StandardScaler

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODELS_DIR = os.path.join(BASE_DIR, 'assets_2', 'models')

class RiskModel:
    def __init__(self):
        self.models = {}
        self.preprocessor = None
        self.model_files = {
            'Logistic Regression': 'Logistic_Regression.pkl',
            'Random Forest': 'Random_Forest.pkl',
            'XGBoost': 'XGBoost.pkl',
            'KNN': 'KNN.pkl'
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
        model = self.models.get(model_name)
        if not model or not self.preprocessor:
            return None, None

        # 1. Base Feature Mapping (Frontend to Dataset)
        mapping = {
            'age': 'Age', 'income': 'Income', 'loanAmount': 'LoanAmount',
            'creditScore': 'CreditScore', 'monthsEmployed': 'MonthsEmployed',
            'numCreditLines': 'NumCreditLines', 'interestRate': 'InterestRate',
            'loanTerm': 'LoanTerm', 'dtiRatio': 'DTIRatio',
            'education': 'Education', 'employmentType': 'EmploymentType',
            'maritalStatus': 'MaritalStatus', 'hasMortgage': 'HasMortgage',
            'hasDependents': 'HasDependents', 'loanPurpose': 'LoanPurpose',
            'hasCoSigner': 'HasCoSigner'
        }
        
        # 2. Extract Values
        data = {mapping[k]: v for k, v in input_data.items() if k in mapping}
        
        # 3. Feature Engineering
        income = float(data['Income'])
        loan_amount = float(data['LoanAmount'])
        age = int(data['Age'])
        months_employed = int(data['MonthsEmployed'])
        
        data['Loan_to_Income_Ratio'] = loan_amount / (income + 1)
        data['Stability_Index'] = months_employed / (age + 1)
        data['LoanPurpose_IsBinary'] = 1 if data['LoanPurpose'] != 'Other' else 0
        
        # 4. Numerical Scaling (Using loaded preprocessor)
        num_cols = ['Age', 'Income', 'LoanAmount', 'CreditScore', 'MonthsEmployed', 'NumCreditLines', 'InterestRate', 'LoanTerm', 'DTIRatio']
        num_df = pd.DataFrame([data])[num_cols]
        scaler = self.preprocessor.named_transformers_['num']
        num_scaled = scaler.transform(num_df)[0]
        
        # 5. Categorical Encoding (Ordinal Mappings)
        # Education: ["Bachelor's", 'High School', "Master's", 'PhD']
        edu_map = {"Bachelor's": 0, "High School": 1, "Master's": 2, "PhD": 3}
        # EmploymentType: ['Full-time', 'Part-time', 'Self-employed', 'Unemployed']
        emp_map = {'Full-time': 0, 'Part-time': 1, 'Self-employed': 2, 'Unemployed': 3}
        
        education_val = edu_map.get(data['Education'], 0)
        employment_val = emp_map.get(data['EmploymentType'], 0)
        
        # 6. Binary Encodings (Flags)
        marital_married = 1 if data['MaritalStatus'] == 'Married' else 0
        marital_single = 1 if data['MaritalStatus'] == 'Single' else 0
        mortgage_yes = 1 if data['HasMortgage'] == 'Yes' else 0
        dependents_yes = 1 if data['HasDependents'] == 'Yes' else 0
        cosigner_yes = 1 if data['HasCoSigner'] == 'Yes' else 0
        
        # 7. Final 19-Feature Vector Construction
        feature_names = [
            'Age', 'Income', 'LoanAmount', 'CreditScore', 'MonthsEmployed',
            'NumCreditLines', 'InterestRate', 'LoanTerm', 'DTIRatio',
            'Loan_to_Income_Ratio', 'Stability_Index', 'LoanPurpose_IsBinary',
            'Education', 'EmploymentType', 'MaritalStatus_Married',
            'MaritalStatus_Single', 'HasMortgage_Yes', 'HasDependents_Yes',
            'HasCoSigner_Yes'
        ]
        
        X = pd.DataFrame([[
            *num_scaled,                                # 1-9
            data['Loan_to_Income_Ratio'],               # 10
            data['Stability_Index'],                    # 11
            data['LoanPurpose_IsBinary'],               # 12
            education_val,                              # 13
            employment_val,                             # 14
            marital_married,                            # 15
            marital_single,                             # 16
            mortgage_yes,                               # 17
            dependents_yes,                             # 18
            cosigner_yes                                # 19
        ]], columns=feature_names)
        
        # 8. Prediction with standard threshold
        try:
            probs = model.predict_proba(X)[:, 1]
            prediction = (probs >= 0.35).astype(int)[0] # Using original 0.35 safety threshold
            return int(prediction), float(probs[0])
        except Exception as e:
            print(f"Prediction Error: {e}")
            return None, None

risk_engine = RiskModel()
