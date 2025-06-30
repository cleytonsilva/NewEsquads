"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"
import { TrendingUp, TrendingDown, Users, BookOpen, Award, Clock, Target, Activity, Download } from "lucide-react"

// Interfaces for analytics data
interface KeyMetric {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: any
  color: string
}

interface LearnerEngagementData {
  month: string
  enrolled: number
  active: number
  completed: number
}

interface CoursePerformanceData {
  name: string
  completion: number
  engagement: number
  students: number
}

interface CategoryDistribution {
  name: string
  value: number
  color: string
}

interface WeeklyActivityData {
  day: string
  hours: number
}

interface TopLearner {
  name: string
  courses: number
  hours: number
  score: number
}

interface ProgressDistribution {
  range: string
  count: number
  percentage: number
}

interface EngagementMetrics {
  dailyActiveUsers: number
  sessionDuration: string
  pagesPerSession: number
  bounceRate: number
}

// Mock data as fallback
const mockKeyMetrics: KeyMetric[] = [
  {
    title: "Total Learners",
    value: "2,847",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Active Courses",
    value: "24",
    change: "+3",
    trend: "up",
    icon: BookOpen,
    color: "text-green-600",
  },
  {
    title: "Completion Rate",
    value: "78.4%",
    change: "+2.1%",
    trend: "up",
    icon: Target,
    color: "text-purple-600",
  },
  {
    title: "Avg. Study Time",
    value: "4.2h",
    change: "-0.3h",
    trend: "down",
    icon: Clock,
    color: "text-orange-600",
  },
  {
    title: "Certificates Issued",
    value: "1,234",
    change: "+18.2%",
    trend: "up",
    icon: Award,
    color: "text-indigo-600",
  },
  {
    title: "Engagement Score",
    value: "87.3",
    change: "+4.2",
    trend: "up",
    icon: Activity,
    color: "text-pink-600",
  },
]

const mockLearnerEngagementData: LearnerEngagementData[] = [
  { month: "Jan", active: 120, completed: 85, enrolled: 200 },
  { month: "Feb", active: 135, completed: 92, enrolled: 220 },
  { month: "Mar", active: 148, completed: 108, enrolled: 245 },
  { month: "Apr", active: 162, completed: 125, enrolled: 280 },
  { month: "May", active: 178, completed: 142, enrolled: 310 },
  { month: "Jun", active: 195, completed: 158, enrolled: 340 },
]

const mockCoursePerformanceData: CoursePerformanceData[] = [
  { name: "Basic Technology", completion: 85, engagement: 92, students: 156 },
  { name: "Digital Marketing", completion: 78, engagement: 88, students: 134 },
  { name: "Data Analysis", completion: 92, engagement: 95, students: 98 },
  { name: "Project Management", completion: 73, engagement: 82, students: 187 },
  { name: "UI/UX Design", completion: 88, engagement: 90, students: 112 },
]

const mockCategoryDistribution: CategoryDistribution[] = [
  { name: "Technology", value: 35, color: "#3B82F6" },
  { name: "Business", value: 28, color: "#10B981" },
  { name: "Design", value: 20, color: "#8B5CF6" },
  { name: "Marketing", value: 17, color: "#F59E0B" },
]

const mockWeeklyActivityData: WeeklyActivityData[] = [
  { day: "Mon", hours: 4.2 },
  { day: "Tue", hours: 3.8 },
  { day: "Wed", hours: 5.1 },
  { day: "Thu", hours: 4.7 },
  { day: "Fri", hours: 3.9 },
  { day: "Sat", hours: 2.3 },
  { day: "Sun", hours: 1.8 },
]

const mockTopLearners: TopLearner[] = [
  { name: "Sarah Johnson", courses: 8, hours: 42, score: 95 },
  { name: "Mike Chen", courses: 6, hours: 38, score: 92 },
  { name: "Emily Davis", courses: 7, hours: 35, score: 89 },
  { name: "Alex Rodriguez", courses: 5, hours: 28, score: 87 },
]

const mockProgressDistribution: ProgressDistribution[] = [
  { range: "90-100%", count: 234, percentage: 18 },
  { range: "80-89%", count: 456, percentage: 35 },
  { range: "70-79%", count: 389, percentage: 30 },
  { range: "60-69%", count: 178, percentage: 14 },
  { range: "Below 60%", count: 43, percentage: 3 },
]

const mockEngagementMetrics: EngagementMetrics = {
  dailyActiveUsers: 1247,
  sessionDuration: "24m 32s",
  pagesPerSession: 4.7,
  bounceRate: 23.4,
}

