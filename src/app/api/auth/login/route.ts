import { NextRequest, NextResponse } from 'next/server'
import { AuthHandler } from '@/lib/classes/handlers/AuthHandler'

export async function POST(request: NextRequest) {
  try {
    const handler = new AuthHandler()
    return await handler.login(request)
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Login failed' },
      { status: 401 }
    )
  }
}
