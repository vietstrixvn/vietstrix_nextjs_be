import { CustomImage } from '@/components/design/image.component';
import type { BlogList } from '@/types';
import Link from 'next/link';

export function BlogCard({ blog }: { blog: BlogList }) {
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className="group cursor-pointer overflow-hidden g"
    >
      <div className="relative aspect-image-main overflow-hidden">
        <CustomImage
          src={blog.file || '/placeholder.svg'}
          alt={blog.title}
          fill
          className="object-contain transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="font-medium">{blog.title}</div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">by</span>
          <div className="flex items-center gap-2">
            <div className="relative h-6 w-6 overflow-hidden  ">
              <CustomImage
                src="/icons/logo.svg"
                alt="Profile Image"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-sm">VietStrix</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
