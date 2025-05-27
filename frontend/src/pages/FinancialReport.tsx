
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Slider } from "@/components/ui/slider"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { User, DollarSign, Home, Car, Utensils, Heart, GraduationCap, Brain, TrendingUp, AlertTriangle, CheckCircle, Loader2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

const formSchema = z.object({
  income: z.number().min(0, "Income must be positive"),
  age: z.number().min(18, "Age must be at least 18").max(100, "Age must be realistic"),
  dependents: z.number().min(0, "Dependents cannot be negative"),
  occupation: z.string().min(1, "Please select an occupation"),
  cityTier: z.string().min(1, "Please select a city tier"),
  rent: z.number().min(0, "Rent must be positive"),
  loanRepayment: z.number().min(0, "Loan repayment cannot be negative"),
  insurance: z.number().min(0, "Insurance cannot be negative"),
  groceries: z.number().min(0, "Groceries cannot be negative"),
  transport: z.number().min(0, "Transport cannot be negative"),
  eatingOut: z.number().min(0, "Eating out cannot be negative"),
  entertainment: z.number().min(0, "Entertainment cannot be negative"),
  utilities: z.number().min(0, "Utilities cannot be negative"),
  healthcare: z.number().min(0, "Healthcare cannot be negative"),
  education: z.number().min(0, "Education cannot be negative"),
  miscellaneous: z.number().min(0, "Miscellaneous cannot be negative"),
  desiredSavingsPercentage: z.number().min(0, "Savings percentage cannot be negative").max(100, "Savings percentage cannot exceed 100"),
})

type FormData = z.infer<typeof formSchema>

interface MLModelResponse {
  savings_model: {
    can_achieve_savings: boolean;
    confidence: number;
  };
  amount_model: {
    recommended_savings: number;
  };
  multi_task_model: {
    can_achieve_savings: boolean;
    savings_confidence: number;
    recommended_savings_amount: number;
    financial_risk: boolean;
    risk_score: number;
  };
}

const FinancialReport = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mlResponse, setMlResponse] = useState<MLModelResponse | null>(null)
  const [showResults, setShowResults] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      income: 0,
      age: 30,
      dependents: 0,
      occupation: "",
      cityTier: "",
      rent: 0,
      loanRepayment: 0,
      insurance: 0,
      groceries: 0,
      transport: 0,
      eatingOut: 0,
      entertainment: 0,
      utilities: 0,
      healthcare: 0,
      education: 0,
      miscellaneous: 0,
      desiredSavingsPercentage: 10,
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      console.log("Form data submitted:", data)
      
      // Simulate ML API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock response - replace with actual API response
      const mockResponse: MLModelResponse = {
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
      
      setMlResponse(mockResponse)
      setShowResults(true)
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Error generating report. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getRiskLevel = (score: number) => {
    if (score < 0.3) return { level: "Low", color: "bg-green-500", textColor: "text-green-700" }
    if (score < 0.7) return { level: "Medium", color: "bg-yellow-500", textColor: "text-yellow-700" }
    return { level: "High", color: "bg-red-500", textColor: "text-red-700" }
  }

  if (showResults && mlResponse) {
    const riskInfo = getRiskLevel(mlResponse.multi_task_model.risk_score)
    
    return (
      <div className="space-y-8 animate-fade-in">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                AI Financial Report
              </h1>
              <p className="text-muted-foreground text-lg mt-2">
                Personalized insights powered by machine learning
              </p>
            </div>
            <Button 
              onClick={() => setShowResults(false)} 
              variant="outline" 
              className="rounded-xl"
            >
              Generate New Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Savings Achievement */}
          <Card className="rounded-2xl border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-3 text-xl">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-xl">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <span>Savings Achievement</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Confidence Level</span>
                  <span className="text-sm font-bold">{(mlResponse.savings_model.confidence * 100).toFixed(1)}%</span>
                </div>
                <Progress value={mlResponse.savings_model.confidence * 100} className="h-3" />
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-white/50 dark:bg-black/20 rounded-xl">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <p className="font-semibold text-lg">You can achieve your savings goals!</p>
                  <p className="text-sm text-muted-foreground">High probability of success</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Assessment */}
          <Card className="rounded-2xl border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-3 text-xl">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                </div>
                <span>Financial Risk</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Risk Score</span>
                  <Badge variant="outline" className={`${riskInfo.textColor} border-current`}>
                    {riskInfo.level}
                  </Badge>
                </div>
                <Progress 
                  value={mlResponse.multi_task_model.risk_score * 100} 
                  className="h-3"
                />
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-white/50 dark:bg-black/20 rounded-xl">
                <AlertTriangle className={`h-8 w-8 ${riskInfo.textColor}`} />
                <div>
                  <p className="font-semibold text-lg">{riskInfo.level} Risk Level</p>
                  <p className="text-sm text-muted-foreground">
                    Score: {(mlResponse.multi_task_model.risk_score * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommended Savings */}
          <Card className="rounded-2xl border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 lg:col-span-2">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-3 text-xl">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <span>AI Recommendations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="p-6 bg-white/50 dark:bg-black/20 rounded-xl">
                    <h3 className="text-lg font-semibold mb-2">Standard Model</h3>
                    <p className="text-3xl font-bold text-blue-600">
                      ${mlResponse.amount_model.recommended_savings.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">Recommended annual savings</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-6 bg-white/50 dark:bg-black/20 rounded-xl">
                    <h3 className="text-lg font-semibold mb-2">Multi-Task AI Model</h3>
                    <p className="text-3xl font-bold text-indigo-600">
                      ${mlResponse.multi_task_model.recommended_savings_amount.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">Advanced AI recommendation</p>
                    <div className="mt-3 flex items-center space-x-2">
                      <span className="text-xs">Confidence:</span>
                      <Badge variant="secondary">
                        {(mlResponse.multi_task_model.savings_confidence * 100).toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          AI Financial Report
        </h1>
        <p className="text-muted-foreground text-lg">
          Get personalized financial insights powered by machine learning
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Personal Information */}
          <Card className="rounded-2xl border-0 shadow-lg">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center space-x-3 text-2xl">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <span>Personal Information</span>
              </CardTitle>
              <CardDescription className="text-base">Basic details about yourself</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">Age</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field} 
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="rounded-xl h-12 text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dependents"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">Number of Dependents</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field} 
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="rounded-xl h-12 text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="occupation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">Occupation</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-xl h-12 text-base">
                          <SelectValue placeholder="Select your occupation" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Self_Employed">Self Employed</SelectItem>
                        <SelectItem value="Employed">Employed</SelectItem>
                        <SelectItem value="Student">Student</SelectItem>
                        <SelectItem value="Retired">Retired</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cityTier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">City Tier</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-xl h-12 text-base">
                          <SelectValue placeholder="Select your city tier" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Tier_1">Tier 1 (Metro)</SelectItem>
                        <SelectItem value="Tier_2">Tier 2</SelectItem>
                        <SelectItem value="Tier_3">Tier 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Income & Savings */}
          <Card className="rounded-2xl border-0 shadow-lg">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center space-x-3 text-2xl">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <span>Income & Savings Goals</span>
              </CardTitle>
              <CardDescription className="text-base">Your monthly income and savings targets</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="income"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">Monthly Income ($)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field} 
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="rounded-xl h-12 text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="desiredSavingsPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">Desired Savings Percentage: {field.value}%</FormLabel>
                    <FormControl>
                      <Slider
                        min={0}
                        max={50}
                        step={1}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                        className="mt-6"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Housing & Fixed Expenses */}
          <Card className="rounded-2xl border-0 shadow-lg">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center space-x-3 text-2xl">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Home className="h-6 w-6 text-primary" />
                </div>
                <span>Housing & Fixed Expenses</span>
              </CardTitle>
              <CardDescription className="text-base">Monthly housing and fixed costs</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { name: 'rent', label: 'Rent/Mortgage ($)' },
                { name: 'utilities', label: 'Utilities ($)' },
                { name: 'insurance', label: 'Insurance ($)' },
                { name: 'loanRepayment', label: 'Loan Repayment ($)' }
              ].map((field) => (
                <FormField
                  key={field.name}
                  control={form.control}
                  name={field.name as keyof FormData}
                  render={({ field: formField }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">{field.label}</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...formField} 
                          onChange={(e) => formField.onChange(Number(e.target.value))}
                          className="rounded-xl h-12 text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </CardContent>
          </Card>

          {/* Variable Expenses */}
          <Card className="rounded-2xl border-0 shadow-lg">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center space-x-3 text-2xl">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Utensils className="h-6 w-6 text-primary" />
                </div>
                <span>Lifestyle & Variable Expenses</span>
              </CardTitle>
              <CardDescription className="text-base">Monthly variable and lifestyle costs</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: 'groceries', label: 'Groceries ($)' },
                { name: 'transport', label: 'Transport ($)' },
                { name: 'eatingOut', label: 'Eating Out ($)' },
                { name: 'entertainment', label: 'Entertainment ($)' },
                { name: 'healthcare', label: 'Healthcare ($)' },
                { name: 'education', label: 'Education ($)' },
                { name: 'miscellaneous', label: 'Miscellaneous ($)' }
              ].map((field) => (
                <FormField
                  key={field.name}
                  control={form.control}
                  name={field.name as keyof FormData}
                  render={({ field: formField }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">{field.label}</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...formField} 
                          onChange={(e) => formField.onChange(Number(e.target.value))}
                          className="rounded-xl h-12 text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </CardContent>
          </Card>

          <div className="flex justify-center pt-8">
            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="w-full md:w-auto px-12 h-14 text-lg rounded-2xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                  Generating AI Report...
                </>
              ) : (
                <>
                  <Brain className="mr-3 h-5 w-5" />
                  Generate AI Financial Report
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default FinancialReport
