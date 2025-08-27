'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { ProjectList } from '@/lib';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useRef, useState } from 'react';
import { ProjectMobileCard } from '../card/project/projectMobile.card';
import { ProjectPagination } from '../card/project/projectPagination.card';
import { ProjectRecentCard } from '../card/project/projectShowcase.card';
import { Container } from '../container/container';
import { Heading } from '../design/Heading';
import { NoResultsFound } from '../design/NoResultsFound';
import { ErrorLoading } from '../loading/error';
import { LoadingSpin } from '../loading/loading';

export function CaseStudiesCarousel() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const currentX = useRef(0);
  const isDragging = useRef(false);
  const [currentPage, setCurrentPage] = useState(1);

  const params = {
    page_size: 3,
  };

  const { projects, isLoading, isError, pagination } = ProjectList(
    currentPage,
    params,
    0
  );

  const handlePageChange = useCallback(
    (page: number) => {
      if (page > 0 && page <= pagination?.total_page) {
        setCurrentPage(page);
      }
    },
    [pagination?.total_page]
  );

  // Touch/swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    currentX.current = e.touches[0].clientX;
  };

  // Mouse handlers for desktop drag
  const handleMouseDown = (e: React.MouseEvent) => {
    startX.current = e.clientX;
    isDragging.current = true;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    currentX.current = e.clientX;
  };

  return (
    <Container className=" py-16 px-4 sm:px-6 lg:px-8 mx-auto">
      {/* Section Title */}
      <div className="mb-16">
        <Heading name="Judged by the results we deliver each sprint" />
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Desktop View - Show all 3 cards */}
        {isLoading ? (
          <LoadingSpin />
        ) : isError ? (
          <ErrorLoading />
        ) : projects.length === 0 ? (
          <NoResultsFound />
        ) : (
          <>
            <div className="hidden md:grid md:grid-cols-3 gap-8 mb-12">
              {projects.map((study) => (
                <ProjectRecentCard key={study.id} project={study} />
              ))}
            </div>

            {/* Mobile View - Carousel */}
            <div
              ref={carouselRef}
              className="md:hidden relative overflow-hidden mb-12"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
            >
              <div
                className="flex transition-transform duration-400 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {projects.map((study) => (
                  <ProjectMobileCard key={study.id} project={study} />
                ))}
              </div>

              {/* Mobile Navigation Dots */}
              <div className="flex justify-center mt-6 space-x-2">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                      index === currentIndex ? 'bg-gray-900' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Navigation Controls and Browse Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              {/* Browse Case Studies Button */}
              <Button
                onClick={() => router.push('/projects')}
                className="bg-main hover:bg-main-800 text-white px-6 py-3  font-medium transition-colors duration-200 flex items-center gap-2 order-2 sm:order-1"
              >
                Browse case studies
                <ArrowRight className="w-4 h-4" />
              </Button>

              {/* Navigation Buttons - Desktop */}
              <div className="hidden md:flex items-center gap-2 order-1 sm:order-2">
                <ProjectPagination
                  currentPage={currentPage}
                  totalPage={pagination.total_page}
                  onPageChange={handlePageChange}
                />
              </div>

              {/* Navigation Buttons - Mobile */}
              <div className="flex md:hidden items-center gap-2 order-1 sm:order-2">
                <ProjectPagination
                  currentPage={currentPage}
                  totalPage={pagination.total_page}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </Container>
  );
}
