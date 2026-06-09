import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const UPLOAD_ROOT = path.join(process.cwd(), 'storage', 'uploads');

export function safeStorageName(name) {
  const ext = path.extname(name || '').toLowerCase();
  const base = path.basename(name || 'file', ext).replace(/[^a-z0-9._-]+/gi, '-').replace(/^-+|-+$/g, '') || 'file';
  return `${base}-${crypto.randomUUID()}${ext}`;
}

export async function saveLocalUpload(file, kind = 'misc') {
  const bytes = Buffer.from(await file.arrayBuffer());
  const safeKind = String(kind || 'misc').replace(/[^a-z0-9._-]+/gi, '-');
  const filename = safeStorageName(file.name);
  const relativePath = path.join(safeKind, filename);
  const absolutePath = path.join(UPLOAD_ROOT, relativePath);

  await mkdir(path.dirname(absolutePath), { recursive: true });
  await writeFile(absolutePath, bytes);

  const publicPath = relativePath.split(path.sep).join('/');

  return {
    id: crypto.randomUUID(),
    kind: safeKind,
    originalName: file.name,
    mimeType: file.type || 'application/octet-stream',
    size: file.size,
    storageKey: publicPath,
    publicUrl: `/api/files/${publicPath}`,
  };
}

export function resolveLocalUploadPath(parts) {
  const joined = parts.join('/');
  if (joined.includes('..') || path.isAbsolute(joined)) {
    throw new Error('Invalid file path.');
  }
  return path.join(UPLOAD_ROOT, joined);
}
