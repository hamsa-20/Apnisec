// src/lib/classes/handlers/AuthHandler.ts
import { AuthService } from '../services/AuthService'
import { ApiError } from '../errors/ApiError'
import { RateLimiterService } from '../services/RateLimiterService'

export class AuthHandler {
  private authService: AuthService
  private rateLimiter: RateLimiterService

  constructor() {
    this.authService = new AuthService()
    this.rateLimiter = new RateLimiterService()
  }

  async handleRegister(request: Request) {
    try {
      const identifier = this.getClientIdentifier(request)
      await this.rateLimiter.checkLimit(`register_${identifier}`, 5, 3600000)
      
      const body = await request.json()
      
      const result = await this.authService.register(body)
      
      return Response.json({
        success: true,
        data: result.user,
        token: result.tokens.accessToken
      }, {
        status: 201,
        headers: this.setAuthCookies(result.tokens)
      })
    } catch (error) {
      if (error instanceof ApiError) {
        return Response.json({
          success: false,
          error: error.message
        }, { status: error.statusCode })
      }
      
      return Response.json({
        success: false,
        error: 'Internal server error'
      }, { status: 500 })
    }
  }

  async handleLogin(request: Request) {
    try {
      const identifier = this.getClientIdentifier(request)
      await this.rateLimiter.checkLimit(`login_${identifier}`, 10, 900000)
      
      const body = await request.json()
      const { email, password } = body
      
      const result = await this.authService.login(email, password, this.getClientIp(request))
      
      return Response.json({
        success: true,
        data: result.user
      }, {
        headers: this.setAuthCookies(result.tokens)
      })
    } catch (error) {
      if (error instanceof ApiError) {
        return Response.json({
          success: false,
          error: error.message
        }, { status: error.statusCode })
      }
      
      return Response.json({
        success: false,
        error: 'Internal server error'
      }, { status: 500 })
    }
  }

  // Alias methods for API routes
  async register(request: Request) {
    return this.handleRegister(request)
  }

  async login(request: Request) {
    return this.handleLogin(request)
  }

  private getClientIdentifier(request: Request): string {
    const ip = this.getClientIp(request)
    const userAgent = request.headers.get('user-agent') || 'unknown'
    return `${ip}_${userAgent}`
  }

  private getClientIp(request: Request): string {
    return request.headers.get('x-forwarded-for')?.split(',')[0] || 
           request.headers.get('x-real-ip') || 
           'unknown'
  }

  private setAuthCookies(tokens: { accessToken: string; refreshToken: string }): Headers {
    const headers = new Headers()
    
    headers.append('Set-Cookie', 
      `accessToken=${tokens.accessToken}; HttpOnly; Path=/; Max-Age=900; SameSite=Strict`
    )
    
    headers.append('Set-Cookie',
      `refreshToken=${tokens.refreshToken}; HttpOnly; Path=/; Max-Age=604800; SameSite=Strict`
    )
    
    return headers
  }
}