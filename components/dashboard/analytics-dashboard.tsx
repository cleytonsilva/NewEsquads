"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Info, BarChart3, TrendingUp, Award, BadgeIcon as Certificate, Target } from "lucide-react"

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Blue Squad</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <span>Collections</span>
            <span>•</span>
            <span>Blue Squad</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {["Mini courses", "Landing page", "Settings", "Learners", "Analytics", "Share"].map((tab) => (
            <button
              key={tab}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                tab === "Analytics"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Filter and Download */}
      <div className="flex items-center justify-between">
        <Select defaultValue="all">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Mini-Courses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Mini-Courses</SelectItem>
            <SelectItem value="active">Active Courses</SelectItem>
            <SelectItem value="completed">Completed Courses</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Download Full Report
        </Button>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Eligible Learners */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Eligible learners</CardTitle>
            <Info className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold">All</div>
              <BarChart3 className="h-4 w-4 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        {/* Engaged Learners */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Engaged learners</CardTitle>
            <Info className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold">5</div>
              <BarChart3 className="h-4 w-4 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        {/* Learners Who Completed */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Learners who completed</CardTitle>
            <Info className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold">0</div>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
          </CardContent>
        </Card>

        {/* Learners with Badges */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Learners with badges</CardTitle>
            <Info className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold">1</div>
              <Award className="h-4 w-4 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        {/* Learners with Certificates */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Learners with certificates</CardTitle>
            <Info className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold">0</div>
              <Certificate className="h-4 w-4 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        {/* Average Success Score */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Average success score</CardTitle>
            <Info className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold">66.67 %</div>
              <Target className="h-4 w-4 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
