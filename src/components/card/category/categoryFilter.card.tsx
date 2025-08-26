'use client';

import { CategoryList } from '@/lib/responses/categoriesLib';
import type { Category, CategoryFilterCardProps } from '@/types';
import React, { useCallback, useMemo } from 'react';

export const CategoryFilterCard: React.FC<CategoryFilterCardProps> = ({
  onCategorySelect,
  selectedCategory = null,
}) => {
  const params = useMemo(
    () => ({
      page_size: 10,
      type: 'services',
    }),
    []
  );

  const { categories, isLoading, isError } = CategoryList(1, params, 0);

  const slugToIdMap = useMemo(() => {
    const map: Record<string, string> = {};
    categories?.forEach((c) => {
      map[c.slug] = c.id;
    });
    return map;
  }, [categories]);

  const handleCategoryClick = useCallback(
    (categorySlug: string | null, categoryName?: string) => {
      if (onCategorySelect) {
        const categoryId = categorySlug ? slugToIdMap[categorySlug] : null;
        onCategorySelect(categoryId, categoryName);
      }

      const newUrl = categorySlug
        ? `#${categorySlug}`
        : window.location.pathname;
      history.replaceState(null, '', newUrl);
    },
    [onCategorySelect, slugToIdMap]
  );

  const skeletonItems = useMemo(
    () =>
      Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="h-6 w-24 bg-gray-300 animate-pulse rounded-md flex-shrink-0"
        />
      )),
    []
  );

  const categoryButtons = useMemo(() => {
    if (!categories || categories.length === 0) return null;

    return categories.map((category: Category) => (
      <button
        key={category.slug} // slug làm key luôn
        onClick={() => handleCategoryClick(category.slug, category.title)}
        className={`pb-4 px-1 whitespace-nowrap flex-shrink-0 transition-colors duration-200 ${
          selectedCategory === category.slug
            ? 'text-main border-b-2 border-primary font-bold'
            : 'text-gray-700 font-bold hover:text-main'
        }`}
        aria-pressed={selectedCategory === category.slug}
      >
        {category.title}
      </button>
    ));
  }, [categories, selectedCategory, handleCategoryClick]);

  return (
    <nav
      className="flex overflow-x-auto pb-4 space-x-8 scrollbar-hide"
      aria-label="Category navigation"
    >
      {isLoading ? (
        skeletonItems
      ) : isError ? (
        <p className="text-red-500 text-sm" role="alert">
          Failed to load categories.
        </p>
      ) : (
        <>
          {/* View all button */}
          <button
            onClick={() => handleCategoryClick(null)}
            className={`pb-4 px-1 font-medium whitespace-nowrap flex-shrink-0 transition-colors duration-200 ${
              selectedCategory === null
                ? 'text-main font-bold border-b-2 border-primary'
                : 'text-gray-600 hover:text-main'
            }`}
            aria-pressed={selectedCategory === null}
          >
            All
          </button>

          {/* Category buttons */}
          {categoryButtons}
        </>
      )}
    </nav>
  );
};
