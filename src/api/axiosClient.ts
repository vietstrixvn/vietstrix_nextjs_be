import axios from 'axios';
import type { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

import { baseURL } from './api';

// const getApiKey = () => process.env.NEXT_PUBLIC_API_KEY || '';

const isDev = process.env.NODE_ENV !== 'production';

// const apiKey = getApiKey();

/**
 * ==========================
 * 📌 @API Auth API
 * ==========================
 *
 * @desc Auth API Request
 */
const authApi = () => {
  return axios.create({
    baseURL: baseURL,
    headers: {
      // 'api-key': `${apiKey}`,
    },
    withCredentials: true,
    timeout: 15000, // 15 seconds timeout
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
    const apiInstance = authApi();
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
