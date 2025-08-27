'use client';

import { Container, LoadingSpin, Separator } from '@/components';
import { CopyLinkButton } from '@/components/button/copy.button';
import { FacebookShareButton } from '@/components/button/share.button';
import { ServiceRecent } from '@/components/card/service_recent.card';
import { NoResultsFound } from '@/components/design/NoResultsFound';
import { ContactForm } from '@/components/form/ContactForm';
import { CaseStudiesCarousel } from '@/components/sections/project.section';
import { ServiceWrapper } from '@/components/wrappers/service.warpper';
import { ServiceDetailData } from '@/lib';
import { formatSmartDate } from '@/utils';
import { ArrowUpRight } from 'lucide-react';

export default function ServiceDetailPage({ slug }: { slug: string }) {
  const { data: blog, isLoading, isError } = ServiceDetailData(slug, 0);

  const showContentError = isError;

  return (
    <main>
      {isLoading ? (
        <LoadingSpin />
      ) : showContentError ? (
        <NoResultsFound message="Không thể hiển thị nội dung dịch vụ." />
      ) : (
        <>
          <ServiceWrapper
            title={blog?.title}
            content={blog?.content}
            file={blog?.file}
          />
          <Container>
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 lg:col-span-8">
                <div
                  className="rich-text-content mt-4"
                  dangerouslySetInnerHTML={{
                    __html: blog?.description || '',
                  }}
                />
              </div>
              <div className="col-span-12 lg:col-span-4 p-6 lg:sticky lg:top-24 h-fit">
                <div className="mb-4">
                  <div className="flex w-full relative  mb-6 flex-col">
                    {/* Dòng tên + icon */}
                    <div className="flex items-center gap-2">
                      <ArrowUpRight size={30} strokeWidth={1.5} />
                      <h2 className="text-3xl font-bold text-main uppercase mt-4 mb-1">
                        Quick Info
                      </h2>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-2">
                    <CopyLinkButton />
                    <FacebookShareButton />
                  </div>
                </div>

                <div className="flex flex-col space-y-6">
                  {/* Country */}
                  <div>
                    <p className="text-xl font-bold tracking-widest text-main">
                      CATEGORY
                    </p>
                    <p className="text-base text-black">
                      {' '}
                      {blog?.category.name}
                    </p>
                  </div>

                  {/* Industry */}
                  <div>
                    <p className="text-xl font-bold tracking-widest text-main">
                      PRICE
                    </p>
                    <p className="text-base text-black">{blog?.price}</p>
                  </div>

                  {/* Timeline */}
                  <div>
                    <p className="text-xl font-bold tracking-widest text-main">
                      CREATE AT
                    </p>
                    <p className="text-base text-black">
                      {' '}
                      {blog?.created_at
                        ? formatSmartDate(blog.created_at)
                        : 'No date available'}
                    </p>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center gap-2">
                      <ArrowUpRight size={30} strokeWidth={1.5} />
                      <h2 className="text-3xl font-bold text-main uppercase mt-4 mb-1">
                        Related Services
                      </h2>
                    </div>
                  </div>
                  <ServiceRecent category_id={blog?.category?.id} />
                </div>
              </div>
            </div>
          </Container>
        </>
      )}
      <CaseStudiesCarousel />
      <Separator className="my-4" />
      <ContactForm />
    </main>
  );
}
