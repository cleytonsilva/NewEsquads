"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, Award, TrendingUp, Play, CheckCircle, Calendar, Target } from "lucide-react"

export function StudentDashboard() {
  const stats = [
    { label: "Courses Enrolled", value: "12", icon: BookOpen, color: "text-blue-600" },
    { label: "Hours Learned", value: "47", icon: Clock, color: "text-green-600" },
    { label: "Certificates Earned", value: "3", icon: Award, color: "text-purple-600" },
    { label: "Learning Streak", value: "7 days", icon: TrendingUp, color: "text-orange-600" },
  ]

  const recentCourses = [
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

  const achievements = [
    { title: "First Course Completed", icon: "🎯", earned: true },
    { title: "Week Streak", icon: "🔥", earned: true },
    { title: "Quick Learner", icon: "⚡", earned: true },
    { title: "Knowledge Seeker", icon: "🔍", earned: false },
  ]

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
        {stats.map((stat, index) => (
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
        ))}
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
            {recentCourses.map((course) => (
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
            ))}
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
              {achievements.map((achievement, index) => (
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
              ))}
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
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Live Q&A Session</p>
                  <p className="text-xs text-gray-600">Tomorrow at 2:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Assignment Due</p>
                  <p className="text-xs text-gray-600">Friday at 11:59 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New Course Release</p>
                  <p className="text-xs text-gray-600">Next Monday</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
