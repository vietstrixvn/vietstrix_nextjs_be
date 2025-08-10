'use client';

import { useAuthStore } from '@/store';
import { useEffect } from 'react';
import { CookieManager } from '@/store/auth/cookie.auth';
import { TokenManager } from '@/store/auth/store.auth';
import { AuthProtectedLayoutProps } from '@/types/auth/auth.prob';
import { AdminLayout } from '@/components/layouts/admin-layout/AdminLayout';
import { logDebug } from '@/utils';
import ShuffleLoader from '@/components/loading/shuffle-loader';
import Head from 'next/head';

export default function AuthProtectedLayout({
  children,
}: AuthProtectedLayoutProps) {
  const { isAuthenticated, userInfo, loading, checkAuth } = useAuthStore();

  useEffect(() => {
    logDebug('🔍 AuthProtectedLayout - Starting auth check...');
    logDebug('🔍 Current auth state:', {
      isAuthenticated,
      loading,
      hasUserInfo: !!userInfo,
    });

    const hasAuthCookie = CookieManager.check('isAuthenticated');
    const hasToken = TokenManager.get();

    logDebug('🔍 Auth data check:', {
      hasAuthCookie,
      hasToken: !!hasToken,
      isAuthenticated,
      hasUserInfo: !!userInfo,
    });

    const needsAuthCheck =
      !isAuthenticated ||
      !userInfo ||
      (hasAuthCookie && hasToken && !isAuthenticated);

    if (needsAuthCheck) {
      logDebug('🔄 Running checkAuth - missing auth data');
      checkAuth(true);
    } else {
      logDebug('✅ Auth state complete, skipping checkAuth');
    }

    logDebug('✅ Auth check completed in layout');
  }, []);

  if (loading && !isAuthenticated) {
    return <ShuffleLoader />;
  }

  // ✅ FIX: Only render children if fully authenticated
  if (!isAuthenticated || !userInfo) {
    return <ShuffleLoader />;
  }

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <AdminLayout>{children}</AdminLayout>;
    </>
  );
}
