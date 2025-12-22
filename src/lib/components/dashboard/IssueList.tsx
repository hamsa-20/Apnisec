// 'use client';

// import { useState, useEffect } from 'react';
// import { Button } from '@/lib/components/ui/button';
// import { Input } from '@/lib/components/ui/input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/lib/components/ui/select';
// import { Search, Filter, RefreshCw } from 'lucide-react';
// import { useAuth } from '@/lib/hooks/useAuth';

// interface Issue {
//   id: string;
//   type: string;
//   title: string;
//   description: string;
//   priority: string;
//   status: string;
//   createdAt: string;
// }

// export function IssueList() {
//   const [issues, setIssues] = useState<Issue[]>([]);
//   const [filteredIssues, setFilteredIssues] = useState<Issue[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterType, setFilterType] = useState<string>('all');
//   const [filterStatus, setFilterStatus] = useState<string>('all');
  
//   // Get user from auth, but token from localStorage
//   const { user } = useAuth();
//   const [token, setToken] = useState<string>('');

//   useEffect(() => {
//     // Get token from localStorage
//     if (typeof window !== 'undefined') {
//       const storedToken = localStorage.getItem('token') || '';
//       setToken(storedToken);
//     }
//   }, []);

//   const fetchIssues = async () => {
//     if (!token) {
//       setError('Please login to view issues');
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     setError(null);
    
//     try {
//       const url = new URL('/api/issues', window.location.origin);
//       if (filterType !== 'all') {
//         url.searchParams.set('type', filterType);
//       }
      
//       const response = await fetch(url.toString(), {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
      
//       const result = await response.json();
      
//       if (!response.ok) {
//         throw new Error(result.message || 'Failed to fetch issues');
//       }
      
//       setIssues(result.data || []);
//       setFilteredIssues(result.data || []);
//     } catch (err: any) {
//       setError(err.message || 'Something went wrong');
//       console.error('Error fetching issues:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       fetchIssues();
//     }
//   }, [token, filterType]);

//   useEffect(() => {
//     let filtered = issues;
    
//     // Apply search filter
//     if (searchTerm) {
//       filtered = filtered.filter(issue =>
//         issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         issue.description.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
    
//     // Apply status filter
//     if (filterStatus !== 'all') {
//       filtered = filtered.filter(issue => issue.status === filterStatus);
//     }
    
//     setFilteredIssues(filtered);
//   }, [searchTerm, filterStatus, issues]);

//   const handleDelete = async (issueId: string) => {
//     if (!confirm('Are you sure you want to delete this issue?')) return;
    
//     if (!token) {
//       alert('Please login to delete issues');
//       return;
//     }

//     try {
//       const response = await fetch(`/api/issues/${issueId}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
      
//       const result = await response.json();
      
//       if (!response.ok) {
//         throw new Error(result.message || 'Failed to delete issue');
//       }
      
//       // Refresh the list
//       fetchIssues();
//     } catch (err: any) {
//       alert(`Failed to delete issue: ${err.message}`);
//     }
//   };

//   const handleEdit = (issue: Issue) => {
//     alert('Edit functionality to be implemented');
//   };

//   const handleView = (issue: Issue) => {
//     alert(`Viewing issue: ${issue.title}`);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-12">
//         <div className="text-center">
//           <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
//           <p className="text-gray-600">Loading issues...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//         <p className="text-red-600 font-medium">Error: {error}</p>
//         <Button
//           onClick={fetchIssues}
//           variant="outline"
//           size="sm"
//           className="mt-2"
//         >
//           Try Again
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Filters */}
//       <div className="bg-white rounded-lg border p-4">
//         <div className="flex flex-col md:flex-row md:items-center gap-4">
//           {/* Search */}
//           <div className="flex-1">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <Input
//                 placeholder="Search issues..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//           </div>
          
//           {/* Type Filter */}
//           <div className="w-full md:w-48">
//             <Select value={filterType} onValueChange={setFilterType}>
//               <SelectTrigger>
//                 <Filter className="h-4 w-4 mr-2" />
//                 <SelectValue placeholder="Filter by type" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Types</SelectItem>
//                 <SelectItem value="CLOUD_SECURITY">Cloud Security</SelectItem>
//                 <SelectItem value="RETEAM_ASSESSMENT">Red Team Assessment</SelectItem>
//                 <SelectItem value="VAPT">VAPT</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
          
//           {/* Status Filter */}
//           <div className="w-full md:w-48">
//             <Select value={filterStatus} onValueChange={setFilterStatus}>
//               <SelectTrigger>
//                 <Filter className="h-4 w-4 mr-2" />
//                 <SelectValue placeholder="Filter by status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Status</SelectItem>
//                 <SelectItem value="OPEN">Open</SelectItem>
//                 <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
//                 <SelectItem value="RESOLVED">Resolved</SelectItem>
//                 <SelectItem value="CLOSED">Closed</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
          
