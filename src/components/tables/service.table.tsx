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
  CustomImage,
} from '@/components';
import type { ServiceTableProps, VisibilityCategoryOption } from '@/types';
import { ServiceColumns } from '@/types/service/service.colum';
import { useRouter } from 'next/navigation';
import { Icons } from '@/assets/icons/icons';
import React, { useState } from 'react';
import { useDeleteService, useUpdateService } from '@/hooks';
import { ConfirmDialog } from '../design/Dialog';
import { toast } from 'sonner';
import { truncateText, truncateHtmlToText, formatSmartDate } from '@/utils';
import { SelectStatus, statusColorMap } from '../design/status.change';
import { useAuthStore } from '@/store';

export const ServiceTable: React.FC<ServiceTableProps> = ({
  services,
  isLoading,
  isError,
}) => {
  const userInfo = useAuthStore((state) => state.userInfo);

  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>();

  const { mutate: deleteService } = useDeleteService();
  const { mutate: updateStatus } = useUpdateService();

  const handleStatusChange = (postId: string, newStatus: string) => {
    if (!postId) {
      toast.error('Invalid contact ID!');
      return;
    }

    updateStatus({ postId, updateService: { status: newStatus } });
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
                    <TableCell className="p-0">
                      <div className="relative w-full h-full min-h-[120px]">
                        <CustomImage
                          src={item.file}
                          alt="Blog Image"
                          className="object-cover"
                          fill
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      {userInfo?.role === 'admin' ? (
                        <SelectStatus
                          value={item.status as VisibilityCategoryOption}
                          onChange={(newStatus) =>
                            handleStatusChange(item.id, newStatus)
                          }
                        />
                      ) : (
                        <Badge
                          variant="secondary"
                          className={
                            statusColorMap[item.status] ||
                            'bg-gray-100 text-gray-800'
                          }
                        >
                          {item.status}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                      {' '}
                      {truncateText(item.title, 40)}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{item.category.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{item.price}</TableCell>

                    <TableCell>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                        onClick={() => handleViewDetail(item.slug)}
                      >
                        <Icons.Eye className="w-4 h-4" />
                        Detail
                      </Button>
                    </TableCell>

                    <TableCell className="gap-2 space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          router.push(
                            `/admin/service/edit_service/${item.slug}`
                          )
                        }
                      >
                        <Icons.Pencil className="w-4 h-4" />
                      </Button>
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
                            __html: truncateHtmlToText(item.description, 80),
                          }}
                        />
                        <div>
                          <div className="font-medium text-gray-500 mb-1">
                            Mô tả chi tiết
                          </div>
                          <div className="line-clamp-3">
                            {truncateText(item.content, 100)}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-500 mb-1">
                            Date created
                          </div>
                          <div>{formatSmartDate(item.created_at)}</div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-500 mb-1">
                            Date modified
                          </div>
                          <div>{formatSmartDate(item.updated_at)}</div>
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
