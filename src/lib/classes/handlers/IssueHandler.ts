import { NextRequest, NextResponse } from 'next/server';
import { IssueService } from '../services/IssueService';
import { RateLimiterService } from '../services/RateLimiterService';
import { JWTService } from '../services/JWTService';
import { ApiError } from '../errors/ApiError';

export class IssueHandler {
  private issueService: IssueService;
  private rateLimiter: RateLimiterService;
  private jwtService: JWTService;

  constructor() {
    this.issueService = new IssueService();
    this.rateLimiter = new RateLimiterService();
    this.jwtService = new JWTService();
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

  private async getUserIdFromRequest(request: NextRequest): Promise<string> {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError('No authorization token provided', 401);
    }

    const token = authHeader.split(' ')[1];
    
    try {
      // ✅ This should now work since verifyToken method exists
      const decoded = this.jwtService.verifyToken(token);
      return decoded.userId;
    } catch (error) {
      throw new ApiError('Invalid or expired token', 401);
    }
  }

  async createIssue(request: NextRequest) {
    try {
      const identifier = this.getClientIdentifier(request);
      const rateLimit = this.rateLimiter.isRateLimited(`create_issue_${identifier}`);

      if (rateLimit.limited) {
        throw new ApiError('Rate limit exceeded', 429);
      }

      const body = await request.json();
      const userId = await this.getUserIdFromRequest(request);

      const issue = await this.issueService.createIssue({
        ...body,
        userId,
      });

      const response = NextResponse.json({
        success: true,
        message: 'Issue created successfully',
        data: issue
      }, { status: 201 });

      const headers = this.rateLimiter.getHeaders(`create_issue_${identifier}`);
      Object.entries(headers).forEach(([key, value]) => {
        response.headers.set(key, value);
      });

      return response;

    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async getIssues(request: NextRequest) {
    try {
      const { searchParams } = new URL(request.url);
      const type = searchParams.get('type') || undefined;
      const userId = await this.getUserIdFromRequest(request);

      const issues = await this.issueService.getIssues(userId, type);

      return NextResponse.json({
        success: true,
        data: issues
      });

    } catch (error: any) {
      return this.handleError(error);
    }
  }

async getIssue(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const userId = await this.getUserIdFromRequest(request)
    const issueId = context.params.id

    const issue = await this.issueService.getIssue(issueId, userId)

    if (!issue) {
      return NextResponse.json(
        { success: false, error: 'Issue not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: issue,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}



  async updateIssue(request: NextRequest, params: { id: string }) {
    try {
      const identifier = this.getClientIdentifier(request);
      const rateLimit = this.rateLimiter.isRateLimited(`update_issue_${identifier}`);

      if (rateLimit.limited) {
        throw new ApiError('Rate limit exceeded', 429);
      }

      const body = await request.json();
      const userId = await this.getUserIdFromRequest(request);

      const issue = await this.issueService.updateIssue(params.id, userId, body);

      const response = NextResponse.json({
        success: true,
        message: 'Issue updated successfully',
        data: issue
      });

      const headers = this.rateLimiter.getHeaders(`update_issue_${identifier}`);
      Object.entries(headers).forEach(([key, value]) => {
        response.headers.set(key, value);
      });

      return response;

    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async deleteIssue(request: NextRequest, params: { id: string }) {
    try {
      const identifier = this.getClientIdentifier(request);
      const rateLimit = this.rateLimiter.isRateLimited(`delete_issue_${identifier}`);
      
      if (rateLimit.limited) {
        throw new ApiError('Rate limit exceeded', 429);
      }

      const userId = await this.getUserIdFromRequest(request);
      await this.issueService.deleteIssue(params.id, userId);

      const response = NextResponse.json({
        success: true,
        message: 'Issue deleted successfully'
      });

      const headers = this.rateLimiter.getHeaders(`delete_issue_${identifier}`);
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