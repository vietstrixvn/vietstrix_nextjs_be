import type { Filters } from '@/types';
import { useBlogDetail, useBlogList } from '@/hooks/blog/useBlog';

export const BlogList = (
  currentPage: number,
  filters: Filters,
  refreshKey: number
) => {
  const { data, isLoading, isError } = useBlogList(
    currentPage,
    filters,
    refreshKey
  );

  const pagination = data?.pagination ?? { current_page: 1, total_page: 1 };

  const blogs = data?.results ?? [];

  return {
    blogs,
    isLoading,
    isError,
    pagination,
  };
};

// BlogDetailData.ts
export const BlogDetailData = (slug: string, refreshKey: number) => {
  const { data, isLoading, isError } = useBlogDetail(slug, refreshKey);

  return {
    data,
    isLoading,
    isError,
  };
};
