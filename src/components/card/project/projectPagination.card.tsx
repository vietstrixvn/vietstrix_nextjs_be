'use client';

import { Button } from '@/components';
import type { PaginationProps } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const ProjectPagination = ({
  currentPage,
  totalPage,
  onPageChange,
}: PaginationProps) => {
  if (totalPage <= 1) return null;

  return (
    <div className="flex justify-center items-center mt-4">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        className="w-10 h-10 border-gray-300 hover:bg-gray-100 transition-colors duration-200 bg-transparent"
        aria-label="Previous case study"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        className="w-10 h-10 border-gray-300 hover:bg-gray-100 transition-colors duration-200 bg-transparent"
        aria-label="Next case study"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};
