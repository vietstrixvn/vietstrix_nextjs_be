import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { handleAPI, endpoints } from '@/api';
import { toast } from 'sonner';
import type {
  Filters,
  FetchContactListResponse,
  UpdateContactStatus,
  CreateContactItem,
} from '@/types';
import { buildQueryParams } from '@/utils';

/**
 * ==========================
 * 📌 @HOOK useContactList
 * ==========================
 *
 * @desc Custom hook to get list of contacts.
 * @returns {Contacts[]} List of contacts.
/
 */

const fetchContactList = async (
  pageParam: number = 1,
  filters: Filters
): Promise<FetchContactListResponse> => {
  try {
    const queryString = buildQueryParams(filters, pageParam);

    const response = await handleAPI(
      `${endpoints.contacts}${queryString ? `?${queryString}` : ''}`,
      'GET',
      null
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching categories list:', error);
    throw error;
  }
};

/**
 * Custom hook to get list of contacts using React Query.
 */
const useContactList = (
  page: number,
  filters: Filters = {},
  refreshKey: number
) => {
  return useQuery<FetchContactListResponse, Error>({
    queryKey: ['contactList', page, filters, refreshKey],
    queryFn: () => fetchContactList(page, filters),
    enabled: page > 0,
    staleTime: 60000,
  });
};

/**
 * ========== END OF @HOOK useContactsList ==========
 */

/**
 * ==========================
 * 📌 @HOOK useUpdateStatus
 * ==========================
 **/

const EditStatus = async (
  updateStatus: UpdateContactStatus,
  contactId: string
) => {
  try {
    if (!endpoints.contact) {
      throw null;
    }

    const url = endpoints.contact.replace(':id', contactId);

    const response = await handleAPI(url, 'PATCH', updateStatus);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to update contact'
    );
  }
};

const useUpdateStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      updateStatus,
      contactId,
    }: {
      updateStatus: UpdateContactStatus;
      contactId: string;
    }) => {
      return EditStatus(updateStatus, contactId);
    },
    onSuccess: () => {
      toast.success('Status update successful!');
      queryClient.invalidateQueries({ queryKey: ['contactList'] });
    },
    onError: (error: any) => {
      console.error(error.message || 'Failed to create  contact.');
    },
  });
};

/**
 * ========== END OF @HOOK useUpdateStatus ==========
 */

/**
 * ==========================
 * 📌 @HOOK useCreateContact
 * ==========================
Create role
 **/

const CreateContact = async (newContact: CreateContactItem) => {
  try {
    const response = await handleAPI(
      `${endpoints.contacts}`,
      'POST',
      newContact
    );
    return response.data;
  } catch (error: any) {
    console.error('Error creating contact:', error.response?.data);
    throw new Error(
      error.response?.data?.message || 'Failed to create contact'
    );
  }
};

const useCreateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newContact: CreateContactItem) => {
      return CreateContact(newContact);
    },
    onSuccess: () => {
      toast.success('Contact sent, we will contact you soon!');
      queryClient.invalidateQueries({ queryKey: ['contactList'] });
    },
    onError: (error: any) => {
      console.error(error.message || 'Failed to create  contact.');
    },
  });
};

/**
 * ========== END OF @HOOK useCreateContact ==========
 */

const DeleteContact = async (contactId: string) => {
  try {
    if (!endpoints.contact) {
      throw new Error('Contact endpoint is not defined.');
    }

    const response = await handleAPI(
      `${endpoints.contact.replace(':id', contactId)}`,
      'DELETE'
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error deleting Contact:',
      error?.response?.data || error.message
    );
    throw new Error(
      error?.response?.data?.message || 'Failed to delete Contact'
    );
  }
};

const useDeleteContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DeleteContact, // Directly pass the function
    onSuccess: () => {
      toast.success('Xóa liên hệ thành công!');
      queryClient.invalidateQueries({ queryKey: ['contactList'] });
    },
    onError: (error: any) => {
      console.error(error.message || 'Failed to delete Contact.');
      toast.error(error.message || 'Lỗi khi xóa liên hệ');
    },
  });
};

export { useContactList, useUpdateStatus, useCreateContact, useDeleteContact };
