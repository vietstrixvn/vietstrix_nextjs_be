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
