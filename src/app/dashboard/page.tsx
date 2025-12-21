'use client'
export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiPlus, FiFilter, FiEdit, FiTrash2, FiLogOut, FiRefreshCw, FiSearch } from 'react-icons/fi'
import { useAuth } from '@/lib/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { IssueForm } from '@/lib/components/dashboard/IssueForm'
import { IssueList } from '@/lib/components/dashboard/IssueList'

// Keep your existing types
type IssueType = 'cloud-security' | 'reteam-assessment' | 'vapt'
type Priority = 'low' | 'medium' | 'high'
type Status = 'open' | 'in-progress' | 'resolved'

interface Issue {
  id: string
  type: IssueType
  title: string
  description: string
  priority: Priority
  status: Status
  createdAt: string
}

export default function DashboardPage() {
  // Fix: Prevent useAuth from running during build
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  // Show loading during build/prerender
  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }
  
  // Now safe to use useAuth (only runs on client)
  const { user, loading, logout } = useAuth()
  const router = useRouter()
  
  // Replace mock data with real API data
  const [issues, setIssues] = useState<Issue[]>([])
  const [filterType, setFilterType] = useState<IssueType | 'all'>('all')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  // Fetch issues from API
  const fetchIssues = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Get token from localStorage or auth context
      const token = localStorage.getItem('token') || ''
      
      // Build URL with filter
      let url = '/api/issues'
      if (filterType !== 'all') {
        // Convert frontend type to backend type
        const backendType = filterType === 'cloud-security' ? 'CLOUD_SECURITY' :
                          filterType === 'reteam-assessment' ? 'RETEAM_ASSESSMENT' : 'VAPT'
        url += `?type=${backendType}`
      }
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      
      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch issues')
      }
      
      // Transform backend data to frontend format
      const transformedIssues = (result.data || []).map((issue: any) => ({
        id: issue.id,
        type: issue.type.toLowerCase().replace('_', '-') as IssueType,
        title: issue.title,
        description: issue.description,
        priority: (issue.priority || 'MEDIUM').toLowerCase() as Priority,
        status: (issue.status || 'OPEN').toLowerCase().replace('_', '-') as Status,
        createdAt: new Date(issue.createdAt).toISOString().split('T')[0]
      }))
      
      setIssues(transformedIssues)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
      console.error('Error fetching issues:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch issues on component mount and when filter changes
  useEffect(() => {
    if (user) {
      fetchIssues()
    }
  }, [user, filterType])

  const handleDeleteIssue = async (id: string) => {
    if (!confirm('Are you sure you want to delete this issue?')) return
    
    try {
      const token = localStorage.getItem('token') || ''
      
      const response = await fetch(`/api/issues/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      
      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to delete issue')
      }
      
      // Refresh the list
      fetchIssues()
    } catch (err: any) {
      alert(`Failed to delete issue: ${err.message}`)
    }
  }

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  const filteredIssues = filterType === 'all' 
    ? issues 
    : issues.filter(issue => issue.type === filterType)

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user.name || user.email}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/profile" 
                className="px-4 py-2 text-gray-700 hover:text-blue-600"
              >
                Profile
              </Link>
              <button 
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-red-600 hover:text-red-700"
              >
                <FiLogOut className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Total Issues</h3>
            <p className="text-2xl font-bold">{issues.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Cloud Security</h3>
            <p className="text-2xl font-bold text-blue-600">
              {issues.filter(i => i.type === 'cloud-security').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Red Team</h3>
            <p className="text-2xl font-bold text-purple-600">
              {issues.filter(i => i.type === 'reteam-assessment').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">VAPT</h3>
            <p className="text-2xl font-bold text-red-600">
              {issues.filter(i => i.type === 'vapt').length}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create Issue Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Create New Issue</h2>
                <button
                  onClick={() => setShowCreateForm(!showCreateForm)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FiPlus className="mr-2" />
                  {showCreateForm ? 'Hide Form' : 'New Issue'}
                </button>
              </div>
              
              {showCreateForm ? (
                <div className="bg-white p-6 rounded-xl shadow">
                  {/* Use your IssueForm component */}
                  <IssueForm onSuccess={() => {
                    setShowCreateForm(false)
                    fetchIssues() // Refresh list
                  }} />
                </div>
              ) : (
                <div className="bg-white p-6 rounded-xl shadow">
                  <p className="text-gray-600 mb-4">Quickly report security issues, vulnerabilities, or assessment findings.</p>
                  <button
                    onClick={() => setShowCreateForm(true)}
                    className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <FiPlus className="mr-2" />
                    Create New Issue
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Issues List Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow overflow-hidden">
              {/* Header with filters */}
              <div className="p-6 border-b">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <h2 className="text-xl font-bold text-gray-900">Your Issues</h2>
                  
                  <div className="flex items-center space-x-4">
                    {/* Search */}
                    <div className="relative">
                      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search issues..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    {/* Refresh */}
                    <button
                      onClick={fetchIssues}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg"
                      title="Refresh"
                    >
                      <FiRefreshCw />
                    </button>
                  </div>
                </div>
                
                {/* Filter buttons */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => setFilterType('all')}
                    className={`px-4 py-2 rounded-lg ${filterType === 'all' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-700'}`}
                  >
                    All Issues
                  </button>
                  <button
                    onClick={() => setFilterType('cloud-security')}
                    className={`px-4 py-2 rounded-lg ${filterType === 'cloud-security' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-700'}`}
                  >
                    Cloud Security
                  </button>
                  <button
                    onClick={() => setFilterType('reteam-assessment')}
                    className={`px-4 py-2 rounded-lg ${filterType === 'reteam-assessment' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-700'}`}
                  >
                    Reteam Assessment
                  </button>
                  <button
                    onClick={() => setFilterType('vapt')}
                    className={`px-4 py-2 rounded-lg ${filterType === 'vapt' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-700'}`}
                  >
                    VAPT
                  </button>
                </div>
              </div>
              
              {/* Issues Table */}
              <div className="overflow-x-auto">
                {error ? (
                  <div className="p-6 text-center text-red-600">
                    Error: {error}
                    <button
                      onClick={fetchIssues}
                      className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Retry
                    </button>
                  </div>
                ) : filteredIssues.length === 0 ? (
                  <div className="p-12 text-center">
                    <p className="text-gray-500 text-lg">
                      {issues.length === 0 ? 'No issues found. Create your first issue!' : 'No issues match your filters.'}
                    </p>
                  </div>
                ) : (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredIssues.map((issue) => (
                        <tr key={issue.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              issue.type === 'cloud-security' ? 'bg-blue-100 text-blue-800' :
                              issue.type === 'reteam-assessment' ? 'bg-green-100 text-green-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {issue.type.replace('-', ' ').toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-medium text-gray-900">{issue.title}</div>
                              <div className="text-sm text-gray-500 truncate max-w-xs">{issue.description}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              issue.priority === 'high' ? 'bg-red-100 text-red-800' :
                              issue.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {issue.priority.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              issue.status === 'open' ? 'bg-red-100 text-red-800' :
                              issue.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {issue.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">{issue.createdAt}</td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => {/* Implement edit */}}
                                className="p-1 text-blue-600 hover:text-blue-800"
                              >
                                <FiEdit />
                              </button>
                              <button 
                                onClick={() => handleDeleteIssue(issue.id)}
                                className="p-1 text-red-600 hover:text-red-800"
                              >
                                <FiTrash2 />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}