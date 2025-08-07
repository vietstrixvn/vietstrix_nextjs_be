import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import SectionHeader from '@/components/design/SectionHeader';

const IntroSection = () => {
  return (
    <div className="text-black">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Main Content */}
          <div className="flex justify-between">
            <SectionHeader title="About VietStrix" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <motion.h1
                className="text-4xl md:text-5xl font-bold leading-tight tracking-tight"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                We Craft Dreams,
                <br />
                We Define Trends.
              </motion.h1>

              <motion.p
                className="text-gray-400 text-sm max-w-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                At <span className="font-bold">VietSrix</span> we are committed
                to revolutionizing the construction industry with innovative,
                sustainable, and cost-effective solutions. With a proven track
                record of delivering exceptional projects, we combine
                state-of-the-art technology, skilled expertise, and
                customer-centric approaches to bring visions to life.
              </motion.p>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Image Section */}
            <div className="relative mt-8 mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative overflow-hidden rounded-lg"
              >
                <img
                  src="https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80&w=2340&ixlib=rb-4.0.3"
                  alt="Close up eye through technology"
                  className="w-full h-[600px] object-cover object-center"
                />
                <motion.div
                  className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center p-6"
                  whileHover={{ opacity: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="border-l-2 text-white border-gray-400 pl-6 bg-black/30 bg-opacity-50 p-6">
                    <p className="text-lg font-light">
                      “Born and raised in Ho Chi Minh City, Vietnam, I started
                      this journey with a laptop, a vision, and a small but
                      ambitious team in the heart of Ho Chi Minh City. We’re not
                      just building websites—we’re crafting experiences, pushing
                      boundaries, and proving that a passionate team can make
                      waves in the digital world. To us, success isn’t just
                      about numbers; it’s about learning, growing, and creating
                      something truly meaningful.”
                    </p>
                    <p className="mt-4 font-semibold text-sm">
                      — HOANG PHAM ( LENF ), FOUNDER OF OUR TEAM
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Slider Dots */}
              <div className="flex space-x-2 mt-4">
                <motion.a
                  href="https://github.com/protam113"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-muted p-2 text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/hoangpham-strix/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-muted p-2 text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </motion.a>
                <motion.a
                  href="mailto:hoangpm2003.strix@gmail.com"
                  className="rounded-full bg-muted p-2 text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
