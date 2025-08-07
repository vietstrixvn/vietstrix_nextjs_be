import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { endpoints, handleAPI } from '@/api';
import type {
  FetchServiceListResponse,
  CreateServiceItem,
  ServiceDetail,
} from '@/types/types';
import type { UpdateStatus, Filters } from '@/types';
import { toast } from 'sonner';
import { buildQueryParams } from '@/utils';

/**
 * ==========================
 * 📌 @HOOK useServiceList
 * ==========================
 *
 * @desc Custom hook to get list of services
 * @returns {Service[]} List of services
 */

const fetchServiceList = async (
  pageParam: number = 1,
  filters: Filters
): Promise<FetchServiceListResponse> => {
  try {
    // Check if endpoint is valid
    const queryString = buildQueryParams(filters, pageParam);

    // Call API
    const response = await handleAPI(
      `${endpoints.services}${queryString ? `?${queryString}` : ''}`,
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
const useServiceList = (
  page: number,
  filters: Filters = {},
  refreshKey: number
) => {
  return useQuery<FetchServiceListResponse, Error>({
    queryKey: ['serviceList', page, filters, refreshKey],
    queryFn: () => fetchServiceList(page, filters),
    enabled: page > 0,
    staleTime: process.env.NODE_ENV === 'development' ? 1000 : 300000,
    gcTime: 30 * 60 * 1000,
  });
};

/**
 * ========== END OF @HOOK useServiceList ==========
 */

/**
 * ==========================
 * 📌 @HOOK useServiceDetail
 * ==========================
 *
 * @desc Custom hook to get detail of service
 * @param {string} slug Slug of service
 * @returns {Service} Detail of service
 */

const fetchServiceDetail = async (slug: string): Promise<ServiceDetail> => {
  try {
    if (!slug) {
      throw new Error('Slug is required');
    }
    if (!endpoints.serviceDetail) {
      throw null;
    }
    const response = await handleAPI(
      `${endpoints.serviceDetail.replace(':slug', slug)}`,
      'GET',
      null
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching blog detail:', error);
    throw error;
  }
};

// Custom hook to get detail of category
const useServiceDetail = (slug: string, refreshKey: number) => {
  const isEnabled = !!slug;
  return useQuery<ServiceDetail, Error>({
    queryKey: ['serviceDetail', slug, refreshKey],
    queryFn: () => fetchServiceDetail(slug),
    enabled: isEnabled,
    staleTime: process.env.NODE_ENV === 'development' ? 1000 : 300000,
  });
};

/**
 * ========== END OF @HOOK useServiceDetail ==========
 */

const DeleteService = async (serviceID: string) => {
  try {
    if (!endpoints.service) {
      throw new Error('Service endpoint is not defined.');
    }

    const response = await handleAPI(
      `${endpoints.service.replace(':id', serviceID)}`,
      'DELETE'
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error deleting Service:',
      error?.response?.data || error.message
    );
    throw new Error(
      error?.response?.data?.message || 'Failed to delete Service'
    );
  }
};

const useDeleteService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DeleteService, // Directly pass the function
    onSuccess: () => {
      toast.success('Delete Service Success!');
      queryClient.invalidateQueries({ queryKey: ['serviceList'] });
    },
    onError: (error: any) => {
      console.error(error.message || 'Failed to delete Service.');
      toast.error(error.message || 'Failed to delete Service.');
    },
  });
};

const EditStatus = async (updateStatus: UpdateStatus, postId: string) => {
  try {
    if (!endpoints.serviceStatus) {
      throw null;
    }

    const url = endpoints.serviceStatus.replace(':id', postId);

    const response = await handleAPI(url, 'PATCH', updateStatus);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to update service'
    );
  }
};

const useUpdateServiceStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      updateStatus,
      postId,
    }: {
      updateStatus: UpdateStatus;
      postId: string;
    }) => {
      return EditStatus(updateStatus, postId);
    },
    onSuccess: () => {
      toast.success('Update status successfully!');
      queryClient.invalidateQueries({ queryKey: ['serviceList'] });
    },
  });
};

const CreateProject = async (newPost: CreateServiceItem) => {
  try {
    const response = await handleAPI(`${endpoints.services}`, 'POST', newPost);
    return response.data;
  } catch (error: any) {
    console.error('Error creating Service:', error.response?.data);
    throw new Error(
      error.response?.data?.message || 'Failed to create Service'
    );
  }
};

const useCreateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newPost: CreateServiceItem) => {
      return CreateProject(newPost);
    },
    onSuccess: () => {
      toast.success('Create Service Success!');
      queryClient.invalidateQueries({ queryKey: ['serviceList'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create Service.');
      console.error(error.message || 'Failed to create Service.');
    },
  });
};

export {
  useServiceList,
  useServiceDetail,
  useDeleteService,
  useUpdateServiceStatus,
  useCreateService,
};
