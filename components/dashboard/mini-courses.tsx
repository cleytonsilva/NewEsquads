"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, BookOpen, Edit, BarChart3, MoreHorizontal, Sparkles, Share2, Zap } from "lucide-react"
import { EnhancedAICourseCreator } from "../course-creation/enhanced-ai-course-creator"
import { CourseEditorEnhanced } from "@/components/course-editor/course-editor-enhanced"
import { AIInteractionBuilder } from "../course-creation/ai-interaction-builder"
import { OnPageAIAssistant } from "../course-editor/on-page-ai-assistant"
import { DeliveryOptions } from "../course-delivery/delivery-options"

export function MiniCourses() {
  const [searchQuery, setSearchQuery] = useState("")
  const [courses, setCourses] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAICreator, setShowAICreator] = useState(false)
  const [selectedCourseForEdit, setSelectedCourseForEdit] = useState<any>(null)
  const [showWYSIWYGEditor, setShowWYSIWYGEditor] = useState(false)
  const [showInteractionBuilder, setShowInteractionBuilder] = useState(false)
  const [showDeliveryOptions, setShowDeliveryOptions] = useState(false)
  const [showAIAssistant, setShowAIAssistant] = useState(false)
  const [selectedCourseForDelivery, setSelectedCourseForDelivery] = useState<any>(null)

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('authToken')
      const response = await fetch(`${API_BASE_URL}/courses`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const coursesData = await response.json()
        setCourses(coursesData)
      } else {
        console.error('Failed to fetch courses')
      }
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCourseCreated = (courseData: any) => {
    console.log("Course created:", courseData)
    // Refresh the courses list
    fetchCourses()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Mini courses</h1>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowAICreator(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create mini course
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select defaultValue="newest">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Created Date (Newest)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Created Date (Newest)</SelectItem>
            <SelectItem value="oldest">Created Date (Oldest)</SelectItem>
            <SelectItem value="name">Name (A-Z)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Course Grid or Empty State */}
      {isLoading ? (
        <div className="flex justify-center items-center py-16">
          <div className="text-gray-500">Carregando cursos...</div>
        </div>
      ) : courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative">
                <img
                  src={course.thumbnail_url || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent
                className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => {
                  setSelectedCourseForEdit(course)
                  setShowWYSIWYGEditor(true)
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    MINI COURSE
                  </Badge>
                  <Badge variant={course.is_published ? "default" : "outline"} className="text-xs">
                    {course.is_published ? "Publicado" : "Rascunho"}
                  </Badge>
                </div>
                <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{course.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{new Date(course.created_at).toLocaleDateString('pt-BR')}</span>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <BarChart3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedCourseForDelivery(course)
                        setShowDeliveryOptions(true)
                      }}
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowInteractionBuilder(true)
                      }}
                    >
                      <Zap className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-blue-600" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <Edit className="w-4 h-4 text-white" />
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600">
              There is no <span className="text-blue-600 font-medium">mini course</span> yet.
            </p>
            <p className="text-gray-500 text-sm max-w-md">
              Use o Assistente de IA para gerar Mini-Cursos com 95% de precisão, criar quizzes inteligentes e adicionar
              elementos interativos.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowAICreator(true)}>
              <Sparkles className="w-4 h-4 mr-2" />
              Criar seu primeiro mini-curso com IA
            </Button>
          </div>
        </div>
      )}

      {/* AI Course Creator Modal */}
      {showAICreator && (
        <EnhancedAICourseCreator onClose={() => setShowAICreator(false)} onCourseCreated={handleCourseCreated} />
      )}

      {/* WYSIWYG Course Editor Modal */}
      {showWYSIWYGEditor && selectedCourseForEdit && (
        <CourseEditorEnhanced
          course={selectedCourseForEdit}
          onClose={() => {
            setShowWYSIWYGEditor(false)
            setSelectedCourseForEdit(null)
          }}
          onSave={(updatedCourse) => {
            console.log("Course updated:", updatedCourse)
            setShowWYSIWYGEditor(false)
            setSelectedCourseForEdit(null)
          }}
        />
      )}

      {/* AI Interaction Builder Modal */}
      {showInteractionBuilder && (
        <AIInteractionBuilder
          onClose={() => setShowInteractionBuilder(false)}
          onInteractionCreated={(interaction) => {
            console.log("Interaction created:", interaction)
            setShowInteractionBuilder(false)
          }}
        />
      )}

      {/* Delivery Options Modal */}
      {showDeliveryOptions && selectedCourseForDelivery && (
        <DeliveryOptions
          courseId={selectedCourseForDelivery.id.toString()}
          courseTitle={selectedCourseForDelivery.title}
          onClose={() => {
            setShowDeliveryOptions(false)
            setSelectedCourseForDelivery(null)
          }}
        />
      )}

      {/* On-Page AI Assistant */}
      <OnPageAIAssistant
        isVisible={showAIAssistant}
        onTextUpdate={(newText) => {
          console.log("Text updated:", newText)
        }}
      />
    </div>
  )
}
