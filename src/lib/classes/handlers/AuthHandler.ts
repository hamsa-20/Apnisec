import { NextRequest, NextResponse } from 'next/server'
import { AuthService } from '../services/AuthService'
import { ApiError } from '../errors/ApiError'
import { JWTService } from '../services/JWTService'
import { cookies } from 'next/headers'

// export class AuthHandler {
//   private authService: AuthService

//   constructor() {
//     this.authService = new AuthService()
//   }

//   /* ================= REGISTER ================= */

//   async register(request: NextRequest) {
//     try {
//       const body = await request.json()
//       const result = await this.authService.register(body)

//       const response = NextResponse.json(
//         {
//           success: true,
//           user: result.user,
//           token: result.tokens.accessToken, // ✅ IMPORTANT
//         },
//         { status: 201 }
//       )

// response.cookies.set({
//   name: 'accessToken',
//   value: result.tokens.accessToken,
//   httpOnly: true,
//   path: '/',
//   sameSite: 'lax',
//   secure: process.env.NODE_ENV === 'production',
// })

//       return response
//     } catch (error: any) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: error.message || 'Registration failed',
//         },
//         { status: error.statusCode || 500 }
//       )
//     }
//   }

//   /* ================= LOGIN ================= */

// async login(request: NextRequest) {
//   try {
//     const body = await request.json()
//     const { email, password } = body

//     const result = await this.authService.login(email, password)

//     const response = NextResponse.json({
//       success: true,
//       user: result.user,
//     })

//     // ✅ THIS IS THE COOKIE YOU ARE ASKING ABOUT
//    response.cookies.set({
//   name: 'accessToken',
//   value: result.tokens.accessToken,
//   httpOnly: true,
//   path: '/',
//   sameSite: 'lax',
//   secure: process.env.NODE_ENV === 'production',
// })

//     return response
//   } catch (error: any) {
//     return NextResponse.json(
//       {
//         success: false,
//         error: error.message || 'Login failed',
//       },
//       { status: error.statusCode || 401 }
//     )
//   }
// }

//   /* ================= ME ================= */

//   async me() {
//     try {
//       const cookieStore = cookies()
//       const token = cookieStore.get('accessToken')?.value

//       if (!token) {
//         throw new ApiError('No token provided', 401)
//       }

//       const jwtService = new JWTService()
//       const payload = jwtService.verifyToken(token)

//       return NextResponse.json({
//         success: true,
//         user: payload,
//       })
//     } catch (error: any) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: error.message || 'Authentication failed',
//         },
//         { status: 401 }
//       )
//     }
//   }
// }

// import { NextRequest, NextResponse } from 'next/server'
// import { cookies } from 'next/headers'
// import { AuthService } from '@/lib/classes/services/AuthService'
// import { JWTService } from '@/lib/classes/services/JWTService'
// import { ApiError } from '@/lib/classes/errors/ApiError'

export class AuthHandler {
  private authService = new AuthService()
  private jwtService = new JWTService()

  async register(req: NextRequest) {
    try {
      const body = await req.json()
      const result = await this.authService.register(body)

      const response = NextResponse.json(
        { success: true, user: result.user },
        { status: 201 }
      )

      response.cookies.set({
        name: 'accessToken',
        value: result.tokens.accessToken,
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      })

      return response
    } catch (err: any) {
      console.error('REGISTER ERROR:', err)

      if (err instanceof ApiError) {
        return NextResponse.json(
          { success: false, message: err.message },
          { status: err.statusCode }
        )
      }

      return NextResponse.json(
        { success: false, message: 'Internal server error' },
        { status: 500 }
      )
    }
  }

  async login(req: NextRequest) {
    try {
      const body = await req.json()
      const result = await this.authService.login(body.email, body.password)

      const response = NextResponse.json({
        success: true,
        user: result.user,
      })

      response.cookies.set({
        name: 'accessToken',
        value: result.tokens.accessToken,
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      })

      return response
    } catch (err: any) {
      console.error('LOGIN ERROR:', err)

      if (err instanceof ApiError) {
        return NextResponse.json(
          { success: false, message: err.message },
          { status: err.statusCode }
        )
      }

      return NextResponse.json(
        { success: false, message: 'Internal server error' },
        { status: 500 }
      )
    }
  }

  async me() {
    try {
      const token = cookies().get('accessToken')?.value
      if (!token) throw new ApiError('Unauthorized', 401)

      const payload = this.jwtService.verifyToken(token)

      return NextResponse.json({
        success: true,
        user: payload,
      })
    } catch {
      return NextResponse.json(
        { success: false, user: null },
        { status: 401 }
      )
    }
  }
}
