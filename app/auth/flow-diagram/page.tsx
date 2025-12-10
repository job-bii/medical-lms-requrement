"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, UserPlus, Mail, Shield, CheckCircle, Clock, AlertTriangle } from "lucide-react"
import Link from "next/link"

const userJourney = [
  {
    step: 1,
    title: "User Discovers Platform",
    description: "New user visits the landing page",
    location: "Landing Page (/)",
    action: "Clicks 'Get Started' or 'Register'",
    form: null,
    icon: UserPlus,
    status: "entry-point",
  },
  {
    step: 2,
    title: "Registration Form",
    description: "User fills out comprehensive registration form",
    location: "Registration Page (/auth/register)",
    action: "Completes all required fields and submits",
    form: "MAIN REGISTRATION FORM",
    icon: UserPlus,
    status: "form-required",
    formFields: [
      "Profile Picture Upload",
      "First Name & Last Name",
      "Institutional Email (@university.edu)",
      "Phone Number",
      "Role Selection (Student/Instructor)",
      "Department Selection",
      "Student ID (if student) OR Staff ID (if instructor)",
      "Academic Year & Semester (if student)",
      "Password & Confirm Password",
      "Terms & Conditions Agreement",
    ],
  },
  {
    step: 3,
    title: "Email Verification",
    description: "System sends verification email",
    location: "Email Inbox",
    action: "User clicks verification link in email",
    form: null,
    icon: Mail,
    status: "automated",
  },
  {
    step: 4,
    title: "2FA Setup",
    description: "User sets up two-factor authentication",
    location: "2FA Setup Page (/auth/setup-2fa)",
    action: "Chooses method and verifies code",
    form: "2FA SETUP FORM",
    icon: Shield,
    status: "form-required",
    formFields: ["Choose 2FA Method (Email/SMS)", "Phone Number (if SMS)", "Verify Code", "Save Backup Codes"],
  },
  {
    step: 5,
    title: "Admin Approval (Instructors Only)",
    description: "Instructor accounts require admin approval",
    location: "Admin Dashboard (/admin/approvals)",
    action: "Admin reviews and approves/rejects",
    form: null,
    icon: Clock,
    status: "waiting",
    note: "Students skip this step",
  },
  {
    step: 6,
    title: "Account Active",
    description: "User can now access the platform",
    location: "Dashboard",
    action: "Full platform access granted",
    form: null,
    icon: CheckCircle,
    status: "complete",
  },
]

const formDetails = {
  registration: {
    title: "Main Registration Form",
    location: "/auth/register",
    when: "First time users creating an account",
    required: true,
    sections: [
      {
        name: "Profile Information",
        fields: [
          { name: "Profile Picture", type: "file", required: false, note: "Max 5MB, JPG/PNG" },
          { name: "First Name", type: "text", required: true },
          { name: "Last Name", type: "text", required: true },
        ],
      },
      {
        name: "Contact Details",
        fields: [
          { name: "Institutional Email", type: "email", required: true, note: "Must end with @university.edu" },
          { name: "Phone Number", type: "tel", required: true, note: "For 2FA and emergency contact" },
        ],
      },
      {
        name: "Role & Academic Info",
        fields: [
          { name: "Role", type: "select", required: true, options: ["Student", "Instructor"] },
          { name: "Department", type: "select", required: true, options: ["Anatomy", "Pharmacology", "etc."] },
          { name: "Student ID", type: "text", required: true, condition: "If role = Student" },
          { name: "Staff ID", type: "text", required: true, condition: "If role = Instructor" },
          { name: "Academic Year", type: "select", required: true, condition: "If role = Student" },
          { name: "Current Semester", type: "select", required: true, condition: "If role = Student" },
        ],
      },
      {
        name: "Security",
        fields: [
          { name: "Password", type: "password", required: true, note: "8+ chars, mixed case, numbers, symbols" },
          { name: "Confirm Password", type: "password", required: true },
          { name: "Terms Agreement", type: "checkbox", required: true },
        ],
      },
    ],
  },
  twoFactor: {
    title: "2FA Setup Form",
    location: "/auth/setup-2fa",
    when: "After successful registration",
    required: true,
    sections: [
      {
        name: "Method Selection",
        fields: [
          { name: "2FA Method", type: "radio", required: true, options: ["Email", "SMS"] },
          { name: "Phone Number", type: "tel", required: false, condition: "If SMS selected" },
        ],
      },
      {
        name: "Verification",
        fields: [
          { name: "Verification Code", type: "text", required: true, note: "6-digit code sent to chosen method" },
        ],
      },
    ],
  },
}

