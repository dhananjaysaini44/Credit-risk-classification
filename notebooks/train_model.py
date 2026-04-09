import os
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import joblib
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier
from sklearn.model_selection import RandomizedSearchCV
from sklearn.metrics import classification_report, confusion_matrix, ConfusionMatrixDisplay

# Setup Directories
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, 'data')
MODELS_DIR = os.path.join(BASE_DIR, 'assets', 'models')
EVAL_DIR = os.path.join(BASE_DIR, 'assets', 'eval')

os.makedirs(MODELS_DIR, exist_ok=True)
os.makedirs(EVAL_DIR, exist_ok=True)

# Paths
X_TRAIN_PATH = os.path.join(DATA_DIR, 'X_train_resampled.csv')
Y_TRAIN_PATH = os.path.join(DATA_DIR, 'y_train_resampled.csv')
X_TEST_PATH = os.path.join(DATA_DIR, 'X_test.csv')
Y_TEST_PATH = os.path.join(DATA_DIR, 'y_test.csv')

def load_data():
    X_train = pd.read_csv(X_TRAIN_PATH)
    y_train = pd.read_csv(Y_TRAIN_PATH)['Default']
    X_test = pd.read_csv(X_TEST_PATH)
    y_test = pd.read_csv(Y_TEST_PATH)['Default']
    return X_train, X_test, y_train, y_test

def evaluate_and_save(model, model_name, X_test, y_test):
    print(f"\n--- Evaluating {model_name} ---")
    predictions = model.predict(X_test)
    print(classification_report(y_test, predictions))
    
    cm = confusion_matrix(y_test, predictions)
    disp = ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=['Safe', 'Default'])
    disp.plot(cmap='Blues')
    plt.title(f"{model_name} Results")
    
    cm_path = os.path.join(EVAL_DIR, f"{model_name.replace(' ', '_')}_cm.png")
    plt.savefig(cm_path)
    plt.close()

    model_path = os.path.join(MODELS_DIR, f"{model_name.replace(' ', '_')}.pkl")
    joblib.dump(model, model_path)
    print(f"Model saved to {model_path}")

def main():
    X_train, X_test, y_train, y_test = load_data()

    # 1. Logistic Regression (Baseline)
    print("\n--- Training Logistic Regression (Baseline) ---")
    lr = LogisticRegression(max_iter=1000, random_state=42)
    lr.fit(X_train, y_train)
    evaluate_and_save(lr, "Logistic Regression", X_test, y_test)

    # 2. Random Forest (Optimized)
    print("\n--- Optimizing Random Forest ---")
    rf_params = {
        'n_estimators': [100, 200],
        'max_depth': [5, 10, None],
        'min_samples_split': [2, 5]
    }
    rf_search = RandomizedSearchCV(RandomForestClassifier(random_state=42), rf_params, n_iter=5, cv=3, scoring='recall', random_state=42)
    rf_search.fit(X_train, y_train)
    evaluate_and_save(rf_search.best_estimator_, "Optimized Random Forest", X_test, y_test)

    # 3. XGBoost (The Heavy Hitter)
    print("\n--- Training XGBoost ---")
    xgb = XGBClassifier(use_label_encoder=False, eval_metric='logloss', random_state=42)
    xgb_params = {
        'n_estimators': [100, 200],
        'learning_rate': [0.01, 0.1],
        'max_depth': [3, 6]
    }
    xgb_search = RandomizedSearchCV(xgb, xgb_params, n_iter=5, cv=3, scoring='recall', random_state=42)
    xgb_search.fit(X_train, y_train)
    evaluate_and_save(xgb_search.best_estimator_, "XGBoost", X_test, y_test)

if __name__ == "__main__":
    main()
