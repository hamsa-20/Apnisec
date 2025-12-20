import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Test register:', body);
    
    return NextResponse.json({
      success: true,
      message: 'Test API works!',
      data: body
    });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: String(error)
    }, { status: 500 });
  }
}