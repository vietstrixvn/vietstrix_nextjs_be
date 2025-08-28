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
import { useUpdateService } from '@/hooks';
import { CategoryList, ServiceDetailData } from '@/lib';
import { UpdateServiceItem } from '@/types';
import { serviceFormSchema } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

const Page = () => {
  const routerParams = useParams();
  const slug = Array.isArray(routerParams?.slug)
    ? routerParams.slug[0]
    : routerParams?.slug;

  // Move all hooks to the top - before any conditional logic
  const [isImageEditMode, setIsImageEditMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const errorRef = useRef<HTMLDivElement>(null);
  const [uploaFileKey, setUploaFileKey] = useState(0);
  const [richTextKey, setRichTextKey] = useState(0);
  const router = useRouter();
  const { categories, isLoading, isError } = CategoryList(
    1,
    { page_size: 20, type: 'services' },
    0
  );
  const {
    data: service,
    isLoading: serviceLoading,
    isError: serviceError,
  } = ServiceDetailData(slug || '', 0);
  const { mutate: updateService } = useUpdateService();

  const form = useForm<z.infer<typeof serviceFormSchema>>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      title: '',
      content: '',
      description: '',
      category: '',
      status: '',
      price: '', // FIX: Thay đổi thành string để match với schema
      file: '',
    },
  });

  useEffect(() => {
    if (service && categories && categories.length > 0) {
      const matchedCategory = categories.find(
        (cat) =>
          cat.title === service.category?.name ||
          cat.id.toString() === service.category?.id?.toString()
      );

      form.reset({
        title: service.title || '',
        content: service.content || '',
        description: service.description || '',
        file: service.file || '',
        status: service.status || '',
        price: service.price?.toString() || '', // FIX: Convert number to string
        category: matchedCategory?.id?.toString() || '',
      });

      setRichTextKey((prev) => prev + 1);
    }
  }, [service, categories, form]);

  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (values: z.infer<typeof serviceFormSchema>) => {
    setIsSubmitting(true);

    form.clearErrors();

    // Chỉ gửi những trường có thay đổi so với giá trị gốc
    const serviceData: Partial<UpdateServiceItem> = {};

    // So sánh với giá trị gốc và chỉ gửi những field có thay đổi
    if (values.title && values.title !== service?.title) {
      serviceData.title = values.title;
    }
    if (values.content && values.content !== service?.content) {
      serviceData.content = values.content;
    }
    if (values.description && values.description !== service?.description) {
      serviceData.description = values.description;
    }
    if (
      values.category &&
      values.category !== service?.category?.id?.toString()
    ) {
      serviceData.category = values.category;
    }
    if (values.status && values.status !== service?.status) {
      serviceData.status = values.status;
    }
    if (values.file && values.file !== service?.file) {
      serviceData.file = values.file;
    }
    // FIX: Thêm so sánh price
    if (values.price && values.price !== service?.price?.toString()) {
      serviceData.price = parseFloat(values.price); // Convert string back to number for API
    }

    if (Object.keys(serviceData).length === 0) {
      form.setError('root', {
        type: 'manual',
        message: 'No changes detected. Please modify at least one field.',
      });
      setIsSubmitting(false);
      return;
    }

    updateService(
      {
        updateService: serviceData as UpdateServiceItem,
        postId: service?.id ?? '',
      },
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

  // Hiển thị loading khi đang tải service data
  if (serviceLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpin />
      </div>
    );
  }

  // Hiển thị error nếu không tải được service
  if (serviceError || !service) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-4">Failed to load service data</p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <AdminContainer>
      <div className="flex justify-between">
        <Heading
          name="Edit Service"
          desc="Fill in the service details below to edit and publish."
        />
        <div className="flex gap-2 mt-6 mb-6">
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
            {isSubmitting ? 'Updating...' : 'Update Service'}
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                          placeholder="Enter service title"
                          {...field}
                          value={field.value || ''}
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
                                value={category.id.toString()}
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

              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="Enter service price"
                          {...field}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormDescription>
                        Price in VND or your currency
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ''}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
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
                    <FormLabel>Short content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter a short content or summary"
                        className="min-h-[100px]"
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormDescription>
                      This will appear as a preview of your service
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
                      {!isImageEditMode && service?.file ? (
                        <div className="relative group h-48">
                          <CustomImage
                            src={service.file}
                            alt="Current thumbnail"
                            fill
                            className="w-full object-contain border border-gray-300"
                          />
                          <div
                            className="absolute inset-0 bg-black/70 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center cursor-pointer"
                            onClick={() => setIsImageEditMode(true)}
                          >
                            <div className="text-white text-center flex gap-2 space-x-2">
                              <Icons.Pencil className="h-4 w-4" />
                              <p className="text-sm">Click to edit</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <ImageUploadPreview
                            key={uploaFileKey}
                            type="banner"
                            onImageUploaded={handleImageUploaded}
                          />
                          {isImageEditMode && service?.file && (
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
                    key={richTextKey}
                    initialContent={field.value || ''}
                    onChange={(val) => field.onChange(val.html)}
                    className="w-full rounded-none cursor-text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
