import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { CustomImage } from '../design/image.component';
import SectionHeader from '../design/SectionHeader';

export default function OurStorySection() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Story content with accordion */}
          <div>
            <SectionHeader title="Our story" />

            <Accordion
              type="single"
              collapsible
              defaultValue="mission"
              className="space-y-4"
            >
              <AccordionItem value="mission" className="border-none">
                <AccordionTrigger className="text-left text-xl font-semibold text-gray-900 hover:no-underline py-4">
                  Mission
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-base leading-relaxed pt-2 pb-6">
                  We help CTOs and product teams{' '}
                  <span className="text-blue-500 font-medium">
                    keep up with change
                  </span>
                  ,{' '}
                  <span className="text-blue-500 font-medium">adapt fast</span>,
                  and{' '}
                  <span className="text-blue-500 font-medium">stay ahead</span>{' '}
                  of what’s next in tech.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="values" className="border-none">
                <AccordionTrigger className="text-left text-xl font-semibold text-gray-900 hover:no-underline py-4">
                  Values
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-base leading-relaxed pt-2 pb-6">
                  We’re all about{' '}
                  <span className="text-blue-500 font-medium">innovation</span>,{' '}
                  <span className="text-blue-500 font-medium">teamwork</span>,
                  and{' '}
                  <span className="text-blue-500 font-medium">
                    always learning
                  </span>
                  . Core to us: be transparent, execute with quality, and use
                  tech to help our clients grow for the long run.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="key-facts" className="border-none">
                <AccordionTrigger className="text-left text-xl font-semibold text-gray-900 hover:no-underline py-4">
                  Key Facts
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-base leading-relaxed pt-2 pb-6">
                  Strong focus on{' '}
                  <span className="text-blue-500 font-medium">
                    front-end (React/Next/Tailwind)
                  </span>
                  , with solid knowledge of{' '}
                  <span className="text-blue-500 font-medium">
                    back-end & databases
                  </span>{' '}
                  to build complete systems. Already shipped real-world products
                  and running personal projects under{' '}
                  <span className="text-blue-500 font-medium">Vieéttrix</span>.
                  Known for{' '}
                  <span className="text-blue-500 font-medium">
                    fast learning, adaptability
                  </span>
                  , and the drive to build products that actually matter.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Right side - Team image */}
          <div className="relative">
            <div className="relative aspect-image-main  overflow-hidden shadow-2xl">
              <CustomImage
                src="/imgs/logoName.jpg"
                alt="Our team working together - two professional women collaborating at a laptop"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
