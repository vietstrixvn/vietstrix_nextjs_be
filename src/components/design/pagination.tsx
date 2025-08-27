'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components';
import type { PaginationProps } from '@/types';

export const CustomPagination = ({
  currentPage,
  totalPage,
  onPageChange,
}: PaginationProps) => {
  if (totalPage <= 1) return null;

  return (
    <div className="flex justify-center items-center mt-4">
      <Pagination>
        <PaginationContent>
          {/* Previous (luôn có chỗ, chỉ ẩn khi page=1) */}
          <PaginationItem>
            <div className={currentPage === 1 ? 'invisible' : ''}>
              <PaginationPrevious
                onClick={() => onPageChange(currentPage - 1)}
              />
            </div>
          </PaginationItem>

          {Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={currentPage === page}
                onClick={() => onPageChange(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Next (luôn có chỗ, chỉ ẩn khi page=last) */}
          <PaginationItem>
            <div className={currentPage === totalPage ? 'invisible' : ''}>
              <PaginationNext onClick={() => onPageChange(currentPage + 1)} />
            </div>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
