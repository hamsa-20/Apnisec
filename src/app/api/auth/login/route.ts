import { NextRequest } from 'next/server'
import { AuthHandler } from '@/lib/classes/handlers/AuthHandler'

export async function POST(request: NextRequest) {
  const handler = new AuthHandler()
  // Check if method is called 'login' or 'handleLogin'
  return await handler.login(request) // OR handler.handleLogin(request)
}