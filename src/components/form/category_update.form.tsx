'use client';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components';
import { Loader2, Upload, Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { UpdateCategoryDialogProps, UpdateCaterory } from '@/types';
// import { NewsCategoryError } from '@/constants';
import { categoryUpdateFormSchema } from '@/utils';
import { useUpdateCategory } from '@/hooks';

export default function UpdateCategoryDialog({
  category,
  open,
  setOpen,
  onSuccess,
}: UpdateCategoryDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof categoryUpdateFormSchema>>({
    resolver: zodResolver(categoryUpdateFormSchema),
    defaultValues: {
      title: category.title || '',
    },
  });
  const isDirty = form.formState.isDirty;

  useEffect(() => {
    if (category) {
      form.reset({
        title: category.title || '',
      });
    }
  }, [category, form]);

  const { mutate: updateNewsCategory } = useUpdateCategory();

  const handleUpdateCategory = (
    values: z.infer<typeof categoryUpdateFormSchema>
  ) => {
    setIsSubmitting(true);

    const categoryData: UpdateCaterory = {
      title: values.title,
    };

    updateNewsCategory(
      { updateCategory: categoryData, cateId: category.id },
      {
        onSuccess: () => {
          onSuccess?.();
          setOpen(false);
          form.reset();
          setIsSubmitting(false);
        },
        onError: (error: any) => {
          form.setError('root', {
            type: 'manual',
            message: error.message || 'Error',
          });
          setIsSubmitting(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] rounded-none bg-white">
        <DialogHeader>
          <DialogTitle>Update Category</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdateCategory)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Error message */}
            {form.formState.errors.root && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                {form.formState.errors.root.message}
              </div>
            )}

            <DialogFooter>
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || !isDirty}
                  className="min-w-[120px] bg-main hover:bg-main-700"
                >
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin " />
                  )}
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
