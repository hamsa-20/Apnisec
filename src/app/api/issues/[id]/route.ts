import { NextRequest } from 'next/server';
import { IssueHandler } from '@/lib/classes/handlers/IssueHandler';

const handler = new IssueHandler();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Await the params Promise to get the actual id
  const resolvedParams = await params;
  return await handler.getIssue(request, resolvedParams);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  return await handler.updateIssue(request, resolvedParams);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  return await handler.deleteIssue(request, resolvedParams);
}