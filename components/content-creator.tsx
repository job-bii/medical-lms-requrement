"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Upload, Video, Brain, HelpCircle, Plus, X, Save, CheckCircle, Trash2, Edit, Headphones } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ContentCreatorProps {
  type: "video" | "document" | "flashcard" | "quiz" | "assessment"
  onClose: () => void
}

export function ContentCreator({ type, onClose }: ContentCreatorProps) {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [transcriptionStatus, setTranscriptionStatus] = useState<"idle" | "processing" | "complete">("idle")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFiles = (files: FileList) => {
    const fileArray = Array.from(files)
    setSelectedFiles((prev) => [...prev, ...fileArray])

    // Simulate upload
    setIsUploading(true)
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          if (type === "video") {
            setTranscriptionStatus("processing")
            setTimeout(() => setTranscriptionStatus("complete"), 3000)
          }
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const renderVideoCreator = () => (
    <div className="space-y-6">
      {/* Video Upload */}
      <Card className="border-medical-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Video className="w-5 h-5 text-blue-600" />
            <span>Video Upload</span>
          </CardTitle>
          <CardDescription>Upload video lectures with automatic transcription and captioning</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive ? "border-medical-500 bg-medical-50" : "border-medical-300"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Video className="w-12 h-12 text-medical-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-medical-900 mb-2">Drop your video files here</p>
            <p className="text-medical-600 mb-4">or click to browse</p>
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="bg-medical-600 hover:bg-medical-700 text-white"
            >
              <Upload className="w-4 h-4 mr-2" />
              Choose Files
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="video/*"
              className="hidden"
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
            />
            <p className="text-xs text-medical-500 mt-2">Supported formats: MP4, MOV, AVI, WMV (Max 2GB per file)</p>
          </div>

          {isUploading && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-medical-700">Uploading...</span>
                <span className="text-sm text-medical-600">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}

          {selectedFiles.length > 0 && (
            <div className="mt-4 space-y-2">
              <h4 className="font-medium text-medical-900">Selected Files:</h4>
              {selectedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-medical-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Video className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-medical-900">{file.name}</p>
                      <p className="text-sm text-medical-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedFiles((files) => files.filter((_, i) => i !== index))}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Video Settings */}
      <Card className="border-medical-200">
        <CardHeader>
          <CardTitle>Video Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="video-title">Video Title</Label>
              <Input id="video-title" placeholder="e.g., Introduction to Pharmacokinetics" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="video-duration">Duration (minutes)</Label>
              <Input id="video-duration" type="number" placeholder="45" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="video-description">Description</Label>
            <Textarea
              id="video-description"
              placeholder="Provide a detailed description of the video content..."
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="video-module">Module</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select module" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="module-1">Module 1: Fundamentals</SelectItem>
                  <SelectItem value="module-2">Module 2: Advanced Topics</SelectItem>
                  <SelectItem value="module-3">Module 3: Clinical Applications</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="video-week">Week</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select week" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week-1">Week 1</SelectItem>
                  <SelectItem value="week-2">Week 2</SelectItem>
                  <SelectItem value="week-3">Week 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch id="auto-transcription" defaultChecked />
              <Label htmlFor="auto-transcription">Auto-transcription</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="auto-captions" defaultChecked />
              <Label htmlFor="auto-captions">Auto-captions</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="progress-tracking" defaultChecked />
              <Label htmlFor="progress-tracking">Progress tracking</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transcription Status */}
      {transcriptionStatus !== "idle" && (
        <Card className="border-medical-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Headphones className="w-5 h-5 text-purple-600" />
              <span>Transcription Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {transcriptionStatus === "processing" && (
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-medical-600"></div>
                <span className="text-medical-700">Processing audio transcription...</span>
              </div>
            )}
            {transcriptionStatus === "complete" && (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-green-600">
                  <CheckCircle className="w-6 h-6" />
                  <span className="font-medium">Transcription completed successfully!</span>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-900 mb-2">Generated Transcript Preview:</h4>
                  <p className="text-sm text-green-800">
                    "Welcome to today's lecture on pharmacokinetics. In this session, we'll explore how drugs are
                    absorbed, distributed, metabolized, and eliminated by the body..."
                  </p>
                  <Button variant="outline" size="sm" className="mt-2 border-green-300 text-green-700 bg-transparent">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Transcript
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )

  const renderFlashcardCreator = () => (
    <div className="space-y-6">
      <Card className="border-medical-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-purple-600" />
            <span>Flashcard Set Creator</span>
          </CardTitle>
          <CardDescription>Create interactive flashcard sets for memorization and review</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="flashcard-title">Set Title</Label>
              <Input id="flashcard-title" placeholder="e.g., Drug Classifications" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="flashcard-category">Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="terminology">Medical Terminology</SelectItem>
                  <SelectItem value="drugs">Drug Information</SelectItem>
                  <SelectItem value="anatomy">Anatomy & Physiology</SelectItem>
                  <SelectItem value="procedures">Clinical Procedures</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="flashcard-description">Description</Label>
            <Textarea id="flashcard-description" placeholder="Brief description of the flashcard set..." rows={2} />
          </div>
        </CardContent>
      </Card>

      {/* Flashcard Builder */}
      <Card className="border-medical-200">
        <CardHeader>
          <CardTitle>Flashcard Builder</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[1, 2, 3].map((cardNum) => (
              <div key={cardNum} className="p-4 border border-medical-200 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-medical-900">Card {cardNum}</h4>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Front (Question/Term)</Label>
                    <Textarea placeholder="Enter the question or term..." rows={3} />
                  </div>
                  <div className="space-y-2">
                    <Label>Back (Answer/Definition)</Label>
                    <Textarea placeholder="Enter the answer or definition..." rows={3} />
                  </div>
                </div>
                <div className="mt-4 flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch id={`image-${cardNum}`} />
                    <Label htmlFor={`image-${cardNum}`}>Add image</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id={`audio-${cardNum}`} />
                    <Label htmlFor={`audio-${cardNum}`}>Add audio</Label>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full border-medical-300 text-medical-700 bg-transparent">
              <Plus className="w-4 h-4 mr-2" />
              Add Another Card
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Flashcard Settings */}
      <Card className="border-medical-200">
        <CardHeader>
          <CardTitle>Learning Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch id="spaced-repetition" defaultChecked />
              <Label htmlFor="spaced-repetition">Spaced repetition algorithm</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="shuffle-mode" />
              <Label htmlFor="shuffle-mode">Shuffle cards by default</Label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty Level</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time-limit">Time Limit (seconds)</Label>
              <Input id="time-limit" type="number" placeholder="30" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderQuizCreator = () => (
    <div className="space-y-6">
      <Card className="border-medical-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <HelpCircle className="w-5 h-5 text-orange-600" />
            <span>Practice Quiz Creator</span>
          </CardTitle>
          <CardDescription>Build question banks with detailed explanations and analytics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quiz-title">Quiz Title</Label>
              <Input id="quiz-title" placeholder="e.g., Pharmacology Practice Quiz" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quiz-type">Quiz Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="practice">Practice Quiz</SelectItem>
                  <SelectItem value="self-assessment">Self Assessment</SelectItem>
                  <SelectItem value="review">Review Questions</SelectItem>
                  <SelectItem value="exam-prep">Exam Preparation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="quiz-instructions">Instructions</Label>
            <Textarea
              id="quiz-instructions"
              placeholder="Provide instructions for students taking this quiz..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Question Builder */}
      <Card className="border-medical-200">
        <CardHeader>
          <CardTitle>Question Builder</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[1, 2].map((questionNum) => (
              <div key={questionNum} className="p-4 border border-medical-200 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-medical-900">Question {questionNum}</h4>
                  <div className="flex items-center space-x-2">
                    <Select defaultValue="multiple-choice">
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                        <SelectItem value="true-false">True/False</SelectItem>
                        <SelectItem value="short-answer">Short Answer</SelectItem>
                        <SelectItem value="essay">Essay</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Question Text</Label>
                    <Textarea placeholder="Enter your question here..." rows={3} />
                  </div>

                  {/* Multiple Choice Options */}
                  <div className="space-y-3">
                    <Label>Answer Options</Label>
                    {["A", "B", "C", "D"].map((option) => (
                      <div key={option} className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-medical-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-medical-700">{option}</span>
                        </div>
                        <Input placeholder={`Option ${option}`} className="flex-1" />
                        <div className="flex items-center space-x-2">
                          <input type="radio" name={`correct-${questionNum}`} />
                          <Label className="text-sm">Correct</Label>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <Label>Explanation</Label>
                    <Textarea placeholder="Provide a detailed explanation for the correct answer..." rows={3} />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`points-${questionNum}`}>Points</Label>
                      <Input id={`points-${questionNum}`} type="number" placeholder="1" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`difficulty-${questionNum}`}>Difficulty</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`category-${questionNum}`}>Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="knowledge">Knowledge</SelectItem>
                          <SelectItem value="comprehension">Comprehension</SelectItem>
                          <SelectItem value="application">Application</SelectItem>
                          <SelectItem value="analysis">Analysis</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full border-medical-300 text-medical-700 bg-transparent">
              <Plus className="w-4 h-4 mr-2" />
              Add Another Question
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quiz Settings */}
      <Card className="border-medical-200">
        <CardHeader>
          <CardTitle>Quiz Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Switch id="randomize-questions" />
              <Label htmlFor="randomize-questions">Randomize question order</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="randomize-options" />
              <Label htmlFor="randomize-options">Randomize answer options</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="show-feedback" defaultChecked />
              <Label htmlFor="show-feedback">Show immediate feedback</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="allow-retakes" defaultChecked />
              <Label htmlFor="allow-retakes">Allow multiple attempts</Label>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="time-limit-quiz">Time Limit (minutes)</Label>
              <Input id="time-limit-quiz" type="number" placeholder="30" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-attempts">Max Attempts</Label>
              <Input id="max-attempts" type="number" placeholder="3" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="passing-score">Passing Score (%)</Label>
              <Input id="passing-score" type="number" placeholder="70" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const getContentTitle = () => {
    switch (type) {
      case "video":
        return "Video Lecture Creator"
      case "document":
        return "Document Upload"
      case "flashcard":
        return "Flashcard Creator"
      case "quiz":
        return "Practice Quiz Creator"
      case "assessment":
        return "Assessment Builder"
      default:
        return "Content Creator"
    }
  }

  const renderContent = () => {
    switch (type) {
      case "video":
        return renderVideoCreator()
      case "flashcard":
        return renderFlashcardCreator()
      case "quiz":
        return renderQuizCreator()
      default:
        return <div>Content creator for {type} coming soon...</div>
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{getContentTitle()}</DialogTitle>
          <DialogDescription>
            Create engaging content for your medical courses with advanced features and analytics.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {renderContent()}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-medical-200">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="outline" className="border-medical-300 text-medical-700 bg-transparent">
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            <Button className="bg-medical-600 hover:bg-medical-700 text-white">
              <CheckCircle className="w-4 h-4 mr-2" />
              Publish Content
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
