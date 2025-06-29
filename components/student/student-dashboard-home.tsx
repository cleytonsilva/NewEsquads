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
} from "lucide-react"
import { useState } from "react"
import { FullScreenCourseViewer } from "./full-screen-course-viewer"

export function StudentDashboardHome() {
  const { user } = useAuth()

  const [selectedCourse, setSelectedCourse] = useState<any>(null)
  const [isFullScreenOpen, setIsFullScreenOpen] = useState(false)

  const stats = [
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

  const recentCourses = [
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

  const upcomingAssignments = [
    { title: "Technology Essay", course: "Basic Technology", dueDate: "Jan 20", priority: "high" },
    { title: "Marketing Campaign", course: "Digital Marketing", dueDate: "Jan 25", priority: "medium" },
    { title: "Project Proposal", course: "Project Management", dueDate: "Jan 28", priority: "low" },
  ]

  const recentAchievements = [
    { title: "Course Completion", description: "Completed Data Analysis course", date: "2 days ago", icon: "🎯" },
    { title: "Perfect Score", description: "100% on Marketing Quiz", date: "1 week ago", icon: "⭐" },
    { title: "Learning Streak", description: "10 days consecutive learning", date: "1 week ago", icon: "🔥" },
  ]

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
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
              {recentCourses.map((course) => (
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
              ))}
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
              {recentAchievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div className="flex-1">
                    <p className="font-medium text-green-900">{achievement.title}</p>
                    <p className="text-sm text-green-700">{achievement.description}</p>
                    <p className="text-xs text-green-600">{achievement.date}</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
              ))}
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
              {upcomingAssignments.map((assignment, index) => (
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
              ))}
              <Button variant="outline" size="sm" className="w-full">
                View All Assignments
              </Button>
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
