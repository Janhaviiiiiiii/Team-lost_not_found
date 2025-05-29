<h1 align="center">FinBro.ai</h1>
<h3 align="center">Your AI-Powered Personal Finance Companion</h3>

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License: MIT">
  <img src="https://img.shields.io/badge/version-1.0.0-green.svg" alt="Version: 1.0.0">
  <img src="https://img.shields.io/badge/python-3.8+-blue.svg" alt="Python: 3.8+">
  <img src="https://img.shields.io/badge/node-18+-green.svg" alt="Node: 18+">
</p>

## 👥 Team Lost_Not_Found

| Role          | Name                               |
| ------------- | ---------------------------------- |
| **Team Lead** | Janhavi Chavan                     |
| **Members**   | Anchal Tandekar<br> Rejwanul Hoque |

## Project Overview

FinBro.ai is an advanced financial management platform that leverages cutting-edge machine learning models and Google's Gemini AI to provide personalized financial guidance. By analyzing over 40+ financial parameters, including income, expenses, and spending patterns, our system offers accurate savings predictions, risk assessments, and tailored financial advice through an intuitive chat interface.

## 🌟 Key Features

### 1. Smart Financial Dashboard

-   **Financial Overview**: Comprehensive view of income, expenses, and savings
-   **ML-Powered Insights**: Real-time AI predictions for savings goals and risk assessment
-   **Key Metrics**: Essential financial indicators including savings rate and expense ratios
-   **Quick Stats**: Visual breakdowns of financial health metrics

<p align="center">
  <img src="images/1-white-dashboard.png" alt="Smart Financial Dashboard" width="800"/>
</p>

### 2. Advanced Analytics

-   **Savings Potential**: Detailed analysis of potential savings across categories
-   **Expense Efficiency**: Smart scoring of your spending patterns
-   **Financial Health Metrics**: Comprehensive scorecard with target comparisons
-   **Trend Analysis**: Monthly financial patterns and projections

<p align="center">
  <img src="images/2-analytics.png" alt="Advanced Analytics Dashboard" width="800"/>
</p>

### 3. Expense Management

-   **Category Breakdown**: Detailed categorization of monthly expenses
-   **Essential vs Non-Essential**: Smart categorization of spending
-   **Savings Opportunities**: AI-identified areas for potential savings
-   **Spending Insights**: Personalized recommendations for expense optimization

<p align="center">
  <img src="images/3-white-expense.png" alt="Expense Management" width="800"/>
</p>

### 4. Smart Savings Tracker

-   **Goal Progress**: Real-time tracking of savings objectives
-   **AI Confidence Scoring**: ML-powered assessment of goal achievability
-   **Monthly Projections**: Predicted savings trajectories
-   **Personalized Recommendations**: AI-driven savings optimization strategies

<p align="center">
  <img src="images/4-savings.png" alt="Savings Goals Dashboard" width="800"/>
</p>

### 5. Gemini-Powered AI Assistant

-   **Natural Language Interface**: Conversational financial guidance
-   **Contextual Awareness**: Understands your financial profile
-   **Real-time Insights**: Instant responses to financial queries
-   **Personalized Advice**: Custom recommendations based on your data

<p align="center">
  <img src="images/5-chatbot.png" alt="AI Financial Assistant" width="800"/>
</p>

### 6. AI Financial Report Generator

-   **Multi-Model Analysis**: Combines multiple ML models for comprehensive assessment
-   **Risk Profiling**: Advanced financial risk assessment
-   **Savings Achievement Prediction**: ML-powered savings goal analysis
-   **Custom Recommendations**: Tailored financial advice based on 40+ parameters

<p align="center">
  <img src="images/6-white-Report.png" alt="AI Financial Report" width="800"/>
</p>

### 7. AI Prediction Results

-   **Comprehensive Results**: Detailed breakdown of ML model predictions
-   **Confidence Metrics**: Clear visualization of prediction reliability
-   **Risk Assessment**: In-depth analysis of financial risk factors
-   **Action Items**: Specific recommendations for financial improvement

<p align="center">
  <img src="images/7-white-Result.png" alt="AI Prediction Results" width="800"/>
</p>

