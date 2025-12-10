"use client"

import React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import {
  Clock,
  Users,
  Star,
  CheckCircle,
  Lock,
  BookOpen,
  Video,
  FileText,
  HelpCircle,
  ArrowLeft,
  Award,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

interface Lesson {
  id: string
  title: string
  type: "video" | "reading" | "quiz"
  duration: string
  completed: boolean
  content?: string
}

interface Module {
  id: string
  title: string
  description: string
  lessons: Lesson[]
  completed: boolean
  unlocked: boolean
  progress: number
}

interface Course {
  id: string
  title: string
  description: string
  instructor: string
  duration: string
  students: number
  rating: number
  image: string
  modules: Module[]
  overallProgress: number
}

export default function CourseDetailPage() {
  const params = useParams()
  const courseId = params.courseId as string

  const [course, setCourse] = useState<Course | null>(null)
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock course data - in real app, this would come from your API
    const mockCourse: Course = {
      id: courseId,
      title: "Leadership and Management in Healthcare",
      description:
        "Develop essential leadership skills for healthcare professionals. Learn strategic thinking, team management, and organizational excellence in healthcare settings.",
      instructor: "Dr. Sarah Johnson",
      duration: "8 weeks",
      students: 245,
      rating: 4.8,
      image: "/leadership-management-healthcare.png",
      overallProgress: 0,
      modules: [
        {
          id: "module-1",
          title: "Module 1: Foundations of Healthcare Leadership",
          description: "Understanding the fundamentals of leadership in healthcare environments",
          unlocked: true,
          completed: false,
          progress: 0,
          lessons: [
            {
              id: "lesson-1-1",
              title: "What is Healthcare Leadership?",
              type: "video",
              duration: "15 min",
              completed: false,
              content:
                "Introduction to healthcare leadership principles and their importance in modern healthcare delivery.",
            },
            {
              id: "lesson-1-2",
              title: "Leadership vs Management",
              type: "reading",
              duration: "10 min",
              completed: false,
              content:
                "Understanding the key differences between leadership and management roles in healthcare organizations.",
            },
            {
              id: "lesson-1-3",
              title: "Healthcare Leadership Styles",
              type: "video",
              duration: "20 min",
              completed: false,
              content: "Exploring different leadership styles and their applications in healthcare settings.",
            },
            {
              id: "lesson-1-4",
              title: "Module 1 Assessment",
              type: "quiz",
              duration: "15 min",
              completed: false,
              content: "Test your understanding of healthcare leadership fundamentals.",
            },
          ],
        },
        {
          id: "module-2",
          title: "Module 2: Communication and Team Building",
          description: "Developing effective communication skills and building high-performing teams",
          unlocked: false,
          completed: false,
          progress: 0,
          lessons: [
            {
              id: "lesson-2-1",
              title: "Effective Communication in Healthcare",
              type: "video",
              duration: "18 min",
              completed: false,
              content: "Master communication techniques for healthcare professionals.",
            },
            {
              id: "lesson-2-2",
              title: "Building High-Performance Teams",
              type: "reading",
              duration: "12 min",
              completed: false,
              content: "Strategies for creating and maintaining effective healthcare teams.",
            },
            {
              id: "lesson-2-3",
              title: "Conflict Resolution",
              type: "video",
              duration: "22 min",
              completed: false,
              content: "Techniques for resolving conflicts in healthcare environments.",
            },
            {
              id: "lesson-2-4",
              title: "Module 2 Assessment",
              type: "quiz",
              duration: "20 min",
              completed: false,
              content: "Assess your communication and team building skills.",
            },
          ],
        },
        {
          id: "module-3",
          title: "Module 3: Strategic Planning and Change Management",
          description: "Learn to develop strategic plans and manage organizational change",
          unlocked: false,
          completed: false,
          progress: 0,
          lessons: [
            {
              id: "lesson-3-1",
              title: "Strategic Planning in Healthcare",
              type: "video",
              duration: "25 min",
              completed: false,
              content: "Develop strategic thinking skills for healthcare organizations.",
            },
            {
              id: "lesson-3-2",
              title: "Change Management Principles",
              type: "reading",
              duration: "15 min",
              completed: false,
              content: "Understanding how to lead organizational change effectively.",
            },
            {
              id: "lesson-3-3",
              title: "Implementation Strategies",
              type: "video",
              duration: "20 min",
              completed: false,
              content: "Practical approaches to implementing strategic changes.",
            },
            {
              id: "lesson-3-4",
              title: "Final Assessment",
              type: "quiz",
              duration: "30 min",
              completed: false,
              content: "Comprehensive assessment of all course materials.",
            },
          ],
        },
      ],
    }

    // Simulate loading
    setTimeout(() => {
      setCourse(mockCourse)
      setLoading(false)
    }, 1000)
  }, [courseId])

  const handleLessonComplete = (moduleId: string, lessonId: string) => {
    if (!course) return

    setCourse((prevCourse) => {
      if (!prevCourse) return null

      const updatedModules = prevCourse.modules.map((module) => {
        if (module.id === moduleId) {
          const updatedLessons = module.lessons.map((lesson) =>
            lesson.id === lessonId ? { ...lesson, completed: true } : lesson,
          )

          const completedLessons = updatedLessons.filter((lesson) => lesson.completed).length
          const moduleProgress = (completedLessons / updatedLessons.length) * 100
          const moduleCompleted = moduleProgress === 100

          return {
            ...module,
            lessons: updatedLessons,
            progress: moduleProgress,
            completed: moduleCompleted,
          }
        }
        return module
      })

      // Unlock next module if current module is completed
      const updatedModulesWithUnlock = updatedModules.map((module, index) => {
        if (index > 0 && updatedModules[index - 1].completed) {
          return { ...module, unlocked: true }
        }
        return module
      })

      // Calculate overall progress
      const totalLessons = updatedModulesWithUnlock.reduce((acc, module) => acc + module.lessons.length, 0)
      const completedLessons = updatedModulesWithUnlock.reduce(
        (acc, module) => acc + module.lessons.filter((lesson) => lesson.completed).length,
        0,
      )
      const overallProgress = (completedLessons / totalLessons) * 100

      return {
        ...prevCourse,
        modules: updatedModulesWithUnlock,
        overallProgress,
      }
    })

    setSelectedLesson(null)
  }

  const getLessonIcon = (type: string) => {
    switch (type) {
      case "video":
        return Video
      case "reading":
        return FileText
      case "quiz":
        return HelpCircle
      default:
        return BookOpen
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!course) {
    return <div>Course not found</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/courses">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Link>
        </Button>
      </div>

      {/* Course Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-start gap-4">
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-2">{course.title}</CardTitle>
                  <CardDescription className="text-base mb-4">{course.description}</CardDescription>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {course.students} students
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {course.rating}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Progress</span>
                  <span>{Math.round(course.overallProgress)}%</span>
                </div>
                <Progress value={course.overallProgress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Course Instructor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-medical-100 rounded-full flex items-center justify-center">
                  <span className="text-medical-600 font-semibold">SJ</span>
                </div>
                <div>
                  <p className="font-medium">{course.instructor}</p>
                  <p className="text-sm text-muted-foreground">Healthcare Leadership Expert</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Course Modules */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Course Content</h2>

        {course.modules.map((module, moduleIndex) => (
          <Card key={module.id} className={`${!module.unlocked ? "opacity-60" : ""}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {module.unlocked ? (
                    module.completed ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : (
                      <div className="w-6 h-6 border-2 border-medical-300 rounded-full" />
                    )
                  ) : (
                    <Lock className="h-6 w-6 text-gray-400" />
                  )}
                  <div>
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                  </div>
                </div>
                <Badge variant={module.completed ? "default" : "secondary"}>
                  {Math.round(module.progress)}% Complete
                </Badge>
              </div>
              {module.unlocked && (
                <div className="mt-4">
                  <Progress value={module.progress} className="h-2" />
                </div>
              )}
            </CardHeader>

            {module.unlocked && (
              <CardContent>
                <div className="space-y-3">
                  {module.lessons.map((lesson) => {
                    const LessonIcon = getLessonIcon(lesson.type)
                    return (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {lesson.completed ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <LessonIcon className="h-5 w-5 text-muted-foreground" />
                          )}
                          <div>
                            <p className="font-medium">{lesson.title}</p>
                            <p className="text-sm text-muted-foreground">{lesson.duration}</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant={lesson.completed ? "outline" : "default"}
                          onClick={() => setSelectedLesson(lesson)}
                        >
                          {lesson.completed ? "Review" : "Start"}
                        </Button>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            )}

            {!module.unlocked && (
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Lock className="h-8 w-8 mx-auto mb-2" />
                  <p>Complete the previous module to unlock this content</p>
                  {moduleIndex > 0 && (
                    <p className="text-sm mt-1">Finish "{course.modules[moduleIndex - 1].title}" first</p>
                  )}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Lesson Dialog */}
      <Dialog open={!!selectedLesson} onOpenChange={() => setSelectedLesson(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedLesson && (
                <>
                  {React.createElement(getLessonIcon(selectedLesson.type), {
                    className: "h-5 w-5",
                  })}
                  {selectedLesson.title}
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {selectedLesson?.duration} • {selectedLesson?.type}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <Separator />
            <div className="prose max-w-none">
              <p>{selectedLesson?.content}</p>
            </div>

            {selectedLesson && !selectedLesson.completed && (
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setSelectedLesson(null)}>
                  Close
                </Button>
                <Button
                  onClick={() => {
                    const moduleId = course.modules.find((m) => m.lessons.some((l) => l.id === selectedLesson.id))?.id
                    if (moduleId) {
                      handleLessonComplete(moduleId, selectedLesson.id)
                    }
                  }}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark Complete
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Completion Certificate */}
      {course.overallProgress === 100 && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="flex items-center gap-4 p-6">
            <Award className="h-12 w-12 text-green-600" />
            <div>
              <h3 className="text-lg font-semibold text-green-900">Congratulations!</h3>
              <p className="text-green-700">You have completed this course. Your certificate is ready!</p>
            </div>
            <Button className="ml-auto">Download Certificate</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
