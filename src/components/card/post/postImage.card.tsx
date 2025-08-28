'use client';

import { BlogCard } from '@/components/card/post/blog.card';
import { NoResultsFound } from '@/components/design/NoResultsFound';
import { ErrorLoading } from '@/components/loading/error';
import { LoadingSpin } from '@/components/loading/loading';
import { BlogList } from '@/lib/responses/blogLib';

export function PostImageRecent() {
  const { blogs, isLoading, isError } = BlogList(
    1,
    {
      page_size: 3,
      status: 'show',
    },
    0
  );
  return (
    <div className="py-8">
      {isLoading && <LoadingSpin />}

      {/* 👇 Handle error */}
      {isError && <ErrorLoading />}

      {/* 👇 Render blogs if data is loaded */}
      {!isLoading &&
        !isError &&
        (blogs && blogs.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((nominee) => (
              <BlogCard key={nominee.id} blog={nominee} />
            ))}
          </div>
        ) : (
          <NoResultsFound />
        ))}
    </div>
  );
}
