'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SeoList } from '@/lib/responses/seoLib';
import { Skeleton } from '@/components/ui/skeleton';
import { RefreshButton } from '../button/refresh.button';
import { Pencil } from 'lucide-react';
import { Button } from '../ui/button';

export const SeoCard = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const { seo, isLoading, isError } = SeoList(refreshKey);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-2xl font-bold text-main uppercase">
              SEO Information
            </CardTitle>
            <Button
              size="icon"
              className="h-8 w-8 rounded-full bg-main hover:bg-main-700"
              onClick={() => setRefreshKey((prev) => prev + 1)}
            >
              <Pencil className="h-4 w-4 text-white" />
            </Button>
          </div>
          <RefreshButton onClick={handleRefresh} />
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        ) : isError || !seo ? (
          <p className="text-red-500 text-sm">Failed to load SEO data.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold text-main">
                  Site Title
                </label>
                <p className="text-sm text-gray-900 mt-1">{seo.site_title}</p>
              </div>
              <div>
                <label className="text-sm font-bold text-main">
                  Description
                </label>
                <p className="text-sm text-gray-900 mt-1">
                  {seo.site_description}
                </p>
              </div>
              <div>
                <label className="text-sm font-bold text-main">Keywords</label>
                <p className="text-sm text-gray-900 mt-1">
                  {seo.keywords?.join(', ')}
                </p>
              </div>
              <div>
                <label className="text-sm font-bold text-main">Domain</label>
                <p className="text-sm text-blue-600 mt-1">{seo.domain}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold text-main">
                  Google Analytics ID
                </label>
                <p className="text-sm text-gray-900 mt-1">
                  {seo.google_analytics_id}
                </p>
              </div>
              <div>
                <label className="text-sm font-bold text-main">GTM ID</label>
                <p className="text-sm text-gray-900 mt-1">{seo.gtm_id}</p>
              </div>
              <div>
                <label className="text-sm font-bold text-main">
                  Facebook Pixel ID
                </label>
                <p className="text-sm text-gray-900 mt-1">
                  {seo.facebook_pixel_id}
                </p>
              </div>
              <div>
                <label className="text-sm font-bold text-main">
                  Search Console Verification
                </label>
                <p className="text-sm text-gray-900 mt-1">
                  {seo.search_console_verification}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
