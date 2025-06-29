"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, Info } from "lucide-react"

export function AccountProfile() {
  const [showPassword, setShowPassword] = useState(false)
  const [newPassword, setNewPassword] = useState("")

  const passwordRequirements = [
    { label: "Min. 8 char", met: newPassword.length >= 8 },
    { label: "Number", met: /\d/.test(newPassword) },
    { label: "Lowercase", met: /[a-z]/.test(newPassword) },
    { label: "Uppercase", met: /[A-Z]/.test(newPassword) },
    { label: "!@#$%^&*", met: /[!@#$%^&*]/.test(newPassword) },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1 space-y-8">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-8">Account</h1>
            </div>

            {/* Account Type Section */}
            <Card>
              <CardHeader>
                <CardTitle>Account Type</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Your Account Type:</span>
                  <Badge variant="secondary">Basic</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Mini Course Limit</span>
                  <span className="font-medium">3/3</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">AI Credits (used / monthly limit)</span>
                    <Info className="w-4 h-4 text-gray-400" />
                  </div>
                  <span className="font-medium">44/40</span>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">🔥 Upgrade</Button>
              </CardContent>
            </Card>

            {/* Change Password Section */}
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {passwordRequirements.map((req, index) => (
                    <Badge
                      key={index}
                      variant={req.met ? "default" : "secondary"}
                      className={req.met ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}
                    >
                      {req.label}
                    </Badge>
                  ))}
                </div>

                <Button className="w-full" disabled={!passwordRequirements.every((req) => req.met)}>
                  Change Password
                </Button>

                <Button variant="destructive" className="w-full">
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="w-80">
            <Card>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto">
                    CF
                  </div>
                  <div>
                    <h3 className="font-semibold">Cleyton</h3>
                    <p className="text-sm text-gray-600">Cleyton Ferreira da Silva</p>
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <Button variant="ghost" className="w-full justify-start">
                    My Account
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Custom Domain
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Automations
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    My Account
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Custom Domain
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Automations
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Help center
                  </Button>
                  <hr className="my-4" />
                  <Button variant="ghost" className="w-full justify-start text-red-600">
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
