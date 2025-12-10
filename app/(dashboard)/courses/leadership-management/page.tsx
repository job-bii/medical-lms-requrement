"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Play,
  Lock,
  CheckCircle,
  Clock,
  Users,
  Star,
  BookOpen,
  Video,
  FileText,
  ClipboardList,
  Download,
  MessageSquare,
} from "lucide-react"

interface Lesson {
  id: string
  title: string
  type: "video" | "reading" | "assignment" | "quiz"
  duration: number
  content: string
  isCompleted: boolean
  isLocked: boolean
}

interface Module {
  id: string
  title: string
  description: string
  lessons: Lesson[]
  isCompleted: boolean
  isLocked: boolean
  progress: number
}

export default function CourseDetailPage() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const [activeTab, setActiveTab] = useState("overview")

  const courseData = {
    id: "leadership-management",
    title: "Leadership and Management in Healthcare",
    instructor: "Dr. Sarah Johnson",
    description:
      "Comprehensive course covering leadership principles, management strategies, and organizational behavior in healthcare settings. This course will equip you with the essential skills needed to lead effectively in complex healthcare environments.",
    image: "/leadership-management-healthcare.png",
    category: "Leadership",
    difficulty: "Intermediate",
    duration: "12 weeks",
    students: 245,
    rating: 4.8,
    price: 399,
    enrolled: true,
    progress: 35,
    totalLessons: 9,
    completedLessons: 3,
    modules: [
      {
        id: "module-1",
        title: "Introduction to Healthcare Leadership",
        description: "Foundational concepts of leadership in healthcare environments",
        isCompleted: true,
        isLocked: false,
        progress: 100,
        lessons: [
          {
            id: "lesson-1-1",
            title: "What is Healthcare Leadership?",
            type: "video" as const,
            duration: 25,
            content:
              "Welcome to our comprehensive course on Healthcare Leadership. In this opening lesson, we'll explore the fundamental concepts that define leadership in healthcare settings...",
            isCompleted: true,
            isLocked: false,
          },
          {
            id: "lesson-1-2",
            title: "Leadership vs Management",
            type: "reading" as const,
            duration: 15,
            content:
              "Understanding the key differences between leadership and management is crucial for healthcare professionals. While management focuses on processes and systems...",
            isCompleted: true,
            isLocked: false,
          },
          {
            id: "lesson-1-3",
            title: "Healthcare Leadership Assessment",
            type: "quiz" as const,
            duration: 10,
            content: "Test your understanding of basic leadership concepts with this comprehensive assessment.",
            isCompleted: true,
            isLocked: false,
          },
        ],
      },
      {
        id: "module-2",
        title: "Communication and Team Building",
        description: "Effective communication strategies and team management techniques",
        isCompleted: false,
        isLocked: false,
        progress: 33,
        lessons: [
          {
            id: "lesson-2-1",
            title: "Effective Communication in Healthcare",
            type: "video" as const,
            duration: 30,
            content:
              "Learn communication strategies specifically designed for healthcare professionals. This lesson covers verbal and non-verbal communication techniques...",
            isCompleted: true,
            isLocked: false,
          },
          {
            id: "lesson-2-2",
            title: "Building High-Performance Teams",
            type: "reading" as const,
            duration: 20,
            content:
              "Strategies for creating and managing effective healthcare teams. We'll explore team dynamics, conflict resolution, and performance optimization...",
            isCompleted: false,
            isLocked: false,
          },
          {
            id: "lesson-2-3",
            title: "Team Building Exercise",
            type: "assignment" as const,
            duration: 45,
            content:
              "Complete a comprehensive team building scenario analysis. You'll be presented with real-world healthcare team challenges...",
            isCompleted: false,
            isLocked: false,
          },
        ],
      },
      {
        id: "module-3",
        title: "Strategic Planning and Decision Making",
        description: "Advanced strategic thinking and decision-making processes",
        isCompleted: false,
        isLocked: true,
        progress: 0,
        lessons: [
          {
            id: "lesson-3-1",
            title: "Strategic Planning in Healthcare",
            type: "video" as const,
            duration: 35,
            content: "Learn strategic planning methodologies for healthcare organizations...",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "lesson-3-2",
            title: "Decision Making Frameworks",
            type: "reading" as const,
            duration: 25,
            content: "Explore various decision-making models and frameworks...",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "lesson-3-3",
            title: "Strategic Planning Project",
            type: "assignment" as const,
            duration: 60,
            content: "Develop a strategic plan for a healthcare scenario",
            isCompleted: false,
            isLocked: true,
          },
        ],
      },
    ] as Module[],
  }

  const getLessonIcon = (type: string) => {
    switch (type) {
      case "video":
        return Video
      case "reading":
        return FileText
      case "assignment":
        return ClipboardList
      case "quiz":
        return ClipboardList
      default:
        return FileText
    }
  }

  const handleLessonClick = (lesson: Lesson) => {
    if (!lesson.isLocked) {
      setSelectedLesson(lesson)
      setActiveTab("content")
    }
  }

  const markLessonComplete = (lessonId: string) => {
    // In a real app, this would update the backend
    console.log(`Marking lesson ${lessonId} as complete`)
  }

  return (
    <div className="space-y-6">
      {/* Course Header */}
      <Card className="border-medical-200">
        <div className="relative">
          <img
            src={courseData.image || "/placeholder.svg"}
            alt={courseData.title}
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <Badge variant="secondary" className="absolute top-4 right-4 bg-medical-600 text-white">
            {courseData.difficulty}
          </Badge>
        </div>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <Badge variant="outline" className="border-medical-300 text-medical-700">
                {courseData.category}
              </Badge>
              <CardTitle className="text-2xl text-medical-900">{courseData.title}</CardTitle>
              <CardDescription className="text-medical-600">By {courseData.instructor}</CardDescription>
              <p className="text-medical-700">{courseData.description}</p>
            </div>
            <div className="text-right space-y-2">
              <div className="text-3xl font-bold text-medical-900">${courseData.price}</div>
              <div className="flex items-center space-x-4 text-sm text-medical-600">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{courseData.students} students</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{courseData.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{courseData.rating}</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-medical-700 font-medium">Course Progress</span>
              <span className="text-medical-900 font-bold">{courseData.progress}%</span>
            </div>
            <Progress value={courseData.progress} className="h-3" />
            <div className="flex justify-between text-sm text-medical-600">
              <span>
                {courseData.completedLessons} of {courseData.totalLessons} lessons completed
              </span>
              <span>
                {courseData.modules.filter((m) => m.isCompleted).length} of {courseData.modules.length} modules
                completed
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-medical-100">
          <TabsTrigger value="overview" className="data-[state=active]:bg-medical-600 data-[state=active]:text-white">
            Overview
          </TabsTrigger>
          <TabsTrigger value="content" className="data-[state=active]:bg-medical-600 data-[state=active]:text-white">
            Content
          </TabsTrigger>
          <TabsTrigger value="resources" className="data-[state=active]:bg-medical-600 data-[state=active]:text-white">
            Resources
          </TabsTrigger>
          <TabsTrigger value="discussion" className="data-[state=active]:bg-medical-600 data-[state=active]:text-white">
            Discussion
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {courseData.modules.map((module, moduleIndex) => (
                <Card key={module.id} className="border-medical-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-medical-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {moduleIndex + 1}
                        </div>
                        <div>
                          <CardTitle className="text-medical-900 flex items-center space-x-2">
                            <span>{module.title}</span>
                            {module.isCompleted && <CheckCircle className="w-5 h-5 text-green-600" />}
                            {module.isLocked && <Lock className="w-5 h-5 text-gray-400" />}
                          </CardTitle>
                          <CardDescription className="text-medical-600">{module.description}</CardDescription>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-medical-900">{module.progress}%</div>
                        <Progress value={module.progress} className="w-20 h-2 mt-1" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {module.lessons.map((lesson, lessonIndex) => {
                        const LessonIcon = getLessonIcon(lesson.type)
                        return (
                          <div
                            key={lesson.id}
                            className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                              lesson.isLocked
                                ? "border-gray-200 bg-gray-50 cursor-not-allowed"
                                : lesson.isCompleted
                                  ? "border-green-200 bg-green-50 hover:bg-green-100"
                                  : "border-medical-200 bg-white hover:bg-medical-50"
                            }`}
                            onClick={() => handleLessonClick(lesson)}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center space-x-2">
                                {lesson.isLocked ? (
                                  <Lock className="w-4 h-4 text-gray-400" />
                                ) : lesson.isCompleted ? (
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                ) : (
                                  <Play className="w-4 h-4 text-medical-600" />
                                )}
                                <LessonIcon className="w-4 h-4 text-medical-600" />
                              </div>
                              <div>
                                <p className="font-medium text-medical-900">{lesson.title}</p>
                                <p className="text-sm text-medical-600 capitalize">
                                  {lesson.type} • {lesson.duration} min
                                </p>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant={lesson.isLocked ? "ghost" : lesson.isCompleted ? "outline" : "default"}
                              disabled={lesson.isLocked}
                              className={
                                lesson.isLocked
                                  ? "text-gray-400"
                                  : lesson.isCompleted
                                    ? "border-green-600 text-green-600"
                                    : "bg-medical-600 hover:bg-medical-700 text-white"
                              }
                              onClick={(e) => {
                                e.stopPropagation()
                                handleLessonClick(lesson)
                              }}
                            >
                              {lesson.isLocked ? "Locked" : lesson.isCompleted ? "Review" : "Start"}
                            </Button>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-4">
              <Card className="border-medical-200">
                <CardHeader>
                  <CardTitle className="text-medical-900">Course Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-medical-600">Total Modules</span>
                    <span className="font-medium text-medical-900">{courseData.modules.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-medical-600">Total Lessons</span>
                    <span className="font-medium text-medical-900">{courseData.totalLessons}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-medical-600">Completed</span>
                    <span className="font-medium text-green-600">{courseData.completedLessons}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-medical-600">Remaining</span>
                    <span className="font-medium text-medical-900">
                      {courseData.totalLessons - courseData.completedLessons}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-medical-600">Progress</span>
                    <span className="font-bold text-medical-900">{courseData.progress}%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-medical-200">
                <CardHeader>
                  <CardTitle className="text-medical-900">Instructor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-medical-600 rounded-full flex items-center justify-center text-white font-bold">
                      SJ
                    </div>
                    <div>
                      <p className="font-medium text-medical-900">{courseData.instructor}</p>
                      <p className="text-sm text-medical-600">Healthcare Leadership Expert</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          {selectedLesson ? (
            <Card className="border-medical-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-medical-600 text-white rounded-full flex items-center justify-center">
                      {getLessonIcon(selectedLesson.type)({ className: "w-4 h-4" })}
                    </div>
                    <div>
                      <CardTitle className="text-medical-900">{selectedLesson.title}</CardTitle>
                      <CardDescription className="text-medical-600 capitalize">
                        {selectedLesson.type} • {selectedLesson.duration} minutes
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!selectedLesson.isCompleted && (
                      <Button
                        onClick={() => markLessonComplete(selectedLesson.id)}
                        className="bg-medical-600 hover:bg-medical-700 text-white"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark Complete
                      </Button>
                    )}
                    {selectedLesson.isCompleted && (
                      <Badge className="bg-green-600 text-white">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Completed
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  {selectedLesson.type === "video" && (
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                      <div className="text-center">
                        <Play className="w-16 h-16 text-medical-600 mx-auto mb-2" />
                        <p className="text-medical-600">Video Player Placeholder</p>
                        <p className="text-sm text-medical-500">Duration: {selectedLesson.duration} minutes</p>
                      </div>
                    </div>
                  )}
                  <div className="text-medical-700 leading-relaxed">{selectedLesson.content}</div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-medical-200">
              <CardContent className="text-center py-12">
                <BookOpen className="w-16 h-16 text-medical-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-medical-900 mb-2">Select a Lesson</h3>
                <p className="text-medical-600">Choose a lesson from the overview to start learning</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <Card className="border-medical-200">
            <CardHeader>
              <CardTitle className="text-medical-900">Course Resources</CardTitle>
              <CardDescription className="text-medical-600">
                Download materials and additional resources for this course
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-medical-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-8 h-8 text-medical-600" />
                    <div>
                      <p className="font-medium text-medical-900">Course Syllabus</p>
                      <p className="text-sm text-medical-600">Complete course outline and schedule</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-medical-300 bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border border-medical-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-8 h-8 text-medical-600" />
                    <div>
                      <p className="font-medium text-medical-900">Leadership Assessment Tool</p>
                      <p className="text-sm text-medical-600">Self-assessment questionnaire</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-medical-300 bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border border-medical-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-8 h-8 text-medical-600" />
                    <div>
                      <p className="font-medium text-medical-900">Reading List</p>
                      <p className="text-sm text-medical-600">Recommended books and articles</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-medical-300 bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discussion" className="space-y-6">
          <Card className="border-medical-200">
            <CardHeader>
              <CardTitle className="text-medical-900">Course Discussion</CardTitle>
              <CardDescription className="text-medical-600">
                Connect with fellow students and ask questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <MessageSquare className="w-16 h-16 text-medical-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-medical-900 mb-2">Discussion Forum</h3>
                <p className="text-medical-600 mb-6">
                  Join the conversation with other students and get help from instructors
                </p>
                <Button className="bg-medical-600 hover:bg-medical-700 text-white">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Start Discussion
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
