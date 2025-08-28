'use client';

import { Container } from '@/components';
import { BlogCard } from '@/components/card/post/blog.card';
import { NoResultsFound } from '@/components/design/NoResultsFound';
import SectionHeader from '@/components/design/SectionHeader';
import { ErrorLoading } from '@/components/loading/error';
import { LoadingSpin } from '@/components/loading/loading';
import { BlogList } from '@/lib/responses/blogLib';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function BlogSection() {
  const { blogs, isLoading, isError } = BlogList(
    1,
    {
      page_size: 3,
      status: 'show',
    },
    0
  );
  return (
    <Container>
      <SectionHeader title="Blogs" />
      <div className="mx-auto max-w-7xl">
        <p className="mt-4 text-sm text-gray-600 md:text-base">
          Explore in-depth case studies showcasing our latest web projects,
          highlighting design, development, and performance insights.
        </p>

        {isLoading && <LoadingSpin />}

        {/* 👇 Handle error */}
        {isError && <ErrorLoading />}

        {/* 👇 Render blogs if data is loaded */}
        {!isLoading &&
          !isError &&
          (blogs && blogs.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((nominee) => (
                <BlogCard key={nominee.id} blog={nominee} />
              ))}
            </div>
          ) : (
            <NoResultsFound />
          ))}

        <div className="mt-16 flex justify-center">
          <Link
            href="/blogs"
            className="group flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-black"
          >
            Check out all blogs
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </Container>
  );
}
