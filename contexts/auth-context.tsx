"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  email: string
  name: string
  role: "student" | "instructor" | "admin"
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check for existing session on mount
    const sessionData = sessionStorage.getItem("medlearn_session")
    if (sessionData) {
      try {
        const userData = JSON.parse(sessionData)
        setUser(userData)
      } catch (error) {
        console.error("Error parsing session data:", error)
        sessionStorage.removeItem("medlearn_session")
      }
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Mock authentication logic
    const mockUsers = {
      "student@medlearn.edu": { id: "1", name: "John Doe", role: "student" as const },
      "instructor@medlearn.edu": { id: "2", name: "Dr. Smith", role: "instructor" as const },
      "admin@medlearn.edu": { id: "3", name: "Admin User", role: "admin" as const },
    }

    const userData = mockUsers[email as keyof typeof mockUsers]

    if (userData && password === "password") {
      const user = { ...userData, email }
      setUser(user)
      sessionStorage.setItem("medlearn_session", JSON.stringify(user))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    sessionStorage.removeItem("medlearn_session")
    localStorage.removeItem("medlearn_preferences")
    router.push("/auth/login")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
