'use client';

import type React from 'react';

import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  CardFooter,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  AdminContainer,
} from '@/components';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCreateBlog } from '@/hooks/blog/useBlog';
import type { CreateBlogItem } from '@/types/types';
import { CategoryList } from '@/lib/responses/categoriesLib';
import { useRouter } from 'next/navigation';
import { Heading } from '@/components/design/Heading';
import { blogFormSchema } from '@/utils';
import { RichTextEditor } from '@/components/tiptap/rich-text-editor';
import ImageUploadPreview from '@/components/design/image_upload';

export default function NewBlogPost() {
  const router = useRouter();
  const { mutate: createBlog } = useCreateBlog();
  const { categories, isLoading, isError } = CategoryList(
    1,
    { limit: 20, type: 'blogs' },
    0
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploaFileKey, setUploadFileKey] = useState(0);

  const form = useForm<z.infer<typeof blogFormSchema>>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: '',
      content: '',
      description: '',
      category: '',
      status: 'draft',
    },
  });

  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = form;

  const createBlogPost = async (
    values: z.infer<typeof blogFormSchema>,
    status: 'show'
  ) => {
    setIsSubmitting(true);
    try {
      const blogData: CreateBlogItem = {
        title: values.title,
        content: values.content,
        description: values.description,
        category: values.category,
        file: values.file,
        link: null,
        status: status,
      };

      createBlog(blogData, {
        onSuccess: () => {
          form.reset();
          setUploadFileKey((prev) => prev + 1);

          router.push('/admin/blog');
        },
        onError: (error: any) => {
          console.error('Error creating blog:', error);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof blogFormSchema>) => {
    await createBlogPost(values, 'show');
  };

  const handleImageUploaded = (imageUrl: string, imageId: string) => {
    setValue('file', imageId);
  };

  return (
    <AdminContainer>
      <div className="flex justify-between">
        <Heading
          name="Create Blog"
          desc="Fill in the blog details below to create and publish a new post."
        />
        <div className="flex gap-2 mt-6 mb-6">
          {/* Nút Cancel: xám nhạt */}
          <Button
            type="button"
            variant="outline"
            className="border-gray-300 text-gray-600 hover:bg-gray-100"
            onClick={() => router.back()}
          >
            Cancel
          </Button>

          <Button
            type="button"
            className="bg-main text-white hover:bg-main-700"
            onClick={() => {
              const values = form.getValues();
              onSubmit(values);
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Đang Tạo...' : 'Create Blog'}
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={(e) => {
            return handleSubmit(onSubmit)(e);
          }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-6">
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter blog post title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isLoading}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={
                                isLoading
                                  ? 'Loading categories...'
                                  : 'Select a category'
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {isLoading ? (
                            <SelectItem value="loading" disabled>
                              Loading categories...
                            </SelectItem>
                          ) : isError ? (
                            <SelectItem value="error" disabled>
                              Error loading categories
                            </SelectItem>
                          ) : categories && categories.length > 0 ? (
                            categories.map((category) => (
                              <SelectItem
                                key={category.id.toString()}
                                value={category.id}
                              >
                                {category.name}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="no-categories" disabled>
                              No categories available
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      {isError && (
                        <p className="text-sm text-red-500 mt-1">
                          Failed to load categories
                        </p>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short content </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter a short content or summary"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This will appear as a preview of your blog post
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="file"
              render={() => (
                <FormItem>
                  <FormLabel>Thumbnail Image</FormLabel>
                  <FormControl>
                    <div>
                      <ImageUploadPreview
                        key={uploaFileKey}
                        type="banner"
                        onImageUploaded={handleImageUploaded}
                      />
                      {errors.file && (
                        <p className="text-red-500 text-sm">
                          {errors.file.message}
                        </p>
                      )}
                    </div>
                  </FormControl>

                  <FormDescription>
                    Upload an image (max 20MB). Supported formats: JPG, PNG,
                    WebP
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Detailed description</FormLabel>
                <FormControl>
                  <RichTextEditor
                    initialContent={field.value}
                    onChange={(val) => field.onChange(val.html)}
                    className="w-full rounded-none cursor-text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </AdminContainer>
  );
}
