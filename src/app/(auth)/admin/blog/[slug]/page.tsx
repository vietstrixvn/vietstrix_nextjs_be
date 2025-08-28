'use client';

import { AdminContainer, CustomImage, LoadingSpin } from '@/components';
import { BackButton } from '@/components/button';
import { NoResultsFound } from '@/components/design/NoResultsFound';
import { RichTextParser } from '@/components/design/RichTextParser';
import { TableOfContents } from '@/components/design/TableOfContents';
import { BlogDetailData } from '@/lib/responses/blogLib';
import { extractHeadings, formatSmartDate } from '@/utils';
import { useParams } from 'next/navigation';

export default function Page() {
  const routerParams = useParams();
  const slug = Array.isArray(routerParams?.slug)
    ? routerParams.slug[0]
    : routerParams?.slug;

  if (!slug) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpin />
      </div>
    );
  }

  const { data: blog, isLoading, isError } = BlogDetailData(slug, 0);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpin />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <NoResultsFound />
      </div>
    );
  }

  const headings = blog?.description ? extractHeadings(blog.description) : [];

  return (
    <AdminContainer>
      <BackButton href="/admin/blog" />

      <div className="mx-auto">
        <header className="mb-8">
          <div className="mb-6">
            <h1 className="text-4xl sm:text-5xl font-bold mb-8">
              {blog?.title}
            </h1>
          </div>
          <div className="flex justify-between">
            <div className="mb-2 sm:mb-0 flex flex-wrap items-center gap-1 text-sm text-gray-600">
              <span>Unien</span>
              <span>-</span>
              <span>
                {blog?.created_at
                  ? formatSmartDate(blog.created_at)
                  : 'No date available'}
              </span>
              <span>-</span>
              <span>{blog?.category?.name}</span>
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

          <div className="col-span-12 lg:col-span-4">
            <div className="lg:sticky lg:top-24 space-y-4">
              {headings.length > 0 && <TableOfContents headings={headings} />}
            </div>
          </div>
        </div>
      </div>
    </AdminContainer>
  );
}
