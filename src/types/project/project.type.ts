/**
 * ==========================
 *  @PROJECT
 * ==========================
 */

import { BaseModel, Pagination } from '../base/base.type';
import { UserDataComponents } from '../types';

export interface ProjectService {
  id: string;
  name: string;
}

export interface ProjectListData extends BaseModel {
  title: string;
  slug: string;
  file: string;
  content: string;
  description: string;
  services: ProjectService[];
  testimonial: string;
  brand_name: string;
  user: UserDataComponents;
  client: string;
  link?: string;
  status: string;
}

export interface FetchProjectListResponse {
  pagination: Pagination;
  results: ProjectListData[];
}

/**
 * ==========================
 *  @PROJECT_DETAIL
 * ==========================
 */

export interface ProjectDetail extends BaseModel {
  title: string;
  slug: string;
  file: string;
  content: string;
  description: string;
  service: ProjectService[];
  testimonial: string;
  brand_name: string;
  client: string;
  link?: number;
  status: string;
  user: UserDataComponents;
}

export interface ProjectDetailResponse {
  status: string;
  result: ProjectDetail;
}

/**
 * ==========================
 *  @PROJECT_CREATED
 * ==========================
 */

export interface CreateProjectItem {
  title: string;
  content: string;
  file: string;
  services: string[];
  description: string;
  brand_name: string;
  status: string;
  testimonial: string;
  client: string;
  link?: string | null;
}
