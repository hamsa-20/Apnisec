// src/app/api/auth/logout/route.ts - SIMPLE VERSION
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  // Simple response - clears cookies
  const headers = new Headers()
  
  headers.append('Set-Cookie', 
    'accessToken=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict'
  )
  
  headers.append('Set-Cookie',
    'refreshToken=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict'
  )
  
  return Response.json({
    success: true,
    message: 'Logged out successfully'
  }, { headers })
}