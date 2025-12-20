// src/lib/classes/repositories/BaseRepository.ts
import { PrismaClient } from '@prisma/client'
import { ApiError } from '../errors/ApiError'

export abstract class BaseRepository<T> {
  protected prisma: PrismaClient
  protected modelName: string

  constructor(modelName: string) {
    this.prisma = new PrismaClient()
    this.modelName = modelName
  }

  async findById(id: string): Promise<T | null> {
    try {
      return await (this.prisma as any)[this.modelName].findUnique({
        where: { id }
      })
    } catch (error) {
      throw new ApiError(`Failed to find ${this.modelName} by ID`, 500)
    }
  }

  async findMany(options?: {
    where?: any
    orderBy?: any
    take?: number
    skip?: number
    include?: any
  }): Promise<T[]> {
    try {
      return await (this.prisma as any)[this.modelName].findMany(options)
    } catch (error) {
      throw new ApiError(`Failed to find ${this.modelName} records`, 500)
    }
  }

  async create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T> {
    try {
      return await (this.prisma as any)[this.modelName].create({
        data
      })
    } catch (error) {
      throw new ApiError(`Failed to create ${this.modelName}`, 500)
    }
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    try {
      return await (this.prisma as any)[this.modelName].update({
        where: { id },
        data
      })
    } catch (error) {
      throw new ApiError(`Failed to update ${this.modelName}`, 500)
    }
  }

  async delete(id: string): Promise<T> {
    try {
      return await (this.prisma as any)[this.modelName].delete({
        where: { id }
      })
    } catch (error) {
      throw new ApiError(`Failed to delete ${this.modelName}`, 500)
    }
  }

  async count(where?: any): Promise<number> {
    try {
      return await (this.prisma as any)[this.modelName].count({ where })
    } catch (error) {
      throw new ApiError(`Failed to count ${this.modelName}`, 500)
    }
  }

  async findFirst(where: any): Promise<T | null> {
    try {
      return await (this.prisma as any)[this.modelName].findFirst({ where })
    } catch (error) {
      throw new ApiError(`Failed to find ${this.modelName}`, 500)
    }
  }

  protected getPrismaModel(): any {
    return (this.prisma as any)[this.modelName]
  }
}