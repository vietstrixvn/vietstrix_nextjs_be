'use client';

import { DelayedLoading, AdminLayout } from '@/components';

import { useAuthStore } from '@/store';
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
        await checkAuth();
        if (isMounted) setAuthChecked(true);
      } catch (error) {
        console.error('Authentication check failed:', error);
        if (isMounted) {
          setAuthChecked(true);
        }
      }
    };

    verifyAuth();

    return () => {
      isMounted = false; // Prevent state updates after unmount
    };
  }, [checkAuth]);

  useEffect(() => {
    if (authChecked && !loading && !isAuthenticated) {
      setTimeout(() => {
        router.replace('/login');
      }, 3000);
    }
  }, [isAuthenticated, loading, router, authChecked]);

  // Show loading state while checking authentication
  if (loading || !authChecked) {
    return (
      <div>
        <DelayedLoading />
      </div>
    );
  }

  return isAuthenticated ? (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <AdminLayout>{children}</AdminLayout>;;
    </>
  ) : null;
}
