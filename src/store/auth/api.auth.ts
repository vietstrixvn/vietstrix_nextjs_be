// ==============================================
// 📁 store/auth/api.auth.ts - OPTIMIZED VERSION WITH TOKEN SUPPORT
// ==============================================

import { baseURL, endpoints } from '@/api';
import { AuthResponse } from '@/types';
import { logDebug, logError, TokenService } from '@/utils';

// 🔧 FIX: Convert class to object with methods for better compatibility
export const AuthAPI = {
  /**
   * Get access token from localStorage
   */
  getHeaders(includeAuth: boolean = false): Headers {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    // Add Authorization header if token exists and requested
    if (includeAuth) {
      const token = TokenService.getToken();
      if (token) {
        headers.append('Authorization', `Bearer ${token}`);
        logDebug('Added Authorization header to request');
      }
    }

    return headers;
  },

  /**
   * Authenticates a user with their username and password.
   * @param {string} username - The username of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<AuthResponse>} Response object and parsed data from API.
   */
  async login(username: string, password: string): Promise<AuthResponse> {
    try {
      logDebug('Attempting login for user:', username);

      const response = await fetch(`${baseURL}${endpoints.login}`, {
        method: 'POST',
        headers: this.getHeaders(false), // Don't include auth for login
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      const data = await response.json();

      logDebug('Login response status:', response.status);
      logDebug('Login response data structure:', {
        hasData: !!data.data,
        hasToken: !!data.data?.token,
        hasUser: !!data.data?.user,
        userRole: data.data?.user?.role,
      });

      return { response, data };
    } catch (error) {
      logError('Login API error:', error);
      throw new Error('Network error during login');
    }
  },

  /**
   * Refreshes the user's access token using the refresh token.
   * @returns {Promise<AuthResponse>} Response object and new token data.
   */
  async refreshLogin(): Promise<AuthResponse> {
    try {
      logDebug('Attempting to refresh login token');

      const response = await fetch(`${baseURL}${endpoints.refresh}`, {
        method: 'POST',
        headers: this.getHeaders(true),
        credentials: 'include',
      });

      const data = await response.json();

      logDebug('Refresh Login response status:', response.status);
      logDebug('Refresh Login response data structure:', {
        hasData: !!data.data,
        hasToken: !!data.data?.token,
        hasExpired: !!data.data?.expired,
      });

      return { response, data };
    } catch (error) {
      logError('Refresh login API error:', error);
      throw new Error('Network error during token refresh');
    }
  },
  /**
   * Logs the user out by clearing their session.
   * @returns {Promise<AuthResponse>} Response object and API response data.
   */
  async logout(): Promise<AuthResponse> {
    try {
      logDebug('Attempting logout');

      const response = await fetch(`${baseURL}${endpoints.logout}`, {
        method: 'POST',
        headers: this.getHeaders(true), // Include auth for logout
        credentials: 'include',
      });

      const data = await response.json();
      logDebug('Logout response status:', response.status);

      return { response, data };
    } catch (error) {
      console.error('Logout API error:', error);
      throw new Error('Network error during logout');
    }
  },

  /**
   * Fetches the currently authenticated user's details.
   * @returns {Promise<AuthResponse>} Response object and user data.
   */
  async getCurrentUser(): Promise<AuthResponse> {
    try {
      logDebug('Fetching current user info');

      const response = await fetch(`${baseURL}${endpoints.currentUser}`, {
        method: 'GET',
        headers: this.getHeaders(true), // Include auth for user info
        credentials: 'include',
      });

      logDebug('getCurrentUser HTTP status:', response.status);

      const data = await response.json();
      logDebug('getCurrentUser response data structure:', {
        hasData: !!data.data,
        userRole: data.data?.role?.slug || data.data?.role,
        userId: data.data?.id,
      });

      return { response, data };
    } catch (error) {
      console.error('GetCurrentUser API error:', error);
      logError('GetCurrentUser API error:', error);
      throw new Error('Network error while fetching user data');
    }
  },

  /**
   * Generic authenticated request helper
   * @param {string} endpoint - API endpoint
   * @param {RequestInit} options - Fetch options
   * @returns {Promise<AuthResponse>} Response object and data
   */
  async authenticatedRequest(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<AuthResponse> {
    try {
      let response = await fetch(`${baseURL}${endpoint}`, {
        ...options,
        headers: {
          ...Object.fromEntries(this.getHeaders(true).entries()),
          ...Object.fromEntries(new Headers(options.headers).entries()),
        },
        credentials: 'include',
      });

      if (response.status === 401) {
        logDebug('Token expired, attempting to refresh...');

        const refreshResult = await this.refreshLogin();
        if (refreshResult.data?.token) {
          localStorage.setItem('access_token', refreshResult.data.token);
          logDebug('Token refreshed, retrying request...');

          response = await fetch(`${baseURL}${endpoint}`, {
            ...options,
            headers: {
              ...Object.fromEntries(this.getHeaders(true).entries()),
              ...Object.fromEntries(new Headers(options.headers).entries()),
            },
            credentials: 'include',
          });
        } else {
          logError('Token refresh failed - forcing logout');
          throw new Error('Unauthorized: token refresh failed');
        }
      }

      const data = await response.json();
      return { response, data };
    } catch (error) {
      logError('Authenticated request error:', error);
      throw new Error('Network error during authenticated request');
    }
  },
};
