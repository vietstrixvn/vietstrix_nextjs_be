'use client';

import { ErrorLoading, LoadingSpin, NoResultsFound } from '@/components';
import { ServiceCard } from '@/components/card';
import { CustomPagination } from '@/components/design/pagination';
import { ServiceList } from '@/lib/responses/serviceLib';
import { useCallback, useState } from 'react';

export function ServiceFullData({
  selectedCategory,
}: {
  selectedCategory: string | null;
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const params = {
    category_id: selectedCategory ?? undefined,
    page_size: 10,
  };

  const { services, isLoading, isError, pagination } = ServiceList(
    currentPage,
    params,
    0
  );

  const handlePageChange = useCallback(
    (page: number) => {
      if (page > 0 && page <= pagination?.total_page) {
        setCurrentPage(page);
      }
    },
    [pagination?.total_page]
  );

  if (isLoading) {
    return <LoadingSpin />;
  }

  if (isError) {
    return <ErrorLoading />;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {services.length === 0 ? (
        <NoResultsFound />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((post) => (
            <ServiceCard service={post} key={post.id} />
          ))}
        </div>
      )}

      {/* Load More Button */}
      <CustomPagination
        currentPage={currentPage}
        totalPage={pagination.total_page}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
