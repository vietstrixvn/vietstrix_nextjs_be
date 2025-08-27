'use client';

import { Icons } from '@/assets/icons/icons';
import {
  AdminContainer,
  Button,
  CustomImage,
  ErrorLoading,
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
  Textarea,
} from '@/components';
import ImageUploadPreview from '@/components/design/image_upload';
import { MultiSelect } from '@/components/pages/admin/project/multi-select';
import { RichTextEditor } from '@/components/tiptap/rich-text-editor';
import { useUpdateProject } from '@/hooks';
import { ProjectDetailData, ServiceList } from '@/lib';
import { UpdateProjectItem } from '@/types';
import { projectFormSchema } from '@/utils';
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

  const {
    project,
    isLoading: serviceLoading,
    isError: serviceError,
  } = ProjectDetailData(slug, 0);
  const { mutate: updateProject } = useUpdateProject();
  const { services, isLoading, isError } = ServiceList(1, { page_size: 20 }, 0);

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

  useEffect(() => {
    if (project && services && services.length > 0) {
      // Map ra danh sách các service id có trong project
      const matchedServices =
        project.services?.map((srv) =>
          services
            .find(
              (cat) =>
                cat.title === srv.name ||
                cat.id.toString() === srv.id?.toString()
            )
            ?.id?.toString()
        ) || [];

      form.reset({
        title: project.title || '',
        content: project.content || '',
        description: project.description || '',
        thumbnail: project.file || '',
        status: project.status || '',
        services: matchedServices.filter(Boolean),
        brandName: project.brand_name || '',
        testimonial: project.testimonial || '',
        client: project.client || '',
        link: project.link ? String(project.link) : '',
      });

      setRichTextKey((prev) => prev + 1);
    }
  }, [project, services, form]);

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = form;
  const watchedValues = watch();

  const onSubmit = (values: z.infer<typeof projectFormSchema>) => {
    setIsSubmitting(true);

    form.clearErrors();

    // Chỉ gửi những trường có thay đổi so với giá trị gốc
    const projectData: Partial<UpdateProjectItem> = {};

    if (values.title && values.title !== project?.title) {
      projectData.title = values.title;
    }
    if (values.content && values.content !== project?.content) {
      projectData.content = values.content;
    }
    if (values.description && values.description !== project?.description) {
      projectData.description = values.description;
    }
    if (
      values.services &&
      JSON.stringify(values.services) !==
        JSON.stringify(project?.services?.map((s) => s.id?.toString()))
    ) {
      projectData.services = values.services;
    }
    if (values.status && values.status !== project?.status) {
      projectData.status = values.status;
    }
    if (values.thumbnail && values.thumbnail !== project?.file) {
      projectData.file = values.thumbnail;
    }

    if (values.brandName && values.brandName !== project?.brand_name) {
      projectData.brand_name = values.brandName;
    }
    if (values.testimonial && values.testimonial !== project?.testimonial) {
      projectData.testimonial = values.testimonial;
    }
    if (values.client && values.client !== project?.client) {
      projectData.client = values.client;
    }
    if (values.link && values.link !== project?.link?.toString()) {
      projectData.link = values.link;
    }

    if (Object.keys(projectData).length === 0) {
      form.setError('root', {
        type: 'manual',
        message: 'No changes detected. Please modify at least one field.',
      });
      setIsSubmitting(false);
      return;
    }

    updateProject(
      {
        updatePost: projectData as UpdateProjectItem,
        postId: project?.id ?? '',
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
    setValue('thumbnail', imageId);
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
  if (serviceError || !project) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-4">Failed to load service data</p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return;
    <LoadingSpin />;
  }

  if (isError) {
    return;
    <ErrorLoading />;
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
            {isSubmitting ? 'Updating...' : 'Update Project'}
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
                        <Input
                          placeholder="Enter project title"
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
                        <Input
                          placeholder="Enter brand name"
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
                  name="client"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client</FormLabel>
                      <FormDescription>
                        Enter the name of the client for whom this project was
                        done.
                      </FormDescription>
                      <FormControl>
                        <Input
                          placeholder="Enter client name"
                          {...field}
                          value={field.value || ''}
                        />
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
                      <Input
                        placeholder="https://example.com"
                        {...field}
                        value={field.value || ''}
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
            name="thumbnail"
            render={() => (
              <FormItem>
                <FormLabel>Thumbnail Image</FormLabel>
                <FormControl>
                  <div>
                    {!isImageEditMode && project?.file ? (
                      <div className="relative group h-48">
                        <CustomImage
                          src={project.file}
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
                        {isImageEditMode && project?.file && (
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

                    {errors.thumbnail && (
                      <p className="text-red-500 text-sm mt-1">
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
        </form>
      </Form>
    </AdminContainer>
  );
};

export default Page;
