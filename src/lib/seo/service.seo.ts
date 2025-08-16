// lib/seo/blog-service-seo.ts
import type { Metadata } from 'next';
import { createMetadata, SEOConfig } from '../createMetadata';
import { logError } from '@/utils';

// Types for Blog Service
export interface ServicePost {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  file?: string;
  created_at: string;
  updated_at: string;
  user: {
    username: string;
    role?: string;
  };
  category: {
    name: string;
  };
  tags?: Array<{
    name: string;
    slug: string;
    description?: string;
    postCount?: number;
  }>;
  seoKeywords?: string[];
}
function generateExcerptFromContent(content: string) {
  return content.slice(0, 150);
}

// 1. Blog Post Detail SEO
export async function generateServicePostSEO(slug: string): Promise<Metadata> {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
    const res = await fetch(`${baseURL}/v1/service/${slug}`);

    if (!res.ok) {
      throw new Error(`Service post not found: ${res.status}`);
    }

    const json = await res.json();
    const post: ServicePost = json.data; // <- chú ý đây, dữ liệu nằm trong data

    const config: SEOConfig = {
      title: `${post.title} | VietStrix Service`,
      description: post.excerpt || generateExcerptFromContent(post.content),
      image: post.file,
      url: `/blogs/${post.slug}`,
      author: post.user.username,
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      articleSection: post.category.name,
      keywords: [
        ...(post.tags?.map((t) => t.name) || []),
        ...(post.seoKeywords || []),
        post.category.name,
        'service',
        'hướng dẫn',
        'kinh nghiệm',
      ],
      tags: post.tags?.map((t) => t.name) || [],
      schemaType: 'Article',
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Service', url: '/services' },
        { name: post.title, url: `/services/${post.slug}` },
      ],
      faq: [], // bạn có thể extract từ content nếu cần
    };

    const metadata = createMetadata(config);

    return metadata;
  } catch (err) {
    logError('Blog post SEO generation failed:', err);
    return createMetadata({
      title: 'Article not found | VietStrix Service',
      description:
        'The article you are looking for does not exist or has been removed.',
    });
  }
}

// 5. Blog Homepage SEO
export async function generateServiceHomeSEO(): Promise<Metadata> {
  const config: SEOConfig = {
    title: 'VietStrix Service | Sharing Knowledge, Experience & Tech Trends ',
    description:
      'VietStrix Blog - A place to share high-quality articles on technology, programming, design, business, and life. ',
    url: '/blogs',
    keywords: [
      'VietStrix',
      'blog',
      'technology',
      'công nghệ',
      'programming',
      'lập trình',
      'design',
      'thiết kế',
      'business',
      'kinh doanh',
      'tutorial',
      'hướng dẫn',
    ],
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
    ],
  };

  return createMetadata(config);
}

function generateAutoBlogImage(post: ServicePost): string {
  // Generate dynamic OG image URL based on post data
  const params = new URLSearchParams({
    title: post.title.substring(0, 60),
    category: post.category.name,
    author: post.user.username,
  });

  return `/api/og-image?${params.toString()}`;
}

function extractHowToFromContent(content: string) {
  // Extract step-by-step instructions for HowTo schema
  const stepRegex = /(?:^|\n)(?:\d+\.|\*|-)\s*(.+?)(?=\n(?:\d+\.|\*|-)|$)/gm;
  const steps = [];
  let match;

  while ((match = stepRegex.exec(content)) !== null && steps.length < 10) {
    steps.push({
      '@type': 'HowToStep',
      text: match[1].trim(),
    });
  }

  if (steps.length >= 3) {
    return {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'Hướng dẫn thực hiện',
      step: steps,
    };
  }

  return null;
}
