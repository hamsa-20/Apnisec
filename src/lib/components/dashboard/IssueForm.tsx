// 'use client';

// import { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { Button } from '@/lib/components/ui/button';
// import { Input } from '@/lib/components/ui/input';
// import { Textarea } from '@/lib/components/ui/textarea';
// import { Label } from '@/lib/components/ui/label';
// import { 
//   Select, 
//   SelectContent, 
//   SelectItem, 
//   SelectTrigger, 
//   SelectValue 
// } from '@/lib/components/ui/select';
// import { Card, CardContent, CardHeader, CardTitle } from '@/lib/components/ui/card';
// import { AlertCircle, CheckCircle } from 'lucide-react';

// // Define the form schema with Zod
// const issueSchema = z.object({
//   type: z.enum(['CLOUD_SECURITY', 'RETEAM_ASSESSMENT', 'VAPT']),
//   title: z.string()
//     .min(3, 'Title must be at least 3 characters')
//     .max(100, 'Title must be less than 100 characters'),
//   description: z.string()
//     .min(10, 'Description must be at least 10 characters')
//     .max(1000, 'Description must be less than 1000 characters'),
//   priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).optional(),
//   status: z.enum(['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED']).optional(),
// });

// type IssueFormData = z.infer<typeof issueSchema>;

// const defaultValues: Partial<IssueFormData> = {
//   type: 'CLOUD_SECURITY',
//   priority: 'MEDIUM',
//   status: 'OPEN',
// };

// interface IssueFormProps {
//   onSuccess?: () => void;
// }

// export function IssueForm({ onSuccess }: IssueFormProps) {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState(false);
//   const [token, setToken] = useState<string>('');

//   // Get token from localStorage on component mount
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const storedToken = localStorage.getItem('token') || '';
//       setToken(storedToken);
//     }
//   }, []);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     setValue,
//     watch,
//   } = useForm<IssueFormData>({
//     resolver: zodResolver(issueSchema),
//     defaultValues,
//   });

//   const onSubmit = async (data: IssueFormData) => {
//     setIsSubmitting(true);
//     setError(null);
//     setSuccess(false);

//     try {
//       // Ensure we have a token
//       if (!token) {
//         throw new Error('Authentication required. Please login again.');
//       }

//       const response = await fetch('/api/issues', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify(data),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || 'Failed to create issue');
//       }

//       // Success!
//       setSuccess(true);
//       reset(defaultValues);
      
//       if (onSuccess) {
//         onSuccess();
//       }
      
//       setTimeout(() => setSuccess(false), 3000);

//     } catch (err: any) {
//       setError(err.message || 'Something went wrong. Please try again.');
//       console.error('Error creating issue:', err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const issueType = watch('type');

//   return (
//     <Card className="border border-gray-200 shadow-sm">
//       <CardHeader className="pb-4">
//         <CardTitle className="text-xl font-bold text-gray-800">
//           Report Security Issue
//         </CardTitle>
//         <p className="text-sm text-gray-600 mt-1">
//           Submit security findings, vulnerabilities, or assessment reports
//         </p>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
//           {/* Issue Type */}
//           <div className="space-y-2">
//             <Label htmlFor="type" className="text-gray-700 font-medium">
//               Issue Type <span className="text-red-500">*</span>
//             </Label>
//             <Select
//               onValueChange={(value: 'CLOUD_SECURITY' | 'RETEAM_ASSESSMENT' | 'VAPT') => 
//                 setValue('type', value)
//               }
//               defaultValue="CLOUD_SECURITY"
//             >
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Select issue type" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="CLOUD_SECURITY">
//                   Cloud Security
//                 </SelectItem>
//                 <SelectItem value="RETEAM_ASSESSMENT">
//                   Red Team Assessment
//                 </SelectItem>
//                 <SelectItem value="VAPT">
//                   Vulnerability Assessment (VAPT)
//                 </SelectItem>
//               </SelectContent>
//             </Select>
//             {errors.type && (
//               <p className="text-sm text-red-600 mt-1">
//                 {errors.type.message}
//               </p>
//             )}
//           </div>

//           {/* Title */}
//           <div className="space-y-2">
//             <Label htmlFor="title" className="text-gray-700 font-medium">
//               Title <span className="text-red-500">*</span>
//             </Label>
//             <Input
//               id="title"
//               placeholder="e.g., AWS S3 Bucket Publicly Accessible"
//               {...register('title')}
//             />
//             {errors.title && (
//               <p className="text-sm text-red-600 mt-1">
//                 {errors.title.message}
//               </p>
//             )}
//           </div>

//           {/* Description */}
//           <div className="space-y-2">
//             <Label htmlFor="description" className="text-gray-700 font-medium">
//               Description <span className="text-red-500">*</span>
//             </Label>
//             <Textarea
//               id="description"
//               placeholder="Provide detailed information about the security issue..."
//               rows={5}
//               {...register('description')}
//             />
//             {errors.description && (
//               <p className="text-sm text-red-600 mt-1">
//                 {errors.description.message}
//               </p>
//             )}
//           </div>

