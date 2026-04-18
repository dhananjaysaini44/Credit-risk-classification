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
MODELS_DIR = os.path.join(BASE_DIR, 'assets', 'models')
EVAL_DIR = os.path.join(BASE_DIR, 'assets', 'eval')
METRICS_PATH = os.path.join(EVAL_DIR, 'metrics_log.csv')

os.makedirs(MODELS_DIR, exist_ok=True)
os.makedirs(EVAL_DIR, exist_ok=True)

# Paths
X_TRAIN_PATH = os.path.join(DATA_DIR, 'X_train_resampled.csv')
Y_TRAIN_PATH = os.path.join(DATA_DIR, 'y_train_resampled.csv')
X_TEST_PATH = os.path.join(DATA_DIR, 'X_test.csv')
Y_TEST_PATH = os.path.join(DATA_DIR, 'y_test.csv')

def load_data():
    X_train = pd.read_csv(X_TRAIN_PATH)
    # The SMOTE scripts might save the target under 'Default' or 'y' - checking the actual files
    target_col = 'Default'
    y_train_df = pd.read_csv(Y_TRAIN_PATH)
    if 'Default' not in y_train_df.columns and '0' in y_train_df.columns:
         y_train = y_train_df['0']
    else:
         y_train = y_train_df[target_col]
         
    y_test_df = pd.read_csv(Y_TEST_PATH)
    if 'Default' not in y_test_df.columns and '0' in y_test_df.columns:
         y_test = y_test_df['0']
    else:
         y_test = y_test_df[target_col]
         
    X_test = pd.read_csv(X_TEST_PATH)
    return X_train, X_test, y_train, y_test

def log_metrics(model_name, threshold, accuracy, precision, recall, f1, version='v2'):
    file_exists = os.path.isfile(METRICS_PATH)
    with open(METRICS_PATH, mode='a', newline='') as f:
        writer = csv.writer(f)
        if not file_exists:
            writer.writerow(['Model', 'Version', 'Threshold', 'Accuracy', 'Precision', 'Recall', 'F1-Score'])
        writer.writerow([model_name, version, threshold, f"{accuracy:.4f}", f"{precision:.4f}", f"{recall:.4f}", f"{f1:.4f}"])

def evaluate_and_save(model, model_name, X_test, y_test, threshold=0.50, version='v2', save_model=True):
    print(f"\n--- Evaluating {model_name} (Threshold: {threshold}, Version: {version}) ---")
    
    # 1. Predictions
    probs = model.predict_proba(X_test)[:, 1]
    predictions = (probs >= threshold).astype(int)
    
    # 2. Metrics Calculation
    acc = accuracy_score(y_test, predictions)
    prec = precision_score(y_test, predictions, zero_division=0)
    rec = recall_score(y_test, predictions, zero_division=0)
    f1 = f1_score(y_test, predictions, zero_division=0)
    
    print(classification_report(y_test, predictions, zero_division=0))
    print(f"F1-Score: {f1:.4f}")

    # 3. Log to CSV
    log_metrics(model_name, threshold, acc, prec, rec, f1, version)
    
    # 4. Confusion Matrix Plot
    cm = confusion_matrix(y_test, predictions)
    disp = ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=['Safe', 'Default'])
    plt.figure(figsize=(8, 6))
    disp.plot(cmap='Blues')
    plt.title(f"{model_name} (Threshold={threshold})")
    
    cm_path = os.path.join(EVAL_DIR, f"{model_name.replace(' ', '_')}_{version}_cm_{threshold}.png")
    plt.savefig(cm_path)
    plt.close()

    # 5. Save Model (only if requested)
    if save_model:
        model_path = os.path.join(MODELS_DIR, f"{model_name.replace(' ', '_')}_{version}.pkl")
        joblib.dump(model, model_path)
        print(f"Model weights saved to {model_path}")

def main():
    X_train, X_test, y_train, y_test = load_data()
    thresholds = [0.50, 0.40]

    # 1. Logistic Regression
    print("\n--- Training Logistic Regression ---")
    lr = LogisticRegression(max_iter=1000, random_state=42)
    lr.fit(X_train, y_train)
    for t in thresholds:
        evaluate_and_save(lr, "Logistic Regression", X_test, y_test, threshold=t, save_model=(t==0.40))

    # 2. Random Forest
    print("\n--- Optimizing Random Forest ---")
    rf_params = {'n_estimators': [100, 200], 'max_depth': [5, 10, None]}
    rf_search = RandomizedSearchCV(RandomForestClassifier(random_state=42), rf_params, n_iter=5, cv=3, scoring='recall', random_state=42)
    rf_search.fit(X_train, y_train)
    for t in thresholds:
        evaluate_and_save(rf_search.best_estimator_, "Optimized Random Forest", X_test, y_test, threshold=t, save_model=(t==0.40))

    # 3. XGBoost
    print("\n--- Training XGBoost ---")
    xgb = XGBClassifier(eval_metric='logloss', random_state=42)
    xgb_params = {'n_estimators': [100, 200], 'learning_rate': [0.01, 0.1], 'max_depth': [3, 6]}
    xgb_search = RandomizedSearchCV(xgb, xgb_params, n_iter=5, cv=3, scoring='recall', random_state=42)
    xgb_search.fit(X_train, y_train)
    for t in thresholds:
        evaluate_and_save(xgb_search.best_estimator_, "XGBoost", X_test, y_test, threshold=t, save_model=(t==0.40))

    # 4. KNN Classifier (Fixed n=21)
    print("\n--- Training KNN Classifier (Strictly n=21) ---")
    knn = KNeighborsClassifier(n_neighbors=21, weights='uniform')
    knn.fit(X_train, y_train)
    for t in thresholds:
        evaluate_and_save(knn, "KNN", X_test, y_test, threshold=t, save_model=(t==0.40))

    print(f"\nSuccess: All models trained and metrics logged to {METRICS_PATH}")

if __name__ == "__main__":
    main()
