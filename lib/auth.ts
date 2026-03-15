import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

const SESSION_COOKIE = 'admin_session';
const SESSION_TTL_MS = 1000 * 60 * 60 * 24;

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error('ADMIN_SESSION_SECRET is required for admin authentication.');
  }
  return secret;
}

function signPayload(payload: string) {
  return createHmac('sha256', getSecret()).update(payload).digest('hex');
}

export function createSessionValue(email: string) {
  const issuedAt = Date.now().toString();
  const payload = `${email}:${issuedAt}`;
  const signature = signPayload(payload);
  return `${payload}:${signature}`;
}

export function verifySessionValue(value: string | undefined) {
  if (!value) {
    return false;
  }

  const parts = value.split(':');
  if (parts.length !== 3) {
    return false;
  }

  const [email, issuedAtRaw, signature] = parts;
  const payload = `${email}:${issuedAtRaw}`;
  const expected = signPayload(payload);

  const signatureBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expected);
  if (signatureBuf.length !== expectedBuf.length) {
    return false;
  }

  if (!timingSafeEqual(signatureBuf, expectedBuf)) {
    return false;
  }

  const issuedAt = Number(issuedAtRaw);
  if (Number.isNaN(issuedAt) || Date.now() - issuedAt > SESSION_TTL_MS) {
    return false;
  }

  return true;
}

export async function setAdminSession(email: string) {
  const cookieStore = cookies();
  cookieStore.set(SESSION_COOKIE, createSessionValue(email), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_MS / 1000
  });
}

export async function clearAdminSession() {
  const cookieStore = cookies();
  cookieStore.set(SESSION_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0
  });
}

export function isAdminAuthenticated() {
  const cookieStore = cookies();
  return verifySessionValue(cookieStore.get(SESSION_COOKIE)?.value);
}
