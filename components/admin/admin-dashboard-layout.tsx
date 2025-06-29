"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  LayoutDashboard,
  Users,
  BookOpen,
  BarChart3,
  Settings,
  Plus,
  Bell,
  Search,
  LogOut,
  Shield,
  FileText,
  MessageSquare,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { AdminDashboardHome } from "./admin-dashboard-home"
import { AdminUsersView } from "./admin-users-view"
import { AdminCoursesView } from "./admin-courses-view"
import { AdminAnalyticsView } from "./admin-analytics-view"
import { AdminSettingsView } from "./admin-settings-view"
import { AdminContentView } from "./admin-content-view"

export function AdminDashboardLayout() {
  const { user, logout } = useAuth()
  const [activeView, setActiveView] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const navigation = [
    { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
    { id: "users", name: "User Management", icon: Users, badge: 12 },
    { id: "courses", name: "Course Management", icon: BookOpen },
    { id: "content", name: "Content Creation", icon: FileText },
    { id: "analytics", name: "Analytics", icon: BarChart3 },
    { id: "messages", name: "Messages", icon: MessageSquare, badge: 5 },
    { id: "settings", name: "System Settings", icon: Settings },
  ]

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <AdminDashboardHome />
      case "users":
        return <AdminUsersView />
      case "courses":
        return <AdminCoursesView />
      case "content":
        return <AdminContentView />
      case "analytics":
        return <AdminAnalyticsView />
      case "settings":
        return <AdminSettingsView />
      default:
        return <AdminDashboardHome />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={cn("bg-white border-r border-gray-200 transition-all duration-300", sidebarOpen ? "w-64" : "w-16")}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 border-b border-gray-200">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            {sidebarOpen && <span className="ml-2 font-semibold text-gray-900">Admin Panel</span>}
          </div>

          {/* Quick Actions */}
          {sidebarOpen && (
            <div className="p-4 border-b border-gray-200">
              <Button className="w-full bg-blue-600 hover:bg-blue-700" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Create Course
              </Button>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={cn(
                  "w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  activeView === item.id
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                )}
              >
                <item.icon className="w-5 h-5" />
                {sidebarOpen && (
                  <>
                    <span className="ml-3">{item.name}</span>
                    {item.badge && <Badge className="ml-auto bg-red-500 text-white text-xs">{item.badge}</Badge>}
                  </>
                )}
              </button>
            ))}
          </nav>

          {/* User Profile */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-purple-600 text-white text-sm">{user?.avatar}</AvatarFallback>
              </Avatar>
              {sidebarOpen && (
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              )}
            </div>
            {sidebarOpen && (
              <Button variant="ghost" size="sm" onClick={logout} className="w-full mt-2 justify-start text-gray-600">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)}>
                ☰
              </Button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Search users, courses, content..." className="pl-10 w-80" />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 w-2 h-2 p-0 bg-red-500"></Badge>
              </Button>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Quick Add
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-purple-600 text-white text-sm">{user?.avatar}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">{renderContent()}</main>
      </div>
    </div>
  )
}
