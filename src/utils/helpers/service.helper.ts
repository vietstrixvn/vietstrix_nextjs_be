import { Filters } from '@/types';

export const makeServiceListKey = (
  page: number,
  filters: Filters,
  refreshKey: number
) => [
  'serviceList',
  page,
  filters.category_id ?? null, // cái này quan trọng
  filters.page_size ?? null,
  refreshKey,
];
