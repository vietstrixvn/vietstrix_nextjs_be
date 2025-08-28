'use client';

import { CustomImage } from '@/components/design/image.component';
import { ServiceList } from '@/types';
import { formatSmartDate } from '@/utils';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';

export function ServiceCard({ service }: { service: ServiceList }) {
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };
  return (
    <Link
      key={service.id}
      href={`/services/${service.slug}`}
      className="group cursor-pointer overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
    >
      <div
        className="relative overflow-hidden group aspect-image-main "
        ref={(el) => {
          if (el) imageRefs.current.set(service.id, el);
        }}
        onMouseMove={(e) => handleMouseMove(e)}
        onMouseEnter={() => setHoveredPost(service.id)}
        onMouseLeave={() => setHoveredPost(null)}
      >
        <CustomImage
          src={service.file || '/placeholder.svg'}
          alt="Blog Post"
          width={400}
          height={400}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent ${
            hoveredPost === service.id ? 'opacity-80' : 'opacity-60'
          } transition-opacity duration-300`}
        />

        {/* Mouse following "Read" button - only visible when hovering this specific post */}
        {hoveredPost === service.id && (
          <motion.div
            className="absolute flex items-center gap-2 text-white font-medium bg-main px-3 py-1.5 rounded-sm pointer-events-none"
            animate={{
              opacity: 1,
              scale: 1,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.1 }}
            style={{
              transform: `translate(-50%, -50%)`,
              left: mousePosition.x,
              top: mousePosition.y,
            }}
          >
            Read
            <ArrowUpRight className="h-4 w-4" />
          </motion.div>
        )}
      </div>
      <div className="mt-4 flex flex-col">
        <div className="p-5">
          <span className="text-sm text-gray-500">
            {formatSmartDate(service.created_at)}
          </span>
          <h3 className="text-xl font-bold mt-2 mb-3">{service.title}</h3>
          {/* <p className="text-gray-600 text-sm">{blog.content}</p> */}
        </div>
        <div className="flex justify-end items-center gap-2 px-5 pb-5">
          <span className="text-sm text-gray-600">by</span>
          <div className="flex items-center gap-2">
            <div className="relative h-6 w-6 overflow-hidden">
              <CustomImage
                src="/icons/logo.svg"
                alt="Profile Image"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-sm">VietStrix</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
