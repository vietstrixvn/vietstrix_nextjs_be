/**
 * ==========================
 *  @FILTERS
 * ==========================
 */

export interface Filters {
  [key: string]: string | number | string[] | undefined;
}

/**
 * ==========================
 *  @PAGINATION
 * ==========================
 */

export interface Pagination {
  page: number;
  page_size: number;
  total: number;
  total_page: number;
}

/**
 * ==========================
 *  @UPDATE_STATUS
 * ==========================
 */

export interface UpdateStatus {
  status: string;
}

export interface BaseModel {
  id: string;
  created_at: string | Date;
  updated_at: string | Date;
}
