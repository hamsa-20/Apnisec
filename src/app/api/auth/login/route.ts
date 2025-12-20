// src/app/api/auth/login/route.ts
import { NextRequest } from 'next/server'
import { AuthHandler } from '@/lib/classes/handlers/AuthHandler'

export async function POST(request: NextRequest) {
  const handler = new AuthHandler()
  return await handler.handleLogin(request) // Changed from .login() to .handleLogin()
}