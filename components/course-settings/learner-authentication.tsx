"use client"

import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Shield, Globe, Mail, CreditCard, Users, Smartphone, Settings, FileText, Tag, UserCheck } from "lucide-react"

export function LearnerAuthentication() {
  const [selectedAuth, setSelectedAuth] = useState("public")

  const sidebarItems = [
    { icon: Shield, label: "Learners' authentication", active: true },
    { icon: Globe, label: "Custom domain" },
    { icon: FileText, label: "Certification" },
    { icon: Settings, label: "General" },
    { icon: Tag, label: "White labeling" },
    { icon: UserCheck, label: "Collaboration" },
  ]

  const authOptions = [
    {
      id: "public",
      title: "Public",
      description: "Anyone with the link can access",
      icon: Globe,
    },
    {
      id: "email",
      title: "Email verification",
      description: "Grant access after email entry",
      icon: Mail,
      badge: "Pro",
    },
    {
      id: "paid",
      title: "Paid access",
      description: "Grant access after payment",
      icon: CreditCard,
      badge: "Pro",
    },
    {
      id: "specific",
      title: "Specific Learners",
      description: "Grant access only to invited learners or via automation",
      icon: Users,
      badge: "Pro",
    },
    {
      id: "inapp",
      title: "In-app authentication",
      description: "Grant access to logged in users in your product",
      icon: Smartphone,
      badge: "Elite",
    },
  ]

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar className="w-64">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Settings</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sidebarItems.map((item) => (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton isActive={item.active}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 p-8">
          <div className="max-w-2xl">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">{"Learners' authentication"}</h1>
              <p className="text-gray-600 mt-1">Select who can access and how.</p>
            </div>

            <RadioGroup value={selectedAuth} onValueChange={setSelectedAuth} className="space-y-4">
              {authOptions.map((option) => (
                <div key={option.id} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Label htmlFor={option.id} className="font-medium cursor-pointer">
                        {option.title}
                      </Label>
                      {option.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {option.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                  </div>
                  <option.icon className="w-5 h-5 text-gray-400" />
                </div>
              ))}
            </RadioGroup>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
