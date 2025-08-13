'use client';

import { BlogList } from '@/lib';
import Link from 'next/link';
import { NoResultsFound } from '../design/NoResultsFound';
import { LoadingSpin } from '../loading/loading';
import { CustomImage } from '../design/image.component';

export const PostImageRecent = ({ category_id }: { category_id?: string }) => {
  // Tạo params nếu có category
  const params = {
    category_id: category_id,
    limit: 5,
  };

  const { blogs, isLoading, isError } = BlogList(1, params, 0);

  // Loading state
  if (isLoading) {
    return <LoadingSpin />;
  }

  // Error state
  if (isError || blogs.length === 0) {
    return <NoResultsFound />;
  }

  return (
    <ul>
      {blogs.map((relatedPost, index) => (
        <li key={index} className="mb-4">
          <Link href={`/blogs/${relatedPost.slug}`}>
            <CustomImage
              src={relatedPost.file || '/icons/logo.svg'}
              alt="Blog Post"
              width={400}
              height={400}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <p className="text-16 border-b-2 pb-2 line-clamp-3 text-gray-700 transform transition-transform duration-300 hover:text-main">
              {relatedPost.title}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
};
