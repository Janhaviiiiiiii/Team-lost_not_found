# backend/chatbot.py

from flask import Blueprint, request, jsonify
import google.generativeai as genai
import json
import os
from dotenv import load_dotenv

load_dotenv()

# Initialize Gemini API
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("Missing GEMINI_API_KEY in .env file")

genai.configure(api_key=GEMINI_API_KEY)

generation_config = {
    "temperature": 0.7,
    "top_p": 1,
    "top_k": 40,
    "max_output_tokens": 512,
}
gemini_model = genai.GenerativeModel(model_name="gemini-1.5-flash-002", generation_config=generation_config)

# File path for persistent data
USER_DATA_FILE = os.path.join(os.path.dirname(__file__), 'user_data.json')

def read_user_data():
    if not os.path.exists(USER_DATA_FILE):
        return {"predictions": []}
    with open(USER_DATA_FILE, 'r') as f:
        return json.load(f)

def get_latest_prediction():
    data = read_user_data()
    return data["predictions"][-1] if data.get("predictions") else None

# Create blueprint
chat_bp = Blueprint('chat_bp', __name__)

@chat_bp.route('/', methods=['POST'])
def chat():
    try:
        user_message = request.json.get('message')
        if not user_message:
            return jsonify({"error": "No message provided"}), 400

        latest = get_latest_prediction()

        if not latest:
            return jsonify({
                "response": "I don't have any saved financial data yet. Please make a savings prediction first!"
            })

        input_data = latest.get("input", {})
        output_data = latest.get("output", {})

        full_prompt = f"""
You are a Personal Finance Advisor chatbot.
The user recently submitted this financial profile:

Income: ₹{input_data.get("Income", "N/A")}
Age: {input_data.get("Age", "N/A")}
Occupation: {input_data.get("Occupation", "N/A")}
City Tier: {input_data.get("City_Tier", "N/A")}
Dependents: {input_data.get("Dependents", "N/A")}

Monthly Expenses:
Rent: ₹{input_data.get("Rent", "N/A")}
Groceries: ₹{input_data.get("Groceries", "N/A")}
Transport: ₹{input_data.get("Transport", "N/A")}
Eating Out: ₹{input_data.get("Eating_Out", "N/A")}
Utilities: ₹{input_data.get("Utilities", "N/A")}
Healthcare: ₹{input_data.get("Healthcare", "N/A")}
Education: ₹{input_data.get("Education", "N/A")}
Miscellaneous: ₹{input_data.get("Miscellaneous", "N/A")}

Savings Goals:
Desired Savings %: {input_data.get("Desired_Savings_Percentage", "N/A")}%
Disposable Income: ₹{input_data.get("Disposable_Income", "N/A")}
Potential Savings Breakdown:
 - Groceries: ₹{input_data.get("Potential_Savings_Groceries", "N/A")}
 - Transport: ₹{input_data.get("Potential_Savings_Transport", "N/A")}
 - Eating Out: ₹{input_data.get("Potential_Savings_Eating_Out", "N/A")}
 - Utilities: ₹{input_data.get("Potential_Savings_Utilities", "N/A")}
 - Healthcare: ₹{input_data.get("Potential_Savings_Healthcare", "N/A")}
 - Education: ₹{input_data.get("Potential_Savings_Education", "N/A")}
 - Miscellaneous: ₹{input_data.get("Potential_Savings_Miscellaneous", "N/A")}

Prediction Results:
Can Achieve Savings: {'✅ Yes' if output_data['savings_model'].get('can_achieve_savings') else '❌ No'}
Confidence: {output_data['savings_model'].get('confidence', 0) * 100:.2f}%
Recommended Monthly Savings: ₹{output_data['amount_model'].get('recommended_savings', 0):,.2f}
Financial Risk: {'⚠️ Yes' if output_data['multi_task_model'].get('financial_risk') else '✅ No'}

Now the user is asking:
"{user_message}"

Always keep your replies within 100 words and Give a helpful, friendly, and personalized answer based on their data and predictions.
"""

        response = gemini_model.generate_content(full_prompt)
        return jsonify({"response": response.text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500