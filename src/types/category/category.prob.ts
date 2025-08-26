import type { Category } from './category.type';

export interface CategoryCardProps {
  onCategorySelect?: (categoryId: string | null, categoryName?: string) => void;
  type: string;
  selectedCategory?: string | null;
}

export interface CategoryFilterCardProps {
  onCategorySelect?: (categoryId: string | null, categoryName?: string) => void;
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

export interface UpdateCategoryDialogProps {
  category: Category;
  open: boolean;
  setOpen: (val: boolean) => void;
  onSuccess?: () => void;
}
