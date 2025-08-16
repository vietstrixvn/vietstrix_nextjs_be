'use client';

import type React from 'react';
import { useCallback, useState } from 'react';

import { ContactList } from '@/lib';
import { useDeleteContact } from '@/hooks';

//Components
import { AdminContainer } from '@/components';

import { ConfirmDialog } from '@/components/design/Dialog';
// import SelectStatus from '@/components/pages/admin/contact/selectStatus';
import { CustomPagination } from '@/components/design/pagination';
import { Heading } from '@/components/design/Heading';
import { ContactTable } from '@/components/tables/contact.table';
import { ContactFilter } from '@/components/fliters/contact.filter';
import Header from '@/components/design/Header';

export default function ProductManager() {
  const [selectedStatus, setSelectedStatus] = useState<string>();
  const [refreshKey, setRefreshKey] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedContact, setSelectedContact] = useState<string>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const { mutate: deleteContact } = useDeleteContact();

  const handleDeleteClick = (id: string) => {
    setSelectedContact(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedContact) {
      deleteContact(selectedContact);
      setSelectedContact(undefined);
      setDeleteDialogOpen(false);
      setRefreshKey((prev) => prev + 1);
    }
  };

  const params = {
    ...(selectedStatus !== 'all' && { status: selectedStatus }),
    limit: pageSize,
    ...(selectedService !== 'all' && { service_id: selectedStatus }),
  };

  const { contacts, isLoading, isError, pagination } = ContactList(
    currentPage,
    params,
    refreshKey
  );

  // const { mutate: createProduct } = useCreateProduct();

  const handlePageSizeChange = (value: string) => {
    const newSize = parseInt(value, 10);
    setPageSize(newSize);
    setCurrentPage(1); // Reset về trang đầu tiên khi đổi số lượng
  };

  const handleStatusChange = useCallback((value: string) => {
    setSelectedStatus(value);
    setCurrentPage(1);
  }, []);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= pagination.total_page) {
      setCurrentPage(page);
    }
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleServiceChange = useCallback((value: string) => {
    setSelectedService(value === 'all' ? null : value);
    setCurrentPage(1);
  }, []);

  return (
    <>
      <AdminContainer>
        <Heading
          name="Contact Management"
          desc="Manage your contact list here"
        />
        <Header title="Contact Table" />
        {/* Table */}
        <ContactFilter
          handleRefresh={handleRefresh}
          onPageSizeChange={handlePageSizeChange}
          onStatusChange={handleStatusChange}
          onServiceChange={handleServiceChange}
        />
        <ContactTable
          contacts={contacts}
          isLoading={isLoading}
          isError={isError}
          onDelete={handleDeleteClick}
        />

        <CustomPagination
          currentPage={currentPage}
          totalPage={pagination.total_page}
          onPageChange={handlePageChange}
        />
      </AdminContainer>
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        question="Bạn có chắc không ?"
        description="Không thể hoàn tác hành động này. Thao tác này sẽ xóa vĩnh viễn liên hệ."
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
