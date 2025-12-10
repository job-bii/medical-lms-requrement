"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Mail, RefreshCw, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Verify2FAPage() {
  const [verificationCode, setVerificationCode] = useState("")
  const [backupCode, setBackupCode] = useState("")
  const [useBackupCode, setUseBackupCode] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const router = useRouter()

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleVerify = async () => {
    setError("")
    setIsLoading(true)

    const code = useBackupCode ? backupCode : verificationCode

    if (!code || code.length < 6) {
      setError("Please enter a valid verification code")
      setIsLoading(false)
      return
    }

    // Simulate verification
    setTimeout(() => {
      // Mock successful verification
      if (code === "123456" || code === "ABC123") {
        // Log successful login
        const loginSuccess = {
          timestamp: new Date().toISOString(),
          method: useBackupCode ? "backup_code" : "2fa_code",
          ipAddress: "192.168.1.1",
          userAgent: navigator.userAgent,
        }

        // Store in session
        sessionStorage.setItem("authenticated", "true")
        sessionStorage.setItem("loginTime", new Date().toISOString())

        // Get email from session to determine role
        const email = sessionStorage.getItem("loginEmail") || ""

        // Redirect based on user role
        if (email.includes("admin")) {
          router.push("/dashboard/admin")
        } else if (email.includes("instructor")) {
          router.push("/dashboard/instructor")
        } else {
          router.push("/dashboard/student")
        }
      } else {
        setError("Invalid verification code. Please try again.")
      }
      setIsLoading(false)
    }, 1000)
  }

  const handleResendCode = async () => {
    setIsLoading(true)
    // Simulate resending code
    setTimeout(() => {
      setTimeLeft(300) // Reset timer
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-medical-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-medical-900">Two-Factor Authentication</h1>
          <p className="text-medical-600">Enter the verification code to complete sign in</p>
        </div>

        <Card className="border-medical-200">
          <CardHeader>
            <CardTitle className="text-medical-900">Verify Your Identity</CardTitle>
            <CardDescription className="text-medical-600">
              {useBackupCode
                ? "Enter one of your backup recovery codes"
                : "Enter the 6-digit code sent to your registered method"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-700">{error}</AlertDescription>
                </Alert>
              )}

              {!useBackupCode ? (
                <>
                  {/* Verification Code Input */}
                  <div className="space-y-2">
                    <Label htmlFor="code" className="text-medical-900">
                      Verification Code
                    </Label>
                    <Input
                      id="code"
                      placeholder="Enter 6-digit code"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      className="border-medical-300 focus:border-medical-500 text-center text-lg tracking-widest"
                      maxLength={6}
                    />
                  </div>

                  {/* Method Indicator */}
                  <div className="flex items-center justify-center space-x-2 text-sm text-medical-600">
                    <Mail className="w-4 h-4" />
                    <span>Code sent to your email</span>
                  </div>

                  {/* Timer */}
                  <div className="text-center">
                    <p className="text-sm text-medical-600">
                      Code expires in: <span className="font-mono font-medium">{formatTime(timeLeft)}</span>
                    </p>
                  </div>

                  {/* Verify Button */}
                  <Button
                    onClick={handleVerify}
                    disabled={isLoading || verificationCode.length !== 6 || timeLeft === 0}
                    className="w-full bg-medical-600 hover:bg-medical-700 text-white"
                  >
                    {isLoading ? "Verifying..." : "Verify Code"}
                  </Button>

                  {/* Resend Code */}
                  <div className="text-center">
                    <Button
                      variant="ghost"
                      onClick={handleResendCode}
                      disabled={isLoading || timeLeft > 240} // Can resend after 1 minute
                      className="text-medical-600 hover:text-medical-700"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Resend Code
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {/* Backup Code Input */}
                  <div className="space-y-2">
                    <Label htmlFor="backupCode" className="text-medical-900">
                      Backup Recovery Code
                    </Label>
                    <Input
                      id="backupCode"
                      placeholder="Enter backup code"
                      value={backupCode}
                      onChange={(e) => setBackupCode(e.target.value.toUpperCase())}
                      className="border-medical-300 focus:border-medical-500 text-center font-mono"
                    />
                  </div>

                  <Alert className="border-yellow-200 bg-yellow-50">
                    <Shield className="h-4 w-4 text-yellow-600" />
                    <AlertDescription className="text-yellow-700">
                      Each backup code can only be used once. Make sure to keep your remaining codes secure.
                    </AlertDescription>
                  </Alert>

                  <Button
                    onClick={handleVerify}
                    disabled={isLoading || !backupCode}
                    className="w-full bg-medical-600 hover:bg-medical-700 text-white"
                  >
                    {isLoading ? "Verifying..." : "Verify Backup Code"}
                  </Button>
                </>
              )}

              {/* Toggle between methods */}
              <div className="text-center pt-4 border-t border-medical-200">
                <Button
                  variant="ghost"
                  onClick={() => setUseBackupCode(!useBackupCode)}
                  className="text-medical-600 hover:text-medical-700 text-sm"
                >
                  {useBackupCode ? "Use verification code instead" : "Can't access your device? Use backup code"}
                </Button>
              </div>

              {/* Help */}
              <div className="text-center">
                <p className="text-xs text-medical-500">
                  Having trouble?{" "}
                  <Link href="/support" className="text-medical-600 hover:text-medical-700 underline">
                    Contact Support
                  </Link>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Demo Notice */}
        <Card className="mt-4 border-medical-200 bg-medical-50">
          <CardContent className="pt-6">
            <h3 className="font-medium text-medical-900 mb-2">Demo Codes:</h3>
            <div className="text-sm text-medical-700 space-y-1">
              <p>
                <strong>Verification Code:</strong> 123456
              </p>
              <p>
                <strong>Backup Code:</strong> ABC123
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
