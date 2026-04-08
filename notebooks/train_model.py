import os
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import joblib
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix, ConfusionMatrixDisplay

# Setup Directories
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, 'data')
MODELS_DIR = os.path.join(BASE_DIR, 'assets', 'models')
EVAL_DIR = os.path.join(BASE_DIR, 'assets', 'eval')

os.makedirs(MODELS_DIR, exist_ok=True)
os.makedirs(EVAL_DIR, exist_ok=True)

# Paths
X_TRAIN_PATH = os.path.join(DATA_DIR, 'X_train.csv')
Y_TRAIN_PATH = os.path.join(DATA_DIR, 'y_train.csv')
X_TEST_PATH = os.path.join(DATA_DIR, 'X_test.csv')
Y_TEST_PATH = os.path.join(DATA_DIR, 'y_test.csv')

def load_data():
    print("Loading prepared datasets...")
    X_train = pd.read_csv(X_TRAIN_PATH)
    y_train = pd.read_csv(Y_TRAIN_PATH)['Default']  # Ensure it is a Series
    X_test = pd.read_csv(X_TEST_PATH)
    y_test = pd.read_csv(Y_TEST_PATH)['Default']
    return X_train, X_test, y_train, y_test

def evaluate_and_save(model, model_name, X_test, y_test):
    print(f"\n--- Evaluating {model_name} ---")
    predictions = model.predict(X_test)
    
    # 1. Classification Report
    report = classification_report(y_test, predictions)
    print(report)
    
    # 2. Confusion Matrix Map
    cm = confusion_matrix(y_test, predictions)
    disp = ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=['No Default', 'Default'])
    disp.plot(cmap='Blues')
    plt.title(f"{model_name} - Confusion Matrix")
    
    # Save chart
    cm_path = os.path.join(EVAL_DIR, f"{model_name.replace(' ', '_')}_cm.png")
    plt.savefig(cm_path)
    plt.close()
    print(f"Confusion Matrix saved to {cm_path}")
    
    # 3. Save Model Weights
    model_path = os.path.join(MODELS_DIR, f"{model_name.replace(' ', '_')}.pkl")
    joblib.dump(model, model_path)
    print(f"Model saved to {model_path}")

def main():
    X_train, X_test, y_train, y_test = load_data()
    
    print("\n--- Phase 1: Training Baseline Model (Logistic Regression) ---")
    # Setting class_weight='balanced' to highly penalize missing 'Default' predictions
    lr_model = LogisticRegression(class_weight='balanced', random_state=42, max_iter=1000)
    lr_model.fit(X_train, y_train)
    evaluate_and_save(lr_model, "Logistic Regression", X_test, y_test)
    
    print("\n--- Phase 2: Training Advanced Model (Random Forest) ---")
    # Using Random Forest to capture non-linear feature interactions, heavily respecting minority samples
    rf_model = RandomForestClassifier(class_weight='balanced', random_state=42, n_estimators=100)
    rf_model.fit(X_train, y_train)
    evaluate_and_save(rf_model, "Random Forest", X_test, y_test)

    print("\n--- Modeling Complete! Refer to assets/eval for Visual Results ---")

if __name__ == "__main__":
    main()
