import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '../services/UserService';
import { RateLimiterService } from '../services/RateLimiterService';
import { ApiError } from '../errors/ApiError';
import { UserValidator } from '../validators/UserValidator';

export class UserHandler {
  private userService: UserService;
  private rateLimiter: RateLimiterService;
  private validator: UserValidator;

  constructor() {
    this.userService = new UserService();
    this.rateLimiter = new RateLimiterService();
    this.validator = new UserValidator();
  }

  private getClientIdentifier(request: NextRequest): string {
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

  async getProfile(request: NextRequest) {
    try {
      const identifier = this.getClientIdentifier(request);
      const rateLimit = this.rateLimiter.isRateLimited(`get_profile_${identifier}`);
      
      if (rateLimit.limited) {
        throw new ApiError('Rate limit exceeded', 429);
      }

      // In a real app, you'd get userId from JWT token
      const userId = 'demo-user-id';
      const user = await this.userService.getUserProfile(userId);

      const response = NextResponse.json({
        success: true,
        data: user
      });

      const headers = this.rateLimiter.getHeaders(`get_profile_${identifier}`);
      Object.entries(headers).forEach(([key, value]) => {
        response.headers.set(key, value);
      });

      return response;

    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async updateProfile(request: NextRequest) {
    try {
      const identifier = this.getClientIdentifier(request);
      const rateLimit = this.rateLimiter.isRateLimited(`update_profile_${identifier}`);
      
      if (rateLimit.limited) {
        throw new ApiError('Rate limit exceeded', 429);
      }

      const body = await request.json();
      
      // Validate input
      const validation = this.validator.validateProfileUpdate(body);
      if (!validation.valid) {
        throw new ApiError(validation.error || 'Validation failed', 400);
      }

      // In a real app, you'd get userId from JWT token
      const userId = 'demo-user-id';
      const updatedUser = await this.userService.updateProfile(userId, body)


      const response = NextResponse.json({
        success: true,
        message: 'Profile updated successfully',
        data: updatedUser
      });

      const headers = this.rateLimiter.getHeaders(`update_profile_${identifier}`);
      Object.entries(headers).forEach(([key, value]) => {
        response.headers.set(key, value);
      });

      return response;

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