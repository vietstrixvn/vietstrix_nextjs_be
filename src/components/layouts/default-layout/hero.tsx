'use client';

import TypingText from '@/components/animata/text/typing-text';
import GridDistortion from '@/components/animation/bg.animation';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowDown, Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  const contactNow = () => {
    router.push('/contact-us');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    // Lắng nghe mouse move từ container chính
    container.addEventListener('mousemove', handleMouseMove);
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen w-full relative flex flex-col justify-center items-center"
      style={{ height: '100vh', width: '100%' }}
    >
      {/* Background Layer - GridDistortion với mouse passthrough */}
      <div
        className="absolute top-0 left-0 w-full h-full z-0"
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        <GridDistortion
          imageSrc="/imgs/bgHome.jpg"
          grid={10}
          mouse={0.1}
          strength={0.15}
          relaxation={0.9}
          mousePosition={mousePosition}
          className="w-full h-full"
        />
      </div>

      {/* Content Layer - có thể interact được */}
      <div className="container mx-auto px-4 py-12 md:py-24 flex flex-col h-screen justify-between relative z-10">
        <div className="flex flex-col md:flex-row my-auto items-start justify-between">
          <div className="my-auto">
            <div className="relative text-white">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none"
              >
                VIETSTRIX
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none">
                  TEAM
                </h1>
                <TypingText
                  text="  Vietstrix® is a Gen Z-led web design studio creating sleek,
                  scalable websites tailored to your brand—where creativity
                  meets performance."
                  waitTime={3000}
                  alwaysVisibleCount={0}
                />
                {/* <p className="text-gray-300 uppercase leading-tight">

                </p> */}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="self-end flex justify-between w-full"
            >
              <button
                onClick={contactNow}
                className={cn(
                  'flex items-center space-x-2 mt-8 group transform transition-all duration-1000 ease-out delay-400 hover:bg-white/10 px-4 py-2 rounded-lg',
                  isLoaded
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-4 opacity-0'
                )}
              >
                <span className="text-sm text-white font-medium tracking-wider uppercase">
                  Contact Now
                </span>
                <Phone
                  size={16}
                  className="transition-transform text-white group-hover:scale-110"
                />
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <button
          onClick={scrollToContent}
          className={cn(
            'flex items-center space-x-2 mt-8 group transform transition-all duration-1000 ease-out delay-400 hover:bg-white/10 px-4 py-2 rounded-lg',
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          )}
        >
          <span className="text-sm text-white font-medium tracking-wider uppercase">
            Scroll to explore
          </span>
          <ArrowDown
            size={16}
            className="transition-transform text-white group-hover:translate-y-1"
          />
        </button>
      </div>
    </div>
  );
}
