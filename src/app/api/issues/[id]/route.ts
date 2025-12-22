import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { JWTService } from '@/lib/classes/services/JWTService'
import { IssueService } from '@/lib/classes/services/IssueService'

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = cookies().get('accessToken')?.value
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const jwtService = new JWTService()
    const payload = jwtService.verifyToken(token)

    const issueService = new IssueService()
    await issueService.deleteIssue(params.id, payload.userId)

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }
}
