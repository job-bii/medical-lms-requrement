"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import {
  BookOpen,
  Users,
  Shield,
  Settings,
  Code,
  Database,
  Palette,
  Download,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Info,
  Lightbulb,
  Zap,
  Lock,
  Eye,
  UserCheck,
  BarChart3,
  MessageSquare,
  HelpCircle,
  ChevronRight,
  Stethoscope,
  Clock,
  FileText,
  GitBranch,
} from "lucide-react"

// System version and last updated tracking
const SYSTEM_VERSION = "1.2.0"
const LAST_UPDATED = "2024-01-08"
const RECENT_CHANGES = [
  {
    version: "1.2.0",
    date: "2024-01-08",
    changes: [
      "Added comprehensive system documentation",
      "Implemented pending approval page for instructors",
      "Enhanced authentication flow documentation",
      "Added troubleshooting guide",
    ],
  },
  {
    version: "1.1.0",
    date: "2024-01-07",
    changes: [
      "Enhanced instructor dashboard with content studio",
      "Added gradebook and analytics features",
      "Implemented communication center",
      "Added bulk content operations",
    ],
  },
  {
    version: "1.0.0",
    date: "2024-01-05",
    changes: [
      "Initial system release",
      "Basic authentication with 2FA",
      "Role-based access control",
      "Student and admin dashboards",
    ],
  },
]

