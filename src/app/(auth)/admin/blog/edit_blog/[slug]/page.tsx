'use client';

import { Icons } from '@/assets/icons/icons';
import {
  AdminContainer,
  Button,
  CustomImage,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Heading,
  Input,
  LoadingSpin,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@/components';
import ImageUploadPreview from '@/components/design/image_upload';
import { RichTextEditor } from '@/components/tiptap/rich-text-editor';
import { useUpdateBlog } from '@/hooks';
import { BlogDetailData, CategoryList } from '@/lib';
import { UpdateBlogItem } from '@/types';
import { blogFormSchema } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

const Page = () => {
  const routerParams = useParams();
  const slug = Array.isArray(routerParams?.slug)
    ? routerParams.slug[0]
    : routerParams?.slug;

  if (!slug) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpin />
      </div>
    );
  }
  const [isImageEditMode, setIsImageEditMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const errorRef = useRef<HTMLDivElement>(null);
  const [uploaFileKey, setUploaFileKey] = useState(0);
  const [richTextKey, setRichTextKey] = useState(0);

  const router = useRouter();
  const { categories, isLoading, isError } = CategoryList(
    1,
    { limit: 20, type: 'blogs' },
    0
  );
  const {
    data: blog,
    isLoading: blogLoading,
    isError: blogError,
  } = BlogDetailData(slug, 0);
  const { mutate: updateBlog } = useUpdateBlog();

  const form = useForm<z.infer<typeof blogFormSchema>>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: '',
      content: '',
      description: '',
      category: '',
      status: '',
    },
  });

  useEffect(() => {
    if (blog && categories && categories.length > 0) {
      const matchedCategory = categories.find(
        (cat) =>
          cat.title === blog.category?.name ||
          cat.id.toString() === blog.category?.id?.toString()
      );

      form.reset({
        title: blog.title || '',
        content: blog.content || '',
        description: blog.description || '',
        file: blog.file || '',
        status: blog.status || '',
        category: matchedCategory?.id?.toString() || '',
      });

      setRichTextKey((prev) => prev + 1);
    }
  }, [blog, categories, form]);

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = form;
  const watchedValues = watch();

  const onSubmit = (values: z.infer<typeof blogFormSchema>) => {
    setIsSubmitting(true);

    form.clearErrors();

    // Chỉ gửi những trường có thay đổi so với giá trị gốc
    const blogData: Partial<UpdateBlogItem> = {};

    // So sánh với giá trị gốc và chỉ gửi những field có thay đổi
    if (values.title && values.title !== blog?.title) {
      blogData.title = values.title;
    }
    if (values.content && values.content !== blog?.content) {
      blogData.content = values.content;
    }
    if (values.description && values.description !== blog?.description) {
      blogData.description = values.description;
    }
    // FIX: So sánh category đúng cách
    if (values.category && values.category !== blog?.category?.id?.toString()) {
      blogData.category = values.category;
    }
    if (values.status && values.status !== blog?.status) {
      blogData.status = values.status;
    }
    if (values.file && values.file !== blog?.file) {
      blogData.file = values.file;
    }

    if (Object.keys(blogData).length === 0) {
      form.setError('root', {
        type: 'manual',
        message: 'No changes detected. Please modify at least one field.',
      });
      setIsSubmitting(false);
      return;
    }

    updateBlog(
      { updateBlog: blogData as UpdateBlogItem, postId: blog?.id ?? '' },
      {
        onSuccess: () => {
          setIsSubmitting(false);
        },
        onError: (error) => {
          setIsSubmitting(false);
          form.setError('root', {
            type: 'manual',
            message: error.message || 'Error',
          });
        },
      }
    );
  };

  const handleImageUploaded = (imageUrl: string, imageId: string) => {
    setValue('file', imageId);
    setUploaFileKey((prev) => prev + 1);
  };

  // Hiển thị loading khi đang tải blog data
  if (blogLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpin />
      </div>
    );
  }

  // Hiển thị error nếu không tải được blog
  if (blogError || !blog) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-4">Failed to load blog data</p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <AdminContainer>
      <div className="flex justify-between">
        <Heading
          name="Edit Blog"
          desc="Fill in the blog details below to edit and publish a new post."
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
            {isSubmitting ? 'Updating...' : 'Update Blog'}
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
                        <Input
                          placeholder="Enter blog post title"
                          {...field}
                          value={field.value || ''} // Thêm value explicit
                        />
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
                        value={field.value || ''}
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
                                value={category.id.toString()} // Ensure string value
                              >
                                {category.title}
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
                        value={field.value || ''}
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
                      {!isImageEditMode && blog?.file ? (
                        // Hiển thị hình ảnh hiện tại với edit icon
                        <div className="relative group h-48 ">
                          <CustomImage
                            src={blog.file}
                            alt="Current thumbnail"
                            fill
                            className="w-full object-contain border border-gray-300"
                          />
                          {/* Overlay với edit icon khi hover */}
                          <div
                            className="absolute inset-0 bg-black/70 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center cursor-pointer"
                            onClick={() => setIsImageEditMode(true)}
                          >
                            <div className="text-white text-center flex gap-2 space-x-2">
                              {/* Edit Icon - bạn có thể thay bằng icon từ thư viện của mình */}
                              <Icons.Pencil className="h-4 w-4" />
                              <p className="text-sm">Click to edit</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        // Hiển thị ImageUploadPreview khi edit mode hoặc chưa có ảnh
                        <div>
                          <ImageUploadPreview
                            key={uploaFileKey}
                            type="banner"
                            onImageUploaded={handleImageUploaded}
                          />
                          {/* Nút Cancel nếu đang trong edit mode và có ảnh cũ */}
                          {isImageEditMode && blog?.file && (
                            <button
                              type="button"
                              onClick={() => setIsImageEditMode(false)}
                              className="mt-2 px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      )}

                      {errors.file && (
                        <p className="text-red-500 text-sm mt-1">
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
                    key={richTextKey} // FIX: Thêm key để force re-render
                    initialContent={field.value || ''} // Ensure not null/undefined
                    onChange={(val) => field.onChange(val.html)}
                    className="w-full rounded-none cursor-text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Hiển thị error nếu có */}
          {errors.root && (
            <div ref={errorRef} className="text-red-500 text-sm mt-2">
              {errors.root.message}
            </div>
          )}
        </form>
      </Form>
    </AdminContainer>
  );
};

export default Page;
