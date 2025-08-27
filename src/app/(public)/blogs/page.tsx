// app/blogs/page.tsx
import { generateBlogHomeSEO } from '@/lib/seo/blog.seo';
import BlogListPageClient from './BlogListPage';

export async function generateMetadata() {
  return await generateBlogHomeSEO();
}

export default function Page() {
  return <BlogListPageClient />;
}
