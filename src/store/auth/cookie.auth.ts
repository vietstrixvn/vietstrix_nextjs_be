// ==============================================
// 📁 store/auth/cookie.auth.ts - OPTIMIZED VERSION
// ==============================================

import { CookieOptions } from '@/types';
import { logDebug, logError } from '@/utils/logger';

export const CookieManager = {
  /**
   * Set a cookie with options
   */
  set(name: string, value: string, options: CookieOptions = {}) {
    // Check if we're on client side
    if (typeof document === 'undefined') {
      logDebug('Skipping cookie set in SSR');
      return;
    }

    let cookieString = `${name}=${encodeURIComponent(value)}`;

    if (options.expires) {
      const date = new Date();
      date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000);
      cookieString += `; expires=${date.toUTCString()}`;
    }

    cookieString += '; path=/';

    // Chỉ đặt Secure nếu môi trường là production VÀ đang chạy trên HTTPS
    const isSecure =
      options.secure !== false &&
      process.env.NODE_ENV === 'production' &&
      window.location.protocol === 'https:';
    if (isSecure) {
      cookieString += '; Secure';
    }
    console.log(`Setting cookie: ${name}=${value}, Secure: ${isSecure}`); // Debug

    if (options.sameSite) {
      cookieString += `; SameSite=${options.sameSite}`;
    }

    try {
      document.cookie = cookieString;
      console.log('Cookies after set:', document.cookie); // Debug
    } catch (error) {
      console.error('Failed to set cookie:', error);
    }
  },

  /**
   * Delete a cookie
   */
  delete(name: string) {
    if (typeof document === 'undefined') {
      logDebug('Skipping cookie delete in SSR');
      return;
    }

    try {
      const isSecure =
        process.env.NODE_ENV === 'production' &&
        window.location.protocol === 'https:';
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; ${
        isSecure ? 'Secure;' : ''
      } SameSite=Lax;`;
      logDebug(`Deleted cookie: ${name}, Secure: ${isSecure}`); // Debug
      logDebug('Cookies after delete:', document.cookie); // Debug
    } catch (error) {
      logError('Failed to delete cookie:', error);
    }
  },

  /**
   * Check if a cookie exists and has the expected value
   */
  check(name: string): boolean {
    if (typeof document === 'undefined') {
      logDebug('Skipping cookie check in SSR');
      return false;
    }

    try {
      const cookieExists = document.cookie.includes(`${name}=`);
      const value = this.get(name);
      const isTrue = value === 'true';
      logDebug(
        `Checking cookie ${name}: exists=${cookieExists}, isTrue=${isTrue}`
      ); // Debug
      return isTrue;
    } catch (error) {
      logError('Failed to check cookie:', error);
      return false;
    }
  },

  /**
   * Get cookie value by name
   */
  get(name: string): string | null {
    if (typeof document === 'undefined') {
      logDebug('Skipping cookie get in SSR');
      return null;
    }

    try {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        const cookieValue = decodeURIComponent(
          parts.pop()?.split(';').shift() || ''
        );
        logDebug(`Got cookie ${name}: ${cookieValue}`);
        return cookieValue;
      }
      logDebug(`Cookie ${name} not found`);
      return null;
    } catch (error) {
      logError('Failed to get cookie:', error);
      return null;
    }
  },
};
