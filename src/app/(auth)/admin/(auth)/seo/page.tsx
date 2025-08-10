import { AdminContainer } from '@/components';
import { BackButton } from '@/components/button/back.button';
import { Heading } from '@/components/design/Heading';
import { SeoSettingsForm } from '@/components/pages/admin/seo/updateSeoForm';

const Page = () => {
  return (
    <AdminContainer>
      <BackButton href="/admin" />
      <Heading name="SEO Page" desc="Manage your seo website here" />

      <SeoSettingsForm />
    </AdminContainer>
  );
};

export default Page;
