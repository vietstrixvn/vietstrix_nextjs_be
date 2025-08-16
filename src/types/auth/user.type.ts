import { BaseModel, Pagination } from '../base/base.type';

/**
 * ==========================
 *  @MANAGE
 * ==========================
 */
interface UserData extends BaseModel {
  id: string;
  username: string;
  name: string;
  email: string;
  phone_number: string;
  role: string;
}

export interface FetchManagerListResponse {
  pagination: Pagination;
  results: UserData[];
}

export interface CreateManagerData {
  username: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}
