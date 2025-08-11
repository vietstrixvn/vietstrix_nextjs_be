'use client';

import { NoResultsFound } from '@/components/design/NoResultsFound';
import { ServiceList } from '@/lib/responses/serviceLib';
import { useState, useCallback, useMemo } from 'react';
import { CustomPagination } from '@/components/design/pagination';
import { LoadingSpin } from '@/components/loading/loading';
import { ServiceTable } from '@/components/tables/service.table';
import { AdminContainer } from '@/components/container/admin.contaier';
import { AdminFilter } from '@/components/fliters/filter.design';

export default function ServiceListDataAdmin() {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [refreshKey, setRefreshKey] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const params = useMemo(
    () => ({
      ...(selectedStatus !== 'all' && { status: selectedStatus }),
      category_id: selectedCategory ?? undefined,
      page_size: pageSize,
    }),
    [selectedStatus, selectedCategory, pageSize]
  );

  // Memoize filter config
  const filter = useMemo(
    () => ({
      button: {
        href: '/admin/service/create_service',
        title: 'Create Service',
      },
      values: 'vll',
      type: 'services',
    }),
    []
  );

  const { services, isLoading, isError, pagination } = ServiceList(
    currentPage,
    params,
    refreshKey
  );

  // Optimize callbacks với useCallback
  const handlePageSizeChange = useCallback((value: string) => {
    const newSize = parseInt(value, 10);
    setPageSize(newSize);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback(
    (page: number) => {
      if (page > 0 && page <= pagination?.total_page) {
        setCurrentPage(page);
      }
    },
    [pagination?.total_page]
  );

  const handleRefresh = useCallback(() => {
    setRefreshKey((prev) => prev + 1); // Chỉ gọi 1 lần
  }, []);

  const handleCategoryChange = useCallback((value: string) => {
    setSelectedCategory(value === 'all' ? null : value);
    setCurrentPage(1);
  }, []);

  const handleStatusChange = useCallback((value: string) => {
    setSelectedStatus(value);
    setCurrentPage(1);
  }, []);

  return (
    <AdminContainer>
      {isLoading ? (
        <LoadingSpin />
      ) : isError ? (
        <NoResultsFound />
      ) : (
        <section>
          <AdminFilter
            filter={filter}
            handleRefresh={handleRefresh}
            onPageSizeChange={handlePageSizeChange}
            onCategoryChange={handleCategoryChange}
            onStatusChange={handleStatusChange}
          />
          <section className="mb-12">
            <ServiceTable
              services={services}
              isLoading={isLoading}
              isError={isError}
            />
            <CustomPagination
              currentPage={currentPage}
              totalPage={pagination.total_page}
              onPageChange={handlePageChange}
            />
          </section>
        </section>
      )}
    </AdminContainer>
  );
}
