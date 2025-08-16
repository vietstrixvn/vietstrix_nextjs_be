/**
 * ==========================
 *  @CATEGORY
 * ==========================
 */

import type { BaseModel, Pagination } from '../base/base.type';
import type { UserDataComponents } from '../types';

/*
  Category Attribute Declaration
*/
export interface Category extends BaseModel {
  title: string;
  slug: string;
  user?: UserDataComponents;
}

export interface FetchCategoryListResponse {
  pagination: Pagination;
  results: Category[];
}

export interface CreateCategoryItem {
  title: string;
  type: string;
}

/*
    Category Detail Attribute Declaration
  */
interface CategoryDetail extends BaseModel {
  title: string;
  slug: string;
  type: string;
}

export interface UpdateCaterory {
  title: string;
}

export interface FetchCategoryDetailResponse {
  status: string;
  data: CategoryDetail;
}

export interface ChildCategory {
  id: string;
  name: string;
}

// ========================
// End Category
// ========================