export default function FlowDiagramPage() {
  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-medical-900">User Registration Flow & Forms</h1>
        <p className="text-medical-600">Complete journey from first visit to active account</p>
      </div>

      {/* User Journey Flow */}
      <Card className="mb-8 border-medical-200">
        <CardHeader>
          <CardTitle className="text-medical-900">Complete User Journey</CardTitle>
          <CardDescription className="text-medical-600">
            Step-by-step process showing when and where users encounter forms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {userJourney.map((step, index) => (
              <div key={step.step} className="flex items-start space-x-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step.status === "form-required"
                        ? "bg-medical-600 text-white"
                        : step.status === "complete"
                          ? "bg-green-600 text-white"
                          : step.status === "waiting"
                            ? "bg-yellow-600 text-white"
                            : "bg-medical-100 text-medical-600"
                    }`}
                  >
                    <step.icon className="w-5 h-5" />
                  </div>
                  {index < userJourney.length - 1 && <div className="w-0.5 h-12 bg-medical-200 mt-2" />}
                </div>

                <div className="flex-1 pb-8">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-medical-900">{step.title}</h3>
                    {step.form && (
                      <Badge variant="secondary" className="bg-medical-100 text-medical-700">
                        FORM REQUIRED
                      </Badge>
                    )}
                    {step.status === "waiting" && step.note && (
                      <Badge variant="outline" className="border-yellow-300 text-yellow-700">
                        {step.note}
                      </Badge>
                    )}
                  </div>

                  <p className="text-medical-600 mb-2">{step.description}</p>

                  <div className="text-sm text-medical-500 space-y-1">
                    <p>
                      <strong>Location:</strong> {step.location}
                    </p>
                    <p>
                      <strong>User Action:</strong> {step.action}
                    </p>
                  </div>

                  {step.formFields && (
                    <div className="mt-3 p-3 bg-medical-50 rounded border border-medical-200">
                      <p className="font-medium text-medical-900 mb-2">Form Fields:</p>
                      <div className="grid md:grid-cols-2 gap-1 text-sm text-medical-700">
                        {step.formFields.map((field, fieldIndex) => (
                          <div key={fieldIndex} className="flex items-center space-x-2">
                            <div className="w-1 h-1 bg-medical-400 rounded-full" />
                            <span>{field}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {step.step === 2 && (
                    <div className="mt-3">
                      <Link href="/auth/register">
                        <Button className="bg-medical-600 hover:bg-medical-700 text-white">
                          <ArrowRight className="w-4 h-4 mr-2" />
                          View Registration Form
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

      {/* Detailed Form Breakdown */}
      <div className="grid lg:grid-cols-2 gap-6">
        {Object.entries(formDetails).map(([key, form]) => (
          <div key={key} className="border-medical-200">
            <CardHeader>
              <CardTitle className="text-medical-900">{form.title}</CardTitle>
              <CardDescription className="text-medical-600">
                <strong>When:</strong> {form.when}
                <br />
                <strong>Location:</strong> {form.location}
                <br />
                <strong>Required:</strong> {form.required ? "Yes" : "No"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {form.sections.map((section, sectionIndex) => (
                  <div key={sectionIndex}>
                    <h4 className="font-medium text-medical-900 mb-2">{section.name}</h4>
                    <div className="space-y-2">
                      {section.fields.map((field, fieldIndex) => (
                        <div key={fieldIndex} className="flex items-start justify-between text-sm">
                          <div className="flex-1">
                            <span className="text-medical-700">{field.name}</span>
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                            {field.condition && <p className="text-xs text-medical-500">{field.condition}</p>}
                            {field.note && <p className="text-xs text-blue-600">{field.note}</p>}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {field.type}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-medical-200">
                <Link href={form.location}>
                  <Button variant="outline" className="w-full border-medical-300 text-medical-700 bg-transparent">
                    View This Form
                  </Button>
                </Link>
              </div>
            </CardContent>
          </div>
        ))}
      </div>

      {/* Entry Points */}
      <Card className="mt-8 border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-900">How Users Find the Registration Form</CardTitle>
        </CardHeader>
        <CardContent className="text-blue-800">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-3 bg-white rounded border border-blue-200">
              <h4 className="font-medium mb-2">Landing Page</h4>
              <p className="text-sm">
                Main homepage (/) has "Get Started" and "Register" buttons that lead to registration form
              </p>
            </div>
            <div className="p-3 bg-white rounded border border-blue-200">
              <h4 className="font-medium mb-2">Login Page</h4>
              <p className="text-sm">Login page (/auth/login) has "Don't have an account? Register here" link</p>
            </div>
            <div className="p-3 bg-white rounded border border-blue-200">
              <h4 className="font-medium mb-2">Direct URL</h4>
              <p className="text-sm">Users can go directly to /auth/register if they have the link</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Important Notes */}
      <Card className="mt-6 border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="text-yellow-900 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Important Notes About Forms
          </CardTitle>
        </CardHeader>
        <CardContent className="text-yellow-800 text-sm space-y-2">
          <p>
            • <strong>Registration form is MANDATORY</strong> - no account access without completing it
          </p>
          <p>
            • <strong>2FA setup is REQUIRED</strong> - users cannot skip this step
          </p>
          <p>
            • <strong>Instructor approval</strong> - instructors must wait for admin approval before full access
          </p>
          <p>
            • <strong>Email verification</strong> - users must verify their institutional email
          </p>
          <p>
            • <strong>Form validation</strong> - real-time validation prevents submission of invalid data
          </p>
          <p>
            • <strong>Profile completion</strong> - users can update profile info later in /profile
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
