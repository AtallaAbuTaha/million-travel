import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, createAdminToken, getAdminCookieOptions } from '../../../../lib/auth/admin';

export const runtime = 'nodejs';

export async function POST(request) {
  const { password } = await request.json().catch(() => ({}));
  const expected = process.env.ADMIN_PASSWORD || (process.env.NODE_ENV === 'production' ? null : 'million2026');

  if (!expected) {
    return NextResponse.json({ error: 'ADMIN_PASSWORD is not configured.' }, { status: 500 });
  }

  if (!password || password !== expected) {
    return NextResponse.json({ error: 'Wrong password.' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, createAdminToken(), getAdminCookieOptions(request));
  return res;
}
