'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Hero } from '@/types';
import { Container } from '../container/container';

export default function HeroSection({ title, heading, subheading }: Hero) {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    router.push('/contact-us');
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative w-full h-[800px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900">
      {/* Animated SVG Background */}
      <div className="absolute inset-0 opacity-20">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Floating geometric shapes with animations */}
          <rect
            x="100"
            y="150"
            width="120"
            height="80"
            fill="url(#gradient1)"
            className="animate-float-slow"
            style={{
              animation: 'float-slow 8s ease-in-out infinite',
            }}
          />
          <rect
            x="300"
            y="400"
            width="100"
            height="100"
            fill="url(#gradient2)"
            className="animate-float-medium"
            style={{
              animation: 'float-medium 6s ease-in-out infinite 1s',
            }}
          />
          <rect
            x="800"
            y="200"
            width="150"
            height="60"
            fill="url(#gradient3)"
            className="animate-float-fast"
            style={{
              animation: 'float-fast 4s ease-in-out infinite 2s',
            }}
          />
          <rect
            x="600"
            y="500"
            width="80"
            height="120"
            fill="url(#gradient4)"
            className="animate-float-slow"
            style={{
              animation: 'float-slow 7s ease-in-out infinite 0.5s',
            }}
          />
          <rect
            x="1000"
            y="350"
            width="90"
            height="90"
            fill="url(#gradient5)"
            className="animate-float-medium"
            style={{
              animation: 'float-medium 5s ease-in-out infinite 1.5s',
            }}
          />
          <rect
            x="200"
            y="600"
            width="110"
            height="70"
            fill="url(#gradient6)"
            className="animate-float-fast"
            style={{
              animation: 'float-fast 6s ease-in-out infinite 3s',
            }}
          />

          {/* Gradient definitions */}
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#1e40af" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#0891b2" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="gradient6" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#dc2626" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Content */}
      <Container className="relative z-10 mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <div
            className={`space-y-8 transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div
              className={`transition-all duration-1000 ease-out delay-200 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <p className="text-sm font-semibold text-blue-400 tracking-wider uppercase mb-4">
                {title}
              </p>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                {heading}
              </h1>
            </div>
          </div>

          {/* Right Column - Description and CTA */}
          <div
            className={`space-y-8 transition-all duration-1000 ease-out delay-400 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-lg text-slate-300 leading-relaxed">
              {subheading}
            </p>
            <div
              className={`transition-all duration-1000 ease-out delay-600 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <Button
                onClick={handleClick}
                size="lg"
                className="relative overflow-hidden bg-blue-500 rounded-none text-white px-8 py-3 text-base font-medium transition-all duration-300 group"
              >
                <span className="relative z-10">→ Get in touch</span>
                <span className="absolute left-0 top-0 h-full w-0 bg-blue-600 transition-all duration-500 group-hover:w-full z-0"></span>
              </Button>
            </div>
          </div>
        </div>
      </Container>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) translateX(10px) rotate(2deg);
          }
          50% {
            transform: translateY(-10px) translateX(-5px) rotate(-1deg);
          }
          75% {
            transform: translateY(-30px) translateX(15px) rotate(3deg);
          }
        }

        @keyframes float-medium {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-25px) translateX(-10px) rotate(-2deg);
          }
          66% {
            transform: translateY(-15px) translateX(20px) rotate(1deg);
          }
        }

        @keyframes float-fast {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-35px) translateX(-15px) rotate(-3deg);
          }
        }
      `}</style>
    </section>
  );
}
