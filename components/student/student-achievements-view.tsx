"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award } from "lucide-react"

export function StudentAchievementsView() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Achievements</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Your Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Achievements view coming soon...</p>
        </CardContent>
      </Card>
    </div>
  )
}
