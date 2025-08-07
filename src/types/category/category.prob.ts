import type { Category } from './category.type';

export interface CategoryCardProps {
  onCategorySelect?: (categoryId: string | null, categoryName?: string) => void;
  type: string;
  selectedCategory?: string | null;
}

/**
 * ==========================
 * 📌 @props CategoryTableProps
 * ==========================
 */

export interface CategoryTableProps {
  categories: Category[];
  isLoading: boolean;
  isError: boolean;
  onDelete: (id: string) => void;
}
