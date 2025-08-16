'use client';

import type React from 'react';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Container } from '../container/container';
import { CustomImage } from '../design/image.component';
import { Heading } from '../design/Heading';

const caseStudies = [
  {
    id: 1,
    image: '/placeholder.svg?height=400&width=600',
    logo: '/placeholder.svg?height=40&width=80',
    caption: 'A $20M startup rebrands and launches a new product in 5 months',
    brand: 'ondat',
  },
  {
    id: 2,
    image: '/placeholder.svg?height=400&width=600',
    logo: '/placeholder.svg?height=40&width=80',
    caption: 'One bank now reaches 36+ countries after moving to the cloud',
    brand: 'NDA',
  },
  {
    id: 3,
    image: '/placeholder.svg?height=400&width=600',
    logo: '/placeholder.svg?height=40&width=80',
    caption:
      "xpate's new data lake built with AWS saves an estimated $2M annually",
    brand: 'xpate',
  },
];

export default function CaseStudiesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const currentX = useRef(0);
  const isDragging = useRef(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % caseStudies.length);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(
      (prev) => (prev - 1 + caseStudies.length) % caseStudies.length
    );
    setTimeout(() => setIsAnimating(false), 400);
  };

  // Touch/swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    currentX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;

    const diffX = startX.current - currentX.current;
    const threshold = 50;

    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    isDragging.current = false;
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

  const handleMouseUp = () => {
    if (!isDragging.current) return;

    const diffX = startX.current - currentX.current;
    const threshold = 50;

    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    isDragging.current = false;
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
        <div className="hidden md:grid md:grid-cols-3 gap-8 mb-12">
          {caseStudies.map((study, index) => (
            <div
              key={study.id}
              className="group cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              <div className="relative  overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="w-full h-full relative aspect-[3/2] overflow-hidden">
                  <CustomImage
                    src={study.image || '/icons/logo.svg'}
                    alt={`${study.brand} case study`}
                    className=" object-cover transition-transform duration-300 group-hover:scale-105"
                    fill
                  />
                  {/* Semi-transparent brand logo */}
                  <div className="absolute bottom-4 left-4 h-6  bg-white/80 backdrop-blur-sm px-3 py-2">
                    <CustomImage
                      src={'/icons/logo.svg'}
                      alt={`${study.brand} logo`}
                      className="w-auto opacity-90"
                      fill
                    />
                  </div>
                </div>
              </div>
              {/* Caption */}
              <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                {study.caption}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile View - Carousel */}
        <div
          ref={carouselRef}
          className="md:hidden relative overflow-hidden mb-12"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            className="flex transition-transform duration-400 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {caseStudies.map((study) => (
              <div key={study.id} className="w-full flex-shrink-0 px-4">
                <div className="group cursor-pointer">
                  <div className="relative bg-white rounded-lg overflow-hidden shadow-sm">
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <img
                        src={study.image || '/placeholder.svg'}
                        alt={`${study.brand} case study`}
                        className="w-full h-full object-cover"
                      />
                      {/* Semi-transparent brand logo */}
                      <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm rounded-md px-3 py-2">
                        <img
                          src={study.logo || '/placeholder.svg'}
                          alt={`${study.brand} logo`}
                          className="h-6 w-auto opacity-90"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Caption */}
                  <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                    {study.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Navigation Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {caseStudies.map((_, index) => (
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
          <Button className="bg-main hover:bg-main-800 text-white px-6 py-3  font-medium transition-colors duration-200 flex items-center gap-2 order-2 sm:order-1">
            Browse case studies
            <ArrowRight className="w-4 h-4" />
          </Button>

          {/* Navigation Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-2 order-1 sm:order-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              disabled={isAnimating}
              className="w-10 h-10 border-gray-300 hover:bg-gray-100 transition-colors duration-200 bg-transparent"
              aria-label="Previous case study"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              disabled={isAnimating}
              className="w-10 h-10 border-gray-300 hover:bg-gray-100 transition-colors duration-200 bg-transparent"
              aria-label="Next case study"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Navigation Buttons - Mobile */}
          <div className="flex md:hidden items-center gap-2 order-1 sm:order-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              disabled={isAnimating}
              className="w-10 h-10 rounded-lg border-gray-300 hover:bg-gray-100 transition-colors duration-200 bg-transparent"
              aria-label="Previous case study"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              disabled={isAnimating}
              className="w-10 h-10 rounded-lg border-gray-300 hover:bg-gray-100 transition-colors duration-200 bg-transparent"
              aria-label="Next case study"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
