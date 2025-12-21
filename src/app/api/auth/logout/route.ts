import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Simple logout - just clear the cookie
    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    });

    // Clear the token cookie
    response.cookies.delete('token');
    
    return response;

  } catch (error: any) {
    console.error('Logout error:', error);
    return NextResponse.json({
      success: false,
      error: 'Logout failed',
    }, { status: 500 });
  }
}