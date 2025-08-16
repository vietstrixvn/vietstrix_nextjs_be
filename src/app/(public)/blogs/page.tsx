// app/blogs/page.tsx
import BlogListPageClient from './BlogListPage';
import { generateBlogHomeSEO } from '@/lib/seo/blog.seo';

export async function generateMetadata() {
  return await generateBlogHomeSEO();
}

export default function Page() {
  return <BlogListPageClient />;
}
