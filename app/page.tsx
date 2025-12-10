import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Users,
  Award,
  Shield,
  ChevronRight,
  Stethoscope,
  Brain,
  Pill,
  UserCheck,
  Microscope,
  Heart,
} from "lucide-react"
import Link from "next/link"

const courses = [
  {
    title: "Anatomy",
    description: "Comprehensive study of human body structure and systems",
    icon: Brain,
    students: 245,
    level: "Foundation",
  },
  {
    title: "Pharmacology",
    description: "Drug mechanisms, interactions, and therapeutic applications",
    icon: Pill,
    students: 189,
    level: "Advanced",
  },
  {
    title: "Management & Leadership",
    description: "Healthcare administration and leadership principles",
    icon: UserCheck,
    students: 156,
    level: "Professional",
  },
  {
    title: "ICT & Communication",
    description: "Medical informatics and healthcare communication",
    icon: Users,
    students: 203,
    level: "Foundation",
  },
  {
    title: "Pathology",
    description: "Disease mechanisms and diagnostic principles",
    icon: Microscope,
    students: 167,
    level: "Advanced",
  },
  {
    title: "Clinical Skills",
    description: "Practical patient care and clinical procedures",
    icon: Heart,
    students: 298,
    level: "Clinical",
  },
]

const stats = [
  { icon: BookOpen, label: "Active Courses", value: "150+" },
  { icon: Users, label: "Students Enrolled", value: "2,500+" },
  { icon: Award, label: "Certified Instructors", value: "85" },
  { icon: Shield, label: "Years of Excellence", value: "25" },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-50 to-white dark:from-medical-950 dark:to-gray-900">
      {/* Header */}
      <header className="border-b border-medical-200 dark:border-medical-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-medical-600 dark:bg-medical-500 rounded-lg flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-medical-900 dark:text-medical-100">MedLearn University</h1>
                <p className="text-sm text-medical-600 dark:text-medical-400">Excellence in Medical Education</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/login">
                <Button
                  variant="outline"
                  className="border-medical-300 dark:border-medical-700 text-medical-700 dark:text-medical-300 hover:bg-medical-50 dark:hover:bg-medical-900 bg-transparent"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-medical-600 hover:bg-medical-700 dark:bg-medical-500 dark:hover:bg-medical-600 text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold text-medical-900 dark:text-medical-100 mb-6">
              Advancing Medical Education Through
              <span className="text-medical-600 dark:text-medical-400"> Innovation</span>
            </h2>
            <p className="text-xl text-medical-700 dark:text-medical-300 mb-8 leading-relaxed">
              Join thousands of medical students and professionals in our comprehensive learning platform. Access
              world-class courses, interactive simulations, and expert-led instruction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <Button
                  size="lg"
                  className="bg-medical-600 hover:bg-medical-700 dark:bg-medical-500 dark:hover:bg-medical-600 text-white px-8 py-3"
                >
                  Start Learning Today
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/courses">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-medical-300 dark:border-medical-700 text-medical-700 dark:text-medical-300 hover:bg-medical-50 dark:hover:bg-medical-900 px-8 py-3 bg-transparent"
                >
                  Explore Courses
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-medical-100 dark:bg-medical-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-medical-600 dark:text-medical-400" />
                </div>
                <div className="text-3xl font-bold text-medical-900 dark:text-medical-100 mb-2">{stat.value}</div>
                <div className="text-medical-600 dark:text-medical-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 px-4 bg-medical-50 dark:bg-gray-800">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-medical-900 dark:text-medical-100 mb-4">Medical Specialties</h3>
            <p className="text-xl text-medical-700 dark:text-medical-300 max-w-2xl mx-auto">
              Comprehensive curriculum covering all essential areas of medical education
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow border-medical-200 dark:border-medical-800 bg-white dark:bg-gray-900"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-medical-100 dark:bg-medical-900 rounded-lg flex items-center justify-center">
                      <course.icon className="w-6 h-6 text-medical-600 dark:text-medical-400" />
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-medical-100 dark:bg-medical-900 text-medical-700 dark:text-medical-300"
                    >
                      {course.level}
                    </Badge>
                  </div>
                  <CardTitle className="text-medical-900 dark:text-medical-100">{course.title}</CardTitle>
                  <CardDescription className="text-medical-600 dark:text-medical-400">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-medical-600 dark:text-medical-400">
                      <Users className="w-4 h-4 mr-1" />
                      {course.students} students
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-medical-600 dark:text-medical-400 hover:text-medical-700 dark:hover:text-medical-300"
                    >
                      Learn More
                      <ChevronRight className="ml-1 w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-medical-600 dark:bg-medical-800">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-4xl font-bold text-white mb-6">Ready to Begin Your Medical Journey?</h3>
            <p className="text-xl text-medical-100 dark:text-medical-200 mb-8">
              Join our community of dedicated medical professionals and students. Access cutting-edge resources and
              expert instruction.
            </p>
            <Link href="/auth/register">
              <Button
                size="lg"
                className="bg-white text-medical-600 hover:bg-medical-50 dark:bg-gray-100 dark:text-medical-800 dark:hover:bg-gray-200 px-8 py-3"
              >
                Enroll Now
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-medical-900 dark:bg-gray-950 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-medical-600 dark:bg-medical-500 rounded-lg flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold">MedLearn University</span>
              </div>
              <p className="text-medical-300 dark:text-medical-400">
                Leading the future of medical education through innovation and excellence.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-medical-300 dark:text-medical-400">
                <li>
                  <Link href="/courses" className="hover:text-white">
                    Courses
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-medical-300 dark:text-medical-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="text-medical-300 dark:text-medical-400 space-y-2">
                <p>123 Medical Center Drive</p>
                <p>University City, UC 12345</p>
                <p>Phone: (555) 123-4567</p>
                <p>Email: info@medlearn.edu</p>
              </div>
            </div>
          </div>
          <div className="border-t border-medical-800 dark:border-medical-700 mt-8 pt-8 text-center text-medical-400">
            <p>&copy; 2024 MedLearn University. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
