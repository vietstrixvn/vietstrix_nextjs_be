'use client';

import WebDevelopmentProcess from '@/components/animation/process.animation';
import { Container } from '@/components';
import ProcessTimeline from '@/components/container/ProcessTimeline';
import { CustomImage } from '@/components/design/image.component';
import SectionHeader from '@/components/design/SectionHeader';
import SectionCTO from '@/components/sections/cto.section';
import { SEO } from '@/components/SEO';
import HeroSection from '@/components/wrappers/hero-section';
import { Separator } from '@radix-ui/react-separator';

export default function Page() {
  return (
    <>
      <SEO
        title="Services"
        description="Reach out to VietStrix, a Gen Z team passionate about web design and development. Let's build something amazing together!"
      />

      <div>
        <HeroSection
          title="WEB DEVELOPMENT SERVICES"
          heading="Deliver web solutions with a team CTOs praise"
          subheading=" Complete the project on time with a web development team that
              mastered technologies like React, Node.js, TypeScript, PHP, and
              AWS. Kickoff work on your web app in just 2–4 weeks."
        />
        <SectionCTO />
        <WebDevelopmentProcess />

        <Container>
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center transform transition-all duration-1000 opacity-100 translate-y-0">
              <div className="mb-12 lg:mb-0">
                <SectionHeader title="Stay Locked In, We’ll Handle the Grind" />
                <p className="text-lg text-gray-600 leading-relaxed">
                  Wanna launch a new app? Refactor the messy legacy code?
                  Rebuild your product to scale like a beast? We gotchu. Our
                  crew? Mid to senior devs, a project manager who actually
                  replies to Slack, and backup talent that ships like pros — 5★
                  quality, lightning-fast.
                </p>
              </div>
              <div className="relative group">
                <div className="relative rounded-lg overflow-hidden transform transition-transform duration-300 group-hover:scale-105">
                  <CustomImage
                    src="/ava2.png"
                    alt="Team meeting"
                    width={500}
                    height={500}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent mix-blend-overlay" />
                </div>
              </div>
            </div>
          </div>
          <ProcessTimeline />
          <Separator className="my-4" />

          {/* <TestimonialsWithGSAP /> */}
        </Container>
      </div>
    </>
  );
}
