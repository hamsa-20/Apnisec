'use client'

import { useEffect, useState } from 'react'
import { FiSave, FiEdit } from 'react-icons/fi'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    role: '',
  })

  /* ================= LOAD USER ================= */

  useEffect(() => {
    fetch('/api/auth/me', { credentials: 'include' })
      .then(res => {
        if (!res.ok) throw new Error('Not authenticated')
        return res.json()
      })
      .then(data => {
        setProfile(prev => ({
          ...prev,
          name: data.user.name || '',
          email: data.user.email || '',
          company: data.user.company || '',
          phone: data.user.phone || '',
          role: data.user.role || '',
        }))
      })
      .catch(() => {
        router.push('/login')
      })
      .finally(() => setLoading(false))
  }, [router])

  /* ================= SAVE PROFILE ================= */

  const handleSave = async () => {
    await fetch('/api/profile', {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: profile.name,
        company: profile.company,
        phone: profile.phone,
        role: profile.role,
      }),
    })

    setIsEditing(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin h-10 w-10 border-b-2 border-blue-600 rounded-full" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* HEADER */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Profile Settings
          </h1>
          <button
            onClick={() => router.back()}
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600"
          >
            ← Back to Dashboard
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* PROFILE CARD */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <div className="flex items-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {profile.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <div className="ml-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {profile.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {profile.email}
                </p>
                <p className="text-sm text-gray-500">
                  {profile.role} • {profile.company}
                </p>
              </div>
            </div>

            {/* FORM */}
            <div className="space-y-5">
              {[
                { label: 'Full Name', key: 'name', type: 'text' },
                { label: 'Company', key: 'company', type: 'text' },
                { label: 'Phone', key: 'phone', type: 'tel' },
              ].map(({ label, key, type }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {label}
                  </label>
                  {isEditing ? (
                    <input
                      type={type}
                      value={(profile as any)[key]}
                      onChange={e =>
                        setProfile({ ...profile, [key]: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                    />
                  ) : (
                    <div className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                      {(profile as any)[key]}
                    </div>
                  )}
                </div>
              ))}

              {/* ROLE */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Role
                </label>
                {isEditing ? (
                  <select
                    value={profile.role}
                    onChange={e =>
                      setProfile({ ...profile, role: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
                  >
                    <option>Security Analyst</option>
                    <option>Security Engineer</option>
                    <option>Security Manager</option>
                    <option>CTO</option>
                    <option>Other</option>
                  </select>
                ) : (
                  <div className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                    {profile.role}
                  </div>
                )}
              </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                  >
                    <FiSave className="mr-2" />
                    Save
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  <FiEdit className="mr-2" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* SECURITY */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Security</h3>
            <button className="w-full text-left px-4 py-3 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-700">
              Change Password
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
