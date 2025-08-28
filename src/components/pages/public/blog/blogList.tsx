'use client';

import { PostCard } from '@/components/card/post/post.card';
import { CustomPagination } from '@/components/design/pagination';
import { BlogList } from '@/lib';
import { Loader2 } from 'lucide-react';
import { useCallback, useMemo, useRef } from 'react';

interface BlogGridProps {
  selectedCategory: string | null;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  refreshKey: number;
}

export default function BlogGrid({
  selectedCategory,
  currentPage,
  setCurrentPage,

  refreshKey,
}: BlogGridProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const params = useMemo(
    () => ({
      category_id: selectedCategory ?? undefined,
      page_size: 10,
      status: 'show',
    }),
    [selectedCategory]
  );

  const { blogs, isLoading, isError, pagination } = BlogList(
    currentPage,
    params,
    refreshKey
  );

  const handlePageChange = useCallback(
    (page: number) => {
      if (page > 0 && page <= pagination?.total_page) {
        setCurrentPage(page);
      }
    },
    [pagination?.total_page]
  );

  // Show loading state
  if (isLoading && currentPage === 1) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader2 className="animate-spin h-8 w-8 text-gray-600" />
        </div>
      </div>
    );
  }

  // Show error state
  if (isError) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-gray-600">
            Error loading blog posts. Please try again.
          </p>
        </div>
      </div>
    );
  }

  // Show no results
  if (!blogs || blogs.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-gray-600">
            No blog posts found for this category.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12" ref={sectionRef}>
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {blogs.map((post) => (
            <PostCard blog={post} key={post.id} />
          ))}
        </div>
        <CustomPagination
          currentPage={currentPage}
          totalPage={pagination.total_page}
          onPageChange={handlePageChange}
        />
      </section>
    </div>
  );
}
