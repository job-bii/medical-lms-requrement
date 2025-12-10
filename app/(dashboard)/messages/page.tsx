"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Star,
  Archive,
  Trash2,
  Users,
  GraduationCap,
  UserCheck,
  Shield,
} from "lucide-react"

const conversations = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    type: "instructor",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Great work on your anatomy assignment! I've left some feedback for you to review.",
    timestamp: "2 min ago",
    unread: 2,
    online: true,
    messages: [
      {
        id: 1,
        sender: "Dr. Sarah Johnson",
        content: "Hello! I wanted to discuss your recent anatomy assignment.",
        timestamp: "10:30 AM",
        isOwn: false,
      },
      {
        id: 2,
        sender: "You",
        content: "Thank you for the feedback, Dr. Johnson. I really appreciate the detailed comments.",
        timestamp: "10:35 AM",
        isOwn: true,
      },
      {
        id: 3,
        sender: "Dr. Sarah Johnson",
        content: "You're welcome! Your understanding of the cardiovascular system is excellent.",
        timestamp: "10:40 AM",
        isOwn: false,
      },
      {
        id: 4,
        sender: "Dr. Sarah Johnson",
        content: "Great work on your anatomy assignment! I've left some feedback for you to review.",
        timestamp: "10:45 AM",
        isOwn: false,
      },
    ],
  },
  {
    id: 2,
    name: "Pharmacology Study Group",
    type: "group",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Emma: Does anyone have notes from yesterday's lecture on drug interactions?",
    timestamp: "15 min ago",
    unread: 5,
    online: false,
    messages: [
      {
        id: 1,
        sender: "Mike Chen",
        content: "Hey everyone! Ready for tomorrow's pharmacology exam?",
        timestamp: "9:00 AM",
        isOwn: false,
      },
      {
        id: 2,
        sender: "You",
        content: "I'm feeling pretty confident about the drug mechanisms section.",
        timestamp: "9:05 AM",
        isOwn: true,
      },
      {
        id: 3,
        sender: "Emma Rodriguez",
        content: "Does anyone have notes from yesterday's lecture on drug interactions?",
        timestamp: "9:10 AM",
        isOwn: false,
      },
    ],
  },
  {
    id: 3,
    name: "Dr. Michael Chen",
    type: "instructor",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "The pharmacology exam has been rescheduled to next Friday. Please check your calendar.",
    timestamp: "1 hour ago",
    unread: 1,
    online: true,
    messages: [
      {
        id: 1,
        sender: "Dr. Michael Chen",
        content: "Good morning! I hope you're all prepared for the upcoming pharmacology exam.",
        timestamp: "8:00 AM",
        isOwn: false,
      },
      {
        id: 2,
        sender: "Dr. Michael Chen",
        content: "The pharmacology exam has been rescheduled to next Friday. Please check your calendar.",
        timestamp: "8:30 AM",
        isOwn: false,
      },
    ],
  },
  {
    id: 4,
    name: "Emma Rodriguez",
    type: "classmate",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for sharing your notes! They were really helpful for studying.",
    timestamp: "2 hours ago",
    unread: 0,
    online: false,
    messages: [
      {
        id: 1,
        sender: "Emma Rodriguez",
        content: "Hi! Could you share your notes from the pathology lecture?",
        timestamp: "Yesterday 3:00 PM",
        isOwn: false,
      },
      {
        id: 2,
        sender: "You",
        content: "Of course! I'll send them over right now.",
        timestamp: "Yesterday 3:05 PM",
        isOwn: true,
      },
      {
        id: 3,
        sender: "Emma Rodriguez",
        content: "Thanks for sharing your notes! They were really helpful for studying.",
        timestamp: "Yesterday 4:00 PM",
        isOwn: false,
      },
    ],
  },
  {
    id: 5,
    name: "Lab Group A",
    type: "group",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "You: I'll bring the microscope slides for tomorrow's session.",
    timestamp: "3 hours ago",
    unread: 0,
    online: false,
    messages: [
      {
        id: 1,
        sender: "Sarah Kim",
        content: "Who's bringing the equipment for tomorrow's lab session?",
        timestamp: "Yesterday 2:00 PM",
        isOwn: false,
      },
      {
        id: 2,
        sender: "You",
        content: "I'll bring the microscope slides for tomorrow's session.",
        timestamp: "Yesterday 2:30 PM",
        isOwn: true,
      },
    ],
  },
  {
    id: 6,
    name: "Academic Advisor",
    type: "admin",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage:
      "Your course registration for next semester is now open. Please schedule a meeting to discuss your options.",
    timestamp: "1 day ago",
    unread: 0,
    online: false,
    messages: [
      {
        id: 1,
        sender: "Academic Advisor",
        content: "Hello! I wanted to check in on your academic progress this semester.",
        timestamp: "2 days ago",
        isOwn: false,
      },
      {
        id: 2,
        sender: "Academic Advisor",
        content:
          "Your course registration for next semester is now open. Please schedule a meeting to discuss your options.",
        timestamp: "1 day ago",
        isOwn: false,
      },
    ],
  },
]

