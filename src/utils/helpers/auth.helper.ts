// src/utils/authToken.ts
import { TokenManager } from '@/store';
import { AuthAPI } from '@/store/auth/api.auth';
import { logDebug } from '@/utils/logger';
import { CookieManager } from '@/store/auth/cookie.auth';

let refreshPromise: Promise<{ token?: string } | null> | null = null;

export const refreshWithMutex = async () => {
  if (refreshPromise) return refreshPromise;
  refreshPromise = (async () => {
    try {
      const { response, data } = await AuthAPI.refreshLogin();
      if (response?.status === 200 && data?.data?.token) {
        TokenManager.set(data.data.token);
        return { token: data.data.token };
      }
      return null;
    } catch {
      return null;
    } finally {
      refreshPromise = null;
    }
  })();
  return refreshPromise;
};

export const isTokenExpired = (token?: string) => {
  if (!token) return true;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return true;
    const payload = JSON.parse(atob(parts[1]));
    const now = Math.floor(Date.now() / 1000);
    return typeof payload.exp === 'number' ? payload.exp <= now : true;
  } catch {
    return true;
  }
};

export const clearAuthStorage = () => {
  TokenManager.remove();
  CookieManager.delete('userRole');
  localStorage.removeItem('auth-storage');

  logDebug('Auth storage cleared');
};
