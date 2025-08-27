'use client';

import { Container, Heading } from '@/components';
import { CategoryRecent } from '@/components/card/category/category.card';
import { HeroPost } from '@/components/card/HeroPost.card';
import { PostRecent } from '@/components/card/post_recent.card';
import BlogGrid from '@/components/pages/public/blog/blogList';
import { useCallback, useState } from 'react';

const BlogListPageClient = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  // Add these missing state variables that are referenced in handleCategorySelect
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCategorySelect = useCallback((categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
    setRefreshKey((prev) => prev + 1);
  }, []);

  return (
    <main>
      <Container>
        <section className="mt-16 mb-16 md:mb-12">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
            Blog.
          </h1>
        </section>
        <HeroPost />
        <div className="grid grid-cols-12 gap-8 min-h-screen">
          <div className="col-span-12 lg:col-span-4 p-6 lg:sticky lg:top-24 h-fit">
            <div className="mb-4">
              <Heading name="Category" />
            </div>
            <CategoryRecent
              onCategorySelect={handleCategorySelect}
              type="blogs"
              selectedCategory={selectedCategory}
            />

            <div className="pt-10">
              <div className="mb-4">
                <Heading name="Latest Posts" />
              </div>
              <PostRecent />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-8">
            {/* Pass the required props to BlogGrid */}
            <BlogGrid
              selectedCategory={selectedCategory}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              refreshKey={refreshKey}
            />
          </div>
        </div>
      </Container>
    </main>
  );
};

export default BlogListPageClient;
