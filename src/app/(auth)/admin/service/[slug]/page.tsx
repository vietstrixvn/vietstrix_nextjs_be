'use client';

import { AdminContainer, Container, LoadingSpin } from '@/components';
import { BackButton } from '@/components/button';
import { NoResultsFound } from '@/components/design/NoResultsFound';
import { RichTextParser } from '@/components/design/RichTextParser';
import { ServiceWrapper } from '@/components/wrappers/service.warpper';
import { ServiceDetailData } from '@/lib';
import { formatSmartDate } from '@/utils';
import { ArrowUpRight } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function Page() {
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

  const { data: blog, isLoading, isError } = ServiceDetailData(slug, 0);
  const showContentError = isError;

  return (
    <AdminContainer>
      <BackButton href="/admin/service" />
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
                <div className="rich-text-content">
                  {blog?.description && (
                    <RichTextParser html={blog.description} />
                  )}
                </div>
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
                </div>
              </div>
            </div>
          </Container>
        </>
      )}
    </AdminContainer>
  );
}