export function AnalysisOverview() {
  const [timeRange, setTimeRange] = useState("30d")
  const [selectedMetric, setSelectedMetric] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [keyMetrics, setKeyMetrics] = useState<KeyMetric[]>([])
  const [learnerEngagementData, setLearnerEngagementData] = useState<LearnerEngagementData[]>([])
  const [coursePerformanceData, setCoursePerformanceData] = useState<CoursePerformanceData[]>([])
  const [categoryDistribution, setCategoryDistribution] = useState<CategoryDistribution[]>([])
  const [weeklyActivityData, setWeeklyActivityData] = useState<WeeklyActivityData[]>([])
  const [topLearners, setTopLearners] = useState<TopLearner[]>([])
  const [progressDistribution, setProgressDistribution] = useState<ProgressDistribution[]>([])
  const [engagementMetrics, setEngagementMetrics] = useState<EngagementMetrics | null>(null)

  useEffect(() => {
    fetchAnalyticsData()
  }, [timeRange])

  const fetchAnalyticsData = async () => {
    setIsLoading(true)
    try {
      const token = localStorage.getItem('authToken')
      if (!token) {
        // Use mock data if no token
        setKeyMetrics(mockKeyMetrics)
        setLearnerEngagementData(mockLearnerEngagementData)
        setCoursePerformanceData(mockCoursePerformanceData)
        setCategoryDistribution(mockCategoryDistribution)
        setWeeklyActivityData(mockWeeklyActivityData)
        setTopLearners(mockTopLearners)
        setProgressDistribution(mockProgressDistribution)
        setEngagementMetrics(mockEngagementMetrics)
        setIsLoading(false)
        return
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }

      // Fetch all analytics data
      const [metricsRes, engagementRes, performanceRes, categoryRes, activityRes, learnersRes, progressRes, engagementMetricsRes] = await Promise.all([
        fetch(`/api/analytics/key-metrics?timeRange=${timeRange}`, { headers }),
        fetch(`/api/analytics/learner-engagement?timeRange=${timeRange}`, { headers }),
        fetch(`/api/analytics/course-performance?timeRange=${timeRange}`, { headers }),
        fetch(`/api/analytics/category-distribution?timeRange=${timeRange}`, { headers }),
        fetch(`/api/analytics/weekly-activity?timeRange=${timeRange}`, { headers }),
        fetch(`/api/analytics/top-learners?timeRange=${timeRange}`, { headers }),
        fetch(`/api/analytics/progress-distribution?timeRange=${timeRange}`, { headers }),
        fetch(`/api/analytics/engagement-metrics?timeRange=${timeRange}`, { headers }),
      ])

      if (metricsRes.ok) {
        const data = await metricsRes.json()
        setKeyMetrics(data)
      } else {
        setKeyMetrics(mockKeyMetrics)
      }

      if (engagementRes.ok) {
        const data = await engagementRes.json()
        setLearnerEngagementData(data)
      } else {
        setLearnerEngagementData(mockLearnerEngagementData)
      }

      if (performanceRes.ok) {
        const data = await performanceRes.json()
        setCoursePerformanceData(data)
      } else {
        setCoursePerformanceData(mockCoursePerformanceData)
      }

      if (categoryRes.ok) {
        const data = await categoryRes.json()
        setCategoryDistribution(data)
      } else {
        setCategoryDistribution(mockCategoryDistribution)
      }

      if (activityRes.ok) {
        const data = await activityRes.json()
        setWeeklyActivityData(data)
      } else {
        setWeeklyActivityData(mockWeeklyActivityData)
      }

      if (learnersRes.ok) {
        const data = await learnersRes.json()
        setTopLearners(data)
      } else {
        setTopLearners(mockTopLearners)
      }

      if (progressRes.ok) {
        const data = await progressRes.json()
        setProgressDistribution(data)
      } else {
        setProgressDistribution(mockProgressDistribution)
      }

      if (engagementMetricsRes.ok) {
        const data = await engagementMetricsRes.json()
        setEngagementMetrics(data)
      } else {
        setEngagementMetrics(mockEngagementMetrics)
      }
    } catch (error) {
      console.error('Error fetching analytics data:', error)
      // Fallback to mock data
      setKeyMetrics(mockKeyMetrics)
      setLearnerEngagementData(mockLearnerEngagementData)
      setCoursePerformanceData(mockCoursePerformanceData)
      setCategoryDistribution(mockCategoryDistribution)
      setWeeklyActivityData(mockWeeklyActivityData)
      setTopLearners(mockTopLearners)
      setProgressDistribution(mockProgressDistribution)
      setEngagementMetrics(mockEngagementMetrics)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Analysis Dashboard</h1>
          <p className="text-gray-600 mt-1">Comprehensive insights into learning performance and engagement</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange} disabled={isLoading}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" disabled={isLoading}>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1 flex-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-16" />
                    <div className="flex items-center gap-1">
                      <Skeleton className="h-3 w-3" />
                      <Skeleton className="h-3 w-12" />
                    </div>
                  </div>
                  <Skeleton className="h-8 w-8" />
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          keyMetrics.map((metric, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                    <div className="flex items-center gap-1">
                      {metric.trend === "up" ? (
                        <TrendingUp className="w-3 h-3 text-green-600" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-600" />
                      )}
                      <span
                        className={`text-xs font-medium ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}
                      >
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <metric.icon className={`w-8 h-8 ${metric.color}`} />
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" disabled={isLoading}>Overview</TabsTrigger>
          <TabsTrigger value="learners" disabled={isLoading}>Learners</TabsTrigger>
          <TabsTrigger value="courses" disabled={isLoading}>Courses</TabsTrigger>
          <TabsTrigger value="engagement" disabled={isLoading}>Engagement</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Learner Engagement Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Learner Engagement Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-[300px] flex items-center justify-center">
                    <div className="space-y-4 w-full">
                      <Skeleton className="h-8 w-full" />
                      <Skeleton className="h-8 w-full" />
                      <Skeleton className="h-8 w-full" />
                      <Skeleton className="h-8 w-full" />
                      <Skeleton className="h-8 w-full" />
                    </div>
                  </div>
                ) : (
                  <ChartContainer
                    config={{
                      active: { label: "Active Learners", color: "hsl(var(--chart-1))" },
                      completed: { label: "Completed Courses", color: "hsl(var(--chart-2))" },
                      enrolled: { label: "New Enrollments", color: "hsl(var(--chart-3))" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={learnerEngagementData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area
                          type="monotone"
                          dataKey="enrolled"
                          stackId="1"
                          stroke="var(--color-enrolled)"
                          fill="var(--color-enrolled)"
                          fillOpacity={0.6}
                        />
                        <Area
                          type="monotone"
                          dataKey="active"
                          stackId="1"
                          stroke="var(--color-active)"
                          fill="var(--color-active)"
                          fillOpacity={0.8}
                        />
                        <Area
                          type="monotone"
                          dataKey="completed"
                          stackId="1"
                          stroke="var(--color-completed)"
                          fill="var(--color-completed)"
                          fillOpacity={0.9}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                )}
              </CardContent>
            </Card>

            {/* Course Category Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-green-600" />
                  Course Category Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-[300px] flex items-center justify-center">
                    <div className="space-y-4 w-full">
                      <Skeleton className="h-4 w-32 mx-auto" />
                      <Skeleton className="h-32 w-32 rounded-full mx-auto" />
                      <div className="flex justify-center space-x-4">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <ChartContainer
                    config={{
                      technology: { label: "Technology", color: "#3B82F6" },
                      business: { label: "Business", color: "#10B981" },
                      design: { label: "Design", color: "#8B5CF6" },
                      marketing: { label: "Marketing", color: "#F59E0B" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryDistribution}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {categoryDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Weekly Activity Pattern */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-600" />
                Weekly Learning Activity Pattern
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-[200px] flex items-center justify-center">
                  <div className="space-y-4 w-full">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                </div>
              ) : (
                <ChartContainer
                  config={{
                    hours: { label: "Study Hours", color: "hsl(var(--chart-1))" },
                  }}
                  className="h-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyActivityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="hours" fill="var(--color-hours)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                Course Performance Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-[400px] flex items-center justify-center">
                  <div className="space-y-4 w-full">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                </div>
              ) : (
                <ChartContainer
                  config={{
                    completion: { label: "Completion Rate", color: "hsl(var(--chart-1))" },
                    engagement: { label: "Engagement Score", color: "hsl(var(--chart-2))" },
                  }}
                  className="h-[400px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={coursePerformanceData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={120} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="completion" fill="var(--color-completion)" />
                      <Bar dataKey="engagement" fill="var(--color-engagement)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="learners" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Learners</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-3 w-32" />
                        </div>
                        <Skeleton className="h-6 w-12" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {topLearners.map((learner, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{learner.name}</p>
                          <p className="text-sm text-gray-600">
                            {learner.courses} courses • {learner.hours}h
                          </p>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {learner.score}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Learning Progress Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <Skeleton className="h-4 w-16" />
                          <Skeleton className="h-4 w-20" />
                        </div>
                        <Skeleton className="h-2 w-full" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {progressDistribution.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{item.range}</span>
                          <span className="font-medium">{item.count} learners</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${item.percentage}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoading ? (
                  <>
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </>
                ) : (
                  engagementMetrics && (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Daily Active Users</span>
                        <span className="font-semibold">{engagementMetrics.dailyActiveUsers.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Session Duration</span>
                        <span className="font-semibold">{engagementMetrics.sessionDuration}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Pages per Session</span>
                        <span className="font-semibold">{engagementMetrics.pagesPerSession}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Bounce Rate</span>
                        <span className="font-semibold">{engagementMetrics.bounceRate}%</span>
                      </div>
                    </>
                  )
                )}
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Engagement Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-[200px] flex items-center justify-center">
                    <div className="space-y-4 w-full">
                      <Skeleton className="h-8 w-full" />
                      <Skeleton className="h-8 w-full" />
                      <Skeleton className="h-8 w-full" />
                      <Skeleton className="h-8 w-full" />
                    </div>
                  </div>
                ) : (
                  <ChartContainer
                    config={{
                      engagement: { label: "Engagement Score", color: "hsl(var(--chart-1))" },
                    }}
                    className="h-[200px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={learnerEngagementData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="active"
                          stroke="var(--color-engagement)"
                          strokeWidth={3}
                          dot={{ fill: "var(--color-engagement)", strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
