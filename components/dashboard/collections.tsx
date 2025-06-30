"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Plus, Search, FolderOpen, Users, BookOpen, BarChart3, Settings, Share2, Eye } from "lucide-react"

interface Collection {
  id: string
  title: string
  description: string
  thumbnail: string
  coursesCount: number
  studentsCount: number
  category: string
  color: string
  createdDate: string
}

interface CollectionAnalytics {
  eligibleLearners: string
  engagedLearners: number
  completedLearners: number
  learnersWithBadges: number
  learnersWithCertificates: number
  averageSuccessScore: number
}

export function Collections() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null)
  const [collections, setCollections] = useState<Collection[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState("newest")

  // Dados mockados como fallback
  const mockCollections: Collection[] = [
    {
      id: "1",
      title: "Blue Squad",
      description: "A comprehensive collection of technology and business courses for professional development.",
      thumbnail: "/placeholder.svg?height=120&width=200",
      coursesCount: 2,
      studentsCount: 15,
      category: "Technology",
      color: "from-blue-600 to-blue-800",
      createdDate: "June 15, 2025",
    },
    {
      id: "2",
      title: "Marketing Mastery",
      description: "Essential marketing courses covering digital marketing, SEO, and social media strategies.",
      thumbnail: "/placeholder.svg?height=120&width=200",
      coursesCount: 4,
      studentsCount: 32,
      category: "Marketing",
      color: "from-green-600 to-green-800",
      createdDate: "June 10, 2025",
    },
    {
      id: "3",
      title: "Data Science Fundamentals",
      description: "Complete data science learning path from basics to advanced analytics and machine learning.",
      thumbnail: "/placeholder.svg?height=120&width=200",
      coursesCount: 6,
      studentsCount: 28,
      category: "Data Science",
      color: "from-purple-600 to-purple-800",
      createdDate: "June 5, 2025",
    },
  ]

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setIsLoading(true)
        const token = localStorage.getItem('auth_token')
        
        if (!token) {
          // Usar dados mockados se não houver token
          setCollections(mockCollections)
          setIsLoading(false)
          return
        }

        const response = await fetch('/api/collections', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          const data = await response.json()
          setCollections(data)
        } else {
          // Fallback para dados mockados em caso de erro
          setCollections(mockCollections)
        }
      } catch (error) {
        console.error('Erro ao buscar coleções:', error)
        // Fallback para dados mockados em caso de erro
        setCollections(mockCollections)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCollections()
  }, [])

  const filteredCollections = collections
    .filter(
      (collection) =>
        collection.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        collection.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime()
        case 'name':
          return a.title.localeCompare(b.title)
        case 'courses':
          return b.coursesCount - a.coursesCount
        case 'newest':
        default:
          return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
      }
    })

  if (selectedCollection) {
    return <CollectionDetail collection={selectedCollection} onBack={() => setSelectedCollection(null)} />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Collections</h1>
          <p className="text-gray-600 mt-1">Organize and manage your curated course collections</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Collection
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search collections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy} disabled={isLoading}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Created Date (Newest)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Created Date (Newest)</SelectItem>
            <SelectItem value="oldest">Created Date (Oldest)</SelectItem>
            <SelectItem value="name">Name (A-Z)</SelectItem>
            <SelectItem value="courses">Most Courses</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Collections Grid */}
      {filteredCollections.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // Esqueletos de carregamento
          Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative">
                <Skeleton className="h-32 w-full" />
                <div className="absolute top-2 right-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
              </div>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 w-8" />
                    </div>
                    <div className="flex items-center space-x-1">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 w-8" />
                    </div>
                  </div>
                  <Skeleton className="h-8 w-16" />
                </div>
                <div className="mt-2">
                  <Skeleton className="h-3 w-20" />
                </div>
              </CardContent>
            </Card>
          ))
        ) : filteredCollections.map((collection) => (
            <Card key={collection.id} className="group hover:shadow-lg transition-all duration-200 cursor-pointer">
              <div className="relative">
                <div
                  className={`h-32 bg-gradient-to-br ${collection.color} rounded-t-lg flex items-center justify-center`}
                >
                  <div className="text-white font-bold text-lg tracking-wider">{collection.title.toUpperCase()}</div>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-white/90 text-gray-900">
                    {collection.coursesCount} COURSES
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {collection.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mt-1">{collection.description}</p>
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    {collection.coursesCount} courses
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {collection.studentsCount} students
                  </div>
                </div>

                <div className="text-xs text-gray-500">Created {collection.createdDate}</div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    onClick={() => setSelectedCollection(collection)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Collection
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center">
              <FolderOpen className="w-12 h-12 text-blue-600" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <Plus className="w-4 h-4 text-white" />
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600">
              No <span className="text-blue-600 font-medium">collections</span> found.
            </p>
            <p className="text-gray-500 text-sm max-w-md">
              Create collections to organize your mini-courses and make them easier to discover and manage.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create your first collection
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

// Collection Detail Component (matches the analytics view from the reference image)
function CollectionDetail({ collection, onBack }: { collection: Collection; onBack: () => void }) {
  const [activeTab, setActiveTab] = useState("mini-courses")
  const [analytics, setAnalytics] = useState<CollectionAnalytics | null>(null)
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setIsLoadingAnalytics(true)
        const token = localStorage.getItem('auth_token')
        
        if (!token) {
          // Usar dados mockados se não houver token
          setAnalytics({
            eligibleLearners: "1.2k",
            engagedLearners: 856,
            completedLearners: 432,
            learnersWithBadges: 298,
            learnersWithCertificates: 156,
            averageSuccessScore: 87.5
          })
          setIsLoadingAnalytics(false)
          return
        }

        const response = await fetch(`/api/collections/${collection.id}/analytics`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          const data = await response.json()
          setAnalytics(data)
        } else {
          // Fallback para dados mockados
          setAnalytics({
            eligibleLearners: "1.2k",
            engagedLearners: 856,
            completedLearners: 432,
            learnersWithBadges: 298,
            learnersWithCertificates: 156,
            averageSuccessScore: 87.5
          })
        }
      } catch (error) {
        console.error('Erro ao buscar analytics da coleção:', error)
        // Fallback para dados mockados
        setAnalytics({
          eligibleLearners: "1.2k",
          engagedLearners: 856,
          completedLearners: 432,
          learnersWithBadges: 298,
          learnersWithCertificates: 156,
          averageSuccessScore: 87.5
        })
      } finally {
        setIsLoadingAnalytics(false)
      }
    }

    fetchAnalytics()
  }, [collection.id])

  const tabs = [
    { id: "mini-courses", label: "Mini courses" },
    { id: "landing-page", label: "Landing page" },
    { id: "settings", label: "Settings" },
    { id: "learners", label: "Learners" },
    { id: "analytics", label: "Analytics" },
    { id: "share", label: "Share" },
  ]

  const analyticsData = analytics ? [
    { label: "Eligible learners", value: analytics.eligibleLearners, icon: Users, color: "text-blue-500" },
    { label: "Engaged learners", value: analytics.engagedLearners.toString(), icon: TrendingUp, color: "text-green-500" },
    { label: "Learners who completed", value: analytics.completedLearners.toString(), icon: CheckCircle, color: "text-purple-500" },
    { label: "Learners with badges", value: analytics.learnersWithBadges.toString(), icon: Award, color: "text-orange-500" },
    { label: "Learners with certificates", value: analytics.learnersWithCertificates.toString(), icon: FileText, color: "text-red-500" },
    { label: "Average success score", value: `${analytics.averageSuccessScore}%`, icon: BarChart3, color: "text-indigo-500" },
  ] : []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-gray-600">
              ← Back
            </Button>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">{collection.title}</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <span>Collections</span>
            <span>•</span>
            <span>{collection.title}</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content based on active tab */}
      {activeTab === "analytics" && (
        <div className="space-y-6">
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
              <Share2 className="w-4 h-4 mr-2" />
              Download Full Report
            </Button>
          </div>

          {/* Analytics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {isLoadingAnalytics ? (
              // Esqueletos de carregamento para analytics
              Array.from({ length: 6 }).map((_, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Skeleton className="h-4 w-24 mb-2" />
                        <Skeleton className="h-8 w-16" />
                      </div>
                      <Skeleton className="h-6 w-6" />
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : analytics ? (
              analyticsData.map((metric, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                      </div>
                      <metric.icon className={`w-6 h-6 ${metric.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : null}
          </div>
        </div>
      )}

      {activeTab === "mini-courses" && (
        <div className="space-y-6">
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses in this collection yet</h3>
            <p className="text-gray-600 mb-6">Add mini-courses to this collection to get started.</p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Courses
            </Button>
          </div>
        </div>
      )}

      {activeTab !== "analytics" && activeTab !== "mini-courses" && (
        <div className="text-center py-12">
          <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">{tabs.find((t) => t.id === activeTab)?.label}</h3>
          <p className="text-gray-600">This section is coming soon.</p>
        </div>
      )}
    </div>
  )
}
