'use client';

import { Container, Heading } from '@/components';
import { CategoryRecent } from '@/components/card/category.card';
import { PostRecent } from '@/components/card/post_recent.card';
import EnhancedHeroBanner from '@/components/container/enhanced-hero-banner';
import BlogGrid from '@/components/pages/public/blog/blogList';
import { useCallback, useState } from 'react';

const BlogListPageClient = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  // Add these missing state variables that are referenced in handleCategorySelect
  const [currentPage, setCurrentPage] = useState(1);
  const [allLoaded, setAllLoaded] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCategorySelect = useCallback(
    (categoryId: string | null, categoryName?: string) => {
      setSelectedCategory(categoryId);
      setCurrentPage(1);
      setAllLoaded(false);
      setRefreshKey((prev) => prev + 1);
    },
    []
  );

  return (
    <main>
      <EnhancedHeroBanner
        heading="Empowering Your Vision, Elevating Your Brand"
        subheading="Custom-built websites designed to drive growth and make an impact."
        title="Our Blogs"
      />
      <Container className="grid grid-cols-12 gap-8 min-h-screen">
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
            allLoaded={allLoaded}
            setAllLoaded={setAllLoaded}
            refreshKey={refreshKey}
          />
        </div>
      </Container>
    </main>
  );
};

export default BlogListPageClient;
