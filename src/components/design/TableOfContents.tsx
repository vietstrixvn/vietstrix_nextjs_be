'use client';

import { ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';

interface TOCHeading {
  id: string;
  text: string;
  level: number;
}

interface TOCProps {
  headings: TOCHeading[];
  className?: string;
}

export function TableOfContents({ headings, className = '' }: TOCProps) {
  const [activeHeading, setActiveHeading] = useState<string>('');

  // Track active heading based on scroll position
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -50% 0px',
        threshold: 0,
      }
    );

    // Observe all headings
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [headings]);

  const scrollToHeading = (headingId: string) => {
    const element = document.getElementById(headingId);
    if (element) {
      const offsetTop = element.offsetTop - 100; // Account for fixed header
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className={`mb-8 ${className}`}>
      <div className="text-gray-700 p-4">
        <div className="flex w-full relative mt-6 mb-6 flex-col">
          {/* Dòng tên + icon */}
          <div className="flex items-center gap-2">
            <ArrowUpRight size={30} strokeWidth={1.5} />
            <h2 className="text-2xl font-bold text-main uppercase mt-4 mb-1">
              Table of Contents
            </h2>
          </div>
        </div>

        <ul className="space-y-2 text-base">
          {headings.map((h, index) => (
            <li
              key={`${h.id}-${index}`}
              className={`transition-all duration-200 ${
                h.level === 3 ? 'ml-4' : ''
              }`}
            >
              <button
                onClick={() => scrollToHeading(h.id)}
                className={`
                  w-full text-left px-3 py-2 rounded-md transition-all duration-200 hover:bg-main-100 hover:shadow-sm
                  ${
                    activeHeading === h.id
                      ? 'bg-main-100 shadow-sm border-l-3 border-main-700 text-main font-medium'
                      : 'text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100'
                  }
                  ${h.level === 2 ? 'font-medium' : 'font-normal'}
                `}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`
                      w-1.5 h-1.5 rounded-full transition-colors duration-200
                      ${
                        activeHeading === h.id
                          ? 'bg-main-700'
                          : 'bg-gray-300 dark:bg-gray-500'
                      }
                    `}
                  />
                  <span className="line-clamp-2">{h.text}</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .border-l-3 {
          border-left-width: 3px;
        }
      `}</style>
    </nav>
  );
}
