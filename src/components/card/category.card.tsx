'use client';

import { CategoryList } from '@/lib';
import { NoResultsFound } from '../design/NoResultsFound';
import { CategoryCardProps } from '@/types';
import { useCallback } from 'react';
import { LoadingSpin } from '../loading/loading';

export const CategoryRecent: React.FC<CategoryCardProps> = ({
  onCategorySelect,
  type,
  selectedCategory = null,
}) => {
  // Create params for category fetching
  const params = {
    type: type,
    limit: 10,
  };

  const { categories, isLoading, isError } = CategoryList(1, params, 0);

  // Always call hooks before any early returns
  const handleCategoryClick = useCallback(
    (categoryId: string | null, categoryName?: string) => {
      if (onCategorySelect) {
        onCategorySelect(categoryId, categoryName);
      }
    },
    [onCategorySelect]
  );

  // Loading state - moved after hooks
  if (isLoading) {
    return <LoadingSpin />;
  }

  // Error state - moved after hooks
  if (isError || categories.length === 0) {
    return <NoResultsFound />;
  }

  return (
    <ul>
      <li className="mb-4">
        <div
          onClick={() => handleCategoryClick(null)}
          className={`cursor-pointer ${
            selectedCategory === null ? 'text-main' : 'text-gray-700'
          }`}
          aria-pressed={selectedCategory === null}
        >
          <p
            className={`text-16 border-b-2 pb-2 line-clamp-3 transform transition-all duration-300 hover:text-main ${
              selectedCategory === null
                ? 'border-main text-main font-medium'
                : 'border-gray-200'
            }`}
          >
            All
          </p>
        </div>
      </li>
      {categories.map((category, index) => (
        <li key={category.id || index} className="mb-4">
          <div
            onClick={() => handleCategoryClick(category.slug, category.name)}
            className={`cursor-pointer ${
              selectedCategory === category.id ? 'text-main' : 'text-gray-700'
            }`}
          >
            <p
              className={`text-16 border-b-2 pb-2 line-clamp-3 transform transition-all duration-300 hover:text-main ${
                selectedCategory === category.id
                  ? 'border-main text-main font-medium'
                  : 'border-gray-200'
              }`}
            >
              {category.name}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};
