// src/lib/classes/repositories/UserRepository.ts
import { BaseRepository } from './BaseRepository'
import { User } from '@prisma/client'

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super('user')
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.findFirst({
      where: { email }
    })
  }

  async findByResetToken(token: string): Promise<User | null> {
    return this.findFirst({
      where: { resetToken: token }
    })
  }

  async updatePassword(id: string, hashedPassword: string): Promise<User> {
    return this.update(id, {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null
    } as any)
  }

  async updateLastLogin(id: string, ipAddress?: string): Promise<User> {
    return this.update(id, {
      lastLoginAt: new Date(),
      lastLoginIp: ipAddress || null
    } as any)
  }
}