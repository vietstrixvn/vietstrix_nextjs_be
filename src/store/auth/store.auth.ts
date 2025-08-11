// ==============================================
// 📁 store/auth/store.auth.ts - FIXED VERSION WITH PROPER REDIRECT
// ==============================================
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { toast } from 'sonner';

import { AuthState } from '@/types';
import { AuthAPI } from './api.auth';
import { CookieManager } from './cookie.auth';
import { handleAuthError } from './utils.auth';
import {
  clearAuthStorage,
  isTokenExpired,
  refreshWithMutex,
  logDebug,
  logWarn,
} from '@/utils';

const isProd = process.env.NODE_ENV === 'production';
const isClient = typeof window !== 'undefined';

// Token management utilities
const TokenManager = {
  set: (token: string) => {
    if (isClient) {
      localStorage.setItem('access_token', token);
      logDebug('Access token saved to localStorage');
    }
  },

  get: (): string | null => {
    if (isClient) {
      return localStorage.getItem('access_token');
    }
    return null;
  },

  remove: () => {
    if (isClient) {
      localStorage.removeItem('access_token');
      logDebug('Access token removed from localStorage');
    }
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      loading: false,
      error: null,
      userInfo: null,
      clearError: () => set({ error: null }),

      /**
       * LOGIN - FIXED VERSION WITH REDIRECT
       */
      login: async (username, password) => {
        set({ loading: true, error: null });
        try {
          const { response, data } = await AuthAPI.login(username, password);
          if (response.status !== 200 || !data?.data?.token)
            throw new Error('Login failed');

          const token = data.data.token;
          if (isTokenExpired(token)) throw new Error('Expired token');

          TokenManager.set(token);

          const userData = data.data.user;
          if (!['admin', 'manager'].includes(userData?.role))
            throw new Error('No access');

          CookieManager.set('isAuthenticated', 'true', {
            expires: 7,
            sameSite: 'Lax',
          });
          CookieManager.set('userRole', userData.role, {
            expires: 7,
            sameSite: 'Lax',
          });

          set({ isAuthenticated: true, userInfo: userData, loading: false });
          toast.success('Login successful!');
          window.location.href = '/admin';
          return true;
        } catch (err) {
          clearAuthStorage();
          set({
            isAuthenticated: false,
            userInfo: null,
            loading: false,
            error: null,
          });
          const msg = handleAuthError(err);
          set({ error: msg });
          toast.error(msg);
          return false;
        }
      },
      /**
       * FETCH USER INFO
       */
      fetchUserInfo: async () => {
        if (!get().isAuthenticated) return;

        try {
          set({ loading: true });

          const { response, data } = await AuthAPI.getCurrentUser();

          if (response.status === 200 && data) {
            set({ userInfo: data.data || null, loading: false });
          } else {
            throw new Error('Failed to fetch user info');
          }
        } catch (error) {
          const errorMessage = handleAuthError(error);
          set({ loading: false, error: errorMessage });
          toast.error(errorMessage);
        }
      },

      /**
       * LOGOUT
       */
      logout: async () => {
        try {
          set({ loading: true });

          // 🔹 Gọi server logout (không bắt buộc thành công)
          try {
            const { response } = await AuthAPI.logout();
            if (!response.ok) {
              logWarn('Server logout failed, continuing with local logout');
            }
          } catch (error) {
            logWarn('Server logout error:', error);
          }
        } finally {
          // 🔹 Luôn clear local auth
          clearAuthStorage();
          set({
            isAuthenticated: false,
            userInfo: null,
            loading: false,
            error: null,
          });

          window.location.href = '/sign-in';
        }
      },

      /**
       * CHECK AUTH - OPTIMIZED VERSION
       */
      checkAuth: async (shouldRedirect = true, maxRetry = 1) => {
        const clearAuth = () => {
          TokenManager.remove();
          CookieManager.delete('isAuthenticated');
          set({ isAuthenticated: false, userInfo: null, loading: false });
        };

        const hasAuthCookie = CookieManager.exists('isAuthenticated');
        let token = TokenManager.get();

        if (!hasAuthCookie && !token) {
          clearAuth();
          if (shouldRedirect) window.location.href = '/sign-in';
          return;
        }

        try {
          set({ loading: true });

          if (token && isTokenExpired(token)) {
            const ref = await refreshWithMutex();
            if (ref?.token) token = ref.token;
            else {
              clearAuth();
              if (shouldRedirect) window.location.href = '/sign-in';
              return;
            }
          }

          const { response, data } = await AuthAPI.getCurrentUser();

          if (response.status === 200 && data?.data) {
            const role = data.data.role?.slug || data.data.role;
            if (!['admin', 'manager'].includes(role)) {
              clearAuth();
              if (shouldRedirect) window.location.href = '/sign-in';
              return;
            }

            CookieManager.set('isAuthenticated', 'true', {
              expires: 7,
              secure: isProd,
              sameSite: 'Lax',
            });
            CookieManager.set('userRole', role, {
              expires: 7,
              secure: isProd,
              sameSite: 'Lax',
            });
            set({ isAuthenticated: true, userInfo: data.data, loading: false });
            return;
          }

          if (
            (response.status === 401 || response.status === 403) &&
            maxRetry > 0
          ) {
            const ref = await refreshWithMutex();
            if (ref?.token) {
              TokenManager.set(ref.token);
              return get().checkAuth(shouldRedirect, maxRetry - 1);
            }
          }

          throw new Error(data?.message || 'Invalid user data received');
        } catch {
          clearAuth();
          if (shouldRedirect) window.location.href = '/sign-in';
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: isClient ? createJSONStorage(() => localStorage) : undefined,
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        userInfo: state.userInfo,
      }),
      skipHydration: false,
      onRehydrateStorage: () => (state) => {
        if (state && !isClient) {
          return;
        }
      },
    }
  )
);

export { TokenManager };
