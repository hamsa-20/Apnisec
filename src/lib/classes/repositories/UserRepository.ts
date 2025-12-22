// src/lib/classes/repositories/UserRepository.ts
import { BaseRepository } from './BaseRepository'
import { User } from '@prisma/client'

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super('user')
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      return await this.findFirst({
        where: { email }
      })
    } catch (error) {
      // ✅ User not found should NOT throw
      return null
    }
  }

  async findByResetToken(token: string): Promise<User | null> {
    try {
      return await this.findFirst({
        where: { resetToken: token }
      })
    } catch {
      return null
    }
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
  async findById(id: string) {
  return this.prisma.user.findUnique({
    where: { id },
  })
}

}
