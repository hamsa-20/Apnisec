'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/lib/components/ui/card';
import { Badge } from '@/lib/components/ui/badge';
import { Button } from '@/lib/components/ui/button';
import { Edit, Trash2, Eye, Calendar } from 'lucide-react';

interface IssueCardProps {
  issue: {
    id: string;
    type: string;
    title: string;
    description: string;
    priority: string;
    status: string;
    createdAt: Date | string;
  };
  onEdit?: (issue: any) => void;
  onDelete?: (issueId: string) => void;
  onView?: (issue: any) => void;
}

export function IssueCard({ issue, onEdit, onDelete, onView }: IssueCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'CLOUD_SECURITY': return { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' };
      case 'RETEAM_ASSESSMENT': return { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200' };
      case 'VAPT': return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' };
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'CRITICAL': return { bg: 'bg-red-500', text: 'text-white' };
      case 'HIGH': return { bg: 'bg-orange-500', text: 'text-white' };
      case 'MEDIUM': return { bg: 'bg-yellow-500', text: 'text-white' };
      case 'LOW': return { bg: 'bg-green-500', text: 'text-white' };
      default: return { bg: 'bg-gray-500', text: 'text-white' };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN': return { bg: 'bg-red-100', text: 'text-red-800' };
      case 'IN_PROGRESS': return { bg: 'bg-blue-100', text: 'text-blue-800' };
      case 'RESOLVED': return { bg: 'bg-green-100', text: 'text-green-800' };
      case 'CLOSED': return { bg: 'bg-gray-100', text: 'text-gray-800' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-800' };
    }
  };

  const formatDate = (dateInput: Date | string) => {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTypeDisplayName = (type: string) => {
    switch (type) {
      case 'CLOUD_SECURITY': return 'Cloud Security';
      case 'RETEAM_ASSESSMENT': return 'Red Team Assessment';
      case 'VAPT': return 'VAPT';
      default: return type.replace('_', ' ');
    }
  };

  const typeColors = getTypeColor(issue.type);
  const priorityColors = getPriorityColor(issue.priority);
  const statusColors = getStatusColor(issue.status);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this issue?')) {
      setIsDeleting(true);
      try {
        if (onDelete) {
          await onDelete(issue.id);
        }
      } catch (error) {
        console.error('Failed to delete issue:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <Card className={`border-l-4 ${typeColors.border} hover:shadow-md transition-shadow duration-300`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge className={`${typeColors.bg} ${typeColors.text} font-medium`}>
                {getTypeDisplayName(issue.type)}
              </Badge>
              <Badge className={`${priorityColors.bg} ${priorityColors.text} font-medium`}>
                {issue.priority}
              </Badge>
              <Badge className={`${statusColors.bg} ${statusColors.text} font-medium`}>
                {issue.status.replace('_', ' ')}
              </Badge>
            </div>
            <CardTitle className="text-lg font-semibold line-clamp-1 pt-1">
              {issue.title}
            </CardTitle>
            <CardDescription className="flex items-center text-sm">
              <Calendar className="h-3 w-3 mr-1" />
              {formatDate(issue.createdAt)}
            </CardDescription>
          </div>
          <div className="flex space-x-1">
            {onView && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onView(issue)}
                className="h-8 w-8 p-0"
                title="View details"
              >
                <Eye className="h-4 w-4" />
              </Button>
            )}
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(issue)}
                className="h-8 w-8 p-0"
                title="Edit"
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                disabled={isDeleting}
                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                title="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 text-sm line-clamp-2">
          {issue.description}
        </p>
      </CardContent>
    </Card>
  );
}