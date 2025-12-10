"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  CalendarIcon,
  Clock,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
  Plus,
  Bell,
  BookOpen,
  GraduationCap,
  Stethoscope,
  FileText,
} from "lucide-react"

const events = [
  {
    id: 1,
    title: "Anatomy Lecture: Cardiovascular System",
    course: "Human Anatomy Fundamentals",
    instructor: "Dr. Sarah Johnson",
    instructorAvatar: "/placeholder.svg?height=32&width=32",
    type: "Lecture",
    date: "2024-01-15",
    time: "09:00 - 10:30",
    location: "Lecture Hall A",
    attendees: 45,
    description: "Comprehensive overview of heart structure and blood circulation.",
    isToday: true,
  },
  {
    id: 2,
    title: "Pharmacology Lab: Drug Interactions",
    course: "Pharmacology Essentials",
    instructor: "Dr. Michael Chen",
    instructorAvatar: "/placeholder.svg?height=32&width=32",
    type: "Lab",
    date: "2024-01-15",
    time: "14:00 - 16:00",
    location: "Lab Room 203",
    attendees: 24,
    description: "Hands-on analysis of drug interaction mechanisms.",
    isToday: true,
  },
  {
    id: 3,
    title: "Pathology Exam",
    course: "Pathology and Disease",
    instructor: "Dr. Emily Rodriguez",
    instructorAvatar: "/placeholder.svg?height=32&width=32",
    type: "Exam",
    date: "2024-01-16",
    time: "10:00 - 12:00",
    location: "Exam Hall B",
    attendees: 67,
    description: "Midterm examination covering disease processes and diagnostics.",
    isToday: false,
  },
  {
    id: 4,
    title: "Clinical Skills Quiz",
    course: "Clinical Skills and Examination",
    instructor: "Dr. Maria Garcia",
    instructorAvatar: "/placeholder.svg?height=32&width=32",
    type: "Quiz",
    date: "2024-01-17",
    time: "11:00 - 11:30",
    location: "Online",
    attendees: 89,
    description: "Quick assessment of patient examination techniques.",
    isToday: false,
  },
  {
    id: 5,
    title: "Neurology Seminar: Brain Imaging",
    course: "Neurology and Brain Function",
    instructor: "Dr. Lisa Park",
    instructorAvatar: "/placeholder.svg?height=32&width=32",
    type: "Seminar",
    date: "2024-01-18",
    time: "15:30 - 17:00",
    location: "Conference Room 1",
    attendees: 32,
    description: "Advanced brain imaging techniques and interpretation.",
    isToday: false,
  },
  {
    id: 6,
    title: "Medical Ethics Discussion",
    course: "Medical Ethics and Law",
    instructor: "Dr. David Thompson",
    instructorAvatar: "/placeholder.svg?height=32&width=32",
    type: "Seminar",
    date: "2024-01-19",
    time: "13:00 - 14:30",
    location: "Room 305",
    attendees: 56,
    description: "Case studies in medical ethics and professional responsibility.",
    isToday: false,
  },
  {
    id: 7,
    title: "Radiology Workshop",
    course: "Medical Imaging and Radiology",
    instructor: "Dr. Jennifer Lee",
    instructorAvatar: "/placeholder.svg?height=32&width=32",
    type: "Lab",
    date: "2024-01-20",
    time: "09:00 - 12:00",
    location: "Imaging Center",
    attendees: 28,
    description: "Practical training with X-ray and CT scan interpretation.",
    isToday: false,
  },
]

const eventTypeIcons = {
  Lecture: BookOpen,
  Lab: Stethoscope,
  Exam: FileText,
  Quiz: GraduationCap,
  Seminar: Users,
}

const eventTypeColors = {
  Lecture: "bg-blue-100 text-blue-800 border-blue-200",
  Lab: "bg-green-100 text-green-800 border-green-200",
  Exam: "bg-red-100 text-red-800 border-red-200",
  Quiz: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Seminar: "bg-purple-100 text-purple-800 border-purple-200",
}

