"use client"

import { useState, useEffect } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Home,
  Users,
  Calendar,
  MessageSquare,
  Settings,
  Award,
  BarChart3,
  UserCheck,
  Shield,
  LogOut,
  ChevronUp,
  Stethoscope,
  Plus,
  BookOpen,
  BookMarked,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

// Mock user data - in real app, this would come from auth context
const getCurrentUser = () => {
  const path = typeof window !== "undefined" ? window.location.pathname : ""
  if (path.includes("/admin")) {
    return {
      name: "Admin User",
      email: "admin@university.edu",
      role: "admin",
      avatar: "/placeholder.svg?height=32&width=32",
    }
  } else if (path.includes("/instructor")) {
    return {
      name: "Dr. Sarah Johnson",
      email: "s.johnson@university.edu",
      role: "instructor",
      avatar: "/placeholder.svg?height=32&width=32",
    }
  } else {
    return {
      name: "Alex Student",
      email: "a.student@university.edu",
      role: "student",
      avatar: "/placeholder.svg?height=32&width=32",
    }
  }
}

const getMenuItems = (role: string) => {
  const commonItems = [
    {
      title: "Dashboard",
      url: `/dashboard/${role}`,
      icon: Home,
    },
    {
      title: "Calendar",
      url: "/calendar",
      icon: Calendar,
    },
    {
      title: "Messages",
      url: "/messages",
      icon: MessageSquare,
    },
  ]

  const roleSpecificItems = {
    student: [
      {
        title: "My Progress",
        url: "/progress",
        icon: BarChart3,
      },
      {
        title: "Certificates",
        url: "/certificates",
        icon: Award,
      },
    ],
    instructor: [
      {
        title: "My Courses",
        url: "/instructor/courses",
        icon: BookMarked,
      },
      {
        title: "Create Course",
        url: "/instructor/courses/create",
        icon: Plus,
        description: "Build a new course from scratch as an instructor",
      },
      {
        title: "My Students",
        url: "/students",
        icon: Users,
      },
      {
        title: "Analytics",
        url: "/analytics",
        icon: BarChart3,
      },
      {
        title: "Grading",
        url: "/grading",
        icon: UserCheck,
      },
    ],
    admin: [
      {
        title: "User Management",
        url: "/admin/users",
        icon: Users,
      },
      {
        title: "Course Management",
        url: "/admin/courses",
        icon: BookOpen,
      },
      {
        title: "Create Course",
        url: "/admin/courses/create",
        icon: Plus,
        description: "Create a new course as an administrator with full system privileges",
      },
      {
        title: "System Settings",
        url: "/admin/settings",
        icon: Shield,
      },
      {
        title: "Analytics",
        url: "/admin/analytics",
        icon: BarChart3,
      },
    ],
  }

  return [...commonItems, ...(roleSpecificItems[role as keyof typeof roleSpecificItems] || [])]
}

export function AppSidebar() {
  const [user, setUser] = useState(getCurrentUser())
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuth()

  useEffect(() => {
    setUser(getCurrentUser())
  }, [pathname])

  const handleSignOut = async () => {
    try {
      setIsLoggingOut(true)
      await logout()
      // The logout function in auth context will handle the redirect
    } catch (error) {
      console.error("Sign out error:", error)
      // Fallback: clear storage and redirect manually
      sessionStorage.clear()
      localStorage.clear()
      router.push("/auth/login")
    } finally {
      setIsLoggingOut(false)
    }
  }

  const menuItems = getMenuItems(user.role)

  return (
    <Sidebar variant="inset" className="border-medical-200 dark:border-medical-800">
      <SidebarHeader>
        <div className="flex items-center space-x-3 px-2 py-2">
          <div className="w-8 h-8 bg-medical-600 dark:bg-medical-500 rounded-lg flex items-center justify-center">
            <Stethoscope className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-medical-900 dark:text-medical-100">MedLearn</h2>
            <p className="text-xs text-medical-600 dark:text-medical-400">University</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-medical-700 dark:text-medical-300">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="bg-medical-200 dark:bg-medical-800" />

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/settings"}>
                  <Link href="/settings">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback className="bg-medical-100 dark:bg-medical-900 text-medical-700 dark:text-medical-300">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-medical-900 dark:text-medical-100">{user.name}</p>
                    <p className="text-xs text-medical-600 dark:text-medical-400 capitalize">{user.role}</p>
                  </div>
                  <ChevronUp className="ml-auto w-4 h-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center">
                    <Settings className="w-4 h-4 mr-2" />
                    Account Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleSignOut}
                  disabled={isLoggingOut}
                  className="flex items-center cursor-pointer"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  {isLoggingOut ? "Signing Out..." : "Sign Out"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
