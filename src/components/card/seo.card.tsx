'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SeoList } from '@/lib/responses/seoLib';
import { Skeleton } from '@/components/ui/skeleton';
import { RefreshButton } from '../button/refresh.button';
import { Check, Pencil, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { UpdateSeo } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SEOFormSchema } from '@/utils';
import { useUpdateSeo } from '@/hooks';
import type z from 'zod';
import { Badge } from '../ui/badge';

export const SeoCard = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const { seo, isLoading, isError } = SeoList(refreshKey);
  const [isEditing, setIsEditing] = useState(false);
  const { mutate: updateSeo } = useUpdateSeo();
  const [newKeyword, setNewKeyword] = useState('');

  const form = useForm<z.infer<typeof SEOFormSchema>>({
    resolver: zodResolver(SEOFormSchema),
    defaultValues: {
      site_title: '',
      site_description: '',
      domain: '',
      keywords: [],
      google_analytics_id: '',
      gtm_id: '',
      facebook_pixel_id: '',
      search_console_verification: '',
    },
  });

  // Khi load xong dữ liệu, set vào form
  useEffect(() => {
    if (seo) {
      form.reset({
        site_title: seo.site_title || '',
        site_description: seo.site_description || '',
        domain: seo.domain || '',
        keywords: seo.keywords || [],
        google_analytics_id: seo.google_analytics_id || '',
        gtm_id: seo.gtm_id || '',
        facebook_pixel_id: seo.facebook_pixel_id || '',
        search_console_verification: seo.search_console_verification || '',
      });
    }
  }, [seo, form]);

  const handleSave = form.handleSubmit((values) => {
    const payload: UpdateSeo = {
      ...values,
      keywords: values.keywords.map((k) => k.trim()),
    };
    updateSeo(
      { updateSeo: payload },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  });

  const removeKeyword = (keyword: string) => {
    const current = form.getValues('keywords') || [];
    form.setValue(
      'keywords',
      current.filter((k) => k !== keyword)
    );
  };

  const addKeyword = () => {
    const trimmed = newKeyword.trim();
    if (!trimmed) return;
    const current = form.getValues('keywords') || [];
    if (!current.includes(trimmed)) {
      form.setValue('keywords', [...current, trimmed]);
    }
    setNewKeyword('');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-2xl font-bold text-main uppercase">
              SEO Information
            </CardTitle>
            {!isEditing ? (
              <Button
                size="icon"
                className="h-8 w-8 rounded-full bg-main hover:bg-main-700"
                onClick={() => setIsEditing(true)}
              >
                <Pencil className="h-4 w-4 text-white" />
              </Button>
            ) : (
              <>
                <Button
                  size="icon"
                  className="h-8 w-8 rounded-full bg-green-600 hover:bg-green-700"
                  onClick={handleSave}
                >
                  <Check className="h-4 w-4 text-white" />
                </Button>
                <Button
                  size="icon"
                  className="h-8 w-8 rounded-full bg-red-600 hover:bg-red-700"
                  onClick={() => setIsEditing(false)}
                >
                  <X className="h-4 w-4 text-white" />
                </Button>
              </>
            )}
          </div>
          <RefreshButton onClick={() => setRefreshKey((prev) => prev + 1)} />
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
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold text-main">
                  Site Title
                </label>
                {isEditing ? (
                  <Input {...form.register('site_title')} />
                ) : (
                  <p className="text-sm text-gray-900 mt-1">{seo.site_title}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-bold text-main">
                  Description
                </label>
                {isEditing ? (
                  <Input {...form.register('site_description')} />
                ) : (
                  <p className="text-sm text-gray-900 mt-1">
                    {seo.site_description}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-bold text-main">Keywords</label>

                {isEditing ? (
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {form.watch('keywords')?.map((k: string, i: number) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {k}
                          <button
                            type="button"
                            onClick={() => removeKeyword(k)}
                            className="ml-1 rounded-full hover:bg-muted"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter keyword"
                        value={newKeyword}
                        onChange={(e) => setNewKeyword(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        onClick={addKeyword}
                        variant="outline"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {seo.keywords?.map((k, i) => (
                      <Badge key={i} variant="secondary">
                        {k}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-bold text-main">Domain</label>
                {isEditing ? (
                  <Input {...form.register('domain')} />
                ) : (
                  <p className="text-sm text-blue-600 mt-1">{seo.domain}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold text-main">
                  Google Analytics ID
                </label>
                {isEditing ? (
                  <Input {...form.register('google_analytics_id')} />
                ) : (
                  <p className="text-sm text-gray-900 mt-1">
                    {seo.google_analytics_id}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-bold text-main">GTM ID</label>
                {isEditing ? (
                  <Input {...form.register('gtm_id')} />
                ) : (
                  <p className="text-sm text-gray-900 mt-1">{seo.gtm_id}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-bold text-main">
                  Facebook Pixel ID
                </label>
                {isEditing ? (
                  <Input {...form.register('facebook_pixel_id')} />
                ) : (
                  <p className="text-sm text-gray-900 mt-1">
                    {seo.facebook_pixel_id}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-bold text-main">
                  Search Console Verification
                </label>
                {isEditing ? (
                  <Input {...form.register('search_console_verification')} />
                ) : (
                  <p className="text-sm text-gray-900 mt-1">
                    {seo.search_console_verification}
                  </p>
                )}
              </div>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
};
