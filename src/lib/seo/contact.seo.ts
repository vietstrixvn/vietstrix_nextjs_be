// lib/seo/contact-service-seo.ts
import type { Metadata } from 'next';
import { createMetadata, SEOConfig } from '../createMetadata';

export async function generateContactHomeSEO(): Promise<Metadata> {
  const config: SEOConfig = {
    title: 'VietStrix Contact | Get in Touch with Us',
    description:
      'Reach out to VietStrix - We are here to discuss your ideas, answer your questions, and explore opportunities for collaboration and growth.',
    url: '/contact',
    image: '/imgs/logoName.jpg',
    keywords: [
      'VietStrix',
      'contact',
      'liên hệ',
      'get in touch',
      'kết nối',
      'support',
      'hỗ trợ',
      'collaboration',
      'hợp tác',
      'partnership',
      'đối tác',
      'project',
      'dự án',
      'work with us',
      'làm việc cùng chúng tôi',
    ],
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Contact', url: '/contact-us' },
    ],
  };

  return createMetadata(config);
}
