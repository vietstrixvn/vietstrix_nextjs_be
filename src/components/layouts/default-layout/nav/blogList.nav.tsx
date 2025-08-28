import { ErrorLoading } from '@/components/loading/error';
import { BlogList } from '@/lib';
import { cn } from '@/utils';
import Link from 'next/link';
import { useMemo } from 'react';

export const BlogListNav = ({ category }: { category: string }) => {
  const params = useMemo(
    () => ({
      category_id: category,
      page_size: 4,
      status: 'show',
    }),
    [category]
  );

  const { blogs, isLoading, isError } = BlogList(1, params, 0);
  // Early return for loading state
  if (isLoading) {
    return (
      <ul className="ml-6 space-y-1">
        {Array.from({ length: 3 }).map((_, i) => (
          <li key={i} className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
        ))}
      </ul>
    );
  }

  // Early return for error state
  if (isError) {
    return (
      <ul className="ml-6 space-y-1">
        <li>
          <ErrorLoading />
        </li>
      </ul>
    );
  }

  // Early return for empty results - không render gì cả thay vì NoResultsFound
  if (!blogs || blogs.length === 0) {
    return null; // hoặc return <div className="ml-6 text-gray-400 text-xs">No services</div>;
  }

  // Render services
  return (
    <div className="flex flex-col gap-3">
      {blogs.map(({ title, slug, id }, index) => (
        <div key={id} className="flex items-center gap-2">
          <span className="text-gray-400 text-lg font-light w-8">
            {String(index + 1).padStart(2, '0')}
          </span>
          <Link
            href={`/blogs/${slug}`}
            className={cn(
              'text-sm font-light text-gray-700 transition-all duration-300 hover:text-black hover:font-medium'
            )}
          >
            {title}
          </Link>
        </div>
      ))}
    </div>
  );
};
