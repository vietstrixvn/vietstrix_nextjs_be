import { Container, CustomImage, Heading } from '@/components';
import ScrollProgressBar from '@/components/container/scroll-progress-bar';
import { StatsSection } from '@/components/design/StatsSection';
import { ContactForm } from '@/components/form/ContactForm';
import { Hero } from '@/components/layouts/default-layout/hero';
import { SuccessStories } from '@/components/pages/public/home/our-project';
import { BlogSection } from '@/components/pages/public/home/slide-carousel';
import TextMarquee from '@/components/pages/public/home/TitleMarquee';
import WhySection from '@/components/pages/public/home/why.section';
import IntroSection from '@/components/pages/public/introSection';
import { ServiceListData } from '@/components/pages/public/services/serviceList';
import { WellnessPage } from '@/components/pages/public/WellnessPage';
import { Separator } from '@/components/ui/separator';

export default function HomePage() {
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
          <Container className="grid grid-cols-12 gap-8 min-h-screen">
            <div className="col-span-12 lg:col-span-4 p-6 lg:sticky lg:top-24 h-fit">
              <Heading
                name="Service"
                desc="A young, passionate, and creative team specializing in building optimized web, app, and cloud solutions — turning ideas into real products that are fast, stunning, and technically solid."
              />

              <CustomImage
                src="/imgs/introduce.jpg"
                alt="CODE"
                width={500} // hoặc tuỳ kích thước
                height={300}
                className="object-contain"
              />
            </div>
            <div className="col-span-12 lg:col-span-8">
              <ServiceListData />
            </div>
          </Container>
        </section>

        {/* Services Section */}
        <section id="services">
          <SuccessStories />
        </section>

        <Separator className="my-4" />
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
