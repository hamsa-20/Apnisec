import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { JWTService } from '@/lib/classes/services/JWTService'
import { UserService } from '@/lib/classes/services/UserService'

export async function PUT(request: NextRequest) {
  try {
    const token = cookies().get('accessToken')?.value
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const jwt = new JWTService()
    const payload = jwt.verifyToken(token)

    const body = await request.json()

    const userService = new UserService()
    await userService.updateProfile(payload.userId, body)

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Profile update failed' },
      { status: 500 }
    )
  }
}
