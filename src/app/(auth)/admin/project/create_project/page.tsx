'use client';

import type React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { Loader2 } from 'lucide-react';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Heading,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Button,
} from '@/components';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MultiSelect } from '@/components/pages/admin/project/multi-select';
import { ServiceList } from '@/lib/responses/serviceLib';
import { useCreateProject } from '@/hooks/project/useProject';
import type { CreateProjectItem } from '@/types/types';
import { RichTextEditor } from '@/components/tiptap/rich-text-editor';
import ImageUploadPreview from '@/components/design/image_upload';
import { projectFormSchema } from '@/utils';

export default function CreateProjectPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: createProject } = useCreateProject();
  const [uploaFileKey, setUploadFileKey] = useState(0);

  const { services, isLoading, isError } = ServiceList(1, { limit: 10 }, 0);

  const serviceOptions =
    services?.map((service: any) => ({
      value: service.id, // Confirm this is a UUID
      title: service.title,
    })) || [];

  const form = useForm<z.infer<typeof projectFormSchema>>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: '',
      content: '',
      services: [],
      description: '',
      brandName: '',
      testimonial: '',
      client: '',
      link: '',
    },
  });

  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = form;

  const createPost = async (
    values: z.infer<typeof projectFormSchema>,
    status: 'draft' | 'show'
  ) => {
    setIsSubmitting(true);

    try {
      // Ensure services remain as an array
      const projectData: CreateProjectItem = {
        title: values.title,
        content: values.content,
        description: values.description,
        services: values.services.map((_id) => _id), // Explicitly map to ensure array format
        file: values.thumbnail,
        brand_name: values.brandName,
        client: values.client,
        testimonial: values.testimonial || '',
        link: values.link || null,
        status: status,
      };

      createProject(projectData, {
        onSuccess: () => {
          form.reset();
          resetUpload;
          router.push('/admin/project');
        },
        onError: (error: any) => {
          console.error('Error creating project:', error);
          form.setError('root', {
            type: 'manual',
            message:
              error.message || 'Failed to create project. Please try again.',
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

  const onSubmit = async (values: z.infer<typeof projectFormSchema>) => {
    await createPost(values, 'show');
  };

  const handleImageUploaded = (imageUrl: string, imageId: string) => {
    setValue('thumbnail', imageId);
  };

  const resetUpload = () => {
    setUploadFileKey((prev) => prev + 1); // Thay đổi key để force re-render
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading services...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container py-10">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>
              There was an error loading services. Please try again later.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => router.refresh()}>Retry</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <Heading
            name="Tạo dự án"
            desc="Thêm một dự án mới vào danh mục của bạn để tăng uy tín. Điền vào tất cả các trường bắt buộc."
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
              {' '}
              {form.formState.errors.root && (
                <div className="text-red-500 text-sm">
                  {form.formState.errors.root.message}
                </div>
              )}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên dự án</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter project title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mô tả ngắn</FormLabel>
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
              <FormField
                control={form.control}
                name="thumbnail"
                render={({ field: { ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>Thumbnail Image</FormLabel>
                    <FormControl>
                      <div>
                        <ImageUploadPreview
                          key={uploaFileKey}
                          type="thumbnail"
                          onImageUploaded={handleImageUploaded}
                        />
                        {errors.thumbnail && (
                          <p className="text-red-500 text-sm">
                            {errors.thumbnail.message}
                          </p>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="services"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dịch vụ</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={serviceOptions}
                        selected={field.value}
                        onChange={field.onChange}
                        placeholder="Select services"
                      />
                    </FormControl>
                    <FormDescription>
                      Select all services that were involved in this project.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mô tả chi tiết dự án</FormLabel>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="brandName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên công ty</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter brand name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="client"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Khách hàng</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter client name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="testimonial"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dánh giá</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter client feedback or testimonial"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link (Nếu có)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                    {isSubmitting ? 'Saving...' : 'Lưu nháp'}
                  </Button>
                </div>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
