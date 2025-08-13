/**
 * ==========================
 *  @SEO
 * ==========================
 */

import { BaseModel } from '../base/base.type';

export interface WebsiteData extends BaseModel {
  phone_number: string;
  fb: string;
  ig: string;
  tiktok: string;
  messenger: string;
  github: string;
  pinterest: string;
  dribbble: string;
  upwork: string;
  linkedin: string;
  mail: string[];
}

export interface UpdateWebsite {
  phone_number?: string;
  fb?: string;
  ig?: string;
  tiktok?: string;
  messenger?: string;
  github?: string;
  pinterest?: string;
  dribbble?: string;
  upwork?: string;
  mail?: string[];
}
