"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Smartphone, Shield, CheckCircle, Copy, RefreshCw } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Setup2FAPage() {
  const [selectedMethod, setSelectedMethod] = useState("email")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [backupCodes, setBackupCodes] = useState([
    "ABC123",
    "DEF456",
    "GHI789",
    "JKL012",
    "MNO345",
    "PQR678",
    "STU901",
    "VWX234",
    "YZA567",
    "BCD890",
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [codeSent, setCodeSent] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const [userRole, setUserRole] = useState("")
  const [isAuthorized, setIsAuthorized] = useState(false)
  const router = useRouter()

  // Check if user is authorized to access this page (only during registration)
  useEffect(() => {
    const registrationComplete = sessionStorage.getItem("registrationComplete")
    const newUserEmail = sessionStorage.getItem("newUserEmail")
    const newUserRole = sessionStorage.getItem("newUserRole")

    if (!registrationComplete || !newUserEmail) {
      // Redirect to login if not coming from registration
      router.push("/auth/login")
      return
    }

    setUserEmail(newUserEmail)
    setUserRole(newUserRole || "student")
    setIsAuthorized(true)
  }, [router])

  const handleSendCode = async () => {
    setIsLoading(true)
    // Simulate sending verification code
    setTimeout(() => {
      setCodeSent(true)
      setIsLoading(false)
    }, 1000)
  }

  const handleVerifyCode = async () => {
    setIsLoading(true)
    // Simulate code verification
    setTimeout(() => {
      setIsVerified(true)
      setIsLoading(false)

      // Clear registration session data
      sessionStorage.removeItem("registrationComplete")
      sessionStorage.removeItem("newUserEmail")
      sessionStorage.removeItem("newUserRole")

      // Set authentication state
      sessionStorage.setItem("authenticated", "true")
      sessionStorage.setItem("userEmail", userEmail)
      sessionStorage.setItem("loginTime", new Date().toISOString())

      // Redirect to appropriate dashboard after successful 2FA setup
      setTimeout(() => {
        if (userRole === "admin") {
          router.push("/dashboard/admin")
        } else if (userRole === "instructor") {
          router.push("/dashboard/instructor")
        } else {
          router.push("/dashboard/student")
        }
      }, 2000)
    }, 1000)
  }

  const copyBackupCodes = () => {
    navigator.clipboard.writeText(backupCodes.join("\n"))
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
          <div className="w-16 h-16 bg-medical-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-medical-900 dark:text-white">Set Up Two-Factor Authentication</h1>
          <p className="text-medical-600 dark:text-gray-300">
            Secure your new account with an additional layer of protection
          </p>
        </div>

        {!isVerified ? (
          <Card className="border-medical-200 dark:border-gray-700 dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-medical-900 dark:text-white">Choose Your 2FA Method</CardTitle>
              <CardDescription className="text-medical-600 dark:text-gray-300">
                Select how you'd like to receive verification codes for future logins
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20 mb-6">
                <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <AlertDescription className="text-blue-700 dark:text-blue-300">
                  <strong>First-time setup:</strong> You're setting up 2FA for your new account. This will be required
                  for future logins to keep your account secure.
                </AlertDescription>
              </Alert>

              <Tabs value={selectedMethod} onValueChange={setSelectedMethod} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="email" className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </TabsTrigger>
                  <TabsTrigger value="sms" className="flex items-center space-x-2">
                    <Smartphone className="w-4 h-4" />
                    <span>SMS</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="email" className="space-y-4">
                  <div className="p-4 bg-medical-50 dark:bg-gray-700/50 rounded-lg border border-medical-200 dark:border-gray-600">
                    <div className="flex items-center space-x-2 mb-2">
                      <Mail className="w-5 h-5 text-medical-600 dark:text-medical-400" />
                      <h3 className="font-medium text-medical-900 dark:text-white">Email Verification</h3>
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                      >
                        Recommended
                      </Badge>
                    </div>
                    <p className="text-sm text-medical-600 dark:text-gray-300 mb-4">
                      We'll send verification codes to your institutional email address: {userEmail}
                    </p>

                    {!codeSent ? (
                      <Button
                        onClick={handleSendCode}
                        disabled={isLoading}
                        className="bg-medical-600 hover:bg-medical-700 text-white"
                      >
                        {isLoading ? "Sending..." : "Send Verification Code"}
                      </Button>
                    ) : (
                      <div className="space-y-4">
                        <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
                          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                          <AlertDescription className="text-green-700 dark:text-green-300">
                            Verification code sent to your email! Check your inbox.
                          </AlertDescription>
                        </Alert>

                        <div className="space-y-2">
                          <Label htmlFor="code" className="text-medical-900 dark:text-white">
                            Enter Verification Code
                          </Label>
                          <Input
                            id="code"
                            placeholder="Enter 6-digit code"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            className="border-medical-300 focus:border-medical-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            maxLength={6}
                          />
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            onClick={handleVerifyCode}
                            disabled={isLoading || verificationCode.length !== 6}
                            className="bg-medical-600 hover:bg-medical-700 text-white"
                          >
                            {isLoading ? "Verifying..." : "Verify Code"}
                          </Button>
                          <Button
                            variant="outline"
                            onClick={handleSendCode}
                            disabled={isLoading}
                            className="border-medical-300 text-medical-700 bg-transparent dark:border-gray-600 dark:text-gray-300"
                          >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Resend
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="sms" className="space-y-4">
                  <div className="p-4 bg-medical-50 dark:bg-gray-700/50 rounded-lg border border-medical-200 dark:border-gray-600">
                    <div className="flex items-center space-x-2 mb-2">
                      <Smartphone className="w-5 h-5 text-medical-600 dark:text-medical-400" />
                      <h3 className="font-medium text-medical-900 dark:text-white">SMS Verification</h3>
                    </div>
                    <p className="text-sm text-medical-600 dark:text-gray-300 mb-4">
                      We'll send verification codes to your mobile phone via SMS
                    </p>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-medical-900 dark:text-white">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="border-medical-300 focus:border-medical-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                      </div>

                      {!codeSent ? (
                        <Button
                          onClick={handleSendCode}
                          disabled={isLoading || !phoneNumber}
                          className="bg-medical-600 hover:bg-medical-700 text-white"
                        >
                          {isLoading ? "Sending..." : "Send SMS Code"}
                        </Button>
                      ) : (
                        <div className="space-y-4">
                          <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
                            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                            <AlertDescription className="text-green-700 dark:text-green-300">
                              SMS sent to {phoneNumber}! Enter the code below.
                            </AlertDescription>
                          </Alert>

                          <div className="space-y-2">
                            <Label htmlFor="smsCode" className="text-medical-900 dark:text-white">
                              Enter SMS Code
                            </Label>
                            <Input
                              id="smsCode"
                              placeholder="Enter 6-digit code"
                              value={verificationCode}
                              onChange={(e) => setVerificationCode(e.target.value)}
                              className="border-medical-300 focus:border-medical-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                              maxLength={6}
                            />
                          </div>

                          <div className="flex space-x-2">
                            <Button
                              onClick={handleVerifyCode}
                              disabled={isLoading || verificationCode.length !== 6}
                              className="bg-medical-600 hover:bg-medical-700 text-white"
                            >
                              {isLoading ? "Verifying..." : "Verify Code"}
                            </Button>
                            <Button
                              variant="outline"
                              onClick={handleSendCode}
                              disabled={isLoading}
                              className="border-medical-300 text-medical-700 bg-transparent dark:border-gray-600 dark:text-gray-300"
                            >
                              <RefreshCw className="w-4 h-4 mr-2" />
                              Resend
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Backup Codes */}
              <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  <h3 className="font-medium text-yellow-900 dark:text-yellow-300">Backup Recovery Codes</h3>
                </div>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-4">
                  Save these backup codes in a secure location. You can use them to access your account if you lose
                  access to your 2FA method.
                </p>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  {backupCodes.map((code, index) => (
                    <div
                      key={index}
                      className="bg-white dark:bg-gray-800 p-2 rounded border font-mono text-sm text-center"
                    >
                      {code}
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  onClick={copyBackupCodes}
                  className="border-yellow-300 text-yellow-700 bg-transparent dark:border-yellow-600 dark:text-yellow-300"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy All Codes
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-medical-200 dark:border-gray-700 dark:bg-gray-800">
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-medical-900 dark:text-white mb-2">2FA Setup Complete!</h2>
              <p className="text-medical-600 dark:text-gray-300 mb-4">
                Your account is now secured with two-factor authentication. You'll be redirected to your dashboard
                shortly.
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-medical-500 dark:text-gray-400">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-medical-600"></div>
                <span>Redirecting...</span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
