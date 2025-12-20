import { NextRequest } from 'next/server';
import { AuthHandler } from '@/lib/classes/handlers/AuthHandler';

const authHandler = new AuthHandler();

export async function POST(request: NextRequest) {
  return authHandler.register(request);
}