'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { handleAPI, endpoints } from '@/api';
import { toast } from 'sonner';
import type {
  Filters,
  FetchCategoryListResponse,
  CreateCategoryItem,
  UpdateCaterory,
} from '@/types';
import { buildQueryParams } from '@/utils';

/**
 * ==========================s
 * 📌 @HOOK useCategoryList
 * ==========================
 *
 * @desc Custom hook to get list of categories
 * @returns {Category[]} List of categories
 */

const fetchCategoriesList = async (
  pageParam: number = 1,
  filters: Filters
): Promise<FetchCategoryListResponse> => {
  try {
    const queryString = buildQueryParams(filters, pageParam);

    // Call API
    const response = await handleAPI(
      `${endpoints.categories}${queryString ? `?${queryString}` : ''}`,
      'GET',
      null
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching categories list:', error);
    throw error;
  }
};

/**
 * Custom hook to get list of categories using React Query.
 */
const useCategoryList = (
  page: number,
  filters: Filters = {},
  refreshKey: number
) => {
  return useQuery<FetchCategoryListResponse, Error>({
    queryKey: ['categoryList', page, filters, refreshKey],
    queryFn: () => fetchCategoriesList(page, filters),
    enabled: page > 0,
    staleTime: 60000,
  });
};

/**
 * ========== END OF @HOOK useCategoriesList ==========
 */

/**
 * ==========================
 * 📌 @HOOK useCreateCategory
 * ==========================
 **/

const CreateCategory = async (newCategory: CreateCategoryItem) => {
  try {
    const response = await handleAPI(
      `${endpoints.categories}`,
      'POST',
      newCategory
    );
    return response.data;
  } catch (error: any) {
    console.error('Error creating category:', error.response?.data);
    throw new Error(
      error.response?.data?.message || 'Failed to create category'
    );
  }
};

const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newCategory: CreateCategoryItem) => {
      return CreateCategory(newCategory);
    },
    onSuccess: () => {
      toast.success(' Category created successfully!');
      queryClient.invalidateQueries({ queryKey: ['categoryList'] });
    },
    onError: (error: any) => {
      console.error(error.message || 'Failed to create  category.');
    },
  });
};

/**
 * ========== END OF @HOOK useCreateCategory ==========
 */

const DeleteCategory = async (categoryId: string) => {
  try {
    if (!endpoints.categoryEdit) {
      throw new Error('Contact endpoint is not defined.');
    }

    const response = await handleAPI(
      `${endpoints.categoryEdit.replace(':id', categoryId)}`,
      'DELETE'
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error deleting Category:',
      error?.response?.data || error.message
    );
    throw new Error(
      error?.response?.data?.message || 'Failed to delete Category'
    );
  }
};

const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DeleteCategory,
    onSuccess: () => {
      toast.success('Delete Category Success!');
      queryClient.invalidateQueries({ queryKey: ['categoryList'] });
    },
    onError: (error: any) => {
      console.error(error.message || 'Failed to delete Category.');
    },
  });
};

const EditStatus = async (updateCategory: UpdateCaterory, cateId: string) => {
  try {
    if (!endpoints.categoryEdit) {
      throw null;
    }

    const url = endpoints.categoryEdit.replace(':id', cateId);

    const response = await handleAPI(url, 'PATCH', updateCategory);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to update service'
    );
  }
};

const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      updateCategory,
      cateId,
    }: {
      updateCategory: UpdateCaterory;
      cateId: string;
    }) => {
      return EditStatus(updateCategory, cateId);
    },
    onSuccess: () => {
      toast.success('Update category successfully!');
      queryClient.invalidateQueries({ queryKey: ['categoryList'] });
    },
  });
};

export {
  useCategoryList,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
};
