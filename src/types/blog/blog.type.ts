/**
 * ==========================
 *  @BLOG
 * ==========================
 */

import type { BaseModel, Pagination } from '../base/base.type';
import type { ChildCategory, UserDataComponents } from '../types';

export interface BlogList extends BaseModel {
  id: string;
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
