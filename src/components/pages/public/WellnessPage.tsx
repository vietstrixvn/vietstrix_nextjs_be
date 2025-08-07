'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import {
  ArrowRight,
  Zap,
  Code,
  // Users,
  // Brain,
  UserCheck,
  Sparkles,
} from 'lucide-react';
import SectionHeader from '@/components/design/SectionHeader';
import { MainService } from '@/types';

const services: MainService[] = [
  {
    id: 'quick-dev',
    title: 'FAST WEBSITE BUILDS',
    description: 'Launch your site in 1–2 weeks',
    fullDescription:
      'Need a simple blog, landing page, or portfolio website fast? We build and deliver functional, clean, and responsive websites in 1–2 weeks. Perfect for small projects, quick launches, or testing an idea without overcomplicating it.',
    color: 'bg-orange-200',
    hoverColor: 'bg-orange-300',
    textColor: 'text-orange-900',
    icon: <Zap className="w-6 h-6" />,
  },

  {
    id: 'custom-web',
    title: 'CUSTOM WEBSITE SOLUTIONS',
    description: 'Modern, user-focused websites',
    fullDescription:
      'We create personalized websites that reflect your brand and engage your audience. Every site is designed with a modern look, smooth experience, and a foundation ready to grow as your business evolves. Perfect for businesses or creators who want a unique online presence without unnecessary complexity.',
    color: 'bg-sky-200',
    hoverColor: 'bg-sky-300',
    textColor: 'text-sky-900',
    icon: <Code className="w-6 h-6" />,
  },

  {
    id: 'on-demand',
    title: 'ON-DEMAND WEB SUPPORT',
    description: 'Get help exactly when you need it',
    fullDescription:
      'Need quick fixes, feature updates, or guidance for your website or web app? We provide flexible, on-demand support to keep your project running smoothly—no long-term contracts needed.',
    color: 'bg-green-200',
    hoverColor: 'bg-green-300',
    textColor: 'text-green-900',
    icon: <UserCheck className="w-6 h-6" />,
  },

  {
    id: 'branding-seo',
    title: 'BRANDING & SEO',
    description: 'Boost your visibility and identity',
    fullDescription:
      'Make your website not only functional but also recognizable. I provide basic SEO to improve search visibility and create branding elements like logos, banners, and consistent visuals to give your project a professional identity.',
    color: 'bg-pink-200',
    hoverColor: 'bg-pink-300',
    textColor: 'text-pink-900',
    icon: <Sparkles className="w-6 h-6" />,
  },
];

export function WellnessPage() {
  const [expandedService, setExpandedService] =
    useState<string>('acceleration');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleServiceInteraction = (serviceId: string) => {
    setExpandedService(serviceId);
  };

  const handleKeyDown = (event: React.KeyboardEvent, serviceId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleServiceInteraction(serviceId);
    }
  };

  const handleArrowClick = (serviceId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    // Navigate to service page - you can implement routing here
    console.log(`Navigate to ${serviceId} service page`);
  };

  if (!isClient) {
    return null; // Prevent hydration mismatch
  }

  return (
    <section className="py-20 max-w-7xl mx-auto relative">
      {/* Header Section */}
      <div className="mb-16 flex items-baseline">
        <SectionHeader title="Our expertise" />
      </div>
      {/* Service Panels */}
      <div className="space-y-3 md:space-y-4">
        {services.map((service) => {
          const isExpanded = expandedService === service.id;

          return (
            <div
              key={service.id}
              className={`
                relative overflow-hidden rounded-2xl cursor-pointer
                transition-all duration-500 ease-in-out transform
                ${isExpanded ? service.hoverColor : service.color}
                ${isExpanded ? 'shadow-2xl scale-[1.02]' : 'shadow-lg hover:shadow-xl'}
                ${isExpanded ? 'min-h-[280px] md:min-h-[240px]' : 'h-20 md:h-24'}
                hover:scale-[1.01] focus-within:scale-[1.01]
                border border-white/50
              `}
              onMouseEnter={() => handleServiceInteraction(service.id)}
              onTouchStart={() => handleServiceInteraction(service.id)}
              tabIndex={0}
              role="button"
              aria-expanded={isExpanded}
              aria-label={`${service.title} service. ${isExpanded ? 'Expanded' : 'Collapsed'}`}
              onKeyDown={(e) => handleKeyDown(e, service.id)}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4 w-32 h-32 rounded-full bg-white/20 blur-xl" />
                <div className="absolute bottom-4 left-4 w-24 h-24 rounded-full bg-white/15 blur-lg" />
              </div>

              {/* Collapsed State Header */}
              <div className="flex items-center justify-between h-20 md:h-24 px-6 md:px-8 relative z-10">
                <div className="flex items-center space-x-4">
                  <div className={`${service.textColor} opacity-80`}>
                    {service.icon}
                  </div>
                  <h2
                    className={`text-xl md:text-2xl font-bold tracking-wide ${service.textColor}`}
                  >
                    {service.title}
                  </h2>
                </div>

                {/* Arrow Button - Always visible */}
                <button
                  onClick={(e) => handleArrowClick(service.id, e)}
                  className={`
                    group flex items-center justify-center w-12 h-12 md:w-14 md:h-14
                    rounded-full bg-white/90 backdrop-blur-sm
                    transition-all duration-300 ease-in-out
                    hover:bg-white hover:scale-110 focus:scale-110
                    focus:outline-none focus:ring-4 focus:ring-white/50
                    ${isExpanded ? 'shadow-lg' : 'shadow-md'}
                  `}
                  aria-label={`Learn more about ${service.title}`}
                >
                  <ArrowRight
                    className={`
                      w-6 h-6 md:w-7 md:h-7 transition-all duration-300
                      group-hover:translate-x-1 group-focus:translate-x-1
                      ${service.textColor}
                    `}
                  />
                </button>
              </div>

              {/* Expanded Content */}
              <div
                className={`
                  px-6 md:px-8 pb-8 relative z-10
                  transition-all duration-500 ease-in-out
                  ${
                    isExpanded
                      ? 'opacity-100 transform translate-y-0'
                      : 'opacity-0 transform translate-y-8 pointer-events-none'
                  }
                `}
              >
                <div className="max-w-4xl">
                  {/* Service Description */}
                  <p
                    className={`text-lg md:text-xl font-medium mb-4 ${service.textColor} opacity-80`}
                  >
                    {service.description}
                  </p>

                  {/* Full Description */}
                  <p
                    className={`text-base md:text-lg leading-relaxed ${service.textColor} opacity-70 max-w-3xl`}
                  >
                    {service.fullDescription}
                  </p>
                </div>
              </div>

              {/* Animated Border */}
              <div
                className={`
                  absolute inset-0 rounded-2xl border-2 border-transparent
                  transition-all duration-300
                  ${isExpanded ? 'border-white/30' : ''}
                `}
              />
            </div>
          );
        })}
      </div>

      {/* Mobile Instructions */}
      <div className="mt-12 text-center md:hidden">
        <p className="text-sm text-gray-500 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 inline-block">
          Tap any service to explore • Tap arrow to learn more
        </p>
      </div>
    </section>
  );
}
