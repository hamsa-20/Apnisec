// src/lib/classes/services/RateLimiterService.ts - SIMPLE COMPLETE VERSION
import { ApiError } from '../errors/ApiError'

interface RateLimitRecord {
  count: number
  resetTime: number
}

export class RateLimiterService {
  private limits: Map<string, RateLimitRecord> = new Map()

  async checkLimit(key: string, maxRequests: number, windowMs: number): Promise<void> {
    const now = Date.now()
    const record = this.limits.get(key)

    if (!record || now > record.resetTime) {
      this.limits.set(key, {
        count: 1,
        resetTime: now + windowMs
      })
    } else {
      record.count++
      
      if (record.count > maxRequests) {
        const retryAfter = Math.ceil((record.resetTime - now) / 1000)
        throw new ApiError(`Rate limit exceeded. Try again in ${retryAfter} seconds`, 429)
      }
    }
  }

  getHeaders(key: string): Record<string, string> {
    const now = Date.now()
    const record = this.limits.get(key)
    
    const remaining = record ? Math.max(0, 100 - record.count) : 100
    const reset = record ? Math.floor(record.resetTime / 1000) : Math.floor((now + 900000) / 1000)
    
    return {
      'X-RateLimit-Limit': '100',
      'X-RateLimit-Remaining': remaining.toString(),
      'X-RateLimit-Reset': reset.toString()
    }
  }

  isRateLimited(key: string): { limited: boolean; retryAfter?: number } {
    const now = Date.now()
    const record = this.limits.get(key)

    if (!record) {
      return { limited: false }
    }

    if (now > record.resetTime) {
      this.limits.delete(key)
      return { limited: false }
    }

    return {
      limited: true,
      retryAfter: Math.ceil((record.resetTime - now) / 1000)
    }
  }
}