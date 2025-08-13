import { useServiceDetail, useServiceList } from '@/hooks';
import type { Filters } from '@/types';

export const ServiceList = (
  currentPage: number,
  filters: Filters,
  refreshKey: number
) => {
  const { data, isLoading, isError } = useServiceList(
    currentPage,
    filters,
    refreshKey
  );

  const pagination = data?.pagination ?? { current_page: 1, total_page: 1 };

  const services = data?.results ?? [];

  return {
    services,
    isLoading,
    isError,
    pagination,
  };
};

// ServiceDetailData.ts
export const ServiceDetailData = (slug: string, refreshKey: number) => {
  const { data, isLoading, isError } = useServiceDetail(slug, refreshKey);

  return {
    data,
    isLoading,
    isError,
  };
};
