/**
 * ==========================
 * 📌 @props ContactTableProps
 * ==========================
 */

import type { ContactList } from './contact.type';

export interface ContactTableProps {
  contacts: ContactList[];
  isLoading: boolean;
  isError: boolean;
  onDelete: (id: string) => void;
}
