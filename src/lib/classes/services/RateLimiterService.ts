export interface RateLimitResult {
  limited: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

export class RateLimiterService {
  private limits = new Map<string, { count: number; resetTime: number }>();
  private windowMs = 15 * 60 * 1000; // 15 minutes
  private maxRequests = 100; // 100 requests per window

  isRateLimited(key: string): RateLimitResult {
    const now = Date.now();
    const limitData = this.limits.get(key);

    if (!limitData) {
      // First request
      this.limits.set(key, {
        count: 1,
        resetTime: now + this.windowMs
      });
      return {
        limited: false,
        limit: this.maxRequests,
        remaining: this.maxRequests - 1,
        reset: now + this.windowMs
      };
    }

    // Check if window has expired
    if (now > limitData.resetTime) {
      // Reset counter
      this.limits.set(key, {
        count: 1,
        resetTime: now + this.windowMs
      });
      return {
        limited: false,
        limit: this.maxRequests,
        remaining: this.maxRequests - 1,
        reset: now + this.windowMs
      };
    }

    // Check if limit exceeded
    if (limitData.count >= this.maxRequests) {
      return {
        limited: true,
        limit: this.maxRequests,
        remaining: 0,
        reset: limitData.resetTime
      };
    }

    // Increment counter
    limitData.count++;
    this.limits.set(key, limitData);

    return {
      limited: false,
      limit: this.maxRequests,
      remaining: this.maxRequests - limitData.count,
      reset: limitData.resetTime
    };
  }

  getHeaders(key: string): Record<string, string> {
    const result = this.isRateLimited(key);
    
    return {
      'X-RateLimit-Limit': result.limit.toString(),
      'X-RateLimit-Remaining': result.remaining.toString(),
      'X-RateLimit-Reset': Math.ceil(result.reset / 1000).toString(), // Unix timestamp
    };
  }

  // Clear expired entries (optional cleanup method)
  cleanup(): void {
    const now = Date.now();
    for (const [key, data] of this.limits.entries()) {
      if (now > data.resetTime) {
        this.limits.delete(key);
      }
    }
  }
}