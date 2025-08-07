'use client';

import { AdminLayout } from '@/components/layouts/admin-layout/AdminLayout';
import ShuffleLoader from '@/components/loading/shuffle-loader';
import { useAuthStore } from '@/store';
import { logDebug } from '@/utils';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function AuthProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, loading, checkAuth } = useAuthStore();
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const verifyAuth = async () => {
      try {
        console.log('🔍 AuthProtectedLayout - Starting auth check...');
        console.log('🔍 Current auth state:', { isAuthenticated, loading });

        // ✅ CRITICAL FIX: Không redirect trong layout vì middleware đã handle
        await (checkAuth as any)(false); // shouldRedirect = false

        if (isMounted) {
          setAuthChecked(true);
          console.log('✅ Auth check completed in layout');
        }
      } catch (error) {
        console.error('❌ Authentication check failed:', error);
        if (isMounted) {
          setAuthChecked(true);
        }
      }
    };

    // Chỉ check auth nếu chưa authenticated
    if (!isAuthenticated) {
      verifyAuth();
    } else {
      console.log('✅ Already authenticated, skipping check');
      setAuthChecked(true);
    }

    return () => {
      isMounted = false;
    };
  }, [checkAuth, isAuthenticated]);

  if (loading || !authChecked) {
    console.log('🔄 Showing loader...', { loading, authChecked });
    return (
      <div>
        <ShuffleLoader />
      </div>
    );
  }

  if (!isAuthenticated) {
    logDebug('❌ Not authenticated, letting middleware handle redirect');
    return (
      <div>
        <ShuffleLoader />
      </div>
    );
  }

  console.log('✅ Rendering authenticated layout');
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main className="bg-[#FDEAD4]">
        <AdminLayout>{children}</AdminLayout>
      </main>
    </>
  );
}
