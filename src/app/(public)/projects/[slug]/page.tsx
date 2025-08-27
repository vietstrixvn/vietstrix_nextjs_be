import { generateProjectPostSEO } from '@/lib/seo/project.seo';
import ProjectDetailPage from './ProjectDetailPage';

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  return await generateProjectPostSEO(slug);
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  return <ProjectDetailPage slug={slug} />;
}