## 🛠️ Technology Stack

<details>
<summary><strong>Backend Infrastructure</strong></summary>

-   **Core**: Flask (Python 3.8+)
-   **ML Engine**: TensorFlow 2.15.0
-   **AI Integration**: Google Gemini Pro API
-   **Database**: Supabase (PostgreSQL)
-   **Architecture**: RESTful API
</details>

<details>
<summary><strong>Frontend Technologies</strong></summary>

-   **Framework**: React 18.3.1 + TypeScript
-   **UI/UX**: Tailwind CSS + shadcn/ui
-   **State**: React Query
-   **Routing**: React Router DOM v6
-   **Theming**: Dark/Light with next-themes
</details>

<details>
<summary><strong>Machine Learning Models</strong></summary>

#### Architecture

-   Attention-based Neural Networks
-   TensorFlow with Keras API

#### Model Types

1. **Savings Achievement Prediction**

    - Type: Binary Classification
    - Features: 40+ financial parameters
    - Accuracy: 92.5%

2. **Optimal Savings Calculator**

    - Type: Regression
    - Features: 40+ financial parameters
    - RMSE: 0.15

3. **Risk Assessment**
    - Type: Multi-task Learning
    - Features: 40+ financial parameters
    - Accuracy: 89.7%
        </details>

## 📂 Project Structure

```
Team-lost_not_found/
│
├── backend/
│   ├── app.py              # Flask API server
│   ├── chatBot.py          # Gemini AI integration
│   ├── database.py         # Supabase service
│   └── readme.md           # API documentation
│
├── model/
│   ├── feature_info.json   # Model features configuration
│   ├── trained_model/
│   │   ├── best_savings_model.keras
│   │   ├── best_amount_model.keras
│   │   └── best_multi_task_model.keras
│   └── notebooks/          # Training notebooks
│
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Route pages
│   │   ├── services/      # API & Supabase services
│   │   ├── hooks/         # Custom React hooks
│   │   └── types/         # TypeScript definitions
│   ├── public/            # Static assets
│   └── package.json
│
└── data/
    └── processed_financial_data.csv
```

## 🗄️ Database Schema

### Predictions Table

```sql
CREATE TABLE predictions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  input_data JSONB,
  output_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Features

-   **Real-time Sync**: Live updates for predictions and user data
-   **Data Security**: Row-level security policies
-   **JSON Storage**: Flexible schema for ML inputs/outputs
-   **Automatic Timestamps**: Track creation and updates
-   **User Association**: Direct linking with auth system

## 🚀 Getting Started

### Prerequisites

-   Python 3.8+
-   Node.js & npm/pnpm
-   Gemini API key

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Janhaviiiiiiii/Team-lost_not_found.git
cd Team-lost_not_found
```

2. **Set up frontend**

```bash
cd frontend
pnpm install  # or npm install
cd ..
```

3. **Install Python dependencies**

```bash
pip install -r requirements.txt
```

4. **Configure environment**
   Create a `.env` file in the backend directory:
   Create a `.env` file in the root directory:

```env
GEMINI_API_KEY=your_api_key_here
SUPABASE_URL=db_url
SUPABASE_ANON_KEY=anon_key
```

Create a `.env` file in the frontend directory:

```env
VITE_SUPABASE_URL=db_url
VITE_SUPABASE_ANON_KEY=anon_key
```

5. **Run the application from root directory**

```bash
python run.py
```

The application will be available at `http://localhost:5000`

## 🔄 API Endpoints

### 1. Predictions API

```bash
POST /api/predict
Content-Type: application/json

{
  "Income": 44637.25,
  "Age": 49,
  "Dependents": 0,
  ...
}
```

### 2. Chat API

```bash
POST /api/chat
Content-Type: application/json

{
  "message": "How can I improve my savings?"
}
```

## 📋 Future Roadmap

-   Advanced portfolio management features
-   Integration with financial institutions
-   Mobile application development
-   Enhanced ML model accuracy
-   Real-time financial alerts

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

-   Google Gemini API for powering our AI assistant
-   Supabase for database infrastructure
-   TensorFlow team for ML framework
-   shadcn/ui for beautiful components
