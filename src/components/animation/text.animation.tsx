'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface SplitTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  splitBy?: 'chars' | 'words';
  stagger?: number;
  threshold?: number;
}

export function SplitTextReveal({
  text,
  className,
  delay = 0,
  duration = 0.6,
  splitBy = 'chars',
  stagger = 0.05,
  threshold = 0.1,
}: SplitTextRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const splitText = splitBy === 'chars' ? text.split('') : text.split(' ');

  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      <div className="flex flex-wrap">
        {splitText.map((item, index) => (
          <span
            key={index}
            className="inline-block transform transition-all ease-out"
            style={{
              transitionDelay: isVisible ? `${delay + index * stagger}s` : '0s',
              transitionDuration: `${duration}s`,
              transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
              opacity: isVisible ? 1 : 0,
            }}
          >
            {item}
            {splitBy === 'words' && index < splitText.length - 1 && '\u00A0'}
          </span>
        ))}
      </div>
    </div>
  );
}
