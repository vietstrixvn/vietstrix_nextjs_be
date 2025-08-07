import type { ServiceList } from '../types';

export interface Service {
  title: string;
  description?: string;
  file: string;
  slug: string;
}

/**
 * ==========================
 * 📌 @props ContactTableProps
 * ==========================
 */

export interface ServiceTableProps {
  services: ServiceList[];
  isLoading: boolean;
  isError: boolean;
}
