'use client';

import { useParams } from 'next/navigation';
import { NoResultsFound } from '@/components/design/NoResultsFound';
import { formatSmartDate } from '@/utils/formatTimeAgo';
import { BackButton, CustomImage, LoadingSpin } from '@/components';
import { ServiceDetailData } from '@/lib';
import { AdminContainer } from '@/components/wrappers/admin.wrapper';
import { AdminBreadCrumb } from '@/components/layout/AdminLayout/admin.breadcrumb';

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

  const { data: service, isLoading, isError } = ServiceDetailData(slug, 0);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpin />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <NoResultsFound />
      </div>
    );
  }

  if (!service?.title || !service?.content) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpin />
      </div>
    );
  }
  return (
    <AdminContainer>
      <div className="mb-8">
        <AdminBreadCrumb title="Dịch Vụ" />
      </div>
      <BackButton href="/admin/service" />

      <div className="mx-auto">
        <header className="mb-8">
          <div className="mb-6">
            <h1 className="text-4xl sm:text-5xl font-bold mb-8">
              {service?.title}
            </h1>
          </div>
          <div className="flex justify-between">
            <div className="mb-2 sm:mb-0 flex flex-wrap items-center gap-1 text-sm text-gray-600">
              <span>Unien</span>
              <span>-</span>
              <span>
                {service?.createdAt
                  ? formatSmartDate(service.createdAt)
                  : 'No date available'}
              </span>
              <span>-</span>
              <span>{service?.category?.name}</span>
            </div>
          </div>
        </header>

        <div className="mb-8  relative h-[400px] w-full overflow-hidden">
          <CustomImage
            src={service?.file || '/Logo.svg'}
            alt={`Featured image for ${service?.title}`}
            fill
            className="object-contain"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold mt-12 mb-6">{service?.content}</h2>
          <div
            className="rich-text-content mt-4"
            dangerouslySetInnerHTML={{
              __html: service.content ?? '',
            }}
          />
        </div>
      </div>
    </AdminContainer>
  );
}
