"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Camera, Save, CheckCircle, AlertCircle, Clock, MapPin, Smartphone, Key } from "lucide-react"

const mockUser = {
  id: "USR001",
  firstName: "Alex",
  lastName: "Student",
  email: "alex.student@university.edu",
  phone: "+1 (555) 123-4567",
  role: "student",
  studentId: "MED2024001",
  department: "anatomy",
  academicYear: "2024-2025",
  semester: "fall",
  profilePicture: "/placeholder.svg?height=120&width=120",
  joinDate: "2024-01-15",
  lastLogin: "2024-01-20T10:30:00Z",
  twoFactorEnabled: true,
  loginAttempts: [
    { timestamp: "2024-01-20T10:30:00Z", ip: "192.168.1.1", success: true, location: "Campus Network" },
    { timestamp: "2024-01-19T14:15:00Z", ip: "10.0.0.1", success: true, location: "Library WiFi" },
    { timestamp: "2024-01-18T09:45:00Z", ip: "192.168.1.1", success: true, location: "Campus Network" },
  ],
}

export default function ProfilePage() {
  const [user, setUser] = useState(mockUser)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleSave = async () => {
    setIsLoading(true)
    setError("")
    setSuccess("")

    // Simulate API call
    setTimeout(() => {
      setSuccess("Profile updated successfully!")
      setIsEditing(false)
      setIsLoading(false)
    }, 1000)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Profile picture must be less than 5MB")
        return
      }

      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-medical-900">Profile Settings</h1>
        <p className="text-medical-600">Manage your account information and security settings</p>
      </div>

      {success && (
        <Alert className="mb-6 border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-700">{success}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-700">{error}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile Information</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="activity">Login Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="border-medical-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-medical-900">Personal Information</CardTitle>
                  <CardDescription className="text-medical-600">
                    Update your profile details and academic information
                  </CardDescription>
                </div>
                <Button
                  variant={isEditing ? "outline" : "default"}
                  onClick={() => setIsEditing(!isEditing)}
                  className={
                    isEditing
                      ? "border-medical-300 text-medical-700 bg-transparent"
                      : "bg-medical-600 hover:bg-medical-700 text-white"
                  }
                >
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center space-x-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={previewUrl || user.profilePicture} />
                  <AvatarFallback className="bg-medical-100 text-medical-700 text-xl">
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-medical-100 text-medical-700 capitalize">
                      {user.role}
                    </Badge>
                    <Badge variant="outline" className="border-green-300 text-green-700">
                      Active
                    </Badge>
                  </div>
                  {isEditing && (
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
                        size="sm"
                        onClick={() => document.getElementById("profilePicture")?.click()}
                        className="border-medical-300 text-medical-700 bg-transparent"
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Change Photo
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-medical-900">First Name</Label>
                  {isEditing ? (
                    <Input
                      value={user.firstName}
                      onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                      className="border-medical-300 focus:border-medical-500"
                    />
                  ) : (
                    <div className="p-3 bg-medical-50 rounded-md border border-medical-200">{user.firstName}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-medical-900">Last Name</Label>
                  {isEditing ? (
                    <Input
                      value={user.lastName}
                      onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                      className="border-medical-300 focus:border-medical-500"
                    />
                  ) : (
                    <div className="p-3 bg-medical-50 rounded-md border border-medical-200">{user.lastName}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-medical-900">Email Address</Label>
                  <div className="p-3 bg-gray-100 rounded-md border border-gray-300 text-gray-600">
                    {user.email} (Cannot be changed)
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-medical-900">Phone Number</Label>
                  {isEditing ? (
                    <Input
                      value={user.phone}
                      onChange={(e) => setUser({ ...user, phone: e.target.value })}
                      className="border-medical-300 focus:border-medical-500"
                    />
                  ) : (
                    <div className="p-3 bg-medical-50 rounded-md border border-medical-200">{user.phone}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-medical-900">Department</Label>
                  {isEditing ? (
                    <Select value={user.department} onValueChange={(value) => setUser({ ...user, department: value })}>
                      <SelectTrigger className="border-medical-300 focus:border-medical-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="anatomy">Anatomy</SelectItem>
                        <SelectItem value="pharmacology">Pharmacology</SelectItem>
                        <SelectItem value="pathology">Pathology</SelectItem>
                        <SelectItem value="clinical">Clinical Medicine</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="p-3 bg-medical-50 rounded-md border border-medical-200 capitalize">
                      {user.department}
                    </div>
                  )}
                </div>

                {user.role === "student" && (
                  <>
                    <div className="space-y-2">
                      <Label className="text-medical-900">Student ID</Label>
                      <div className="p-3 bg-gray-100 rounded-md border border-gray-300 text-gray-600">
                        {user.studentId} (Cannot be changed)
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-medical-900">Academic Year</Label>
                      {isEditing ? (
                        <Select
                          value={user.academicYear}
                          onValueChange={(value) => setUser({ ...user, academicYear: value })}
                        >
                          <SelectTrigger className="border-medical-300 focus:border-medical-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2024-2025">2024-2025</SelectItem>
                            <SelectItem value="2025-2026">2025-2026</SelectItem>
                            <SelectItem value="2026-2027">2026-2027</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="p-3 bg-medical-50 rounded-md border border-medical-200">
                          {user.academicYear}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-medical-900">Current Semester</Label>
                      {isEditing ? (
                        <Select value={user.semester} onValueChange={(value) => setUser({ ...user, semester: value })}>
                          <SelectTrigger className="border-medical-300 focus:border-medical-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fall">Fall</SelectItem>
                            <SelectItem value="spring">Spring</SelectItem>
                            <SelectItem value="summer">Summer</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="p-3 bg-medical-50 rounded-md border border-medical-200 capitalize">
                          {user.semester}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              {isEditing && (
                <div className="flex justify-end space-x-4 pt-4 border-t border-medical-200">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    className="border-medical-300 text-medical-700 bg-transparent"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="bg-medical-600 hover:bg-medical-700 text-white"
                  >
                    {isLoading ? (
                      "Saving..."
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="space-y-6">
            {/* Two-Factor Authentication */}
            <Card className="border-medical-200">
              <CardHeader>
                <CardTitle className="text-medical-900 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Two-Factor Authentication
                </CardTitle>
                <CardDescription className="text-medical-600">
                  Secure your account with an additional layer of protection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${user.twoFactorEnabled ? "bg-green-500" : "bg-red-500"}`} />
                    <div>
                      <p className="font-medium text-medical-900">{user.twoFactorEnabled ? "Enabled" : "Disabled"}</p>
                      <p className="text-sm text-medical-600">
                        {user.twoFactorEnabled
                          ? "Your account is protected with 2FA"
                          : "Enable 2FA to secure your account"}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant={user.twoFactorEnabled ? "outline" : "default"}
                    className={
                      user.twoFactorEnabled
                        ? "border-medical-300 text-medical-700 bg-transparent"
                        : "bg-medical-600 hover:bg-medical-700 text-white"
                    }
                  >
                    {user.twoFactorEnabled ? "Manage 2FA" : "Enable 2FA"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Password Change */}
            <Card className="border-medical-200">
              <CardHeader>
                <CardTitle className="text-medical-900 flex items-center">
                  <Key className="w-5 h-5 mr-2" />
                  Password
                </CardTitle>
                <CardDescription className="text-medical-600">Change your account password</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-medical-900">Password</p>
                      <p className="text-sm text-medical-600">Last changed 30 days ago</p>
                    </div>
                    <Button variant="outline" className="border-medical-300 text-medical-700 bg-transparent">
                      Change Password
                    </Button>
                  </div>

                  <Alert className="border-yellow-200 bg-yellow-50">
                    <Shield className="h-4 w-4 text-yellow-600" />
                    <AlertDescription className="text-yellow-700">
                      Use a strong password with at least 8 characters, including uppercase, lowercase, numbers, and
                      special characters.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>

            {/* Session Management */}
            <Card className="border-medical-200">
              <CardHeader>
                <CardTitle className="text-medical-900 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Session Management
                </CardTitle>
                <CardDescription className="text-medical-600">
                  Manage your active sessions and security settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-medical-50 rounded-lg border border-medical-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <div>
                        <p className="font-medium text-medical-900">Current Session</p>
                        <p className="text-sm text-medical-600">Started {formatDate(user.lastLogin)}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Active
                    </Badge>
                  </div>

                  <div className="text-sm text-medical-600">
                    <p>• Sessions automatically expire after 30 minutes of inactivity</p>
                    <p>• You will be logged out if suspicious activity is detected</p>
                    <p>• Maximum of 3 concurrent sessions allowed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <Card className="border-medical-200">
            <CardHeader>
              <CardTitle className="text-medical-900 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Login Activity
              </CardTitle>
              <CardDescription className="text-medical-600">
                Monitor your recent account access and security events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.loginAttempts.map((attempt, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-medical-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${attempt.success ? "bg-green-500" : "bg-red-500"}`} />
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-medical-900">
                            {attempt.success ? "Successful Login" : "Failed Login"}
                          </p>
                          <Badge variant={attempt.success ? "secondary" : "destructive"} className="text-xs">
                            {attempt.success ? "Success" : "Failed"}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-medical-600 mt-1">
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatDate(attempt.timestamp)}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {attempt.location}
                          </span>
                          <span className="flex items-center">
                            <Smartphone className="w-3 h-3 mr-1" />
                            {attempt.ip}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-medical-50 rounded-lg border border-medical-200">
                <div className="flex items-start space-x-2">
                  <Shield className="w-4 h-4 text-medical-600 mt-0.5" />
                  <div className="text-xs text-medical-700">
                    <p className="font-medium mb-1">Security Monitoring</p>
                    <p>
                      We monitor all login attempts for suspicious activity. If you notice any unauthorized access,
                      please contact IT security immediately.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
