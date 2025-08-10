// ==============================================
// 📁 store/auth/store.auth.ts - FIXED VERSION WITH PROPER REDIRECT
// ==============================================

import { AuthState } from '@/types/auth/auth.type';
import { persist, createJSONStorage } from 'zustand/middleware';
import { create } from 'zustand';
import { AuthAPI } from './api.auth';
import { CookieManager } from './cookie.auth';
import { logDebug, logError, logWarn } from '@/utils/logger';
import { handleAuthError } from './utils.auth';
import { toast } from 'sonner';

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
      login: async (username: string, password: string): Promise<boolean> => {
        try {
          set({ loading: true, error: null });

          const { response, data } = await AuthAPI.login(username, password);

          if (response.status === 200 && data?.data) {
            // Save access token to localStorage
            if (data.data.token) {
              const token = data.data.token;

              // Validate token format
              const parts = token.split('.');
              if (parts.length === 3) {
                try {
                  const payload = JSON.parse(atob(parts[1]));
                  const currentTime = Math.floor(Date.now() / 1000);
                  const isExpired = payload.exp < currentTime;

                  console.log('🔍 Token Debug:', {
                    currentTime,
                    tokenExp: payload.exp,
                    isExpired,
                    timeUntilExpiryMinutes: Math.round(
                      (payload.exp - currentTime) / 60
                    ),
                  });

                  if (isExpired) {
                    throw new Error('Server returned expired token');
                  }

                  TokenManager.set(token);
                  console.log('✅ Valid token saved to localStorage');
                } catch (decodeError) {
                  console.error('❌ Failed to decode token:', decodeError);
                  throw new Error('Invalid token format received from server');
                }
              } else {
                throw new Error('Invalid token format received from server');
              }
            } else {
              throw new Error('No token received from server');
            }

            // Set authentication cookie
            CookieManager.set('isAuthenticated', 'true', {
              expires: 7,
              sameSite: 'Lax',
            });

            // Extract and validate user info
            const userData = data.data.user;
            if (userData && userData.role) {
              const userRole = userData.role;
              const allowedRoles = ['admin', 'manager'];

              if (!allowedRoles.includes(userRole)) {
                TokenManager.remove();
                CookieManager.delete('isAuthenticated');
                throw new Error('You do not have access');
              }

              // ✅ FIX: Set auth state BEFORE redirect
              set({
                isAuthenticated: true,
                userInfo: userData,
                loading: false,
              });

              logDebug('Login successful with token and user info');
              toast.success('Login successful! Redirecting to dashboard...');

              // ✅ FIX: Add redirect after successful login
              setTimeout(() => {
                window.location.href = '/admin';
              }, 1000); // Small delay to show success message

              return true;
            } else {
              throw new Error('Invalid user data received from login response');
            }
          }

          if (response.status === 401 || response.status === 400) {
            throw new Error(
              'Incorrect login information, please check your account and password'
            );
          }

          throw new Error(data?.message || 'Login failed');
        } catch (error) {
          const errorMessage = handleAuthError(error);

          // Clean up all auth data on error
          TokenManager.remove();
          CookieManager.delete('isAuthenticated');
          localStorage.removeItem('auth-storage');

          set({
            isAuthenticated: false,
            userInfo: null,
            loading: false,
            error: errorMessage,
          });

          toast.error(errorMessage);
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

          // Try server logout but don't depend on it
          try {
            const { response } = await AuthAPI.logout();
            if (!response.ok) {
              console.warn(
                'Server logout failed, continuing with local logout'
              );
            }
          } catch (error) {
            logWarn('Server logout error:', error);
          }

          // Always perform local logout
          TokenManager.remove();
          CookieManager.delete('isAuthenticated');
          localStorage.removeItem('auth-storage');

          set({
            isAuthenticated: false,
            userInfo: null,
            loading: false,
            error: null,
          });

          toast.success('Log out successfully!');
          window.location.href = '/sign-in';
        } catch (error) {
          logError('Catastrophic error during logout:', error);

          // Force logout anyway
          TokenManager.remove();
          CookieManager.delete('isAuthenticated');
          localStorage.removeItem('auth-storage');

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
      checkAuth: async (shouldRedirect: boolean = true) => {
        // ✅ FIX: Don't run checkAuth if already authenticated and has valid data
        const currentState = get();
        if (currentState.isAuthenticated && currentState.userInfo) {
          console.log(
            '✅ Already authenticated with user info, skipping checkAuth'
          );
          return;
        }

        // Check both cookie and token existence
        const hasAuthCookie = CookieManager.check('isAuthenticated');
        const hasToken = TokenManager.get();

        console.log('🔍 checkAuth - Initial state:', {
          hasAuthCookie,
          hasToken: !!hasToken,
          shouldRedirect,
          currentAuth: currentState.isAuthenticated,
          hasUserInfo: !!currentState.userInfo,
        });

        if (!hasAuthCookie || !hasToken) {
          logDebug('Missing authentication cookie or token');

          // Clean up all auth data
          TokenManager.remove();
          CookieManager.delete('isAuthenticated');
          localStorage.removeItem('auth-storage');

          set({ isAuthenticated: false, userInfo: null, loading: false });

          if (shouldRedirect) {
            console.log('🔄 Redirecting to login - missing auth data');
            window.location.href = '/sign-in';
          }
          return;
        }

        try {
          set((state) => ({ ...state, loading: true }));
          console.log('🌐 Making getCurrentUser API call...');

          const { response, data } = await AuthAPI.getCurrentUser();

          if (response.status === 200 && data?.data) {
            const userRole = data.data.role?.slug || data.data.role;
            const allowedRoles = ['admin', 'manager'];

            console.log('✅ API response successful:', {
              userRole,
              allowedRoles,
            });

            if (!allowedRoles.includes(userRole)) {
              console.log('❌ Unauthorized role detected');
              logWarn(`Unauthorized role: ${userRole}. Logging out...`);
              toast.error('You do not have access. Logging out...');

              // Clean up all auth data
              TokenManager.remove();
              CookieManager.delete('isAuthenticated');
              localStorage.removeItem('auth-storage');

              set({
                isAuthenticated: false,
                userInfo: null,
                loading: false,
                error: null,
              });

              if (shouldRedirect) {
                window.location.href = '/sign-in';
              }
              return;
            }

            // Refresh auth cookie
            CookieManager.set('isAuthenticated', 'true', {
              expires: 7,
              secure: isProd,
              sameSite: 'Lax',
            });

            set({
              isAuthenticated: true,
              userInfo: data.data,
              loading: false,
            });

            console.log('✅ checkAuth successful - user authenticated');
          } else {
            console.log('❌ Invalid API response');
            throw new Error('Invalid user data received');
          }
        } catch (error) {
          console.log('❌ checkAuth API error:', error);
          logError('checkAuth error:', error);

          // Clean up all auth data on error
          TokenManager.remove();
          CookieManager.delete('isAuthenticated');
          localStorage.removeItem('auth-storage');

          set({
            isAuthenticated: false,
            userInfo: null,
            loading: false,
            error: null,
          });

          if (shouldRedirect) {
            console.log('🔄 Redirecting to login due to API error...');
            window.location.href = '/sign-in';
          }
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
        console.log('🔄 Zustand rehydrating state:', state);
        if (state && !isClient) {
          return;
        }
      },
    }
  )
);

export { TokenManager };
