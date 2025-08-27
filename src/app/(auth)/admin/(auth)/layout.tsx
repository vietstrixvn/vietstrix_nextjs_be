'use client';

import ShuffleLoader from '@/components/loading/shuffle-loader';
import { useAuthStore } from '@/store';
import { logError } from '@/utils';
import React, { useEffect, useState } from 'react';

export default function AuthProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userInfo = useAuthStore((state) => state.userInfo);
  const loading = useAuthStore((state) => state.loading);
  const isAuthenticated = !!userInfo;
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const verifyAuth = async () => {
      try {
        if (isMounted) setAuthChecked(true);
      } catch (error) {
        logError('Authentication check failed:', error);
        if (isMounted) setAuthChecked(true);
      }
    };

    verifyAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!authChecked || loading) {
    return (
      <div>
        <ShuffleLoader />
      </div>
    );
  }

  return isAuthenticated && userInfo?.role === 'admin' ? <>{children}</> : null;
}
