"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Stethoscope, Eye, EyeOff, AlertCircle, Shield } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Basic validation
      if (!email.trim() || !password) {
        setError("Please enter both email and password")
        return
      }

      // Validate email domain
      if (!email.endsWith("@university.edu")) {
        setError("Please use your institutional email address (@university.edu)")
        return
      }

      // Simulate authentication delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock authentication logic
      const userRole = email.includes("admin") ? "admin" : email.includes("instructor") ? "instructor" : "student"

      // Store authentication state
      sessionStorage.setItem("authenticated", "true")
      sessionStorage.setItem("userEmail", email)
      sessionStorage.setItem("userRole", userRole)
      sessionStorage.setItem("loginTime", new Date().toISOString())

      // Store in localStorage if remember me is checked
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true")
        localStorage.setItem("userEmail", email)
      }

      // Redirect based on user role
      const dashboardPath = `/dashboard/${userRole}`
      router.push(dashboardPath)
    } catch (err) {
      console.error("Login error:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const fillDemoCredentials = (role: "admin" | "student" | "instructor") => {
    setEmail(`${role}@university.edu`)
    setPassword("Demo123!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome to MedLearn</h1>
          <p className="text-gray-600 dark:text-gray-300">Sign in to access your medical education platform</p>
        </div>

        <Card className="border-gray-200 dark:border-gray-700 dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Sign In
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Enter your institutional credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
                  <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                  <AlertDescription className="text-red-700 dark:text-red-300">{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-900 dark:text-white">
                  Institutional Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.name@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-900 dark:text-white">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-700 dark:text-gray-300">
                    Remember me
                  </Label>
                </div>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                >
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-gray-700/50 rounded-lg border border-blue-200 dark:border-gray-600">
              <div className="flex items-start space-x-2">
                <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div className="text-xs text-blue-700 dark:text-gray-300">
                  <p className="font-medium mb-1">Security Notice</p>
                  <p>
                    Your login activity is monitored for security purposes. Sessions automatically expire after 24 hours
                    of inactivity.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Don't have an account?{" "}
                <Link
                  href="/auth/register"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
                >
                  Register here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="mt-4 border-gray-200 dark:border-gray-700 bg-blue-50 dark:bg-gray-800">
          <CardContent className="pt-6">
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">Demo Credentials:</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  <p>
                    <strong>Admin:</strong> admin@university.edu
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => fillDemoCredentials("admin")} className="text-xs">
                  Use
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  <p>
                    <strong>Student:</strong> student@university.edu
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => fillDemoCredentials("student")} className="text-xs">
                  Use
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  <p>
                    <strong>Instructor:</strong> instructor@university.edu
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fillDemoCredentials("instructor")}
                  className="text-xs"
                >
                  Use
                </Button>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                Password for all demo accounts: <strong>Demo123!</strong>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
