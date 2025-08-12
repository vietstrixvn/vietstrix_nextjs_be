import type React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type * as z from 'zod';

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
  Form,
} from '@/components';

import { Icons } from '@/assets/icons/icons';
import { categoryFormSchema } from '@/utils';
import { useCreateCategory } from '@/hooks';
import type { CreateCategoryItem } from '@/types';

interface CreateCategoryDialogProps {
  onSuccess?: () => void;
}

export const CreateCategoryDialog: React.FC<CreateCategoryDialogProps> = ({
  onSuccess,
}) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof categoryFormSchema>>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: '',
      type: '',
    },
  });

  const { mutate: createCategory } = useCreateCategory();

  const handleCreateCategory = (values: z.infer<typeof categoryFormSchema>) => {
    setIsSubmitting(true);

    try {
      const categoryData: CreateCategoryItem = {
        name: values.name,
        type: values.type,
      };

      createCategory(categoryData, {
        onSuccess: () => {
          form.reset();
          setIsCreateDialogOpen(false);
          onSuccess?.();
        },
        onError: (error: any) => {
          console.error('Error creating category:', error);
          form.setError('root', {
            type: 'manual',
            message:
              error.message || 'Failed to create category. Please try again.',
          });
        },
        onSettled: () => {
          setIsSubmitting(false);
        },
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      form.setError('root', {
        type: 'manual',
        message: 'An unexpected error occurred. Please try again.',
      });
      setIsSubmitting(false);
    }
  };

  const handleDialogClose = () => {
    setIsCreateDialogOpen(false);
    form.reset();
    form.clearErrors();
  };

  const handleTriggerClick = () => {
    setIsCreateDialogOpen(true);
  };

  return (
    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={handleTriggerClick}
          className="bg-main hover:bg-main-700"
        >
          <Icons.Plus className="mr-2 h-4 w-4" /> Create Category
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Create New Category</DialogTitle>
          <DialogDescription>
            Fill in the details for the new category.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateCategory)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter category name"
                      {...field}
                      disabled={isSubmitting}
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
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="blogs">Blog</SelectItem>
                      <SelectItem value="services">Service</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.formState.errors.root && (
              <div className="text-red-500 text-sm">
                {form.formState.errors.root.message}
              </div>
            )}

            <DialogFooter>
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleDialogClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Creating...' : 'Create'}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
