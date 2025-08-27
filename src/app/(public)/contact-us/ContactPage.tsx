import EnhancedHeroBanner from '@/components/container/enhanced-hero-banner';
import { ContactForm } from '@/components/form/ContactForm';

export default function ContactPage() {
  return (
    <div>
      <EnhancedHeroBanner
        title="LET'S CONNECT"
        heading="Bring Your Vision to Life"
        subheading="Big ideas? Bold goals? We turn concepts into powerful digital experiences that stand out."
      />

      <div>
        <ContactForm />
      </div>
    </div>
  );
}
