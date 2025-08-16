'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface AdvancedSplitTextProps {
  text: string;
  className?: string;
  animationType?:
    | 'slideUp'
    | 'slideDown'
    | 'slideLeft'
    | 'slideRight'
    | 'fade'
    | 'scale'
    | 'rotate';
  delay?: number;
  duration?: number;
  stagger?: number;
  threshold?: number;
}

export function AdvancedSplitText({
  text,
  className,
  animationType = 'slideUp',
  delay = 0,
  duration = 0.8,
  stagger = 0.03,
  threshold = 0.1,
}: AdvancedSplitTextProps) {
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

  const getInitialTransform = () => {
    switch (animationType) {
      case 'slideUp':
        return 'translateY(100%)';
      case 'slideDown':
        return 'translateY(-100%)';
      case 'slideLeft':
        return 'translateX(-100%)';
      case 'slideRight':
        return 'translateX(100%)';
      case 'fade':
        return 'translateY(0)';
      case 'scale':
        return 'translateY(0) scale(0)';
      case 'rotate':
        return 'translateY(0) rotate(90deg)';
      default:
        return 'translateY(100%)';
    }
  };

  const getFinalTransform = () => {
    switch (animationType) {
      case 'scale':
        return 'translateY(0) scale(1)';
      case 'rotate':
        return 'translateY(0) rotate(0deg)';
      default:
        return 'translateY(0) translateX(0)';
    }
  };

  const getInitialOpacity = () => {
    return animationType === 'fade' ? 0 : 1;
  };

  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      <div className="flex flex-wrap">
        {text.split('').map((char, index) => (
          <span
            key={index}
            className="inline-block transition-all ease-out"
            style={{
              transitionDelay: isVisible ? `${delay + index * stagger}s` : '0s',
              transitionDuration: `${duration}s`,
              transform: isVisible
                ? getFinalTransform()
                : getInitialTransform(),
              opacity: isVisible ? 1 : getInitialOpacity(),
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
    </div>
  );
}
