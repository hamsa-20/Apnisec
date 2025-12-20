import jwt, { SignOptions } from 'jsonwebtoken'
import { ApiError } from '../errors/ApiError'

export interface TokenPayload {
  userId: string
  email: string
  role: string
}

export class JWTService {
  private readonly accessTokenSecret: string
  private readonly refreshTokenSecret: string
  private readonly accessTokenExpiry: string | number
  private readonly refreshTokenExpiry: string | number

  constructor() {
    // Get environment variables with validation
    const accessSecret = process.env.JWT_ACCESS_SECRET
    const refreshSecret = process.env.JWT_REFRESH_SECRET
    
    if (!accessSecret || accessSecret.trim() === '') {
      console.warn('⚠️ JWT_ACCESS_SECRET is not set. Using development secret.')
      this.accessTokenSecret = 'dev-access-secret-minimum-32-characters-long-here'
    } else {
      this.accessTokenSecret = accessSecret
    }
    
    if (!refreshSecret || refreshSecret.trim() === '') {
      console.warn('⚠️ JWT_REFRESH_SECRET is not set. Using development secret.')
      this.refreshTokenSecret = 'dev-refresh-secret-minimum-32-characters-long-here'
    } else {
      this.refreshTokenSecret = refreshSecret
    }
    
    // Set expiry times
    this.accessTokenExpiry = process.env.JWT_ACCESS_EXPIRY || '15m'
    this.refreshTokenExpiry = process.env.JWT_REFRESH_EXPIRY || '7d'
    
    // Validate secrets in production
    if (process.env.NODE_ENV === 'production') {
      if (this.accessTokenSecret === 'dev-access-secret-minimum-32-characters-long-here') {
        throw new Error('JWT_ACCESS_SECRET must be set in production')
      }
      if (this.refreshTokenSecret === 'dev-refresh-secret-minimum-32-characters-long-here') {
        throw new Error('JWT_REFRESH_SECRET must be set in production')
      }
    }
  }

  generateTokens(payload: TokenPayload): { accessToken: string; refreshToken: string } {
    try {
      // Type assertion to ensure secret is treated as string
      const accessToken = jwt.sign(
        payload,
        this.accessTokenSecret as jwt.Secret,
        {
          expiresIn: this.accessTokenExpiry,
          algorithm: 'HS256'
        } as SignOptions
      )

      const refreshToken = jwt.sign(
        { userId: payload.userId },
        this.refreshTokenSecret as jwt.Secret,
        {
          expiresIn: this.refreshTokenExpiry,
          algorithm: 'HS256'
        } as SignOptions
      )

      return { accessToken, refreshToken }
    } catch (error) {
      console.error('JWT generation error:', error)
      throw new ApiError('Failed to generate authentication tokens', 500)
    }
  }

  verifyAccessToken(token: string): TokenPayload {
    try {
      return jwt.verify(token, this.accessTokenSecret as jwt.Secret) as TokenPayload
    } catch (error: any) {
      if (error.name === 'TokenExpiredError') {
        throw new ApiError('Access token has expired', 401)
      }
      if (error.name === 'JsonWebTokenError') {
        throw new ApiError('Invalid access token', 401)
      }
      throw new ApiError('Token verification failed', 401)
    }
  }

  // ADD THIS ALIAS METHOD FOR BACKWARD COMPATIBILITY
  verifyToken(token: string): TokenPayload {
    return this.verifyAccessToken(token);
  }

  verifyRefreshToken(token: string): { userId: string } {
    try {
      return jwt.verify(token, this.refreshTokenSecret as jwt.Secret) as { userId: string }
    } catch (error: any) {
      if (error.name === 'TokenExpiredError') {
        throw new ApiError('Refresh token has expired', 401)
      }
      if (error.name === 'JsonWebTokenError') {
        throw new ApiError('Invalid refresh token', 401)
      }
      throw new ApiError('Token verification failed', 401)
    }
  }

  decodeToken(token: string): TokenPayload | null {
    try {
      return jwt.decode(token) as TokenPayload
    } catch {
      return null
    }
  }

  async invalidateUserTokens(userId: string): Promise<void> {
    // Token invalidation logic (blacklist implementation would go here)
    return Promise.resolve()
  }
}