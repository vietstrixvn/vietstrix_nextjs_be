import ScrollProgressBar from '@/components/container/scroll-progress-bar';
import { StatsSection } from '@/components/design/StatsSection';
import { ContactForm } from '@/components/form/ContactForm';
import { Hero } from '@/components/layouts/default-layout/hero';
import PortfolioShowcase from '@/components/layouts/default-layout/home/caseStudies';
import { BlogSection } from '@/components/layouts/default-layout/home/slide-carousel';
import TextMarquee from '@/components/layouts/default-layout/home/TitleMarquee';
import { SuccessStories } from '@/components/pages/public/home/our-project';
import WhySection from '@/components/pages/public/home/why.section';
import IntroSection from '@/components/pages/public/introSection';
import { WellnessPage } from '@/components/pages/public/WellnessPage';
import { WhatWeDo } from '@/components/sections/whatwedo.section';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  const sections = [
    { id: 'about', label: 'Who we are?', color: '#013162' },
    { id: 'information', label: 'What You Should Know', color: '#6b7280' },
    { id: 'services', label: 'What we do.', color: '#6b7280' },
    { id: 'why', label: 'Why Choose Me?', color: '#6b7280' },
    { id: 'contact', label: 'Let’s Connect', color: '#6b7280' },
  ];
  return (
    <main>
      <Hero />
      <div>
        {/* Introduce Team */}
        <section id="about" className="min-h-screen">
          <IntroSection />
          <StatsSection />
        </section>

        {/* Projects Sections */}
        <section id="information">
          <WellnessPage />
        </section>

        {/* Services Section */}
        <section id="services">
          <SuccessStories />
        </section>

        <Separator className="my-4" />
        {/* <WhatWeDo /> */}
        {/* Wgy choose Us */}
        <section id="why" className="min-h-screen">
          <WhySection />
        </section>
        <Separator className="my-4" />

        {/* Contact */}
        <section id="contact">
          <TextMarquee />
          <ContactForm />
        </section>
      </div>
      <ScrollProgressBar sections={sections} />
      <section id="hidden-section">
        <BlogSection />
      </section>
    </main>
  );
}
