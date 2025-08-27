'use client';

import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ProcessStepProps } from '@/types';
import { Container } from './container';
import { ArrowUpRight } from 'lucide-react';

const ProcessStep: React.FC<ProcessStepProps> = ({
  title,
  startPosition,
  color,
  width,
  delay,
  row,
  isVisible,
}) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Only start the animation countdown when the parent section is visible
    if (isVisible) {
      const timer = setTimeout(() => {
        setAnimate(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [delay, isVisible]);

  return (
    <div
      className="absolute"
      style={{
        left: startPosition,
        width: width,
        top: row === 'top' ? '0' : '80px', // Position based on row
      }}
    >
      <div className="text-lg text-white font-medium mb-2">{title}</div>
      <div
        className={cn(
          'h-3 rounded-full transition-all duration-1000 ease-out',
          color
        )}
        style={{
          width: animate ? '100%' : '0%',
          transitionDelay: `${delay}ms`,
        }}
      />
    </div>
  );
};

const ProcessTimeline: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Create intersection observer to detect when section is scrolled into view
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once triggered, we can disconnect the observer
          observer.disconnect();
        }
      },
      {
        // Trigger when at least 20% of the element is visible
        threshold: 0.2,
        // Add rootMargin to trigger slightly before the element comes into view
        rootMargin: '0px 0px -50px 0px',
      }
    );

    // Start observing the section
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Clean up observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-main px-4 mx-auto">
      <Container
        className={cn(
          'opacity-0 transform translate-x-10 transition-all duration-1000 ease-out',
          isVisible && 'opacity-100 translate-x-0'
        )}
      >
        <div className="flex flex-col">
          <h2 className="text-4xl font-bold text-white uppercase mt-4 mb-4 flex items-center gap-2">
            <ArrowUpRight size={40} strokeWidth={1.5} /> HOW WE WORK?
          </h2>
          <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-4 text-gray-200">
            Crafting Success, Step by Step
          </h2>
          <p className="text-gray-400 max-w-3xl mb-16">
            At VietStrix, we don&apos;t just build websites—we engineer{' '}
            <span className="font-semibold">digital ecosystems</span> that
            scale. Our process is{' '}
            <span className="font-semibold">
              agile, data-driven, and laser-focused
            </span>{' '}
            on delivering real value. From brainstorming the{' '}
            <span className="font-semibold">big picture</span> to refining every{' '}
            <span className="font-semibold">tiny detail</span>, we work closely
            with you to craft solutions that aren&apos;t just visually stunning
            but <span className="font-semibold">functionally powerful</span>. No
            fluff. Just <span className="font-semibold">smart execution</span>{' '}
            and <span className="font-semibold">measurable results</span>.
          </p>
        </div>

        <div className="relative h-64">
          {/* Vertical dotted lines */}
          <div className="absolute left-0 top-0 bottom-0 border-l border-dashed border-gray-300 h-full"></div>
          <div className="absolute left-1/4 top-0 bottom-0 border-l border-dashed border-gray-300 h-full"></div>
          <div className="absolute left-1/2 top-0 bottom-0 border-l border-dashed border-gray-300 h-full"></div>
          <div className="absolute left-3/4 top-0 bottom-0 border-l border-dashed border-gray-300 h-full"></div>
          <div className="absolute right-0 top-0 bottom-0 border-l border-dashed border-gray-300 h-full"></div>

          {/* Process steps - Staggered in two rows */}
          <div className="relative h-full">
            {/* Top row */}
            <ProcessStep
              title="Discovery"
              startPosition="0%"
              color="bg-gray-300"
              width="20%"
              delay={0}
              row="top"
              isVisible={isVisible}
            />

            <ProcessStep
              title="Execution"
              startPosition="40%"
              color="bg-gray-600"
              width="35%"
              delay={600}
              row="top"
              isVisible={isVisible}
            />

            <ProcessStep
              title="Reporting"
              startPosition="90%"
              color="bg-gray-800"
              width="10%"
              delay={1200}
              row="top"
              isVisible={isVisible}
            />

            {/* Bottom row */}
            <ProcessStep
              title="Planning"
              startPosition="20%"
              color="bg-gray-500"
              width="20%"
              delay={300}
              row="bottom"
              isVisible={isVisible}
            />

            <ProcessStep
              title="Optimization"
              startPosition="75%"
              color="bg-gray-700"
              width="15%"
              delay={900}
              row="bottom"
              isVisible={isVisible}
            />
          </div>

          {/* Timeline indicators */}
          <div className="absolute bottom-0 w-full">
            <div className="absolute w-full h-px bg-gray-200"></div>
            <div className="flex justify-between w-full text-gray-200">
              <div className="relative -translate-x-1/2">
                <span>0%</span>
              </div>
              <div className="relative -translate-x-1/2">
                <span>25%</span>
              </div>
              <div className="relative -translate-x-1/2">
                <span>50%</span>
              </div>
              <div className="relative -translate-x-1/2">
                <span>75%</span>
              </div>
              <div className="relative -translate-x-1/2">
                <span>100%</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProcessTimeline;
