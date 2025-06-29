"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Play, Share, Type, ImageIcon, Video, CheckCircle, Circle, Sparkles, Edit, Copy } from "lucide-react"

export function CourseEditor() {
  const [selectedCard, setSelectedCard] = useState(0)
  const [showActionsPanel, setShowActionsPanel] = useState(false)
  const [showVideoPanel, setShowVideoPanel] = useState(false)
  const [pageTitle, setPageTitle] = useState("Definition Of Basic Technology")

  const courseStructure = [
    { id: 1, title: "Introduction to Basic Technology", type: "content" },
    { id: 2, title: "Definition of Basic Technology", type: "content" },
    { id: 3, title: "Overview of technology and its importance in modern society", type: "content" },
    { id: 4, title: "Distinction between basic technology and advanced technology", type: "content" },
    { id: 5, title: "Historical Context", type: "content" },
    { id: 6, title: "Evolution of technology from ancient to modern times", type: "content" },
    { id: 7, title: "Key milestones in technological advancements", type: "content" },
  ]

  const cardTypes = [
    { icon: Type, label: "Heading and Text", description: "Simple text content" },
    { icon: ImageIcon, label: "Image", description: "Add images to your course" },
    { icon: Video, label: "Video", description: "Embed videos" },
    { icon: CheckCircle, label: "Single Choice", description: "Multiple choice question" },
    { icon: Circle, label: "Multiple Choice", description: "Select multiple answers" },
    { icon: Edit, label: "Open Question", description: "Free text response" },
  ]

  const aiActions = [
    "Improve writing",
    "Fix spelling and grammar",
    "Make shorter",
    "Make longer",
    "Change tone",
    "Translate",
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">Introduction to Basic Technology: Concepts and Applications</h1>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Saved
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Play className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
              Publish
            </Button>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="flex items-center gap-8 mt-4">
          <button className="text-blue-600 border-b-2 border-blue-600 pb-2 font-medium">Mini course</button>
          <button className="text-gray-500 pb-2">Completion</button>
          <button className="text-gray-500 pb-2">Landing page</button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-120px)]">
        {/* Left Sidebar - Course Structure */}
        <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
            <h3 className="font-medium text-gray-900 mb-4">Table of content</h3>
            <div className="space-y-2">
              {courseStructure.map((item, index) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedCard === index ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedCard(index)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center text-xs font-medium text-blue-600">
                      {index + 1}
                    </div>
                    <span className="text-sm text-gray-700 flex-1">{item.title}</span>
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full justify-start text-blue-600 mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Add Page
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <Input
                      value={pageTitle}
                      onChange={(e) => setPageTitle(e.target.value)}
                      className="text-2xl font-bold border-none p-0 focus-visible:ring-0"
                    />
                  </div>

                  <div className="relative">
                    <img
                      src="/placeholder.svg?height=300&width=600"
                      alt="Technology classroom"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <div className="absolute top-4 right-4">
                      <Button size="sm" variant="secondary">
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Change Image
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3">Definition of Basic Technology</h3>
                    <Textarea
                      placeholder="Add your content here..."
                      className="min-h-[200px] resize-none"
                      defaultValue="Basic technology refers to the fundamental concepts, tools, and processes that form the foundation of various technological applications. It encompasses a broad range of disciplines, including but not limited to information technology, engineering, and applied sciences. Basic technology is essential for understanding how different systems function and how they can be improved or innovated upon."
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3">Key Components of Basic Technology</h3>
                    <Textarea
                      placeholder="Add your content here..."
                      className="min-h-[150px] resize-none"
                      defaultValue="Basic technology is composed of several key components that are integral to its understanding and application:"
                    />
                  </div>

                  <Button variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Page
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Sidebar - Actions Panel */}
        <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
          <div className="p-4">
            {showVideoPanel ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">Add Video Block</h3>
                  <Button variant="ghost" size="sm" onClick={() => setShowVideoPanel(false)}>
                    ×
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                        <Video className="w-8 h-8 text-gray-400" />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Heading</label>
                      <Input placeholder="Enter heading" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Heading and Text</label>
                      <Textarea placeholder="Enter description" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Text</label>
                      <div className="grid grid-cols-3 gap-2 mt-1">
                        <div className="aspect-square bg-gray-100 rounded"></div>
                        <div className="aspect-square bg-gray-100 rounded"></div>
                        <div className="aspect-square bg-gray-100 rounded"></div>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Add Video Block</Button>
                </div>
              </div>
            ) : showActionsPanel ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">Add Actions Block</h3>
                  <Button variant="ghost" size="sm" onClick={() => setShowActionsPanel(false)}>
                    ×
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="aspect-video bg-gray-100 rounded-lg"></div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Video
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Image
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Type className="w-4 h-4 mr-2" />
                      Text
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Actions
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Copy className="w-4 h-4 mr-2" />
                      Embed
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">Add card</h3>
                  <div className="space-y-2">
                    {cardTypes.map((type, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className="w-full justify-start h-auto p-3"
                        onClick={() => {
                          if (type.label === "Video") {
                            setShowVideoPanel(true)
                          }
                        }}
                      >
                        <type.icon className="w-5 h-5 mr-3 text-gray-400" />
                        <div className="text-left">
                          <div className="font-medium text-sm">{type.label}</div>
                          <div className="text-xs text-gray-500">{type.description}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-4">AI Actions</h3>
                  <div className="space-y-2">
                    {aiActions.map((action, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => {
                          if (action === "Improve writing") {
                            setShowActionsPanel(true)
                          }
                        }}
                      >
                        <Sparkles className="w-4 h-4 mr-2 text-blue-600" />
                        {action}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
