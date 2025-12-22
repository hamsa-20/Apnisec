import { IssueRepository } from '../repositories/IssueRepository'
import { EmailService } from './EmailService'
import { ApiError } from '../errors/ApiError'

/* ================= TYPES ================= */

export interface CreateIssueData {
  type: 'CLOUD_SECURITY' | 'RETEAM_ASSESSMENT' | 'VAPT'
  title: string
  description: string
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  status?: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED'
  userId: string
  userEmail: string
}

export interface UpdateIssueData {
  type?: 'CLOUD_SECURITY' | 'RETEAM_ASSESSMENT' | 'VAPT'
  title?: string
  description?: string
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  status?: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED'
}

/* ================= SERVICE ================= */

export class IssueService {
  private issueRepository: IssueRepository
  private emailService: EmailService

  constructor() {
    this.issueRepository = new IssueRepository()
    this.emailService = new EmailService()
  }

  /* ================= CREATE ================= */

  async createIssue(data: CreateIssueData) {
    if (!data.title || !data.description) {
      throw new ApiError('Title and description are required', 400)
    }

    const issue = await this.issueRepository.create({
      type: data.type,
      title: data.title,
      description: data.description,
      priority: data.priority || 'MEDIUM',
      status: data.status || 'OPEN',
      userId: data.userId,
    })

    // 🔔 Send email notification (non-blocking)
    this.emailService
      .sendIssueNotification(data.userEmail, {
        type: issue.type,
        title: issue.title,
        description: issue.description,
      })
      .catch(err => console.error('Issue email failed:', err))

    return issue
  }

  /* ================= READ ================= */

  async getIssues(userId: string, type?: string) {
    return this.issueRepository.findMany({
      where: {
        userId,
        ...(type ? { type } : {}),
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  async getIssueById(id: string, userId: string) {
  const issue = await this.issueRepository.findFirst({
    where: { id },
  })

  if (!issue || issue.userId !== userId) {
    throw new ApiError('Issue not found', 404)
  }

  return issue
}

  /* ================= UPDATE ================= */

  async updateIssue(id: string, userId: string, data: UpdateIssueData) {
    const issue = await this.getIssueById(id, userId)

    return this.issueRepository.update(issue.id, {
      ...data,
    })
  }
  async getIssue(issueId: string, userId: string) {
  const issue = await this.issueRepository.findById(issueId)

  if (!issue) return null
  if (issue.userId !== userId) return null

  return issue
}


  /* ================= DELETE ================= */

  async deleteIssue(id: string, userId: string) {
    const issue = await this.getIssueById(id, userId)

    await this.issueRepository.delete(issue.id)
    return true
  }
}
