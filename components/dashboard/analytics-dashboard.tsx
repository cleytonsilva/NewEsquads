"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Download, Info, BarChart3, TrendingUp, Award, BadgeIcon as Certificate, Target, ArrowUpIcon, ArrowDownIcon, MinusIcon } from "lucide-react"

interface AnalyticsData {
  eligibleLearners: string
  engagedLearners: number
  completedLearners: number
  learnersWithBadges: number
  learnersWithCertificates: number
  averageSuccessScore: number
  trends?: {
    engagedLearners: 'up' | 'down' | 'stable'
    completedLearners: 'up' | 'down' | 'stable'
    learnersWithBadges: 'up' | 'down' | 'stable'
    learnersWithCertificates: 'up' | 'down' | 'stable'
    averageSuccessScore: 'up' | 'down' | 'stable'
  }
  percentageChanges?: {
    engagedLearners: number
    completedLearners: number
    learnersWithBadges: number
    learnersWithCertificates: number
    averageSuccessScore: number
  }
}

// Componente para indicadores de tendência
const TrendIndicator = ({ trend, percentage }: { trend?: 'up' | 'down' | 'stable', percentage?: number }) => {
  if (!trend || !percentage) return null
  
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <ArrowUpIcon className="h-3 w-3 text-green-600" />
      case 'down':
        return <ArrowDownIcon className="h-3 w-3 text-red-600" />
      case 'stable':
        return <MinusIcon className="h-3 w-3 text-gray-600" />
      default:
        return null
    }
  }
  
  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-600'
      case 'down':
        return 'text-red-600'
      case 'stable':
        return 'text-gray-600'
      default:
        return 'text-gray-600'
    }
  }
  
  return (
    <div className={`flex items-center space-x-1 text-xs ${getTrendColor()}`}>
      {getTrendIcon()}
      <span>{Math.abs(percentage)}%</span>
    </div>
  )
}

