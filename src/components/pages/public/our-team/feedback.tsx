import Image from 'next/image';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/design/SectionHeader';
import { Container } from '@/components';

export const Feedback = () => {
  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mx-auto mb-12"
      >
        <SectionHeader title="Why Say Our Customers" />
        <p className="text-gray-600">
          Our clients are our priority. Discover what they have to say about
          their experience with us and how through our dedication and
          professionalism we can deliver results that exceed expectations.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            name: 'Danh Thuong L.',
            image: '/image/web.png',
            text: 'Working for my new home is absolutely amazing with Renovex. They have done great job with my home renovation. They have great communication skills.',
          },
          {
            name: 'Soranik',
            image: '/image/web.png',
            text: 'Our office renovation exceeded all expectations! The Renovex team transformed our outdated workspace into a modern, innovative space. They handled every challenge professionally and delivered on time.',
          },
          {
            name: 'Thomas G.',
            image: '/image/web.png',
            text: 'We hired them for our outdoor landscaping and pool construction project. Their attention to detail and commitment to quality was impressive. The end result exceeded our expectations and transformed our backyard.',
          },
        ].map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg p-6 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-2">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-[#013162] text-[#013162]"
                />
              ))}
            </div>
            <p className="text-gray-600 mb-4">{testimonial.text}</p>
            <div className="flex items-center gap-3">
              <Image
                src={testimonial.image || '/placeholder.svg'}
                alt={testimonial.name}
                width={60}
                height={60}
                className="w-12 h-12 rounded-full"
              />
              <span className="font-medium">{testimonial.name}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </Container>
  );
};
