// lib/data/blog-service-data.ts

import { createMetadata, SEOConfig } from '@/lib/createMetadata';
import { Metadata } from 'next';

export async function generateWebServiceHomeSEO(): Promise<Metadata> {
  const config: SEOConfig = {
    title: 'Web Development | VietStrix Service',
    description:
      'A quick dive into modern web design and how we craft sleek, user-focused digital experiences.',
    image: '/imgs/webDev.jpg',
    url: '/services/web-development',
    author: 'Lenf',
    publishedTime: '2025-08-20',
    modifiedTime: '2025-08-20',
    articleSection: 'Web Development',
    keywords: [
      'UI/UX',
      'web design',
      'ui',
      'ux',
      'website service',
      'dịch vụ website',
      'hướng dẫn web',
      'web guide',
      'kinh nghiệm thiết kế web',
      'web design experience',
      'frontend',
      'backend',
      'best practices',
      'trải nghiệm người dùng',
      'user experience',
    ],
    tags: ['UI/UX'],
    schemaType: 'Article',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Service', url: '/services' },
      { name: 'Web Development', url: '/services/web-development' },
    ],
  };

  return createMetadata(config);
}
