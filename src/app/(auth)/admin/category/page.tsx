'use client';

import type React from 'react';
import { useState } from 'react';
//UI components

//Components
import { RefreshButton } from '@/components/button/refresh.button';
import { CustomPagination } from '@/components/design/pagination';
import {
  Button,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  LoadingSpin,
  AdminContainer,
} from '@/components';
//Data
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type * as z from 'zod';
import { CategoryList } from '@/lib';
import { useCreateCategory, useDeleteCategory } from '@/hooks';
import { ConfirmDialog } from '@/components/design/Dialog';
import { CategoryTable } from '@/components/tables/category.table';
import type { CreateCategoryItem } from '@/types';
// import { Form } from '@/components/ui/form';
// import SelectCategoryFilter from '@/components/pages/admin/categoryFilter';
import { Heading } from '@/components/design/Heading';
import { Icons } from '@/assets/icons/icons';
import { categoryFormSchema } from '@/utils';
import { AdminCategoryFilter } from '@/components/fliters/category.filter';

export default function CategoryManager() {
  const [refreshKey, setRefreshKey] = useState(0); // State to refresh data
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>();
  const [selectedType, setSelectedType] = useState<string>();

  const form = useForm<z.infer<typeof categoryFormSchema>>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: '',
      type: '',
      status: 'draft',
    },
  });

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

  const { mutate: createCategory } = useCreateCategory();
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

  const handleCreateCategory = (
    values: z.infer<typeof categoryFormSchema>,
    status: 'draft' | 'show'
  ) => {
    setIsSubmitting(true);
    try {
      // Create a blog item object matching the CreateBlogItem type
      const categoryData: CreateCategoryItem = {
        name: values.name,
        type: values.type,
        status: status,
      };

      createCategory(categoryData, {
        onSuccess: () => {
          setRefreshKey((prev) => prev + 1);
        },
        onError: (error: any) => {
          console.error('Error creating category:', error);
          form.setError('root', {
            type: 'manual',
            message:
              error.message || 'Failed to create blog. Please try again.',
          });
        },
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      form.setError('root', {
        type: 'manual',
        message: 'An unexpected error occurred. Please try again.',
      });
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
    setRefreshKey((prev) => prev + 1);
  };

  const handlePageSizeChange = (value: string) => {
    const newSize = parseInt(value, 10);
    setPageSize(newSize);
    setCurrentPage(1); // Reset về trang đầu tiên khi đổi số lượng
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    setRefreshKey((prev) => prev + 1);
  };

  // State for the form
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= pagination.total_page) {
      setCurrentPage(page);
    }
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
    setRefreshKey((prev) => prev + 1); // Refresh data manually
  };

  return (
    <>
      <AdminContainer>
        <Heading name="Categories Page" desc="Manage your categories here" />

        <div className="md:flex col flex-col-2 md:flex-row justify-between items-center mb-6">
          {/* <div className=" col flex-col-2 md:flex gap-2">
            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>
                  <Icons.Plus className="mr-2 h-4 w-4" /> Tạo Thể Loại Mới
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                  <DialogTitle>Tạo Thể Loại mới</DialogTitle>
                  <DialogDescription>
                    Điền thông tin chi tiết cho danh mục mới.
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit((values) =>
                      handleCreateCategory(values, 'show')
                    )}
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter blog post title"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type</FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                            defaultValue="blogs"
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn loại danh mục" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="blogs">Blog</SelectItem>
                              <SelectItem value="services">Dịch Vụ</SelectItem>
                              <SelectItem value="products">Sản Phẩm</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <DialogFooter>
                      <div className="flex mt-6 gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            const values = form.getValues();
                            handleCreateCategory(values); // Set status to 'draft'
                          }}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Saving...' : 'Create'}
                        </Button>
                       
                      </div>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div> */}
        </div>
        <div className="rounded-md min-w-0">
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
        </div>
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
