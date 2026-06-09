import crypto from 'node:crypto';

export const ADMIN_COOKIE = 'million_admin';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || 'dev-only-change-me';
}

function sign(value) {
  return crypto.createHmac('sha256', getSecret()).update(value).digest('base64url');
}

export function createAdminToken() {
  const exp = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS;
  const nonce = crypto.randomUUID();
  const payload = `${exp}.${nonce}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyAdminToken(token) {
  if (!token || typeof token !== 'string') return false;
  const parts = token.split('.');
  if (parts.length !== 3) return false;

  const payload = `${parts[0]}.${parts[1]}`;
  const expected = sign(payload);
  const received = parts[2];

  try {
    if (!crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(received))) return false;
  } catch (_error) {
    return false;
  }

  const exp = Number(parts[0]);
  return Number.isFinite(exp) && exp > Math.floor(Date.now() / 1000);
}

export function isAdminRequest(request) {
  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  return verifyAdminToken(token);
}

export function requireAdmin(request) {
  if (!isAdminRequest(request)) {
    return Response.json({ error: 'Unauthorized.' }, { status: 401 });
  }
  return null;
}

export function getAdminCookieOptions(request) {
  const forwardedProto = request?.headers?.get('x-forwarded-proto');
  const protocol = forwardedProto || (request?.url ? new URL(request.url).protocol.replace(':', '') : 'http');

  return {
    httpOnly: true,
    sameSite: 'lax',
    secure: protocol === 'https',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  };
}
