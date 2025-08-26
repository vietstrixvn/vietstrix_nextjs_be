import { generateContactHomeSEO } from '@/lib/seo/contact.seo';
import ContactPage from './ContactPage';

export async function generateMetadata() {
  return await generateContactHomeSEO();
}

export default function Page() {
  return <ContactPage />;
}