export default function CalendarPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("All")
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 15)) // January 15, 2024

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "All" || event.type === selectedType

    return matchesSearch && matchesType
  })

  const todayEvents = events.filter((event) => event.isToday)
  const upcomingEvents = events.filter((event) => !event.isToday).slice(0, 5)
  const eventTypes = ["All", ...Array.from(new Set(events.map((event) => event.type)))]

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getWeeklyStats = () => {
    const stats = {
      Lecture: 3,
      Lab: 2,
      Exam: 1,
      Quiz: 1,
      Seminar: 2,
    }
    return stats
  }

  const weeklyStats = getWeeklyStats()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-medical-900 dark:text-medical-100">Academic Calendar</h1>
          <p className="text-medical-600 dark:text-medical-400">{formatDate(currentDate)}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-medical-200 bg-transparent">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
          <Button size="sm" className="bg-medical-600 hover:bg-medical-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-medical-400 h-4 w-4" />
          <Input
            placeholder="Search events, courses, or instructors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-medical-200 focus:border-medical-500"
          />
        </div>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-full sm:w-48 border-medical-200">
            <SelectValue placeholder="Event Type" />
          </SelectTrigger>
          <SelectContent>
            {eventTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-medical-200 bg-transparent">
            Month
          </Button>
          <Button variant="outline" size="sm" className="border-medical-200 bg-transparent">
            Week
          </Button>
          <Button variant="outline" size="sm" className="border-medical-200 bg-transparent">
            Day
          </Button>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="border-medical-200 bg-transparent">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold text-medical-900 dark:text-medical-100">January 2024</h2>
          <Button variant="outline" size="sm" className="border-medical-200 bg-transparent">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="outline" size="sm" className="border-medical-200 bg-transparent">
          Today
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Calendar Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Schedule */}
          <Card className="border-medical-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-medical-900 dark:text-medical-100">
                <CalendarIcon className="h-5 w-5" />
                Today's Schedule
              </CardTitle>
              <CardDescription className="text-medical-600 dark:text-medical-400">
                {todayEvents.length} events scheduled for today
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {todayEvents.map((event) => {
                const IconComponent = eventTypeIcons[event.type as keyof typeof eventTypeIcons]
                const colorClass = eventTypeColors[event.type as keyof typeof eventTypeColors]

                return (
                  <div
                    key={event.id}
                    className="flex items-start gap-4 p-4 border border-medical-200 rounded-lg hover:bg-medical-50 dark:hover:bg-medical-900/20 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-medical-100 dark:bg-medical-900 rounded-lg flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-medical-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-medical-900 dark:text-medical-100">{event.title}</h3>
                          <p className="text-sm text-medical-600 dark:text-medical-400">{event.course}</p>
                        </div>
                        <Badge className={colorClass}>{event.type}</Badge>
                      </div>
                      <div className="mt-2 flex items-center gap-4 text-sm text-medical-600 dark:text-medical-400">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {event.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {event.attendees}
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={event.instructorAvatar || "/placeholder.svg"} alt={event.instructor} />
                          <AvatarFallback className="bg-medical-100 text-medical-700 text-xs">
                            {event.instructor
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-medical-600 dark:text-medical-400">{event.instructor}</span>
                      </div>
                      <p className="mt-2 text-sm text-medical-600 dark:text-medical-400">{event.description}</p>
                      <div className="mt-3">
                        <Button size="sm" className="bg-medical-600 hover:bg-medical-700 text-white">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* All Events */}
          <Card className="border-medical-200">
            <CardHeader>
              <CardTitle className="text-medical-900 dark:text-medical-100">All Events</CardTitle>
              <CardDescription className="text-medical-600 dark:text-medical-400">
                {filteredEvents.length} events found
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredEvents.map((event) => {
                const IconComponent = eventTypeIcons[event.type as keyof typeof eventTypeIcons]
                const colorClass = eventTypeColors[event.type as keyof typeof eventTypeColors]

                return (
                  <div
                    key={event.id}
                    className="flex items-center gap-4 p-3 border border-medical-200 rounded-lg hover:bg-medical-50 dark:hover:bg-medical-900/20 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      <IconComponent className="h-5 w-5 text-medical-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-medical-900 dark:text-medical-100 truncate">{event.title}</h3>
                        <Badge className={colorClass} variant="outline">
                          {event.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-medical-600 dark:text-medical-400 mt-1">
                        <span>{event.date}</span>
                        <span>{event.time}</span>
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Weekly Stats */}
          <Card className="border-medical-200">
            <CardHeader>
              <CardTitle className="text-medical-900 dark:text-medical-100">This Week</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(weeklyStats).map(([type, count]) => {
                const IconComponent = eventTypeIcons[type as keyof typeof eventTypeIcons]
                return (
                  <div key={type} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <IconComponent className="h-4 w-4 text-medical-600" />
                      <span className="text-sm text-medical-700 dark:text-medical-300">{type}s</span>
                    </div>
                    <Badge variant="secondary" className="bg-medical-100 text-medical-700">
                      {count}
                    </Badge>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="border-medical-200">
            <CardHeader>
              <CardTitle className="text-medical-900 dark:text-medical-100">Upcoming</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingEvents.map((event) => {
                const IconComponent = eventTypeIcons[event.type as keyof typeof eventTypeIcons]
                return (
                  <div
                    key={event.id}
                    className="flex items-start gap-3 p-2 rounded-lg hover:bg-medical-50 dark:hover:bg-medical-900/20 transition-colors"
                  >
                    <IconComponent className="h-4 w-4 text-medical-600 mt-1" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-medical-900 dark:text-medical-100 truncate">
                        {event.title}
                      </h4>
                      <p className="text-xs text-medical-600 dark:text-medical-400">
                        {event.date} • {event.time}
                      </p>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Event Types Legend */}
          <Card className="border-medical-200">
            <CardHeader>
              <CardTitle className="text-medical-900 dark:text-medical-100">Event Types</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {Object.entries(eventTypeIcons).map(([type, IconComponent]) => {
                const colorClass = eventTypeColors[type as keyof typeof eventTypeColors]
                return (
                  <div key={type} className="flex items-center gap-2">
                    <IconComponent className="h-4 w-4 text-medical-600" />
                    <Badge className={colorClass} variant="outline">
                      {type}
                    </Badge>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
