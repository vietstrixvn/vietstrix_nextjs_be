'use client';

import { BlogDetailData } from '@/lib/responses/blogLib';
import { useParams } from 'next/navigation';
import { NoResultsFound } from '@/components/design/NoResultsFound';
import { formatSmartDate } from '@/utils/formatTimeAgo';
import { BackButton, CustomImage, LoadingSpin } from '@/components';
import { AdminContainer } from '@/components/wrappers/admin.wrapper';
import { AdminBreadCrumb } from '@/components/layout/AdminLayout/admin.breadcrumb';

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

  if (!blog?.title || !blog?.content) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpin />
      </div>
    );
  }

  return (
    <AdminContainer>
      <div className="mb-8">
        <AdminBreadCrumb title="Bài Viết" />
      </div>
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
                {blog?.createdAt
                  ? formatSmartDate(blog.createdAt)
                  : 'No date available'}
              </span>
              <span>-</span>
              <span>{blog?.category?.name}</span>
            </div>
          </div>
        </header>

        <div className="mb-8  relative h-[400px] w-full overflow-hidden">
          <CustomImage
            src={blog?.file || '/Logo.svg'}
            alt={`Featured image for ${blog?.title}`}
            fill
            className="object-contain"
          />
        </div>
        <h2 className="text-xl mt-12 mb-6">{blog?.content}</h2>

        <div
          className="rich-text-content mt-4"
          dangerouslySetInnerHTML={{
            __html: blog.content ?? '',
          }}
        />
      </div>
    </AdminContainer>
  );
}
