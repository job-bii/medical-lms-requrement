"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, Send, Lightbulb, Brain, Sparkles, Clock, Target, TrendingUp } from "lucide-react"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
  suggestions?: string[]
}

interface StudyInsight {
  type: "tip" | "reminder" | "achievement" | "recommendation"
  title: string
  content: string
  icon: any
  color: string
}

export function AIStudyAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hello! I'm your AI Study Assistant. I can help you with course content, study strategies, and answer questions about your medical education. What would you like to know?",
      timestamp: new Date(),
      suggestions: ["Explain pharmacokinetics", "Create a study plan", "Quiz me on anatomy", "Summarize my progress"],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const studyInsights: StudyInsight[] = [
    {
      type: "tip",
      title: "Study Tip",
      content:
        "Based on your learning pattern, you retain information better when studying in 25-minute focused sessions.",
      icon: Lightbulb,
      color: "text-yellow-600",
    },
    {
      type: "reminder",
      title: "Study Reminder",
      content: "You have a quiz on Healthcare Leadership due in 2 days. Review Module 1 materials.",
      icon: Clock,
      color: "text-blue-600",
    },
    {
      type: "achievement",
      title: "Achievement Unlocked",
      content: "You've maintained a 7-day study streak! Keep up the excellent work.",
      icon: Target,
      color: "text-green-600",
    },
    {
      type: "recommendation",
      title: "AI Recommendation",
      content: "Consider reviewing cardiovascular system concepts before starting the next module.",
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock AI responses based on keywords
    const responses = {
      pharmacokinetics:
        "Pharmacokinetics involves four key processes: Absorption, Distribution, Metabolism, and Excretion (ADME). Absorption is how drugs enter the bloodstream, distribution is how they spread throughout the body, metabolism is how they're broken down (primarily in the liver), and excretion is how they're eliminated (mainly through kidneys). Would you like me to elaborate on any of these processes?",

      "study plan":
        "Based on your current progress and upcoming deadlines, I recommend this study schedule:\n\n📚 Week 1-2: Complete Leadership Module 2\n🧠 Week 3: Review and practice quizzes\n📝 Week 4: Focus on upcoming assignments\n\nI'll send you daily reminders and adjust the plan based on your progress. Would you like me to create a detailed daily schedule?",

      anatomy:
        "Let's test your anatomy knowledge! Here's a question: Which chamber of the heart receives oxygenated blood from the lungs? A) Right atrium B) Left atrium C) Right ventricle D) Left ventricle. Take your time to think about it!",

      progress:
        "Here's your current progress summary:\n\n📊 Overall Progress: 52%\n📚 Courses Enrolled: 4\n✅ Modules Completed: 8/15\n🏆 Achievements: 12\n📈 Study Streak: 7 days\n\nYou're performing excellently! Your completion rate is 23% above average. Keep focusing on consistent daily study sessions.",

      default:
        "I understand you're asking about medical education topics. Could you be more specific about what you'd like to learn? I can help with:\n\n• Course content explanations\n• Study strategies and planning\n• Quiz preparation\n• Progress tracking\n• Medical terminology\n• Assignment guidance\n\nWhat specific topic interests you most?",
    }

    // Find matching response
    const lowerMessage = userMessage.toLowerCase()
    for (const [key, response] of Object.entries(responses)) {
      if (key !== "default" && lowerMessage.includes(key)) {
        return response
      }
    }

    return responses.default
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    try {
      const aiResponse = await generateAIResponse(inputValue)

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: aiResponse,
        timestamp: new Date(),
        suggestions: ["Tell me more", "Give me an example", "Create a quiz", "What's next?"],
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Error generating AI response:", error)
    } finally {
      setIsTyping(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="space-y-6">
      {/* Study Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {studyInsights.map((insight, index) => (
          <Card key={index} className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <insight.icon className={`w-5 h-5 ${insight.color} mt-0.5`} />
                <div>
                  <p className="font-semibold text-sm text-gray-900">{insight.title}</p>
                  <p className="text-xs text-gray-600 mt-1">{insight.content}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Chat Interface */}
      <Card className="border-blue-200">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Bot className="w-6 h-6 text-blue-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <CardTitle className="text-blue-900">AI Study Assistant</CardTitle>
              <CardDescription className="text-blue-700">
                Powered by advanced medical education AI • Always learning
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* Messages */}
          <ScrollArea className="h-96 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] ${message.type === "user" ? "order-2" : "order-1"}`}>
                    <div
                      className={`flex items-start space-x-2 ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.type === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                        }`}
                      >
                        {message.type === "user" ? (
                          <span className="text-sm font-semibold">U</span>
                        ) : (
                          <Sparkles className="w-4 h-4" />
                        )}
                      </div>
                      <div
                        className={`rounded-lg p-3 ${
                          message.type === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <p className={`text-xs mt-1 ${message.type === "user" ? "text-blue-100" : "text-gray-500"}`}>
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>

                    {/* AI Suggestions */}
                    {message.type === "ai" && message.suggestions && (
                      <div className="mt-2 ml-10 flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="text-xs h-7 border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white flex items-center justify-center">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about your medical studies..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
              <Brain className="w-3 h-3" />
              <span>AI Assistant is ready to help with medical education topics</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
