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
       * ==========================
       * 📌 @HOOK useLoginAuthStore
       * ==========================
       */
      login: async (username: string, password: string): Promise<boolean> => {
        try {
          set({ loading: true, error: null });

          const { response, data } = await AuthAPI.login(username, password);

          if (response.status === 200 && data?.data) {
            // 🔥 NEW: Save access token to localStorage
            if (data.data.token) {
              TokenManager.set(data.data.token);
            }

            // Set authentication cookie
            CookieManager.set('isAuthenticated', 'true', {
              expires: 7,
              sameSite: 'Lax',
            });

            // 🔥 UPDATED: Extract user info from login response
            const userData = data.data.user;
            if (userData && userData.role) {
              const userRole = userData.role;
              const allowedRoles = ['admin', 'manager'];

              if (!allowedRoles.includes(userRole)) {
                // Clean up tokens if role is not allowed
                TokenManager.remove();
                CookieManager.delete('isAuthenticated');
                throw new Error('You do not have access');
              }

              set({
                isAuthenticated: true,
                userInfo: userData,
                loading: false,
              });

              logDebug('Login successful with token and user info');
              toast.success('Login successful! Redirecting to home page..');
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
       * ==========================
       * 📌 @HOOK useFetchUserInfo
       * ==========================
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
       * ==========================
       * 📌 @HOOK logout
       * ==========================
       */
      logout: async () => {
        try {
          set({ loading: true });

          // Try server logout but don't depend on it for local logout
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

          // Always perform local logout - clean up all auth data
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
          window.location.href = '/login';
        } catch (error) {
          logError('Catastrophic error during logout:', error);

          // Force logout anyway - clean up all auth data
          TokenManager.remove();
          CookieManager.delete('isAuthenticated');
          localStorage.removeItem('auth-storage');

          set({
            isAuthenticated: false,
            userInfo: null,
            loading: false,
            error: handleAuthError(error),
          });

          window.location.href = '/login';
        }
      },

      /**
       * ==========================
       * 📌 @HOOK useCheckAuthStore
       * ==========================
       */
      checkAuth: async (shouldRedirect: boolean = true) => {
        // Check both cookie and token existence
        const hasAuthCookie = CookieManager.check('isAuthenticated');
        const hasToken = TokenManager.get();

        if (!hasAuthCookie || !hasToken) {
          logDebug('Missing authentication cookie or token');

          // Clean up all auth data
          TokenManager.remove();
          CookieManager.delete('isAuthenticated');
          localStorage.removeItem('auth-storage');

          set({ isAuthenticated: false, userInfo: null, loading: false });

          if (shouldRedirect) {
            window.location.href = '/login';
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
            logDebug(`User role: ${userRole}`);

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
                console.log(
                  '🔄 Redirecting to login due to unauthorized role...'
                );
                window.location.href = '/login';
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
            window.location.href = '/login';
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
      // ✅ FIX: Prevent hydration mismatch
      skipHydration: false,
      // ✅ FIX: Only rehydrate on client side
      onRehydrateStorage: () => (state) => {
        console.log('🔄 Zustand rehydrating state:', state);
        if (state && !isClient) {
          // Don't rehydrate on server
          return;
        }
      },
    }
  )
);

// Export token manager for use in other parts of the app
export { TokenManager };
