'use client';

import { IntroduceCard } from '@/components/card/introduce.card';
import { ErrorLoading } from '@/components/loading/error';
import { LoadingSpin } from '@/components/loading/loading';
import { CategoryList } from '@/lib';
import { NavBlogProps } from '@/types';
import Link from 'next/link';
import React, { useMemo } from 'react';
import { BlogListNav } from './blogList.nav';

export const NavBlog: React.FC<NavBlogProps> = () => {
  const params = useMemo(
    () => ({
      page_size: 4,
      type: 'blogs',
    }),
    []
  );

  const { categories, isLoading, isError } = CategoryList(1, params, 0);

  return (
    <div className="flex h-full w-full">
      {/* Left Section - Navigation Links (Services and Blogs) */}
      <div className="w-2/3 flex flex-col justify-start px-10 py-16">
        <Link
          href="/blogs"
          className="flex items-center text-lg mb-6 uppercase tracking-wider group"
        >
          <div className="w-3 h-8 bg-red-300 transform origin-bottom-left"></div>
          <p className="ml-2 text-gray-400 hover:text-main hover:underline font-bold">
            ALL BLOGS
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-main transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></span>
          </p>
        </Link>
        {isLoading && <LoadingSpin />}
        {isError && <ErrorLoading />}

        {!isLoading && !isError && categories?.length > 0 && (
          <nav className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
            {categories.map(({ title, id }) => (
              <div key={id}>
                <div className="text-gray-400 text-sm font-medium mb-6 uppercase tracking-wider hover:font-bold hover:text-black">
                  {title}
                </div>
                <div className="space-y-2">
                  <BlogListNav category={id} />
                </div>
              </div>
            ))}
          </nav>
        )}
      </div>

      {/* Blogs Column */}

      {/* Right Section - Featured Project */}
      <div className="w-1/3 flex items-start bg-cover bg-center overflow-hidden">
        <div className="w-full h-96 relative">
          <IntroduceCard
            title="About Us"
            description="A serene architectural masterpiece blending natural elements with modern design principles."
            imageSrc="/imgs/introduce.jpg"
            delay={0}
          />
        </div>
      </div>
    </div>
  );
};
