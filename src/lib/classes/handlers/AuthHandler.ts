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
// // src/lib/classes/handlers/AuthHandler.ts - CORRECTED VERSION
// import { NextRequest, NextResponse } from 'next/server';
// import { AuthService } from '@/lib/classes/services/AuthService';
// import { ApiError } from '@/lib/classes/errors/ApiError';

// export class AuthHandler {
//   private authService: AuthService;

//   constructor() {
//     this.authService = new AuthService();
//   }

//   async register(request: NextRequest): Promise<NextResponse> {
//     try {
//       const body = await request.json();
//       console.log('Registration attempt:', { email: body.email });
      
//       const result = await this.authService.register(body);

//       // Create response with token in cookie
//       const response = NextResponse.json({
//         success: true,
//         user: result.user,
//         token: result.tokens.accessToken,
//       }, { status: 201 });

//       // Set HTTP-only cookie
//       response.cookies.set({
//         name: 'token',
//         value: result.tokens.accessToken,
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: 'lax',
//         maxAge: 60 * 60 * 24 * 7, // 7 days
//         path: '/',
//       });

//       return response;

//     } catch (error: any) {
//       console.error('Registration handler error:', error);
      
//       const statusCode = error instanceof ApiError ? error.statusCode : 500;
//       return NextResponse.json({
//         success: false,
//         error: error.message || 'Registration failed',
//       }, { status: statusCode });
//     }
//   }

//   async login(request: NextRequest): Promise<NextResponse> {
//     try {
//       const body = await request.json();
//       const { email, password } = body;

//       console.log('Login attempt:', { email });

//       if (!email || !password) {
//         return NextResponse.json({
//           success: false,
//           error: 'Email and password are required',
//         }, { status: 400 });
//       }

//       // Get IP for security logging
//       const ip = request.headers.get('x-forwarded-for') || 
//                  request.headers.get('x-real-ip') || 
//                  'unknown';

//       const result = await this.authService.login(email, password, ip);

//       // Create response with token in cookie
//       const response = NextResponse.json({
//         success: true,
//         user: result.user,
//         token: result.tokens.accessToken,
//       });

//       // Set HTTP-only cookie
//       response.cookies.set({
//         name: 'token',
//         value: result.tokens.accessToken,
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: 'lax',
//         maxAge: 60 * 60 * 24 * 7, // 7 days
//         path: '/',
//       });

//       return response;

//     } catch (error: any) {
//       console.error('Login handler error:', error);
      
//       const statusCode = error instanceof ApiError ? error.statusCode : 401;
//       return NextResponse.json({
//         success: false,
//         error: error.message || 'Login failed',
//       }, { status: statusCode });
//     }
//   }

//   async logout(request: NextRequest): Promise<NextResponse> {
//     try {
//       const token = request.headers.get('authorization')?.replace('Bearer ', '') || 
//                     request.cookies.get('token')?.value;
      
//       // Clear cookie regardless
//       const response = NextResponse.json({
//         success: true,
//         message: 'Logged out successfully'
//       });

//       response.cookies.delete('token');

//       // Try to invalidate token if we have it
//       if (token) {
//         try {
//           const decoded = this.authService.getUserFromToken?.(token);
//           if (decoded?.id) {
//             await this.authService.logout(decoded.id);
//           }
//         } catch (e) {
//           console.warn('Could not invalidate token:', e);
//         }
//       }

//       return response;

//     } catch (error: any) {
//       console.error('Logout error:', error);
//       return NextResponse.json({
//         success: false,
//         error: 'Logout failed',
//       }, { status: 500 });
//     }
//   }

//   async me(request: NextRequest): Promise<NextResponse> {
//     try {
//       const token = request.headers.get('authorization')?.replace('Bearer ', '') || 
//                     request.cookies.get('token')?.value;
      
//       if (!token) {
//         throw new ApiError('No token provided', 401);
//       }

//       const user = await this.authService.getUserFromToken(token);
      
//       return NextResponse.json({
//         success: true,
//         user
//       });

//     } catch (error: any) {
//       console.error('Auth me error:', error);
//       return NextResponse.json({
//         success: false,
//         error: error.message || 'Authentication failed',
//       }, { status: 401 });
//     }
//   }
// }