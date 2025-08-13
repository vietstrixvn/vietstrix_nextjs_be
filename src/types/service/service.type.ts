import { BaseModel, Pagination } from '../base/base.type';
import { UserDataComponents } from '../types';
import { ChildCategory } from '../category/category.type';

/**
 * ==========================
 *  @SERVICE
 * ==========================
 */

export interface ServiceList extends BaseModel {
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

export interface ServiceDetail extends BaseModel {
  title: string;
  slug: string;
  file: string;
  content: string;
  price: number;
  status: string;
  description: string;
  views: number;
  category: ChildCategory;
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

export interface ServiceDetailResponse extends BaseModel {
  title: string;
  slug: string;
  file: string;
  content: string;
  price: number;
  category: ChildCategory;
  status: string;
  description: string;
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

export interface UpdateServiceItem {
  title?: string;
  file?: string;
  content?: string;
  price?: number;
  category?: string;
  status?: string;
  description?: string;
}