//           {/* Refresh Button */}
//           <Button
//             onClick={fetchIssues}
//             variant="outline"
//             className="whitespace-nowrap"
//             disabled={!token}
//           >
//             <RefreshCw className="h-4 w-4 mr-2" />
//             Refresh
//           </Button>
//         </div>
//       </div>
      
//       {/* Issues Table */}
//       {filteredIssues.length === 0 ? (
//         <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
//           <p className="text-gray-500 text-lg font-medium">
//             {issues.length === 0 ? 'No issues found. Create your first issue!' : 'No issues match your filters.'}
//           </p>
//         </div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {filteredIssues.map((issue) => (
//                 <tr key={issue.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4">
//                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                       issue.type === 'CLOUD_SECURITY' ? 'bg-blue-100 text-blue-800' :
//                       issue.type === 'RETEAM_ASSESSMENT' ? 'bg-green-100 text-green-800' :
//                       'bg-purple-100 text-purple-800'
//                     }`}>
//                       {issue.type.replace('_', ' ')}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div>
//                       <div className="font-medium text-gray-900">{issue.title}</div>
//                       <div className="text-sm text-gray-500 truncate max-w-xs">{issue.description}</div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                       issue.priority === 'HIGH' || issue.priority === 'CRITICAL' ? 'bg-red-100 text-red-800' :
//                       issue.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
//                       'bg-green-100 text-green-800'
//                     }`}>
//                       {issue.priority}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                       issue.status === 'OPEN' ? 'bg-red-100 text-red-800' :
//                       issue.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800' :
//                       'bg-green-100 text-green-800'
//                     }`}>
//                       {issue.status.replace('_', ' ')}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-500">
//                     {new Date(issue.createdAt).toLocaleDateString()}
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex space-x-2">
//                       <button 
//                         onClick={() => handleView(issue)}
//                         className="text-blue-600 hover:text-blue-800 text-sm"
//                       >
//                         View
//                       </button>
//                       <button 
//                         onClick={() => handleEdit(issue)}
//                         className="text-blue-600 hover:text-blue-800 text-sm"
//                       >
//                         Edit
//                       </button>
//                       <button 
//                         onClick={() => handleDelete(issue.id)}
//                         className="text-red-600 hover:text-red-800 text-sm"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/lib/components/ui/button'
import { Input } from '@/lib/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/lib/components/ui/select'
import { Search, Filter, RefreshCw } from 'lucide-react'

/* ================= TYPES ================= */

interface Issue {
  id: string
  type: string
  title: string
  description: string
  priority: string
  status: string
  createdAt: string
}

interface IssueListProps {
  issues: Issue[]
  onRefresh?: () => void
  onDelete?: (id: string) => void
  onEdit?: (issue: Issue) => void
  onView?: (issue: Issue) => void
}

/* ================= COMPONENT ================= */

export function IssueList({
  issues,
  onRefresh,
  onDelete,
  onEdit,
  onView,
}: IssueListProps) {
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>(issues)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  /* ================= FILTER LOGIC ================= */

  useEffect(() => {
    let filtered = issues

    if (searchTerm) {
      filtered = filtered.filter(
        issue =>
          issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          issue.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(issue => issue.type === filterType)
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(issue => issue.status === filterStatus)
    }

    setFilteredIssues(filtered)
  }, [searchTerm, filterType, filterStatus, issues])

  /* ================= UI ================= */

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search issues..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 bg-white dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
            />
          </div>

          {/* Type */}
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-48 bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-900 dark:border-gray-700">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="CLOUD_SECURITY">Cloud Security</SelectItem>
              <SelectItem value="RETEAM_ASSESSMENT">Red Team</SelectItem>
              <SelectItem value="VAPT">VAPT</SelectItem>
            </SelectContent>
          </Select>

          {/* Status */}
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48 bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-900 dark:border-gray-700">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="OPEN">Open</SelectItem>
              <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
              <SelectItem value="RESOLVED">Resolved</SelectItem>
              <SelectItem value="CLOSED">Closed</SelectItem>
            </SelectContent>
          </Select>

          {/* Refresh */}
          {onRefresh && (
            <Button onClick={onRefresh} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      {filteredIssues.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed rounded-lg text-gray-500 dark:text-gray-400 dark:border-gray-700">
          No issues found.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Priority</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Created</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredIssues.map(issue => (
                <tr
                  key={issue.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  <td className="px-6 py-4 dark:text-gray-100">
                    {issue.type.replace('_', ' ')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium dark:text-gray-100">
                      {issue.title}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                      {issue.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 dark:text-gray-100">{issue.priority}</td>
                  <td className="px-6 py-4 dark:text-gray-100">
                    {issue.status.replace('_', ' ')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(issue.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 space-x-3 text-sm">
                    {onView && (
                      <button onClick={() => onView(issue)} className="text-blue-600">
                        View
                      </button>
                    )}
                    {onEdit && (
                      <button onClick={() => onEdit(issue)} className="text-blue-600">
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(issue.id)}
                        className="text-red-600"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
