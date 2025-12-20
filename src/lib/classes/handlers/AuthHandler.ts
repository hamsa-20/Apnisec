import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '../services/AuthService';
import { ApiError } from '../errors/ApiError';

export class AuthHandler {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(request: NextRequest) {
    try {
      const body = await request.json();
      const result = await this.authService.register(body);

      return NextResponse.json({
        success: true,
        user: result.user,
        token: result.tokens.accessToken,
      }, { status: 201 });

    } catch (error: any) {
      return NextResponse.json({
        success: false,
        error: error.message || 'Registration failed',
      }, { status: error.statusCode || 500 });
    }
  }

  async login(request: NextRequest) {
    try {
      const body = await request.json();
      const { email, password } = body;

      const result = await this.authService.login(email, password);

      return NextResponse.json({
        success: true,
        user: result.user,
        token: result.tokens.accessToken,
      });

    } catch (error: any) {
      return NextResponse.json({
        success: false,
        error: error.message || 'Login failed',
      }, { status: error.statusCode || 500 });
    }
  }

  async me(request: NextRequest) {
    try {
      const token = request.headers.get('authorization')?.replace('Bearer ', '');
      
      if (!token) {
        throw new ApiError('No token provided', 401);
      }

      // In a real app, verify token and get user from DB
      return NextResponse.json({
        success: true,
        user: { id: 'user-id', email: 'user@example.com' }
      });

    } catch (error: any) {
      return NextResponse.json({
        success: false,
        error: error.message || 'Authentication failed',
      }, { status: 401 });
    }
  }
}