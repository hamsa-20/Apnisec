import { NextRequest, NextResponse } from 'next/server';
import { UserHandler } from '@/lib/classes/handlers/UserHandler';

const handler = new UserHandler();

// GET /api/users/profile - Get user profile
export async function GET(request: NextRequest) {
  return await handler.getProfile(request);
}

// PUT /api/users/profile - Update user profile  
export async function PUT(request: NextRequest) {
  return await handler.updateProfile(request);
}