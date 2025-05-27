from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
import json
import os

app = Flask(__name__)

# Paths
MODEL_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'model')
FEATURE_INFO_FILE = os.path.join(MODEL_DIR, 'feature_info.json')

if not os.path.exists(FEATURE_INFO_FILE):
    raise FileNotFoundError(f"Missing required file: {FEATURE_INFO_FILE}")

with open(FEATURE_INFO_FILE, 'r') as f:
    feature_info = json.load(f)

# Pre-compute feature order for efficiency
FEATURE_ORDER = feature_info['numerical_features'] + feature_info['categorical_features']
TOTAL_FEATURES = len(FEATURE_ORDER)

# Load models once at startup
try:
    savings_model = tf.keras.models.load_model(
        os.path.join(MODEL_DIR, 'trained_model/best_savings_model.keras'), compile=False)
    amount_model = tf.keras.models.load_model(
        os.path.join(MODEL_DIR, 'trained_model/best_amount_model.keras'), compile=False)
    multi_task_model = tf.keras.models.load_model(
        os.path.join(MODEL_DIR, 'trained_model/best_multi_task_model.keras'), compile=False)
except Exception as e:
    raise RuntimeError(f"Error loading models: {e}")

def process_features(data):
    """Efficiently process input data into feature vector"""
    
    # Extract base features
    income = float(data["Income"])
    age = int(data["Age"])
    dependents = int(data["Dependents"])
    occupation = data["Occupation"]
    city_tier = data["City_Tier"]
    
    # Expenses
    expenses = {k: float(data[k]) for k in [
        "Rent", "Loan_Repayment", "Insurance", "Groceries", "Transport",
        "Eating_Out", "Entertainment", "Utilities", "Healthcare", 
        "Education", "Miscellaneous"
    ]}
    
    desired_savings_pct = float(data["Desired_Savings_Percentage"])
    disposable_income = float(data["Disposable_Income"])
    
    # Potential savings
    potential_savings = {k: float(data[k]) for k in [
        "Potential_Savings_Groceries", "Potential_Savings_Transport",
        "Potential_Savings_Eating_Out", "Potential_Savings_Entertainment",
        "Potential_Savings_Utilities", "Potential_Savings_Healthcare",
        "Potential_Savings_Education", "Potential_Savings_Miscellaneous"
    ]}
    
    # Compute derived features efficiently
    total_expenses = sum(expenses.values())
    essential_expenses = sum(expenses[k] for k in ["Rent", "Loan_Repayment", "Groceries", "Transport", "Utilities", "Healthcare"])
    actual_savings_potential = sum(potential_savings.values())
    
    # Build feature array using dictionary for cleaner code
    features = {}
    
    # Numerical features
    features.update({
        "Income": income,
        "Age": age,
        "Dependents": dependents,
        **expenses,
        "Desired_Savings_Percentage": desired_savings_pct,
        "Disposable_Income": disposable_income,
        **potential_savings,
        "Savings_Rate": desired_savings_pct / 100,
        "Actual_Savings_Potential": actual_savings_potential,
        "Essential_Expenses": essential_expenses,
        "Essential_Expense_Ratio": essential_expenses / income,
        "Non_Essential_Income": income - essential_expenses,
        "Expense_Efficiency": actual_savings_potential / disposable_income if disposable_income > 0 else 0,
        "Total_Expenses": total_expenses,
        "Debt_to_Income_Ratio": expenses["Loan_Repayment"] / income,
        "Financial_Stress_Score": 1 - (disposable_income / income)
    })
    
    # Categorical features (one-hot encoding)
    features.update({
        "Occupation_Retired": int(occupation == "Retired"),
        "Occupation_Self_Employed": int(occupation == "Self_Employed"),
        "Occupation_Student": int(occupation == "Student"),
        "City_Tier_Tier_2": int(city_tier == "Tier_2"),
        "City_Tier_Tier_3": int(city_tier == "Tier_3"),
        "Age_Group_Young_Adult": int(age < 25),
        "Age_Group_Mid_Career": int(25 <= age < 40),
        "Age_Group_Pre_Retirement": int(40 <= age < 60),
        "Age_Group_Senior": int(age >= 60),
        "Income_Bracket_Low_Income": int(income < 20000),
        "Income_Bracket_Lower_Mid": int(20000 <= income < 40000),
        "Income_Bracket_Middle": int(40000 <= income < 70000),
        "Income_Bracket_Upper_Mid": int(income >= 70000),
        "Savings_Difficulty_Moderate": 0,  # Placeholder - adjust based on your logic
        "Savings_Difficulty_Very_Hard": 0,  # Placeholder - adjust based on your logic
        "Savings_Difficulty_nan": 1  # Default fallback
    })
    
    # Create feature vector in correct order
    feature_vector = np.array([features[feature_name] for feature_name in FEATURE_ORDER], dtype=np.float32)
    
    return feature_vector.reshape(1, -1)

@app.route('/')
def home():
    return jsonify({"message": "Savings Prediction API Running!", "features_expected": TOTAL_FEATURES})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        if not isinstance(data, dict):
            return jsonify({"error": "Input must be a JSON object"}), 400
        
        # Process features
        X = process_features(data)
        
        # Validate feature count
        if X.shape[1] != TOTAL_FEATURES:
            return jsonify({"error": f"Feature mismatch: expected {TOTAL_FEATURES}, got {X.shape[1]}"}), 400
        
        # Run predictions in parallel (TensorFlow handles this efficiently)
        pred_savings = savings_model.predict(X, verbose=0)[0][0]
        pred_amount = amount_model.predict(X, verbose=0)[0][0]
        pred_multi = multi_task_model.predict(X, verbose=0)
        
        # Build response
        result = {
            "savings_model": {
                "can_achieve_savings": bool(pred_savings > 0.5),
                "confidence": float(pred_savings)
            },
            "amount_model": {
                "recommended_savings": float(pred_amount)
            },
            "multi_task_model": {
                "can_achieve_savings": bool(pred_multi[0][0][0] > 0.5),
                "savings_confidence": float(pred_multi[0][0][0]),
                "recommended_savings_amount": float(pred_multi[1][0][0]),
                "financial_risk": bool(pred_multi[2][0][0] > 0.5),
                "risk_score": float(pred_multi[2][0][0])
            }
        }
        
        return jsonify(result)
        
    except KeyError as e:
        return jsonify({"error": f"Missing required field: {str(e)}"}), 400
    except (ValueError, TypeError) as e:
        return jsonify({"error": f"Invalid data type: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": f"Prediction error: {str(e)}"}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "models_loaded": True})

if __name__ == '__main__':
    app.run(debug=True)