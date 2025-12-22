import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { JWTService } from '@/lib/classes/services/JWTService'
import { IssueService } from '@/lib/classes/services/IssueService'

export async function GET() {
  try {
    const token = cookies().get('accessToken')?.value
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const jwtService = new JWTService()
    const payload = jwtService.verifyToken(token)

    const issueService = new IssueService()
    const issues = await issueService.getIssues(payload.userId)

    return NextResponse.json({ success: true, data: issues })
  } catch (error) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }
}
