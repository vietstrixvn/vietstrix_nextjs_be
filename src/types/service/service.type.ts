import { BaseModel, Pagination } from '../base/base.type';
import { ChildCategory, UserDataComponents } from '../types';

/**
 * ==========================
 *  @SERVICE
 * ==========================
 */

export interface ServiceList extends BaseModel {
  id: string;
  title: string;
  content: string;
  description: string;
  file: string;
  slug: string;
  user?: UserDataComponents;
  price: number;
  status: string;
  category: ChildCategory;
}

export interface FetchServiceListResponse {
  pagination: Pagination;
  results: ServiceList[];
}

/**
 * ==========================
 *  @SERVICE_DETAIL
 * ==========================
 */

export interface ServiceDetail {
  id: string;
  title: string;
  slug: string;
  file: string;
  content: string;
  price: number;
  status: string;
  description: string;
  views: number;
  category: ChildCategory;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ServiceDetailResponse {
  status: string;
  result: ServiceDetail;
}

/**
 * ==========================
 *  @SERVICE_DETAIL
 * ==========================
 */

export interface ServiceDetailResponse {
  id: string;
  title: string;
  slug: string;
  file: string;
  content: string;
  price: number;
  category: ChildCategory;
  status: string;
  description: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

/**
 * ==========================
 *  @SERVICE_Create
 * ==========================
 */

export interface CreateServiceItem {
  title: string;
  file: string;
  content: string;
  price: number;
  category: string;
  status?: string;
  description: string;
}
