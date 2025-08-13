import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ChangePassword, VerifyCode } from '@/types/types';
import { endpoints, handleAPI } from '@/api';

const ChangePasswordAuth = async (changePassword: ChangePassword) => {
  try {
    // Gửi FormData tới backend
    const response = await handleAPI(
      `${endpoints.changePassword}`,
      'POST',
      changePassword
    );
    return response.data;
  } catch (error: any) {
    console.error('Error change password:', error.response?.data);
    throw new Error(
      error.response?.data?.message || 'Failed to change password'
    );
  }
};

const useChangePassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (changePassword: ChangePassword) => {
      return ChangePasswordAuth(changePassword);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    },
    onError: (error) => {
      console.error(error.message || 'Failed to change password.');
    },
  });
};

const GetVerifyCode = async (verifyCode: VerifyCode) => {
  try {
    const response = await handleAPI(
      `${endpoints.verifyCode}`,
      'POST',
      verifyCode
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to check verify code'
    );
  }
};

const useGetVerifyCode = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (verifyCode: VerifyCode) => {
      return GetVerifyCode(verifyCode);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['verifyCode'] });
    },
    onError: (error) => {
      console.error(error.message || 'Failed to verify code.');
    },
  });
};

export { useChangePassword, useGetVerifyCode };
