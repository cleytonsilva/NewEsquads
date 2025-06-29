"use client"

import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import {
  Users,
  BookOpen,
  TrendingUp,
  AlertTriangle,
  Plus,
  Eye,
  Edit,
  MoreHorizontal,
  Calendar,
  Award,
  Activity,
} from "lucide-react"
import { useState } from "react"
import { AICourseCreator } from "../course-creation/ai-course-creator"

export function AdminDashboardHome() {
  const { user } = useAuth()
  const [showAICreator, setShowAICreator] = useState(false)

  const stats = [
    { label: "Total Users", value: "2,847", change: "+12.5%", trend: "up", icon: Users, color: "text-blue-600" },
    { label: "Active Courses", value: "24", change: "+3", trend: "up", icon: BookOpen, color: "text-green-600" },
    {
      label: "Course Completion",
      value: "78.4%",
      change: "+2.1%",
      trend: "up",
      icon: TrendingUp,
      color: "text-purple-600",
    },
    { label: "System Issues", value: "3", change: "-2", trend: "down", icon: AlertTriangle, color: "text-red-600" },
  ]

  const recentActivity = [
    { action: "New user registered", user: "John Doe", time: "2 minutes ago", type: "user" },
    { action: "Course completed", user: "Sarah Wilson", time: "15 minutes ago", type: "course" },
    { action: "Content updated", user: "Mike Johnson", time: "1 hour ago", type: "content" },
    { action: "System backup completed", user: "System", time: "2 hours ago", type: "system" },
  ]

  const pendingTasks = [
    { title: "Review new course submissions", count: 5, priority: "high" },
    { title: "Approve user registrations", count: 12, priority: "medium" },
    { title: "Update system documentation", count: 3, priority: "low" },
    { title: "Process certificate requests", count: 8, priority: "medium" },
  ]

  const topCourses = [
    { name: "Basic Technology", students: 156, completion: 85, revenue: "$2,340" },
    { name: "Digital Marketing", students: 134, completion: 78, revenue: "$2,010" },
    { name: "Data Analysis", students: 98, completion: 92, revenue: "$1,470" },
    { name: "Project Management", students: 187, completion: 73, revenue: "$2,805" },
  ]

  const chartData = [
    { month: "Jan", users: 120, courses: 8 },
    { month: "Feb", users: 135, courses: 12 },
    { month: "Mar", users: 148, courses: 15 },
    { month: "Apr", users: 162, courses: 18 },
    { month: "May", users: 178, courses: 21 },
    { month: "Jun", users: 195, courses: 24 },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name?.split(" ")[0]}! 👋</h1>
          <p className="text-gray-600 mt-1">Here's what's happening with your platform today.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            View Reports
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowAICreator(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Course
          </Button>
        </div>
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
                  <p className={`text-xs mt-1 ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    {stat.change} from last month
                  </p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Growth Chart */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                Platform Growth
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  users: { label: "Users", color: "hsl(var(--chart-1))" },
                  courses: { label: "Courses", color: "hsl(var(--chart-2))" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="users" stroke="var(--color-users)" strokeWidth={3} />
                    <Line type="monotone" dataKey="courses" stroke="var(--color-courses)" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Pending Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-600" />
              Pending Tasks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingTasks.map((task, index) => (
              <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                <div
                  className={`w-2 h-2 rounded-full ${
                    task.priority === "high"
                      ? "bg-red-500"
                      : task.priority === "medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{task.title}</p>
                  <p className="text-xs text-gray-600">{task.count} items</p>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full">
              View All Tasks
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Courses */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-600" />
              Top Performing Courses
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topCourses.map((course, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{course.name}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <span>{course.students} students</span>
                    <span>{course.completion}% completion</span>
                  </div>
                  <Progress value={course.completion} className="h-2 mt-2" />
                </div>
                <div className="text-right ml-4">
                  <p className="font-semibold text-green-600">{course.revenue}</p>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-600" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 border-l-2 border-blue-200 bg-blue-50 rounded-r-lg"
              >
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === "user"
                      ? "bg-blue-500"
                      : activity.type === "course"
                        ? "bg-green-500"
                        : activity.type === "content"
                          ? "bg-purple-500"
                          : "bg-gray-500"
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.user}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full">
              View Activity Log
            </Button>
          </CardContent>
        </Card>
      </div>
      {showAICreator && (
        <AICourseCreator
          onClose={() => setShowAICreator(false)}
          onCourseCreated={(courseData) => {
            console.log("Course created:", courseData)
            setShowAICreator(false)
          }}
        />
      )}
    </div>
  )
}
