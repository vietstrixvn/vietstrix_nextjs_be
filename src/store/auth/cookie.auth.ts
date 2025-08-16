import Cookies from 'js-cookie';

export const CookieManager = {
  /**
   * Set a cookie (supports string or any serializable object)
   */
  set<T = any>(name: string, value: T, options?: Cookies.CookieAttributes) {
    const serializedValue =
      typeof value === 'string' ? value : JSON.stringify(value);

    Cookies.set(name, serializedValue, {
      path: '/',
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production',
      ...options,
    });
  },

  /**
   * Get a cookie as string
   */
  get(name: string): string | null {
    return Cookies.get(name) ?? null;
  },

  /**
   * Get a cookie as JSON object
   */
  getJSON<T = any>(name: string): T | null {
    const raw = Cookies.get(name);
    if (!raw) return null;

    try {
      return JSON.parse(raw) as T;
    } catch {
      // If parse fails, return null instead of throwing
      return null;
    }
  },

  /**
   * Delete a cookie
   */
  delete(name: string, options?: Cookies.CookieAttributes) {
    Cookies.remove(name, { path: '/', ...options });
  },

  /**
   * Check if a cookie exists
   */
  exists(name: string): boolean {
    return Cookies.get(name) !== undefined;
  },

  /**
   * Check if a cookie is exactly 'true' (boolean check)
   */
  isTrue(name: string): boolean {
    return Cookies.get(name) === 'true';
  },
};
