'use client';

import { ProjectDetailData } from '@/lib/responses/projectLib';
import { ArrowUpRight } from 'lucide-react';
import { useParams } from 'next/navigation';

import { AdminContainer, LoadingSpin } from '@/components';
import { BackButton } from '@/components/button';
import { CustomerSections } from '@/components/card';
import { ProjectSection } from '@/components/wrappers/project.warpper';
import { formatSmartDate } from '@/utils';

export default function Page() {
  const { slug } = useParams();
  const blogSlug = Array.isArray(slug) ? slug[0] : slug || '';

  const { project, isLoading, isError } = ProjectDetailData(blogSlug, 0);

  // Kiểm tra nếu blog là undefined
  if (isLoading) return <LoadingSpin />;
  if (isError || !project)
    return <p className="text-red-500">Blog not found.</p>;

  return (
    <AdminContainer>
      <BackButton href="/admin/project" />

      <ProjectSection
        title={project?.title}
        content={project?.content}
        file={project?.file}
        brand={project?.brand_name}
      />
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8">
          <CustomerSections
            client={project?.client}
            brand={project?.brand_name}
          />
          <div className="mb-4">
            <div className="relative pl-6 italic text-gray-600">
              <span className="absolute left-0 top-0 text-3xl text-gray-300">
                &quot;
              </span>
              <p>{project?.testimonial}</p>
            </div>
            <div className="mt-4 text-sm">
              <p className="font-semibold">— {project?.brand_name}</p>
            </div>
          </div>
          <div
            className="rich-text-content mt-4"
            dangerouslySetInnerHTML={{
              __html: project?.description || '',
            }}
          />
        </div>
        <div className="col-span-12 lg:col-span-4 p-6 lg:sticky lg:top-24 h-fit">
          <div className="mb-4">
            <div className="flex w-full relative  mb-6 flex-col">
              {/* Dòng tên + icon */}
              <div className="flex items-center gap-2">
                <ArrowUpRight size={40} strokeWidth={1.5} />
                <h2 className="text-4xl font-bold text-main uppercase mt-4 mb-1">
                  Quick Info
                </h2>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-6">
            {/* Country */}
            <div>
              <p className="text-xl font-bold tracking-widest text-main">
                CATEGORY
              </p>
              <p className="text-base text-black">
                {project?.services?.map((s) => s.name).join(', ')}
              </p>
            </div>

            {/* Timeline */}
            <div>
              <p className="text-xl font-bold tracking-widest text-main">
                CREATE AT
              </p>
              <p className="text-base text-black">
                {' '}
                {project?.created_at
                  ? formatSmartDate(project.created_at)
                  : 'No date available'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminContainer>
  );
}
