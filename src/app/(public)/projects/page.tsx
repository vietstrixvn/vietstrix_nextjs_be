// app/blogs/page.tsx
import { generateProjectHomeSEO } from '@/lib/seo/project.seo';
import ProjectListPageClient from './ProjectListPage';

export async function generateMetadata() {
  return await generateProjectHomeSEO();
}

export default function Page() {
  return <ProjectListPageClient />;
}
