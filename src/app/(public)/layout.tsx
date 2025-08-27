'use client';

import LoadingBanner from '@/components/animation/loading-banner';
import ScrollToTopButton from '@/components/button/scroll.button';
import DefaultLayout from '@/components/layouts/default-layout/default.layout';
import React, { useState } from 'react';

export default function CustomerLayoutDefault({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <LoadingBanner onLoadingComplete={() => setLoading(false)} />}
      {!loading && (
        <DefaultLayout>
          <div>{children}</div>
          <ScrollToTopButton />
        </DefaultLayout>
      )}
    </>
  );
}
