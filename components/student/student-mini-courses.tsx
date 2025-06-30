"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Play, Clock, Users, Star, CheckCircle, PlayCircle, Grid3X3, List, Bookmark } from "lucide-react"

interface Course {
  id: string
  title: string
  description: string
  thumbnail: string
  instructor: string
  duration: string
  studentsCount: number
  rating: number
  level: "Beginner" | "Intermediate" | "Advanced"
  category: string
  progress?: number
  status: "not-started" | "in-progress" | "completed"
  isBookmarked: boolean
  tags: string[]
  lastAccessed?: string
}

export function StudentMiniCourses() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

  useEffect(() => {
    fetchEnrolledCourses()
  }, [])

  const fetchEnrolledCourses = async () => {
    try {
      const token = localStorage.getItem('authToken')
      const response = await fetch(`${API_BASE_URL}/courses/enrolled`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const coursesData = await response.json()
        // Transform backend data to match frontend interface
        const transformedCourses = coursesData.map((course: any) => ({
          id: course.id,
          title: course.title,
          description: course.description,
          thumbnail: course.thumbnail_url || '/placeholder.svg',
          instructor: course.created_by_name || 'Instrutor',
          duration: `${Math.floor(course.estimated_duration / 60)}h ${course.estimated_duration % 60}m`,
          studentsCount: course.students_count || 0,
          rating: course.rating || 4.5,
          level: course.difficulty_level === 'beginner' ? 'Beginner' : 
                 course.difficulty_level === 'intermediate' ? 'Intermediate' : 'Advanced',
          category: course.category,
          progress: course.progress || 0,
          status: course.progress === 0 ? 'not-started' : 
                  course.progress === 100 ? 'completed' : 'in-progress',
          isBookmarked: course.is_bookmarked || false,
          tags: course.tags || [],
          lastAccessed: course.last_accessed || 'Nunca acessado'
        }))
        setCourses(transformedCourses)
      } else {
        console.error('Failed to fetch enrolled courses')
      }
    } catch (error) {
      console.error('Error fetching enrolled courses:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Mock courses data for fallback (remove this when backend is fully integrated)
  const mockCourses: Course[] = [
    {
      id: "1",
      title: "Introduction to Basic Technology: Concepts and Applications",
      description: "Learn the fundamental concepts of technology and how they apply to modern business environments.",
      thumbnail: "/placeholder.svg?height=200&width=300",
      instructor: "Dr. Sarah Johnson",
      duration: "2h 30m",
      studentsCount: 1247,
      rating: 4.8,
      level: "Beginner",
      category: "Technology",
      progress: 65,
      status: "in-progress",
      isBookmarked: true,
      tags: ["Technology", "Fundamentals", "Business"],
      lastAccessed: "2 days ago",
    },
    {
      id: "2",
      title: "Digital Marketing Fundamentals",
      description:
        "Master the basics of digital marketing including SEO, social media, and content marketing strategies.",
      thumbnail: "/placeholder.svg?height=200&width=300",
      instructor: "Mark Thompson",
      duration: "3h 15m",
      studentsCount: 892,
      rating: 4.6,
      level: "Beginner",
      category: "Marketing",
      progress: 0,
      status: "not-started",
      isBookmarked: false,
      tags: ["Marketing", "SEO", "Social Media"],
    },
    {
      id: "3",
      title: "Advanced Data Analysis with Python",
      description: "Deep dive into data analysis techniques using Python, pandas, and visualization libraries.",
      thumbnail: "/placeholder.svg?height=200&width=300",
      instructor: "Prof. Emily Chen",
      duration: "4h 45m",
      studentsCount: 634,
      rating: 4.9,
      level: "Advanced",
      category: "Data Science",
      progress: 100,
      status: "completed",
      isBookmarked: true,
      tags: ["Python", "Data Analysis", "Programming"],
    },
    {
      id: "4",
      title: "Project Management Essentials",
      description: "Learn essential project management skills and methodologies for successful project delivery.",
      thumbnail: "/placeholder.svg?height=200&width=300",
      instructor: "James Wilson",
      duration: "2h 45m",
      studentsCount: 1156,
      rating: 4.7,
      level: "Intermediate",
      category: "Business",
      progress: 25,
      status: "in-progress",
      isBookmarked: false,
      tags: ["Project Management", "Leadership", "Business"],
    },
    {
      id: "5",
      title: "UI/UX Design Principles",
      description: "Understand the core principles of user interface and user experience design.",
      thumbnail: "/placeholder.svg?height=200&width=300",
      instructor: "Lisa Rodriguez",
      duration: "3h 20m",
      studentsCount: 789,
      rating: 4.8,
      level: "Intermediate",
      category: "Design",
      progress: 0,
      status: "not-started",
      isBookmarked: true,
      tags: ["Design", "UI", "UX"],
    },
    {
      id: "6",
      title: "Financial Planning for Beginners",
      description: "Learn the basics of personal financial planning and investment strategies.",
      thumbnail: "/placeholder.svg?height=200&width=300",
      instructor: "Robert Davis",
      duration: "2h 15m",
      studentsCount: 923,
      rating: 4.5,
      level: "Beginner",
      category: "Finance",
      progress: 0,
      status: "not-started",
      isBookmarked: false,
      tags: ["Finance", "Investment", "Planning"],
    },
  ]

  const categories = ["all", "Technology", "Marketing", "Data Science", "Business", "Design", "Finance"]
  const levels = ["all", "Beginner", "Intermediate", "Advanced"]

  // Use real courses if available, otherwise fallback to mock data
  const displayCourses = courses.length > 0 ? courses : (isLoading ? [] : mockCourses)

  const filteredCourses = displayCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel

    return matchesSearch && matchesCategory && matchesLevel
  })

  const getStatusIcon = (status: Course["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "in-progress":
        return <PlayCircle className="w-4 h-4 text-blue-600" />
      default:
        return <Play className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusText = (status: Course["status"]) => {
    switch (status) {
      case "completed":
        return "Completed"
      case "in-progress":
        return "Continue Learning"
      default:
        return "Start Course"
    }
  }

  const CourseCard = ({ course }: { course: Course }) => (
    <Card className="group hover:shadow-lg transition-all duration-200 border-0 shadow-sm">
      <div className="relative">
        <div className="aspect-video relative overflow-hidden rounded-t-lg">
          <img
            src={course.thumbnail || "/placeholder.svg"}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <Button size="sm" className="bg-white/90 text-gray-900 hover:bg-white">
              <Play className="w-4 h-4 mr-2" />
              Preview
            </Button>
          </div>
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-white/90 text-gray-900">
              {course.level}
            </Badge>
          </div>
          <div className="absolute top-3 right-3">
            <Button
              variant="ghost"
              size="sm"
              className={`bg-white/90 hover:bg-white ${course.isBookmarked ? "text-blue-600" : "text-gray-600"}`}
            >
              <Bookmark className={`w-4 h-4 ${course.isBookmarked ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {course.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
        </div>

        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {course.duration}
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {course.studentsCount.toLocaleString()}
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            {course.rating}
          </div>
        </div>

        <div className="text-xs text-gray-600">by {course.instructor}</div>

        {course.progress !== undefined && course.progress > 0 && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
            {course.lastAccessed && <div className="text-xs text-gray-500">Last accessed {course.lastAccessed}</div>}
          </div>
        )}

        <div className="flex flex-wrap gap-1">
          {course.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <Button
          className={`w-full ${
            course.status === "completed"
              ? "bg-green-600 hover:bg-green-700"
              : course.status === "in-progress"
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-900 hover:bg-gray-800"
          }`}
        >
          {getStatusIcon(course.status)}
          <span className="ml-2">{getStatusText(course.status)}</span>
        </Button>
      </CardContent>
    </Card>
  )

  const CourseListItem = ({ course }: { course: Course }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="relative w-32 h-20 flex-shrink-0">
            <img
              src={course.thumbnail || "/placeholder.svg"}
              alt={course.title}
              className="w-full h-full object-cover rounded"
            />
            <div className="absolute top-1 right-1">
              <Badge variant="secondary" className="text-xs">
                {course.level}
              </Badge>
            </div>
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">{course.title}</h3>
              <Button variant="ghost" size="sm" className={course.isBookmarked ? "text-blue-600" : "text-gray-400"}>
                <Bookmark className={`w-4 h-4 ${course.isBookmarked ? "fill-current" : ""}`} />
              </Button>
            </div>

            <p className="text-sm text-gray-600 line-clamp-1">{course.description}</p>

            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>by {course.instructor}</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {course.duration}
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                {course.rating}
              </div>
            </div>

            {course.progress !== undefined && course.progress > 0 && (
              <div className="space-y-1">
                <Progress value={course.progress} className="h-2" />
                <div className="text-xs text-gray-500">{course.progress}% complete</div>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between items-end">
            <Badge variant="outline" className="text-xs">
              {course.category}
            </Badge>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              {getStatusIcon(course.status)}
              <span className="ml-1">{getStatusText(course.status)}</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Mini Courses</h1>
          <p className="text-gray-600 mt-1">Discover and continue your learning journey</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}>
            {viewMode === "grid" ? <List className="w-4 h-4" /> : <Grid3X3 className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Tabs for different course categories */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading your courses...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search courses, instructors, or topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level === "all" ? "All Levels" : level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
              </div>

              {/* Results count */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing {filteredCourses.length} of {displayCourses.length} courses
                </p>
              </div>

              {/* Course Grid/List */}
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredCourses.map((course) => (
                    <CourseListItem key={course.id} course={course} />
                  ))}
                </div>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="in-progress" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayCourses
              .filter((course) => course.status === "in-progress")
              .map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayCourses
              .filter((course) => course.status === "completed")
              .map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="bookmarked" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayCourses
              .filter((course) => course.isBookmarked)
              .map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
