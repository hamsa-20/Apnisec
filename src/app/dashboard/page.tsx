'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
    fetchIssues();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch('/api/auth/me');
      const data = await response.json();
      if (data.success) {
        setUser(data.data);
      } else {
        router.push('/login');
      }
    } catch (error) {
      router.push('/login');
    }
  };

  const fetchIssues = async () => {
    try {
      const response = await fetch('/api/issues');
      const data = await response.json();
      if (data.success) {
        setIssues(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch issues:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-700">ApniSec Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, {user?.name || user?.email}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-6">Your Security Issues</h2>
              
              {issues.length === 0 ? (
                <p className="text-gray-500">No issues created yet.</p>
              ) : (
                <div className="space-y-4">
                  {issues.map((issue) => (
                    <div key={issue.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{issue.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{issue.description}</p>
                        </div>
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          {issue.type}
                        </span>
                      </div>
                      <div className="flex items-center mt-4 text-sm text-gray-500">
                        <span className="mr-4">Priority: {issue.priority}</span>
                        <span>Status: {issue.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
              <button
                onClick={() => router.push('/profile')}
                className="w-full mb-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Update Profile
              </button>
              <button
                onClick={() => {/* Add create issue modal */}}
                className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Create New Issue
              </button>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-4">Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Total Issues</span>
                  <span className="font-bold">{issues.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Open Issues</span>
                  <span className="font-bold">
                    {issues.filter(i => i.status === 'OPEN').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>High Priority</span>
                  <span className="font-bold">
                    {issues.filter(i => i.priority === 'HIGH').length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}