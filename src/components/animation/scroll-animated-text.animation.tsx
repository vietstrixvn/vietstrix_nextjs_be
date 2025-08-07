'use client';

import { useEffect, useRef, useState } from 'react';

interface TextSegment {
  text: string;
  isColored: boolean;
  color?: string;
}

export default function ScrollAnimatedText() {
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  const segments: TextSegment[] = [
    { text: '→ We help CTOs and product teams ', isColored: false },
    { text: '  speed up', isColored: true, color: '#c084fc' },
    { text: ' ▶ development, ', isColored: false },
    { text: 'modernize', isColored: true, color: '#fb923c' },
    { text: ' 📊 existing products, and ', isColored: false },
    { text: 'adopt AI', isColored: true, color: '#67e8f9' },
    { text: ' ⚙️ so they can ', isColored: false },
    { text: 'ship faster', isColored: true, color: '#c084fc' },
    {
      text: " 🚀 without compromising on quality. That's our promise.",
      isColored: false,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    if (textRef.current) observer.observe(textRef.current);

    return () => {
      if (textRef.current) observer.unobserve(textRef.current);
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <div
        ref={textRef}
        className="text-3xl md:text-5xl lg:text-5xl font-light leading-tight flex flex-wrap"
      >
        {segments.map((segment, i) => {
          if (segment.isColored) {
            // Hiệu ứng từng chữ cho đoạn có màu
            return (
              <span
                key={i}
                className="font-medium mr-1"
                style={{ color: segment.color }}
              >
                {segment.text.split('').map((char, j) => (
                  <span
                    key={j}
                    style={{
                      display: char === ' ' ? 'inline' : 'inline-block',
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible
                        ? 'translateY(0)'
                        : 'translateY(20px)',
                      transition: `all 0.4s ease ${j * 30}ms`,
                    }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            );
          }

          // Đoạn không màu (hiệu ứng fade toàn khối)
          return (
            <span
              key={i}
              style={{
                color: isVisible ? '#1f2937' : '#9ca3af',
                transition: `color 0.6s ease ${i * 150}ms`,
              }}
            >
              {segment.text}
            </span>
          );
        })}
      </div>
    </div>
  );
}
