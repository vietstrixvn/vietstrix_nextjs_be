'use client';

import { useState, useRef } from 'react';
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Label, Input, Textarea } from '@/components';
import { Card, CardContent, CardHeader } from '@/components';
import SectionHeader from '../design/SectionHeader';
import { Facebook, Github, Linkedin, Mail } from 'lucide-react';
import { Container } from '../container/container';
import { Monitor } from '../design/item/monitor';
import { useForm } from 'react-hook-form';
import { contactSentFormSchema } from '@/utils';
import { CreateContactItem } from '@/types';
import { useCreateContact } from '@/hooks';
import { CustomImage } from '../design/image.component';

export function Contact() {
  const formRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof contactSentFormSchema>>({
    resolver: zodResolver(contactSentFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone_number: '',
      message: '',
    },
  });

  const { mutate: createContact } = useCreateContact();

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });

  const handleSentContact = (values: z.infer<typeof contactSentFormSchema>) => {
    setIsLoading(true);

    const contactData: CreateContactItem = {
      name: values.name,
      email: values.email,
      phone_number: values.phone_number,
      message: values.message,
    };

    createContact(contactData, {
      onSuccess: () => {
        form.reset({
          name: '',
          email: '',
          phone_number: '',
          message: '',
        });
        setIsLoading(false);

        form.clearErrors();
      },
      onError: (error: any) => {
        form.setError('root', {
          type: 'manual',
          message: error.message || 'Error',
        });
        setIsLoading(false);
      },
    });
  };
  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[600px] min-h-[600px]"
    >
      <AnimatePresence>
        {!isInView && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <Monitor />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isInView && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: -100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <Card className="w-full">
              <CardHeader className="space-y-4">
                <div className="flex items-center gap-4">
                  <CustomImage
                    src="/icons/logo-cricle.svg?height=80&width=80"
                    alt="Logo"
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                  <h2 className="text-xl font-semibold">VietStrix</h2>
                </div>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={form.handleSubmit(handleSentContact)}
                  className="space-y-6"
                  ref={formRef}
                >
                  {(['name', 'email', 'phone_number', 'message'] as const).map(
                    (field, index) => (
                      <motion.div
                        key={field}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="space-y-2"
                      >
                        <Label htmlFor={field}>
                          {field.replace('_', ' ').toUpperCase()} *
                        </Label>
                        {field === 'message' ? (
                          <Textarea
                            id="message"
                            placeholder="Message"
                            {...form.register('message')}
                            required
                            className="min-h-[100px] border-muted-foreground/25 transition-all duration-200 focus:scale-[1.02]"
                          />
                        ) : (
                          <Input
                            id={field}
                            type={field === 'email' ? 'email' : 'text'}
                            {...form.register(field)}
                            required
                            className="border-muted-foreground/25 transition-all duration-200 focus:scale-[1.02]"
                          />
                        )}
                      </motion.div>
                    )
                  )}

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="flex items-center justify-between"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="bg-[#0A2756] hover:bg-[#0A2756]/90"
                      >
                        {isLoading ? 'Sending...' : 'SEND A MESSAGE'}
                      </Button>
                    </motion.div>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ContactForm() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Animation for letter-by-letter text reveal
  const headingText = "Need Any help? We're Here For You.";
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.03,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 md:py-24 relative overflow-hidden"
    >
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <Container>
        <motion.div
          className="flex flex-col lg:flex-row gap-12 lg:gap-16 relative"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Left side - Business information */}
          <div className="lg:w-1/2 space-y-8">
            <motion.div
              className="flex items-center text-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <SectionHeader title="Contact Us" />
            </motion.div>

            <h2 className="text-3xl md:text-5xl lg:text-4xl font-bold text-slate-800 leading-tight">
              {headingText.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={letterVariants}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  className="inline-block"
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </h2>

            <motion.div
              className="space-y-6 text-slate-700"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="space-y-1">
                <h3 className="font-semibold uppercase text-sm tracking-wider">
                  Location:
                </h3>
                <p className="text-lg">Ho Chi Minh City, VietNam</p>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-slate-600">Email:</p>
                  <a
                    href="mailto:vietstrix@gmail.com"
                    className="text-primary text-lg hover-underline-animation"
                  >
                    vietstrix@gmail.com
                  </a>
                </div>

                <div>
                  <p className="text-slate-600">Press Inquiries:</p>
                  <a
                    href="mailto:vietstrix+sales@gmail.com"
                    className="text-primary text-lg hover-underline-animation"
                  >
                    hoangpm2003.strix@gmail.com
                  </a>
                </div>

                <div>
                  <p className="text-slate-600">Phone Number:</p>
                  <a
                    href="tel:+84377783437"
                    className="text-primary text-lg hover-underline-animation"
                  >
                    +84 377 783 437
                  </a>
                </div>
                <div>
                  <p className="text-slate-600">Social Medias</p>
                  <div className="flex space-x-2 mt-4">
                    <motion.a
                      href="https://www.facebook.com/vietstrix"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-muted p-2 text-muted-foreground hover:text-foreground transition-colors"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Facebook className="h-5 w-5" />
                      <span className="sr-only">Facebook</span>
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
                      href="mailto:vietstrix@gmail.com"
                      className="rounded-full bg-muted p-2 text-muted-foreground hover:text-foreground transition-colors"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Mail className="h-5 w-5" />
                      <span className="sr-only">Email</span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right side - Contact form */}

          <Contact />
        </motion.div>
      </Container>
    </section>
  );
}
