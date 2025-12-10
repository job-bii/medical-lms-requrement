"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Stethoscope, Eye, EyeOff, AlertCircle, CheckCircle, Upload, Camera } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { registerUser, validateInstitutionalEmail, validatePassword, type RegisterData } from "@/lib/auth"

interface FormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  role: "student" | "instructor" | "admin" | ""
  studentId: string
  staffId: string
  department: string
  academicYear: string
  semester: string
  phoneNumber: string
  profilePicture: File | null
  agreeToTerms: boolean
}

const departments = [
  "Anatomy",
  "Pharmacology",
  "Pathology",
  "Clinical Medicine",
  "Surgery",
  "Pediatrics",
  "Cardiology",
  "Neurology",
  "Radiology",
  "Emergency Medicine",
  "Management & Leadership",
  "ICT & Communication",
]

const academicYears = ["2024-2025", "2025-2026", "2026-2027", "2027-2028"]
const semesters = ["Fall", "Spring", "Summer"]

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    studentId: "",
    staffId: "",
    department: "",
    academicYear: "",
    semester: "",
    phoneNumber: "",
    profilePicture: null,
    agreeToTerms: false,
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const router = useRouter()

  const handleInputChange = (field: keyof FormData, value: string | boolean | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Profile picture must be less than 5MB")
        return
      }

      if (!file.type.startsWith("image/")) {
        setError("Please upload a valid image file")
        return
      }

      handleInputChange("profilePicture", file)

      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const validateForm = () => {
    // Basic validation
    if (!formData.firstName.trim()) return "First name is required"
    if (!formData.lastName.trim()) return "Last name is required"
    if (!formData.email.trim()) return "Email is required"
    if (!formData.password) return "Password is required"
    if (!formData.role) return "Please select a role"
    if (!formData.department) return "Please select a department"
    if (!formData.phoneNumber.trim()) return "Phone number is required"

    // Email validation
    if (!validateInstitutionalEmail(formData.email)) {
      return "Please use your institutional email address (e.g., @university.edu)"
    }

    // Password validation
    const passwordValidation = validatePassword(formData.password)
    if (!passwordValidation.isValid) {
      return `Password must contain: ${passwordValidation.errors.join(", ")}`
    }

    // Password confirmation
    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match"
    }

    // Phone number validation
    if (!formData.phoneNumber.match(/^\+?[\d\s\-()]{10,}$/)) {
      return "Please enter a valid phone number"
    }

    // Role-specific validation
    if (formData.role === "student") {
      if (!formData.studentId.trim()) return "Student ID is required"
      if (!formData.academicYear) return "Academic year is required"
      if (!formData.semester) return "Semester is required"
    }

    if (formData.role === "instructor" && !formData.staffId.trim()) {
      return "Staff ID is required"
    }

    // Terms agreement
    if (!formData.agreeToTerms) {
      return "Please agree to the terms and conditions"
    }

    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    try {
      // Validate form
      const validationError = validateForm()
      if (validationError) {
        setError(validationError)
        return
      }

      // Prepare registration data
      const registerData: RegisterData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        role: formData.role as "student" | "instructor" | "admin",
        phoneNumber: formData.phoneNumber.trim(),
        department: formData.department,
        studentId: formData.studentId.trim() || undefined,
        staffId: formData.staffId.trim() || undefined,
        academicYear: formData.academicYear || undefined,
        semester: formData.semester || undefined,
        // TODO: Handle profile picture upload to storage
        profilePictureUrl: undefined,
      }

      // Register user
      const { user, requiresApproval } = await registerUser(registerData)

      // Store registration info for next steps
      sessionStorage.setItem("newUserEmail", user.email)
      sessionStorage.setItem("newUserRole", user.role)
      sessionStorage.setItem("registrationComplete", "true")

      if (requiresApproval) {
        setSuccess(
          "Registration submitted successfully! Your instructor account requires admin approval. You will receive an email once approved and can then set up two-factor authentication.",
        )
        setTimeout(() => {
          router.push("/auth/pending-approval")
        }, 2000)
      } else {
        setSuccess(
          "Registration successful! Please proceed to set up two-factor authentication to secure your account.",
        )
        setTimeout(() => {
          router.push("/auth/setup-2fa")
        }, 2000)
      }
    } catch (err) {
      console.error("Registration error:", err)
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unexpected error occurred. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-medical-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-medical-900 dark:text-white">Create Your Account</h1>
          <p className="text-medical-600 dark:text-gray-300">Join MedLearn University's secure learning platform</p>
        </div>

        <Card className="border-medical-200 dark:border-gray-700 dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-medical-900 dark:text-white">Registration Form</CardTitle>
            <CardDescription className="text-medical-600 dark:text-gray-300">
              Please fill in all required information to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
                  <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                  <AlertDescription className="text-red-700 dark:text-red-300">{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <AlertDescription className="text-green-700 dark:text-green-300">{success}</AlertDescription>
                </Alert>
              )}

              {/* Profile Picture Upload */}
              <div className="space-y-2">
                <Label className="text-medical-900 dark:text-white">Profile Picture</Label>
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={previewUrl || "/placeholder.svg?height=80&width=80"} />
                    <AvatarFallback className="bg-medical-100 text-medical-700 dark:bg-gray-700 dark:text-gray-300">
                      <Camera className="w-8 h-8" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <input
                      type="file"
                      id="profilePicture"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("profilePicture")?.click()}
                      className="border-medical-300 text-medical-700 bg-transparent dark:border-gray-600 dark:text-gray-300"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Photo
                    </Button>
                    <p className="text-xs text-medical-500 dark:text-gray-400 mt-1">Max 5MB, JPG/PNG only</p>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-medical-900 dark:text-white">
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="border-medical-300 focus:border-medical-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-medical-900 dark:text-white">
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className="border-medical-300 focus:border-medical-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-medical-900 dark:text-white">
                    Institutional Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.name@university.edu"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="border-medical-300 focus:border-medical-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-medical-900 dark:text-white">
                    Phone Number *
                  </Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    className="border-medical-300 focus:border-medical-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
              </div>

              {/* Role Selection */}
              <div className="space-y-2">
                <Label htmlFor="role" className="text-medical-900 dark:text-white">
                  Role *
                </Label>
                <Select onValueChange={(value) => handleInputChange("role", value)} required>
                  <SelectTrigger className="border-medical-300 focus:border-medical-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-600">
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="instructor">Instructor</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Department */}
              <div className="space-y-2">
                <Label htmlFor="department" className="text-medical-900 dark:text-white">
                  Department *
                </Label>
                <Select onValueChange={(value) => handleInputChange("department", value)} required>
                  <SelectTrigger className="border-medical-300 focus:border-medical-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-600">
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept.toLowerCase().replace(/\s+/g, "-")}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Role-specific fields */}
              {formData.role === "student" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="studentId" className="text-medical-900 dark:text-white">
                      Student ID *
                    </Label>
                    <Input
                      id="studentId"
                      placeholder="MED2024001"
                      value={formData.studentId}
                      onChange={(e) => handleInputChange("studentId", e.target.value)}
                      className="border-medical-300 focus:border-medical-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="academicYear" className="text-medical-900 dark:text-white">
                      Academic Year *
                    </Label>
                    <Select onValueChange={(value) => handleInputChange("academicYear", value)} required>
                      <SelectTrigger className="border-medical-300 focus:border-medical-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-gray-800 dark:border-gray-600">
                        {academicYears.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="semester" className="text-medical-900 dark:text-white">
                      Current Semester *
                    </Label>
                    <Select onValueChange={(value) => handleInputChange("semester", value)} required>
                      <SelectTrigger className="border-medical-300 focus:border-medical-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-gray-800 dark:border-gray-600">
                        {semesters.map((semester) => (
                          <SelectItem key={semester} value={semester.toLowerCase()}>
                            {semester}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {formData.role === "instructor" && (
                <div className="space-y-2">
                  <Label htmlFor="staffId" className="text-medical-900 dark:text-white">
                    Staff ID *
                  </Label>
                  <Input
                    id="staffId"
                    placeholder="STAFF2024001"
                    value={formData.staffId}
                    onChange={(e) => handleInputChange("staffId", e.target.value)}
                    className="border-medical-300 focus:border-medical-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
              )}

              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-medical-900 dark:text-white">
                    Password *
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="border-medical-300 focus:border-medical-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-medical-500 hover:text-medical-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-medical-900 dark:text-white">
                    Confirm Password *
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className="border-medical-300 focus:border-medical-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-medical-500 hover:text-medical-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm text-medical-700 dark:text-gray-300 leading-relaxed">
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-medical-600 hover:text-medical-700 dark:text-medical-400 underline"
                  >
                    Terms of Service
                  </Link>
                  ,{" "}
                  <Link
                    href="/privacy"
                    className="text-medical-600 hover:text-medical-700 dark:text-medical-400 underline"
                  >
                    Privacy Policy
                  </Link>
                  , and{" "}
                  <Link
                    href="/security"
                    className="text-medical-600 hover:text-medical-700 dark:text-medical-400 underline"
                  >
                    Security Guidelines
                  </Link>
                  . I understand that my account will be subject to institutional policies and security monitoring.
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-medical-600 hover:bg-medical-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-medical-600 dark:text-gray-300">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-medical-600 hover:text-medical-700 dark:text-medical-400 font-medium"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
