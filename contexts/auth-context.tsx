"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type UserRole = "student" | "administrator"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  joinDate: string
  lastLogin: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  switchRole: (role: UserRole) => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Mock user data - in real app, this would come from your auth service
  const mockUsers = {
    student: {
      id: "student-1",
      name: "Cleyton Ferreira",
      email: "cleyton@student.com",
      role: "student" as UserRole,
      avatar: "CF",
      joinDate: "2024-01-15",
      lastLogin: "2025-01-18",
    },
    administrator: {
      id: "admin-1",
      name: "Sarah Johnson",
      email: "sarah@admin.com",
      role: "administrator" as UserRole,
      avatar: "SJ",
      joinDate: "2023-06-10",
      lastLogin: "2025-01-18",
    },
  }

  useEffect(() => {
    // Simulate loading user from localStorage or API
    const savedRole = localStorage.getItem("userRole") as UserRole
    if (savedRole && mockUsers[savedRole]) {
      setUser(mockUsers[savedRole])
    } else {
      // Default to student for demo
      setUser(mockUsers.student)
      localStorage.setItem("userRole", "student")
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    // Mock login logic
    const role = email.includes("admin") ? "administrator" : "student"
    setUser(mockUsers[role])
    localStorage.setItem("userRole", role)
    setIsLoading(false)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("userRole")
  }

  const switchRole = (role: UserRole) => {
    setUser(mockUsers[role])
    localStorage.setItem("userRole", role)
  }

  return <AuthContext.Provider value={{ user, login, logout, switchRole, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
