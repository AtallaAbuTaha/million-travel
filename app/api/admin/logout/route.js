import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, getAdminCookieOptions } from '../../../../lib/auth/admin';

export const runtime = 'nodejs';

export async function POST(request) {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, '', {
    ...getAdminCookieOptions(request),
    maxAge: 0,
  });
  return res;
}
