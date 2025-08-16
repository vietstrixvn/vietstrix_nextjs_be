'use client';

import { Container, CustomImage, Heading } from '@/components';
import CaseStudiesCarousel from '@/components/card/projectShowcase.card';
import EnhancedHeroBanner from '@/components/container/enhanced-hero-banner';
import ProcessTimeline from '@/components/container/ProcessTimeline';
import { ContactForm } from '@/components/form/ContactForm';
import { ServiceListData } from '@/components/pages/public/services/serviceList';
import { Separator } from '@radix-ui/react-separator';

export default function ServiceListPage() {
  return (
    <div>
      <EnhancedHeroBanner
        title="LET'S CONNECT"
        heading="Bring Your Vision to Life"
        subheading="Big ideas? Bold goals? We turn concepts into powerful digital experiences that stand out."
      />
      <Container>
        <div className="grid grid-cols-12 gap-8 min-h-screen">
          <div className="col-span-12 lg:col-span-4 p-6 lg:sticky lg:top-24 h-fit">
            <Heading
              name="VietStrix Service"
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

          {/* Load More Button */}
        </div>
        <Separator className="my-4" />

        <ProcessTimeline />
        <Separator className="my-4" />
        <CaseStudiesCarousel />
        <ContactForm />
      </Container>
    </div>
  );
}
