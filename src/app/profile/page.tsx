'use client'

import { useState } from 'react'
import { FiSave, FiEdit } from 'react-icons/fi'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    company: 'Tech Corp Inc',
    phone: '+1 (555) 123-4567',
    role: 'Security Analyst'
  })

  const handleSave = () => {
    setIsEditing(false)
    // In real app, save to API here
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 text-gray-700 hover:text-blue-600"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow p-6">
            {/* Profile Header */}
            <div className="flex items-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                JD
              </div>
              <div className="ml-6">
                <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                <p className="text-gray-600">{profile.email}</p>
                <p className="text-sm text-gray-500">{profile.role} • {profile.company}</p>
              </div>
            </div>

            {/* Profile Form */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                ) : (
                  <div className="px-3 py-2 border border-transparent rounded-lg bg-gray-50">
                    {profile.name}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                ) : (
                  <div className="px-3 py-2 border border-transparent rounded-lg bg-gray-50">
                    {profile.email}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.company}
                    onChange={(e) => setProfile({...profile, company: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                ) : (
                  <div className="px-3 py-2 border border-transparent rounded-lg bg-gray-50">
                    {profile.company}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                ) : (
                  <div className="px-3 py-2 border border-transparent rounded-lg bg-gray-50">
                    {profile.phone}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                {isEditing ? (
                  <select
                    value={profile.role}
                    onChange={(e) => setProfile({...profile, role: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option>Security Analyst</option>
                    <option>Security Engineer</option>
                    <option>Security Manager</option>
                    <option>CTO</option>
                    <option>Other</option>
                  </select>
                ) : (
                  <div className="px-3 py-2 border border-transparent rounded-lg bg-gray-50">
                    {profile.role}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-3">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <FiSave className="mr-2" />
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <FiEdit className="mr-2" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Security Section */}
          <div className="mt-6 bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Security</h3>
            <div className="space-y-4">
              <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="font-medium text-gray-900">Change Password</div>
                <div className="text-sm text-gray-500">Update your password regularly</div>
              </button>
              <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="font-medium text-gray-900">Two-Factor Authentication</div>
                <div className="text-sm text-gray-500">Add an extra layer of security</div>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}