export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState("overview")

  const navigationItems = [
    { id: "overview", title: "System Overview", icon: BookOpen },
    { id: "changelog", title: "Changelog", icon: GitBranch },
    { id: "architecture", title: "Architecture", icon: Code },
    { id: "authentication", title: "Authentication", icon: Shield },
    { id: "user-roles", title: "User Roles", icon: Users },
    { id: "features", title: "Features", icon: Zap },
    { id: "ui-components", title: "UI Components", icon: Palette },
    { id: "api", title: "API Reference", icon: Database },
    { id: "deployment", title: "Deployment", icon: Settings },
    { id: "troubleshooting", title: "Troubleshooting", icon: HelpCircle },
  ]

  const techStack = [
    { name: "Next.js 15", description: "React framework with App Router", category: "Frontend", version: "15.0.0" },
    { name: "TypeScript", description: "Type-safe JavaScript", category: "Language", version: "5.3.0" },
    { name: "Tailwind CSS", description: "Utility-first CSS framework", category: "Styling", version: "3.4.0" },
    { name: "shadcn/ui", description: "Reusable UI components", category: "Components", version: "Latest" },
    { name: "Lucide React", description: "Beautiful icons", category: "Icons", version: "0.294.0" },
    { name: "next-themes", description: "Dark mode support", category: "Theming", version: "0.2.1" },
  ]

  const userRoles = [
    {
      role: "Student",
      permissions: [
        "View enrolled courses and progress",
        "Access course materials and videos",
        "Submit assignments and take quizzes",
        "View grades and feedback",
        "Participate in discussion forums",
        "Download certificates upon completion",
        "Update profile information",
        "Access study materials and flashcards",
      ],
      dashboard:
        "Student-focused interface with progress tracking, upcoming assignments, course overview, and quick access to learning materials",
      features: ["Progress analytics", "Assignment calendar", "Achievement badges", "Study groups access"],
    },
    {
      role: "Instructor",
      permissions: [
        "Create and manage courses",
        "Upload content (videos, documents, quizzes)",
        "Grade assignments and provide feedback",
        "View detailed student analytics",
        "Send announcements to students",
        "Manage discussion forums",
        "Export grade reports and data",
        "Create and schedule assessments",
        "Manage course enrollment",
        "Access content creation tools",
      ],
      dashboard:
        "Comprehensive teaching interface with content studio, gradebook, analytics dashboard, and communication center",
      features: [
        "Content creation studio",
        "Advanced gradebook",
        "Student progress analytics",
        "Bulk operations",
        "Communication tools",
      ],
    },
    {
      role: "Admin",
      permissions: [
        "Manage all users and accounts",
        "Approve instructor registrations",
        "Configure system settings",
        "View system-wide analytics",
        "Manage courses globally",
        "Monitor security and access",
        "Export system data and reports",
        "Manage user permissions",
        "Configure institutional settings",
        "Oversee system maintenance",
      ],
      dashboard:
        "System administration interface with user management, approval workflows, system analytics, and configuration tools",
      features: [
        "User approval system",
        "System-wide analytics",
        "Security monitoring",
        "Global course management",
        "System configuration",
      ],
    },
  ]

  const features = [
    {
      category: "Authentication & Security",
      status: "✅ Complete",
      items: [
        "Institutional email validation (@university.edu domains)",
        "Two-factor authentication (2FA) with email/SMS",
        "Role-based access control (RBAC)",
        "Account approval workflow for instructors",
        "Secure password reset functionality",
        "Session management with auto-expiry",
        "Security monitoring and audit logs",
        "CSRF protection and secure headers",
      ],
    },
    {
      category: "Course Management",
      status: "✅ Complete",
      items: [
        "Course creation with templates",
        "Multi-format content upload (video, PDF, images)",
        "Module and week-based organization",
        "Automatic video transcription and captioning",
        "File version control and history",
        "Bulk content operations",
        "Course analytics and reporting",
        "Enrollment management",
      ],
    },
    {
      category: "Learning Tools",
      status: "🚧 In Progress",
      items: [
        "Interactive video player with progress tracking",
        "Flashcard system with spaced repetition",
        "Quiz builder with multiple question types",
        "Assignment submission and grading system",
        "Progress tracking and analytics",
        "Certificate generation upon completion",
        "Discussion forums and Q&A",
        "Study groups and collaboration tools",
      ],
    },
    {
      category: "Communication",
      status: "✅ Complete",
      items: [
        "System-wide announcement system",
        "Direct messaging between users",
        "Discussion forums per course",
        "Email notifications for key events",
        "Push notifications (planned)",
        "SMS alerts for urgent matters",
        "Calendar integration",
        "Real-time messaging (planned)",
      ],
    },
    {
      category: "Analytics & Reporting",
      status: "✅ Complete",
      items: [
        "Student progress analytics",
        "Course performance metrics",
        "Engagement tracking and heatmaps",
        "Grade distribution analysis",
        "Export capabilities (PDF, CSV, Excel)",
        "Real-time dashboards",
        "Custom report generation",
        "Predictive analytics (planned)",
      ],
    },
    {
      category: "Mobile & Accessibility",
      status: "📋 Planned",
      items: [
        "Mobile-responsive design",
        "PWA (Progressive Web App) support",
        "Offline content access",
        "Screen reader compatibility",
        "Keyboard navigation support",
        "High contrast mode",
        "Font size adjustment",
        "Multi-language support",
      ],
    },
  ]

  const apiEndpoints = [
    {
      method: "POST",
      endpoint: "/api/auth/register",
      description: "Register a new user account with institutional validation",
      parameters: ["email", "password", "role", "firstName", "lastName", "department"],
      response: "User ID, registration status, next steps",
      status: "✅ Implemented",
    },
    {
      method: "POST",
      endpoint: "/api/auth/login",
      description: "Authenticate user login with role-based redirection",
      parameters: ["email", "password", "rememberMe"],
      response: "Authentication token, user role, dashboard URL",
      status: "✅ Implemented",
    },
    {
      method: "POST",
      endpoint: "/api/auth/setup-2fa",
      description: "Configure two-factor authentication for new accounts",
      parameters: ["userId", "method", "phoneNumber"],
      response: "2FA setup status, backup codes",
      status: "✅ Implemented",
    },
    {
      method: "GET",
      endpoint: "/api/courses",
      description: "Get list of courses with filtering and pagination",
      parameters: ["page", "limit", "filter", "department", "level"],
      response: "Course list, pagination info, filters",
      status: "🚧 In Progress",
    },
    {
      method: "POST",
      endpoint: "/api/courses",
      description: "Create a new course (instructor/admin only)",
      parameters: ["title", "description", "department", "credits", "template"],
      response: "Course ID, creation status, next steps",
      status: "🚧 In Progress",
    },
    {
      method: "GET",
      endpoint: "/api/users/profile",
      description: "Get detailed user profile information",
      parameters: ["userId", "includeProgress"],
      response: "User profile, course progress, achievements",
      status: "✅ Implemented",
    },
    {
      method: "PUT",
      endpoint: "/api/users/profile",
      description: "Update user profile information",
      parameters: ["firstName", "lastName", "phoneNumber", "avatar"],
      response: "Update status, validation errors",
      status: "✅ Implemented",
    },
    {
      method: "GET",
      endpoint: "/api/admin/approvals",
      description: "Get pending instructor approval requests",
      parameters: ["status", "department", "page"],
      response: "Approval requests, user details, review info",
      status: "✅ Implemented",
    },
  ]

  const deploymentChecklist = [
    { item: "Node.js 18+ installed", status: "required", category: "Prerequisites" },
    { item: "npm or yarn package manager", status: "required", category: "Prerequisites" },
    { item: "Git version control", status: "required", category: "Prerequisites" },
    { item: "Environment variables configured", status: "required", category: "Configuration" },
    { item: "Database connection established", status: "required", category: "Configuration" },
    { item: "Email service configured", status: "required", category: "Configuration" },
    { item: "SSL certificates installed", status: "recommended", category: "Security" },
    { item: "CDN configured for assets", status: "recommended", category: "Performance" },
    { item: "Monitoring tools setup", status: "recommended", category: "Operations" },
    { item: "Backup strategy implemented", status: "recommended", category: "Operations" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-medical-600 rounded-lg flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-medical-900 dark:text-white">MedLearn University</h1>
                <p className="text-medical-600 dark:text-gray-300">System Documentation v{SYSTEM_VERSION}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
              >
                <CheckCircle className="w-3 h-3 mr-1" />
                Active Development
              </Badge>
              <Badge
                variant="outline"
                className="border-medical-300 text-medical-700 dark:border-gray-600 dark:text-gray-300"
              >
                <Clock className="w-3 h-3 mr-1" />
                Updated {LAST_UPDATED}
              </Badge>
            </div>
          </div>
          <p className="text-lg text-medical-700 dark:text-gray-300 max-w-3xl">
            Comprehensive documentation for the Medical Learning Management System - a modern, secure, and scalable
            platform designed specifically for medical education. This documentation is continuously updated as the
            system evolves.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-medical-200 dark:border-gray-700 dark:bg-gray-800 sticky top-6">
              <CardHeader>
                <CardTitle className="text-medical-900 dark:text-white">Navigation</CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  {navigationItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeSection === item.id
                          ? "bg-medical-100 dark:bg-medical-900/20 text-medical-900 dark:text-medical-300"
                          : "text-medical-600 dark:text-gray-400 hover:bg-medical-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.title}</span>
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* System Overview */}
            {activeSection === "overview" && (
              <div className="space-y-6">
                <Card className="border-medical-200 dark:border-gray-700 dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-medical-900 dark:text-white flex items-center">
                      <BookOpen className="w-5 h-5 mr-2" />
                      System Overview
                    </CardTitle>
                    <CardDescription className="text-medical-600 dark:text-gray-300">
                      Introduction to the Medical Learning Management System
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-medical-900 dark:text-white mb-3">About MedLearn</h3>
                      <p className="text-medical-700 dark:text-gray-300 mb-4">
                        MedLearn University is a comprehensive Learning Management System specifically designed for
                        medical education. It provides a secure, scalable, and user-friendly platform for students,
                        instructors, and administrators to manage medical courses, track progress, and facilitate
                        learning in the healthcare field.
                      </p>
                      <p className="text-medical-700 dark:text-gray-300">
                        Built with modern web technologies and following healthcare data security standards, MedLearn
                        offers a complete solution for medical institutions looking to digitize their educational
                        processes while maintaining the highest standards of security and compliance.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-medical-900 dark:text-white mb-3">Key Highlights</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start space-x-3">
                          <Shield className="w-5 h-5 text-medical-600 dark:text-medical-400 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-medical-900 dark:text-white">Security First</h4>
                            <p className="text-sm text-medical-600 dark:text-gray-400">
                              Enterprise-grade security with 2FA, role-based access, institutional email validation, and
                              comprehensive audit trails
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <Palette className="w-5 h-5 text-medical-600 dark:text-medical-400 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-medical-900 dark:text-white">Modern UI/UX</h4>
                            <p className="text-sm text-medical-600 dark:text-gray-400">
                              Clean, responsive design with medical theming, dark mode support, and full accessibility
                              compliance
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <BarChart3 className="w-5 h-5 text-medical-600 dark:text-medical-400 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-medical-900 dark:text-white">Advanced Analytics</h4>
                            <p className="text-sm text-medical-600 dark:text-gray-400">
                              Comprehensive tracking and reporting for student progress, course performance, and
                              institutional insights
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <Zap className="w-5 h-5 text-medical-600 dark:text-medical-400 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-medical-900 dark:text-white">Performance Optimized</h4>
                            <p className="text-sm text-medical-600 dark:text-gray-400">
                              Built with Next.js 15 and modern optimization techniques for fast loading and smooth user
                              experience
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-medical-900 dark:text-white mb-3">Technology Stack</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {techStack.map((tech, index) => (
                          <div key={index} className="p-3 border border-medical-200 dark:border-gray-600 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-medical-900 dark:text-white">{tech.name}</h4>
                              <div className="flex space-x-2">
                                <Badge
                                  variant="secondary"
                                  className="bg-medical-100 dark:bg-medical-900/20 text-medical-700 dark:text-medical-300"
                                >
                                  {tech.category}
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className="border-medical-300 text-medical-600 dark:border-gray-600 dark:text-gray-400 text-xs"
                                >
                                  v{tech.version}
                                </Badge>
                              </div>
                            </div>
                            <p className="text-sm text-medical-600 dark:text-gray-400">{tech.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20">
                      <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <AlertDescription className="text-blue-700 dark:text-blue-300">
                        <strong>Documentation Promise:</strong> This documentation is maintained alongside code changes
                        and updated with every feature release. Version history and changelogs track all system
                        modifications.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Changelog Section */}
            {activeSection === "changelog" && (
              <div className="space-y-6">
                <Card className="border-medical-200 dark:border-gray-700 dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-medical-900 dark:text-white flex items-center">
                      <GitBranch className="w-5 h-5 mr-2" />
                      Changelog & Version History
                    </CardTitle>
                    <CardDescription className="text-medical-600 dark:text-gray-300">
                      Track system updates, new features, and improvements
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-medical-900 dark:text-white">Recent Updates</h3>
                      <Badge className="bg-medical-600 text-white">Current Version: {SYSTEM_VERSION}</Badge>
                    </div>

                    <div className="space-y-6">
                      {RECENT_CHANGES.map((release, index) => (
                        <div key={index} className="relative">
                          {index < RECENT_CHANGES.length - 1 && (
                            <div className="absolute left-6 top-12 bottom-0 w-px bg-medical-200 dark:bg-gray-600"></div>
                          )}
                          <div className="flex items-start space-x-4">
                            <div
                              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                index === 0
                                  ? "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                                  : "bg-medical-100 text-medical-600 dark:bg-medical-900/20 dark:text-medical-400"
                              }`}
                            >
                              <GitBranch className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h4 className="text-lg font-semibold text-medical-900 dark:text-white">
                                  Version {release.version}
                                </h4>
                                <Badge
                                  variant={index === 0 ? "default" : "secondary"}
                                  className={
                                    index === 0
                                      ? "bg-green-600 text-white"
                                      : "bg-medical-100 text-medical-700 dark:bg-medical-900/20 dark:text-medical-300"
                                  }
                                >
                                  {index === 0 ? "Latest" : "Released"}
                                </Badge>
                                <span className="text-sm text-medical-600 dark:text-gray-400">{release.date}</span>
                              </div>
                              <ul className="space-y-2">
                                {release.changes.map((change, changeIndex) => (
                                  <li key={changeIndex} className="flex items-center space-x-2">
                                    <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                                    <span className="text-sm text-medical-700 dark:text-gray-300">{change}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Alert className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20">
                      <Lightbulb className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                      <AlertDescription className="text-yellow-700 dark:text-yellow-300">
                        <strong>Upcoming Features:</strong> Mobile app development, advanced analytics dashboard,
                        AI-powered content recommendations, and integration with external medical databases are planned
                        for future releases.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Architecture */}
            {activeSection === "architecture" && (
              <div className="space-y-6">
                <Card className="border-medical-200 dark:border-gray-700 dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-medical-900 dark:text-white flex items-center">
                      <Code className="w-5 h-5 mr-2" />
                      System Architecture
                    </CardTitle>
                    <CardDescription className="text-medical-600 dark:text-gray-300">
                      Technical architecture and project structure
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-medical-900 dark:text-white mb-3">Project Structure</h3>
                      <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                        <pre className="text-gray-800 dark:text-gray-200">
                          {`medical-lms/
├── app/                          # Next.js App Router
│   ├── auth/                     # Authentication pages
│   │   ├── login/                # User login page
│   │   ├── register/             # User registration
│   │   ├── setup-2fa/            # Two-factor auth setup
│   │   ├── verify-2fa/           # 2FA verification
│   │   ├── pending-approval/     # Instructor approval page
│   │   └── forgot-password/      # Password reset
│   ├── dashboard/                # Role-based dashboards
│   │   ├── student/              # Student dashboard
│   │   ├── instructor/           # Instructor dashboard
│   │   └── admin/                # Admin dashboard
│   ├── docs/                     # System documentation
│   ├── settings/                 # User settings
│   ├── profile/                  # User profile management
│   ├── globals.css               # Global styles
│   └── layout.tsx                # Root layout
├── components/                   # Reusable components
│   ├── ui/                       # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ... (other UI components)
│   ├── app-sidebar.tsx           # Navigation sidebar
│   ├── content-creator.tsx       # Content creation tools
│   ├── theme-provider.tsx        # Theme management
│   └── theme-toggle.tsx          # Theme switcher
├── lib/                          # Utility functions
│   └── utils.ts                  # Common utilities
├── public/                       # Static assets
├── tailwind.config.ts            # Tailwind configuration
├── package.json                  # Dependencies
└── next.config.mjs               # Next.js configuration`}
                        </pre>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-medical-900 dark:text-white mb-3">
                        Component Architecture
                      </h3>
                      <div className="space-y-4">
                        <div className="p-4 border border-medical-200 dark:border-gray-600 rounded-lg">
                          <h4 className="font-medium text-medical-900 dark:text-white mb-2">Layout Components</h4>
                          <ul className="text-sm text-medical-600 dark:text-gray-400 space-y-1">
                            <li>• Root Layout with theme provider and global styles</li>
                            <li>• Dashboard Layout with sidebar navigation and header</li>
                            <li>• Authentication Layout for login/register pages</li>
                            <li>• Documentation Layout for help and guides</li>
                          </ul>
                        </div>
                        <div className="p-4 border border-medical-200 dark:border-gray-600 rounded-lg">
                          <h4 className="font-medium text-medical-900 dark:text-white mb-2">Feature Components</h4>
                          <ul className="text-sm text-medical-600 dark:text-gray-400 space-y-1">
                            <li>• Content Creator for course materials and multimedia</li>
                            <li>• Analytics Dashboard for progress tracking and insights</li>
                            <li>• Gradebook for assignment management and scoring</li>
                            <li>• Communication Center for messaging and announcements</li>
                            <li>• User Management for admin and approval workflows</li>
                          </ul>
                        </div>
                        <div className="p-4 border border-medical-200 dark:border-gray-600 rounded-lg">
                          <h4 className="font-medium text-medical-900 dark:text-white mb-2">UI Components</h4>
                          <ul className="text-sm text-medical-600 dark:text-gray-400 space-y-1">
                            <li>• shadcn/ui component library with medical theming</li>
                            <li>• Custom components for medical-specific functionality</li>
                            <li>• Responsive design patterns for all screen sizes</li>
                            <li>• Dark mode support with automatic system detection</li>
                            <li>• Accessibility-compliant components with ARIA support</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-medical-900 dark:text-white mb-3">Data Flow</h3>
                      <div className="bg-medical-50 dark:bg-gray-700/50 p-4 rounded-lg">
                        <div className="flex items-center space-x-4 text-sm flex-wrap">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span className="text-medical-700 dark:text-gray-300">Client Components</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-medical-600 dark:text-gray-400" />
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-medical-700 dark:text-gray-300">Server Actions</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-medical-600 dark:text-gray-400" />
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                            <span className="text-medical-700 dark:text-gray-300">Database Layer</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-medical-600 dark:text-gray-400" />
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                            <span className="text-medical-700 dark:text-gray-300">External APIs</span>
                          </div>
                        </div>
                        <p className="text-sm text-medical-600 dark:text-gray-400 mt-3">
                          Modern architecture with client-side hydration, server-side rendering, and optimized data
                          fetching
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Authentication */}
            {activeSection === "authentication" && (
              <div className="space-y-6">
                <Card className="border-medical-200 dark:border-gray-700 dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-medical-900 dark:text-white flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      Authentication System
                    </CardTitle>
                    <CardDescription className="text-medical-600 dark:text-gray-300">
                      Comprehensive security features and authentication flow
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-medical-900 dark:text-white mb-3">
                        Authentication Flow
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-medical-100 dark:bg-medical-900/20 rounded-full flex items-center justify-center text-medical-600 dark:text-medical-400 font-semibold text-sm">
                            1
                          </div>
                          <div>
                            <h4 className="font-medium text-medical-900 dark:text-white">User Registration</h4>
                            <p className="text-sm text-medical-600 dark:text-gray-400">
                              New users register with institutional email, role selection, and complete profile
                              information. Email domain validation ensures only authorized users can register.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-medical-100 dark:bg-medical-900/20 rounded-full flex items-center justify-center text-medical-600 dark:text-medical-400 font-semibold text-sm">
                            2
                          </div>
                          <div>
                            <h4 className="font-medium text-medical-900 dark:text-white">Role-Based Processing</h4>
                            <p className="text-sm text-medical-600 dark:text-gray-400">
                              Students proceed directly to 2FA setup, while instructors require admin approval before
                              accessing the system. This ensures proper verification of teaching credentials.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-medical-100 dark:bg-medical-900/20 rounded-full flex items-center justify-center text-medical-600 dark:text-medical-400 font-semibold text-sm">
                            3
                          </div>
                          <div>
                            <h4 className="font-medium text-medical-900 dark:text-white">2FA Setup (One-Time)</h4>
                            <p className="text-sm text-medical-600 dark:text-gray-400">
                              First-time setup of two-factor authentication with email or SMS verification. Users choose
                              their preferred method and receive backup codes for account recovery.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-medical-100 dark:bg-medical-900/20 rounded-full flex items-center justify-center text-medical-600 dark:text-medical-400 font-semibold text-sm">
                            4
                          </div>
                          <div>
                            <h4 className="font-medium text-medical-900 dark:text-white">Standard Login</h4>
                            <p className="text-sm text-medical-600 dark:text-gray-400">
                              After initial setup, users login with email/password only. 2FA is not required for
                              subsequent logins, providing a balance between security and usability.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 font-semibold text-sm">
                            ✓
                          </div>
                          <div>
                            <h4 className="font-medium text-medical-900 dark:text-white">Dashboard Access</h4>
                            <p className="text-sm text-medical-600 dark:text-gray-400">
                              Role-based redirection to appropriate dashboard (Student/Instructor/Admin) with full
                              access to features based on user permissions and institutional policies.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-medical-200 dark:bg-gray-600" />

                    <div>
                      <h3 className="text-lg font-semibold text-medical-900 dark:text-white mb-3">Security Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border border-medical-200 dark:border-gray-600 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <Lock className="w-4 h-4 text-medical-600 dark:text-medical-400" />
                            <h4 className="font-medium text-medical-900 dark:text-white">Email Validation</h4>
                          </div>
                          <p className="text-sm text-medical-600 dark:text-gray-400">
                            Strict institutional email domain validation (@university.edu, @medschool.edu,
                            @health.university.edu) ensures only authorized users can register
                          </p>
                        </div>
                        <div className="p-4 border border-medical-200 dark:border-gray-600 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <Shield className="w-4 h-4 text-medical-600 dark:text-medical-400" />
                            <h4 className="font-medium text-medical-900 dark:text-white">Password Security</h4>
                          </div>
                          <p className="text-sm text-medical-600 dark:text-gray-400">
                            Comprehensive password policy requiring uppercase, lowercase, numbers, special characters,
                            and minimum 8 characters length
                          </p>
                        </div>
                        <div className="p-4 border border-medical-200 dark:border-gray-600 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <UserCheck className="w-4 h-4 text-medical-600 dark:text-medical-400" />
                            <h4 className="font-medium text-medical-900 dark:text-white">Role-Based Access</h4>
                          </div>
                          <p className="text-sm text-medical-600 dark:text-gray-400">
                            Granular permissions system with role-based access control ensuring users only see features
                            appropriate to their role
                          </p>
                        </div>
                        <div className="p-4 border border-medical-200 dark:border-gray-600 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <Eye className="w-4 h-4 text-medical-600 dark:text-medical-400" />
                            <h4 className="font-medium text-medical-900 dark:text-white">Session Management</h4>
                          </div>
                          <p className="text-sm text-medical-600 dark:text-gray-400">
                            Secure session handling with automatic expiry after 30 minutes of inactivity and
                            comprehensive session monitoring
                          </p>
                        </div>
                      </div>
                    </div>

                    <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20">
                      <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <AlertDescription className="text-blue-700 dark:text-blue-300">
                        <strong>Security Standards:</strong> All authentication flows follow healthcare data security
                        best practices including HIPAA compliance considerations, CSRF protection, secure headers, and
                        comprehensive audit logging for compliance reporting.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* User Roles */}
            {activeSection === "user-roles" && (
              <div className="space-y-6">
                <Card className="border-medical-200 dark:border-gray-700 dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-medical-900 dark:text-white flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      User Roles & Permissions
                    </CardTitle>
                    <CardDescription className="text-medical-600 dark:text-gray-300">
                      Detailed breakdown of user roles, permissions, and capabilities
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {userRoles.map((roleData, index) => (
                      <div key={index} className="p-6 border border-medical-200 dark:border-gray-600 rounded-lg">
                        <div className="flex items-center space-x-3 mb-4">
                          <Badge
                            variant="secondary"
                            className="bg-medical-100 dark:bg-medical-900/20 text-medical-700 dark:text-medical-300"
                          >
                            {roleData.role}
                          </Badge>
                          <h3 className="text-lg font-semibold text-medical-900 dark:text-white">
                            {roleData.role} Role
                          </h3>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium text-medical-900 dark:text-white mb-3">Core Permissions</h4>
                            <ul className="space-y-2">
                              {roleData.permissions.map((permission, permIndex) => (
                                <li key={permIndex} className="flex items-center space-x-2">
                                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                                  <span className="text-sm text-medical-600 dark:text-gray-400">{permission}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-medium text-medical-900 dark:text-white mb-3">Dashboard Overview</h4>
                            <p className="text-sm text-medical-600 dark:text-gray-400 mb-4">{roleData.dashboard}</p>

                            <h4 className="font-medium text-medical-900 dark:text-white mb-2">Key Features</h4>
                            <div className="flex flex-wrap gap-2">
                              {roleData.features.map((feature, featureIndex) => (
                                <Badge
                                  key={featureIndex}
                                  variant="outline"
                                  className="border-medical-300 text-medical-700 dark:border-gray-600 dark:text-gray-300 text-xs"
                                >
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Features */}
            {activeSection === "features" && (
              <div className="space-y-6">
                <Card className="border-medical-200 dark:border-gray-700 dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-medical-900 dark:text-white flex items-center">
                      <Zap className="w-5 h-5 mr-2" />
                      System Features
                    </CardTitle>
                    <CardDescription className="text-medical-600 dark:text-gray-300">
                      Comprehensive list of platform capabilities with development status
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {features.map((category, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-medical-900 dark:text-white">
                            {category.category}
                          </h3>
                          <Badge
                            variant={
                              category.status.includes("Complete")
                                ? "default"
                                : category.status.includes("Progress")
                                  ? "secondary"
                                  : "outline"
                            }
                            className={
                              category.status.includes("Complete")
                                ? "bg-green-600 text-white"
                                : category.status.includes("Progress")
                                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                                  : "border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-400"
                            }
                          >
                            {category.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {category.items.map((item, itemIndex) => (
                            <div
                              key={itemIndex}
                              className="flex items-center space-x-2 p-3 bg-medical-50 dark:bg-gray-700/50 rounded-lg"
                            >
                              <CheckCircle
                                className={`w-4 h-4 ${
                                  category.status.includes("Complete")
                                    ? "text-green-600 dark:text-green-400"
                                    : category.status.includes("Progress")
                                      ? "text-yellow-600 dark:text-yellow-400"
                                      : "text-gray-400 dark:text-gray-500"
                                }`}
                              />
                              <span className="text-sm text-medical-700 dark:text-gray-300">{item}</span>
                            </div>
                          ))}
                        </div>
                        {index < features.length - 1 && <Separator className="mt-6 bg-medical-200 dark:bg-gray-600" />}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* UI Components */}
            {activeSection === "ui-components" && (
              <div className="space-y-6">
                <Card className="border-medical-200 dark:border-gray-700 dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-medical-900 dark:text-white flex items-center">
                      <Palette className="w-5 h-5 mr-2" />
                      UI Components & Design System
                    </CardTitle>
                    <CardDescription className="text-medical-600 dark:text-gray-300">
                      Comprehensive design system and component library overview
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-medical-900 dark:text-white mb-3">
                        Medical Color Palette
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div className="space-y-2">
                          <div className="w-full h-16 bg-medical-50 dark:bg-medical-950 rounded-lg border border-medical-200 dark:border-gray-600"></div>
                          <p className="text-xs text-center text-medical-600 dark:text-gray-400">medical-50/950</p>
                          <p className="text-xs text-center text-medical-500 dark:text-gray-500">Background</p>
                        </div>
                        <div className="space-y-2">
                          <div className="w-full h-16 bg-medical-100 dark:bg-medical-900 rounded-lg"></div>
                          <p className="text-xs text-center text-medical-600 dark:text-gray-400">medical-100/900</p>
                          <p className="text-xs text-center text-medical-500 dark:text-gray-500">Surface</p>
                        </div>
                        <div className="space-y-2">
                          <div className="w-full h-16 bg-medical-600 dark:bg-medical-400 rounded-lg"></div>
                          <p className="text-xs text-center text-medical-600 dark:text-gray-400">medical-600/400</p>
                          <p className="text-xs text-center text-medical-500 dark:text-gray-500">Primary</p>
                        </div>
                        <div className="space-y-2">
                          <div className="w-full h-16 bg-medical-900 dark:bg-medical-100 rounded-lg"></div>
                          <p className="text-xs text-center text-medical-600 dark:text-gray-400">medical-900/100</p>
                          <p className="text-xs text-center text-medical-500 dark:text-gray-500">Text</p>
                        </div>
                        <div className="space-y-2">
                          <div className="w-full h-16 bg-gradient-to-r from-medical-600 to-medical-700 rounded-lg"></div>
                          <p className="text-xs text-center text-medical-600 dark:text-gray-400">Gradient</p>
                          <p className="text-xs text-center text-medical-500 dark:text-gray-500">Accent</p>
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-medical-200 dark:bg-gray-600" />

                    <div>
                      <h3 className="text-lg font-semibold text-medical-900 dark:text-white mb-3">
                        Component Categories
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border border-medical-200 dark:border-gray-600 rounded-lg">
                          <h4 className="font-medium text-medical-900 dark:text-white mb-2">Form Components</h4>
                          <ul className="text-sm text-medical-600 dark:text-gray-400 space-y-1">
                            <li>• Input fields with medical-themed validation</li>
                            <li>• Select dropdowns with search functionality</li>
                            <li>• Checkboxes and radio buttons with custom styling</li>
                            <li>• File upload with drag-and-drop support</li>
                            <li>• Multi-step form wizards for complex workflows</li>
                          </ul>
                        </div>
                        <div className="p-4 border border-medical-200 dark:border-gray-600 rounded-lg">
                          <h4 className="font-medium text-medical-900 dark:text-white mb-2">Navigation</h4>
                          <ul className="text-sm text-medical-600 dark:text-gray-400 space-y-1">
                            <li>• Collapsible sidebar with role-based items</li>
                            <li>• Breadcrumb navigation for deep paths</li>
                            <li>• Tab navigation with badge indicators</li>
                            <li>• Dropdown menus with keyboard navigation</li>
                            <li>• Pagination with smart page sizing</li>
                          </ul>
                        </div>
                        <div className="p-4 border border-medical-200 dark:border-gray-600 rounded-lg">
                          <h4 className="font-medium text-medical-900 dark:text-white mb-2">Data Display</h4>
                          <ul className="text-sm text-medical-600 dark:text-gray-400 space-y-1">
                            <li>• Medical-themed cards and information panels</li>
                            <li>• Data tables with sorting and filtering</li>
                            <li>• Progress indicators for course completion</li>
                            <li>• Charts and graphs for analytics</li>
                            <li>• Timeline components for course schedules</li>
                          </ul>
                        </div>
                        <div className="p-4 border border-medical-200 dark:border-gray-600 rounded-lg">
                          <h4 className="font-medium text-medical-900 dark:text-white mb-2">Feedback & Status</h4>
                          <ul className="text-sm text-medical-600 dark:text-gray-400 space-y-1">
                            <li>• Alert messages with medical context</li>
                            <li>• Loading states with skeleton screens</li>
                            <li>• Status badges for course and user states</li>
                            <li>• Toast notifications for real-time updates</li>
                            <li>• Error boundaries with helpful recovery options</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-medical-900 dark:text-white mb-3">Theme System</h3>
                      <div className="p-4 bg-medical-50 dark:bg-gray-700/50 rounded-lg">
                        <div className="flex items-center space-x-6 mb-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-white border border-gray-300 rounded"></div>
                            <span className="text-sm text-medical-700 dark:text-gray-300">Light Mode</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-gray-800 rounded"></div>
                            <span className="text-sm text-medical-700 dark:text-gray-300">Dark Mode</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-gradient-to-r from-white to-gray-800 rounded"></div>
                            <span className="text-sm text-medical-700 dark:text-gray-300">System Auto</span>
                          </div>
                        </div>
                        <p className="text-sm text-medical-600 dark:text-gray-400 mb-2">
                          Comprehensive dark mode support with automatic system detection, manual override options, and
                          persistent user preferences stored in localStorage.
                        </p>
                        <p className="text-sm text-medical-600 dark:text-gray-400">
                          All components are designed with both themes in mind, ensuring optimal readability and
                          accessibility in any lighting condition.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-medical-900 dark:text-white mb-3">
                        Accessibility Features
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                          <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-1">WCAG 2.1 AA</h4>
                          <p className="text-xs text-blue-700 dark:text-blue-400">
                            Compliant with international accessibility standards
                          </p>
                        </div>
                        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                          <h4 className="font-medium text-green-900 dark:text-green-300 mb-1">Screen Reader</h4>
                          <p className="text-xs text-green-700 dark:text-green-400">
                            Full compatibility with assistive technologies
                          </p>
                        </div>
                        <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                          <h4 className="font-medium text-purple-900 dark:text-purple-300 mb-1">Keyboard Nav</h4>
                          <p className="text-xs text-purple-700 dark:text-purple-400">
                            Complete keyboard navigation support
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* API Reference */}
            {activeSection === "api" && (
              <div className="space-y-6">
                <Card className="border-medical-200 dark:border-gray-700 dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-medical-900 dark:text-white flex items-center">
                      <Database className="w-5 h-5 mr-2" />
                      API Reference
                    </CardTitle>
                    <CardDescription className="text-medical-600 dark:text-gray-300">
                      API endpoints, data structures, and integration guide
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-medical-900 dark:text-white mb-3">
                        Available Endpoints
                      </h3>
                      <div className="space-y-4">
                        {apiEndpoints.map((endpoint, index) => (
                          <div key={index} className="p-4 border border-medical-200 dark:border-gray-600 rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <Badge
                                  variant={endpoint.method === "GET" ? "secondary" : "default"}
                                  className={
                                    endpoint.method === "GET"
                                      ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                                      : endpoint.method === "POST"
                                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                                  }
                                >
                                  {endpoint.method}
                                </Badge>
                                <code className="text-sm font-mono text-medical-900 dark:text-white">
                                  {endpoint.endpoint}
                                </code>
                              </div>
                              <Badge
                                variant={endpoint.status.includes("Implemented") ? "default" : "secondary"}
                                className={
                                  endpoint.status.includes("Implemented")
                                    ? "bg-green-600 text-white"
                                    : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                                }
                              >
                                {endpoint.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-medical-600 dark:text-gray-400 mb-3">{endpoint.description}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="text-sm font-medium text-medical-900 dark:text-white mb-2">
                                  Request Parameters:
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {endpoint.parameters.map((param, paramIndex) => (
                                    <code
                                      key={paramIndex}
                                      className="px-2 py-1 bg-medical-100 dark:bg-gray-700 text-medical-700 dark:text-gray-300 rounded text-xs"
                                    >
                                      {param}
                                    </code>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-medical-900 dark:text-white mb-2">
                                  Response Data:
                                </h4>
                                <p className="text-xs text-medical-600 dark:text-gray-400">{endpoint.response}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-medical-900 dark:text-white mb-3">Authentication</h3>
                      <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg font-mono text-sm">
                        <pre className="text-gray-800 dark:text-gray-200">
                          {`// Example API request with authentication
const response = await fetch('/api/courses', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ' + sessionToken,
    'Content-Type': 'application/json'
  }
});

const data = await response.json();`}
                        </pre>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-medical-900 dark:text-white mb-3">Error Handling</h3>
                      <div className="space-y-3">
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                          <h4 className="font-medium text-red-900 dark:text-red-300 mb-1">4xx Client Errors</h4>
                          <p className="text-sm text-red-700 dark:text-red-400">
                            Invalid requests, authentication failures, permission denied
                          </p>
                        </div>
                        <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                          <h4 className="font-medium text-yellow-900 dark:text-yellow-300 mb-1">5xx Server Errors</h4>
                          <p className="text-sm text-yellow-700 dark:text-yellow-400">
                            Internal server errors, database connection issues, service unavailable
                          </p>
                        </div>
                      </div>
                    </div>

                    <Alert className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20">
                      <Lightbulb className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                      <AlertDescription className="text-yellow-700 dark:text-yellow-300">
                        <strong>Development Note:</strong> This system currently uses mock data and simulated API calls
                        for demonstration purposes. In production, these would be replaced with actual backend API
                        endpoints, database connections, and proper authentication middleware.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Deployment */}
            {activeSection === "deployment" && (
              <div className="space-y-6">
                <Card className="border-medical-200 dark:border-gray-700 dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-medical-900 dark:text-white flex items-center">
                      <Settings className="w-5 h-5 mr-2" />
                      Deployment Guide
                    </CardTitle>
                    <CardDescription className="text-medical-600 dark:text-gray-300">
                      Comprehensive deployment instructions and configuration
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-medical-900 dark:text-white mb-3">
                        Deployment Checklist
                      </h3>
                      <div className="space-y-3">
                        {deploymentChecklist.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-medical-50 dark:bg-gray-700/50 rounded-lg"
                          >
                            <div className="flex items-center space-x-3">
                              <CheckCircle
                                className={`w-4 h-4 ${
                                  item.status === "required"
                                    ? "text-red-600 dark:text-red-400"
                                    : "text-yellow-600 dark:text-yellow-400"
                                }`}
                              />
                              <span className="text-sm text-medical-700 dark:text-gray-300">{item.item}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge
                                variant={item.status === "required" ? "destructive" : "secondary"}
                                className={
                                  item.status === "required"
                                    ? "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                                    : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                                }
                              >
                                {item.status}
                              </Badge>
                              <Badge
                                variant="outline"
                                className="border-medical-300 text-medical-600 dark:border-gray-600 dark:text-gray-400 text-xs"
                              >
                                {item.category}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-medical-900 dark:text-white mb-3">Local Development</h3>
                      <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                        <pre className="text-gray-800 dark:text-gray-200">
                          {`# Clone the repository
git clone <repository-url>
cd medical-lms

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Run development server
npm run dev

# Open browser to http://localhost:3000`}
                        </pre>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-medical-900 dark:text-white mb-3">Production Build</h3>
                      <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                        <pre className="text-gray-800 dark:text-gray-200">
                          {`# Build for production
npm run build

# Start production server
npm start

# Or export static files
npm run export

# Run tests
npm test

# Check build size
npm run analyze`}
                        </pre>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-medical-900 dark:text-white mb-3">
                        Environment Variables
                      </h3>
                      <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                        <pre className="text-gray-800 dark:text-gray-200">
                          {`# .env.local
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Database Configuration
DATABASE_URL=postgresql://user:pass@localhost:5432/medlearn
REDIS_URL=redis://localhost:6379

# Email Service
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@university.edu
EMAIL_SERVER_PASSWORD=your-app-password

# File Storage
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=10485760

# Security
CSRF_SECRET=your-csrf-secret
SESSION_SECRET=your-session-secret

# Feature Flags
ENABLE_2FA=true
ENABLE_BULK_UPLOAD=true
ENABLE_ANALYTICS=true`}
                        </pre>
                      </div>
                    </div>

                    <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20">
                      <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <AlertDescription className="text-blue-700 dark:text-blue-300">
                        <strong>Platform Support:</strong> This Next.js application can be deployed on Vercel, Netlify,
                        AWS, Google Cloud, Azure, or any platform that supports Node.js applications. Docker
                        containerization is also supported for enterprise deployments.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Troubleshooting */}
            {activeSection === "troubleshooting" && (
              <div className="space-y-6">
                <Card className="border-medical-200 dark:border-gray-700 dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-medical-900 dark:text-white flex items-center">
                      <HelpCircle className="w-5 h-5 mr-2" />
                      Troubleshooting Guide
                    </CardTitle>
                    <CardDescription className="text-medical-600 dark:text-gray-300">
                      Common issues, solutions, and debugging strategies
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/20">
                        <div className="flex items-start space-x-3">
                          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-red-900 dark:text-red-300 mb-2">Authentication Issues</h4>
                            <p className="text-sm text-red-700 dark:text-red-300 mb-2">
                              Users cannot log in, 2FA setup fails, or session expires unexpectedly
                            </p>
                            <ul className="text-sm text-red-600 dark:text-red-400 space-y-1">
                              <li>• Verify institutional email domain configuration</li>
                              <li>• Check session storage and localStorage permissions</li>
                              <li>• Clear browser cache, cookies, and session data</li>
                              <li>• Verify network connectivity and API endpoints</li>
                              <li>• Check server logs for authentication errors</li>
                              <li>• Ensure environment variables are properly configured</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border border-yellow-200 dark:border-yellow-800 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                        <div className="flex items-start space-x-3">
                          <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-yellow-900 dark:text-yellow-300 mb-2">
                              Theme/Display Issues
                            </h4>
                            <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-2">
                              Dark mode not working, styling broken, or responsive design issues
                            </p>
                            <ul className="text-sm text-yellow-600 dark:text-yellow-400 space-y-1">
                              <li>• Verify theme provider is properly wrapped around app</li>
                              <li>• Check Tailwind CSS classes are loading correctly</li>
                              <li>• Clear browser cache and hard refresh</li>
                              <li>• Inspect browser console for JavaScript errors</li>
                              <li>• Verify CSS custom properties are supported</li>
                              <li>• Check for conflicting CSS styles or overrides</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                        <div className="flex items-start space-x-3">
                          <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">Performance Issues</h4>
                            <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                              Slow loading, unresponsive interface, or high memory usage
                            </p>
                            <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
                              <li>• Monitor network connection speed and stability</li>
                              <li>• Optimize large images and video files</li>
                              <li>• Enable browser caching and compression</li>
                              <li>• Check server resources and database performance</li>
                              <li>• Use browser dev tools to identify bottlenecks</li>
                              <li>• Consider implementing lazy loading for large datasets</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border border-purple-200 dark:border-purple-800 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                        <div className="flex items-start space-x-3">
                          <AlertCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-purple-900 dark:text-purple-300 mb-2">
                              File Upload Problems
                            </h4>
                            <p className="text-sm text-purple-700 dark:text-purple-300 mb-2">
                              Content upload fails, file size errors, or unsupported formats
                            </p>
                            <ul className="text-sm text-purple-600 dark:text-purple-400 space-y-1">
                              <li>• Check file size limits and format restrictions</li>
                              <li>• Verify server upload directory permissions</li>
                              <li>• Ensure sufficient disk space on server</li>
                              <li>• Check for antivirus software blocking uploads</li>
                              <li>• Verify MIME type validation settings</li>
                              <li>• Monitor server logs for upload errors</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-medical-900 dark:text-white mb-3">Debug Commands</h3>
                      <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                        <pre className="text-gray-800 dark:text-gray-200">
                          {`# Check application logs
npm run logs

# Run in debug mode
npm run dev:debug

# Clear all caches
npm run clean

# Check dependencies
npm audit

# Database health check
npm run db:check

# Test email configuration
npm run test:email`}
                        </pre>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-medical-900 dark:text-white mb-3">Getting Help</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border border-medical-200 dark:border-gray-600 rounded-lg">
                          <h4 className="font-medium text-medical-900 dark:text-white mb-2">Documentation</h4>
                          <p className="text-sm text-medical-600 dark:text-gray-400 mb-3">
                            Comprehensive guides, API reference, and troubleshooting steps
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-medical-300 text-medical-700 bg-transparent dark:border-gray-600 dark:text-gray-300"
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            View Full Docs
                          </Button>
                        </div>
                        <div className="p-4 border border-medical-200 dark:border-gray-600 rounded-lg">
                          <h4 className="font-medium text-medical-900 dark:text-white mb-2">Technical Support</h4>
                          <p className="text-sm text-medical-600 dark:text-gray-400 mb-3">
                            Contact our technical support team for assistance
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-medical-300 text-medical-700 bg-transparent dark:border-gray-600 dark:text-gray-300"
                          >
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Get Support
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <AlertDescription className="text-green-700 dark:text-green-300">
                        <strong>Best Practice:</strong> Always check the browser console for JavaScript errors and
                        network issues before reporting problems. Include error messages, browser version, and steps to
                        reproduce when seeking support.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-medical-200 dark:border-gray-700 text-center">
          <p className="text-medical-600 dark:text-gray-400 mb-4">
            MedLearn University Documentation v{SYSTEM_VERSION} • Last updated: {LAST_UPDATED}
          </p>
          <p className="text-sm text-medical-500 dark:text-gray-500 mb-4">
            This documentation is automatically maintained and updated with each system release. Report issues or
            suggest improvements through our support channels.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="border-medical-300 text-medical-700 bg-transparent dark:border-gray-600 dark:text-gray-300"
            >
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-medical-300 text-medical-700 bg-transparent dark:border-gray-600 dark:text-gray-300"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Source
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-medical-300 text-medical-700 bg-transparent dark:border-gray-600 dark:text-gray-300"
            >
              <GitBranch className="w-4 h-4 mr-2" />
              Changelog
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
