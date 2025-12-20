// src/app/api/auth/me/route.ts - SIMPLE VERSION
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  // Simple dummy response
  return Response.json({
    success: true,
    data: {
      id: 'user-123',
      email: 'user@example.com',
      name: 'Test User',
      role: 'USER',
      company: 'ApniSec'
    }
  })
}