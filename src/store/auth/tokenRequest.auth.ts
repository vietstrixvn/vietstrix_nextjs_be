// ==============================================
// 📁 hooks/useAuthenticatedRequest.ts - AUTHENTICATED REQUEST HOOK
// ==============================================

import { useCallback } from 'react';
import { useAuthStore } from '@/store/auth/store.auth';
import { logError } from '@/utils/logger';
import {
  decodeTokenPayload,
  isTokenExpired,
  TokenService,
  useToken,
} from './token.auth';

/**
 * Hook for making authenticated API requests
 */
export const useAuthenticatedRequest = () => {
  const { getAuthHeader, validateToken } = useToken();
  const { logout } = useAuthStore();

  const makeRequest = useCallback(
    async (
      url: string,
      options: RequestInit = {}
    ): Promise<Response | null> => {
      // Validate token before making request
      if (!validateToken()) {
        logError('Invalid token, cannot make authenticated request');
        await logout();
        return null;
      }

      const authHeader = getAuthHeader();
      if (!authHeader) {
        logError('No auth header available');
        await logout();
        return null;
      }

      const headers = new Headers(options.headers);
      headers.set('Authorization', authHeader);
      headers.set('Content-Type', 'application/json');

      try {
        const response = await fetch(url, {
          ...options,
          headers,
          credentials: 'include',
        });

        // Handle unauthorized response
        if (response.status === 401) {
          logError('Unauthorized response, logging out');
          await logout();
          return null;
        }

        return response;
      } catch (error) {
        logError('Request failed:', error);
        throw new Error('Network error occurred');
      }
    },
    [getAuthHeader, validateToken, logout]
  );

  return { makeRequest };
};

// ==============================================
// 📁 types/token.types.ts - TOKEN TYPES
// ==============================================

export interface TokenPayload {
  sub?: string; // Subject (usually user ID)
  exp?: number; // Expiration time
  iat?: number; // Issued at
  user_id?: string; // User ID
  id?: string; // Alternative user ID
  role?: string; // User role
  email?: string; // User email
  [key: string]: any; // Allow other properties
}

export interface TokenInfo {
  token: string;
  payload: TokenPayload;
  isValid: boolean;
  isExpired: boolean;
  expiresAt: Date | null;
  userId: string | null;
}

/**
 * Get complete token information
 */
export const getTokenInfo = (): TokenInfo | null => {
  const token = TokenService.getToken();
  if (!token) return null;

  const payload = decodeTokenPayload(token);
  if (!payload) return null;

  const isExpired = isTokenExpired(token);
  const expiresAt = payload.exp ? new Date(payload.exp * 1000) : null;
  const userId = payload.sub || payload.user_id || payload.id || null;

  return {
    token,
    payload,
    isValid: !isExpired,
    isExpired,
    expiresAt,
    userId,
  };
};
