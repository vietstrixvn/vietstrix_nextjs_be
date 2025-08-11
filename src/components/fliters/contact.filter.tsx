'use client';

import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Input,
  PushButton,
  RefreshButton,
  LoadingSpin,
} from '@/components';
import { ServiceList } from '@/lib';
import { useState, useCallback, useRef } from 'react';
import { AdminContactFilterProps } from '@/types';

export function ContactFilter({
  onPageSizeChange,
  handleRefresh,
  onServiceChange,
  onStatusChange,
  onSearchChange,
}: AdminContactFilterProps) {
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('show');
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize params để tránh re-render không cần thiết
  const params = {
    limit: 10,
  };

  const { services, isLoading, isError } = ServiceList(1, params, 0);

  // Handler cho refresh button
  const handleRefreshClick = useCallback(() => {
    // Reset tất cả filters về giá trị mặc định
    setSelectedCategory('all');
    setSelectedStatus('show');

    setSearchValue('');

    handleRefresh?.();
  }, [handleRefresh]);

  // Debounce search để tránh gọi API quá nhiều
  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchValue(value);

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        onSearchChange?.(value);
      }, 500); // Delay 500ms
    },
    [onSearchChange]
  );

  const handlePageSizeChange = useCallback(
    (value: string) => {
      const newSize = Number(value);
      setPageSize(newSize);
      onPageSizeChange?.(value);
    },
    [onPageSizeChange]
  );

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 bg-main border-b">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search.."
            className="pl-10 bg-white border-gray-200"
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>

        <RefreshButton onClick={handleRefreshClick} />

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-200 whitespace-nowrap">
            {' '}
            SERVICE:
          </span>

          <Select
            value={selectedCategory}
            onValueChange={(value) => {
              setSelectedCategory(value);
              onServiceChange?.(value);
            }}
          >
            <SelectTrigger className="w-32 bg-white border-gray-200">
              <SelectValue placeholder="Chọn thể loại" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All</SelectItem>

              {/* Loading state */}
              {isLoading && (
                <SelectItem value="loading" disabled>
                  <LoadingSpin />
                </SelectItem>
              )}

              {/* Error state */}
              {isError && (
                <SelectItem value="error" disabled>
                  Lỗi tải thể loại
                </SelectItem>
              )}

              {/* List từ API */}
              {!isLoading &&
                !isError &&
                services?.map((services) => (
                  <SelectItem key={services.id} value={services.id}>
                    {services.slug}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-200 whitespace-nowrap">
            {' '}
            SIZE:
          </span>
          <Select
            value={pageSize.toString()}
            onValueChange={handlePageSizeChange}
          >
            <SelectTrigger className="w-32 bg-white border-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="40">40</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-200 whitespace-nowrap">
            {' '}
            STATUS:
          </span>
          <Select
            value={selectedStatus}
            onValueChange={(value) => {
              setSelectedStatus(value);
              onStatusChange?.(value);
            }}
          >
            <SelectTrigger className="w-32 bg-white border-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
