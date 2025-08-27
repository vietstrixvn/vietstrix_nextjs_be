import { generateWorkHomeSEO } from '@/lib/seo/work.seo';
import WorkPage from './WorkPage';

export async function generateMetadata() {
  return await generateWorkHomeSEO();
}

export default function Page() {
  return <WorkPage />;
}
