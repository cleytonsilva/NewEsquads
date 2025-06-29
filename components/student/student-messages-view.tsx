"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare } from "lucide-react"

export function StudentMessagesView() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Your Messages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Messages view coming soon...</p>
        </CardContent>
      </Card>
    </div>
  )
}
