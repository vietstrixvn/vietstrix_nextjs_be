'use client';

import { Container } from '@/components/container/container';
import { CustomImage } from '@/components/design/image.component';
import { NoResultsFound } from '@/components/design/NoResultsFound';
import SectionHeader from '@/components/design/SectionHeader';
import { ErrorLoading } from '@/components/loading/error';
import { LoadingSpin } from '@/components/loading/loading';
import { ServiceList } from '@/lib';
import { truncateText } from '@/utils';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

interface Award {
  id: string;
  title: string;
  content: string;
  href: string;
  image: string;
}

export function ServiceListData() {
  const [hoveredAward, setHoveredAward] = useState<string | null>(null);
  const [isInView, setIsInView] = useState(false);

  const awards: Award[] = [
    {
      id: '1',
      title: 'Web Development',
      content: 'European Design Awards',
      href: 'web-development',
      image: '/img/hero1.png',
    },
    {
      id: '2',
      title: 'SUSTAINABLE ARCHITECTURE PRIZE',
      content: 'Green Building Council Awards',
      href: '2024',
      image: '/img/hero2.png',
    },
    {
      id: '3',
      title: 'EXCELLENCE IN TIMBER CONSTRUCTION',
      content: 'International Woodworks Conference',
      href: '2023',
      image: '/img/banner3.jpg',
    },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);

  const Servicesparams = useMemo(
    () => ({
      page_size: 10,
    }),
    []
  );

  const { services, isLoading, isError } = ServiceList(1, Servicesparams, 0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Container className="py-20 mx-auto relative">
      <section ref={sectionRef}>
        <div className="flex items-baseline">
          <SectionHeader title="Core Expertise" />
        </div>
        <div className="relative">
          {awards.map((award, index) => (
            <motion.div
              key={award.id}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredAward(award.id)}
              onMouseLeave={() => setHoveredAward(null)}
            >
              <Link
                href={`/services/${award.href}`}
                className="py-8 border-t border-gray-200 grid grid-cols-12 items-center relative cursor-pointer hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="col-span-4 md:col-span-2">
                  <p className="text-sm font-semibold text-gray-500">
                    [{award.id}]
                  </p>
                </div>
                <div className="col-span-12 md:col-span-5 mb-2 md:mb-0">
                  {/* Title */}
                  <h3 className="font-bold text-sm md:text-base uppercase tracking-wide">
                    {award.title}
                  </h3>
                </div>
                <div className="col-span-8 md:col-span-5">
                  {/* Category */}
                  <p className="text-sm md:text-base text-gray-600">
                    {award.content}
                  </p>
                </div>

                {hoveredAward === award.id && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-black rounded-full md:hidden" />
                )}
              </Link>
            </motion.div>
          ))}

          {/* Image container */}
          <div className="fixed right-12 top-1/2 transform -translate-y-1/2 pointer-events-none w-1/3 hidden md:flex items-center justify-end z-10">
            {awards.map((award) => (
              <motion.div
                key={award.id}
                className="absolute right-0"
                initial={{ opacity: 0, x: 50 }}
                animate={{
                  opacity: hoveredAward === award.id ? 1 : 0,
                  x: hoveredAward === award.id ? 0 : 50,
                }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                <div className="relative w-[300px] h-[400px]">
                  <CustomImage
                    src={award.image || '/placeholder.svg'}
                    alt={`${award.title} preview`}
                    fill
                    className="object-cover"
                    sizes="300px"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mb-16 flex items-baseline">
          <SectionHeader title="Additional Services" /> {/* Dịch vụ khác */}
        </div>

        <div className="relative">
          {isLoading ? (
            <LoadingSpin />
          ) : isError ? (
            <ErrorLoading />
          ) : services.length === 0 ? (
            <NoResultsFound />
          ) : (
            services.map((award, index) => (
              <motion.div
                key={award.id}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredAward(award.id)}
                onMouseLeave={() => setHoveredAward(null)}
              >
                <Link
                  href={`/services/${award.slug}`}
                  className="py-8 border-t border-gray-200 grid grid-cols-12 items-center relative cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="col-span-4 md:col-span-2">
                    <p className="text-sm font-semibold text-gray-500">
                      [{index + 1}]
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-5 mb-2 md:mb-0">
                    {/* Title */}
                    <h3 className="font-bold text-sm md:text-base uppercase tracking-wide">
                      {award.title}
                    </h3>
                  </div>
                  <div className="col-span-8 md:col-span-5">
                    {/* Assuming content is description, not category */}
                    <p className="text-sm md:text-base text-gray-600">
                      {truncateText(award.content, 100)}
                    </p>
                  </div>

                  {hoveredAward === award.id && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-black rounded-full md:hidden" />
                  )}
                </Link>
              </motion.div>
            ))
          )}

          {/* Image container */}
          <div className="fixed right-12 top-1/2 transform -translate-y-1/2 pointer-events-none w-1/3 hidden md:flex items-center justify-end z-10">
            {services.map((award) => (
              <motion.div
                key={award.id}
                className="absolute right-0"
                initial={{ opacity: 0, x: 50 }}
                animate={{
                  opacity: hoveredAward === award.id ? 1 : 0,
                  x: hoveredAward === award.id ? 0 : 50,
                }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                <div className="relative w-[300px] h-[400px]">
                  <CustomImage
                    src={award.file || '/placeholder.svg'}
                    alt={`${award.title} preview`}
                    fill
                    className="object-cover"
                    sizes="300px"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
}
