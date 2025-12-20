'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiPlus, FiFilter, FiEdit, FiTrash2, FiLogOut } from 'react-icons/fi'

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
  const [issues, setIssues] = useState<Issue[]>([
    {
      id: '1',
      type: 'cloud-security',
      title: 'Cloud Configuration Issue',
      description: 'Security group misconfiguration detected in AWS',
      priority: 'high',
      status: 'open',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      type: 'vapt',
      title: 'Penetration Test Results',
      description: 'Vulnerability assessment completed for web application',
      priority: 'medium',
      status: 'in-progress',
      createdAt: '2024-01-10'
    },
    {
      id: '3',
      type: 'reteam-assessment',
      title: 'Team Security Assessment',
      description: 'Evaluate security team processes and structure',
      priority: 'low',
      status: 'resolved',
      createdAt: '2024-01-05'
    }
  ])

  const [filterType, setFilterType] = useState<IssueType | 'all'>('all')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newIssue, setNewIssue] = useState({
    type: 'cloud-security' as IssueType,
    title: '',
    description: '',
    priority: 'medium' as Priority,
    status: 'open' as Status
  })

  const filteredIssues = filterType === 'all' 
    ? issues 
    : issues.filter(issue => issue.type === filterType)

  const handleCreateIssue = () => {
    if (!newIssue.title.trim() || !newIssue.description.trim()) return
    
    const issue: Issue = {
      id: Date.now().toString(),
      type: newIssue.type,
      title: newIssue.title,
      description: newIssue.description,
      priority: newIssue.priority,
      status: newIssue.status,
      createdAt: new Date().toISOString().split('T')[0]
    }
    
    setIssues([issue, ...issues])
    setNewIssue({
      type: 'cloud-security',
      title: '',
      description: '',
      priority: 'medium',
      status: 'open'
    })
    setShowCreateForm(false)
  }

  const handleDeleteIssue = (id: string) => {
    setIssues(issues.filter(issue => issue.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back, John Doe</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/profile" 
                className="px-4 py-2 text-gray-700 hover:text-blue-600"
              >
                Profile
              </Link>
              <button className="flex items-center px-4 py-2 text-red-600 hover:text-red-700">
                <FiLogOut className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Create Issue Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiPlus className="mr-2" />
            Create New Issue
          </button>
        </div>

        {/* Create Issue Form */}
        {showCreateForm && (
          <div className="mb-8 bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-4">Create New Issue</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Issue Type *
                </label>
                <select
                  value={newIssue.type}
                  onChange={(e) => setNewIssue({...newIssue, type: e.target.value as IssueType})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="cloud-security">Cloud Security</option>
                  <option value="reteam-assessment">Reteam Assessment</option>
                  <option value="vapt">VAPT</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  value={newIssue.priority}
                  onChange={(e) => setNewIssue({...newIssue, priority: e.target.value as Priority})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={newIssue.title}
                  onChange={(e) => setNewIssue({...newIssue, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Enter issue title"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  value={newIssue.description}
                  onChange={(e) => setNewIssue({...newIssue, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Describe the issue"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateIssue}
                disabled={!newIssue.title.trim() || !newIssue.description.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                Create Issue
              </button>
            </div>
          </div>
        )}

        {/* Filter Section */}
        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <FiFilter className="text-gray-500" />
            <div className="flex space-x-2">
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
                className={`px-4 py-2 rounded-lg ${filterType === 'reteam-assessment' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-700'}`}
              >
                Reteam Assessment
              </button>
              <button
                onClick={() => setFilterType('vapt')}
                className={`px-4 py-2 rounded-lg ${filterType === 'vapt' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-700'}`}
              >
                VAPT
              </button>
            </div>
          </div>
        </div>

        {/* Issues List */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
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
                        <button className="p-1 text-blue-600 hover:text-blue-800">
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
          </div>
        </div>

        {filteredIssues.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No issues found. Create your first issue!</p>
          </div>
        )}
      </main>
    </div>
  )
}