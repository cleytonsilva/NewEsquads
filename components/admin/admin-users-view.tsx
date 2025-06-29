"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"

export function AdminUsersView() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Manage Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">User management interface coming soon...</p>
        </CardContent>
      </Card>
    </div>
  )
}
