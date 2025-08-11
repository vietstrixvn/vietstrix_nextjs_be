'use client';

import { IntroduceCard } from '@/components/card/introduce.card';
import { NoResultsFound } from '@/components/design/NoResultsFound';
import { ErrorLoading } from '@/components/loading/error';
import { LoadingSpin } from '@/components/loading/loading';
import { ROUTES } from '@/lib';
import { BlogList } from '@/lib/responses/blogLib';
import { NavBlogProps } from '@/types';
import { cn } from '@/utils';
import Link from 'next/link';
import React from 'react';

export const NavBlog: React.FC<NavBlogProps> = ({ setIsOpen }) => {
  const { blogs, isLoading, isError } = BlogList(
    1,
    {
      limit: 8,
    },
    0
  );
  const servicesItems = [
    { name: 'Service 1', path: '/services/1' },
    { name: 'Service 2', path: '/services/2' },
  ];

  return (
    <div className="flex h-full w-full">
      {/* Left Section - Navigation Links (Services and Blogs) */}
      <div className="w-1/3 flex flex-col justify-start px-10 py-16">
        <Link
          href={ROUTES.BLOG.ROOT}
          className="text-gray-400 text-sm font-medium mb-6 uppercase tracking-wider hover:font-bold hover:text-black"
        >
          Blogs
        </Link>
        {isLoading && <LoadingSpin />}
        {isError && <ErrorLoading />}

        {!isLoading && !isError && blogs?.length > 0 && (
          <nav className="space-y-2">
            {blogs.map(({ title, slug, id }, index) => (
              <div key={id} className="space-y-2">
                <div className="flex items-center gap-8">
                  <span className="text-gray-400 text-lg font-light w-8">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <Link
                    href={`/blogs/${slug}`}
                    className={cn(
                      'text-xl font-light text-gray-700 transition-all duration-300 hover:text-black hover:font-medium'
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {title}
                  </Link>
                </div>
              </div>
            ))}
          </nav>
        )}

        {!isLoading && !isError && blogs?.length === 0 && <NoResultsFound />}
      </div>

      {/* Services Column */}
      <div className="w-1/3 flex flex-col justify-start px-10 py-16">
        <div className="text-gray-400 text-sm font-medium mb-6 uppercase tracking-wider">
          Services
        </div>
        <nav className="space-y-2">
          {servicesItems.map(({ name, path }, index) => (
            <div key={name} className="space-y-2">
              <div className="flex items-center gap-8">
                <span className="text-gray-400 text-lg font-light w-8">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <Link
                  href={path}
                  className={cn(
                    'text-xl font-light text-gray-700 transition-all duration-300 hover:text-black hover:font-medium'
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {name}
                </Link>
              </div>
            </div>
          ))}
        </nav>
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
