import axios from 'axios';
import type { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

import { baseURL } from './api';

const isDev = process.env.NODE_ENV !== 'production';

/**
 * Get access token from localStorage
 */
const getAccessToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('access_token');
  }
  return null;
};

/**
 * ==========================
 * 📌 @API Auth API với Token tự động
 * ==========================
 *
 * @desc Auth API Request với token trong header
 */
const authApi = () => {
  const token = getAccessToken(); // ✅ Lấy token

  return axios.create({
    baseURL: baseURL,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    withCredentials: true,
    timeout: 15000,
  });
};

/**
 * ==========================
 * 📌 @API Handler
 * ==========================
 *
 * @desc Centralized API Handler
 */
export const handleAPI = async <T = any>(
  url: string,
  method: 'POST' | 'PATCH' | 'GET' | 'DELETE' = 'GET',
  data?: any
): Promise<T> => {
  try {
    const apiInstance = authApi(); // ✅ Token đã có sẵn trong headers
    const config: AxiosRequestConfig = {
      url,
      method,
    };

    // Handle data appropriately based on request method
    if (method !== 'GET' && data) {
      config.data = data;
    } else if (method === 'GET' && data) {
      config.params = data;
    }

    const response: AxiosResponse = await apiInstance(config);

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    // ✅ Handle 401 - Token expired
    if (axiosError.response?.status === 401) {
      console.warn('🚨 Unauthorized - Token expired or invalid');
      // Clear auth data
      localStorage.removeItem('access_token');
      localStorage.removeItem('auth-storage');
      // Redirect to login
      window.location.href = '/sign-in';
      return Promise.reject(new Error('Session expired'));
    }

    if (isDev) {
      const logPayload = {
        url: `${baseURL}${url}`,
        method,
        timestamp: new Date().toISOString(),
      };

      if (axiosError.response) {
        console.error('❌ API ERROR:', {
          ...logPayload,
          status: axiosError.response.status,
          statusText: axiosError.response.statusText,
          data: axiosError.response.data,
        });
      } else if (axiosError.request) {
        console.error('❌ API ERROR (NO RESPONSE):', {
          ...logPayload,
          message: axiosError.message,
        });
      } else {
        console.error('❌ API ERROR (SETUP):', {
          ...logPayload,
          message: axiosError.message,
        });
      }
    }

    throw error;
  }
};
