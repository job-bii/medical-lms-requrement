"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, XCircle, Eye, Mail, Phone, Calendar, User, Building, AlertTriangle, Clock } from "lucide-react"

const pendingApprovals = [
  {
    id: 1,
    firstName: "Dr. Michael",
    lastName: "Thompson",
    email: "m.thompson@university.edu",
    phone: "+1 (555) 234-5678",
    role: "instructor",
    staffId: "STAFF2024015",
    department: "cardiology",
    requestDate: "2024-01-20T09:30:00Z",
    profilePicture: "/placeholder.svg?height=60&width=60",
    status: "pending",
    documents: ["CV", "Teaching Certificate", "Medical License"],
  },
  {
    id: 2,
    firstName: "Dr. Sarah",
    lastName: "Williams",
    email: "s.williams@university.edu",
    phone: "+1 (555) 345-6789",
    role: "instructor",
    staffId: "STAFF2024016",
    department: "neurology",
    requestDate: "2024-01-19T14:15:00Z",
    profilePicture: "/placeholder.svg?height=60&width=60",
    status: "pending",
    documents: ["CV", "PhD Certificate", "Research Papers"],
  },
  {
    id: 3,
    firstName: "Dr. James",
    lastName: "Rodriguez",
    email: "j.rodriguez@university.edu",
    phone: "+1 (555) 456-7890",
    role: "instructor",
    staffId: "STAFF2024017",
    department: "pharmacology",
    requestDate: "2024-01-18T11:45:00Z",
    profilePicture: "/placeholder.svg?height=60&width=60",
    status: "pending",
    documents: ["CV", "PharmD Certificate", "Board Certification"],
  },
]

const recentActions = [
  {
    id: 1,
    applicant: "Dr. Emily Chen",
    action: "approved",
    department: "pathology",
    timestamp: "2024-01-20T08:15:00Z",
    approvedBy: "Admin User",
  },
  {
    id: 2,
    applicant: "Dr. Robert Kim",
    action: "rejected",
    department: "surgery",
    timestamp: "2024-01-19T16:30:00Z",
    approvedBy: "Admin User",
    reason: "Incomplete documentation",
  },
]

export default function ApprovalsPage() {
  const [selectedApproval, setSelectedApproval] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [actionResult, setActionResult] = useState<{ type: "success" | "error"; message: string } | null>(null)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleApproval = async (id: number, action: "approve" | "reject", reason?: string) => {
    setIsLoading(true)
    setActionResult(null)

    // Simulate API call
    setTimeout(() => {
      if (action === "approve") {
        setActionResult({
          type: "success",
          message: "Instructor account approved successfully. Welcome email sent.",
        })
      } else {
        setActionResult({
          type: "success",
          message: `Application rejected. ${reason ? "Reason: " + reason : "Notification sent to applicant."}`,
        })
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-medical-900">Account Approvals</h1>
        <p className="text-medical-600">Review and approve instructor account applications</p>
      </div>

      {actionResult && (
        <Alert
          className={`mb-6 ${actionResult.type === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
        >
          {actionResult.type === "success" ? (
            <CheckCircle className="h-4 w-4 text-green-600" />
          ) : (
            <AlertTriangle className="h-4 w-4 text-red-600" />
          )}
          <AlertDescription className={actionResult.type === "success" ? "text-green-700" : "text-red-700"}>
            {actionResult.message}
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pending" className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>Pending ({pendingApprovals.length})</span>
          </TabsTrigger>
          <TabsTrigger value="recent">Recent Actions</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <div className="grid gap-6">
            {pendingApprovals.map((approval) => (
              <Card key={approval.id} className="border-medical-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={approval.profilePicture || "/placeholder.svg"} />
                        <AvatarFallback className="bg-medical-100 text-medical-700">
                          {approval.firstName[0]}
                          {approval.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-xl text-medical-900">
                          {approval.firstName} {approval.lastName}
                        </CardTitle>
                        <CardDescription className="text-medical-600">
                          Applying for Instructor position in {approval.department}
                        </CardDescription>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-medical-600">
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            Applied {formatDate(approval.requestDate)}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {approval.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Contact Information */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-medical-900">Contact Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-medical-600" />
                          <span>{approval.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-medical-600" />
                          <span>{approval.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-medical-600" />
                          <span>Staff ID: {approval.staffId}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Building className="w-4 h-4 text-medical-600" />
                          <span className="capitalize">{approval.department} Department</span>
                        </div>
                      </div>
                    </div>

                    {/* Documents */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-medical-900">Submitted Documents</h4>
                      <div className="space-y-2">
                        {approval.documents.map((doc, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 bg-medical-50 rounded border border-medical-200"
                          >
                            <span className="text-sm text-medical-700">{doc}</span>
                            <Button variant="ghost" size="sm" className="text-medical-600 hover:text-medical-700">
                              <Eye className="w-3 h-3 mr-1" />
                              View
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-medical-200">
                    <Button
                      variant="outline"
                      className="border-medical-300 text-medical-700 bg-transparent"
                      onClick={() => setSelectedApproval(approval.id)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Review Details
                    </Button>
                    <Button
                      variant="outline"
                      className="border-red-300 text-red-700 hover:bg-red-50 bg-transparent"
                      onClick={() => handleApproval(approval.id, "reject")}
                      disabled={isLoading}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                    <Button
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => handleApproval(approval.id, "approve")}
                      disabled={isLoading}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {isLoading ? "Processing..." : "Approve"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent">
          <Card className="border-medical-200">
            <CardHeader>
              <CardTitle className="text-medical-900">Recent Approval Actions</CardTitle>
              <CardDescription className="text-medical-600">History of recent approval decisions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActions.map((action) => (
                  <div
                    key={action.id}
                    className="flex items-center justify-between p-4 border border-medical-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-3 h-3 rounded-full ${action.action === "approved" ? "bg-green-500" : "bg-red-500"}`}
                      />
                      <div>
                        <p className="font-medium text-medical-900">{action.applicant}</p>
                        <div className="flex items-center space-x-4 text-sm text-medical-600">
                          <span className="capitalize">{action.department} Department</span>
                          <span>•</span>
                          <span>{formatDate(action.timestamp)}</span>
                          <span>•</span>
                          <span>by {action.approvedBy}</span>
                        </div>
                        {action.reason && <p className="text-sm text-red-600 mt-1">Reason: {action.reason}</p>}
                      </div>
                    </div>
                    <Badge
                      variant={action.action === "approved" ? "secondary" : "destructive"}
                      className={
                        action.action === "approved" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }
                    >
                      {action.action === "approved" ? "Approved" : "Rejected"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
