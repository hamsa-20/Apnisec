import { IssueRepository } from '../repositories/IssueRepository';

export interface CreateIssueData {
  type: 'cloud-security' | 'reteam-assessment' | 'vapt';
  title: string;
  description: string;
  priority?: 'low' | 'medium' | 'high';
  status?: 'open' | 'in-progress' | 'resolved';
  userId: string;
  userEmail?: string;
}

export interface UpdateIssueData {
  type?: 'cloud-security' | 'reteam-assessment' | 'vapt';
  title?: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  status?: 'open' | 'in-progress' | 'resolved';
}

export interface Issue {
  id: string;
  type: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  userId: string;
  userEmail?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class IssueService {
  private issueRepository: IssueRepository;

  constructor() {
    this.issueRepository = new IssueRepository();
  }

  async createIssue(data: CreateIssueData): Promise<Issue> {
    // In a real app, validate data and create in database
    const issue = {
      id: `issue_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: data.type,
      title: data.title,
      description: data.description,
      priority: data.priority || 'medium',
      status: data.status || 'open',
      userId: data.userId,
      userEmail: data.userEmail,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Mock saving to database
    return issue;
  }

  async getIssues(userId: string, type?: string): Promise<Issue[]> {
    // Mock data for testing
    const issues: Issue[] = [
      {
        id: '1',
        type: 'cloud-security',
        title: 'Cloud Configuration Issue',
        description: 'Security group misconfiguration detected',
        priority: 'high',
        status: 'open',
        userId: userId,
        userEmail: 'user@example.com',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
      },
      {
        id: '2',
        type: 'vapt',
        title: 'Penetration Test Results',
        description: 'Vulnerability assessment completed',
        priority: 'medium',
        status: 'in-progress',
        userId: userId,
        userEmail: 'user@example.com',
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-12')
      }
    ];

    // Filter by type if specified
    if (type) {
      return issues.filter(issue => issue.type === type);
    }

    return issues;
  }

  async getIssue(id: string, userId: string): Promise<Issue | null> {
    const issues = await this.getIssues(userId);
    return issues.find(issue => issue.id === id) || null;
  }

  async updateIssue(id: string, userId: string, data: UpdateIssueData): Promise<Issue | null> {
    const issue = await this.getIssue(id, userId);
    
    if (!issue) {
      return null;
    }

    // Update issue with new data
    const updatedIssue = {
      ...issue,
      ...data,
      updatedAt: new Date()
    };

    return updatedIssue;
  }

  async deleteIssue(id: string, userId: string): Promise<boolean> {
    const issue = await this.getIssue(id, userId);
    return !!issue; // Return true if issue existed
  }
}