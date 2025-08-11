'use client';

import { useAuthStore } from '@/store';
import { useEffect } from 'react';
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
    logDebug('🔍 Running initial checkAuth...');
    checkAuth(true);
  }, [checkAuth]);

  if (loading || !isAuthenticated || !userInfo) {
    return <ShuffleLoader />;
  }

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <AdminLayout>{children}</AdminLayout>
    </>
  );
}
