'use client';

import type React from 'react';
import { useState } from 'react';

import { ContactList } from '@/lib';
import { useDeleteContact } from '@/hooks';

//Components
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  Container,
  RefreshButton,
  CustomPagination,
  Heading,
} from '@/components';

import { ConfirmDialog } from '@/components/design/Dialog';
import { ContactTable } from '@/components/table/contact.table';
import SelectStatus from '@/components/pages/admin/contact/selectStatus';
import { AdminBreadCrumb } from '@/components/layout/AdminLayout/admin.breadcrumb';

export default function ProductManager() {
  const [selectedStatus, setSelectedStatus] = useState<string>();
  const [refreshKey, setRefreshKey] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedContact, setSelectedContact] = useState<string>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

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

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= pagination.total_page) {
      setCurrentPage(page);
    }
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <>
      <Container>
        <AdminBreadCrumb title="Liên Hệ" />

        <Heading
          name="Quản lý liên hệ"
          desc="Quản lý danh sách những người liên hệ của bạn ở đây"
        />

        <div className="md:flex col flex-col-2 md:flex-row justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <RefreshButton onClick={handleRefresh} />
            <div className="flex items-center gap-4">
              <span className="text-16 font-semibold">Số Lượng:</span>
              <Select
                onValueChange={handlePageSizeChange}
                defaultValue={String(pageSize)}
              >
                <SelectTrigger className="w-[80px]">
                  <SelectValue placeholder={pageSize} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-16 font-semibold">Trạng Thái:</span>

              <SelectStatus
                selectedStatus={selectedStatus}
                onStatusChange={(value) => setSelectedStatus(value)}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div>
          <ContactTable
            contacts={contacts}
            isLoading={isLoading}
            isError={isError}
            onDelete={handleDeleteClick}
          />
        </div>
        <CustomPagination
          currentPage={currentPage}
          totalPage={pagination.total_page}
          onPageChange={handlePageChange}
        />
      </Container>
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
