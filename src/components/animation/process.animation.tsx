'use client';

import { useState } from 'react';
import { Container } from '../container/container';

const steps = [
  {
    number: '01',
    title: 'Consult your idea',
    description:
      'Set the right direction with our web development consultants. We analyze your requirements, understand your business goals, and provide strategic guidance to ensure your project starts on the right foundation.',
  },
  {
    number: '02',
    title: 'Choose a technology',
    description:
      'Select the most suitable technology stack for your project requirements and goals. Our experts evaluate performance, scalability, and maintenance considerations to recommend the best technical approach.',
  },
  {
    number: '03',
    title: 'Design',
    description:
      'Create intuitive and engaging user interfaces that deliver exceptional user experiences. We focus on user-centered design principles, accessibility, and modern design trends to craft compelling digital experiences.',
  },
  {
    number: '04',
    title: 'Develop',
    description:
      'Build robust, scalable, and high-performance web applications using industry best practices. Our development process emphasizes clean code, thorough testing, and agile methodologies for optimal results.',
  },
  {
    number: '05',
    title: 'Reach the market',
    description:
      'Launch your product successfully with our comprehensive deployment and marketing support strategies. We ensure smooth go-to-market execution with performance monitoring and user feedback integration.',
  },
];

export default function WebDevelopmentProcess() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-16 px-4">
      <Container className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight ">
              Leverage our proven{' '}
              <span className="text-main">web development process</span>
            </h2>
          </div>
          <div className="flex items-center">
            <p className="text-gray-700 text-lg leading-relaxed">
              We&quot;ve delivered over 99 projects — we know what it takes to
              execute a seamless and optimized web-based software development
              process.
            </p>
          </div>
        </div>

        {/* Horizontal Accordion Steps */}
        <div className="flex h-96 gap-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`
                relative border border-gray-700 cursor-pointer overflow-hidden
                transition-all duration-300 ease-in-out
                ${activeStep === index ? 'border-main' : 'hover:border-main'}
              `}
              style={{
                width: activeStep === index ? '40%' : '15%',
                backgroundColor:
                  activeStep === index
                    ? 'rgba(59, 130, 246, 0.1)' // xanh dương nhẹ (blue-500 trong Tailwind)
                    : 'rgba(59, 130, 246, 0.05)', // nhạt hơn chút
              }}
              onMouseEnter={() => setActiveStep(index)}
            >
              {/* Content Container */}
              <div className="p-6 h-full flex flex-col justify-center">
                {/* Step Number */}
                <div className="text-5xl lg:text-6xl font-bold  mb-4">
                  {step.number}
                </div>

                {/* Step Title */}
                <h3 className="text-xl lg:text-2xl font-bold  mb-4">
                  {step.title}
                </h3>

                {/* Step Description - Only visible when expanded */}
                <div
                  className={`
                    transition-all duration-300 ease-in-out
                    ${
                      activeStep === index
                        ? 'opacity-100 transform translate-y-0 max-h-40'
                        : 'opacity-0 transform translate-y-4 max-h-0'
                    }
                  `}
                >
                  <p className=" leading-relaxed text-base lg:text-lg">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Background Gradient Overlay */}
              <div
                className={`
                  absolute inset-0 pointer-events-none transition-opacity duration-300 ease-in-out
                  ${activeStep === index ? 'opacity-20' : 'opacity-0'}
                `}
                style={{
                  background:
                    'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%)',
                }}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
