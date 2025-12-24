// import { NextRequest, NextResponse } from 'next/server'
// import { AuthHandler } from '@/lib/classes/handlers/AuthHandler'

// export async function POST(request: NextRequest) {
//   try {
//     const handler = new AuthHandler()
//     return await handler.register(request)
//   } catch (error: any) {
//     console.error('REGISTER ERROR:', error)

//     return NextResponse.json(
//       {
//         success: false,
//         error: error.message || 'Registration failed',
//       },
//       { status: 500 }
//     )
//   }
// }
import { NextRequest } from 'next/server'
import { AuthHandler } from '@/lib/classes/handlers/AuthHandler'

export async function POST(request: NextRequest) {
  const handler = new AuthHandler()
  return handler.register(request)
}
