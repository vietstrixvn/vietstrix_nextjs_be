'use client';

import { Container, LoadingSpin } from '@/components';
import CustomerSections from '@/components/card/customer.card';
import { NoResultsFound } from '@/components/design/NoResultsFound';
import { ContactForm } from '@/components/form/ContactForm';
import TextMarquee from '@/components/pages/public/home/TitleMarquee';
import { CaseStudiesCarousel } from '@/components/sections/project.section';
import ProjectSection from '@/components/wrappers/project.warpper';
import { ProjectDetailData } from '@/lib';
import { formatSmartDate } from '@/utils';
import { ArrowUpRight } from 'lucide-react';

export default function ProjectDetailPage({ slug }: { slug: string }) {
  const { project, isLoading, isError } = ProjectDetailData(slug, 0);

  const showContentError = isError;

  return (
    <main>
      {isLoading ? (
        <LoadingSpin />
      ) : showContentError ? (
        <NoResultsFound />
      ) : (
        <>
          <ProjectSection
            title={project?.title}
            content={project?.content}
            file={project?.file}
            brand={project?.brand_name}
          />
          <Container>
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
          </Container>
        </>
      )}
      <CaseStudiesCarousel />
      <TextMarquee />
      <ContactForm />
    </main>
  );
}
