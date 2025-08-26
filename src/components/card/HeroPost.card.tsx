import { BlogList } from '@/lib';
import Link from 'next/link';
import DateComponent from '../design/DateComponent';
import { CustomImage } from '../design/image.component';
import { Avatar } from '../ui/avatar';

export function HeroPost() {
  const params = { page_size: 1 };
  const { blogs, isLoading, isError } = BlogList(1, params, 0);

  if (isLoading) return <p>Loading...</p>;
  if (isError || !blogs || blogs.length === 0) return <p>No blog found</p>;

  // Lấy bài viết đầu tiên
  const firstPost = blogs[0];
  const { title, slug, created_at, content, file } = firstPost;
  return (
    <section>
      <div className="mb-8 aspect-image-cinema md:mb-16">
        <CustomImage
          title={title}
          alt={slug}
          src={file || '/placeholder.svg'}
          width={1500}
          height={1000}
          className="max-h-[50vh] min-h-[300px]"
          priority
        />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link href={`/blogs/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-base dark:text-white/60 text-black/60">
            <DateComponent
              dateString={
                created_at instanceof Date
                  ? created_at.toISOString()
                  : created_at
              }
            />
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{content}</p>
          <Avatar />
        </div>
      </div>
    </section>
  );
}
