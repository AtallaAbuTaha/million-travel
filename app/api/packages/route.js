import { NextResponse } from 'next/server';
import { requireAdmin } from '../../../lib/auth/admin';
import { hasDatabase } from '../../../lib/db/client';
import { listPackages, replacePackages } from '../../../lib/db/packages';

export const runtime = 'nodejs';

export async function GET() {
  if (!hasDatabase()) {
    return NextResponse.json({ error: 'DATABASE_URL is not configured.' }, { status: 503 });
  }

  try {
    return NextResponse.json({ packages: await listPackages() });
  } catch (error) {
    console.error('Package list failed', error);
    return NextResponse.json({ error: 'Could not load packages.' }, { status: 500 });
  }
}

export async function PUT(request) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  if (!hasDatabase()) {
    return NextResponse.json({ error: 'DATABASE_URL is not configured.' }, { status: 503 });
  }

  try {
    const body = await request.json();
    if (!Array.isArray(body.packages)) {
      return NextResponse.json({ error: 'Expected packages array.' }, { status: 400 });
    }

    await replacePackages(body.packages);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Package save failed', error);
    return NextResponse.json({ error: 'Could not save packages.' }, { status: 500 });
  }
}
