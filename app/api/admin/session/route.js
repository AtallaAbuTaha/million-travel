import { NextResponse } from 'next/server';
import { isAdminRequest } from '../../../../lib/auth/admin';

export const runtime = 'nodejs';

export async function GET(request) {
  return NextResponse.json({ authenticated: isAdminRequest(request) });
}
