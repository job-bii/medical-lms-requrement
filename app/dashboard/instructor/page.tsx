"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Users,
  MessageSquare,
  TrendingUp,
  Plus,
  Eye,
  Edit,
  Calendar,
  CheckCircle,
  Pill,
  UserCheck,
  Microscope,
  Video,
  FileText,
  Brain,
  HelpCircle,
  BarChart3,
  Upload,
  Settings,
  Bell,
  Clock,
  Download,
  Share2,
  Copy,
  Trash2,
  Filter,
  Search,
  SortAsc,
  MoreHorizontal,
  Archive,
  Award,
  ClipboardList,
  ExternalLink,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ContentCreator } from "@/components/content-creator"

const myCourses = [
  {
    id: 1,
    title: "Advanced Pharmacology",
    students: 45,
    completion: 78,
    nextClass: "Drug Interactions",
    date: "Jan 12, 2024",
    icon: Pill,
    status: "active",
    modules: 8,
    assignments: 12,
    videos: 24,
    lastUpdated: "2 days ago",
    enrollmentStatus: "open",
  },
  {
    id: 2,
    title: "Clinical Pathology",
    students: 32,
    completion: 65,
    nextClass: "Diagnostic Methods",
    date: "Jan 15, 2024",
    icon: Microscope,
    status: "active",
    modules: 6,
    assignments: 8,
    videos: 18,
    lastUpdated: "1 day ago",
    enrollmentStatus: "closed",
  },
  {
    id: 3,
    title: "Medical Leadership",
    students: 28,
    completion: 90,
    nextClass: "Final Presentations",
    date: "Jan 10, 2024",
    icon: UserCheck,
    status: "ending-soon",
    modules: 4,
    assignments: 6,
    videos: 12,
    lastUpdated: "5 hours ago",
    enrollmentStatus: "closed",
  },
]

const recentActivity = [
  {
    type: "submission",
    message: "15 new assignments submitted in Advanced Pharmacology",
    time: "2 hours ago",
    icon: BookOpen,
    course: "Advanced Pharmacology",
    priority: "medium",
  },
  {
    type: "question",
    message: "3 new questions posted in discussion forum",
    time: "4 hours ago",
    icon: MessageSquare,
    course: "Clinical Pathology",
    priority: "high",
  },
  {
    type: "completion",
    message: "12 students completed Clinical Pathology Module 3",
    time: "6 hours ago",
    icon: CheckCircle,
    course: "Clinical Pathology",
    priority: "low",
  },
  {
    type: "grade",
    message: "Midterm grades published for Medical Leadership",
    time: "1 day ago",
    icon: Award,
    course: "Medical Leadership",
    priority: "medium",
  },
]

const contentTypes = [
  {
    type: "video",
    title: "Video Lecture",
    description: "Upload video lectures with automatic transcription",
    icon: Video,
    color: "bg-blue-100 text-blue-700",
    features: ["Auto-transcription", "Progress tracking", "Captions", "Speed control"],
  },
  {
    type: "document",
    title: "PDF Document",
    description: "Upload notes, slides, and reading materials",
    icon: FileText,
    color: "bg-green-100 text-green-700",
    features: ["Version control", "Annotations", "Download tracking", "Search"],
  },
  {
    type: "flashcard",
    title: "Interactive Flashcards",
    description: "Create flashcard sets for memorization",
    icon: Brain,
    color: "bg-purple-100 text-purple-700",
    features: ["Spaced repetition", "Progress tracking", "Shuffle mode", "Export"],
  },
  {
    type: "quiz",
    title: "Practice Questions",
    description: "Build question banks with detailed explanations",
    icon: HelpCircle,
    color: "bg-orange-100 text-orange-700",
    features: ["Multiple formats", "Explanations", "Analytics", "Randomization"],
  },
  {
    type: "assessment",
    title: "Assessment Test",
    description: "Create continuous assessment tests",
    icon: ClipboardList,
    color: "bg-red-100 text-red-700",
    features: ["Timed tests", "Auto-grading", "Rubrics", "Proctoring"],
  },
]

