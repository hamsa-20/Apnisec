// src/lib/classes/repositories/IssueRepository.ts
import { BaseRepository } from './BaseRepository'
import { Issue } from '@prisma/client'

export class IssueRepository extends BaseRepository<Issue> {
  constructor() {
    super('issue')
  }

  async findUserIssues(userId: string, filters?: {
    type?: string
    status?: string
    priority?: string
    search?: string
  }): Promise<Issue[]> {
    const where: any = { userId }
    
    if (filters?.type) {
      where.type = filters.type
    }
    
    if (filters?.status) {
      where.status = filters.status
    }
    
    if (filters?.priority) {
      where.priority = filters.priority
    }
    
    if (filters?.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } }
      ]
    }

    return this.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    })
  }
  async findById(id: string) {
  return this.prisma.issue.findUnique({
    where: { id },
  })
}


  async getIssueStats(userId: string): Promise<{
    total: number
    open: number
    closed: number
    byType: Record<string, number>
    byPriority: Record<string, number>
  }> {
    const issues = await this.findMany({
      where: { userId }
    })

    const stats = {
      total: issues.length,
      open: issues.filter(i => i.status === 'OPEN').length,
      closed: issues.filter(i => i.status === 'CLOSED').length,
      byType: {} as Record<string, number>,
      byPriority: {} as Record<string, number>
    }

    issues.forEach(issue => {
      stats.byType[issue.type] = (stats.byType[issue.type] || 0) + 1
      stats.byPriority[issue.priority || 'MEDIUM'] = (stats.byPriority[issue.priority || 'MEDIUM'] || 0) + 1
    })

    return stats
  }
}