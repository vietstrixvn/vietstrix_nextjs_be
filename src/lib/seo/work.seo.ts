// lib/seo/work-service-seo.ts
import type { Metadata } from 'next';
import { createMetadata, SEOConfig } from '../createMetadata';

export async function generateWorkHomeSEO(): Promise<Metadata> {
  const config: SEOConfig = {
    title: 'VietStrix Work | Explore Our Services & What We Can Do',
    description:
      'Discover VietStrix Work - Learn more about the services we provide, from web development and design to business solutions and technology consulting.',
    url: '/work',
    keywords: [
      'VietStrix',
      'work',
      'services',
      'dịch vụ',
      'technology',
      'công nghệ',
      'programming',
      'lập trình',
      'design',
      'thiết kế',
      'business',
      'kinh doanh',
      'consulting',
      'tư vấn',
      'solution',
      'giải pháp',
    ],
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Work', url: '/work' },
    ],
  };

  return createMetadata(config);
}
