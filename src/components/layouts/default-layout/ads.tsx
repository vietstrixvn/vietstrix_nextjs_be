'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export function PromotionalBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissedAt = localStorage.getItem('promoBannerDismissedAt');
    if (!dismissedAt) {
      setIsVisible(true);
      return;
    }

    const dismissedDate = new Date(dismissedAt);
    const now = new Date();

    // check nếu > 1 ngày thì hiện lại
    const diffInHours =
      (now.getTime() - dismissedDate.getTime()) / (1000 * 60 * 60);
    if (diffInHours >= 24) {
      setIsVisible(true);
      localStorage.removeItem('promoBannerDismissedAt');
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('promoBannerDismissedAt', new Date().toISOString());
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-main-700 to-main-400 px-4 py-3 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="flex-1 text-center">
          <p className="text-sm font-medium text-white sm:text-base">
            <span className="font-semibold">Reach out early</span> to get the
            best deals and stay ahead with our latest updates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="bg-gray-800 text-white hover:bg-gray-700 transition-colors"
            asChild
          >
            <a
              href="https://substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1"
            >
              <ArrowRight className="h-3 w-3" />
              Let’s talk
            </a>
          </Button>

          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 text-gray-900 hover:bg-black/10"
            onClick={handleClose}
            aria-label="Close banner"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
