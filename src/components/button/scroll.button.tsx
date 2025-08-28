'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { WebsiteList } from '@/lib';
import { ArrowUp, Facebook } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FaLinkedin } from 'react-icons/fa';

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { website, isLoading, isError } = WebsiteList(0);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-center gap-3 z-50">
      {isLoading ? (
        <>
          <Skeleton className="w-12 h-12 rounded-full bg-gray-300/30" />
          <Skeleton className="w-12 h-12 rounded-full bg-gray-300/30" />
        </>
      ) : (
        <>
          {!isError && website?.fb && (
            <a
              href={website.fb}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-[#1877F2] text-white rounded-full shadow-md hover:bg-[#145DBF] flex items-center justify-center transition duration-300"
              aria-label="Facebook Messenger"
            >
              <Facebook size={20} />
            </a>
          )}

          {!isError && website?.linkedin && (
            <a
              href={website.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 flex items-center justify-center transition duration-300"
              aria-label="Linkedin"
            >
              <FaLinkedin size={20} />
            </a>
          )}
        </>
      )}

      {isVisible && (
        <button
          onClick={scrollToTop}
          className="w-12 h-12 bg-main text-white rounded-full shadow-md hover:bg-main-700 flex items-center justify-center transition duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
