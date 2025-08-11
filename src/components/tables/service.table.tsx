'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Badge,
  Button,
  NoResultsFound,
  LoadingSpin,
  ErrorLoading,
} from '@/components';
import type { ServiceTableProps } from '@/types';
import { ServiceColumns } from '@/types/service/service.colum';
import { useRouter } from 'next/navigation';
import { Icons } from '@/assets/icons/icons';
import React, { useState } from 'react';
import { useDeleteService, useUpdateServiceStatus } from '@/hooks';
import { ConfirmDialog } from '../design/Dialog';
// import { SelectStatus } from '../design/status.change';
import { toast } from 'sonner';
import type { VisibilityCategoryOption } from '@/types';
import { statusColorMap } from './blog.table';
import { truncateText, truncateHtmlToText } from '@/utils';

export const ServiceTable: React.FC<ServiceTableProps> = ({
  services,
  isLoading,
  isError,
}) => {
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>();

  const { mutate: deleteService } = useDeleteService();
  const { mutate: updateStatus } = useUpdateServiceStatus();

  const handleStatusChange = (postId: string, newStatus: string) => {
    if (!postId) {
      toast.error('Invalid contact ID!');
      return;
    }

    updateStatus({ postId, updateStatus: { status: newStatus } });
  };

  const handleDeleteClick = (id: string) => {
    setSelectedService(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedService) {
      deleteService(selectedService);
      setSelectedService(undefined);
      setDeleteDialogOpen(false);
    }
  };

  const handleViewDetail = (slug: string) => {
    router.push(`/admin/service/${slug}`);
  };

  return (
    <>
      <div className="border overflow-hidden">
        <Table>
          <TableHeader className="bg-main/60">
            <TableRow>
              {ServiceColumns.map((col) => (
                <TableHead key={col.key} className={col.className}>
                  {col.label}
                </TableHead>
              ))}
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={ServiceColumns.length + 1}>
                  <LoadingSpin />
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={ServiceColumns.length + 1}>
                  <ErrorLoading />
                </TableCell>
              </TableRow>
            ) : services && services.length > 0 ? (
              services.map((item, index) => (
                <React.Fragment key={item.id}>
                  <TableRow key={item.id} className="border-b">
                    <TableCell className="font-medium">{index + 1}</TableCell>

                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>
                      {/* {userInfo?.role === 'admin' ? (
                        <SelectStatus
                          value={item.status as VisibilityCategoryOption}
                          onChange={(newStatus) =>
                            handleStatusChange(item.id, newStatus)
                          }
                        />
                      ) : ( */}
                      <Badge
                        variant="secondary"
                        className={
                          statusColorMap[item.status] ||
                          'bg-gray-100 text-gray-800'
                        }
                      >
                        {item.status}
                      </Badge>
                      {/* )} */}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{item.category.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                        onClick={() => handleViewDetail(item.slug)}
                      >
                        <Icons.Eye className="w-4 h-4" />
                        Chi tiết
                      </Button>
                    </TableCell>
                    <TableCell>{item.price}</TableCell>

                    <TableCell>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDeleteClick(item.id)}
                      >
                        <Icons.Trash className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    key={`${item.id}-details`}
                    className="bg-gray-50/50 border-b"
                  >
                    <TableCell colSpan={8}>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 py-2">
                        <div className="font-medium text-gray-500 mb-1">
                          Mô tả chi tiết
                        </div>{' '}
                        <div
                          className="rich-text-content mt-4"
                          dangerouslySetInnerHTML={{
                            __html: truncateHtmlToText(item.content, 80),
                          }}
                        />
                        <div>
                          <div className="font-medium text-gray-500 mb-1">
                            Mô tả chi tiết
                          </div>
                          <div className="line-clamp-3">
                            {truncateText(item.description, 100)}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-500 mb-1">
                            Ngày tạo
                          </div>
                          <div>
                            {item.createdAt instanceof Date
                              ? item.createdAt.toLocaleString()
                              : item.createdAt}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-500 mb-1">
                            Ngày sửa
                          </div>
                          <div>
                            {item.updatedAt instanceof Date
                              ? item.updatedAt.toLocaleString()
                              : item.updatedAt}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={ServiceColumns.length + 1}>
                  <div className="flex justify-center items-center py-16">
                    <NoResultsFound />
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        question="Bạn có chắc không ?"
        description="Không thể hoàn tác hành động này. Thao tác này sẽ xóa vĩnh viễn dịch vụ."
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};
