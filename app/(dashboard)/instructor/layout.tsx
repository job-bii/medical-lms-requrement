"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function InstructorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [isInstructor, setIsInstructor] = useState(false)

  useEffect(() => {
    // Mock instructor check - in real app, this would come from auth context
    const checkInstructorRole = () => {
      // For demo purposes, we'll assume the user is an instructor
      // In a real app, you'd check the actual user role from your auth system
      const mockUser = {
        role: "instructor", // Change this to "student" to test student access
        id: "instructor-1",
        name: "Dr. Sarah Johnson",
      }

      if (mockUser.role === "instructor") {
        setIsInstructor(true)
      } else {
        router.push("/dashboard")
        return
      }

      setLoading(false)
    }

    checkInstructorRole()
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!isInstructor) {
    return null
  }

  return <>{children}</>
}
