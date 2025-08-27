// lib/seo/home-seo.ts
import type { Metadata } from 'next';
import { createMetadata, SEOConfig } from '../createMetadata';

export async function generateHomeSEO(): Promise<Metadata> {
  const config: SEOConfig = {
    title: 'VietStrix',
    description:
      'Welcome to VietStrix - We create modern web, app, and cloud solutions. Sharing knowledge, building products, and driving technology forward with passion and creativity.',
    url: '/',
    image: '/imgs/logoName.jpg',
    keywords: [
      'VietStrix',
      'home',
      'website',
      'app',
      'cloud',
      'web development',
      'phát triển web',
      'ứng dụng',
      'công nghệ',
      'technology',
      'innovation',
      'đổi mới',
      'startup',
      'khởi nghiệp',
      'solutions',
      'giải pháp',
    ],
    breadcrumbs: [{ name: 'Home', url: '/' }],
  };

  return createMetadata(config);
}
