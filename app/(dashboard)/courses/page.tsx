"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Star,
  Users,
  Clock,
  BookOpen,
  Play,
  Brain,
  Heart,
  Pill,
  Microscope,
  Stethoscope,
  Activity,
  Eye,
  Shield,
  GraduationCap,
} from "lucide-react"
import Link from "next/link"

const courses = [
  {
    id: "leadership-management",
    title: "Leadership and Management in Healthcare",
    instructor: "Dr. Sarah Johnson",
    description:
      "Comprehensive course covering leadership principles, management strategies, and organizational behavior in healthcare settings.",
    image: "/leadership-management-healthcare.png",
    category: "Leadership",
    difficulty: "Intermediate",
    duration: "12 weeks",
    students: 245,
    rating: 4.8,
    price: 399,
    enrolled: true,
    progress: 0,
    nextLesson: "What is Healthcare Leadership?",
    tags: ["Leadership", "Management", "Healthcare"],
  },
  {
    id: 1,
    title: "Human Anatomy Fundamentals",
    instructor: "Dr. Sarah Johnson",
    description: "Comprehensive study of human body systems, organs, and structures.",
    image: "/human-anatomy-skeleton.png",
    category: "Anatomy",
    difficulty: "Beginner",
    duration: "12 weeks",
    students: 1247,
    rating: 4.8,
    price: 299,
    enrolled: true,
    progress: 65,
    nextLesson: "Cardiovascular System",
    tags: ["Anatomy", "Biology", "Medicine"],
  },
  {
    id: 2,
    title: "Pharmacology Essentials",
    instructor: "Dr. Michael Chen",
    description: "Drug mechanisms, interactions, and therapeutic applications.",
    image: "/pharmacology-pills-medicine.png",
    category: "Pharmacology",
    difficulty: "Intermediate",
    duration: "10 weeks",
    students: 892,
    rating: 4.7,
    price: 349,
    enrolled: true,
    progress: 32,
    nextLesson: "Drug Metabolism",
    tags: ["Pharmacology", "Chemistry", "Therapeutics"],
  },
  {
    id: 3,
    title: "Pathology and Disease",
    instructor: "Dr. Emily Rodriguez",
    description: "Understanding disease processes and diagnostic techniques.",
    image: "/pathology-microscope-lab.png",
    category: "Pathology",
    difficulty: "Advanced",
    duration: "14 weeks",
    students: 634,
    rating: 4.9,
    price: 399,
    enrolled: false,
    progress: 0,
    nextLesson: "",
    tags: ["Pathology", "Diagnosis", "Laboratory"],
  },
  {
    id: 4,
    title: "Cardiovascular Medicine",
    instructor: "Dr. James Wilson",
    description: "Heart and vascular system disorders and treatments.",
    image: "/heart-cardiovascular-system.png",
    category: "Cardiology",
    difficulty: "Advanced",
    duration: "16 weeks",
    students: 567,
    rating: 4.6,
    price: 449,
    enrolled: false,
    progress: 0,
    nextLesson: "",
    tags: ["Cardiology", "Heart", "Vascular"],
  },
  {
    id: 5,
    title: "Neurology and Brain Function",
    instructor: "Dr. Lisa Park",
    description: "Nervous system anatomy, physiology, and neurological disorders.",
    image: "/brain-neurology-nervous-system.png",
    category: "Neurology",
    difficulty: "Advanced",
    duration: "18 weeks",
    students: 423,
    rating: 4.8,
    price: 499,
    enrolled: true,
    progress: 8,
    nextLesson: "Brain Anatomy Overview",
    tags: ["Neurology", "Brain", "Nervous System"],
  },
  {
    id: 6,
    title: "Microbiology and Infectious Diseases",
    instructor: "Dr. Robert Kim",
    description: "Microorganisms, infections, and antimicrobial treatments.",
    image: "/microbiology-bacteria-virus.png",
    category: "Microbiology",
    difficulty: "Intermediate",
    duration: "12 weeks",
    students: 789,
    rating: 4.5,
    price: 329,
    enrolled: false,
    progress: 0,
    nextLesson: "",
    tags: ["Microbiology", "Infection", "Bacteria"],
  },
  {
    id: 7,
    title: "Clinical Skills and Examination",
    instructor: "Dr. Maria Garcia",
    description: "Hands-on clinical examination techniques and patient interaction.",
    image: "/clinical-skills-stethoscope-examination.png",
    category: "Clinical Skills",
    difficulty: "Intermediate",
    duration: "8 weeks",
    students: 1156,
    rating: 4.9,
    price: 279,
    enrolled: false,
    progress: 0,
    nextLesson: "",
    tags: ["Clinical", "Examination", "Patient Care"],
  },
  {
    id: 8,
    title: "Medical Ethics and Law",
    instructor: "Dr. David Thompson",
    description: "Ethical principles and legal aspects of medical practice.",
    image: "/medical-ethics-law-books.png",
    category: "Ethics",
    difficulty: "Beginner",
    duration: "6 weeks",
    students: 934,
    rating: 4.4,
    price: 199,
    enrolled: false,
    progress: 0,
    nextLesson: "",
    tags: ["Ethics", "Law", "Professional"],
  },
  {
    id: 9,
    title: "Medical Imaging and Radiology",
    instructor: "Dr. Jennifer Lee",
    description: "X-rays, CT scans, MRI, and other imaging modalities.",
    image: "/medical-imaging-xray-ct-scan.png",
    category: "Radiology",
    difficulty: "Advanced",
    duration: "14 weeks",
    students: 445,
    rating: 4.7,
    price: 429,
    enrolled: false,
    progress: 0,
    nextLesson: "",
    tags: ["Radiology", "Imaging", "Diagnosis"],
  },
]

