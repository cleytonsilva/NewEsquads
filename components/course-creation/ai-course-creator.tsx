"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, Sparkles, Edit, Plus, BookOpen, FileText, Upload, Check, RefreshCw, Wand2 } from "lucide-react"

interface AICourseCreatorProps {
  onClose: () => void
  onCourseCreated?: (courseData: any) => void
}

export function AICourseCreator({ onClose, onCourseCreated }: AICourseCreatorProps) {
  const [currentStep, setCurrentStep] = useState(0) // 0: method selection, 1: describe, 2: title, 3: outline
  const [selectedMethod, setSelectedMethod] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(false)

  const [formData, setFormData] = useState({
    language: "English",
    profession: "",
    targetAudience: "",
    description: "",
    selectedTitle: "",
    customTitle: "",
    generateImages: true,
  })

  const [generatedTitles, setGeneratedTitles] = useState([
    "Introduction to Basic Technology: Concepts and Applications",
    "Understanding Digital Tools: A Beginner's Guide to Technology",
    "Navigating the Tech Landscape: Essential Skills for Everyday Use",
    "Foundations of Technology: Building Blocks for Future Learning",
    "Everyday Technology: Practical Insights for the Modern User",
  ])

  const [courseOutline, setCourseOutline] = useState([
    {
      id: 1,
      title: "Introduction to Basic Technology",
      pages: [
        "Definition of Basic Technology",
        "Overview of technology and its importance in modern society",
        "Distinction between basic technology and advanced technology",
      ],
    },
    {
      id: 2,
      title: "Historical Context",
      pages: ["Evolution of technology from ancient to modern times", "Key milestones in technological advancements"],
    },
    {
      id: 3,
      title: "Fundamental Concepts of Technology",
      pages: [
        "Components of Technology",
        "Hardware: Definition and examples",
        "Software: Definition and types",
        "Technology in Daily Life",
        "Communication technologies: Examples and impact",
        "Transportation technologies: Overview and significance",
      ],
    },
    {
      id: 4,
      title: "Applications of Basic Technology",
      pages: [
        "Technology in Education",
        "E-learning tools and platforms",
        "The role of technology in enhancing learning experiences",
        "Technology in Healthcare",
        "Basic medical technologies and their applications",
        "Impact of technology on patient care and health outcomes",
        "Technology in Business",
        "Tools for productivity and efficiency",
        "The role of technology in marketing and customer engagement",
      ],
    },
  ])

  const creationMethods = [
    {
      id: "scratch",
      title: "Create from scratch",
      description: "Start with a blank canvas and build your course manually",
      icon: Edit,
    },
    {
      id: "ai-guide",
      title: "Guide AI with my descriptions",
      description: "Let AI help you create a course based on your ideas",
      icon: Sparkles,
    },
    {
      id: "ai-resource",
      title: "Make AI use my resource",
      description: "Upload content and let AI structure it into a course",
      icon: Upload,
    },
  ]

  const handleMethodSelect = (method: string) => {
    setSelectedMethod(method)
    if (method === "ai-guide") {
      setCurrentStep(1)
    } else {
      // Handle other methods
      console.log("Selected method:", method)
    }
  }

  const handleGenerateTitles = async () => {
    setIsGenerating(true)
    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsGenerating(false)
    setCurrentStep(2)
  }

  const handleTitleSelect = (title: string) => {
    setFormData({ ...formData, selectedTitle: title })
  }

  const handleGenerateOutline = async () => {
    setIsGenerating(true)
    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsGenerating(false)
    setCurrentStep(3)
  }

  const handleGenerateCourse = async () => {
    setIsGenerating(true)
    // Simulate course generation
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const courseData = {
      title: formData.selectedTitle || formData.customTitle,
      description: formData.description,
      outline: courseOutline,
      language: formData.language,
      generateImages: formData.generateImages,
    }

    setIsGenerating(false)
    onCourseCreated?.(courseData)
    onClose()
  }

  const addPage = (sectionId: number) => {
    setCourseOutline((prev) =>
      prev.map((section) =>
        section.id === sectionId ? { ...section, pages: [...section.pages, "New Page"] } : section,
      ),
    )
  }

  const addSection = () => {
    setCourseOutline((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        title: "New Section",
        pages: ["New Page"],
      },
    ])
  }

  const renderStepIndicator = () => (
    <div className="flex items-center gap-4 mb-8">
      <div className="flex items-center gap-2 text-blue-600">
        <Sparkles className="w-5 h-5" />
        <span className="font-medium">AI Assistant for Course Creation</span>
      </div>
      <div className="flex items-center gap-4 ml-auto">
        {currentStep >= 1 && (
          <div className="flex items-center gap-2">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                currentStep > 1 ? "bg-blue-600 text-white" : "bg-blue-600 text-white"
              }`}
            >
              {currentStep > 1 ? <Check className="w-4 h-4" /> : "1"}
            </div>
            <span className="text-sm">Describe your mini-course idea.</span>
          </div>
        )}
        {currentStep >= 2 && (
          <div className="flex items-center gap-2">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                currentStep > 2 ? "bg-blue-600 text-white" : "bg-blue-600 text-white"
              }`}
            >
              {currentStep > 2 ? <Check className="w-4 h-4" /> : "2"}
            </div>
            <span className="text-sm">Select the title.</span>
          </div>
        )}
        {currentStep >= 3 && (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">
              3
            </div>
            <span className="text-sm">Conclude the outline.</span>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onClose}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-xl font-semibold">Create Course</h1>
            <div></div>
          </div>
        </div>

        <div className="p-8">
          {currentStep === 0 && (
            <div className="text-center space-y-8">
              <h2 className="text-2xl font-semibold text-gray-900">How do you want to proceed?</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {creationMethods.map((method) => (
                  <Card
                    key={method.id}
                    className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-200"
                    onClick={() => handleMethodSelect(method.id)}
                  >
                    <CardContent className="p-8 text-center space-y-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                        <method.icon className="w-8 h-8 text-gray-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900">{method.title}</h3>
                      <p className="text-sm text-gray-600">{method.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {currentStep >= 1 && (
            <div className="space-y-8">
              {renderStepIndicator()}

              {currentStep === 1 && (
                <Card>
                  <CardContent className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Language</Label>
                        <Select
                          value={formData.language}
                          onValueChange={(value) => setFormData({ ...formData, language: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="English">English</SelectItem>
                            <SelectItem value="Portuguese">Portuguese</SelectItem>
                            <SelectItem value="Spanish">Spanish</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Input
                        placeholder="Tell us your profession"
                        value={formData.profession}
                        onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                      />
                    </div>

                    <div>
                      <Input
                        placeholder="What is your target audience?"
                        value={formData.targetAudience}
                        onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                      />
                    </div>

                    <div className="text-sm text-gray-600">
                      The key to successful AI guidance is a precise description. Your description should be at least 5
                      words.
                    </div>

                    <div>
                      <Textarea
                        placeholder="Description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="min-h-[120px]"
                      />
                    </div>

                    <Button
                      onClick={handleGenerateTitles}
                      disabled={!formData.description.trim() || isGenerating}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Generating Titles...
                        </>
                      ) : (
                        "Generate Title"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              )}

              {currentStep === 2 && (
                <Card>
                  <CardContent className="p-8 space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Select the title</h3>
                      <Button variant="outline" size="sm">
                        Generate Again
                      </Button>
                    </div>

                    <RadioGroup value={formData.selectedTitle} onValueChange={handleTitleSelect}>
                      <div className="space-y-3">
                        {generatedTitles.map((title, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50"
                          >
                            <RadioGroupItem value={title} id={`title-${index}`} />
                            <Label htmlFor={`title-${index}`} className="flex-1 cursor-pointer">
                              {title}
                            </Label>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>

                    <Button variant="link" className="text-blue-600 p-0">
                      Write your own title instead
                    </Button>

                    <Button
                      onClick={handleGenerateOutline}
                      disabled={!formData.selectedTitle || isGenerating}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Generating Outline...
                        </>
                      ) : (
                        "Generate Outline"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              )}

              {currentStep === 3 && (
                <Card>
                  <CardContent className="p-8 space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Conclude the outline</h3>
                      <Button variant="outline" size="sm">
                        Generate Again
                      </Button>
                    </div>

                    <div className="space-y-6">
                      {courseOutline.map((section) => (
                        <div key={section.id} className="border rounded-lg p-6 space-y-4">
                          <div className="flex items-center gap-3">
                            <BookOpen className="w-5 h-5 text-blue-600" />
                            <h4 className="font-semibold text-gray-900">{section.title}</h4>
                          </div>

                          <div className="ml-8 space-y-2">
                            {section.pages.map((page, pageIndex) => (
                              <div key={pageIndex} className="flex items-center gap-3 text-sm text-gray-700">
                                <FileText className="w-4 h-4 text-blue-600" />
                                <span>{page}</span>
                              </div>
                            ))}
                            <Button
                              variant="link"
                              size="sm"
                              className="text-blue-600 p-0 h-auto"
                              onClick={() => addPage(section.id)}
                            >
                              <Plus className="w-4 h-4 mr-1" />
                              Add a Page
                            </Button>
                          </div>
                        </div>
                      ))}

                      <Button variant="link" className="text-blue-600" onClick={addSection}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add a Section
                      </Button>

                      <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                        <Switch
                          id="generate-images"
                          checked={formData.generateImages}
                          onCheckedChange={(checked) => setFormData({ ...formData, generateImages: checked })}
                        />
                        <Label htmlFor="generate-images" className="text-sm font-medium">
                          Add AI-generated images.
                        </Label>
                      </div>
                      <p className="text-xs text-gray-500">
                        (Only 2 images will be added. Upgrade to get images for all cards.)
                      </p>

                      <Button
                        onClick={handleGenerateCourse}
                        disabled={isGenerating}
                        className="w-full bg-blue-600 hover:bg-blue-700 py-3"
                      >
                        {isGenerating ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Generating Mini-Course...
                          </>
                        ) : (
                          <>
                            <Wand2 className="w-4 h-4 mr-2" />
                            Generate Mini-Course
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
