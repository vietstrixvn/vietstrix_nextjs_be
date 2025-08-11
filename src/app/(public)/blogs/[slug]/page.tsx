'use client';

import { useParams } from 'next/navigation';
import { NoResultsFound } from '@/components/design/NoResultsFound';
import { formatSmartDate } from '@/utils';
import {
  BackButton,
  Container,
  ContactSection,
  CustomImage,
  LoadingSpin,
  SEO,
  CopyLinkButton,
} from '@/components';
import { BlogDetailData, ROUTES } from '@/lib';
import { Heading } from '@/components/design/Heading';
import { PostRecent } from '@/components/card/category.card';
import DefaultBreadcrumb from '@/components/design/DefaultBreadCrumb';
import { FacebookShareButton } from '@/components/button/share.button';

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

  const { data: blog, isLoading, isError } = BlogDetailData(slug, 0);

  const showContentError = isError;

  return (
    <>
      <SEO
        title={blog?.title || 'Bài Viết'}
        description={blog?.content || ''}
        image={blog?.file || '/Logo.svg'}
      />

      <Container className="mt-26">
        <BackButton href="/blogs" />

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8">
            {isLoading ? (
              <LoadingSpin />
            ) : showContentError ? (
              <NoResultsFound message="Không thể hiển thị nội dung dịch vụ." />
            ) : (
              <>
                <header className="mb-8">
                  <div className="mb-6">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-8">
                      {blog?.title}
                    </h1>
                    <DefaultBreadcrumb />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1 text-sm text-gray-600">
                      <span>Unien</span>
                      <span>-</span>
                      <span>
                        {blog?.createdAt
                          ? formatSmartDate(blog.createdAt)
                          : 'No date available'}
                      </span>
                      {blog?.category?.name && (
                        <>
                          <span>-</span>
                          <span>{blog?.category.name}</span>
                        </>
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-2">
                      <CopyLinkButton />
                      <FacebookShareButton />
                    </div>
                  </div>
                </header>

                <div className="mb-8 relative h-[400px] w-full overflow-hidden">
                  <CustomImage
                    src={blog?.file || '/Logo.svg'}
                    alt={`Featured image for ${blog?.title}`}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>

                <div>
                  <h2 className="text-3xl font-bold mt-12 mb-6">
                    {blog?.title}
                  </h2>
                  <div
                    className="rich-text-content mt-4"
                    dangerouslySetInnerHTML={{
                      __html: blog?.content || '',
                    }}
                  />
                </div>
              </>
            )}
          </div>

          <div className="col-span-12 lg:col-span-4 p-6 lg:sticky lg:top-24 h-fit">
            <div className="mb-4">
              <Heading name="Bài Viết Liên Quan" />
            </div>
            <PostRecent category_id={blog?.category?.id} />

            <div className="pt-10">
              <div className="mb-4">
                <Heading name="Bài Viết Mới Nhất" />
              </div>
              <PostRecent />
            </div>
          </div>
        </div>

        <div className="mt-16">
          <ContactSection href={ROUTES.BLOG.ROOT} title="Bài Viết" />
          {/* <RelatedPosts /> */}
        </div>
      </Container>
    </>
  );
}
