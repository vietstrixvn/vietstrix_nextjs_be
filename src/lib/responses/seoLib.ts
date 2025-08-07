'use client';

import { useSeoData } from '@/hooks/seo/useSeo';
import type { SeoData } from '@/types/types';

export const SeoList = (refreshKey: number) => {
  const { data, isLoading, isError } = useSeoData(refreshKey);

  const seo = data ?? ({} as Partial<SeoData>);

  return {
    seo,
    isLoading,
    isError,
  };
};
