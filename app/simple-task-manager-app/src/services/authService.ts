import axios from 'axios';

const AUTH_URL = `${window.env.VITE_API_BASE_URL}/authorization`;

function toBase64(str: string) {
  // Prefer browser btoa with UTF-8 support
  if (typeof window !== 'undefined' && typeof window.btoa === 'function') {
    try {
      return window.btoa(unescape(encodeURIComponent(str)));
    } catch (e) {
      // fall through
    }
  }
  // Try accessing Buffer from globalThis
  try {
    const g = (globalThis as any) || {};
    const Buf = g.Buffer;
    if (Buf && typeof Buf.from === 'function') {
      return Buf.from(str).toString('base64');
    }
  } catch (e) {
    // fall through
  }
  // Fallback using TextEncoder + btoa if available
  if (typeof TextEncoder !== 'undefined' && typeof window !== 'undefined' && typeof window.btoa === 'function') {
    const uint8 = new TextEncoder().encode(str);
    let binary = '';
    for (let i = 0; i < uint8.length; i++) binary += String.fromCharCode(uint8[i]);
    return window.btoa(binary);
  }
  return '';
}

export async function authenticate(username: string, password: string) {
  const raw = `${username}:${password}`;
  const hashed = toBase64(raw);
  const header = `Basic ${hashed}`;

  const resp = await axios.get(AUTH_URL, {
    headers: { Authorization: header },
    validateStatus: () => true,
  });

  return {
    status: resp.status,
    data: resp.data,
    header,
    hashed,
  };
}

export function getStoredAuthHeader(): string | null {
  const creds = typeof window !== 'undefined' ? localStorage.getItem('authCreds') : null;
  return creds ? `Basic ${creds}` : null;
}

export function saveAuthCreds(hashed: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('authCreds', hashed);
  }
}
