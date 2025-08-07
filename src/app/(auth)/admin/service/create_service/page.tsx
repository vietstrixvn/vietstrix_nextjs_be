'use client';

import React from 'react';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type * as z from 'zod';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@/components';
import { useCreateService } from '@/hooks/service/useService';
import type { CreateServiceItem } from '@/types/types';
import { useRouter } from 'next/navigation';
import { Heading } from '@/components/design/Heading';
import { CategoryList } from '@/lib';
import { serviceFormSchema } from '@/utils';
import { RichTextEditor } from '@/components/tiptap/rich-text-editor';
import ImageUploadPreview from '@/components/design/image_upload';

export default function NewServiceForm() {
  const router = useRouter();
  const [displayPrice, setDisplayPrice] = useState('');
  const { mutate: createService } = useCreateService();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploaFileKey, setUploadFileKey] = useState(0);

  const { categories, isLoading, isError } = CategoryList(
    1,
    { limit: 20, type: 'services' },
    0
  );
  const form = useForm<z.infer<typeof serviceFormSchema>>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      title: '',
      content: '',
      price: '0',
      status: 'draft',
      description: '',
      category: '',
    },
  });

  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = form;

  function createPost(
    values: z.infer<typeof serviceFormSchema>,
    status: 'show'
  ) {
    setIsSubmitting(true);
    try {
      // Create service data with the specified status
      const serviceData: CreateServiceItem = {
        title: values.title,
        content: values.content,
        description: values.description,
        file: values.file,
        category: values.category,
        status: status,
        price: Number(values.price) || 0,
      };

      createService(serviceData, {
        onSuccess: () => {
          form.reset();
          setUploadFileKey((prev) => prev + 1);
          router.push('/admin/service');
        },
        onError: (error: any) => {
          console.error('Error creating service:', error);
          form.setError('root', {
            type: 'manual',
            message:
              error.message || 'Failed to create service. Please try again.',
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
  }

  React.useEffect(() => {
    // Nếu form chưa load xong hoặc price rỗng thì set ''
    if (!form.getValues('price')) {
      setDisplayPrice('');
      return;
    }

    const formatVND = (value: number | string) => {
      const number = Number(value);
      return number.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
      });
    };

    setDisplayPrice(formatVND(form.getValues('price')));
  }, [form.watch('price')]); // watch để cập nhật khi price thay đổi

  // Hàm xử lý khi user nhập giá trị
  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    const rawValue = e.target.value.replace(/[^\d]/g, ''); // giữ số thôi
    const numberValue = Number(rawValue);
    setDisplayPrice(rawValue ? numberValue.toLocaleString('vi-VN') + ' ₫' : '');
    form.setValue('price', rawValue || '0');
  }

  const onSubmit = async (values: z.infer<typeof serviceFormSchema>) => {
    await createPost(values, 'show');
  };

  const handleImageUploaded = (imageUrl: string, imageId: string) => {
    setValue('file', imageId);
  };

  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader>
        <Heading
          name="Tạo dịch vụ mới"
          desc="Điền thông tin bên dưới để đăng dịch vụ mới."
        />
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              return handleSubmit(onSubmit)(e);
            }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-6 ">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tiêu đề</FormLabel>
                        <FormDescription>
                          Nhập tiêu đề cho dịch vụ{' '}
                        </FormDescription>
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
                    name="price"
                    render={() => (
                      <FormItem>
                        <FormLabel>Giá (VND)</FormLabel>
                        <FormDescription>
                          Đặt giá cho dịch vụ này (0 để liên hệ)
                        </FormDescription>
                        <FormControl>
                          <Input
                            type="text"
                            inputMode="numeric"
                            placeholder="0"
                            value={displayPrice}
                            onChange={handlePriceChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-6 ">
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nội dung ngắn</FormLabel>
                        <FormDescription>
                          Nhập nội dung bài đăng dịch vụ
                        </FormDescription>
                        <FormControl>
                          <Textarea
                            placeholder="Enter blog post content"
                            rows={4}
                            {...field}
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
                        <FormLabel>Thể Loại</FormLabel>
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
                                  key={category.id}
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
              </div>

              <div>
                <div className="mt-4">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mô tả chi tiết</FormLabel>
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
                </div>
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

            <CardFooter className="flex justify-between gap-4 px-0">
              <Button
                variant="outline"
                type="button"
                onClick={() => router.back()}
              >
                Hủy
              </Button>
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const values = form.getValues();
                    onSubmit(values); // Set status to 'draft'
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Đang Tạo...' : 'Tạo Dịch Vụ'}
                </Button>
              </div>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
