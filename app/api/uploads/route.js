import { NextResponse } from 'next/server';
import { requireAdmin } from '../../../lib/auth/admin';
import { saveLocalUpload } from '../../../lib/storage/local';

export const runtime = 'nodejs';

const MAX_IMAGE_SIZE = 4 * 1024 * 1024;
const MAX_PDF_SIZE = 10 * 1024 * 1024;

export async function POST(request) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const form = await request.formData();
    const file = form.get('file');
    const kind = form.get('kind') || 'misc';

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
    }

    const isImage = file.type?.startsWith('image/');
    const isPdf = file.type === 'application/pdf';

    if (!isImage && !isPdf) {
      return NextResponse.json({ error: 'Only images and PDFs are allowed.' }, { status: 400 });
    }

    if (isImage && file.size > MAX_IMAGE_SIZE) {
      return NextResponse.json({ error: 'Image must be under 4MB.' }, { status: 400 });
    }

    if (isPdf && file.size > MAX_PDF_SIZE) {
      return NextResponse.json({ error: 'PDF must be under 10MB.' }, { status: 400 });
    }

    const saved = await saveLocalUpload(file, String(kind));
    return NextResponse.json({ file: saved });
  } catch (error) {
    console.error('Upload failed', error);
    return NextResponse.json({ error: 'Upload failed.' }, { status: 500 });
  }
}
