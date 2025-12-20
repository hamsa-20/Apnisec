'use client'

import { useState, useEffect, createContext, useContext, ReactNode } from 'react'

interface User {
  id: string
  email: string
  name?: string
  company?: string
  phone?: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  register: (userData: any) => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check for token in localStorage
        const storedToken = localStorage.getItem('token')
        if (storedToken) {
          setToken(storedToken)
        }

        const response = await fetch('/api/auth/me', {
          headers: storedToken ? {
            'Authorization': `Bearer ${storedToken}`
          } : {}
        })
        
        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
        }
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Login failed')
      }

      const data = await response.json()
      setUser(data.user)
      
      // Store the token
      if (data.token) {
        setToken(data.token)
        localStorage.setItem('token', data.token)
      }
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      setUser(null)
      setToken(null)
      localStorage.removeItem('token')
      if (typeof window !== 'undefined') {
        window.location.href = '/'
      }
    }
  }

  const register = async (userData: any) => {
    setLoading(true)
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Registration failed')
      }

      const data = await response.json()
      setUser(data.user)
      
      // Store the token
      if (data.token) {
        setToken(data.token)
        localStorage.setItem('token', data.token)
      }
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    token,
    login,
    logout,
    register,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}