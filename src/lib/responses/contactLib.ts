import type { Filters } from '@/types';
import { useContactList } from '@/hooks/contact/useContact';

// ContactList.ts
export const ContactList = (
  currentPage: number,
  filters: Filters,
  refreshKey: number
) => {
  const { data, isLoading, isError } = useContactList(
    currentPage,
    filters,
    refreshKey
  );

  const pagination = data?.pagination ?? { current_page: 1, total_page: 1 };

  const contacts = data?.results ?? [];
  return {
    contacts,
    isLoading,
    isError,
    pagination,
  };
};
