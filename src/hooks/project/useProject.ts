import { endpoints, handleAPI } from '@/api';
import type {
  CreateProjectItem,
  FetchProjectListResponse,
  Filters,
  ProjectDetail,
  UpdateProjectItem,
} from '@/types';
import { buildQueryParams } from '@/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

/**
 * ==========================
 * 📌 @HOOK useProjectList
 * ==========================
 *
 * @desc Custom hook to get list of services
 * @returns {PROJECT[]} List of services
 */

const fetchProjectList = async (
  pageParam: number = 1,
  filters: Filters
): Promise<FetchProjectListResponse> => {
  try {
    // Check if endpoint is valid
    const queryString = buildQueryParams(filters, pageParam);

    // Call API
    const response = await handleAPI(
      `${endpoints.projects}${queryString ? `?${queryString}` : ''}`,
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
const useProjectList = (
  page: number,
  filters: Filters = {},
  refreshKey: number
) => {
  return useQuery<FetchProjectListResponse, Error>({
    queryKey: ['projectList', page, filters, refreshKey],
    queryFn: () => fetchProjectList(page, filters),
    enabled: page > 0,
    staleTime: process.env.NODE_ENV === 'development' ? 1000 : 300000,
    gcTime: 30 * 60 * 1000, //
  });
};

/**
 * ========== END OF @HOOK useProjectList ==========
 */

/**
 * ==========================
 * 📌 @HOOK useProjectDetail
 * ==========================
 *
 * @desc Custom hook to get detail of document
 * @param {string} slug Slug of document
 * @returns {Document} Detail of document
 */

const fetchProjectDetail = async (slug: string): Promise<ProjectDetail> => {
  try {
    // Check if slug is valid
    if (!slug) {
      throw new Error('Slug is required');
    }
    // Check if endpoint is valid
    if (!endpoints.projectDetail) {
      throw null;
    }
    // Call API
    const response = await handleAPI(
      `${endpoints.projectDetail.replace(':slug', slug)}`,
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
const useProjectDetail = (slug: string, refreshKey: number) => {
  return useQuery<ProjectDetail, Error>({
    queryKey: ['projectDetail', slug, refreshKey],
    queryFn: () => fetchProjectDetail(slug),
    enabled: !!slug,
    staleTime: process.env.NODE_ENV === 'development' ? 1000 : 300000,
  });
};

/**
 * ========== END OF @HOOK useProjectDetail ==========
 */

const DeleteProject = async (projectID: string) => {
  try {
    if (!endpoints.project) {
      throw new Error('Project endpoint is not defined.');
    }

    const response = await handleAPI(
      `${endpoints.project.replace(':id', projectID)}`,
      'DELETE'
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error deleting Service:',
      error?.response?.data || error.message
    );
    throw new Error(
      error?.response?.data?.message || 'Failed to delete Project'
    );
  }
};

const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DeleteProject, // Directly pass the function
    onSuccess: () => {
      toast.success('Delete Project Success!');
      queryClient.invalidateQueries({ queryKey: ['projectList'] });
    },
    onError: (error: any) => {
      console.error(error.message || 'Failed to delete Project.');
      toast.error(error.message || 'Failed to delete Project.');
    },
  });
};

const EditStatus = async (updatePost: UpdateProjectItem, postId: string) => {
  try {
    if (!endpoints.project) {
      throw null;
    }

    const url = endpoints.project.replace(':id', postId);

    const response = await handleAPI(url, 'PATCH', updatePost);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to update service'
    );
  }
};

const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      updatePost,
      postId,
    }: {
      updatePost: UpdateProjectItem;
      postId: string;
    }) => {
      return EditStatus(updatePost, postId);
    },
    onSuccess: () => {
      toast.success('Update project successfully!');
      queryClient.invalidateQueries({ queryKey: ['projectList'] });
    },
  });
};

const CreateProject = async (newPost: CreateProjectItem) => {
  try {
    const response = await handleAPI(`${endpoints.projects}`, 'POST', newPost);
    return response.data;
  } catch (error: any) {
    console.error('Error creating project:', error.response?.data);
    throw new Error(
      error.response?.data?.message || 'Failed to create project'
    );
  }
};

const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newPost: CreateProjectItem) => {
      return CreateProject(newPost);
    },
    onSuccess: () => {
      toast.success('Create Project Success!');
      queryClient.invalidateQueries({ queryKey: ['projectList'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create project.');
      console.error(error.message || 'Failed to create project.');
    },
  });
};

export {
  useCreateProject,
  useDeleteProject,
  useProjectDetail,
  useProjectList,
  useUpdateProject,
};
