
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowUp, ArrowDown, TrendingUp, DollarSign, Target, AlertTriangle } from "lucide-react"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

const userData = {
  Income: 44637.25,
  Age: 49,
  Dependents: 0,
  Occupation: "Self_Employed",
  City_Tier: "Tier_1",
  Disposable_Income: 11265.63,
  Desired_Savings_Percentage: 13.89,
  Savings_Rate: 0.1389,
  Actual_Savings_Potential: 3200.0,
  Essential_Expenses: 22000.0,
  Total_Expenses: 30000.0,
  Financial_Stress_Score: 0.25,
}

const mlResults = {
  savings_model: {
    can_achieve_savings: true,
    confidence: 0.9999999403953552
  },
  amount_model: {
    recommended_savings: 102038.546875
  },
  multi_task_model: {
    can_achieve_savings: true,
    savings_confidence: 0.9999930262565613,
    recommended_savings_amount: 113639.4375,
    financial_risk: true,
    risk_score: 0.8489888310432434
  }
}

const expenseData = [
  { name: 'Rent', value: 13391.17, color: '#8884d8' },
  { name: 'Groceries', value: 6658.77, color: '#82ca9d' },
  { name: 'Utilities', value: 2911.79, color: '#ffc658' },
  { name: 'Transport', value: 2636.97, color: '#ff7300' },
  { name: 'Insurance', value: 2206.49, color: '#00ff00' },
  { name: 'Eating Out', value: 1651.80, color: '#ff0000' },
  { name: 'Healthcare', value: 1546.91, color: '#8dd1e1' },
  { name: 'Entertainment', value: 1536.18, color: '#d084d0' },
  { name: 'Miscellaneous', value: 831.53, color: '#87d068' },
]

const savingsData = [
  { month: 'Jan', actual: 2800, target: 3200 },
  { month: 'Feb', actual: 3100, target: 3200 },
  { month: 'Mar', actual: 2900, target: 3200 },
  { month: 'Apr', actual: 3400, target: 3200 },
  { month: 'May', actual: 3200, target: 3200 },
  { month: 'Jun', actual: 3500, target: 3200 },
]

const Dashboard = () => {
  const savingsGoalProgress = (userData.Actual_Savings_Potential / mlResults.amount_model.recommended_savings) * 100

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Financial Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's your financial overview for this month.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-primary/20 hover:border-primary/40 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${userData.Income.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" />
                +2.1% from last month
              </span>
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/40 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Savings</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${userData.Actual_Savings_Potential.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-warning flex items-center">
                <ArrowDown className="h-3 w-3 mr-1" />
                {(100 - savingsGoalProgress).toFixed(1)}% below target
              </span>
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/40 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Confidence</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(mlResults.savings_model.confidence * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-success">
              High confidence in savings goals
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/40 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {(mlResults.multi_task_model.risk_score * 100).toFixed(0)}%
            </div>
            <p className="text-xs text-warning">
              Elevated financial risk
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense Breakdown */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
            <CardDescription>Monthly spending by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Amount']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Savings Progress */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Savings Progress</CardTitle>
            <CardDescription>Actual vs target savings over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={savingsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => [`$${value}`, '']}
                />
                <Line type="monotone" dataKey="actual" stroke="#10B981" strokeWidth={3} />
                <Line type="monotone" dataKey="target" stroke="#F59E0B" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>AI Financial Insights</CardTitle>
            <CardDescription>Based on your financial data and ML analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3 p-4 rounded-lg bg-success/10 border border-success/20">
              <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
              <div>
                <h4 className="font-semibold text-success">Savings Achievement Likely</h4>
                <p className="text-sm text-muted-foreground">
                  Our AI model predicts with {(mlResults.savings_model.confidence * 100).toFixed(1)}% confidence 
                  that you can achieve your savings goals.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 rounded-lg bg-info/10 border border-info/20">
              <div className="w-2 h-2 bg-info rounded-full mt-2"></div>
              <div>
                <h4 className="font-semibold text-info">Recommended Savings Target</h4>
                <p className="text-sm text-muted-foreground">
                  Based on your profile, we recommend saving ${mlResults.amount_model.recommended_savings.toLocaleString()} 
                  to optimize your financial health.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 rounded-lg bg-warning/10 border border-warning/20">
              <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
              <div>
                <h4 className="font-semibold text-warning">Risk Alert</h4>
                <p className="text-sm text-muted-foreground">
                  Your financial risk score is {(mlResults.multi_task_model.risk_score * 100).toFixed(0)}%. 
                  Consider diversifying your income sources and building an emergency fund.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Savings Rate</span>
                <span className="font-medium">{(userData.Savings_Rate * 100).toFixed(1)}%</span>
              </div>
              <Progress value={userData.Savings_Rate * 100} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Essential vs Total Expenses</span>
                <span className="font-medium">{((userData.Essential_Expenses / userData.Total_Expenses) * 100).toFixed(0)}%</span>
              </div>
              <Progress value={(userData.Essential_Expenses / userData.Total_Expenses) * 100} className="h-2" />
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="text-sm">Age Group</span>
                <Badge variant="secondary">Mid Career</Badge>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm">City Tier</span>
              <Badge variant="outline">{userData.City_Tier}</Badge>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm">Occupation</span>
              <Badge variant="outline">{userData.Occupation.replace('_', ' ')}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
