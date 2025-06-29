"use client"

import { useAuth } from "@/contexts/auth-context"
import { StudentDashboardLayout } from "@/components/student/student-dashboard-layout"
import { AdminDashboardLayout } from "@/components/admin/admin-dashboard-layout"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { RoleSwitcher } from "@/components/role-switcher"

export function DashboardRouter() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!user) {
    return <div>Please log in</div>
  }

  return (
    <div className="min-h-screen">
      {/* Demo Role Switcher - Remove in production */}
      <RoleSwitcher />

      {user.role === "student" ? <StudentDashboardLayout /> : <AdminDashboardLayout />}
    </div>
  )
}