export function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [isExporting, setIsExporting] = useState(false)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setIsLoading(true)
        const token = localStorage.getItem('auth_token')
        
        if (!token) {
          // Usar dados mockados se não houver token
          setAnalyticsData({
            eligibleLearners: "1,234",
            engagedLearners: 987,
            completedLearners: 654,
            learnersWithBadges: 432,
            learnersWithCertificates: 321,
            averageSuccessScore: 78,
            trends: {
              engagedLearners: 'up',
              completedLearners: 'up',
              learnersWithBadges: 'stable',
              learnersWithCertificates: 'down',
              averageSuccessScore: 'up'
            },
            percentageChanges: {
              engagedLearners: 12.5,
              completedLearners: 8.3,
              learnersWithBadges: 0,
              learnersWithCertificates: -5.2,
              averageSuccessScore: 3.7
            }
          })
          setIsLoading(false)
          return
        }

        const response = await fetch('/api/analytics/collection-dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          const data = await response.json()
          setAnalyticsData(data)
        } else {
          // Fallback para dados mockados
          setAnalyticsData({
            eligibleLearners: "All",
            engagedLearners: 5,
            completedLearners: 0,
            learnersWithBadges: 1,
            learnersWithCertificates: 0,
            averageSuccessScore: 66.67
          })
        }
      } catch (error) {
        console.error('Erro ao buscar analytics:', error)
        // Fallback para dados mockados
        setAnalyticsData({
          eligibleLearners: "All",
          engagedLearners: 5,
          completedLearners: 0,
          learnersWithBadges: 1,
          learnersWithCertificates: 0,
          averageSuccessScore: 66.67
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalytics()
  }, [selectedFilter])

  // Função para exportar relatório
  const handleExportReport = async () => {
    if (!analyticsData) return
    
    setIsExporting(true)
    try {
      // Simular delay de exportação
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Criar dados do relatório
      const reportData = {
        generatedAt: new Date().toISOString(),
        filter: selectedFilter,
        metrics: {
          eligibleLearners: analyticsData.eligibleLearners,
          engagedLearners: analyticsData.engagedLearners,
          completedLearners: analyticsData.completedLearners,
          learnersWithBadges: analyticsData.learnersWithBadges,
          learnersWithCertificates: analyticsData.learnersWithCertificates,
          averageSuccessScore: analyticsData.averageSuccessScore
        },
        trends: analyticsData.trends,
        percentageChanges: analyticsData.percentageChanges
      }
      
      // Criar e baixar arquivo JSON
      const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `analytics-report-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Erro ao exportar relatório:', error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <TooltipProvider>
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
        <Select value={selectedFilter} onValueChange={setSelectedFilter} disabled={isLoading}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Mini-Courses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Mini-Courses</SelectItem>
            <SelectItem value="active">Active Courses</SelectItem>
            <SelectItem value="completed">Completed Courses</SelectItem>
          </SelectContent>
        </Select>

        <Button 
          variant="outline" 
          size="sm" 
          disabled={isLoading || isExporting || !analyticsData}
          onClick={handleExportReport}
        >
          <Download className="w-4 h-4 mr-2" />
          {isExporting ? 'Exporting...' : 'Download Full Report'}
        </Button>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading ? (
          // Esqueletos de carregamento
          Array.from({ length: 6 }).map((_, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          ))
        ) : analyticsData ? (
          <>
            {/* Eligible Learners */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Eligible learners</CardTitle>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Total number of learners who are eligible to access the content</p>
                  </TooltipContent>
                </Tooltip>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <div className="text-2xl font-bold">{analyticsData.eligibleLearners}</div>
                  <BarChart3 className="h-4 w-4 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            {/* Engaged Learners */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Engaged learners</CardTitle>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Number of learners who have actively interacted with the content</p>
                  </TooltipContent>
                </Tooltip>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="text-2xl font-bold">{analyticsData.engagedLearners}</div>
                    <BarChart3 className="h-4 w-4 text-blue-600" />
                  </div>
                  <TrendIndicator 
                    trend={analyticsData.trends?.engagedLearners} 
                    percentage={analyticsData.percentageChanges?.engagedLearners} 
                  />
                </div>
              </CardContent>
            </Card>

            {/* Learners Who Completed */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Learners who completed</CardTitle>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Number of learners who have successfully completed all course requirements</p>
                  </TooltipContent>
                </Tooltip>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="text-2xl font-bold">{analyticsData.completedLearners}</div>
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </div>
                  <TrendIndicator 
                    trend={analyticsData.trends?.completedLearners} 
                    percentage={analyticsData.percentageChanges?.completedLearners} 
                  />
                </div>
              </CardContent>
            </Card>

            {/* Learners with Badges */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Learners with badges</CardTitle>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Number of learners who have earned achievement badges</p>
                  </TooltipContent>
                </Tooltip>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="text-2xl font-bold">{analyticsData.learnersWithBadges}</div>
                    <Award className="h-4 w-4 text-gray-400" />
                  </div>
                  <TrendIndicator 
                    trend={analyticsData.trends?.learnersWithBadges} 
                    percentage={analyticsData.percentageChanges?.learnersWithBadges} 
                  />
                </div>
              </CardContent>
            </Card>

            {/* Learners with Certificates */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Learners with certificates</CardTitle>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Number of learners who have earned completion certificates</p>
                  </TooltipContent>
                </Tooltip>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="text-2xl font-bold">{analyticsData.learnersWithCertificates}</div>
                    <Certificate className="h-4 w-4 text-gray-400" />
                  </div>
                  <TrendIndicator 
                    trend={analyticsData.trends?.learnersWithCertificates} 
                    percentage={analyticsData.percentageChanges?.learnersWithCertificates} 
                  />
                </div>
              </CardContent>
            </Card>

            {/* Average Success Score */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Average success score</CardTitle>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Average percentage score achieved by all learners across assessments</p>
                  </TooltipContent>
                </Tooltip>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="text-2xl font-bold">{analyticsData.averageSuccessScore}%</div>
                    <Target className="h-4 w-4 text-gray-400" />
                  </div>
                  <TrendIndicator 
                    trend={analyticsData.trends?.averageSuccessScore} 
                    percentage={analyticsData.percentageChanges?.averageSuccessScore} 
                  />
                </div>
              </CardContent>
            </Card>
          </>
        ) : null}
      </div>
    </div>
  )
}
