'use client';

import { Container } from '@/components/container/container';
import SectionHeader from '@/components/design/SectionHeader';
import {
  ArrowUpRight,
  Code,
  FileText,
  Layers,
  Rocket,
  Target,
  Users,
} from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function AgencyPortfolio() {
  const missionRef = useRef<HTMLDivElement>(null);
  const commitmentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
    });

    if (missionRef.current) observer.observe(missionRef.current);
    if (commitmentRef.current) observer.observe(commitmentRef.current);

    return () => observer.disconnect();
  }, []);

  const philosophyItems = [
    {
      icon: FileText,
      title: 'Development Orientation',
      description:
        'We build stuff that actually works and lasts — not quick hacks. Every tech choice we make is to push you closer to your growth goals.',
    },
    {
      icon: Target,
      title: 'Ongoing Discovery',
      description:
        'Good delivery comes from good discovery. That’s why we keep learning non-stop — about your users, your market, and what’s changing along the way.',
    },
    {
      icon: Code,
      title: 'Strong Engineering Culture',
      description:
        'We balance speed, stability, and quality. No over-engineering flex, no sloppy shortcuts — just clean code that respects both tech and business.',
    },
    {
      icon: Rocket,
      title: "It's Null Till You Ship It",
      description:
        'Ideas don’t matter until they’re shipped. We plan sprints around outcomes, cut the waste, and move fast to get your product in users’ hands.',
    },
    {
      icon: Layers,
      title: 'Simplicity Over Complexity',
      description:
        'We keep it simple and practical. No need to build a spaceship if all you need is a bike that runs smooth and fast.',
    },
    {
      icon: Users,
      title: 'Customer Centricity',
      description:
        'Your win is our win. We treat clients like partners and take time to really understand your business and your users.',
    },
  ];

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div
            ref={missionRef}
            className="text-center transform transition-all duration-1000 opacity-0 translate-y-10"
          >
            <SectionHeader title="Our Mission" />
            <h1 className="mt-4 text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl leading-tight">
              At VietStrix, we build solutions, not just websites.
            </h1>
            <p className="mt-8 max-w-3xl mx-auto text-xl text-gray-500 leading-relaxed">
              Our mission is to bridge technology and business with
              high-performance, scalable, and future-proof solutions. We believe
              that great digital experiences are born from innovation,
              precision, and a relentless drive for optimization. In a world
              that never stops evolving, we stay ahead—by crafting, refining,
              and pushing boundaries with every project we take on.
            </p>
          </div>
        </div>
      </div>
      <section className="bg-main min-h-screen text-white py-16 px-6">
        <h2 className="text-base font-bold text-white uppercase mt-4 mb-4 flex items-center gap-2">
          <ArrowUpRight size={20} strokeWidth={1.5} /> Our approach
        </h2>
        <div className="border-b border-gray-400 mt-17" />
        <Container className="max-w-6xl mx-auto grid grid-cols-12 gap-8 min-h-screen">
          {/* Left side - Title */}
          <div className="col-span-12 lg:col-span-4 p-6 lg:sticky lg:top-24 h-fit">
            <h2 className="text-4xl font-bold text-white uppercase mt-4 mb-4 flex items-center gap-2">
              <ArrowUpRight size={40} strokeWidth={1.5} /> Development
              <br />
              philosophy
            </h2>
          </div>

          {/* Right side - Philosophy items */}
          <div className="space-y-8 col-span-12 lg:col-span-8">
            {philosophyItems.map((item, index) => (
              <div key={index}>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-main" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                    <p className="text-gray-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Separator */}
                {index < philosophyItems.length - 1 && (
                  <div className="border-b border-gray-200 mt-6" />
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