const typeIcons = {
  instructor: GraduationCap,
  classmate: UserCheck,
  group: Users,
  admin: Shield,
}

const typeBadges = {
  instructor: "bg-blue-100 text-blue-800 border-blue-200",
  classmate: "bg-green-100 text-green-800 border-green-200",
  group: "bg-purple-100 text-purple-800 border-purple-200",
  admin: "bg-red-100 text-red-800 border-red-200",
}

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("All")
  const [newMessage, setNewMessage] = useState("")

  const filteredConversations = conversations.filter((conversation) => {
    const matchesSearch =
      conversation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conversation.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "All" || conversation.type === selectedType

    return matchesSearch && matchesType
  })

  const conversationTypes = ["All", "Instructors", "Classmates", "Study Groups", "Administration"]
  const typeMapping = {
    All: "all",
    Instructors: "instructor",
    Classmates: "classmate",
    "Study Groups": "group",
    Administration: "admin",
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to the server
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6">
      {/* Conversations Sidebar */}
      <div className="w-1/3 flex flex-col">
        <Card className="flex-1 border-medical-200">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-medical-900 dark:text-medical-100">Messages</h2>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-medical-400 h-4 w-4" />
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-medical-200 focus:border-medical-500"
              />
            </div>

            {/* Filter */}
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="border-medical-200">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                {conversationTypes.map((type) => (
                  <SelectItem key={type} value={typeMapping[type as keyof typeof typeMapping] || type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-0">
            <div className="space-y-1">
              {filteredConversations.map((conversation) => {
                const IconComponent = typeIcons[conversation.type as keyof typeof typeIcons]
                const badgeClass = typeBadges[conversation.type as keyof typeof typeBadges]

                return (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={`p-4 cursor-pointer hover:bg-medical-50 dark:hover:bg-medical-900/20 transition-colors border-b border-medical-100 ${
                      selectedConversation.id === conversation.id ? "bg-medical-100 dark:bg-medical-900/30" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                          <AvatarFallback className="bg-medical-100 text-medical-700">
                            {conversation.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {conversation.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-medical-900 dark:text-medical-100 truncate">
                              {conversation.name}
                            </h3>
                            <IconComponent className="h-3 w-3 text-medical-500" />
                          </div>
                          <div className="flex items-center gap-2">
                            {conversation.unread > 0 && (
                              <Badge className="bg-medical-600 text-white text-xs px-1.5 py-0.5">
                                {conversation.unread}
                              </Badge>
                            )}
                            <span className="text-xs text-medical-500">{conversation.timestamp}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-1">
                          <p className="text-sm text-medical-600 dark:text-medical-400 truncate">
                            {conversation.lastMessage}
                          </p>
                        </div>

                        <Badge className={`${badgeClass} text-xs mt-2`} variant="outline">
                          {conversation.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <Card className="flex-1 border-medical-200 flex flex-col">
          {/* Chat Header */}
          <CardHeader className="border-b border-medical-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={selectedConversation.avatar || "/placeholder.svg"}
                      alt={selectedConversation.name}
                    />
                    <AvatarFallback className="bg-medical-100 text-medical-700">
                      {selectedConversation.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {selectedConversation.online && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-medical-900 dark:text-medical-100">{selectedConversation.name}</h3>
                  <p className="text-sm text-medical-600 dark:text-medical-400">
                    {selectedConversation.online ? "Online" : "Last seen 2 hours ago"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Star className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Archive className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {selectedConversation.messages.map((message) => (
              <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    message.isOwn
                      ? "bg-medical-600 text-white"
                      : "bg-medical-100 dark:bg-medical-900 text-medical-900 dark:text-medical-100"
                  }`}
                >
                  {!message.isOwn && (
                    <p className="text-xs font-medium mb-1 text-medical-600 dark:text-medical-400">{message.sender}</p>
                  )}
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${message.isOwn ? "text-medical-200" : "text-medical-500"}`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>

          {/* Message Input */}
          <div className="border-t border-medical-200 p-4">
            <div className="flex items-end gap-2">
              <Button variant="ghost" size="sm" className="mb-2">
                <Paperclip className="h-4 w-4" />
              </Button>
              <div className="flex-1">
                <Textarea
                  placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="min-h-[60px] border-medical-200 focus:border-medical-500 resize-none"
                />
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="mb-2 bg-medical-600 hover:bg-medical-700 text-white"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
