// 'use client'

// import { useState, useEffect, createContext, useContext, ReactNode } from 'react'

// interface User {
//   id: string
//   email: string
//   name?: string
//   company?: string
//   phone?: string
// }

// interface AuthContextType {
//   user: User | null
//   token: string | null
//   login: (email: string, password: string) => Promise<void>
//   logout: () => Promise<void>
//   register: (userData: any) => Promise<void>
//   loading: boolean
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// interface AuthProviderProps {
//   children: ReactNode
// }

// export function AuthProvider({ children }: AuthProviderProps) {
//   const [user, setUser] = useState<User | null>(null)
//   const [token, setToken] = useState<string | null>(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         // Check for token in localStorage
//         const storedToken = localStorage.getItem('token')
//         if (storedToken) {
//           setToken(storedToken)
//         }

//         const response = await fetch('/api/auth/me', {
//           headers: storedToken ? {
//             'Authorization': `Bearer ${storedToken}`
//           } : {}
//         })
        
//         if (response.ok) {
//           const data = await response.json()
//           setUser(data.user)
//         }
//       } catch (error) {
//         console.error('Auth check failed:', error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     checkAuth()
//   }, [])

//   const login = async (email: string, password: string) => {
//     setLoading(true)
//     try {
//       const response = await fetch('/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       })

//       if (!response.ok) {
//         const error = await response.json()
//         throw new Error(error.message || 'Login failed')
//       }

//       const data = await response.json()
//       setUser(data.user)
      
//       // Store the token
//       if (data.token) {
//         setToken(data.token)
//         localStorage.setItem('token', data.token)
//       }
//     } finally {
//       setLoading(false)
//     }
//   }

//   const logout = async () => {
//     try {
//       await fetch('/api/auth/logout', { method: 'POST' })
//     } catch (error) {
//       console.error('Logout failed:', error)
//     } finally {
//       setUser(null)
//       setToken(null)
//       localStorage.removeItem('token')
//       if (typeof window !== 'undefined') {
//         window.location.href = '/'
//       }
//     }
//   }

//   const register = async (userData: any) => {
//     setLoading(true)
//     try {
//       const response = await fetch('/api/auth/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(userData),
//       })

//       if (!response.ok) {
//         const error = await response.json()
//         throw new Error(error.message || 'Registration failed')
//       }

//       const data = await response.json()
//       setUser(data.user)
      
//       // Store the token
//       if (data.token) {
//         setToken(data.token)
//         localStorage.setItem('token', data.token)
//       }
//     } finally {
//       setLoading(false)
//     }
//   }

//   const value = {
//     user,
//     token,
//     login,
//     logout,
//     register,
//     loading
//   }

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export function useAuth() {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider')
//   }
//   return context
// }
'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext<any>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // 🔁 fetch current user from cookie
  const fetchMe = async () => {
    try {
      const res = await fetch('/api/auth/me', {
        credentials: 'include', // ✅ important
      })
      const data = await res.json()

      if (res.ok) {
        setUser(data.user)
      } else {
        setUser(null)
      }
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  // 🔓 LOGOUT FUNCTION (THIS IS WHAT YOU ASKED)
  const logout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    })
    setUser(null)
  }

useEffect(() => {
  const controller = new AbortController()

  fetch('/api/auth/me', {
    credentials: 'include',
    signal: controller.signal,
  })
    .then(res => res.ok ? res.json() : null)
    .then(data => setUser(data?.user || null))
    .catch(() => setUser(null))
    .finally(() => setLoading(false))

  return () => controller.abort()
}, [])


  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        refetchUser: fetchMe, // 👈 used after login
        logout,               // 👈 used in dashboard
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
