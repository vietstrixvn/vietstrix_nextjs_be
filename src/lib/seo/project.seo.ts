import { logError } from '@/utils';
import type { Metadata } from 'next';
import { createMetadata, SEOConfig } from '../createMetadata';

export interface ProjectPost {
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

export async function generateProjectPostSEO(slug: string): Promise<Metadata> {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
    const res = await fetch(`${baseURL}/v1/project/${slug}`);

    if (!res.ok) {
      throw new Error(`Project post not found: ${res.status}`);
    }

    const json = await res.json();
    const post: ProjectPost = json.data; // <- chú ý đây, dữ liệu nằm trong data

    const config: SEOConfig = {
      title: `${post.title} | VietStrix Project`,
      description: post.excerpt || generateExcerptFromContent(post.content),
      image: post.file,
      url: `/project/${post.slug}`,
      author: post.user.username,
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      keywords: [
        ...(post.tags?.map((t) => t.name) || []),
        ...(post.seoKeywords || []),
        'blog',
        'hướng dẫn',
        'kinh nghiệm',
      ],
      tags: post.tags?.map((t) => t.name) || [],
      schemaType: 'Article',
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Project', url: '/projects' },
        { name: post.title, url: `/projects/${post.slug}` },
      ],
      faq: [], // bạn có thể extract từ content nếu cần
    };

    const metadata = createMetadata(config);

    return metadata;
  } catch (err) {
    logError('Project SEO generation failed:', err);
    return createMetadata({
      title: 'Project not found | VietStrix',
      description:
        'The project you are looking for does not exist or has been removed.',
    });
  }
}

// 5. Project Homepage SEO
export async function generateProjectHomeSEO(): Promise<Metadata> {
  const config: SEOConfig = {
    title: 'VietStrix Projects | Showcase & Case Studies',
    description:
      'Discover VietStrix projects: tech products, case studies, and creative ideas in programming and design.',
    url: '/projects',
    keywords: [
      'VietStrix',
      'projects',
      'dự án',
      'case study',
      'portfolio',
      'công nghệ',
      'technology',
      'lập trình',
      'programming',
      'thiết kế',
      'design',
      'ứng dụng',
      'application',
      'startup',
      'innovation',
      'đổi mới sáng tạo',
    ],
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Projects', url: '/projects' },
    ],
  };

  return createMetadata(config);
}
