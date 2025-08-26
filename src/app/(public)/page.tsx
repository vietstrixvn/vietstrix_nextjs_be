import { generateHomeSEO } from '@/lib/seo/home.seo';
import HomePage from './HomePage';

export async function generateMetadata() {
  return await generateHomeSEO();
}

export default function Page() {
  return <HomePage />;
}
