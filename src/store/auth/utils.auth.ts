// ==============================================
// 📁 store/auth/utils.auth.ts - OPTIMIZED VERSION WITH TOKEN SUPPORT
// ==============================================

import { useAuthStore } from './store.auth';

export const handleAuthError = (error: unknown): string => {
  if (error instanceof Error) {
    // Handle specific error types
    if (error.message.includes('Network')) {
      return 'Network connection error. Please check your internet connection.';
    }
    if (
      error.message.includes('401') ||
      error.message.includes('Unauthorized')
    ) {
      return 'Your session has expired. Please login again.';
    }
    if (error.message.includes('403') || error.message.includes('Forbidden')) {
      return 'You do not have permission to access this resource.';
    }
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'An unexpected error occurred. Please try again.';
};

/**
 * Get access token from localStorage
 */
export const getAccessToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('access_token');
  }
  return null;
};

/**
 * Enhanced fetchWithAuth that includes token in Authorization header
 */
export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {}
): Promise<Response | null> => {
  const headers = new Headers(options.headers);
  headers.append('Content-Type', 'application/json');

  // Add Authorization header if token exists
  const token = getAccessToken();
  if (token) {
    headers.append('Authorization', token);
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include',
    });

    // Handle unauthorized access
    if (response.status === 401) {
      console.warn('Unauthorized access detected, logging out...');
      const authStore = useAuthStore.getState();
      await authStore.logout();
      return null;
    }

    return response;
  } catch (error) {
    console.error('Fetch with auth error:', error);
    throw new Error('Network error occurred');
  }
};

// Helper function to validate user role
export const validateUserRole = (userRole: string): boolean => {
  const allowedRoles = ['admin', 'manager'];
  return allowedRoles.includes(userRole.toLowerCase());
};

// Helper function to handle API responses
export const handleApiResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `HTTP ${response.status}: ${response.statusText}`
    );
  }
  return response.json();
};

/**
 * Check if user is authenticated by verifying both token and auth state
 */
export const isAuthenticated = (): boolean => {
  const token = getAccessToken();
  const authState = useAuthStore.getState();

  return !!(token && authState.isAuthenticated);
};

/**
 * Token utilities
 */
export const TokenUtils = {
  /**
   * Decode JWT token payload (without verification - for client-side info only)
   */
  decodePayload: (token: string): any | null => {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;

      const payload = parts[1];
      const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decoded);
    } catch (error) {
      console.warn('Failed to decode token payload:', error);
      return null;
    }
  },

  /**
   * Check if token is expired (client-side check only)
   */
  isExpired: (token: string): boolean => {
    const payload = TokenUtils.decodePayload(token);
    if (!payload || !payload.exp) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  },

  /**
   * Get token expiration time
   */
  getExpirationTime: (token: string): Date | null => {
    const payload = TokenUtils.decodePayload(token);
    if (!payload || !payload.exp) return null;

    return new Date(payload.exp * 1000);
  },

  /**
   * Check if token needs refresh (expires within next 5 minutes)
   */
  needsRefresh: (token: string, bufferMinutes: number = 5): boolean => {
    const payload = TokenUtils.decodePayload(token);
    if (!payload || !payload.exp) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    const bufferTime = bufferMinutes * 60; // Convert to seconds

    return payload.exp - currentTime <= bufferTime;
  },
};

/**
 * Auth state checker that validates both token and user session
 */
export const validateAuthState = async (): Promise<boolean> => {
  const token = getAccessToken();
  const authStore = useAuthStore.getState();

  // No token or not authenticated in store
  if (!token || !authStore.isAuthenticated) {
    console.warn('Missing token or not authenticated in store');
    return false;
  }

  // Check if token is expired (client-side check)
  if (TokenUtils.isExpired(token)) {
    console.warn('Token is expired');
    // Trigger logout to clean up state
    await authStore.logout();
    return false;
  }

  return true;
};
