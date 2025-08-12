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

export interface SeoData extends BaseModel {
  id: string;
  site_title: string;
  site_description: string;
  keywords: string[];
  domain: string;
  google_analytics_id: string;
  gtm_id: string;
  facebook_pixel_id: string;
  search_console_verification: string;
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
  id: string;
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

export interface ProjectListData extends BaseModel {
  id: string;
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
  services: string[];
  description: string;
  brand_name: string;
  status: string;
  testimonial: string;
  client: string;
  link?: string | null;
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
