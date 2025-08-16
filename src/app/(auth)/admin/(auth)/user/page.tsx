'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Button,
  Card,
  CardContent,
} from '@/components';
import { CustomPagination } from '@/components/design/pagination';
import { useDeleteManager } from '@/hooks/auth/useManager';
import { ConfirmDialog } from '@/components/design/Dialog';
import { Badge } from '@/components/ui/badge';
import { AdminContainer } from '@/components/container/admin.contaier';
import { UserList } from '@/lib/responses/userLib';
import { Heading } from '@/components/design/Heading';
import { LoadingSpin } from '@/components/loading/loading';
import { AdminUserFilter } from '@/components/fliters/auth.filter';
import { ErrorLoading } from '@/components/loading/error';
import { NoResultsFound } from '@/components/design/NoResultsFound';
import { UserColumns } from '@/types';
import { truncateText } from '@/utils';
import Header from '@/components/design/Header';

const Page = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedRole, setSelectedRole] = useState<string>();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filter = useMemo(
    () => ({
      button: {
        href: '/admin/user/create_manager',
        title: 'Create Manager',
      },
      values: 'vll',
    }),
    []
  );

  const { users, isLoading, isError, pagination } = UserList(
    currentPage,
    {
      page_size: pageSize,
      role: selectedRole,
    },
    refreshKey
  );
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectManager, setSelectManager] = useState<string>();

  const { mutate: deleteManager } = useDeleteManager();

  const handleDeleteClick = (id: string) => {
    setSelectManager(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectManager) {
      deleteManager(selectManager);
      setSelectManager(undefined);
      setDeleteDialogOpen(false);
      setRefreshKey((prev) => prev + 1);
    }
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= pagination.total_page) {
      setCurrentPage(page);
    }
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const getRoleColor = (role: string) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return 'bg-red-200 text-red-800';
      case 'manager':
        return 'bg-green-200 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handlePageSizeChange = useCallback((value: string) => {
    const newSize = parseInt(value, 10);
    setPageSize(newSize);
    setCurrentPage(1);
  }, []);

  const handleRoleChange = useCallback((role?: string) => {
    setSelectedRole(role);
    setCurrentPage(1);
  }, []);

  return (
    <>
      <AdminContainer>
        {/* Stats Overview */}
        <Heading name="User Management" desc="Admin Management Page" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Total Clients */}
          <Card>
            <CardContent className="p-4">
              <div className="justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total number of users
                  </p>
                  <div className="flex items-baseline">
                    <h3 className="text-2xl font-bold">
                      {pagination?.total || 0}
                    </h3>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Members */}
          <Card>
            <CardContent className="p-4">
              <div className="justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Page
                  </p>
                  <div className="flex items-baseline">
                    <h3 className="text-2xl font-bold">
                      {pagination?.total_page || 0}
                    </h3>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Management Section */}
        <Header title="User Table" />

        <AdminUserFilter
          filter={filter}
          handleRefresh={handleRefresh}
          onPageSizeChange={handlePageSizeChange}
          onRoleChange={handleRoleChange}
        />

        {/* Table Section */}
        <div className="border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                {UserColumns.map((col) => (
                  <TableHead key={col.key} className={col.className}>
                    {col.label}
                  </TableHead>
                ))}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-64">
                    <LoadingSpin />
                  </TableCell>
                </TableRow>
              ) : isError ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500">
                    <ErrorLoading />
                  </TableCell>
                </TableRow>
              ) : users && users.length > 0 ? (
                users.map((employee) => {
                  const isProtectedRole = ['admin'].includes(
                    employee.role?.toLowerCase()
                  );

                  return (
                    <TableRow key={employee.id} className="hover:bg-gray-50">
                      <TableCell>
                        <span className="text-sm text-gray-500 font-mono">
                          {truncateText(employee.id, 8)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9  bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                            {employee.name?.substring(0, 2) ||
                              employee.username?.substring(0, 2) ||
                              'U'}
                          </div>
                          <div>
                            <p className="font-medium">{employee.name}</p>
                            <p className="text-sm text-gray-500">
                              {employee.username}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{employee.email}</TableCell>
                      <TableCell>
                        <Badge
                          className={`font-normal ${getRoleColor(employee.role)}`}
                        >
                          {employee.role}
                        </Badge>
                      </TableCell>
                      <TableCell>{employee.phone_number}</TableCell>

                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {/* <Button variant="ghost" size="sm">
                                Xem
                              </Button> */}
                          {!isProtectedRole && (
                            <Button
                              variant="outline"
                              size="icon"
                              className="text-destructive h-8 w-8"
                              onClick={() => handleDeleteClick(employee.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-gray-500 py-8"
                  >
                    <NoResultsFound message="No staff found" />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Showing {users?.length || 0} of {pagination?.total_page || 0} pages
          </p>
          <CustomPagination
            currentPage={currentPage}
            totalPage={pagination?.total_page || 1}
            onPageChange={handlePageChange}
          />
        </div>
      </AdminContainer>

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        question="Bạn có chắc không?"
        description="Không thể hoàn tác hành động này. Thao tác này sẽ xóa vĩnh viễn người quản lý."
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};

export default Page;
