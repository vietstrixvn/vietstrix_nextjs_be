'use client';

import type React from 'react';
//UI components
import { Pencil, Trash2 } from 'lucide-react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Button,
} from '@/components';

//Types
import { CategoryColumns } from '@/types';
import type { CategoryTableProps } from '@/types';

//Hooks

import { Skeleton } from '@/components/ui/skeleton';
import { NoResultsFound } from '@/components/design/NoResultsFound';
import UpdateCategoryDialog from '../form/category_update.form';
import { useState } from 'react';

export const CategoryTable: React.FC<CategoryTableProps> = ({
  categories,
  isLoading,
  isError,
  onDelete,
}) => {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [editingCategory, setEditingCAtegory] = useState<
    (typeof categories)[0] | null
  >(null);
  console.log(categories);
  return (
    <>
      <div className="border">
        <Table>
          <TableHeader>
            <TableRow>
              {CategoryColumns.map((col) => (
                <TableHead key={col.key} className={col.className}>
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isError ? (
              <TableRow>
                <TableCell
                  colSpan={CategoryColumns.length + 1}
                  className="text-center"
                >
                  <NoResultsFound />
                </TableCell>
              </TableRow>
            ) : isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-4 w-4 rounded" />
                  </TableCell>
                  {CategoryColumns.map((col) => (
                    <TableCell key={col.key} className={col.className}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : categories && categories.length > 0 ? (
              categories.map((category) => (
                <TableRow key={category.id}>
                  {CategoryColumns.map((col) => (
                    <TableCell key={col.key} className={col.className}>
                      {col.key === 'id'
                        ? category.id.substring(0, 8) + '...'
                        : ''}
                      {col.key === 'title' ? category.title : ''}
                      {col.key === 'slug' ? category.slug : ''}

                      {col.key === 'actions' ? (
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              setEditingCAtegory(category);
                              setIsUpdateDialogOpen(true);
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="text-destructive"
                            onClick={() => onDelete(category.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : null}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={CategoryColumns.length + 1}>
                  <NoResultsFound />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {editingCategory && (
        <UpdateCategoryDialog
          category={editingCategory}
          open={isUpdateDialogOpen}
          setOpen={(open) => {
            setIsUpdateDialogOpen(open);
            if (!open) setEditingCAtegory(null);
          }}
          onSuccess={() => {
            setIsUpdateDialogOpen(false);
            setEditingCAtegory(null);
          }}
        />
      )}
    </>
  );
};
