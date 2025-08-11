'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Input,
} from '@/components';
import { useState, useRef, useCallback } from 'react';
import type { AdminCategoryFilterProps } from '@/types';
import { Icons } from '@/assets/icons/icons';
import { RefreshButton } from '../button/refresh.button';

const TYPES = [
  { value: 'all', label: 'All' },
  { value: 'blogs', label: 'Blog' },
  { value: 'services', label: 'Service' },
];

export function AdminCategoryFilter({
  onPageSizeChange,
  handleRefresh,
  onSearchChange,
  onTypeChange,
}: AdminCategoryFilterProps) {
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleRefreshClick = useCallback(() => {
    setSearchValue('');
    handleRefresh?.();
  }, [handleRefresh]);

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchValue(value);
      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(() => {
        onSearchChange?.(value);
      }, 500);
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

  const handleRoleChange = useCallback(
    (value: string) => {
      setSelectedRole(value);
      onTypeChange?.(value === 'all' ? '' : value);
    },
    [onTypeChange]
  );

  const selectClass = 'w-full bg-white border-gray-200';

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 bg-main border-b">
      {/* Filters group */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 w-full">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search..."
            className={`pl-10 ${selectClass}`}
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>

        {/* Refresh */}
        <div className="flex-shrink-0">
          <RefreshButton onClick={handleRefreshClick} />
        </div>

        {/* Role */}
        <div className="flex items-center gap-2 min-w-[130px]">
          <span className="text-sm text-gray-200 whitespace-nowrap">TYPE:</span>
          <Select value={selectedRole} onValueChange={handleRoleChange}>
            <SelectTrigger className={selectClass}>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              {TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Page size */}
        <div className="flex items-center gap-2 min-w-[130px]">
          <span className="text-sm text-gray-200 whitespace-nowrap">SIZE:</span>
          <Select
            value={pageSize.toString()}
            onValueChange={handlePageSizeChange}
          >
            <SelectTrigger className={selectClass}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 40, 50].map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
