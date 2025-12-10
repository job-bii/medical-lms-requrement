"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Sparkles, Brain, TrendingUp, Clock, Users, Star } from "lucide-react"
import Link from "next/link"

interface AIRecommendation {
  id: string
  title: string
  description: string
  instructor: string
  difficulty: string
  duration: string
  rating: number
  students: number
  matchScore: number
  reasons: string[]
  image: string
}

interface AIRecommendationsProps {
  userProgress?: any[]
  userInterests?: string[]
  completedCourses?: string[]
}

export function AIRecommendations({
  userProgress = [],
  userInterests = [],
  completedCourses = [],
}: AIRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [aiInsight, setAiInsight] = useState("")

  useEffect(() => {
    // Simulate AI recommendation generation
    const generateRecommendations = async () => {
      setLoading(true)

      // Simulate AI processing delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock AI-generated recommendations based on user data
      const mockRecommendations: AIRecommendation[] = [
        {
          id: "advanced-diagnostics",
          title: "Advanced Medical Diagnostics with AI",
          description:
            "Learn cutting-edge diagnostic techniques using artificial intelligence and machine learning in clinical practice.",
          instructor: "Dr. Jennifer Liu",
          difficulty: "Advanced",
          duration: "10 weeks",
          rating: 4.9,
          students: 156,
          matchScore: 95,
          reasons: [
            "Builds on your completed Leadership course",
            "Matches your interest in healthcare technology",
            "High demand skill in your field",
            "Recommended by similar learners",
          ],
          image: "/medical-imaging-xray-ct-scan.png",
        },
        {
          id: "clinical-decision-support",
          title: "Clinical Decision Support Systems",
          description: "Master the implementation and optimization of AI-powered clinical decision support tools.",
          instructor: "Dr. Robert Kim",
          difficulty: "Intermediate",
          duration: "8 weeks",
          rating: 4.7,
          students: 203,
          matchScore: 88,
          reasons: [
            "Perfect follow-up to healthcare management",
            "Trending in your specialty area",
            "Matches your learning pace",
            "High job market relevance",
          ],
          image: "/brain-neurology-nervous-system.png",
        },
        {
          id: "precision-medicine",
          title: "Precision Medicine and Genomics",
          description: "Explore personalized medicine approaches using genetic data and AI-driven treatment protocols.",
          instructor: "Dr. Maria Santos",
          difficulty: "Advanced",
          duration: "12 weeks",
          rating: 4.8,
          students: 89,
          matchScore: 82,
          reasons: [
            "Emerging field with high growth potential",
            "Complements your clinical background",
            "Recommended by AI learning path",
            "Limited seats available",
          ],
          image: "/microbiology-bacteria-virus.png",
        },
      ]

      setRecommendations(mockRecommendations)

      // Generate AI insight
      const insights = [
        "Based on your learning pattern, you excel in structured, progressive courses with practical applications.",
        "Your completion rate is 23% higher than average, indicating strong commitment to healthcare technology topics.",
        "Students with similar profiles often pursue AI-enhanced clinical specializations next.",
        "Your learning velocity suggests you're ready for advanced-level content in emerging medical technologies.",
      ]

      setAiInsight(insights[Math.floor(Math.random() * insights.length)])
      setLoading(false)
    }

    generateRecommendations()
  }, [userProgress, userInterests, completedCourses])

  if (loading) {
    return (
      <Card className="border-purple-200">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <div className="animate-spin">
              <Sparkles className="w-5 h-5 text-purple-600" />
            </div>
            <CardTitle className="text-purple-900">AI is analyzing your learning profile...</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-purple-100 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-purple-50 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* AI Insight */}
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-purple-600" />
            <CardTitle className="text-purple-900">AI Learning Insight</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-purple-800 italic">"{aiInsight}"</p>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="border-purple-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <CardTitle className="text-purple-900">AI-Powered Course Recommendations</CardTitle>
            </div>
            <Badge className="bg-purple-600 text-white">Personalized for you</Badge>
          </div>
          <CardDescription className="text-purple-700">
            Curated based on your learning history, interests, and career goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {recommendations.map((course) => (
              <div
                key={course.id}
                className="border border-purple-100 rounded-lg p-4 hover:bg-purple-50 transition-colors"
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{course.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{course.description}</p>
                        <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          <Sparkles className="w-4 h-4 text-purple-600" />
                          <span className="text-lg font-bold text-purple-600">{course.matchScore}%</span>
                        </div>
                        <p className="text-xs text-purple-500">AI Match</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students} students</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{course.rating}</span>
                      </div>
                      <Badge variant="outline">{course.difficulty}</Badge>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Why this course is perfect for you:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {course.reasons.map((reason, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <TrendingUp className="w-3 h-3 text-green-600" />
                            <span className="text-xs text-gray-600">{reason}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Progress value={course.matchScore} className="w-32 h-2" />
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Learn More
                        </Button>
                        <Button asChild size="sm" className="bg-purple-600 hover:bg-purple-700">
                          <Link href={`/courses/${course.id}`}>Enroll Now</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
