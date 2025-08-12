'use client';

import type React from 'react';
import { useState } from 'react';

// Components
import { CustomPagination } from '@/components/design/pagination';
import { AdminContainer } from '@/components';
import { CategoryList } from '@/lib';
import { useDeleteCategory } from '@/hooks';
import { ConfirmDialog } from '@/components/design/Dialog';
import { CategoryTable } from '@/components/tables/category.table';
import { Heading } from '@/components/design/Heading';
import { AdminCategoryFilter } from '@/components/fliters/category.filter';
import Header from '@/components/design/Header';
import { CreateCategoryDialog } from '@/components/form/createCate.from';

export default function CategoryManager() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [selectedStatus, setSelectedStatus] = useState<string>();
  const [selectedType, setSelectedType] = useState<string>();

  const params = {
    ...(selectedStatus !== 'all' && { status: selectedStatus }),
    ...(selectedType !== 'all' && { type: selectedType }),
    limit: pageSize,
  };

  const { categories, isLoading, isError, pagination } = CategoryList(
    currentPage,
    params,
    refreshKey
  );

  const { mutate: deleteCategory } = useDeleteCategory();

  const handleDeleteClick = (id: string) => {
    setSelectedCategory(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedCategory) {
      deleteCategory(selectedCategory);
      setSelectedCategory(undefined);
      setDeleteDialogOpen(false);
      setRefreshKey((prev) => prev + 1);
    }
  };

  const handlePageSizeChange = (value: string) => {
    const newSize = parseInt(value, 10);
    setPageSize(newSize);
    setCurrentPage(1);
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    setRefreshKey((prev) => prev + 1);
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= pagination.total_page) {
      setCurrentPage(page);
    }
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleCategoryCreateSuccess = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <>
      <AdminContainer>
        <div className="md:flex col flex-col-2 md:flex-row justify-between items-center mb-6">
          <Heading name="Categories Page" desc="Manage your categories here" />
          <div className="col flex-col-2 md:flex gap-2">
            <CreateCategoryDialog onSuccess={handleCategoryCreateSuccess} />
          </div>
        </div>

        <Header title="Category Table" />

        <AdminCategoryFilter
          handleRefresh={handleRefresh}
          onPageSizeChange={handlePageSizeChange}
          onTypeChange={handleTypeChange}
        />

        <CategoryTable
          categories={categories}
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
        question="Are you sure"
        description="This action cannot be undone. This will permanently delete the category."
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
