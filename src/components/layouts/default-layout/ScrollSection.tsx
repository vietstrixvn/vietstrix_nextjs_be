// components/layouts/default-layout/ScrollSection.tsx
'use client';

import { ScrollSectionProps } from '@/types';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ScrollSection({ children, id }: ScrollSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <section
      id={id}
      ref={ref}
      className="min-h-screen scroll-snap-start relative"
    >
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </section>
  );
}
