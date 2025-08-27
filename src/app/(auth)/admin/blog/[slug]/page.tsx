'use client';

import { AdminContainer, CustomImage, LoadingSpin } from '@/components';
import { BackButton } from '@/components/button';
import { NoResultsFound } from '@/components/design/NoResultsFound';
import { BlogDetailData } from '@/lib/responses/blogLib';
import { formatSmartDate } from '@/utils';
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

  // if (!blog?.title || !blog?.content) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen">
  //       <LoadingSpin />
  //     </div>
  //   );
  // }

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

        <div className="mb-8  aspect-[16/9] relative w-full overflow-hidden">
          <CustomImage
            src={blog?.file || '/placeholder.svg'}
            alt={`Featured image for ${blog?.title}`}
            fill
            className="object-contain"
          />
        </div>
        <h2 className="text-xl mt-12 mb-6">{blog?.content}</h2>

        <div
          className="rich-text-content cursor-text mt-4"
          dangerouslySetInnerHTML={{
            __html: blog?.description ?? '',
          }}
        />
      </div>
    </AdminContainer>
  );
}
