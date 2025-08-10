import type { BaseModel, Pagination } from './base/base.type';

/**
 * ==========================
 *  @UPLOAD_MEDIA
 * ==========================
 */

export interface UploadMedia {
  path: string;
  file: File;
}

/**
 * ==========================
 *  @SEO
 * ==========================
 */

export interface SeoData {
  site_title: string;
  site_description: string;
  keywords: string[];
  domain: string;
}

export interface UpdateSeo {
  site_title?: string;
  site_description?: string;
  domain?: string;
  keywords?: string[];
  google_analytics_id?: string;
  gtm_id?: string;
  facebook_pixel_id?: string;
  search_console_verification?: string;
}

export interface UserDataComponents {
  username: string;
  role: string;
}

export interface UserDataStatistic {
  totalUsers: number;
  manager: number;
  admin: number;
}

/**
  change password Interface
 **/
export interface ChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface VerifyCode {
  code: string;
}

/**
 * ==========================
 *  @PROJECT
 * ==========================
 */

export interface ProjectService {
  id: string;
  title: string;
}

export interface ProjectListData {
  id: string;
  title: string;
  slug: string;
  file: string;
  content: string;
  description: string;
  service: ProjectService[];
  testimonial: string;
  brand_name: string;
  user: UserDataComponents;
  client: string;
  link?: string;
  status: string;
  createdAt: Date | string;
  updatedAt: Date | string;
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

export interface ProjectDetail {
  id: string;
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
  createdAt: Date | string;
  updatedAt: Date | string;
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
  service: string[];
  description: string;
  brand_name: string;
  status: string;
  testimonial: string;
  client: string;
  link?: string | null;
}

/**
 * ==========================
 *  @SERVICE
 * ==========================
 */

export interface ServiceList {
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
  createdAt: Date | string;
  updatedAt: Date | string;
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

/**
 * ==========================
 *  @BLOG_CATEGORY
 * ==========================
 */
export interface ChildCategory {
  id: string;
  name: string;
}

/**
 * ==========================
 *  @BLOG_DETAIL
 * ==========================
 */

export interface BlogDetail {
  id: string;
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
  createdAt: Date | string;
  updatedAt: Date | string;
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
  link?: string | null;
}

export interface AdmimFilter {
  button: {
    href: string;
    title: string;
  };
  values: string;
  type: string;
}

export interface AdminUserFilter {
  button: {
    href: string;
    title: string;
  };
  values: string;
}

export interface Hero {
  title: string;
  heading: string;
  subheading: string;
}

export interface MainService {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  color: string;
  hoverColor: string;
  textColor: string;
  icon: React.ReactNode;
}
