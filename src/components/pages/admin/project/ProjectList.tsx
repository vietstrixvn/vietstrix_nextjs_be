'use client';

import { NoResultsFound } from '@/components/design/NoResultsFound';
import { useCallback, useMemo, useState } from 'react';
import { LoadingSpin } from '@/components';
import { CustomPagination } from '@/components/design/pagination';
import { ProjectList } from '@/lib/responses/projectLib';
import { ProjectTable } from '@/components/tables/project.table';
import { ProjectFilter } from '@/components/fliters/project.filter';

export default function ProjectListDataAdmin() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [selectedStatus, setSelectedStatus] = useState('all');
  const [refreshKey, setRefreshKey] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const params = {
    ...(selectedStatus !== 'all' && { status: selectedStatus }),
    service_id: selectedCategory ?? undefined,
    page_size: pageSize,
  };

  const { projects, isLoading, isError, pagination } = ProjectList(
    currentPage,
    params,
    refreshKey
  );

  const filter = useMemo(
    () => ({
      button: {
        href: '/admin/project/create_project',
        title: 'Create Project',
      },
      values: 'vll',
      type: 'services',
    }),
    []
  );

  const handlePageSizeChange = (value: string) => {
    const newSize = parseInt(value, 10);
    setPageSize(newSize);
    setCurrentPage(1); // Reset về trang đầu tiên khi đổi số lượng
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= pagination.total_page) {
      setCurrentPage(page);
    }
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
    setRefreshKey((prev) => prev + 1); // Refresh data manually
  };

  const handleStatusChange = useCallback((value: string) => {
    setSelectedStatus(value);
    setCurrentPage(1);
  }, []);

  const handleCategoryChange = useCallback((value: string) => {
    setSelectedCategory(value === 'all' ? null : value);
    setCurrentPage(1);
  }, []);

  return (
    <main>
      {isLoading ? (
        <LoadingSpin />
      ) : isError ? (
        <NoResultsFound />
      ) : (
        <section>
          <ProjectFilter
            filter={filter}
            handleRefresh={handleRefresh}
            onPageSizeChange={handlePageSizeChange}
            onStatusChange={handleStatusChange}
            onCategoryChange={handleCategoryChange}
          />

          {/* Services list */}
          <section className="mb-12">
            <ProjectTable
              projects={projects}
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
    </main>
  );
}
