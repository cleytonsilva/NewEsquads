"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Home, Menu, CheckCircle, Circle, ChevronRight } from "lucide-react"

interface Course {
  id: string
  title: string
  progress: number
  nextLesson: string
  thumbnail: string
}

interface CourseModule {
  id: number
  title: string
  type: string
  lessons: Lesson[]
}

interface Lesson {
  id: number
  title: string
  completed: boolean
  content: {
    title: string
    image?: string
    sections: ContentSection[]
  }
}

interface ContentSection {
  title: string
  content: string
  list?: {
    title: string
    description: string
  }[]
}

interface FullScreenCourseViewerProps {
  course: Course
  onClose: () => void
}

export function FullScreenCourseViewer({ course, onClose }: FullScreenCourseViewerProps) {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [courseStructure, setCourseStructure] = useState<CourseModule[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

  useEffect(() => {
    fetchCourseContent()
  }, [course.id])

  const fetchCourseContent = async () => {
    try {
      const token = localStorage.getItem('authToken')
      const response = await fetch(`${API_BASE_URL}/courses/${course.id}/content`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const courseData = await response.json()
        // Transform backend data to match frontend interface
        const transformedStructure = courseData.modules?.map((module: any) => ({
          id: module.id,
          title: module.title,
          type: 'section',
          lessons: module.lessons?.map((lesson: any) => ({
            id: lesson.id,
            title: lesson.title,
            completed: lesson.completed || false,
            content: {
              title: lesson.title,
              image: lesson.image_url,
              sections: lesson.content ? JSON.parse(lesson.content) : []
            }
          })) || []
        })) || []
        
        setCourseStructure(transformedStructure)
      } else {
        console.error('Failed to fetch course content')
        // Fallback to mock data if API fails
        setCourseStructure(mockCourseStructure)
      }
    } catch (error) {
      console.error('Error fetching course content:', error)
      // Fallback to mock data if API fails
      setCourseStructure(mockCourseStructure)
    } finally {
      setIsLoading(false)
    }
  }

  // Mock course structure for fallback
  const mockCourseStructure = [
    {
      id: 1,
      title: "Introduction to Basic Technology",
      type: "section",
      lessons: [
        {
          id: 1,
          title: "Definition of Basic Technology",
          completed: true,
          content: {
            title: "Definition Of Basic Technology",
            image:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/studentview-oAtN8COP1uB8o2PuaJpnXgCYvhojlO.png",
            sections: [
              {
                title: "Definition of Basic Technology",
                content:
                  "Basic technology refers to the fundamental concepts, tools, and processes that form the foundation of various technological applications. It encompasses a broad range of disciplines, including but not limited to information technology, engineering, and applied sciences. Basic technology is essential for understanding how different systems function and how they can be improved or innovated upon.",
              },
              {
                title: "Key Components of Basic Technology",
                content:
                  "Basic technology is composed of several key components that are integral to its understanding and application:",
                list: [
                  {
                    title: "Knowledge of Basic Principles:",
                    description:
                      "This includes understanding the scientific and mathematical principles that underlie technological systems.",
                  },
                  {
                    title: "Proficiency with Tools and Equipment:",
                    description:
                      "Familiarity with the tools and equipment used in various technological fields is crucial. This might include computers, software, machinery, and other devices.",
                  },
                  {
                    title: "Problem-Solving Skills:",
                    description:
                      "The ability to analyze problems and devise effective solutions is a core component of basic technology. This involves critical thinking and creativity.",
                  },
                  {
                    title: "Application of Technology:",
                    description:
                      "Understanding how to apply basic technology in real-world scenarios is essential for specialists. This includes being able to implement technological solutions in various fields such as healthcare, education, and industry.",
                  },
                ],
              },
              {
                title: "Importance of Basic Technology",
                content:
                  "The importance of basic technology cannot be overstated. It serves as the backbone for more advanced technological innovations and developments. By mastering the fundamentals, specialists can:",
                list: [
                  {
                    title: "",
                    description: "Enhance their skills and employability in a technology-driven job market.",
                  },
                  {
                    title: "",
                    description:
                      "Contribute to the development of new technologies that can improve efficiency and effectiveness in various sectors.",
                  },
                  {
                    title: "",
                    description:
                      "Facilitate collaboration across different technological domains by providing a common understanding.",
                  },
                ],
              },
              {
                title: "Applications of Basic Technology",
                content:
                  "Basic technology has a wide range of applications across numerous fields. Some examples include:",
                list: [
                  {
                    title: "Information Technology:",
                    description: "Understanding the basics of computer systems, software applications, and networking.",
                  },
                  {
                    title: "Engineering:",
                    description:
                      "Applying fundamental engineering principles to design and build structures and systems.",
                  },
                  {
                    title: "Healthcare:",
                    description: "Utilizing technology for medical devices, health informatics, and telemedicine.",
                  },
                  {
                    title: "Education:",
                    description: "Implementing educational technologies to enhance learning experiences.",
                  },
                ],
              },
            ],
          },
        },
        {
          id: 2,
          title: "Overview of technology and its importance in modern society",
          completed: false,
          content: {
            title: "Technology in Modern Society",
            sections: [],
          },
        },
        {
          id: 3,
          title: "Distinction between basic technology and advanced technology",
          completed: false,
          content: {
            title: "Basic vs Advanced Technology",
            sections: [],
          },
        },
      ],
    },
    {
      id: 2,
      title: "Historical Context",
      type: "section",
      lessons: [
        {
          id: 4,
          title: "Evolution of technology from ancient to modern times",
          completed: false,
          content: {
            title: "Evolution of Technology",
            sections: [],
          },
        },
        {
          id: 5,
          title: "Key milestones in technological advancements",
          completed: false,
          content: {
            title: "Technological Milestones",
            sections: [],
          },
        },
      ],
    },
    {
      id: 3,
      title: "Fundamental Concepts of Technology",
      type: "section",
      lessons: [
        {
          id: 6,
          title: "Components of Technology",
          completed: false,
          content: {
            title: "Technology Components",
            sections: [],
          },
        },
        {
          id: 7,
          title: "Hardware: Definition and examples",
          completed: false,
          content: {
            title: "Hardware Fundamentals",
            sections: [],
          },
        },
        {
          id: 8,
          title: "Software: Definition and types",
          completed: false,
          content: {
            title: "Software Fundamentals",
            sections: [],
          },
        },
      ],
    },
  ]

  // Flatten lessons for easy navigation
  const allLessons = courseStructure.flatMap((section) => section.lessons)
  const currentLesson = allLessons[currentLessonIndex]

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleKeyPress)
    return () => document.removeEventListener("keydown", handleKeyPress)
  }, [onClose])

  const handleContinue = () => {
    if (currentLessonIndex < allLessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1)
      // Mark current lesson as completed
      allLessons[currentLessonIndex].completed = true
    } else {
      // Course completed
      onClose()
    }
  }

  const handleLessonClick = (lessonIndex: number) => {
    setCurrentLessonIndex(lessonIndex)
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando conteúdo do curso...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-white z-50 flex">
      {/* Left Sidebar - Course Navigation */}
      <div
        className={`bg-gray-100 border-r border-gray-200 transition-all duration-300 ${sidebarCollapsed ? "w-16" : "w-80"} flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="sm" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
              <Menu className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <Home className="w-5 h-5" />
            </Button>
          </div>

          {!sidebarCollapsed && (
            <div>
              <h1 className="font-bold text-lg text-gray-900 leading-tight">{course.title}</h1>
              <div className="mt-3">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{Math.round((allLessons.filter((l) => l.completed).length / allLessons.length) * 100)}%</span>
                </div>
                <Progress
                  value={(allLessons.filter((l) => l.completed).length / allLessons.length) * 100}
                  className="h-2"
                />
              </div>
            </div>
          )}
        </div>

        {/* Course Structure */}
        {!sidebarCollapsed && (
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {courseStructure.map((section) => (
                <div key={section.id}>
                  <h3 className="font-semibold text-gray-900 mb-2">{section.title}</h3>
                  <div className="space-y-1 ml-2">
                    {section.lessons.map((lesson) => {
                      const lessonIndex = allLessons.findIndex((l) => l.id === lesson.id)
                      const isActive = lessonIndex === currentLessonIndex

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => handleLessonClick(lessonIndex)}
                          className={`w-full text-left p-2 rounded-lg transition-colors flex items-start gap-3 ${
                            isActive
                              ? "bg-blue-50 border border-blue-200 text-blue-900"
                              : "hover:bg-gray-50 text-gray-700"
                          }`}
                        >
                          <div className="flex-shrink-0 mt-0.5">
                            {lesson.completed ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <Circle className="w-4 h-4 text-gray-400" />
                            )}
                          </div>
                          <span className="text-sm leading-relaxed">{lesson.title}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Content Header */}
        <div className="border-b border-gray-200 p-6">
          <h1 className="text-3xl font-bold text-gray-900">{currentLesson?.content.title}</h1>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-8">
            {/* Featured Image */}
            {currentLesson?.content.image && (
              <div className="mb-8">
                <img
                  src={currentLesson.content.image || "/placeholder.svg"}
                  alt={currentLesson.content.title}
                  className="w-full h-64 object-cover rounded-lg shadow-sm"
                />
              </div>
            )}

            {/* Content Sections */}
            <div className="space-y-8">
              {currentLesson?.content.sections.map((section, index) => (
                <div key={index} className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
                  <p className="text-gray-700 leading-relaxed">{section.content}</p>

                  {section.list && (
                    <ul className="space-y-3 ml-4">
                      {section.list.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            {item.title && <span className="font-medium text-gray-900">{item.title}</span>}
                            <span className="text-gray-700">{item.description}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* Summary */}
            {currentLessonIndex === 0 && (
              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <p className="text-gray-700 leading-relaxed">
                  In summary, basic technology is a vital area of study that equips individuals with the necessary
                  skills and knowledge to navigate and contribute to an increasingly technological world. It lays the
                  groundwork for advanced studies and applications in various fields, making it an indispensable
                  component of modern education and professional development.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Continue Button */}
        <div className="border-t border-gray-200 p-6">
          <div className="max-w-4xl mx-auto">
            <Button
              onClick={handleContinue}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 text-lg"
              disabled={currentLessonIndex >= allLessons.length - 1}
            >
              {currentLessonIndex >= allLessons.length - 1 ? "COURSE COMPLETED" : "CONTINUE"}
              {currentLessonIndex < allLessons.length - 1 && <ChevronRight className="w-5 h-5 ml-2" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
