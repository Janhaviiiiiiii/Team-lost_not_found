
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Send, Bot, User, Lightbulb, TrendingUp, PiggyBank, Shield } from "lucide-react"

const suggestedQuestions = [
  {
    question: "How can I optimize my savings strategy?",
    icon: PiggyBank,
    category: "Savings"
  },
  {
    question: "What's my financial risk assessment?",
    icon: Shield,
    category: "Risk"
  },
  {
    question: "How can I reduce my expenses?",
    icon: TrendingUp,
    category: "Expenses"
  },
  {
    question: "Investment recommendations for my profile?",
    icon: Lightbulb,
    category: "Investment"
  }
]

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Hello! I'm your personal finance AI assistant. I can help you analyze your spending, optimize savings, assess financial risks, and provide personalized recommendations. What would you like to know about your finances?",
      isBot: true,
      timestamp: new Date().toLocaleTimeString()
    }
  ])
  const [inputValue, setInputValue] = useState('')

  const handleSend = () => {
    if (!inputValue.trim()) return

    const newMessage = {
      id: messages.length + 1,
      content: inputValue,
      isBot: false,
      timestamp: new Date().toLocaleTimeString()
    }

    setMessages([...messages, newMessage])
    setInputValue('')

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        content: "I understand your question. Based on your financial profile, I can provide detailed insights. This feature will be connected to our AI backend soon to give you real-time personalized advice.",
        isBot: true,
        timestamp: new Date().toLocaleTimeString()
      }
      setMessages(prev => [...prev, aiResponse])
    }, 1000)
  }

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question)
  }

  return (
    <div className="p-6 max-w-4xl mx-auto animate-fade-in">
      <div className="flex flex-col space-y-2 mb-6">
        <h1 className="text-3xl font-bold">AI Financial Assistant</h1>
        <p className="text-muted-foreground">
          Get personalized financial advice powered by advanced AI
        </p>
      </div>

      {/* Suggested Questions */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            <span>Suggested Questions</span>
          </CardTitle>
          <CardDescription>
            Quick start with these common financial questions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {suggestedQuestions.map((item, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 justify-start text-left"
                onClick={() => handleSuggestedQuestion(item.question)}
              >
                <div className="flex items-start space-x-3">
                  <item.icon className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium">{item.question}</div>
                    <Badge variant="secondary" className="mt-1 text-xs">
                      {item.category}
                    </Badge>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Container */}
      <Card className="h-[600px] flex flex-col">
        <CardHeader>
          <CardTitle>Chat with AI Assistant</CardTitle>
        </CardHeader>
        
        {/* Messages */}
        <CardContent className="flex-1 overflow-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex space-x-3 ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              {message.isBot && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.isBot
                    ? 'bg-muted text-foreground'
                    : 'bg-primary text-primary-foreground ml-auto'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
              </div>

              {!message.isBot && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-secondary">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </CardContent>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about your finances, savings, investments..."
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1"
            />
            <Button onClick={handleSend} disabled={!inputValue.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Chat
