'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import {
  AdminContainer,
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Heading,
} from '@/components';
import ImageUploadPreview from '@/components/design/image_upload';
import { MultiSelect } from '@/components/pages/admin/project/multi-select';
import { RichTextEditor } from '@/components/tiptap/rich-text-editor';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCreateProject } from '@/hooks/project/useProject';
import { ServiceList } from '@/lib/responses/serviceLib';
import type { CreateProjectItem } from '@/types';
import { projectFormSchema } from '@/utils';

export default function CreateProjectPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: createProject } = useCreateProject();
  const [uploaFileKey, setUploadFileKey] = useState(0);

  const { services, isLoading, isError } = ServiceList(1, { page_size: 10 }, 0);

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
    <AdminContainer>
      <div className="flex justify-between">
        <Heading
          name="Create project"
          desc="Add a new project to your portfolio to increase your reputation. Fill in all required fields."
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
            {isSubmitting ? 'Creating...' : 'Create Project'}
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={(e) => {
            return handleSubmit(onSubmit)(e);
          }}
          className="space-y-8"
        >
          {form.formState.errors.root && (
            <div className="text-red-500 text-sm">
              {form.formState.errors.root.message}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-6">
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormDescription>
                        Enter a clear and unique name to identify your project.
                      </FormDescription>

                      <FormControl>
                        <Input placeholder="Enter project title" {...field} />
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
                      <FormLabel>Services</FormLabel>
                      <FormDescription>
                        Select all services that were involved in this project.
                      </FormDescription>
                      <FormControl>
                        <MultiSelect
                          options={serviceOptions}
                          selected={field.value}
                          onChange={field.onChange}
                          placeholder="Select services"
                        />
                      </FormControl>

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
                    <FormDescription>
                      This will appear as a preview of your service
                    </FormDescription>
                    <FormControl>
                      <Textarea
                        placeholder="Enter a short content or summary"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-6">
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="brandName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormDescription>
                        Enter the name of the company associated with this
                        project.
                      </FormDescription>
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
                      <FormLabel>Client</FormLabel>
                      <FormDescription>
                        Enter the name of the client for whom this project was
                        done.
                      </FormDescription>
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
                    <FormLabel>Review</FormLabel>
                    <FormDescription>
                      Share feedback or comments about this project.
                    </FormDescription>{' '}
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
                    <FormLabel>Project Link (Optional)</FormLabel>
                    <FormDescription>
                      Add a link related to this project, such as a website or
                      repository.
                    </FormDescription>

                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="thumbnail"
            render={() => (
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Description</FormLabel>
                <FormDescription>
                  Provide a detailed description of the project, including its
                  goals and key features.
                </FormDescription>
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
