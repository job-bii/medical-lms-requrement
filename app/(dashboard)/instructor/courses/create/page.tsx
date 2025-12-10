"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, GripVertical, Eye, EyeOff, Save, Upload, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { AIContentGenerator } from "@/components/ai-content-generator"

interface Lesson {
  id: string
  title: string
  type: "video" | "reading" | "quiz"
  duration: string
  content: string
}

interface Module {
  id: string
  title: string
  description: string
  lessons: Lesson[]
  isPublished: boolean
}

interface Course {
  title: string
  description: string
  category: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  duration: string
  image: string
  modules: Module[]
}

export default function CreateCoursePage() {
  const router = useRouter()
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [activeTab, setActiveTab] = useState("details")
  const [course, setCourse] = useState<Course>({
    title: "",
    description: "",
    category: "",
    difficulty: "Beginner",
    duration: "",
    image: "",
    modules: [],
  })

  const addModule = () => {
    const newModule: Module = {
      id: `module-${Date.now()}`,
      title: "New Module",
      description: "",
      lessons: [],
      isPublished: false,
    }
    setCourse((prev) => ({
      ...prev,
      modules: [...prev.modules, newModule],
    }))
  }

  const updateModule = (moduleId: string, updates: Partial<Module>) => {
    setCourse((prev) => ({
      ...prev,
      modules: prev.modules.map((module) => (module.id === moduleId ? { ...module, ...updates } : module)),
    }))
  }

  const deleteModule = (moduleId: string) => {
    setCourse((prev) => ({
      ...prev,
      modules: prev.modules.filter((module) => module.id !== moduleId),
    }))
  }

  const addLesson = (moduleId: string) => {
    const newLesson: Lesson = {
      id: `lesson-${Date.now()}`,
      title: "New Lesson",
      type: "video",
      duration: "10 min",
      content: "",
    }

    updateModule(moduleId, {
      lessons: [...(course.modules.find((m) => m.id === moduleId)?.lessons || []), newLesson],
    })
  }

  const updateLesson = (moduleId: string, lessonId: string, updates: Partial<Lesson>) => {
    const module = course.modules.find((m) => m.id === moduleId)
    if (!module) return

    const updatedLessons = module.lessons.map((lesson) => (lesson.id === lessonId ? { ...lesson, ...updates } : lesson))

    updateModule(moduleId, { lessons: updatedLessons })
  }

  const deleteLesson = (moduleId: string, lessonId: string) => {
    const module = course.modules.find((m) => m.id === moduleId)
    if (!module) return

    const updatedLessons = module.lessons.filter((lesson) => lesson.id !== lessonId)
    updateModule(moduleId, { lessons: updatedLessons })
  }

  const saveCourse = () => {
    // In a real app, this would save to your backend
    console.log("Saving course:", course)
    alert("Course saved successfully!")
  }

  const publishCourse = () => {
    // In a real app, this would publish the course
    console.log("Publishing course:", course)
    alert("Course published successfully!")
    router.push("/instructor/courses")
  }

  const getLessonTypeColor = (type: string) => {
    switch (type) {
      case "video":
        return "bg-blue-100 text-blue-800"
      case "reading":
        return "bg-purple-100 text-purple-800"
      case "quiz":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Create New Course</h1>
          <p className="text-muted-foreground">Build your course content with AI-powered tools</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="preview-mode">Preview Mode</Label>
            <Switch id="preview-mode" checked={isPreviewMode} onCheckedChange={setIsPreviewMode} />
            {isPreviewMode ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          </div>
          <Button variant="outline" onClick={saveCourse}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={publishCourse}>Publish Course</Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="details">Course Details</TabsTrigger>
          <TabsTrigger value="content">Content & Modules</TabsTrigger>
          <TabsTrigger value="ai-generator" className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4" />
            <span>AI Generator</span>
          </TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          {/* Course Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Course Information</CardTitle>
              <CardDescription>Basic details about your course</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Course Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter course title"
                    value={course.title}
                    onChange={(e) => setCourse((prev) => ({ ...prev, title: e.target.value }))}
                    disabled={isPreviewMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    placeholder="e.g., 8 weeks"
                    value={course.duration}
                    onChange={(e) => setCourse((prev) => ({ ...prev, duration: e.target.value }))}
                    disabled={isPreviewMode}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what students will learn in this course"
                  value={course.description}
                  onChange={(e) => setCourse((prev) => ({ ...prev, description: e.target.value }))}
                  disabled={isPreviewMode}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={course.category}
                    onValueChange={(value) => setCourse((prev) => ({ ...prev, category: value }))}
                    disabled={isPreviewMode}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic-sciences">Basic Sciences</SelectItem>
                      <SelectItem value="clinical">Clinical</SelectItem>
                      <SelectItem value="management">Management</SelectItem>
                      <SelectItem value="research">Research</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select
                    value={course.difficulty}
                    onValueChange={(value: "Beginner" | "Intermediate" | "Advanced") =>
                      setCourse((prev) => ({ ...prev, difficulty: value }))
                    }
                    disabled={isPreviewMode}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Course Image</Label>
                  <div className="flex gap-2">
                    <Input
                      id="image"
                      placeholder="Image URL"
                      value={course.image}
                      onChange={(e) => setCourse((prev) => ({ ...prev, image: e.target.value }))}
                      disabled={isPreviewMode}
                    />
                    <Button variant="outline" size="icon" disabled={isPreviewMode}>
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          {/* Course Modules */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Course Modules</CardTitle>
                  <CardDescription>Organize your course content into modules</CardDescription>
                </div>
                {!isPreviewMode && (
                  <Button onClick={addModule}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Module
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {course.modules.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No modules yet. Add your first module to get started.</p>
                </div>
              ) : (
                course.modules.map((module, moduleIndex) => (
                  <Card key={module.id} className="border-l-4 border-l-blue-500">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {!isPreviewMode && <GripVertical className="h-4 w-4 text-muted-foreground" />}
                          <div className="flex-1">
                            {isPreviewMode ? (
                              <div>
                                <CardTitle className="text-lg">{module.title}</CardTitle>
                                <CardDescription>{module.description}</CardDescription>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <Input
                                  value={module.title}
                                  onChange={(e) => updateModule(module.id, { title: e.target.value })}
                                  className="font-semibold"
                                />
                                <Input
                                  value={module.description}
                                  onChange={(e) => updateModule(module.id, { description: e.target.value })}
                                  placeholder="Module description"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {!isPreviewMode && (
                            <>
                              <div className="flex items-center gap-2">
                                <Label htmlFor={`published-${module.id}`} className="text-sm">
                                  Published
                                </Label>
                                <Switch
                                  id={`published-${module.id}`}
                                  checked={module.isPublished}
                                  onCheckedChange={(checked) => updateModule(module.id, { isPublished: checked })}
                                />
                              </div>
                              <Button variant="outline" size="sm" onClick={() => deleteModule(module.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      {/* Module Lessons */}
                      {module.lessons.map((lesson, lessonIndex) => (
                        <div key={lesson.id} className="flex items-center gap-3 p-3 border rounded-lg">
                          {!isPreviewMode && <GripVertical className="h-4 w-4 text-muted-foreground" />}
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-2">
                            {isPreviewMode ? (
                              <>
                                <div className="md:col-span-2">
                                  <div className="font-medium">{lesson.title}</div>
                                  <div className="text-sm text-muted-foreground">{lesson.duration}</div>
                                </div>
                                <div>
                                  <Badge className={getLessonTypeColor(lesson.type)}>{lesson.type}</Badge>
                                </div>
                              </>
                            ) : (
                              <>
                                <Input
                                  value={lesson.title}
                                  onChange={(e) => updateLesson(module.id, lesson.id, { title: e.target.value })}
                                  placeholder="Lesson title"
                                />
                                <Select
                                  value={lesson.type}
                                  onValueChange={(value: "video" | "reading" | "quiz") =>
                                    updateLesson(module.id, lesson.id, { type: value })
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="video">Video</SelectItem>
                                    <SelectItem value="reading">Reading</SelectItem>
                                    <SelectItem value="quiz">Quiz</SelectItem>
                                  </SelectContent>
                                </Select>
                                <Input
                                  value={lesson.duration}
                                  onChange={(e) => updateLesson(module.id, lesson.id, { duration: e.target.value })}
                                  placeholder="Duration"
                                />
                                <Button variant="outline" size="sm" onClick={() => deleteLesson(module.id, lesson.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      ))}

                      {!isPreviewMode && (
                        <Button variant="outline" onClick={() => addLesson(module.id)} className="w-full">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Lesson
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-generator">
          <AIContentGenerator />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Settings</CardTitle>
              <CardDescription>Configure your course preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-enroll">Auto-enrollment</Label>
                  <p className="text-sm text-muted-foreground">Automatically enroll students when they purchase</p>
                </div>
                <Switch id="auto-enroll" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="certificate">Certificate of completion</Label>
                  <p className="text-sm text-muted-foreground">Award certificates when students complete the course</p>
                </div>
                <Switch id="certificate" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="ai-assistance">AI Study Assistant</Label>
                  <p className="text-sm text-muted-foreground">Enable AI-powered study assistance for students</p>
                </div>
                <Switch id="ai-assistance" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
