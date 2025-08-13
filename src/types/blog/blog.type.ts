/**
 * ==========================
 *  @BLOG
 * ==========================
 */

import type { BaseModel, Pagination } from '../base/base.type';
import { ChildCategory } from '../category/category.type';
import type { UserDataComponents } from '../types';

export interface BlogList extends BaseModel {
  title: string;
  content: string;
  description: string;
  file: string;
  link: string;
  slug: string;
  user?: UserDataComponents;
  category: ChildCategory;
  status: string;
}

export interface FetchBlogListResponse {
  pagination: Pagination;
  results: BlogList[];
}

export interface BlogCard {
  id: number;
  title: string;
  file: string;
}

/**
 * ==========================
 *  @BLOG_DETAIL
 * ==========================
 */

export interface BlogDetail extends BaseModel {
  title: string;
  slug: string;
  content: string;
  file: string;
  category: ChildCategory;
  user?: UserDataComponents;
  status: string;
  description: string;
  views: number;
  link?: string | null;
}

/**
 * ==========================
 *  @BLOG_CREATED
 * ==========================
 */

export interface CreateBlogItem {
  title: string;
  content: string;
  file: string;
  category: string;
  description: string;
  status: string;
}

export interface UpdateBlogItem {
  title?: string;
  content?: string;
  file?: string;
  category?: string;
  description?: string;
  status?: string;
}
