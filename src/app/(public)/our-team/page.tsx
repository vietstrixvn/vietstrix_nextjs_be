'use client';

import { motion } from 'framer-motion';
import { SEO } from '@/components/SEO';
import Link from 'next/link';
import SectionHeader from '@/components/design/SectionHeader';
import ProcessTimeline from '@/components/container/ProcessTimeline';
import { Container, CustomImage } from '@/components';
import { StatsSection } from '@/components/design/StatsSection';
import IntroSection from '@/components/pages/public/introSection';
import { ContactForm } from '@/components/form/ContactForm';
import AgencyPortfolio from '@/components/pages/public/our-team/AgencyPortfolio';
import TechnologyExpertise from '@/components/pages/public/home/TechnologyExpertise';
import FAQSection from '@/components/container/FaQ';
import EnhancedHeroBanner from '@/components/container/enhanced-hero-banner';
import { Feedback } from '@/components/pages/public/our-team/feedback';

export default function Page() {
  return (
    <>
      <SEO
        title="Our Team"
        description="VietStrix is ​​a genZ team that designs and develops professional websites in Vietnam."
      />

      <div>
        <EnhancedHeroBanner
          title="Our Team"
          heading="Bring Your Vision to Life"
          subheading="Big ideas? Bold goals? We turn concepts into powerful digital experiences that stand out."
        />
        <IntroSection />
        <StatsSection />
        <AgencyPortfolio />
        <TechnologyExpertise />
        {/* Team Section */}
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mx-auto mb-12"
          >
            <SectionHeader title="Our Team" />
            <p className="text-gray-600">
              Our success is built on the dedication and expertise of our team.
              We work together to bring innovative ideas and exceptional
              craftsmanship to every project, ensuring the highest quality
              results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'Hoang Pham Minh',
                role: 'Project Manager',
                image: '/bg/av3.jpg',
                href: '/our-team/HoangPham',
              },
              {
                name: 'Tran Thanh Hoang',
                role: 'Back-end Developer',
                image: '/bg/av2.jpg',
                href: '/our-team/HoangPham',
              },
              {
                name: 'Nguyen Hong Phuc',
                role: 'Front-end Developer',
                image: '/bg/av1.jpg',
                href: '/our-team/HoangPham',
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white overflow-hidden shadow-md"
              >
                <Link href={member.href}>
                  <div className="relative">
                    <CustomImage
                      src={member.image || '/icons/logo.svg'}
                      alt={member.name}
                      width={300}
                      height={300}
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{member.name}</h3>
                    <p className="text-gray-600 text-sm">{member.role}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>

        <ProcessTimeline />

        <Feedback />
        {/* CTA Section */}
        <ContactForm />
        <FAQSection />
      </div>
    </>
  );
}
