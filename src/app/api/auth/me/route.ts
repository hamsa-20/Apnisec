import { NextRequest } from 'next/server'
import { AuthHandler } from '@/lib/classes/handlers/AuthHandler'

export async function GET(_: NextRequest) {
  const handler = new AuthHandler()
  return handler.me()
}
