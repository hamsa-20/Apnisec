import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '../services/AuthService';
import { RateLimiterService } from '../services/RateLimiterService';
import { ApiError } from '../errors/ApiError';

export class AuthHandler {
  private authService: AuthService;
  private rateLimiter: RateLimiterService;

  constructor() {
    this.authService = new AuthService();
    this.rateLimiter = new RateLimiterService();
  }

  private getClientIdentifier(request: NextRequest): string {
    // Get IP from headers
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    
    if (forwardedFor) {
      return forwardedFor.split(',')[0].trim();
    }
    
    if (realIp) {
      return realIp;
    }
    
    return 'unknown-' + Math.random().toString(36).substring(7);
  }

  async register(request: NextRequest) {
    try {
      const identifier = this.getClientIdentifier(request);
      const rateLimit = this.rateLimiter.isRateLimited(`register_${identifier}`);
      
      if (rateLimit.limited) {
        throw new ApiError('Rate limit exceeded', 429);
      }

      const body = await request.json();
      const { email, password, name } = body;

      if (!email || !password) {
        throw new ApiError('Email and password are required', 400);
      }

      const result = await this.authService.register(email, password, name);

      const response = NextResponse.json({
        success: true,
        message: 'User registered successfully',
        data: result.user
      }, { status: 201 });

      response.cookies.set('token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60,
        path: '/'
      });

      const headers = this.rateLimiter.getHeaders(`register_${identifier}`);
      Object.entries(headers).forEach(([key, value]) => {
        response.headers.set(key, value);
      });

      return response;

    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async login(request: NextRequest) {
    try {
      const identifier = this.getClientIdentifier(request);
      const rateLimit = this.rateLimiter.isRateLimited(`login_${identifier}`);
      
      if (rateLimit.limited) {
        throw new ApiError('Rate limit exceeded', 429);
      }

      const body = await request.json();
      const { email, password } = body;

      if (!email || !password) {
        throw new ApiError('Email and password are required', 400);
      }

      const result = await this.authService.login(email, password);

      const response = NextResponse.json({
        success: true,
        message: 'Login successful',
        data: result.user
      });

      response.cookies.set('token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60,
        path: '/'
      });

      const headers = this.rateLimiter.getHeaders(`login_${identifier}`);
      Object.entries(headers).forEach(([key, value]) => {
        response.headers.set(key, value);
      });

      return response;

    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async logout() {
    try {
      const response = NextResponse.json({
        success: true,
        message: 'Logged out successfully'
      });

      response.cookies.set('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: new Date(0),
        path: '/'
      });

      return response;
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async getCurrentUser(request: NextRequest) {
    try {
      const token = request.cookies.get('token')?.value;
      
      if (!token) {
        throw new ApiError('No authentication token found', 401);
      }

      const userId = 'demo-user-id';
      const user = await this.authService.getCurrentUser(userId);
      
      return NextResponse.json({
        success: true,
        data: user
      });

    } catch (error: any) {
      return this.handleError(error);
    }
  }

  private handleError(error: any): NextResponse {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal server error';

    return NextResponse.json(
      {
        success: false,
        message,
        error: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: statusCode }
    );
  }
}