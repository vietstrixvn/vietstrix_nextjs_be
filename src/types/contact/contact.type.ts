/**
 * ==========================
 *  @CONTACT
 * ==========================
 */

import type { BaseModel, Pagination } from '../base/base.type';

export interface ContactService {
  id: string;
  title: string;
}

export interface ContactList extends BaseModel {
  name: string;
  email: string;
  phone_number: string;
  message: string;
  link?: string;
  status: string;
  service?: ContactService;
}

export interface FetchContactListResponse {
  pagination: Pagination;
  results: ContactList[];
}

/*
  Update status
*/

export interface UpdateContactStatus {
  status: string;
}

/*
  Push contact
*/

export interface CreateContactItem {
  name: string;
  email: string;
  phone_number: string;
  message: string;
  service?: string;
}

// ========================
// End Contact
// ========================
