"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Clock, CheckCircle, Mail, Phone, User, Building, Calendar, ArrowLeft, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function PendingApprovalPage() {
  const [userEmail, setUserEmail] = useState("")
  const [userRole, setUserRole] = useState("")
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const router = useRouter()

  // Check if user is authorized to access this page
  useEffect(() => {
    const registrationComplete = sessionStorage.getItem("registrationComplete")
    const newUserEmail = sessionStorage.getItem("newUserEmail")
    const newUserRole = sessionStorage.getItem("newUserRole")

    if (!registrationComplete || !newUserEmail || newUserRole !== "instructor") {
      // Redirect to login if not coming from instructor registration
      router.push("/auth/login")
      return
    }

    setUserEmail(newUserEmail)
    setUserRole(newUserRole)
    setIsAuthorized(true)
  }, [router])

  const handleRefreshStatus = async () => {
    setRefreshing(true)
    // Simulate checking approval status
    setTimeout(() => {
      setRefreshing(false)
      // In a real app, this would check the actual approval status
      // For demo purposes, we'll just show the refresh animation
    }, 2000)
  }

  // Show loading or redirect if not authorized
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-medical-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <Card className="border-medical-200 dark:border-gray-700 dark:bg-gray-800">
          <CardContent className="pt-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-medical-600 mx-auto mb-4"></div>
            <p className="text-medical-600 dark:text-gray-300">Verifying access...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h1 className="text-2xl font-bold text-medical-900 dark:text-white">Account Pending Approval</h1>
          <p className="text-medical-600 dark:text-gray-300">Your instructor account is awaiting admin approval</p>
        </div>

        <Card className="border-medical-200 dark:border-gray-700 dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-medical-900 dark:text-white flex items-center">
              <User className="w-5 h-5 mr-2" />
              Application Status
            </CardTitle>
            <CardDescription className="text-medical-600 dark:text-gray-300">
              Your instructor account registration has been submitted successfully
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Status Alert */}
            <Alert className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20">
              <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
              <AlertDescription className="text-yellow-700 dark:text-yellow-300">
                <strong>Status: Pending Review</strong>
                <br />
                Your application is currently being reviewed by our administrative team. This process typically takes
                1-2 business days.
              </AlertDescription>
            </Alert>

            {/* Application Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-medical-900 dark:text-white">Application Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-medical-50 dark:bg-gray-700/50 rounded-lg">
                  <Mail className="w-5 h-5 text-medical-600 dark:text-medical-400" />
                  <div>
                    <p className="text-sm font-medium text-medical-900 dark:text-white">Email</p>
                    <p className="text-sm text-medical-600 dark:text-gray-400">{userEmail}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-medical-50 dark:bg-gray-700/50 rounded-lg">
                  <User className="w-5 h-5 text-medical-600 dark:text-medical-400" />
                  <div>
                    <p className="text-sm font-medium text-medical-900 dark:text-white">Role</p>
                    <p className="text-sm text-medical-600 dark:text-gray-400 capitalize">{userRole}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-medical-50 dark:bg-gray-700/50 rounded-lg">
                  <Calendar className="w-5 h-5 text-medical-600 dark:text-medical-400" />
                  <div>
                    <p className="text-sm font-medium text-medical-900 dark:text-white">Submitted</p>
                    <p className="text-sm text-medical-600 dark:text-gray-400">{new Date().toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-medical-50 dark:bg-gray-700/50 rounded-lg">
                  <Building className="w-5 h-5 text-medical-600 dark:text-medical-400" />
                  <div>
                    <p className="text-sm font-medium text-medical-900 dark:text-white">Institution</p>
                    <p className="text-sm text-medical-600 dark:text-gray-400">MedLearn University</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-medical-200 dark:bg-gray-600" />

            {/* Next Steps */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-medical-900 dark:text-white mb-3">What Happens Next?</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-medical-100 dark:bg-medical-900/20 rounded-full flex items-center justify-center text-medical-600 dark:text-medical-400 font-semibold text-sm mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium text-medical-900 dark:text-white">Admin Review</h4>
                    <p className="text-sm text-medical-600 dark:text-gray-400">
                      Our administrative team will review your credentials and verify your institutional affiliation
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-medical-100 dark:bg-medical-900/20 rounded-full flex items-center justify-center text-medical-600 dark:text-medical-400 font-semibold text-sm mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium text-medical-900 dark:text-white">Email Notification</h4>
                    <p className="text-sm text-medical-600 dark:text-gray-400">
                      You'll receive an email notification once your account has been approved
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-medical-100 dark:bg-medical-900/20 rounded-full flex items-center justify-center text-medical-600 dark:text-medical-400 font-semibold text-sm mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium text-medical-900 dark:text-white">2FA Setup</h4>
                    <p className="text-sm text-medical-600 dark:text-gray-400">
                      Complete your account setup by configuring two-factor authentication
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-medical-100 dark:bg-medical-900/20 rounded-full flex items-center justify-center text-medical-600 dark:text-medical-400 font-semibold text-sm mt-0.5">
                    4
                  </div>
                  <div>
                    <h4 className="font-medium text-medical-900 dark:text-white">Access Dashboard</h4>
                    <p className="text-sm text-medical-600 dark:text-gray-400">
                      Begin creating courses and managing your teaching materials
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-medical-200 dark:bg-gray-600" />

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-medical-900 dark:text-white">Need Help?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-medical-200 dark:border-gray-600 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Mail className="w-4 h-4 text-medical-600 dark:text-medical-400" />
                    <h4 className="font-medium text-medical-900 dark:text-white">Email Support</h4>
                  </div>
                  <p className="text-sm text-medical-600 dark:text-gray-400 mb-2">
                    Contact our support team for assistance
                  </p>
                  <p className="text-sm font-mono text-medical-700 dark:text-gray-300">support@medlearn.edu</p>
                </div>
                <div className="p-4 border border-medical-200 dark:border-gray-600 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Phone className="w-4 h-4 text-medical-600 dark:text-medical-400" />
                    <h4 className="font-medium text-medical-900 dark:text-white">Phone Support</h4>
                  </div>
                  <p className="text-sm text-medical-600 dark:text-gray-400 mb-2">
                    Call during business hours (9 AM - 5 PM)
                  </p>
                  <p className="text-sm font-mono text-medical-700 dark:text-gray-300">(555) 123-4567</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                onClick={handleRefreshStatus}
                disabled={refreshing}
                className="bg-medical-600 hover:bg-medical-700 text-white flex-1"
              >
                {refreshing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Checking Status...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh Status
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                className="border-medical-300 text-medical-700 bg-transparent dark:border-gray-600 dark:text-gray-300 flex-1"
                asChild
              >
                <Link href="/auth/login">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Login
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card className="mt-6 border-medical-200 dark:border-gray-700 bg-medical-50 dark:bg-gray-800">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
              <div>
                <h3 className="font-medium text-medical-900 dark:text-white mb-2">Registration Complete</h3>
                <p className="text-sm text-medical-600 dark:text-gray-400">
                  Your registration information has been successfully submitted and saved. You don't need to re-register
                  or take any additional action at this time. We'll notify you as soon as your account is approved.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
