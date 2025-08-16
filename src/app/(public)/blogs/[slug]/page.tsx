import { generateBlogPostSEO } from '@/lib/seo/blog.seo';
import BlogDetailPage from './BlogDetailPage';

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  return await generateBlogPostSEO(slug);
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  return <BlogDetailPage slug={slug} />;
}
