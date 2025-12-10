"use client"

import type React from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="border-b border-medical-200 dark:border-medical-800 bg-white dark:bg-gray-900 p-4 flex items-center">
            <SidebarTrigger />
            <h1 className="ml-4 text-lg font-semibold text-medical-900 dark:text-medical-100">MedLearn University</h1>
          </div>
          <div className="flex-1 overflow-auto bg-medical-50 dark:bg-gray-900">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  )
}
