"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  BookOpen,
  CheckCircle,
  DollarSign,
  Brain,
  Sparkles,
  Bot,
  BarChart3,
  Target,
  Zap,
  Plus,
} from "lucide-react"
import Link from "next/link"

const systemStats = {
  totalUsers: 1247,
  totalCourses: 89,
  totalInstructors: 23,
  activeStudents: 892,
  completionRate: 78,
  revenue: 125000,
  aiInteractions: 15420,
  aiAccuracy: 94.2,
}

const recentActivities = [
  {
    id: 1,
    type: "enrollment",
    message: "15 new students enrolled in Leadership course",
    timestamp: "2 hours ago",
    icon: Users,
    color: "text-blue-600",
  },
  {
    id: 2,
    type: "ai-interaction",
    message: "AI Study Assistant answered 127 questions today",
    timestamp: "3 hours ago",
    icon: Bot,
    color: "text-purple-600",
  },
  {
    id: 3,
    type: "completion",
    message: "8 students completed Pharmacology course",
    timestamp: "5 hours ago",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    id: 4,
    type: "content",
    message: "AI generated 12 new quiz questions",
    timestamp: "6 hours ago",
    icon: Sparkles,
    color: "text-yellow-600",
  },
]

const aiInsights = [
  {
    title: "Learning Pattern Analysis",
    insight: "Students show 23% higher engagement with AI-assisted content",
    recommendation: "Expand AI features to more courses",
    impact: "High",
    icon: Brain,
  },
  {
    title: "Content Optimization",
    insight: "Video lessons have 15% better completion rates than reading materials",
    recommendation: "Convert more content to video format",
    impact: "Medium",
    icon: Target,
  },
  {
    title: "Student Support",
    insight: "AI Study Assistant reduces instructor workload by 40%",
    recommendation: "Deploy to all courses",
    impact: "High",
    icon: Zap,
  },
]

const coursePerformance = [
  {
    id: "leadership-management",
    title: "Leadership and Management in Healthcare",
    students: 245,
    completion: 87,
    rating: 4.8,
    aiEngagement: 92,
    status: "excellent",
  },
  {
    id: "anatomy-physiology",
    title: "Human Anatomy & Physiology",
    students: 189,
    completion: 76,
    rating: 4.6,
    aiEngagement: 85,
    status: "good",
  },
  {
    id: "pharmacology",
    title: "Clinical Pharmacology",
    students: 156,
    completion: 82,
    rating: 4.7,
    aiEngagement: 88,
    status: "excellent",
  },
]

export default function AdminDashboard() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-green-100 text-green-800"
      case "good":
        return "bg-blue-100 text-blue-800"
      case "needs-attention":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 rounded-lg p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-20">
          <Brain className="w-32 h-32" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="w-6 h-6" />
            <Badge className="bg-white/20 text-white border-white/30">AI-Enhanced Platform</Badge>
          </div>
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-blue-100">
            Monitor your medical education platform with AI-powered insights and analytics
          </p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="ai-analytics" className="flex items-center space-x-2">
            <Brain className="w-4 h-4" />
            <span>AI Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="courses">Course Management</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold">{systemStats.totalUsers.toLocaleString()}</p>
                    <p className="text-xs text-green-600">+12% from last month</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Courses</p>
                    <p className="text-2xl font-bold">{systemStats.totalCourses}</p>
                    <p className="text-xs text-green-600">+5 new this month</p>
                  </div>
                  <BookOpen className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">AI Interactions</p>
                    <p className="text-2xl font-bold">{systemStats.aiInteractions.toLocaleString()}</p>
                    <p className="text-xs text-purple-600">+34% from last month</p>
                  </div>
                  <Bot className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Revenue</p>
                    <p className="text-2xl font-bold">${systemStats.revenue.toLocaleString()}</p>
                    <p className="text-xs text-green-600">+18% from last month</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest system activities and events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-3">
                      <activity.icon className={`w-5 h-5 ${activity.color}`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>Platform performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Course Completion Rate</span>
                    <span className="font-medium">{systemStats.completionRate}%</span>
                  </div>
                  <Progress value={systemStats.completionRate} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>AI Accuracy Rate</span>
                    <span className="font-medium">{systemStats.aiAccuracy}%</span>
                  </div>
                  <Progress value={systemStats.aiAccuracy} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Student Satisfaction</span>
                    <span className="font-medium">91%</span>
                  </div>
                  <Progress value={91} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai-analytics" className="space-y-6">
          {/* AI Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-purple-600" />
                <span>AI-Powered Insights</span>
              </CardTitle>
              <CardDescription>Intelligent recommendations to improve your platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start space-x-4">
                      <insight.icon className="w-6 h-6 text-purple-600 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{insight.title}</h3>
                          <Badge className={getImpactColor(insight.impact)}>{insight.impact} Impact</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{insight.insight}</p>
                        <p className="text-sm font-medium text-blue-600">{insight.recommendation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AI Study Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Daily Interactions</span>
                    <span className="font-medium">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Accuracy Rate</span>
                    <span className="font-medium">94.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Student Satisfaction</span>
                    <span className="font-medium">4.8/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Content Generation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Content Created</span>
                    <span className="font-medium">156 items</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Time Saved</span>
                    <span className="font-medium">89 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Quality Score</span>
                    <span className="font-medium">92%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Courses Suggested</span>
                    <span className="font-medium">2,341</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Enrollment Rate</span>
                    <span className="font-medium">67%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Match Accuracy</span>
                    <span className="font-medium">89%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Course Performance</CardTitle>
                <CardDescription>Monitor course metrics and AI engagement</CardDescription>
              </div>
              <Button asChild>
                <Link href="/admin/courses/create">
                  <Plus className="w-4 h-4 mr-2" />
                  New Course
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {coursePerformance.map((course) => (
                  <div key={course.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{course.title}</h3>
                      <Badge className={getStatusColor(course.status)}>{course.status}</Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Students</p>
                        <p className="font-medium">{course.students}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Completion</p>
                        <p className="font-medium">{course.completion}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Rating</p>
                        <p className="font-medium">{course.rating}/5</p>
                      </div>
                      <div>
                        <p className="text-gray-600">AI Engagement</p>
                        <p className="font-medium">{course.aiEngagement}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">Total Students</span>
                  <span className="font-medium">{systemStats.activeStudents}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Total Instructors</span>
                  <span className="font-medium">{systemStats.totalInstructors}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Active Today</span>
                  <span className="font-medium">234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">New This Week</span>
                  <span className="font-medium">47</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Daily Active Users</span>
                    <span>78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Course Completion</span>
                    <span>82%</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>AI Feature Usage</span>
                    <span>91%</span>
                  </div>
                  <Progress value={91} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Users
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Course Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Bot className="w-4 h-4 mr-2" />
                  AI Settings
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
