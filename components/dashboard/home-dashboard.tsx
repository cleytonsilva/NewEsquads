"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, HelpCircle, Youtube, Linkedin, Calendar } from "lucide-react"
import { useState } from "react"
import { AICourseCreator } from "../course-creation/ai-course-creator"

export function HomeDashboard() {
  const [showAICreator, setShowAICreator] = useState(false)

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <span className="text-2xl">👋</span>
            Hi, Cleyton
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recently Created Mini Courses */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900">Recently created mini courses</h2>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                More
              </Button>
            </div>

            <Card className="p-8 text-center">
              <div className="space-y-4">
                <p className="text-gray-600">Your first mini-course is waiting to be created.</p>
                <p className="text-blue-600 font-medium">{"Let's get started today!"}</p>
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowAICreator(true)}>
                  Create mini course
                </Button>
              </div>
            </Card>
          </div>

          {/* Recently Created Collections */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900">Recently created collections</h2>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                More
              </Button>
            </div>

            <Card className="p-6">
              <div className="flex items-center space-x-4">
                <div className="relative w-24 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white font-bold text-xs">BLUE SQUAD</div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="text-xs">
                      2 MINI COURSES
                    </Badge>
                  </div>
                  <h3 className="font-medium text-gray-900">Blue Squad</h3>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Knowledge Base */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Knowledge base</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                <div className="text-sm">
                  <div className="text-gray-900">Customizing the Landing Page</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ExternalLink className="w-4 h-4 text-gray-400 mt-0.5" />
                <div className="text-sm">
                  <div className="text-gray-900">Customizing Links with Custom Domain (CNAME)</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <HelpCircle className="w-4 h-4 text-gray-400 mt-0.5" />
                <div className="text-sm">
                  <div className="text-gray-900">How do the AI credits work?</div>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="mt-4">
              More resources
            </Button>
          </div>

          {/* Questions or Feedback */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Have questions or feedback?</h3>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-4 h-4 text-gray-400 mt-0.5">💬</div>
              <div className="text-sm text-gray-600">We shape our roadmap with your feedback and questions.</div>
            </div>
            <Button variant="outline" size="sm">
              Let us know
            </Button>
          </div>

          {/* What's New */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">{"What's new"}</h3>
            <div className="flex items-start gap-3 mb-4">
              <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
              <div className="text-sm text-gray-600">Check latest product updates, new features, and improvements.</div>
            </div>
            <Button variant="outline" size="sm">
              Learn more
            </Button>
          </div>

          {/* Connect with Us */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Connect with us!</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Youtube className="w-4 h-4 text-red-600" />
                <div className="text-sm text-gray-900">Learn with our video guides</div>
              </div>
              <div className="flex items-center gap-3">
                <Linkedin className="w-4 h-4 text-blue-600" />
                <div className="text-sm text-gray-900">Stay connected with our community</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showAICreator && (
        <AICourseCreator
          onClose={() => setShowAICreator(false)}
          onCourseCreated={(courseData) => {
            console.log("Course created:", courseData)
            setShowAICreator(false)
          }}
        />
      )}
    </div>
  )
}
