import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { UpdateWebsite, WebsiteData } from '@/types';
import { endpoints, handleAPI } from '@/api';
import { toast } from 'sonner';

/**
 * ==========================s
 * 📌 @HOOK useCategoryList
 * ==========================
 *
 * @desc Custom hook to get list of categories
 * @returns {Category[]} List of categories
 */

const fetchWebsiteData = async (): Promise<WebsiteData> => {
  try {
    // Call API
    const response = await handleAPI(`${endpoints.website}`, 'GET', null);

    return response.data;
  } catch (error) {
    console.error('Error fetching seo data:', error);
    throw error;
  }
};

/**
 * Custom hook to get list of categories using React Query.
 */
const useWebsiteData = (refreshKey: number) => {
  return useQuery<WebsiteData, Error>({
    queryKey: ['webisteData', refreshKey],
    queryFn: () => fetchWebsiteData(),
    staleTime: process.env.NODE_ENV === 'development' ? 1000 : 300000,
  });
};

/**
 * ========== END OF @HOOK useCategoriesList ==========
 */

const UpdateWebData = async (updateweb: UpdateWebsite) => {
  try {
    const response = await handleAPI(
      `${endpoints.website}`,
      'PATCH',
      updateweb
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to update contact'
    );
  }
};

const useUpdateWebsiteData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ updateweb }: { updateweb: UpdateWebsite }) => {
      return UpdateWebData(updateweb);
    },
    onSuccess: () => {
      toast.success('Update website successfully!');
      queryClient.invalidateQueries({ queryKey: ['webisteData'] });
    },
  });
};

export { useWebsiteData, useUpdateWebsiteData };
