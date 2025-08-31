"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  userType: "client" | "gym" | "trainer" | "doctor" | "dietitian" | "business"
  avatar?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
}

interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
  userType: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Check for existing session with Firebase
    // For now, simulate checking for stored user
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem("ugym-user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Auth check failed:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      // TODO: Implement Firebase authentication
      // Mock login for now
      const mockUser: User = {
        id: "1",
        email,
        firstName: "John",
        lastName: "Doe",
        userType: "client",
      }

      setUser(mockUser)
      localStorage.setItem("ugym-user", JSON.stringify(mockUser))
    } catch (error) {
      throw new Error("Login failed")
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData: RegisterData) => {
    setLoading(true)
    try {
      // TODO: Implement Firebase authentication
      // Mock registration for now
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        userType: userData.userType as User["userType"],
      }

      setUser(newUser)
      localStorage.setItem("ugym-user", JSON.stringify(newUser))
    } catch (error) {
      throw new Error("Registration failed")
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      // TODO: Implement Firebase sign out
      setUser(null)
      localStorage.removeItem("ugym-user")
    } catch (error) {
      throw new Error("Logout failed")
    }
  }

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return

    try {
      // TODO: Implement Firebase profile update
      const updatedUser = { ...user, ...data }
      setUser(updatedUser)
      localStorage.setItem("ugym-user", JSON.stringify(updatedUser))
    } catch (error) {
      throw new Error("Profile update failed")
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
