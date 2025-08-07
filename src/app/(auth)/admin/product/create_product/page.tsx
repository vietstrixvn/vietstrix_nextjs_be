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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Heading,
  Button,
  Input,
  Textarea,
} from '@/components';
import { ProductFormSchema } from '@/utils';
import type { CreateProductItem } from '@/types';
import { useRouter } from 'next/navigation';
import { CategoryList } from '@/lib';
import { useCreateProduct } from '@/hooks';
import { RichTextEditor } from '@/components/tiptap/rich-text-editor';
import MultipleImageUpload from '@/components/design/multiImage.upload';

// schema.ts

export default function Page() {
  const router = useRouter();
  const { mutate: createService } = useCreateProduct();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [displayPrice, setDisplayPrice] = useState('');
  const [uploadFileKey, setUploadFileKey] = useState(0);
  const [imageIds, setImageIds] = useState<string[]>([]);

  const { categories, isLoading, isError } = CategoryList(
    1,
    { limit: 20, type: 'products' },
    0
  );
  const form = useForm<z.infer<typeof ProductFormSchema>>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      title: '',
      content: '',
      price: '0',
      status: 'draft',
      description: '',
      category: '',
    },
  });

  function createPost(
    values: z.infer<typeof ProductFormSchema>,
    status: 'show'
  ) {
    setIsSubmitting(true);
    try {
      // Create service data with the specified status
      const serviceData: CreateProductItem = {
        title: values.title,
        content: values.content,
        description: values.description,
        files: imageIds,
        category: values.category,
        status: status,
        price: Number(values.price) || 0,
      };

      createService(serviceData, {
        onSuccess: () => {
          form.reset();
          resetUpload();

          router.push('/admin/product');
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

  const { handleSubmit } = form;

  const onSubmit = async (values: z.infer<typeof ProductFormSchema>) => {
    await createPost(values, 'show');
  };

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

  const handleImagesChange = (ids: string[]) => {
    setImageIds(ids);
  };

  const resetUpload = () => {
    setUploadFileKey((prev) => prev + 1); // Thay đổi key để force re-render
    setImageIds([]); // Reset state ở parent
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <Heading
          name="Tạo Sản Phẩm"
          desc="Fill in the details below to publish a new service."
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
                        <FormLabel>Tên Sản Phẩm</FormLabel>
                        <FormDescription>
                          Enter a clear and concise title for the service
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
                        <FormLabel>Mô Tả Ngắn</FormLabel>
                        <FormDescription>
                          Enter blog post Contnet
                        </FormDescription>
                        <FormControl>
                          <Textarea
                            placeholder="Enter blog post content"
                            rows={8}
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
                        <FormLabel>Description</FormLabel>
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

              <MultipleImageUpload
                key={uploadFileKey}
                type="image"
                onImagesChange={handleImagesChange}
                maxFiles={10}
                maxFileSize={10}
              />
            </div>

            <CardFooter className="flex justify-between gap-4 px-0">
              <Button
                variant="outline"
                type="button"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const values = form.getValues();
                    onSubmit(values);
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Tạo Sản Phẩm'}
                </Button>
              </div>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
