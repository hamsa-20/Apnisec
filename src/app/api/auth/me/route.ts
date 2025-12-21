import { NextRequest } from 'next/server'
import { AuthHandler } from '@/lib/classes/handlers/AuthHandler'

export async function GET(request: NextRequest) {
  const handler = new AuthHandler()
  return await handler.me(request)
}