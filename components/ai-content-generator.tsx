"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, FileText, HelpCircle, Brain, Wand2, Copy, Download, RefreshCw, CheckCircle } from "lucide-react"

interface GeneratedContent {
  type: string
  title: string
  content: string
  metadata: {
    difficulty: string
    duration: string
    learningObjectives: string[]
  }
}

export function AIContentGenerator() {
  const [activeTab, setActiveTab] = useState("lesson")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null)

  // Form states
  const [topic, setTopic] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [duration, setDuration] = useState("")
  const [contentType, setContentType] = useState("")
  const [additionalContext, setAdditionalContext] = useState("")

  const generateContent = async () => {
    if (!topic || !difficulty || !contentType) return

    setIsGenerating(true)

    // Simulate AI content generation
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const mockContent: GeneratedContent = {
      type: contentType,
      title: `${topic} - ${contentType.charAt(0).toUpperCase() + contentType.slice(1)}`,
      content: generateMockContent(topic, contentType, difficulty),
      metadata: {
        difficulty,
        duration: duration || "30 minutes",
        learningObjectives: generateLearningObjectives(topic, difficulty),
      },
    }

    setGeneratedContent(mockContent)
    setIsGenerating(false)
  }

  const generateMockContent = (topic: string, type: string, difficulty: string): string => {
    const templates = {
      lesson: `# ${topic} - Comprehensive Overview

## Introduction
Welcome to this comprehensive lesson on ${topic}. This ${difficulty.toLowerCase()}-level content is designed to provide you with a thorough understanding of the key concepts and practical applications.

## Learning Objectives
By the end of this lesson, you will be able to:
- Understand the fundamental principles of ${topic}
- Apply theoretical knowledge to practical scenarios
- Analyze complex cases related to ${topic}
- Evaluate different approaches and methodologies

## Core Concepts

### Definition and Scope
${topic} encompasses a broad range of concepts that are essential for medical professionals. The field has evolved significantly over the past decades, incorporating new research findings and technological advances.

### Key Principles
1. **Foundational Understanding**: Building a solid base of knowledge
2. **Clinical Application**: Translating theory into practice
3. **Evidence-Based Approach**: Using current research to guide decisions
4. **Patient-Centered Care**: Focusing on individual patient needs

### Practical Applications
In clinical practice, ${topic} plays a crucial role in:
- Diagnosis and assessment
- Treatment planning
- Patient monitoring
- Quality improvement initiatives

## Case Studies
Let's examine real-world scenarios where ${topic} principles are applied...

## Assessment and Evaluation
To ensure mastery of this content, consider the following evaluation methods:
- Knowledge checks throughout the lesson
- Practical application exercises
- Case study analysis
- Peer discussion and collaboration

## Conclusion
This lesson has provided a comprehensive overview of ${topic}. Continue to build on this foundation through additional study and practical application.

## Additional Resources
- Recommended readings
- Professional guidelines
- Research articles
- Online resources and tools`,

      quiz: `# ${topic} Assessment Quiz

## Instructions
This quiz contains 10 questions designed to test your understanding of ${topic}. Each question is worth 10 points for a total of 100 points. You have 30 minutes to complete this assessment.

## Questions

### Question 1 (Multiple Choice)
Which of the following best describes the primary principle of ${topic}?

A) Option A - Basic understanding
B) Option B - Advanced application  
C) Option C - Comprehensive integration
D) Option D - Specialized focus

**Correct Answer: C**
**Explanation:** Comprehensive integration represents the highest level of understanding in ${topic}, combining theoretical knowledge with practical application.

### Question 2 (True/False)
${topic} requires extensive clinical experience to master effectively.

**Answer: True**
**Explanation:** While foundational knowledge can be learned through study, mastery of ${topic} requires hands-on clinical experience and practical application.

### Question 3 (Short Answer)
Explain the three key components of ${topic} and how they relate to patient care.

**Sample Answer:** The three key components are: 1) Theoretical foundation, 2) Clinical application, and 3) Patient outcomes. These components work together to ensure comprehensive care delivery.

### Question 4 (Case Study)
A 45-year-old patient presents with symptoms related to ${topic}. Describe your approach to assessment and management.

**Evaluation Criteria:**
- Systematic approach to assessment
- Evidence-based decision making
- Patient-centered care considerations
- Appropriate use of resources

## Answer Key and Scoring Guide
[Detailed answer key with explanations and scoring rubric]`,

      assignment: `# ${topic} - Practical Assignment

## Assignment Overview
This assignment is designed to help you apply your knowledge of ${topic} in a practical, real-world context. You will analyze case scenarios, develop solutions, and present your findings.

## Learning Outcomes
Upon completion of this assignment, you will demonstrate:
- Critical thinking skills related to ${topic}
- Ability to apply theoretical knowledge to practical situations
- Effective communication of complex concepts
- Evidence-based decision-making capabilities

## Assignment Tasks

### Task 1: Case Analysis (40 points)
Review the provided case study and conduct a comprehensive analysis focusing on ${topic} principles. Your analysis should include:

1. **Problem Identification** (10 points)
   - Clearly identify the key issues
   - Prioritize problems based on urgency and impact
   - Consider multiple perspectives

2. **Evidence Review** (15 points)
   - Research current literature related to the case
   - Identify best practices and guidelines
   - Evaluate quality of evidence

3. **Solution Development** (15 points)
   - Propose evidence-based solutions
   - Consider feasibility and resources
   - Address potential barriers

### Task 2: Implementation Plan (30 points)
Develop a detailed implementation plan for your proposed solution:

- Timeline and milestones
- Resource requirements
- Stakeholder involvement
- Risk assessment and mitigation
- Evaluation metrics

### Task 3: Reflection Paper (30 points)
Write a 1000-word reflection paper addressing:
- Key insights gained from this assignment
- Challenges encountered and how you addressed them
- How this experience will influence your future practice
- Areas for continued learning and development

## Submission Requirements
- All work must be original and properly cited
- Use APA format for references
- Submit via the course learning management system
- Due date: [Insert date]
- Late submissions will be penalized 10% per day

## Evaluation Rubric
[Detailed rubric with specific criteria and performance levels]

## Resources and Support
- Course textbooks and readings
- Library databases and research tools
- Faculty office hours
- Peer study groups
- Writing center support`,
    }

    return templates[type as keyof typeof templates] || templates.lesson
  }

  const generateLearningObjectives = (topic: string, difficulty: string): string[] => {
    const objectives = {
      beginner: [
        `Define key terms and concepts related to ${topic}`,
        `Identify basic principles and applications`,
        `Recognize common scenarios and examples`,
        `Understand fundamental relationships and processes`,
      ],
      intermediate: [
        `Analyze complex scenarios involving ${topic}`,
        `Apply theoretical knowledge to practical situations`,
        `Compare and contrast different approaches`,
        `Evaluate effectiveness of various strategies`,
      ],
      advanced: [
        `Synthesize advanced concepts in ${topic}`,
        `Design innovative solutions to complex problems`,
        `Lead implementation of best practices`,
        `Mentor others in ${topic} applications`,
      ],
    }

    return objectives[difficulty.toLowerCase() as keyof typeof objectives] || objectives.beginner
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      <Card className="border-purple-200">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="flex items-center space-x-2">
            <Wand2 className="w-6 h-6 text-purple-600" />
            <div>
              <CardTitle className="text-purple-900">AI Content Generator</CardTitle>
              <CardDescription className="text-purple-700">
                Generate high-quality educational content powered by advanced AI
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="lesson" className="flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Lesson Content</span>
              </TabsTrigger>
              <TabsTrigger value="quiz" className="flex items-center space-x-2">
                <HelpCircle className="w-4 h-4" />
                <span>Quiz & Assessment</span>
              </TabsTrigger>
              <TabsTrigger value="assignment" className="flex items-center space-x-2">
                <Brain className="w-4 h-4" />
                <span>Assignment</span>
              </TabsTrigger>
            </TabsList>

            <div className="mt-6 space-y-4">
              {/* Content Generation Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="topic">Topic/Subject</Label>
                  <Input
                    id="topic"
                    placeholder="e.g., Cardiovascular Physiology"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
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
                  <Label htmlFor="duration">Duration</Label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15 minutes">15 minutes</SelectItem>
                      <SelectItem value="30 minutes">30 minutes</SelectItem>
                      <SelectItem value="45 minutes">45 minutes</SelectItem>
                      <SelectItem value="60 minutes">60 minutes</SelectItem>
                      <SelectItem value="90 minutes">90 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content-type">Content Type</Label>
                  <Select value={contentType} onValueChange={setContentType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lesson">Lesson Content</SelectItem>
                      <SelectItem value="quiz">Quiz/Assessment</SelectItem>
                      <SelectItem value="assignment">Assignment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="context">Additional Context (Optional)</Label>
                <Textarea
                  id="context"
                  placeholder="Provide any specific requirements, learning objectives, or context for the content..."
                  value={additionalContext}
                  onChange={(e) => setAdditionalContext(e.target.value)}
                  rows={3}
                />
              </div>

              <Button
                onClick={generateContent}
                disabled={!topic || !difficulty || !contentType || isGenerating}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating Content...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate AI Content
                  </>
                )}
              </Button>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* Generated Content Display */}
      {generatedContent && (
        <Card className="border-green-200">
          <CardHeader className="bg-green-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <CardTitle className="text-green-900">Generated Content</CardTitle>
              </div>
              <div className="flex space-x-2">
                <Badge className="bg-green-600 text-white">{generatedContent.metadata.difficulty}</Badge>
                <Badge variant="outline">{generatedContent.metadata.duration}</Badge>
              </div>
            </div>
            <CardDescription className="text-green-700">
              AI-generated {generatedContent.type} content ready for use
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Learning Objectives */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Learning Objectives:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  {generatedContent.metadata.learningObjectives.map((objective, index) => (
                    <li key={index}>{objective}</li>
                  ))}
                </ul>
              </div>

              {/* Generated Content */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">Generated Content:</h3>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(generatedContent.content)}>
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      Export
                    </Button>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">{generatedContent.content}</pre>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-4 border-t">
                <Button className="bg-purple-600 hover:bg-purple-700">Use This Content</Button>
                <Button variant="outline" onClick={generateContent}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Regenerate
                </Button>
                <Button variant="outline">Edit Content</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
