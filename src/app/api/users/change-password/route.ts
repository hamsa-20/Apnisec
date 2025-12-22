import { NextRequest, NextResponse } from 'next/server'
import { UserService } from '@/lib/classes/services/UserService'
import { cookies } from 'next/headers'
import { JWTService } from '@/lib/classes/services/JWTService'

export async function POST(req: NextRequest) {
  try {
    const { currentPassword, newPassword } = await req.json()

    const token = cookies().get('accessToken')?.value
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = new JWTService().verifyToken(token)

    const service = new UserService()
    await service.changePassword(
      payload.userId,
      currentPassword,
      newPassword
    )

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to change password' },
      { status: 400 }
    )
  }
}
