import { useProjectDetail, useProjectList } from '@/hooks/project/useProject';
import type { Filters } from '@/types';

export const ProjectList = (
  currentPage: number,
  filters: Filters,
  refreshKey: number
) => {
  const { data, isLoading, isError } = useProjectList(
    currentPage,
    filters,
    refreshKey
  );

  // Đảm bảo có giá trị mặc định cho pagination
  const pagination = data?.pagination ?? { current_page: 1, total_page: 1 };

  // Lấy danh sách tài liệu (docs) từ API
  const projects = data?.results ?? [];

  return {
    projects,
    isLoading,
    isError,
    pagination,
  };
};

// BlogDetailData.ts
export const ProjectDetailData = (slug: string, refreshKey: number) => {
  const {
    data: project,
    isLoading,
    isError,
  } = useProjectDetail(slug, refreshKey);

  return {
    project,
    isLoading,
    isError,
  };
};
