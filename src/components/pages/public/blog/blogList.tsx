'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { BlogList } from '@/lib';
import { PostCard } from '@/components/card/post.card';

interface BlogGridProps {
  selectedCategory: string | null;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  allLoaded: boolean;
  setAllLoaded: (loaded: boolean) => void;
  refreshKey: number;
}

export default function BlogGrid({
  selectedCategory,
  currentPage,
  setCurrentPage,
  allLoaded,
  setAllLoaded,
  refreshKey,
}: BlogGridProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  const params = useMemo(
    () => ({
      category_id: selectedCategory ?? undefined,
      limit: 10,
    }),
    [selectedCategory]
  );

  const { blogs, isLoading, isError, pagination } = BlogList(
    currentPage,
    params,
    refreshKey
  );

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      const nextPage = currentPage + 1;
      if (nextPage <= pagination.total_page) {
        setCurrentPage(nextPage);
        setAllLoaded(nextPage >= pagination.total_page);
      }
      setLoading(false);
    }, 1500);
  };

  // Reset allLoaded when selectedCategory changes
  useEffect(() => {
    setAllLoaded(false);
  }, [selectedCategory, setAllLoaded]);

  // Scroll to section smoothly
  useEffect(() => {
    const scrollToSection = () => {
      if (sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };

    // Scroll after a short delay to ensure component is mounted
    const timer = setTimeout(scrollToSection, 500);
    return () => clearTimeout(timer);
  }, []);

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {blogs.map((post) => (
          <PostCard blog={post} />
        ))}
      </div>

      {/* Load More Button */}
      {!allLoaded && pagination && currentPage < pagination.total_page && (
        <div className="flex justify-center mt-12">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="px-8 py-3 bg-gray-900 text-white font-medium transition-all duration-300
                     hover:bg-main hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-main focus:ring-opacity-50
                     disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-gray-900 disabled:hover:scale-100"
          >
            {loading ? (
              <span className="flex items-center">
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
                LOADING...
              </span>
            ) : (
              'LOAD MORE'
            )}
          </button>
        </div>
      )}
    </div>
  );
}
