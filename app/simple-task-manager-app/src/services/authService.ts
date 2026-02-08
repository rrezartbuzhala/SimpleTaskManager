import apiClient from './apiClient';

function toBase64(str: string) {
  if (typeof window !== 'undefined' && typeof window.btoa === 'function') {
    try {
      return window.btoa(unescape(encodeURIComponent(str)));
    } catch (e) {
    }
  }
  try {
    const g = (globalThis as any) || {};
    const Buf = g.Buffer;
    if (Buf && typeof Buf.from === 'function') {
      return Buf.from(str).toString('base64');
    }
  } catch (e) {
  }
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


  const resp = await apiClient.get('/authorization', {
    headers: { Authorization: header }
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