const analyticsData = [
  {
    metric: "Total Students",
    value: "105",
    change: "+12%",
    trend: "up",
    icon: Users,
  },
  {
    metric: "Avg. Completion",
    value: "77%",
    change: "+5%",
    trend: "up",
    icon: TrendingUp,
  },
  {
    metric: "Active Courses",
    value: "3",
    change: "0%",
    trend: "stable",
    icon: BookOpen,
  },
  {
    metric: "Pending Reviews",
    value: "23",
    change: "-8%",
    trend: "down",
    icon: MessageSquare,
  },
]

export default function InstructorDashboard() {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [isCreatingCourse, setIsCreatingCourse] = useState(false)
  const [contentCreatorType, setContentCreatorType] = useState<string | null>(null)

  const handleCreateCourse = () => {
    setIsCreatingCourse(true)
  }

  const handleCreateContent = (type: string) => {
    setContentCreatorType(type)
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-medical-600 to-medical-700 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Instructor Dashboard</h1>
            <p className="text-medical-100">Welcome back, Dr. Sarah Johnson</p>
            <div className="flex items-center space-x-4 mt-3">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Spring 2024</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Last login: 2 hours ago</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button onClick={handleCreateCourse} className="bg-white text-medical-700 hover:bg-medical-50">
              <Plus className="w-4 h-4 mr-2" />
              New Course
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-medical-700 bg-transparent"
            >
              <Upload className="w-4 h-4 mr-2" />
              Bulk Upload
            </Button>
          </div>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {analyticsData.map((item, index) => (
          <Card key={index} className="border-medical-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-medical-600">{item.metric}</p>
                  <p className="text-2xl font-bold text-medical-900">{item.value}</p>
                  <div className="flex items-center mt-1">
                    <span
                      className={`text-xs font-medium ${
                        item.trend === "up"
                          ? "text-green-600"
                          : item.trend === "down"
                            ? "text-red-600"
                            : "text-gray-600"
                      }`}
                    >
                      {item.change}
                    </span>
                    <span className="text-xs text-medical-500 ml-1">vs last month</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-medical-100 rounded-lg flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-medical-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="content">Content Studio</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="gradebook">Gradebook</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* My Courses Overview */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-medical-900">My Courses</h2>
                <Button onClick={handleCreateCourse} className="bg-medical-600 hover:bg-medical-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  New Course
                </Button>
              </div>

              {myCourses.map((course) => (
                <Card key={course.id} className="border-medical-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-medical-100 rounded-lg flex items-center justify-center">
                          <course.icon className="w-5 h-5 text-medical-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg text-medical-900">{course.title}</CardTitle>
                          <CardDescription className="text-medical-600">
                            {course.students} students • {course.modules} modules • {course.videos} videos
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={course.status === "ending-soon" ? "destructive" : "secondary"}
                          className={
                            course.status === "ending-soon"
                              ? "bg-red-100 text-red-700"
                              : "bg-medical-100 text-medical-700"
                          }
                        >
                          {course.status === "ending-soon" ? "Ending Soon" : "Active"}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              View Course
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Users className="w-4 h-4 mr-2" />
                              Manage Students
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Copy className="w-4 h-4 mr-2" />
                              Duplicate Course
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Archive className="w-4 h-4 mr-2" />
                              Archive
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-medical-600">Average Completion</span>
                          <span className="text-medical-900 font-medium">{course.completion}%</span>
                        </div>
                        <Progress value={course.completion} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-medical-600">Next: {course.nextClass}</p>
                          <p className="text-xs text-medical-500">
                            {course.date} • Updated {course.lastUpdated}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-medical-300 text-medical-700 bg-transparent"
                          >
                            <BarChart3 className="w-4 h-4 mr-1" />
                            Analytics
                          </Button>
                          <Button size="sm" className="bg-medical-600 hover:bg-medical-700 text-white">
                            <Edit className="w-4 h-4 mr-1" />
                            Manage
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Recent Activity */}
              <Card className="border-medical-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-medical-900">Recent Activity</CardTitle>
                    <Button variant="ghost" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                  <CardDescription className="text-medical-600">Latest updates from your courses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center mt-1 ${
                            activity.priority === "high"
                              ? "bg-red-100"
                              : activity.priority === "medium"
                                ? "bg-yellow-100"
                                : "bg-medical-100"
                          }`}
                        >
                          <activity.icon
                            className={`w-4 h-4 ${
                              activity.priority === "high"
                                ? "text-red-600"
                                : activity.priority === "medium"
                                  ? "text-yellow-600"
                                  : "text-medical-600"
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-medical-900">{activity.message}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <p className="text-xs text-medical-500">{activity.course}</p>
                            <span className="text-xs text-medical-400">•</span>
                            <p className="text-xs text-medical-500">{activity.time}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-medical-200">
                <CardHeader>
                  <CardTitle className="text-medical-900">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="border-medical-300 text-medical-700 hover:bg-medical-50 bg-transparent h-auto p-4 flex-col"
                    >
                      <Plus className="w-5 h-5 mb-2" />
                      <span className="text-sm">New Assignment</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="border-medical-300 text-medical-700 hover:bg-medical-50 bg-transparent h-auto p-4 flex-col"
                      onClick={() => handleCreateContent("video")}
                    >
                      <Video className="w-5 h-5 mb-2" />
                      <span className="text-sm">Upload Video</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="border-medical-300 text-medical-700 hover:bg-medical-50 bg-transparent h-auto p-4 flex-col"
                    >
                      <MessageSquare className="w-5 h-5 mb-2" />
                      <span className="text-sm">Send Message</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="border-medical-300 text-medical-700 hover:bg-medical-50 bg-transparent h-auto p-4 flex-col"
                    >
                      <Calendar className="w-5 h-5 mb-2" />
                      <span className="text-sm">Schedule Class</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Deadlines */}
              <Card className="border-medical-200">
                <CardHeader>
                  <CardTitle className="text-medical-900">Upcoming Deadlines</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full" />
                        <div>
                          <p className="text-sm font-medium text-red-900">Grade Midterms</p>
                          <p className="text-xs text-red-600">Advanced Pharmacology</p>
                        </div>
                      </div>
                      <span className="text-xs text-red-700 font-medium">Due Today</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                        <div>
                          <p className="text-sm font-medium text-yellow-900">Lecture Prep</p>
                          <p className="text-xs text-yellow-600">Clinical Pathology</p>
                        </div>
                      </div>
                      <span className="text-xs text-yellow-700 font-medium">Tomorrow</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-medical-50 rounded-lg border border-medical-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-medical-500 rounded-full" />
                        <div>
                          <p className="text-sm font-medium text-medical-900">Final Review</p>
                          <p className="text-xs text-medical-600">Medical Leadership</p>
                        </div>
                      </div>
                      <span className="text-xs text-medical-700 font-medium">Jan 15</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Content Studio Tab */}
        <TabsContent value="content" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-medical-900">Content Studio</h2>
              <p className="text-medical-600">Create and manage your course content</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" className="border-medical-300 text-medical-700 bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Templates
              </Button>
              <Button className="bg-medical-600 hover:bg-medical-700 text-white">
                <Upload className="w-4 h-4 mr-2" />
                Bulk Upload
              </Button>
            </div>
          </div>

          {/* Content Type Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contentTypes.map((content, index) => (
              <Card key={index} className="border-medical-200 hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${content.color}`}>
                      <content.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-medical-900">{content.title}</CardTitle>
                      <CardDescription className="text-medical-600">{content.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {content.features.map((feature, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs bg-medical-100 text-medical-700">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      className="w-full bg-medical-600 hover:bg-medical-700 text-white"
                      onClick={() => handleCreateContent(content.type)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create {content.title}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Content */}
          <Card className="border-medical-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-medical-900">Recent Content</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                  <Button variant="ghost" size="sm">
                    <SortAsc className="w-4 h-4 mr-2" />
                    Sort
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    type: "video",
                    title: "Introduction to Drug Metabolism",
                    course: "Advanced Pharmacology",
                    duration: "45 min",
                    views: 42,
                    status: "published",
                    lastModified: "2 hours ago",
                  },
                  {
                    type: "document",
                    title: "Pathology Lab Manual v2.1",
                    course: "Clinical Pathology",
                    size: "12.5 MB",
                    downloads: 28,
                    status: "published",
                    lastModified: "1 day ago",
                  },
                  {
                    type: "quiz",
                    title: "Leadership Principles Assessment",
                    course: "Medical Leadership",
                    questions: 25,
                    attempts: 18,
                    status: "draft",
                    lastModified: "3 days ago",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-medical-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                        {item.type === "video" && <Video className="w-5 h-5 text-blue-600" />}
                        {item.type === "document" && <FileText className="w-5 h-5 text-green-600" />}
                        {item.type === "quiz" && <HelpCircle className="w-5 h-5 text-orange-600" />}
                      </div>
                      <div>
                        <h4 className="font-medium text-medical-900">{item.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-medical-600">
                          <span>{item.course}</span>
                          <span>•</span>
                          <span>
                            {item.type === "video" && `${item.duration} • ${item.views} views`}
                            {item.type === "document" && `${item.size} • ${item.downloads} downloads`}
                            {item.type === "quiz" && `${item.questions} questions • ${item.attempts} attempts`}
                          </span>
                          <span>•</span>
                          <span>{item.lastModified}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge
                        variant={item.status === "published" ? "default" : "secondary"}
                        className={
                          item.status === "published" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                        }
                      >
                        {item.status}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="w-4 h-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-medical-900">Analytics & Reports</h2>
              <p className="text-medical-600">Track student progress and course performance</p>
            </div>
            <div className="flex space-x-3">
              <Select defaultValue="30days">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                  <SelectItem value="semester">This semester</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-medical-300 text-medical-700 bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          {/* Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Total Engagement",
                value: "87%",
                change: "+12%",
                icon: TrendingUp,
                color: "text-green-600",
              },
              {
                title: "Average Score",
                value: "82.5",
                change: "+3.2",
                icon: Award,
                color: "text-blue-600",
              },
              {
                title: "Completion Rate",
                value: "74%",
                change: "+8%",
                icon: CheckCircle,
                color: "text-purple-600",
              },
              {
                title: "Active Students",
                value: "98",
                change: "+5",
                icon: Users,
                color: "text-orange-600",
              },
            ].map((metric, index) => (
              <Card key={index} className="border-medical-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-medical-600">{metric.title}</p>
                      <p className="text-2xl font-bold text-medical-900">{metric.value}</p>
                      <p className={`text-sm font-medium ${metric.color}`}>{metric.change}</p>
                    </div>
                    <metric.icon className={`w-8 h-8 ${metric.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Course Performance */}
            <Card className="border-medical-200">
              <CardHeader>
                <CardTitle className="text-medical-900">Course Performance</CardTitle>
                <CardDescription>Student engagement and completion rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myCourses.map((course, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <course.icon className="w-5 h-5 text-medical-600" />
                          <span className="font-medium text-medical-900">{course.title}</span>
                        </div>
                        <span className="text-sm text-medical-600">{course.completion}%</span>
                      </div>
                      <Progress value={course.completion} className="h-2" />
                      <div className="flex justify-between text-xs text-medical-500">
                        <span>{course.students} students</span>
                        <span>{Math.round((course.students * course.completion) / 100)} completed</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Student Progress */}
            <Card className="border-medical-200">
              <CardHeader>
                <CardTitle className="text-medical-900">Student Progress Distribution</CardTitle>
                <CardDescription>How students are performing across courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { range: "90-100%", count: 23, color: "bg-green-500" },
                    { range: "80-89%", count: 34, color: "bg-blue-500" },
                    { range: "70-79%", count: 28, color: "bg-yellow-500" },
                    { range: "60-69%", count: 15, color: "bg-orange-500" },
                    { range: "Below 60%", count: 5, color: "bg-red-500" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-20 text-sm text-medical-600">{item.range}</div>
                      <div className="flex-1 bg-medical-100 rounded-full h-3 relative">
                        <div
                          className={`${item.color} h-3 rounded-full`}
                          style={{ width: `${(item.count / 105) * 100}%` }}
                        />
                      </div>
                      <div className="w-12 text-sm text-medical-900 font-medium">{item.count}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Gradebook Tab */}
        <TabsContent value="gradebook" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-medical-900">Gradebook</h2>
              <p className="text-medical-600">Manage grades and assessments</p>
            </div>
            <div className="flex space-x-3">
              <Select defaultValue="all">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  <SelectItem value="pharmacology">Advanced Pharmacology</SelectItem>
                  <SelectItem value="pathology">Clinical Pathology</SelectItem>
                  <SelectItem value="leadership">Medical Leadership</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-medical-300 text-medical-700 bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Export Grades
              </Button>
              <Button className="bg-medical-600 hover:bg-medical-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                New Assignment
              </Button>
            </div>
          </div>

          {/* Gradebook Interface */}
          <Card className="border-medical-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-medical-900">Advanced Pharmacology - Grades</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-medical-200">
                      <th className="text-left p-3 font-medium text-medical-900">Student</th>
                      <th className="text-center p-3 font-medium text-medical-900">Midterm</th>
                      <th className="text-center p-3 font-medium text-medical-900">Assignment 1</th>
                      <th className="text-center p-3 font-medium text-medical-900">Assignment 2</th>
                      <th className="text-center p-3 font-medium text-medical-900">Quiz 1</th>
                      <th className="text-center p-3 font-medium text-medical-900">Overall</th>
                      <th className="text-center p-3 font-medium text-medical-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        name: "Alice Johnson",
                        id: "MED2024001",
                        grades: { midterm: 88, assignment1: 92, assignment2: 85, quiz1: 90, overall: 89 },
                        avatar: "/placeholder.svg?height=32&width=32",
                      },
                      {
                        name: "Bob Smith",
                        id: "MED2024002",
                        grades: { midterm: 76, assignment1: 82, assignment2: 78, quiz1: 85, overall: 80 },
                        avatar: "/placeholder.svg?height=32&width=32",
                      },
                      {
                        name: "Carol Davis",
                        id: "MED2024003",
                        grades: { midterm: 94, assignment1: 96, assignment2: 91, quiz1: 93, overall: 94 },
                        avatar: "/placeholder.svg?height=32&width=32",
                      },
                    ].map((student, index) => (
                      <tr key={index} className="border-b border-medical-100 hover:bg-medical-50">
                        <td className="p-3">
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                              <AvatarFallback className="bg-medical-100 text-medical-700">
                                {student.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-medical-900">{student.name}</p>
                              <p className="text-xs text-medical-500">{student.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="text-center p-3">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded text-sm font-medium ${
                              student.grades.midterm >= 90
                                ? "bg-green-100 text-green-700"
                                : student.grades.midterm >= 80
                                  ? "bg-blue-100 text-blue-700"
                                  : student.grades.midterm >= 70
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-red-100 text-red-700"
                            }`}
                          >
                            {student.grades.midterm}%
                          </span>
                        </td>
                        <td className="text-center p-3">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded text-sm font-medium ${
                              student.grades.assignment1 >= 90
                                ? "bg-green-100 text-green-700"
                                : student.grades.assignment1 >= 80
                                  ? "bg-blue-100 text-blue-700"
                                  : student.grades.assignment1 >= 70
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-red-100 text-red-700"
                            }`}
                          >
                            {student.grades.assignment1}%
                          </span>
                        </td>
                        <td className="text-center p-3">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded text-sm font-medium ${
                              student.grades.assignment2 >= 90
                                ? "bg-green-100 text-green-700"
                                : student.grades.assignment2 >= 80
                                  ? "bg-blue-100 text-blue-700"
                                  : student.grades.assignment2 >= 70
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-red-100 text-red-700"
                            }`}
                          >
                            {student.grades.assignment2}%
                          </span>
                        </td>
                        <td className="text-center p-3">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded text-sm font-medium ${
                              student.grades.quiz1 >= 90
                                ? "bg-green-100 text-green-700"
                                : student.grades.quiz1 >= 80
                                  ? "bg-blue-100 text-blue-700"
                                  : student.grades.quiz1 >= 70
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-red-100 text-red-700"
                            }`}
                          >
                            {student.grades.quiz1}%
                          </span>
                        </td>
                        <td className="text-center p-3">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded text-sm font-bold ${
                              student.grades.overall >= 90
                                ? "bg-green-100 text-green-700"
                                : student.grades.overall >= 80
                                  ? "bg-blue-100 text-blue-700"
                                  : student.grades.overall >= 70
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-red-100 text-red-700"
                            }`}
                          >
                            {student.grades.overall}%
                          </span>
                        </td>
                        <td className="text-center p-3">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Grades
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Send Message
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Communication Tab */}
        <TabsContent value="communication" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-medical-900">Communication Center</h2>
              <p className="text-medical-600">Manage announcements, messages, and discussions</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" className="border-medical-300 text-medical-700 bg-transparent">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button className="bg-medical-600 hover:bg-medical-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                New Announcement
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Announcements */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-medical-200">
                <CardHeader>
                  <CardTitle className="text-medical-900">Recent Announcements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Midterm Exam Schedule Updated",
                        course: "Advanced Pharmacology",
                        content:
                          "The midterm exam has been rescheduled to January 20th. Please review the updated syllabus.",
                        time: "2 hours ago",
                        priority: "high",
                        views: 42,
                      },
                      {
                        title: "New Lab Manual Available",
                        course: "Clinical Pathology",
                        content: "Version 2.1 of the lab manual is now available for download with updated procedures.",
                        time: "1 day ago",
                        priority: "medium",
                        views: 28,
                      },
                      {
                        title: "Guest Lecture Next Week",
                        course: "Medical Leadership",
                        content: "Dr. Martinez will be presenting on healthcare innovation next Tuesday at 2 PM.",
                        time: "2 days ago",
                        priority: "low",
                        views: 35,
                      },
                    ].map((announcement, index) => (
                      <div key={index} className="p-4 bg-medical-50 rounded-lg border border-medical-200">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-medium text-medical-900">{announcement.title}</h4>
                              <Badge
                                variant="outline"
                                className={`text-xs ${
                                  announcement.priority === "high"
                                    ? "border-red-300 text-red-700"
                                    : announcement.priority === "medium"
                                      ? "border-yellow-300 text-yellow-700"
                                      : "border-medical-300 text-medical-700"
                                }`}
                              >
                                {announcement.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-medical-600 mb-2">{announcement.course}</p>
                            <p className="text-sm text-medical-800 mb-3">{announcement.content}</p>
                            <div className="flex items-center space-x-4 text-xs text-medical-500">
                              <span>{announcement.time}</span>
                              <span>•</span>
                              <span>{announcement.views} views</span>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="w-4 h-4 mr-2" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Messages */}
              <Card className="border-medical-200">
                <CardHeader>
                  <CardTitle className="text-medical-900">Recent Messages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        student: "Alice Johnson",
                        subject: "Question about Drug Interactions",
                        preview: "Hi Dr. Johnson, I have a question about the interaction between...",
                        time: "1 hour ago",
                        unread: true,
                        avatar: "/placeholder.svg?height=32&width=32",
                      },
                      {
                        student: "Bob Smith",
                        subject: "Assignment Extension Request",
                        preview: "Could I please get an extension on the pharmacology assignment due to...",
                        time: "3 hours ago",
                        unread: true,
                        avatar: "/placeholder.svg?height=32&width=32",
                      },
                      {
                        student: "Carol Davis",
                        subject: "Thank you for the feedback",
                        preview: "Thank you for the detailed feedback on my last assignment. I found it very...",
                        time: "1 day ago",
                        unread: false,
                        avatar: "/placeholder.svg?height=32&width=32",
                      },
                    ].map((message, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border cursor-pointer hover:bg-medical-50 ${
                          message.unread ? "bg-blue-50 border-blue-200" : "bg-white border-medical-200"
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.student} />
                            <AvatarFallback className="bg-medical-100 text-medical-700">
                              {message.student
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className={`font-medium ${message.unread ? "text-blue-900" : "text-medical-900"}`}>
                                {message.student}
                              </h4>
                              <span className="text-xs text-medical-500">{message.time}</span>
                            </div>
                            <p
                              className={`text-sm ${message.unread ? "text-blue-800" : "text-medical-700"} font-medium mb-1`}
                            >
                              {message.subject}
                            </p>
                            <p className="text-sm text-medical-600 truncate">{message.preview}</p>
                          </div>
                          {message.unread && <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="border-medical-200">
                <CardHeader>
                  <CardTitle className="text-medical-900">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button className="w-full bg-medical-600 hover:bg-medical-700 text-white justify-start">
                      <Bell className="w-4 h-4 mr-2" />
                      Send Announcement
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-medical-300 text-medical-700 justify-start bg-transparent"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Compose Message
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-medical-300 text-medical-700 justify-start bg-transparent"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Message All Students
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-medical-300 text-medical-700 justify-start bg-transparent"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Meeting
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Discussion Forums */}
              <Card className="border-medical-200">
                <CardHeader>
                  <CardTitle className="text-medical-900">Active Discussions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      {
                        title: "Drug Interaction Cases",
                        course: "Pharmacology",
                        replies: 12,
                        lastActivity: "2h ago",
                      },
                      {
                        title: "Lab Results Interpretation",
                        course: "Pathology",
                        replies: 8,
                        lastActivity: "4h ago",
                      },
                      {
                        title: "Leadership Scenarios",
                        course: "Leadership",
                        replies: 15,
                        lastActivity: "1d ago",
                      },
                    ].map((discussion, index) => (
                      <div key={index} className="p-3 bg-medical-50 rounded-lg">
                        <h4 className="font-medium text-medical-900 text-sm mb-1">{discussion.title}</h4>
                        <p className="text-xs text-medical-600 mb-2">{discussion.course}</p>
                        <div className="flex items-center justify-between text-xs text-medical-500">
                          <span>{discussion.replies} replies</span>
                          <span>{discussion.lastActivity}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Notification Settings */}
              <Card className="border-medical-200">
                <CardHeader>
                  <CardTitle className="text-medical-900">Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-notifications" className="text-sm text-medical-700">
                        Email Notifications
                      </Label>
                      <Switch id="email-notifications" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sms-notifications" className="text-sm text-medical-700">
                        SMS Notifications
                      </Label>
                      <Switch id="sms-notifications" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="push-notifications" className="text-sm text-medical-700">
                        Push Notifications
                      </Label>
                      <Switch id="push-notifications" defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Course Creation Dialog */}
      <Dialog open={isCreatingCourse} onOpenChange={setIsCreatingCourse}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Course</DialogTitle>
            <DialogDescription>Set up a new course with all the necessary details and structure.</DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="course-title">Course Title</Label>
                <Input id="course-title" placeholder="e.g., Advanced Pharmacology" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="course-code">Course Code</Label>
                <Input id="course-code" placeholder="e.g., PHARM-401" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="course-description">Description</Label>
              <Textarea
                id="course-description"
                placeholder="Provide a detailed description of the course content and objectives..."
                rows={3}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="semester">Semester</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spring-2024">Spring 2024</SelectItem>
                    <SelectItem value="summer-2024">Summer 2024</SelectItem>
                    <SelectItem value="fall-2024">Fall 2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="credits">Credits</Label>
                <Input id="credits" type="number" placeholder="3" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-students">Max Students</Label>
                <Input id="max-students" type="number" placeholder="50" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Course Template</Label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "Basic Medical Course", modules: 8, icon: BookOpen },
                  { name: "Lab-Based Course", modules: 12, icon: Microscope },
                  { name: "Clinical Skills", modules: 6, icon: UserCheck },
                  { name: "Custom Course", modules: 0, icon: Settings },
                ].map((template, index) => (
                  <div
                    key={index}
                    className="p-3 border border-medical-200 rounded-lg cursor-pointer hover:bg-medical-50"
                  >
                    <div className="flex items-center space-x-3">
                      <template.icon className="w-5 h-5 text-medical-600" />
                      <div>
                        <p className="font-medium text-medical-900 text-sm">{template.name}</p>
                        <p className="text-xs text-medical-600">
                          {template.modules > 0 ? `${template.modules} modules` : "Start from scratch"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setIsCreatingCourse(false)}>
                Cancel
              </Button>
              <Button className="bg-medical-600 hover:bg-medical-700 text-white">Create Course</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Content Creator Dialog */}
      {contentCreatorType && (
        <ContentCreator
          type={contentCreatorType as "video" | "document" | "flashcard" | "quiz" | "assessment"}
          onClose={() => setContentCreatorType(null)}
        />
      )}
    </div>
  )
}
