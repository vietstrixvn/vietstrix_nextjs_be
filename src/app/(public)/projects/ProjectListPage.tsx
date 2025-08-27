'use client';

import FAQSection from '@/components/container/FaQ';
import AnimatedHeading from '@/components/design/animated-heading';
import RevealOnView from '@/components/design/reveal-on-view';
import { ContactForm } from '@/components/form/ContactForm';
import TextMarquee from '@/components/pages/public/home/TitleMarquee';
import { ProjectListData } from '@/components/pages/public/project/projectList';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const ProjectListPageClient = () => {
  return (
    <div>
      {/* HERO: full-viewport row. Left is sticky; right scrolls internally. */}
      <section className="px-4 pt-4 pb-16 lg:pb-4 ">
        <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-[420px_1fr]">
          {/* LEFT: sticky and full height, no cut off */}
          <aside className="lg:sticky lg:top-4 lg:h-[calc(100svh-2rem)] ">
            <RevealOnView
              as="div"
              intensity="hero"
              className="relative flex h-full flex-col justify-center items-center overflow-hidden p-6 sm:p-8"
              staggerChildren
            >
              {/* Texture background */}

              <div>
                {/* Wordmark */}
                <div className="mb-8 flex items-center gap-2">
                  <div className="text-2xl font-extrabold tracking-tight">
                    Vietstrix
                  </div>
                  <div
                    className="h-2 w-2 rounded-full bg-white/60"
                    aria-hidden="true"
                  />
                </div>

                {/* Headline with intro blur effect */}
                <AnimatedHeading
                  className="text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl"
                  lines={['I design products', 'that people love']}
                />

                <p className="mt-4 max-w-[42ch] text-lg text-white/70">
                  Brandon is a product designer based in New York. He helps
                  early‑stage startups ship beautiful, usable software fast.
                </p>

                {/* CTAs */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button asChild size="lg" className="rounded-full">
                    <Link href="/contact-us">
                      Contact Us
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                {/* Trusted by */}
                <div className="mt-10">
                  <p className="mb-3 text-xs font-semibold tracking-widest text-black">
                    COMPANIES WE&apos;VE WORKED WITH
                  </p>
                  <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-2xl font-bold text-main sm:grid-cols-3">
                    <li>Space Y</li>
                    <li>Melta</li>
                    <li>ClosedAI</li>
                    <li>Booble</li>
                    <li>Lentflix</li>
                    <li>Xwitter</li>
                  </ul>
                </div>
              </div>
            </RevealOnView>
          </aside>

          {/* RIGHT: simplified, no internal card or horizontal carousel */}

          <ProjectListData />
        </div>
      </section>
      <TextMarquee />
      <ContactForm />
      <FAQSection />
    </div>
  );
};

export default ProjectListPageClient;
