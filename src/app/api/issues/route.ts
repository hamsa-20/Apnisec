import { NextRequest } from 'next/server';
import { IssueHandler } from '@/lib/classes/handlers/IssueHandler';

const handler = new IssueHandler();

export async function GET(request: NextRequest) {
  return await handler.getIssues(request);
}

export async function POST(request: NextRequest) {
  return await handler.createIssue(request);
}