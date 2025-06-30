"use client"

import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  Play,
  CheckCircle,
  Calendar,
  Target,
  Users,
  MessageSquare,
  Loader2,
} from "lucide-react"
import { useState, useEffect } from "react"
import { FullScreenCourseViewer } from "./full-screen-course-viewer"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

interface DashboardStats {
  coursesEnrolled: number
  hoursLearned: number
  certificates: number
  learningStreak: number
}

interface RecentCourse {
  id: string
  title: string
  progress: number
  nextLesson: string
  dueDate: string
  thumbnail: string
}

interface Assignment {
  id: string
  title: string
  course: string
  dueDate: string
  priority: 'high' | 'medium' | 'low'
}

interface Achievement {
  id: string
  title: string
  description: string
  date: string
  icon: string
}

export function StudentDashboardHome() {
  const { user } = useAuth()

  const [selectedCourse, setSelectedCourse] = useState<any>(null)
  const [isFullScreenOpen, setIsFullScreenOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentCourses, setRecentCourses] = useState<RecentCourse[]>([])
  const [upcomingAssignments, setUpcomingAssignments] = useState<Assignment[]>([])
  const [recentAchievements, setRecentAchievements] = useState<Achievement[]>([])

  // Dados mockados como fallback
  const mockStats = [
    { label: "Courses Enrolled", value: "8", icon: BookOpen, color: "text-blue-600", change: "+2 this month" },
    { label: "Hours Learned", value: "47", icon: Clock, color: "text-green-600", change: "+12 this week" },
    { label: "Certificates", value: "3", icon: Award, color: "text-purple-600", change: "+1 this month" },
    {
      label: "Learning Streak",
      value: "12 days",
      icon: TrendingUp,
      color: "text-orange-600",
      change: "Personal best!",
    },
  ]

  const mockRecentCourses = [
    {
      id: "1",
      title: "Introduction to Basic Technology",
      progress: 75,
      nextLesson: "Advanced Concepts",
      dueDate: "Tomorrow",
      thumbnail: "/placeholder.svg?height=60&width=80",
    },
    {
      id: "2",
      title: "Digital Marketing Fundamentals",
      progress: 45,
      nextLesson: "SEO Strategies",
      dueDate: "Jan 25",
      thumbnail: "/placeholder.svg?height=60&width=80",
    },
    {
      id: "3",
      title: "Project Management Essentials",
      progress: 90,
      nextLesson: "Final Assessment",
      dueDate: "Jan 22",
      thumbnail: "/placeholder.svg?height=60&width=80",
    },
  ]

  const mockUpcomingAssignments = [
    { id: "1", title: "Technology Essay", course: "Basic Technology", dueDate: "Jan 20", priority: "high" as const },
    { id: "2", title: "Marketing Campaign", course: "Digital Marketing", dueDate: "Jan 25", priority: "medium" as const },
    { id: "3", title: "Project Proposal", course: "Project Management", dueDate: "Jan 28", priority: "low" as const },
  ]

  const mockRecentAchievements = [
    { id: "1", title: "Course Completion", description: "Completed Data Analysis course", date: "2 days ago", icon: "🎯" },
    { id: "2", title: "Perfect Score", description: "100% on Marketing Quiz", date: "1 week ago", icon: "⭐" },
    { id: "3", title: "Learning Streak", description: "10 days consecutive learning", date: "1 week ago", icon: "🔥" },
  ]

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true)
      const token = localStorage.getItem('access_token')
      
      if (!token) {
        console.warn('No access token found, using mock data')
        setStats({
          coursesEnrolled: 8,
          hoursLearned: 47,
          certificates: 3,
          learningStreak: 12
        })
        setRecentCourses(mockRecentCourses)
        setUpcomingAssignments(mockUpcomingAssignments)
        setRecentAchievements(mockRecentAchievements)
        return
      }

      // Buscar estatísticas do dashboard
      const statsResponse = await fetch(`${API_BASE_URL}/student/dashboard/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData)
      } else {
        console.warn('Failed to fetch stats, using mock data')
        setStats({
          coursesEnrolled: 8,
          hoursLearned: 47,
          certificates: 3,
          learningStreak: 12
        })
      }

      // Buscar cursos recentes
      const coursesResponse = await fetch(`${API_BASE_URL}/student/dashboard/recent-courses`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (coursesResponse.ok) {
        const coursesData = await coursesResponse.json()
        setRecentCourses(coursesData)
      } else {
        console.warn('Failed to fetch recent courses, using mock data')
        setRecentCourses(mockRecentCourses)
      }

      // Buscar tarefas próximas
      const assignmentsResponse = await fetch(`${API_BASE_URL}/student/dashboard/assignments`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (assignmentsResponse.ok) {
        const assignmentsData = await assignmentsResponse.json()
        setUpcomingAssignments(assignmentsData)
      } else {
        console.warn('Failed to fetch assignments, using mock data')
        setUpcomingAssignments(mockUpcomingAssignments)
      }

      // Buscar conquistas recentes
      const achievementsResponse = await fetch(`${API_BASE_URL}/student/dashboard/achievements`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (achievementsResponse.ok) {
        const achievementsData = await achievementsResponse.json()
        setRecentAchievements(achievementsData)
      } else {
        console.warn('Failed to fetch achievements, using mock data')
        setRecentAchievements(mockRecentAchievements)
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      // Usar dados mockados em caso de erro
      setStats({
        coursesEnrolled: 8,
        hoursLearned: 47,
        certificates: 3,
        learningStreak: 12
      })
      setRecentCourses(mockRecentCourses)
      setUpcomingAssignments(mockUpcomingAssignments)
      setRecentAchievements(mockRecentAchievements)
    } finally {
      setIsLoading(false)
    }
  }

  const displayStats = stats ? [
    { label: "Courses Enrolled", value: stats.coursesEnrolled.toString(), icon: BookOpen, color: "text-blue-600", change: "+2 this month" },
    { label: "Hours Learned", value: stats.hoursLearned.toString(), icon: Clock, color: "text-green-600", change: "+12 this week" },
    { label: "Certificates", value: stats.certificates.toString(), icon: Award, color: "text-purple-600", change: "+1 this month" },
    {
      label: "Learning Streak",
      value: `${stats.learningStreak} days`,
      icon: TrendingUp,
      color: "text-orange-600",
      change: "Personal best!",
    },
  ] : mockStats

  const handleContinueCourse = (course: any) => {
    setSelectedCourse(course)
    setIsFullScreenOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name?.split(" ")[0]}! 👋</h1>
          <p className="text-gray-600 mt-1">Ready to continue your learning journey?</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Play className="w-4 h-4 mr-2" />
          Continue Learning
        </Button>
      </div>

      {/* Stats Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((index) => (
            <Card key={index} className="animate-pulse">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                    <div className="h-8 bg-gray-200 rounded w-12"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                  <div className="w-8 h-8 bg-gray-200 rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Continue Learning */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Continue Learning
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((index) => (
                    <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg animate-pulse">
                      <div className="w-16 h-12 bg-gray-200 rounded"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-2 bg-gray-200 rounded w-full"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                      <div className="w-8 h-8 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : (
                recentCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <img
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    className="w-16 h-12 object-cover rounded"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="font-medium text-gray-900">{course.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        Due {course.dueDate}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    <p className="text-sm text-gray-600">Next: {course.nextLesson}</p>
                  </div>
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleContinueCourse(course)}
                  >
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-600" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg animate-pulse">
                      <div className="w-8 h-8 bg-gray-200 rounded"></div>
                      <div className="flex-1 space-y-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                        <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                      </div>
                      <div className="w-5 h-5 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : (
                recentAchievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div className="flex-1">
                    <p className="font-medium text-green-900">{achievement.title}</p>
                    <p className="text-sm text-green-700">{achievement.description}</p>
                    <p className="text-xs text-green-600">{achievement.date}</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Assignments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-orange-600" />
                Upcoming Assignments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((index) => (
                    <div key={index} className="flex items-start gap-3 p-3 border rounded-lg animate-pulse">
                      <div className="w-2 h-2 bg-gray-200 rounded-full mt-2"></div>
                      <div className="flex-1 space-y-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-2 bg-gray-200 rounded w-1/3"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                upcomingAssignments.map((assignment, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      assignment.priority === "high"
                        ? "bg-red-500"
                        : assignment.priority === "medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{assignment.title}</p>
                    <p className="text-sm text-gray-600">{assignment.course}</p>
                    <p className="text-xs text-gray-500">Due {assignment.dueDate}</p>
                  </div>
                </div>
                ))
              )}
              {!isLoading && (
                <Button variant="outline" size="sm" className="w-full">
                  View All Assignments
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Learning Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                Learning Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Weekly Goal</span>
                  <span className="font-medium">12/15 hours</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Monthly Courses</span>
                  <span className="font-medium">3/5 completed</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Update Goals
              </Button>
            </CardContent>
          </Card>

          {/* Study Group */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-green-600" />
                Study Groups
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                  TG
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Tech Group</p>
                  <p className="text-xs text-gray-600">5 members • Active now</p>
                </div>
                <MessageSquare className="w-4 h-4 text-gray-400" />
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <Users className="w-4 h-4 mr-2" />
                Join Study Group
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      {isFullScreenOpen && selectedCourse && (
        <FullScreenCourseViewer
          course={selectedCourse}
          onClose={() => {
            setIsFullScreenOpen(false)
            setSelectedCourse(null)
          }}
        />
      )}
    </div>
  )
}
