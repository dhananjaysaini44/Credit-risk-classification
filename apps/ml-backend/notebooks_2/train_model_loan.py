import os
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import joblib
import csv
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from xgboost import XGBClassifier
from sklearn.model_selection import RandomizedSearchCV
from sklearn.metrics import (
    classification_report, 
    confusion_matrix, 
    ConfusionMatrixDisplay, 
    f1_score, 
    accuracy_score, 
    precision_score, 
    recall_score
)

# Setup Directories
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, 'data')
MODELS_DIR = os.path.join(BASE_DIR, 'assets_2', 'models')
EVAL_DIR = os.path.join(BASE_DIR, 'assets_2', 'eval')
METRICS_PATH = os.path.join(EVAL_DIR, 'metrics_log.csv')

os.makedirs(MODELS_DIR, exist_ok=True)
os.makedirs(EVAL_DIR, exist_ok=True)

# Paths
X_TRAIN_PATH = os.path.join(DATA_DIR, 'X_train_resampled_loan.csv')
Y_TRAIN_PATH = os.path.join(DATA_DIR, 'y_train_resampled_loan.csv')
X_TEST_PATH = os.path.join(DATA_DIR, 'X_test_loan.csv')
Y_TEST_PATH = os.path.join(DATA_DIR, 'y_test_loan.csv')

def load_data():
    X_train = pd.read_csv(X_TRAIN_PATH)
    y_train = pd.read_csv(Y_TRAIN_PATH).iloc[:, 0]
    X_test = pd.read_csv(X_TEST_PATH)
    y_test = pd.read_csv(Y_TEST_PATH).iloc[:, 0]
    return X_train, X_test, y_train, y_test

def log_metrics(model_name, threshold, accuracy, precision, recall, f1):
    file_exists = os.path.isfile(METRICS_PATH)
    with open(METRICS_PATH, mode='a', newline='') as f:
        writer = csv.writer(f)
        if not file_exists:
            writer.writerow(['Model', 'Threshold', 'Accuracy', 'Precision', 'Recall', 'F1-Score'])
        writer.writerow([model_name, threshold, f"{accuracy:.4f}", f"{precision:.4f}", f"{recall:.4f}", f"{f1:.4f}"])

def evaluate_and_save(model, model_name, X_test, y_test, threshold=0.50):
    print(f"\n--- Evaluating {model_name} (Threshold: {threshold}) ---")
    
    # 1. Predictions
    probs = model.predict_proba(X_test)[:, 1]
    predictions = (probs >= threshold).astype(int)
    
    # 2. Metrics
    acc = accuracy_score(y_test, predictions)
    prec = precision_score(y_test, predictions, zero_division=0)
    rec = recall_score(y_test, predictions, zero_division=0)
    f1 = f1_score(y_test, predictions, zero_division=0)
    
    # 3. Log
    log_metrics(model_name, threshold, acc, prec, rec, f1)
    
    # 4. Confusion Matrix Plot
    cm = confusion_matrix(y_test, predictions)
    disp = ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=['No Default', 'Default'])
    plt.figure(figsize=(8, 6))
    disp.plot(cmap='Blues')
    plt.title(f"{model_name} (Threshold={threshold})")
    
    cm_path = os.path.join(EVAL_DIR, f"{model_name.replace(' ', '_')}_cm_{threshold}.png")
    plt.savefig(cm_path)
    plt.close()

    # 5. Save Model
    model_path = os.path.join(MODELS_DIR, f"{model_name.replace(' ', '_')}.pkl")
    joblib.dump(model, model_path)

def main():
    X_train, X_test, y_train, y_test = load_data()
    thresholds = [0.50, 0.40, 0.35]
    
    # 1. Logistic Regression
    print("\n--- Training Logistic Regression ---")
    lr = LogisticRegression(max_iter=1000, random_state=42)
    lr.fit(X_train, y_train)
    for t in thresholds:
        evaluate_and_save(lr, "Logistic Regression", X_test, y_test, threshold=t)

    # 2. Random Forest
    print("\n--- Training Random Forest ---")
    rf = RandomForestClassifier(n_estimators=100, max_depth=10, random_state=42)
    rf.fit(X_train, y_train)
    for t in thresholds:
        evaluate_and_save(rf, "Random Forest", X_test, y_test, threshold=t)

    # 3. XGBoost
    print("\n--- Training XGBoost ---")
    xgb = XGBClassifier(n_estimators=100, learning_rate=0.1, max_depth=6, eval_metric='logloss', random_state=42)
    xgb.fit(X_train, y_train)
    for t in thresholds:
        evaluate_and_save(xgb, "XGBoost", X_test, y_test, threshold=t)

    # 4. KNN Classifier
    print("\n--- Training KNN Classifier ---")
    knn = KNeighborsClassifier(n_neighbors=21)
    knn.fit(X_train, y_train)
    for t in thresholds:
        evaluate_and_save(knn, "KNN", X_test, y_test, threshold=t)

    print(f"\nTraining Complete! Results in assets_2/eval for thresholds {thresholds}.")

if __name__ == "__main__":
    main()
