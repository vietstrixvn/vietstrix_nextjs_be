// ==============================================
// 📁 utils/token.utils.ts - TOKEN UTILITIES
// ==============================================

import { isTokenExpired } from './helpers/auth.helper';
import { logDebug } from './logger';

/**
 * Static token utilities (không cần React hooks)
 */
export class TokenService {
  /**
   * Get access token from localStorage
   */
  static getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token');
    }
    return null;
  }

  /**
   * Set access token to localStorage
   */
  static setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', token);
      logDebug('Token saved to localStorage');
    }
  }

  /**
   * Remove access token from localStorage
   */
  static removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      logDebug('Token removed from localStorage');
    }
  }

  /**
   * Get Authorization header value
   */
  static getAuthHeader(): string | null {
    const token = TokenService.getToken();
    return token || null;
  }

  /**
   * Check if token exists
   */
  static hasToken(): boolean {
    return !!TokenService.getToken();
  }

  /**
   * Validate token (exists and not expired)
   */
  static isValidToken(): boolean {
    const token = TokenService.getToken();
    if (!token) return false;

    return !isTokenExpired(token);
  }

  /**
   * Get token payload (decoded)
   */
  static getTokenPayload(): any | null {
    const token = TokenService.getToken();
    if (!token) return null;

    return decodeTokenPayload(token);
  }

  /**
   * Get token expiration time
   */
  static getTokenExpiration(): Date | null {
    const payload = TokenService.getTokenPayload();
    if (!payload?.exp) return null;

    return new Date(payload.exp * 1000);
  }

  /**
   * Check if token needs refresh (expires within buffer time)
   */
  static needsRefresh(bufferMinutes: number = 5): boolean {
    const token = TokenService.getToken();
    if (!token) return true;

    const payload = decodeTokenPayload(token);
    if (!payload?.exp) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    const bufferTime = bufferMinutes * 60;

    return payload.exp - currentTime <= bufferTime;
  }

  /**
   * Get user ID from token
   */
  static getUserIdFromToken(): string | null {
    const payload = TokenService.getTokenPayload();
    return payload?.sub || payload?.user_id || payload?.id || null;
  }
}

/**
 * Simple function to get token (for quick access)
 */
export const getAccessToken = (): string | null => {
  return TokenService.getToken();
};

/**
 * Simple function to get auth header (for quick access)
 */
export const getAuthorizationHeader = (): string | null => {
  return TokenService.getAuthHeader();
};

/**
 * Decode JWT token payload (client-side only, no verification)
 */
export const decodeTokenPayload = (token: string): any | null => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payload = parts[1];
    // Add padding if needed
    const paddedPayload = payload + '='.repeat((4 - (payload.length % 4)) % 4);
    const decoded = atob(paddedPayload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded);
  } catch (error) {
    console.warn('Failed to decode token payload:', error);
    return null;
  }
};
