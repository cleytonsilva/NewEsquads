"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"

export function StudentCalendarView() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Academic Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Calendar view coming soon...</p>
        </CardContent>
      </Card>
    </div>
  )
}
