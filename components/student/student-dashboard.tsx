"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, Award, TrendingUp, Play, CheckCircle, Calendar, Target } from "lucide-react"

interface DashboardStats {
  coursesEnrolled: number
  hoursLearned: number
  certificatesEarned: number
  learningStreak: number
}

interface RecentCourse {
  id: string
  title: string
  progress: number
  thumbnail: string
  lastAccessed: string
  nextLesson: string
}

interface Achievement {
  title: string
  icon: string
  earned: boolean
}

interface UpcomingEvent {
  title: string
  date: string
  type: 'session' | 'assignment' | 'release'
}

export function StudentDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState<DashboardStats>({
    coursesEnrolled: 0,
    hoursLearned: 0,
    certificatesEarned: 0,
    learningStreak: 0
  })
  const [recentCourses, setRecentCourses] = useState<RecentCourse[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([])

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    const token = localStorage.getItem('authToken')
    
    if (!token) {
      console.warn('No access token found, using mock data')
      setIsLoading(false)
      return
    }

    try {
      // Fetch dashboard stats
      const statsResponse = await fetch(`${API_BASE_URL}/student/dashboard/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData)
      }

      // Fetch recent courses
      const coursesResponse = await fetch(`${API_BASE_URL}/student/dashboard/recent-courses`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (coursesResponse.ok) {
        const coursesData = await coursesResponse.json()
        setRecentCourses(coursesData)
      }

      // Fetch achievements
      const achievementsResponse = await fetch(`${API_BASE_URL}/student/dashboard/achievements`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (achievementsResponse.ok) {
        const achievementsData = await achievementsResponse.json()
        setAchievements(achievementsData)
      }

      // Fetch upcoming events
      const eventsResponse = await fetch(`${API_BASE_URL}/student/dashboard/events`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (eventsResponse.ok) {
        const eventsData = await eventsResponse.json()
        setUpcomingEvents(eventsData)
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Mock data as fallback
  const mockStats = [
    { label: "Courses Enrolled", value: stats.coursesEnrolled || "12", icon: BookOpen, color: "text-blue-600" },
    { label: "Hours Learned", value: stats.hoursLearned || "47", icon: Clock, color: "text-green-600" },
    { label: "Certificates Earned", value: stats.certificatesEarned || "3", icon: Award, color: "text-purple-600" },
    { label: "Learning Streak", value: stats.learningStreak ? `${stats.learningStreak} days` : "7 days", icon: TrendingUp, color: "text-orange-600" },
  ]

  const mockRecentCourses = [
    {
      id: "1",
      title: "Introduction to Basic Technology",
      progress: 65,
      thumbnail: "/placeholder.svg?height=80&width=120",
      lastAccessed: "2 hours ago",
      nextLesson: "Key Components of Technology",
    },
    {
      id: "2",
      title: "Project Management Essentials",
      progress: 25,
      thumbnail: "/placeholder.svg?height=80&width=120",
      lastAccessed: "1 day ago",
      nextLesson: "Project Planning Fundamentals",
    },
    {
      id: "3",
      title: "Digital Marketing Fundamentals",
      progress: 0,
      thumbnail: "/placeholder.svg?height=80&width=120",
      lastAccessed: "Never",
      nextLesson: "Introduction to Digital Marketing",
    },
  ]

  const mockAchievements = [
    { title: "First Course Completed", icon: "🎯", earned: true },
    { title: "Week Streak", icon: "🔥", earned: true },
    { title: "Quick Learner", icon: "⚡", earned: true },
    { title: "Knowledge Seeker", icon: "🔍", earned: false },
  ]

  const mockUpcomingEvents = [
    { title: "Live Q&A Session", date: "Tomorrow at 2:00 PM", type: 'session' as const },
    { title: "Assignment Due", date: "Friday at 11:59 PM", type: 'assignment' as const },
    { title: "New Course Release", date: "Next Monday", type: 'release' as const },
  ]

  // Use real data if available, otherwise fallback to mock data
  const displayStats = mockStats
  const displayCourses = recentCourses.length > 0 ? recentCourses : (isLoading ? [] : mockRecentCourses)
  const displayAchievements = achievements.length > 0 ? achievements : (isLoading ? [] : mockAchievements)
  const displayEvents = upcomingEvents.length > 0 ? upcomingEvents : (isLoading ? [] : mockUpcomingEvents)

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <span className="text-2xl">👋</span>
            Welcome back, Cleyton!
          </h1>
          <p className="text-gray-600 mt-1">Ready to continue your learning journey?</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Play className="w-4 h-4 mr-2" />
          Continue Learning
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          // Loading skeleton for stats
          Array.from({ length: 4 }).map((_, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                    <div className="h-8 bg-gray-200 rounded animate-pulse w-16"></div>
                  </div>
                  <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          displayStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Continue Learning */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Continue Learning</h2>
            <Button variant="ghost" size="sm" className="text-blue-600">
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {isLoading ? (
              // Loading skeleton for courses
              Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="w-20 h-14 bg-gray-200 rounded animate-pulse"></div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div className="h-5 bg-gray-200 rounded animate-pulse w-48"></div>
                          <div className="h-5 bg-gray-200 rounded animate-pulse w-12"></div>
                        </div>
                        <div className="h-2 bg-gray-200 rounded animate-pulse"></div>
                        <div className="flex items-center justify-between">
                          <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                          <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                        </div>
                      </div>
                      <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              displayCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img
                        src={course.thumbnail || "/placeholder.svg"}
                        alt={course.title}
                        className="w-20 h-14 object-cover rounded"
                      />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <h3 className="font-medium text-gray-900">{course.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {course.progress}%
                          </Badge>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>Next: {course.nextLesson}</span>
                          <span>Last accessed {course.lastAccessed}</span>
                        </div>
                      </div>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
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
                  <span className="font-medium">5/7 hours</span>
                </div>
                <Progress value={71} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Monthly Goal</span>
                  <span className="font-medium">12/20 courses</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Update Goals
              </Button>
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
                // Loading skeleton for achievements
                Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                    <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                    </div>
                    <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ))
              ) : (
                displayAchievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-2 rounded-lg ${
                      achievement.earned ? "bg-green-50" : "bg-gray-50"
                    }`}
                  >
                    <span className="text-2xl">{achievement.icon}</span>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${achievement.earned ? "text-green-900" : "text-gray-600"}`}>
                        {achievement.title}
                      </p>
                    </div>
                    {achievement.earned && <CheckCircle className="w-4 h-4 text-green-600" />}
                  </div>
                ))
              )}
              <Button variant="outline" size="sm" className="w-full">
                View All Achievements
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-orange-600" />
                Upcoming
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {isLoading ? (
                // Loading skeleton for events
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-200 rounded-full mt-2 animate-pulse"></div>
                    <div className="flex-1 space-y-1">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                      <div className="h-3 bg-gray-200 rounded animate-pulse w-24"></div>
                    </div>
                  </div>
                ))
              ) : (
                displayEvents.map((event, index) => {
                  const getEventColor = (type: string) => {
                    switch (type) {
                      case 'session': return 'bg-blue-600'
                      case 'assignment': return 'bg-green-600'
                      case 'release': return 'bg-purple-600'
                      default: return 'bg-gray-600'
                    }
                  }

                  return (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`w-2 h-2 ${getEventColor(event.type)} rounded-full mt-2`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{event.title}</p>
                        <p className="text-xs text-gray-600">{event.date}</p>
                      </div>
                    </div>
                  )
                })
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
