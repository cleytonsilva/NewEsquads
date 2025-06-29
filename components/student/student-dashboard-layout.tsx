"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Home, BookOpen, Calendar, Award, MessageSquare, Settings, Bell, Search, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { StudentDashboardHome } from "./student-dashboard-home"
import { StudentCoursesView } from "./student-courses-view"
import { StudentCalendarView } from "./student-calendar-view"
import { StudentAchievementsView } from "./student-achievements-view"
import { StudentMessagesView } from "./student-messages-view"
import { StudentSettingsView } from "./student-settings-view"

export function StudentDashboardLayout() {
  const { user, logout } = useAuth()
  const [activeView, setActiveView] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const navigation = [
    { id: "dashboard", name: "Dashboard", icon: Home },
    { id: "courses", name: "My Courses", icon: BookOpen },
    { id: "calendar", name: "Calendar", icon: Calendar },
    { id: "achievements", name: "Achievements", icon: Award },
    { id: "messages", name: "Messages", icon: MessageSquare, badge: 3 },
    { id: "settings", name: "Settings", icon: Settings },
  ]

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <StudentDashboardHome />
      case "courses":
        return <StudentCoursesView />
      case "calendar":
        return <StudentCalendarView />
      case "achievements":
        return <StudentAchievementsView />
      case "messages":
        return <StudentMessagesView />
      case "settings":
        return <StudentSettingsView />
      default:
        return <StudentDashboardHome />
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
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            {sidebarOpen && <span className="ml-2 font-semibold text-gray-900">Esquads</span>}
          </div>

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
                <AvatarFallback className="bg-blue-600 text-white text-sm">{user?.avatar}</AvatarFallback>
              </Avatar>
              {sidebarOpen && (
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">Student</p>
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
                <Input placeholder="Search courses, assignments..." className="pl-10 w-80" />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 w-2 h-2 p-0 bg-red-500"></Badge>
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-blue-600 text-white text-sm">{user?.avatar}</AvatarFallback>
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