//           {/* Priority and Status */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="priority" className="text-gray-700 font-medium">
//                 Priority
//               </Label>
//               <Select
//                 onValueChange={(value: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL') => 
//                   setValue('priority', value)
//                 }
//                 defaultValue="MEDIUM"
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select priority" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="LOW">Low</SelectItem>
//                   <SelectItem value="MEDIUM">Medium</SelectItem>
//                   <SelectItem value="HIGH">High</SelectItem>
//                   <SelectItem value="CRITICAL">Critical</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="status" className="text-gray-700 font-medium">
//                 Status
//               </Label>
//               <Select
//                 onValueChange={(value: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED') => 
//                   setValue('status', value)
//                 }
//                 defaultValue="OPEN"
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select status" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="OPEN">Open</SelectItem>
//                   <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
//                   <SelectItem value="RESOLVED">Resolved</SelectItem>
//                   <SelectItem value="CLOSED">Closed</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           {/* Error Message */}
//           {error && (
//             <div className="bg-red-50 border border-red-200 rounded-md p-3">
//               <p className="text-sm text-red-600">{error}</p>
//             </div>
//           )}

//           {/* Success Message */}
//           {success && (
//             <div className="bg-green-50 border border-green-200 rounded-md p-3">
//               <p className="text-sm text-green-600">Issue created successfully!</p>
//             </div>
//           )}

//           {/* Submit Button */}
//           <Button
//             type="submit"
//             className="w-full"
//             disabled={isSubmitting || !token}
//           >
//             {isSubmitting ? 'Creating Issue...' : 'Create Security Issue'}
//           </Button>

//           {!token && (
//             <p className="text-sm text-yellow-600 text-center">
//               Please login to create issues
//             </p>
//           )}
//         </form>
//       </CardContent>
//     </Card>
//   );
// }
'use client'

import { useState } from 'react'
import { Button } from '@/lib/components/ui/button'
import { Input } from '@/lib/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/lib/components/ui/select'
import { Textarea } from '@/lib/components/ui/textarea'

export function IssueForm({ onSuccess }: { onSuccess?: () => void }) {
  const [form, setForm] = useState({
    type: 'CLOUD_SECURITY',
    title: '',
    description: '',
    priority: 'MEDIUM',
    status: 'OPEN',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/issues', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      setForm({
        type: 'CLOUD_SECURITY',
        title: '',
        description: '',
        priority: 'MEDIUM',
        status: 'OPEN',
      })
      onSuccess?.()
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-gray-900 border border-gray-800 rounded-xl p-6"
    >
      {/* DESCRIPTION */}
      <p className="text-sm text-gray-400">
        Submit security findings, vulnerabilities, or assessment reports.
      </p>

      {/* ISSUE TYPE */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">
          Issue Type <span className="text-red-500">*</span>
        </label>
        <Select
          value={form.type}
          onValueChange={value => setForm({ ...form, type: value })}
        >
          <SelectTrigger className="bg-gray-800 border-gray-700">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CLOUD_SECURITY">Cloud Security</SelectItem>
            <SelectItem value="RETEAM_ASSESSMENT">Red Team</SelectItem>
            <SelectItem value="VAPT">VAPT</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* TITLE */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">
          Title <span className="text-red-500">*</span>
        </label>
        <Input
          placeholder="e.g., AWS S3 Bucket Publicly Accessible"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          className="bg-gray-800 border-gray-700"
        />
      </div>

      {/* DESCRIPTION */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">
          Description <span className="text-red-500">*</span>
        </label>
        <Textarea
          rows={5}
          placeholder="Provide detailed information about the security issue..."
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          className="bg-gray-800 border-gray-700 resize-none"
        />
      </div>

      {/* PRIORITY + STATUS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Priority</label>
          <Select
            value={form.priority}
            onValueChange={value => setForm({ ...form, priority: value })}
          >
            <SelectTrigger className="bg-gray-800 border-gray-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="LOW">Low</SelectItem>
              <SelectItem value="MEDIUM">Medium</SelectItem>
              <SelectItem value="HIGH">High</SelectItem>
              <SelectItem value="CRITICAL">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Status</label>
          <Select
            value={form.status}
            onValueChange={value => setForm({ ...form, status: value })}
          >
            <SelectTrigger className="bg-gray-800 border-gray-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="OPEN">Open</SelectItem>
              <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
              <SelectItem value="RESOLVED">Resolved</SelectItem>
              <SelectItem value="CLOSED">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* SUBMIT */}
      <Button type="submit" className="w-full mt-2">
        Create Security Issue
      </Button>
    </form>
  )
}
