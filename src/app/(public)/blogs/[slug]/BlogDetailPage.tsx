'use client';

import { Container, CustomImage, LoadingSpin } from '@/components';
import { BackButton } from '@/components/button';
import { CopyLinkButton } from '@/components/button/copy.button';
import { FacebookShareButton } from '@/components/button/share.button';
import { PostRecent } from '@/components/card/post_recent.card';
import { PostImageRecent } from '@/components/card/postImage.card';
import { Heading } from '@/components/design/Heading';
import { NoResultsFound } from '@/components/design/NoResultsFound';
import { BlogDetailData } from '@/lib';
import { formatSmartDate } from '@/utils';
import { useEffect } from 'react';

export default function BlogDetailPage({ slug }: { slug: string }) {
  const { data: blog, isLoading, isError } = BlogDetailData(slug, 0);

  const showContentError = isError;

  useEffect(() => {
    const codeBlocks = document.querySelectorAll('.rich-text-content pre');

    codeBlocks.forEach((block) => {
      const pre = block as HTMLElement;

      // tránh thêm 2 lần
      if (pre.parentElement?.classList.contains('code-block')) return;

      const wrapper = document.createElement('div');
      wrapper.className = 'code-block relative';

      const copyBtn = document.createElement('button');
      copyBtn.innerText = 'Copy';
      copyBtn.className = 'copy-btn';

      copyBtn.addEventListener('click', async () => {
        const code = pre.innerText || '';
        try {
          await navigator.clipboard.writeText(code);
          copyBtn.innerText = 'Copied!';
          setTimeout(() => (copyBtn.innerText = 'Copy'), 2000);
        } catch {
          copyBtn.innerText = 'Error';
        }
      });

      pre.replaceWith(wrapper);
      wrapper.appendChild(copyBtn);
      wrapper.appendChild(pre);
    });
  }, [blog?.description]);

  return (
    <Container>
      <div className="mt-24">
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
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1 text-sm text-gray-600">
                      <span>Unien</span>
                      <span>-</span>
                      <span>
                        {blog?.created_at
                          ? formatSmartDate(blog.created_at)
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

                <div className="mb-8 relative  aspect-image-main w-full overflow-hidden">
                  <CustomImage
                    src={blog?.file || '/placeholder.svg'}
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
                      __html: blog?.description || '',
                    }}
                  />
                </div>
              </>
            )}
          </div>

          <div className="col-span-12 lg:col-span-4 p-6 lg:sticky lg:top-24 h-fit">
            <div className="mb-4">
              <Heading name="Related Posts" />
            </div>
            <PostRecent category_id={blog?.category?.id} />

            <div className="pt-10">
              <div className="mb-4">
                <Heading name="Latest Posts" />
              </div>
              <PostImageRecent />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
