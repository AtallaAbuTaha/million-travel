import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const { dataUrl, filename } = await request.json();

    if (!dataUrl || !dataUrl.startsWith('data:image/png;base64,')) {
      return NextResponse.json({ error: 'Invalid image data.' }, { status: 400 });
    }

    const base64 = dataUrl.replace('data:image/png;base64,', '');
    const buffer = Buffer.from(base64, 'base64');

    const safe = (filename || 'million-ad.png')
      .replace(/[^a-z0-9._-]+/gi, '-')
      .replace(/^-+|-+$/g, '');

    const blob = await put(`ads/${Date.now()}-${safe}`, buffer, {
      access: 'public',
      contentType: 'image/png',
    });

    return NextResponse.json({ url: blob.url });
  } catch (err) {
    console.error('save-ad error', err);
    return NextResponse.json({ error: err.message || 'Upload failed.' }, { status: 500 });
  }
}
