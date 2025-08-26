'use client';

import { CustomImage } from '@/components/design/image.component';
import { CaseStudyCardProps } from '@/types';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export function CaseStudyCard({ study, index }: CaseStudyCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="mb-2 md:mb-0"
      layout
    >
      <div
        ref={imageRef}
        className="overflow-hidden  group relative"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="aspect-image-main relative">
          <CustomImage
            src={study.file || '/placeholder.svg'}
            alt="VIETSTRIX Casestudy"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          />

          {isHovering && (
            <motion.div
              className="absolute flex items-center justify-center bg-main bg-opacity-60 text-white px-4 py-2 rounded-full text-sm font-medium z-10 pointer-events-none"
              style={{
                left: mousePosition.x - 50,
                top: mousePosition.y - 15,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              Read more
            </motion.div>
          )}

          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-gray-600 font-medium">{study.client}</p>
          {/* <p className="text-gray-500">{study.link}</p> */}
        </div>

        <h3 className="text-2xl font-bold mb-4 text-gray-900">{study.title}</h3>

        <div className="mb-4">
          <div className="relative pl-6 italic text-gray-600">
            <span className="absolute left-0 top-0 text-3xl text-gray-300">
              &quot;
            </span>
            <p>{study.content}</p>
          </div>

          <div className="mt-4 text-sm">
            <p className="font-semibold">— {study.brand_name}</p>
            <p className="text-gray-500">{study.testimonial}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
