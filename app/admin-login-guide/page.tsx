"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, User, Key, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

const loginSteps = [
  {
    step: 1,
    title: "Go to Login Page",
    description: "Navigate to the secure login page",
    action: "Click the button below or go to /auth/login",
    credential: null,
    icon: User,
  },
  {
    step: 2,
    title: "Enter Admin Credentials",
    description: "Use the admin demo credentials",
    action: "Fill in the login form",
    credential: {
      email: "admin@university.edu",
      password: "any password",
    },
    icon: Key,
  },
  {
    step: 3,
    title: "Complete 2FA Verification",
    description: "Enter the verification code",
    action: "Use demo 2FA code",
    credential: {
      code: "123456",
      backup: "ABC123",
    },
    icon: Shield,
  },
  {
    step: 4,
    title: "Access Admin Dashboard",
    description: "You'll be redirected automatically",
    action: "View admin features and controls",
    credential: null,
    icon: CheckCircle,
  },
]

const adminFeatures = [
  "User Management & Approvals",
  "System Statistics & Analytics",
  "Instructor Account Approvals",
  "Security Monitoring",
  "Course Management",
  "System Configuration",
]

export default function AdminLoginGuide() {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-medical-900">Admin Login Guide</h1>
        <p className="text-medical-600">Step-by-step instructions to access the admin dashboard</p>
      </div>

      {/* Quick Login Button */}
      <Card className="mb-8 border-medical-600 bg-medical-50">
        <CardHeader>
          <CardTitle className="text-medical-900 flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Quick Admin Login
          </CardTitle>
          <CardDescription className="text-medical-700">
            Click below to go directly to the login page with admin credentials
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium text-medical-900">Admin Credentials:</p>
              <p className="text-sm text-medical-700">
                <strong>Email:</strong> admin@university.edu
              </p>
              <p className="text-sm text-medical-700">
                <strong>Password:</strong> any password
              </p>
              <p className="text-sm text-medical-700">
                <strong>2FA Code:</strong> 123456
              </p>
            </div>
            <Link href="/auth/login">
              <Button className="bg-medical-600 hover:bg-medical-700 text-white">
                <ArrowRight className="w-4 h-4 mr-2" />
                Login as Admin
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Step-by-Step Guide */}
      <Card className="mb-8 border-medical-200">
        <CardHeader>
          <CardTitle className="text-medical-900">Step-by-Step Login Process</CardTitle>
          <CardDescription className="text-medical-600">
            Follow these steps to access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {loginSteps.map((step, index) => (
              <div key={step.step} className="flex items-start space-x-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-medical-600 text-white rounded-full flex items-center justify-center">
                    <step.icon className="w-5 h-5" />
                  </div>
                  {index < loginSteps.length - 1 && <div className="w-0.5 h-12 bg-medical-200 mt-2" />}
                </div>

                <div className="flex-1 pb-8">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-medical-900">{step.title}</h3>
                    <Badge variant="secondary" className="bg-medical-100 text-medical-700">
                      Step {step.step}
                    </Badge>
                  </div>

                  <p className="text-medical-600 mb-2">{step.description}</p>
                  <p className="text-sm text-medical-500 mb-3">
                    <strong>Action:</strong> {step.action}
                  </p>

                  {step.credential && (
                    <div className="p-3 bg-medical-50 rounded border border-medical-200">
                      {step.credential.email && (
                        <div className="space-y-1">
                          <p className="text-sm">
                            <strong className="text-medical-900">Email:</strong>{" "}
                            <code className="bg-white px-2 py-1 rounded text-medical-700">{step.credential.email}</code>
                          </p>
                          <p className="text-sm">
                            <strong className="text-medical-900">Password:</strong>{" "}
                            <code className="bg-white px-2 py-1 rounded text-medical-700">
                              {step.credential.password}
                            </code>
                          </p>
                        </div>
                      )}
                      {step.credential.code && (
                        <div className="space-y-1">
                          <p className="text-sm">
                            <strong className="text-medical-900">2FA Code:</strong>{" "}
                            <code className="bg-white px-2 py-1 rounded text-medical-700">{step.credential.code}</code>
                          </p>
                          <p className="text-sm">
                            <strong className="text-medical-900">Backup Code:</strong>{" "}
                            <code className="bg-white px-2 py-1 rounded text-medical-700">
                              {step.credential.backup}
                            </code>
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {step.step === 1 && (
                    <div className="mt-3">
                      <Link href="/auth/login">
                        <Button variant="outline" className="border-medical-300 text-medical-700 bg-transparent">
                          Go to Login Page
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Admin Features */}
      <Card className="mb-8 border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-900">What You'll See as Admin</CardTitle>
          <CardDescription className="text-green-700">Admin dashboard features and capabilities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {adminFeatures.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-green-800">{feature}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-green-200">
            <Link href="/dashboard/admin">
              <Button variant="outline" className="border-green-300 text-green-700 bg-transparent">
                View Admin Dashboard
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Alternative Login Methods */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-900">Alternative Access Methods</CardTitle>
        </CardHeader>
        <CardContent className="text-blue-800">
          <div className="space-y-3">
            <div>
              <p className="font-medium">Direct Dashboard Access:</p>
              <p className="text-sm">
                You can also go directly to{" "}
                <Link href="/dashboard/admin" className="underline">
                  /dashboard/admin
                </Link>{" "}
                (bypasses authentication for demo)
              </p>
            </div>
            <div>
              <p className="font-medium">Other Demo Accounts:</p>
              <p className="text-sm">
                • <strong>Student:</strong> student@university.edu
                <br />• <strong>Instructor:</strong> instructor@university.edu
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
