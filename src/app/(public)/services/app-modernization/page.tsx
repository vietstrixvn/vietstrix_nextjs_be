// app/blogs/page.tsx
import { generateWebServiceHomeSEO } from '@/lib/seo/service/web.service.seo';
import WebDevPage from '../web-development/WebDevalopment';

export async function generateMetadata() {
  return await generateWebServiceHomeSEO();
}

export default function Page() {
  return <WebDevPage />;
}
