import { generateOurTeamHomeSEO } from '@/lib/seo/about.seo';
import AboutPage from './AboutPage';

export async function generateMetadata() {
  return await generateOurTeamHomeSEO();
}

export default function Page() {
  return <AboutPage />;
}
