"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Check, Sparkles, Plus } from "lucide-react"

export function AIAssistant({ onComplete }: { onComplete?: (courseData: any) => void }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    language: "English",
    profession: "",
    targetAudience: "",
    description: "",
    generateImages: true,
  })

  const courseOutline = [
    {
      title: "Introduction to Basic Technology",
      pages: [
        "Definition of Basic Technology",
        "Overview of technology and its importance in modern society",
        "Distinction between basic technology and advanced technology",
        "Historical Context",
        "Evolution of technology from ancient to modern times",
        "Key milestones in technological advancements",
      ],
    },
    {
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
  ]

  return (
    <div className="max-w-5xl mx-auto">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-blue-600">
            <Sparkles className="w-5 h-5" />
            AI Assistant for Course Creation
          </CardTitle>
          <div className="text-right text-sm text-gray-500">
            <div className="font-medium">40 credits left</div>
            <div>Renewal: 07/18/2025</div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Step 1: Describe Course Idea */}
          <div className="flex items-start gap-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              {currentStep > 1 ? <Check className="w-4 h-4" /> : "1"}
            </div>
            <div className="flex-1 space-y-4">
              <h3 className="font-medium text-gray-900">Describe your mini-course idea.</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="language" className="text-sm text-gray-600">
                    Language
                  </Label>
                  <Select
                    value={formData.language}
                    onValueChange={(value) => setFormData({ ...formData, language: value })}
                  >
                    <SelectTrigger>
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
                The key to successful AI guidance is a precise description. Your description should be at least 5 words.
              </div>

              <div>
                <Textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="min-h-[120px]"
                />
              </div>

              {currentStep === 1 && (
                <Button
                  onClick={() => setCurrentStep(2)}
                  disabled={!formData.description.trim()}
                  className="bg-gray-300 text-gray-600"
                >
                  Generate Title
                </Button>
              )}
            </div>
          </div>

          {/* Step 2: Select Title */}
          {currentStep >= 2 && (
            <div className="flex items-start gap-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {currentStep > 2 ? <Check className="w-4 h-4" /> : "2"}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-4">Select the title.</h3>
                {currentStep === 2 && (
                  <Button onClick={() => setCurrentStep(3)} className="bg-blue-600 hover:bg-blue-700">
                    Generate Outline
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Course Outline */}
          {currentStep >= 3 && (
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm font-medium">
                3
              </div>
              <div className="flex-1 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">Conclude the outline.</h3>
                  <Button variant="outline" size="sm">
                    Generate Again
                  </Button>
                </div>

                <div className="space-y-4">
                  {courseOutline.map((section, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-blue-600">📖</span>
                        <span className="font-medium">{section.title}</span>
                      </div>
                      <div className="ml-6 space-y-2">
                        {section.pages.map((page, pageIndex) => (
                          <div key={pageIndex} className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="text-blue-600">📄</span>
                            <span>{page}</span>
                          </div>
                        ))}
                        <Button variant="link" size="sm" className="text-blue-600 p-0 h-auto">
                          <Plus className="w-4 h-4 mr-1" />
                          Add a Page
                        </Button>
                      </div>
                    </div>
                  ))}

                  <Button variant="link" className="text-blue-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Add a Section
                  </Button>

                  <div className="flex items-center space-x-2 p-4 bg-blue-50 rounded-lg">
                    <Switch
                      id="generate-images"
                      checked={formData.generateImages}
                      onCheckedChange={(checked) => setFormData({ ...formData, generateImages: checked })}
                    />
                    <Label htmlFor="generate-images" className="text-sm">
                      Add AI-generated images.
                    </Label>
                  </div>
                  <p className="text-xs text-gray-500">
                    (Only 2 images will be added. Upgrade to get images for all cards.)
                  </p>

                  <Button className="bg-blue-600 hover:bg-blue-700 w-full">Generate Mini-Course</Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
