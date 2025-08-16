import { generateServicePostSEO } from '@/lib/seo/service.seo';

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  return await generateServicePostSEO(slug);
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  return <BlogDetailPage slug={slug} />;
}
