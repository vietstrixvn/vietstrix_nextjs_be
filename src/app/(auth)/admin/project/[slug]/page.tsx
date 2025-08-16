'use client';

import { useParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { BackButton } from '@/components/button/back.button';
import { ProjectDetailData } from '@/lib/responses/projectLib';
import { CardContent } from '@/components/ui/card';
import { Calendar, Clock, Edit, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@radix-ui/react-separator';

import { formatDistanceToNow, format, differenceInHours } from 'date-fns';
import { CustomImage, LoadingSpin } from '@/components';

export default function Page() {
  const { slug } = useParams();
  const blogSlug = Array.isArray(slug) ? slug[0] : slug || '';
  const userInfo = useAuthStore((state) => state.userInfo);

  const { project, isLoading, isError } = ProjectDetailData(blogSlug, 0);

  // Kiểm tra nếu blog là undefined
  if (isLoading) return <LoadingSpin />;
  if (isError || !project)
    return <p className="text-red-500">Blog not found.</p>;

  return (
    <>
      <div>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-2">
                <BackButton href="/admin/project" />
                <h1 className="text-2xl font-bold tracking-tight">
                  Project Details
                </h1>
                <Badge
                  variant={project.status === 'show' ? 'default' : 'secondary'}
                >
                  {project.status}
                </Badge>
              </div>
              {userInfo?.role === 'admin' && (
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Project
                  </Button>
                  {/* <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleDeleteClick}
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </Button> */}
                </div>
              )}
            </div>
            <CardContent>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  Created:{' '}
                  {(() => {
                    if (!project?.createdAt) return '-';

                    const date = new Date(project.createdAt);
                    if (isNaN(date.getTime())) return '-';

                    const hoursAgo = differenceInHours(new Date(), date);

                    if (hoursAgo < 1) {
                      return formatDistanceToNow(date, { addSuffix: true });
                    } else if (hoursAgo < 24) {
                      return `${hoursAgo}h ago`;
                    } else {
                      return format(date, 'yyyy/MM/dd');
                    }
                  })()}
                </div>
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  Updated:{' '}
                  {(() => {
                    if (!project?.updatedAt) return '-';

                    const date = new Date(project.updatedAt);
                    if (isNaN(date.getTime())) return '-';

                    const hoursAgo = differenceInHours(new Date(), date);

                    if (hoursAgo < 1) {
                      return formatDistanceToNow(date, { addSuffix: true });
                    } else if (hoursAgo < 24) {
                      return `${hoursAgo}h ago`;
                    } else {
                      return format(date, 'yyyy/MM/dd');
                    }
                  })()}
                </div>

                <div className="flex items-center">
                  <User className="mr-1 h-4 w-4" />
                  Posted by: {project.user?.username}
                </div>
              </div>
            </CardContent>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium">Title</h3>
              <p className="text-sm mt-1">{project.title}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium">Slug</h3>
              <p className="text-sm mt-1">{project.slug}</p>
            </div>
          </div>
          <Separator />
          <div>
            <h3 className="text-sm font-medium">Content</h3>
            <p className="text-sm mt-1">{project.content}</p>
          </div>
          <Separator />

          <div className="mb-2 sm:mb-0">
            <span className="uppercase text-xs font-semibold tracking-wider text-gray-500">
              SERVICE
            </span>
            <p className="font-bold text-lime-500 text-xl">
              {project?.service?.map((cat) => cat.title).join(', ')}
            </p>
          </div>
          <div className="mb-12 bg-gray-200 rounded-md overflow-hidden">
            <div className="aspect-video relative">
              <CustomImage
                src={project?.file || '/Logo.svg?height=400&width=800'}
                alt="Project feature image"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium">Client</h3>
              <p className="text-sm mt-1">{project.client}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium">Brand Name</h3>
              <p className="text-sm mt-1">{project.brand_name}</p>
            </div>
          </div>
          <Separator />
          <div>
            <h3 className="text-sm font-medium">Testimonial</h3>
            <p className="text-sm mt-1 italic">{project.testimonial}</p>
          </div>
        </div>

        <h3 className="text-sm font-medium">Description</h3>
      </div>
    </>
  );
}
