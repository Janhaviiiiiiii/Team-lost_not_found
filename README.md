# FinTech Personal Finance Prototype

This project is a prototype for a personal finance application that leverages machine learning to help users optimize their savings and manage their finances. The current version includes a trained ML model and a Flask backend API for local testing and development.

---

## Features

-   **ML-powered predictions**:
    -   Can you achieve your savings goal?
    -   How much should you save?
    -   What is your financial risk profile?
-   **REST API**: Easily integrate with a frontend or test with tools like Postman or curl.
-   **Extensible**: Designed for future integration with a full-stack app.

---

## Project Structure

```
Team-lost_not_found/
│
├── backend/
│   ├── app.py           # Flask API server
│   └── readme.md
│
├── model/
│   ├── feature_info.json
│   ├── trained_model/
│   │   ├── best_savings_model.keras
│   │   ├── best_amount_model.keras
│   │   └── best_multi_task_model.keras
│   └── ... (notebooks, scripts)
│
├── data/
│   ├── data.csv
│   └── processed_financial_data.csv
│
└── frontend/
    └── main.js          # (placeholder for future frontend)
```

---

## Getting Started

### 1. Prerequisites

-   Python 3.8+
-   pip
-   [TensorFlow](https://www.tensorflow.org/install)
-   Flask

Install dependencies:

```bash
pip install flask tensorflow numpy
```

### 2. Run the Backend API

From the `backend` directory:

```bash
python app.py
```

The API will be available at [http://localhost:5000](http://localhost:5000).

### 3. Test the API

Send a POST request to `/predict` with a JSON payload.  
Example using `curl`:

```bash
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d @test.json
```

Where `test.json` contains:

```json
{
    "Income": 44637.25,
    "Age": 49,
    "Dependents": 0,
    "Occupation": "Self_Employed",
    "City_Tier": "Tier_1",
    "Rent": 13391.17,
    "Loan_Repayment": 0.0,
    "Insurance": 2206.49,
    "Groceries": 6658.77,
    "Transport": 2636.97,
    "Eating_Out": 1651.8,
    "Entertainment": 1536.18,
    "Utilities": 2911.79,
    "Healthcare": 1546.91,
    "Education": 0.0,
    "Miscellaneous": 831.53,
    "Desired_Savings_Percentage": 13.89,
    "Disposable_Income": 11265.63,
    "Potential_Savings_Groceries": 1685.7,
    "Potential_Savings_Transport": 328.89,
    "Potential_Savings_Eating_Out": 465.77,
    "Potential_Savings_Entertainment": 195.15,
    "Potential_Savings_Utilities": 678.29,
    "Potential_Savings_Healthcare": 67.68,
    "Potential_Savings_Education": 0.0,
    "Potential_Savings_Miscellaneous": 85.74
}
```

### 4. API Endpoints

-   `GET /`  
    Health check and feature count.

-   `POST /predict`  
    Returns savings prediction, recommended savings amount, and financial risk.

-   `GET /health`  
    Returns API and model status.

---

## Next Steps

-   Build a frontend to interact with the API.
-   Expand ML features and improve model accuracy.
-   Prepare for deployment (Docker, cloud, etc.).

---

## License

This project is for educational and prototyping purposes.

---

## Authors

-   Team Lost Not Found

---

## Notes

-   Ensure `model/feature_info.json` and all `.keras` model files are present.
-   The API expects all features as described in `feature_info.json`.