const categoryIcons = {
  Leadership: GraduationCap,
  Anatomy: Brain,
  Pharmacology: Pill,
  Pathology: Microscope,
  Cardiology: Heart,
  Neurology: Brain,
  Microbiology: Activity,
  "Clinical Skills": Stethoscope,
  Ethics: Shield,
  Radiology: Eye,
}

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === "All" || course.difficulty === selectedDifficulty

    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const enrolledCourses = courses.filter((course) => course.enrolled)
  const categories = ["All", ...Array.from(new Set(courses.map((course) => course.category)))]
  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"]

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-medical-900">Courses</h1>
          <p className="text-medical-600">Explore and continue your medical education</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-medical-400 h-4 w-4" />
            <Input
              placeholder="Search courses, instructors, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-medical-200 focus:border-medical-500"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48 border-medical-200">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
            <SelectTrigger className="w-full sm:w-48 border-medical-200">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              {difficulties.map((difficulty) => (
                <SelectItem key={difficulty} value={difficulty}>
                  {difficulty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-medical-100 dark:bg-medical-900">
          <TabsTrigger value="all" className="data-[state=active]:bg-medical-600 data-[state=active]:text-white">
            All Courses ({filteredCourses.length})
          </TabsTrigger>
          <TabsTrigger value="enrolled" className="data-[state=active]:bg-medical-600 data-[state=active]:text-white">
            My Courses ({enrolledCourses.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const IconComponent = categoryIcons[course.category as keyof typeof categoryIcons] || BookOpen
              return (
                <Card key={course.id} className="border-medical-200 hover:border-medical-400 transition-colors">
                  <div className="relative">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge variant="secondary" className="absolute top-2 right-2 bg-medical-600 text-white">
                      {course.difficulty}
                    </Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <IconComponent className="h-5 w-5 text-medical-600" />
                        <Badge variant="outline" className="border-medical-300 text-medical-700">
                          {course.category}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-medical-900 dark:text-medical-100">{course.title}</CardTitle>
                    <CardDescription className="text-medical-600 dark:text-medical-400">
                      {course.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm text-medical-600 dark:text-medical-400">
                        <span>By {course.instructor}</span>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{course.students}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{course.duration}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {course.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs bg-medical-100 text-medical-700">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      {course.enrolled && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-medical-600">Progress</span>
                            <span className="font-medium text-medical-900">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                          <p className="text-sm text-medical-600">Next: {course.nextLesson}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-medical-900 dark:text-medical-100">${course.price}</div>
                    <Link href={`/courses/${course.id}`}>
                      <Button
                        className={
                          course.enrolled
                            ? "bg-medical-600 hover:bg-medical-700 text-white"
                            : "bg-medical-600 hover:bg-medical-700 text-white"
                        }
                      >
                        {course.enrolled ? (
                          course.progress > 0 ? (
                            <>
                              <Play className="h-4 w-4 mr-2" />
                              Continue
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4 mr-2" />
                              Start Course
                            </>
                          )
                        ) : (
                          "Enroll Now"
                        )}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="enrolled" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => {
              const IconComponent = categoryIcons[course.category as keyof typeof categoryIcons] || BookOpen
              return (
                <Card key={course.id} className="border-medical-200 hover:border-medical-400 transition-colors">
                  <div className="relative">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge variant="secondary" className="absolute top-2 right-2 bg-green-600 text-white">
                      Enrolled
                    </Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <IconComponent className="h-5 w-5 text-medical-600" />
                        <Badge variant="outline" className="border-medical-300 text-medical-700">
                          {course.category}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-medical-900 dark:text-medical-100">{course.title}</CardTitle>
                    <CardDescription className="text-medical-600 dark:text-medical-400">
                      By {course.instructor}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-medical-600">Progress</span>
                          <span className="font-medium text-medical-900">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                        <p className="text-sm text-medical-600">Next: {course.nextLesson}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/courses/${course.id}`} className="w-full">
                      <Button className="w-full bg-medical-600 hover:bg-medical-700 text-white">
                        {course.progress > 0 ? (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Continue Learning
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Start Course
                          </>
                        )}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
