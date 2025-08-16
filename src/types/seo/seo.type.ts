/**
 * ==========================
 *  @SEO
 * ==========================
 */

import { BaseModel } from '../base/base.type';

export interface SeoData extends BaseModel {
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
