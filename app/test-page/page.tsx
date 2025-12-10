"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertTriangle, ExternalLink } from "lucide-react"
import Link from "next/link"

const testCases = [
  {
    title: "Registration System",
    url: "/auth/register",
    description: "Test comprehensive registration with profile upload",
    features: ["Email domain validation", "Password strength", "Role-based fields", "Profile picture upload"],
    status: "ready",
  },
  {
    title: "Login & 2FA",
    url: "/auth/login",
    description: "Test secure login with two-factor authentication",
    features: ["Domain validation", "2FA setup", "Backup codes", "Session management"],
    status: "ready",
    demoCredentials: "student@university.edu (any password)",
  },
  {
    title: "Student Dashboard",
    url: "/dashboard/student",
    description: "Role-based dashboard for students",
    features: ["Course progress", "Assignments", "Achievements", "Quick actions"],
    status: "ready",
  },
  {
    title: "Instructor Dashboard",
    url: "/dashboard/instructor",
    description: "Teaching management interface",
    features: ["Course management", "Student analytics", "Grading tools", "Activity feed"],
    status: "ready",
  },
  {
    title: "Admin Dashboard",
    url: "/dashboard/admin",
    description: "System administration interface",
    features: ["User management", "System stats", "Approval workflow", "Security monitoring"],
    status: "ready",
  },
  {
    title: "Profile Management",
    url: "/profile",
    description: "Comprehensive user profile with security settings",
    features: ["Profile editing", "2FA management", "Login history", "Session monitoring"],
    status: "ready",
  },
  {
    title: "Admin Approvals",
    url: "/admin/approvals",
    description: "Instructor account approval system",
    features: ["Application review", "Document verification", "Approval workflow", "Audit trail"],
    status: "ready",
  },
  {
    title: "Password Reset",
    url: "/auth/forgot-password",
    description: "Secure password recovery system",
    features: ["Email validation", "Secure reset links", "Time expiration", "Security notices"],
    status: "ready",
  },
]

const demoCredentials = [
  { role: "Student", email: "student@university.edu", password: "any password" },
  { role: "Instructor", email: "instructor@university.edu", password: "any password" },
  { role: "Admin", email: "admin@university.edu", password: "any password" },
]

const verificationCodes = [
  { type: "2FA Code", code: "123456", description: "Use this for email/SMS verification" },
  { type: "Backup Code", code: "ABC123", description: "Use this as recovery code" },
]

export default function TestPage() {
  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-medical-900">Authentication System Testing</h1>
        <p className="text-medical-600">Verify all authentication features are working correctly</p>
      </div>

      {/* Demo Credentials */}
      <Card className="mb-8 border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-900 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            Demo Credentials
          </CardTitle>
          <CardDescription className="text-green-700">Use these credentials to test the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            {demoCredentials.map((cred, index) => (
              <div key={index} className="p-3 bg-white rounded border border-green-200">
                <p className="font-medium text-green-900">{cred.role}</p>
                <p className="text-sm text-green-700">{cred.email}</p>
                <p className="text-xs text-green-600">{cred.password}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {verificationCodes.map((code, index) => (
              <div key={index} className="p-3 bg-white rounded border border-green-200">
                <p className="font-medium text-green-900">
                  {code.type}: <span className="font-mono">{code.code}</span>
                </p>
                <p className="text-xs text-green-600">{code.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Test Cases */}
      <div className="grid gap-6">
        {testCases.map((test, index) => (
          <Card key={index} className="border-medical-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-medical-900 flex items-center">
                    {test.title}
                    <Badge variant="secondary" className="ml-2 bg-green-100 text-green-700">
                      {test.status}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="text-medical-600">{test.description}</CardDescription>
                  {test.demoCredentials && <p className="text-sm text-blue-600 mt-1">Demo: {test.demoCredentials}</p>}
                </div>
                <Link href={test.url}>
                  <Button className="bg-medical-600 hover:bg-medical-700 text-white">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Test Now
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
                {test.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span className="text-medical-700">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Testing Instructions */}
      <Card className="mt-8 border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-900 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Testing Instructions
          </CardTitle>
        </CardHeader>
        <CardContent className="text-blue-800">
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-medium">1. Registration Flow:</p>
              <p>• Try different user types (student vs instructor)</p>
              <p>• Test email validation with invalid domains</p>
              <p>• Upload a profile picture</p>
              <p>• Test password strength requirements</p>
            </div>

            <div>
              <p className="font-medium">2. Login & 2FA:</p>
              <p>• Use demo credentials above</p>
              <p>• Enter 2FA code: 123456 or backup code: ABC123</p>
              <p>• Check session management and timeouts</p>
            </div>

            <div>
              <p className="font-medium">3. Profile Management:</p>
              <p>• Edit profile information</p>
              <p>• View login activity history</p>
              <p>• Check security settings</p>
            </div>

            <div>
              <p className="font-medium">4. Admin Features:</p>
              <p>• Review instructor applications</p>
              <p>• Test approval/rejection workflow</p>
              <p>• Check audit trails</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Browser Console Logs */}
      <Card className="mt-6 border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="text-yellow-900">Browser Console Monitoring</CardTitle>
        </CardHeader>
        <CardContent className="text-yellow-800 text-sm">
          <p>Open browser DevTools (F12) → Console tab to see:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Login attempt logs</li>
            <li>Session management events</li>
            <li>Form validation messages</li>
            <li>2FA verification status</li>
            <li>Security monitoring alerts</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
