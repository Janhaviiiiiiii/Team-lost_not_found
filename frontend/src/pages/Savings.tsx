
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Target, TrendingUp, DollarSign, Calendar, AlertCircle, CheckCircle2, Clock } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const savingsGoals = [
  {
    id: 1,
    name: 'Emergency Fund',
    target: 180000,
    current: 45000,
    deadline: '2025-12-31',
    priority: 'high',
    status: 'in_progress',
    monthlyContribution: 5000,
    category: 'safety'
  },
  {
    id: 2,
    name: 'Investment Portfolio',
    target: 102038,
    current: 15000,
    deadline: '2026-06-30',
    priority: 'medium',
    status: 'in_progress',
    monthlyContribution: 3200,
    category: 'growth'
  },
  {
    id: 3,
    name: 'Vacation Fund',
    target: 25000,
    current: 8500,
    deadline: '2025-07-01',
    priority: 'low',
    status: 'in_progress',
    monthlyContribution: 1000,
    category: 'lifestyle'
  },
  {
    id: 4,
    name: 'Home Renovation',
    target: 75000,
    current: 12000,
    deadline: '2026-12-31',
    priority: 'medium',
    status: 'planning',
    monthlyContribution: 2500,
    category: 'home'
  }
]

const savingsProjection = [
  { month: 'Jan', emergency: 40000, investment: 12000, vacation: 6500, home: 8000 },
  { month: 'Feb', emergency: 45000, investment: 15200, vacation: 7500, home: 10500 },
  { month: 'Mar', emergency: 50000, investment: 18400, vacation: 8500, home: 13000 },
  { month: 'Apr', emergency: 55000, investment: 21600, vacation: 9500, home: 15500 },
  { month: 'May', emergency: 60000, investment: 24800, vacation: 10500, home: 18000 },
  { month: 'Jun', emergency: 65000, investment: 28000, vacation: 11500, home: 20500 },
]

const aiRecommendations = [
  {
    title: 'Accelerate Emergency Fund',
    description: 'Based on your risk profile, prioritize building your emergency fund to 6 months of expenses.',
    impact: 'High',
    timeframe: '12 months',
    action: 'Increase monthly contribution by $2,000'
  },
  {
    title: 'Optimize Investment Strategy',
    description: 'With your current savings rate, you can achieve better returns through diversified investments.',
    impact: 'Medium',
    timeframe: '6 months',
    action: 'Allocate 60% to index funds, 40% to bonds'
  },
  {
    title: 'Automate Savings',
    description: 'Set up automatic transfers to improve consistency and reach goals faster.',
    impact: 'Medium',
    timeframe: '1 month',
    action: 'Setup 3 automatic transfers for different goals'
  }
]

const Savings = () => {
  const totalSavingsTarget = savingsGoals.reduce((sum, goal) => sum + goal.target, 0)
  const totalCurrentSavings = savingsGoals.reduce((sum, goal) => sum + goal.current, 0)
  const overallProgress = (totalCurrentSavings / totalSavingsTarget) * 100

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-success'
      case 'in_progress': return 'text-primary'
      case 'planning': return 'text-warning'
      case 'paused': return 'text-muted-foreground'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle2
      case 'in_progress': return Clock
      case 'planning': return Target
      case 'paused': return AlertCircle
      default: return Clock
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive'
      case 'medium': return 'bg-warning'
      case 'low': return 'bg-success'
      default: return 'bg-muted'
    }
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Savings Goals</h1>
        <p className="text-muted-foreground">
          Track your progress and optimize your savings strategy with AI insights
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCurrentSavings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {overallProgress.toFixed(1)}% of total goals
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Savings</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$11,700</div>
            <p className="text-xs text-success">
              26.2% of income saved
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{savingsGoals.filter(g => g.status === 'in_progress').length}</div>
            <p className="text-xs text-muted-foreground">
              out of {savingsGoals.length} total goals
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Confidence</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">99.9%</div>
            <p className="text-xs text-success">
              Goals achievable
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Savings Goals List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Savings Goals</CardTitle>
            <CardDescription>Track progress towards your financial objectives</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {savingsGoals.map((goal) => {
              const progressPercentage = (goal.current / goal.target) * 100
              const StatusIcon = getStatusIcon(goal.status)
              const monthsToGoal = goal.target > goal.current ? Math.ceil((goal.target - goal.current) / goal.monthlyContribution) : 0
              
              return (
                <div key={goal.id} className="p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getPriorityColor(goal.priority)}`}></div>
                      <div>
                        <h4 className="font-semibold">{goal.name}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <StatusIcon className={`h-4 w-4 ${getStatusColor(goal.status)}`} />
                          <span className={`text-xs capitalize ${getStatusColor(goal.status)}`}>
                            {goal.status.replace('_', ' ')}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {goal.priority} priority
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">
                        ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {monthsToGoal > 0 ? `${monthsToGoal} months left` : 'Goal achieved!'}
                      </div>
                    </div>
                  </div>
                  
                  <Progress value={progressPercentage} className="h-2 mb-2" />
                  
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{progressPercentage.toFixed(1)}% complete</span>
                    <span>${goal.monthlyContribution.toLocaleString()}/month</span>
                  </div>
                </div>
              )
            })}
            
            <Button className="w-full" variant="outline">
              <Target className="h-4 w-4 mr-2" />
              Add New Goal
            </Button>
          </CardContent>
        </Card>

        {/* Savings Projection */}
        <Card>
          <CardHeader>
            <CardTitle>Savings Projection</CardTitle>
            <CardDescription>Projected growth of your savings goals over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={savingsProjection}>
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
                <Line type="monotone" dataKey="emergency" stroke="#EF4444" strokeWidth={2} />
                <Line type="monotone" dataKey="investment" stroke="#10B981" strokeWidth={2} />
                <Line type="monotone" dataKey="vacation" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="home" stroke="#F59E0B" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Recommendations</CardTitle>
          <CardDescription>Personalized suggestions to optimize your savings strategy</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {aiRecommendations.map((rec, index) => (
              <div key={index} className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold">{rec.title}</h4>
                  <Badge variant={rec.impact === 'High' ? 'destructive' : rec.impact === 'Medium' ? 'secondary' : 'outline'}>
                    {rec.impact} Impact
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {rec.description}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs">
                    <Calendar className="h-3 w-3" />
                    <span>Timeline: {rec.timeframe}</span>
                  </div>
                  <div className="text-xs font-medium text-primary">
                    Action: {rec.action}
                  </div>
                </div>
                <Button size="sm" className="w-full mt-3">
                  Implement
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Savings
