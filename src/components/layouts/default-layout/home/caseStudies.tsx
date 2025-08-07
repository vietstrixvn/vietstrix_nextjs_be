'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/design/SectionHeader';

interface Award {
  id: number;
  title: string;
  organization: string;
  year: string;
  image: string;
}

export default function PortfolioShowcase() {
  const [hoveredAward, setHoveredAward] = useState<number | null>(null);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const awards: Award[] = [
    {
      id: 1,
      title: 'BEST RESIDENTIAL DESIGN',
      organization: 'European Design Awards',
      year: '2024',
      image: '/img/hero1.png',
    },
    {
      id: 2,
      title: 'SUSTAINABLE ARCHITECTURE PRIZE',
      organization: 'Green Building Council Awards',
      year: '2024',
      image: '/img/hero2.png',
    },
    {
      id: 3,
      title: 'EXCELLENCE IN TIMBER CONSTRUCTION',
      organization: 'International Woodworks Conference',
      year: '2023',
      image: '/img/banner3.jpg',
    },
    {
      id: 4,
      title: 'INNOVATIVE USE OF MATERIALS',
      organization: 'ArchDaily Global Awards',
      year: '2022',
      image: '/img/banner4.jpg',
    },
    {
      id: 5,
      title: 'OUTSTANDING CONCEPT DESIGN',
      organization: 'World Architecture Biennale',
      year: '2022',
      image: '/img/hero4.png',
    },
    {
      id: 6,
      title: 'BEST SMALL-SCALE PROJECT',
      organization: 'Architecture Digest Awards',
      year: '2022',
      image: '/img/hero3.png',
    },
    {
      id: 7,
      title: 'GREEN BUILDING AWARD',
      organization: 'Global EcoDesign Forum',
      year: '2020',
      image: '/img/hero2.png',
    },
    {
      id: 8,
      title: 'TOP PROJECT OF THE YEAR',
      organization: 'Design Excellence Awards',
      year: '2019',
      image: '/img/hero2.png',
    },
  ];

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
    <section className="py-20 max-w-7xl mx-auto relative" ref={sectionRef}>
      <div className="mb-16 flex items-baseline">
        <SectionHeader title="Other Services" />
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
            <div className="py-8 border-t border-gray-200 grid grid-cols-12 items-center relative cursor-pointer hover:bg-gray-50 transition-colors duration-200">
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
                  {award.organization}
                </p>
              </div>

              {hoveredAward === award.id && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-black rounded-full md:hidden" />
              )}
            </div>
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
                <Image
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
    </section>
  );
}
