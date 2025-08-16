import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { SubmitItem, PresignItem } from '@/types';
import { endpoints, handleAPI } from '@/api';

/**
 * ==========================
 * 📌 @HOOK usePresignMedia
 * ==========================
 **/

const CreatePresign = async (presignItem: PresignItem) => {
  try {
    const response = await handleAPI(
      `${endpoints.presign}`,
      'POST',
      presignItem
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '');
  }
};

const usePresignMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (presignItem: PresignItem) => {
      return CreatePresign(presignItem);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mediaPresign'] });
    },
    onError: (error: any) => {
      console.error(error.message || '');
    },
  });
};

/**
 * ========== END OF @HOOK usePresignMedia ==========
 */

const SubmitPresign = async (submitItem: SubmitItem, id: string) => {
  try {
    if (!endpoints.submit) {
      throw new Error('');
    }

    const response = await handleAPI(
      `${endpoints.submit.replace(':id', id)}`,
      'POST',
      submitItem
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '');
  }
};

const useSubmitMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      submitItem,
      id,
    }: {
      submitItem: SubmitItem;
      id: string;
    }) => {
      return SubmitPresign(submitItem, id);
    },
    onSuccess: () => {
      // toast.success(MediaSuccess.SUBMITTED_MEDIA);
      queryClient.invalidateQueries({ queryKey: ['mediaSubmit'] });
    },
    onError: (error: any) => {
      console.error(error.message || '');
    },
  });
};

const SubmitRichText = async (id: string) => {
  try {
    if (!endpoints.submitRichtext) {
      throw new Error('');
    }

    const response = await handleAPI(
      `${endpoints.submitRichtext.replace(':id', id)}`,
      'POST'
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '');
  }
};

const useSubmitRichText = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      return SubmitRichText(id);
    },
    onSuccess: () => {
      // toast.success(MediaSuccess.SUBMITTED_MEDIA);
      queryClient.invalidateQueries({ queryKey: ['richtextSubmit'] });
    },
    onError: (error: any) => {
      console.error(error.message || '');
    },
  });
};

/**
 * ========== END OF @HOOK usePresignMedia ==========
 */

export { usePresignMedia, useSubmitMedia, useSubmitRichText };
