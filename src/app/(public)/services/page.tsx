// app/blogs/page.tsx
import { generateServiceHomeSEO } from '@/lib/seo/service/service.seo';
import ServiceListPage from './ServiceListPage';

export async function generateMetadata() {
  return await generateServiceHomeSEO();
}

export default function Page() {
  return <ServiceListPage />;
}
