
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart, RadialBarChart, RadialBar, Legend } from 'recharts'
import { TrendingUp, TrendingDown, DollarSign, Target } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const potentialSavingsData = [
  { category: 'Groceries', current: 6658.77, potential: 1685.70, savings: 25.3 },
  { category: 'Utilities', current: 2911.79, potential: 678.29, savings: 23.3 },
  { category: 'Eating Out', current: 1651.80, potential: 465.77, savings: 28.2 },
  { category: 'Transport', current: 2636.97, potential: 328.89, savings: 12.5 },
  { category: 'Entertainment', current: 1536.18, potential: 195.15, savings: 12.7 },
  { category: 'Healthcare', current: 1546.91, potential: 67.68, savings: 4.4 },
  { category: 'Miscellaneous', current: 831.53, potential: 85.74, savings: 10.3 },
]

const expenseEfficiencyData = [
  { name: 'Current Efficiency', value: 28, fill: '#10B981' },
  { name: 'Potential Improvement', value: 72, fill: '#E5E7EB' },
]

const financialHealthData = [
  { metric: 'Savings Rate', current: 13.89, target: 20, status: 'below' },
  { metric: 'Emergency Fund', current: 7.1, target: 100, status: 'critical' },
  { metric: 'Debt Ratio', current: 0, target: 0, status: 'good' },
  { metric: 'Investment Rate', current: 0, target: 15, status: 'none' },
]

const monthlyTrendData = [
  { month: 'Jan', income: 44637, expenses: 30000, savings: 3200 },
  { month: 'Feb', income: 45200, expenses: 29800, savings: 3400 },
  { month: 'Mar', income: 43900, expenses: 30200, savings: 2900 },
  { month: 'Apr', income: 46100, expenses: 29500, savings: 3600 },
  { month: 'May', income: 44637, expenses: 30000, savings: 3200 },
  { month: 'Jun', income: 45800, expenses: 29300, savings: 3700 },
]

const Analytics = () => {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Financial Analytics</h1>
        <p className="text-muted-foreground">
          Deep insights into your spending patterns and optimization opportunities
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Potential Savings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">$3,507</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                18.5% optimization possible
              </span>
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expense Efficiency</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-warning flex items-center">
                <TrendingDown className="h-3 w-3 mr-1" />
                Room for improvement
              </span>
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Highest Savings Category</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Eating Out</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">
                28.2% potential reduction
              </span>
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Financial Stress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">25%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">
                Below average stress level
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Potential Savings by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Optimization Opportunities</CardTitle>
            <CardDescription>Potential savings by expense category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={potentialSavingsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="category" 
                  stroke="#9CA3AF" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                  formatter={(value, name) => [
                    name === 'potential' ? `$${value}` : `${value}%`,
                    name === 'potential' ? 'Potential Savings' : 'Savings %'
                  ]}
                />
                <Bar dataKey="potential" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Financial Trend</CardTitle>
            <CardDescription>Income, expenses, and savings over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={monthlyTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => [`$${Number(value).toLocaleString()}`, '']}
                />
                <Area type="monotone" dataKey="income" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                <Area type="monotone" dataKey="expenses" stackId="2" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} />
                <Area type="monotone" dataKey="savings" stackId="3" stroke="#10B981" fill="#10B981" fillOpacity={0.8} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Expense Efficiency */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Efficiency Score</CardTitle>
            <CardDescription>How efficiently you're managing expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={[{name: 'Efficiency', value: 28, fill: '#10B981'}]}>
                <RadialBar dataKey="value" cornerRadius={10} fill="#10B981" />
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-foreground text-2xl font-bold">
                  28%
                </text>
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="text-center mt-4">
              <Badge variant="outline" className="text-warning border-warning">
                Needs Improvement
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Financial Health Metrics */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Financial Health Scorecard</CardTitle>
            <CardDescription>Key metrics compared to recommended targets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {financialHealthData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      item.status === 'good' ? 'bg-success' :
                      item.status === 'below' ? 'bg-warning' :
                      item.status === 'critical' ? 'bg-destructive' :
                      'bg-muted'
                    }`}></div>
                    <span className="font-medium">{item.metric}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      {item.current}% / {item.target}%
                    </div>
                    <div className={`text-xs ${
                      item.status === 'good' ? 'text-success' :
                      item.status === 'below' ? 'text-warning' :
                      item.status === 'critical' ? 'text-destructive' :
                      'text-muted-foreground'
                    }`}>
                      {item.status === 'good' ? 'On Track' :
                       item.status === 'below' ? 'Below Target' :
                       item.status === 'critical' ? 'Needs Attention' :
                       'Not Started'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Analytics
