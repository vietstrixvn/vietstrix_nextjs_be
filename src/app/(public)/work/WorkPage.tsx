import AnimationComponents from '@/components/animation/Animaton';
import EnhancedHeroBanner from '@/components/container/enhanced-hero-banner';
import FAQSection from '@/components/container/FaQ';
import IterativeProcess from '@/components/pages/public/work/iterative-process';
import TechnologyExpertise from '@/components/pages/public/work/TechnologyExpertise';

export default function WorkPage() {
  return (
    <div>
      <EnhancedHeroBanner
        title="How do we work?"
        heading="Bring Your Vision to Life"
        subheading="Big ideas? Bold goals? We turn concepts into powerful digital experiences that stand out."
      />

      <main>
        <IterativeProcess />
        <AnimationComponents />
        <TechnologyExpertise />
        <FAQSection />
      </main>
    </div>
  );
}
