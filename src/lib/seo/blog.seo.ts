// lib/seo/blog-service-seo.ts
import { logError } from '@/utils';
import type { Metadata } from 'next';
import { createMetadata, SEOConfig } from '../createMetadata';

// Types for Blog Service
export interface BlogPost {
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
export async function generateBlogPostSEO(slug: string): Promise<Metadata> {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
    const res = await fetch(`${baseURL}/v1/blog/${slug}`);

    if (!res.ok) {
      throw new Error(`Blog post not found: ${res.status}`);
    }

    const json = await res.json();
    const post: BlogPost = json.data; // <- chú ý đây, dữ liệu nằm trong data

    const howToSchema = extractHowToFromContent(post.content);

    const config: SEOConfig = {
      title: `${post.title} | VietStrix Blog`,
      description: post.excerpt || generateExcerptFromContent(post.content),
      image: post.file || generateAutoBlogImage(post),
      url: `/blogs/${post.slug}`,
      author: post.user.username,
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      articleSection: post.category.name,
      keywords: [
        ...(post.tags?.map((t) => t.name) || []),
        ...(post.seoKeywords || []),
        post.category.name,
        'blog',
        'hướng dẫn',
        'kinh nghiệm',
      ],
      tags: post.tags?.map((t) => t.name) || [],
      schemaType: howToSchema ? 'HowTo' : 'Article',
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blogs' },
        { name: post.title, url: `/blogs/${post.slug}` },
      ],
      faq: [],
      howTo: howToSchema,
    };

    const metadata = createMetadata(config);

    return metadata;
  } catch (err) {
    logError('Blog post SEO generation failed:', err);
    return createMetadata({
      title: 'Article not found | VietStrix Blog',
      description:
        'The article you are looking for does not exist or has been removed.',
    });
  }
}

// 5. Blog Homepage SEO
export async function generateBlogHomeSEO(): Promise<Metadata> {
  const config: SEOConfig = {
    title: 'VietStrix Blog | Sharing Knowledge, Experience & Tech Trends ',
    description:
      'VietStrix Blog - A place to share high-quality articles on technology, programming, design, business, and life.',
    url: '/blogs',
    image: '/imgs/webBlog.jpg',
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
      { name: 'Blog', url: '/blogs' },
    ],
  };

  return createMetadata(config);
}

function generateAutoBlogImage(post: BlogPost): string {
  // Generate dynamic OG image URL based on post data
  const params = new URLSearchParams({
    title: post.title.substring(0, 60),
    category: post.category.name,
    author: post.user.username,
  });

  return `/api/og-image?${params.toString()}`;
}

function extractHowToFromContent(content: string) {
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
