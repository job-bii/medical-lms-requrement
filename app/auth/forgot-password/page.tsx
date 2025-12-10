"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Stethoscope, Mail, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    // Validate email domain
    const validDomains = ["@university.edu", "@medschool.edu", "@health.university.edu"]
    if (!validDomains.some((domain) => email.endsWith(domain))) {
      setError("Please use your institutional email address")
      setIsLoading(false)
      return
    }

    // Simulate password reset request
    setTimeout(() => {
      setSuccess(
        "Password reset instructions have been sent to your email address. Please check your inbox and follow the instructions to reset your password.",
      )
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-medical-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-medical-900">Reset Password</h1>
          <p className="text-medical-600">Enter your email to receive reset instructions</p>
        </div>

        <Card className="border-medical-200">
          <CardHeader>
            <CardTitle className="text-medical-900 flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              Password Reset
            </CardTitle>
            <CardDescription className="text-medical-600">
              We'll send you a secure link to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-700">{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-medical-900">
                    Institutional Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.name@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-medical-300 focus:border-medical-500"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-medical-600 hover:bg-medical-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Reset Instructions"}
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-700">{success}</AlertDescription>
                </Alert>

                <div className="p-4 bg-medical-50 rounded-lg border border-medical-200">
                  <h3 className="font-medium text-medical-900 mb-2">What's Next?</h3>
                  <ul className="text-sm text-medical-700 space-y-1 text-left">
                    <li>• Check your email inbox (and spam folder)</li>
                    <li>• Click the secure reset link in the email</li>
                    <li>• Create a new strong password</li>
                    <li>• Sign in with your new password</li>
                  </ul>
                </div>
              </div>
            )}

            <div className="mt-6 text-center">
              <Link
                href="/auth/login"
                className="inline-flex items-center text-sm text-medical-600 hover:text-medical-700"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Sign In
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card className="mt-4 border-medical-200 bg-medical-50">
          <CardContent className="pt-6">
            <div className="text-xs text-medical-700">
              <p className="font-medium mb-1">Security Notice</p>
              <p>
                Password reset links expire after 1 hour for security. If you don't receive an email within 5 minutes,
                please contact IT support.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
