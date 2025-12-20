// src/lib/classes/repositories/CybersecurityRepository.ts
import { BaseRepository } from './BaseRepository'

export interface ServiceInquiry {
  id: string
  userId?: string | null
  name: string
  email: string
  company: string
  service: string
  message: string
  status: 'NEW' | 'CONTACTED' | 'CLOSED'
  createdAt: Date
  updatedAt: Date
}

export class CybersecurityRepository extends BaseRepository<ServiceInquiry> {
  constructor() {
    super('serviceInquiry') // Must match Prisma model name exactly
  }

  async createInquiry(data: {
    name: string
    email: string
    company: string
    service: string
    message: string
    userId?: string
  }): Promise<ServiceInquiry> {
    return this.create({
      name: data.name,
      email: data.email,
      company: data.company,
      service: data.service,
      message: data.message,
      userId: data.userId || null,
      status: 'NEW'
    } as any)
  }

  async getInquiriesByService(service: string): Promise<ServiceInquiry[]> {
    return this.findMany({
      where: { service },
      orderBy: { createdAt: 'desc' }
    })
  }

  async updateInquiryStatus(id: string, status: 'NEW' | 'CONTACTED' | 'CLOSED'): Promise<ServiceInquiry> {
    return this.update(id, { status } as any)
  }

  async getInquiriesByUser(userId: string): Promise<ServiceInquiry[]> {
    return this.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    })
  }
}