'use client';

import { Container, CustomImage, LoadingSpin, Separator } from '@/components';
import { BackButton, ShareButtons } from '@/components/button';
import { PostImageRecent, PostRecent } from '@/components/card';
import { Heading } from '@/components/design/Heading';
import { NoResultsFound } from '@/components/design/NoResultsFound';
import { RichTextParser } from '@/components/design/RichTextParser';
import { TableOfContents } from '@/components/design/TableOfContents';
import { BlogDetailData } from '@/lib';
import { extractHeadings, formatSmartDate } from '@/utils';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function BlogDetailPage({ slug }: { slug: string }) {
  const { data: blog, isLoading, isError } = BlogDetailData(slug, 0);
  const pathname = usePathname();
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUrl(window.location.origin + pathname);
    }
  }, [pathname]);

  const showContentError = isError;
  const headings = blog?.description ? extractHeadings(blog.description) : [];

  return (
    <Container>
      <div className="mt-24">
        <BackButton href="/blogs" />
        {isLoading ? (
          <LoadingSpin />
        ) : showContentError ? (
          <NoResultsFound message="Không thể hiển thị nội dung dịch vụ." />
        ) : (
          <>
            <header className="mb-4">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                  {blog?.title}
                </h1>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="relative h-6 w-6 overflow-hidden">
                      <CustomImage
                        src="/icons/logo.svg"
                        alt="Profile Image"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-sm">VietStrix</span>
                  </div>
                  <span>-</span>
                  <span>
                    {blog?.created_at
                      ? formatSmartDate(blog.created_at)
                      : 'No date available'}
                  </span>
                  {blog?.category?.name && (
                    <>
                      <span>-</span>
                      <span className="px-2 py-1 text-gray-700 text-base">
                        {blog?.category.name}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </header>

            <div className="relative aspect-image-main w-full mb-8">
              <CustomImage
                src={blog?.file || '/placeholder.svg'}
                alt={`Featured image for ${blog?.title}`}
                fill
                className="object-contain rounded-lg"
                priority
              />
            </div>

            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 lg:col-span-8">
                <div>
                  <div className="prose prose-lg max-w-none dark:prose-invert">
                    <p className="text-lg text-gray-600 dark:text-gray-300 font-medium mb-8 leading-relaxed">
                      {blog?.content}
                    </p>
                    <div className="rich-text-content">
                      {blog?.description && (
                        <RichTextParser html={blog.description} />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-12 lg:col-span-4">
                <div className="lg:sticky lg:top-24 space-y-4">
                  <ShareButtons title={blog?.title} url={url} />

                  <TableOfContents headings={headings} />

                  <div>
                    <Heading name="Related Posts" />
                    <PostRecent category_id={blog?.category?.id} />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <Separator className="mt-4" />
        <PostImageRecent />
      </div>
    </Container>
  );
}
