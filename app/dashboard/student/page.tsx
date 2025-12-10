"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Calendar, Clock, TrendingUp, Award, Target, CheckCircle, Bot, Sparkles } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { AIRecommendations } from "@/components/ai-course-recommendations"
import { AIStudyAssistant } from "@/components/ai-study-assistant"

// Mock data for student dashboard
const enrolledCourses = [
  {
    id: "leadership-management",
    title: "Leadership and Management in Healthcare",
    instructor: "Dr. Sarah Johnson",
    progress: 0, // Start at 0%
    totalModules: 3,
    completedModules: 0,
    nextDeadline: "2024-02-15",
    image: "/leadership-management-healthcare.png",
    status: "in-progress",
    description: "Develop essential leadership skills for healthcare professionals",
  },
  {
    id: "anatomy-physiology",
    title: "Human Anatomy & Physiology",
    instructor: "Dr. Michael Chen",
    progress: 65,
    totalModules: 8,
    completedModules: 5,
    nextDeadline: "2024-02-20",
    image: "/human-anatomy-skeleton.png",
    status: "in-progress",
    description: "Comprehensive study of human body systems",
  },
  {
    id: "pharmacology",
    title: "Clinical Pharmacology",
    instructor: "Dr. Emily Rodriguez",
    progress: 90,
    totalModules: 6,
    completedModules: 5,
    nextDeadline: "2024-02-18",
    image: "/pharmacology-pills-medicine.png",
    status: "in-progress",
    description: "Drug interactions and therapeutic applications",
  },
]

const upcomingAssignments = [
  {
    id: 1,
    title: "Healthcare Leadership Case Study",
    course: "Leadership and Management in Healthcare",
    dueDate: "2024-02-15",
    type: "Case Study",
    priority: "high",
  },
  {
    id: 2,
    title: "Cardiovascular System Quiz",
    course: "Human Anatomy & Physiology",
    dueDate: "2024-02-17",
    type: "Quiz",
    priority: "medium",
  },
  {
    id: 3,
    title: "Drug Interaction Analysis",
    course: "Clinical Pharmacology",
    dueDate: "2024-02-20",
    type: "Assignment",
    priority: "low",
  },
]

const recentAchievements = [
  {
    id: 1,
    title: "Module Completion",
    description: "Completed Cardiovascular System module",
    date: "2024-01-28",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    id: 2,
    title: "Perfect Score",
    description: "Scored 100% on Respiratory System quiz",
    date: "2024-01-25",
    icon: Award,
    color: "text-yellow-600",
  },
  {
    id: 3,
    title: "Study Streak",
    description: "7-day learning streak achieved",
    date: "2024-01-22",
    icon: Target,
    color: "text-blue-600",
  },
]

export default function StudentDashboard() {
  const [userName, setUserName] = useState("")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    // Get user info from session storage
    const email = sessionStorage.getItem("userEmail")
    if (email) {
      const name = email
        .split("@")[0]
        .replace(".", " ")
        .replace(/\b\w/g, (l) => l.toUpperCase())
      setUserName(name)
    }

    // Update time every minute
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return "Good morning"
    if (hour < 17) return "Good afternoon"
    return "Good evening"
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header with AI Enhancement */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 rounded-lg p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-20">
          <Sparkles className="w-32 h-32" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-2">
            <Bot className="w-6 h-6" />
            <Badge className="bg-white/20 text-white border-white/30">AI-Powered Learning</Badge>
          </div>
          <h1 className="text-2xl font-bold mb-2">
            {getGreeting()}, {userName || "Student"}!
          </h1>
          <p className="text-blue-100">
            Your AI study assistant has analyzed your progress and prepared personalized recommendations. You have{" "}
            {upcomingAssignments.length} upcoming assignments.
          </p>
        </div>
      </div>

      {/* Enhanced Tabs with AI Features */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Dashboard</TabsTrigger>
          <TabsTrigger value="ai-recommendations" className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4" />
            <span>AI Recommendations</span>
          </TabsTrigger>
          <TabsTrigger value="study-assistant" className="flex items-center space-x-2">
            <Bot className="w-4 h-4" />
            <span>Study Assistant</span>
          </TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Enrolled Courses</p>
                    <p className="text-2xl font-bold">{enrolledCourses.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Avg. Progress</p>
                    <p className="text-2xl font-bold">
                      {Math.round(
                        enrolledCourses.reduce((acc, course) => acc + course.progress, 0) / enrolledCourses.length,
                      )}
                      %
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm text-gray-600">Due This Week</p>
                    <p className="text-2xl font-bold">{upcomingAssignments.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Achievements</p>
                    <p className="text-2xl font-bold">{recentAchievements.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Enrolled Courses */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>My Courses</CardTitle>
                  <CardDescription>Continue your learning journey</CardDescription>
                </div>
                <Link href="/courses">
                  <Button variant="outline" size="sm">
                    View All Courses
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start space-x-4">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{course.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{course.instructor}</p>
                        <div className="flex items-center space-x-2 mb-2">
                          <Progress value={course.progress} className="flex-1" />
                          <span className="text-sm text-gray-600">{course.progress}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {course.completedModules}/{course.totalModules} modules
                          </span>
                          <Link href={`/courses/${course.id}`}>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              {course.progress === 0 ? "Start" : "Continue"}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Assignments */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Assignments</CardTitle>
                <CardDescription>Stay on top of your deadlines</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingAssignments.map((assignment) => (
                  <div key={assignment.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
                      <Badge className={getPriorityColor(assignment.priority)}>{assignment.priority}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{assignment.course}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>Due {assignment.dueDate}</span>
                      </div>
                      <Badge variant="outline">{assignment.type}</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
              <CardDescription>Celebrate your learning milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recentAchievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <achievement.icon className={`w-8 h-8 ${achievement.color}`} />
                    <div>
                      <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                      <p className="text-xs text-gray-500">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-recommendations">
          <AIRecommendations
            userProgress={enrolledCourses}
            userInterests={["healthcare", "leadership", "technology"]}
            completedCourses={["leadership-basics"]}
          />
        </TabsContent>

        <TabsContent value="study-assistant">
          <AIStudyAssistant />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span>Learning Analytics</span>
              </CardTitle>
              <CardDescription>AI-powered insights into your learning patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Study Patterns</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Peak Learning Hours</span>
                      <span className="text-sm font-medium">9 AM - 11 AM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Average Session Length</span>
                      <span className="text-sm font-medium">45 minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Preferred Content Type</span>
                      <span className="text-sm font-medium">Video Lectures</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Retention Rate</span>
                      <span className="text-sm font-medium">87%</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">Performance Insights</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Strongest Subject</span>
                      <span className="text-sm font-medium">Anatomy</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Areas for Improvement</span>
                      <span className="text-sm font-medium">Pharmacology</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Learning Velocity</span>
                      <span className="text-sm font-medium">Above Average</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Engagement Score</span>
                      <span className="text-sm font-medium">92/100</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
