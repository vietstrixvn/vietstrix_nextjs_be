'use client';

import { CustomImage } from '@/components/design/image.component';
import { useAuthStore } from '@/store';
import { WelcomeBannerProps } from '@/types';
import { useEffect, useState } from 'react';

export default function AdminHero({
  message = 'Welcome to Vietstrix dashboard – the central place for all your data and tool management sites',
}: WelcomeBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const userInfo = useAuthStore((state) => state.userInfo);

  useEffect(() => {
    // Trigger animations after component mounts
    setIsVisible(true);
  }, []);
  return (
    <section className="card my-8 relative overflow-hidden bg-main-100 shadow-md">
      <div className="p-8 md:p-10 lg:p-12 flex flex-col md:flex-row items-start">
        <div className="space-y-3 md:w-1/2 mb-6 md:mb-0">
          <h2
            className={`text-black font-semibold text-2xl transform transition-all duration-700 ease-out ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-4 opacity-0'
            }`}
          >
            Hello {userInfo?.name}!
          </h2>
          <p
            className={`text-main text-sm md:text-base max-w-md transform transition-all duration-700 delay-100 ease-out ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-4 opacity-0'
            }`}
          >
            {message}
          </p>
        </div>

        <div className="hidden  md:w-2/5 md:absolute md:right-0 md:top-0 md:bottom-0 md:flex md:items-center">
          <CustomImage
            src="/icons/logo.svg"
            alt="Purple Wave"
            width={500}
            height={500}
            className="w-full h-auto md:h-full md:w-auto md:object-cover md:object-left"
          />
        </div>
      </div>
    </section>
  );
}
