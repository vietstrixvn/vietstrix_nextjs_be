'use client';

import { Card } from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Check, ChevronDown, Cookie, Lock, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

type ConsentData = {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  consentDate?: string;
  consentId?: string;
  status?: 'approved' | 'denied' | 'withdrawn' | 'none';
};

export default function CookieBanner() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [activeTab, setActiveTab] = useState('consent');
  const [showBanner, setShowBanner] = useState(false);

  const [prefs, setPrefs] = useState<ConsentData>({
    essential: true,
    analytics: false,
    marketing: false,
    status: 'none',
  });

  // Check existing consent on component mount
  useEffect(() => {
    const checkExistingConsent = () => {
      const cookies = document.cookie.split(';');
      const consentCookie = cookies.find((cookie) =>
        cookie.trim().startsWith('cookie-consent=')
      );

      if (consentCookie) {
        try {
          const consentValue = decodeURIComponent(consentCookie.split('=')[1]);
          const consentData: ConsentData = JSON.parse(consentValue);
          setPrefs(consentData);

          // If user has made any decision (approved or denied), show popover
          if (
            consentData?.status === 'approved' ||
            consentData?.status === 'denied'
          ) {
            setShowBanner(false);
          } else {
            setShowBanner(true);
          }
        } catch (error) {
          console.error('Error parsing consent cookie:', error);
          // If cookie is corrupted, treat as no consent
          setShowBanner(true);
        }
      } else {
        // No consent cookie found, show banner
        setShowBanner(true);
      }
    };

    checkExistingConsent();
  }, []);

  const saveConsent = (data: ConsentData) => {
    const newConsent: ConsentData = {
      ...data,
      consentDate: new Date().toISOString(),
      consentId: crypto.randomUUID(),
    };

    document.cookie = `cookie-consent=${encodeURIComponent(
      JSON.stringify(newConsent)
    )}; path=/; max-age=${60 * 60 * 24 * 365}`;

    setPrefs(newConsent);

    // After saving consent, hide banner and show popover
    setShowBanner(false);
  };

  const handleDeny = () => {
    const deniedConsent: ConsentData = {
      essential: true,
      analytics: false,
      marketing: false,
      status: 'denied',
    };
    saveConsent(deniedConsent);
  };

  const handleAllowAll = () => {
    const approvedConsent: ConsentData = {
      essential: true,
      analytics: true,
      marketing: true,
      status: 'approved',
    };
    saveConsent(approvedConsent);
  };

  const removeConsent = () => {
    document.cookie = `cookie-consent=null; path=/; max-age=${60 * 60 * 24 * 365}`;
    setPrefs({
      essential: true,
      analytics: false,
      marketing: false,
      status: 'none',
      consentDate: undefined,
      consentId: undefined,
    });

    // After removing consent, show banner again
    setShowBanner(false);
  };

  const handleAcceptFromPopover = () => {
    const approvedConsent: ConsentData = {
      essential: true,
      analytics: true,
      marketing: true,
      status: 'approved',
    };
    saveConsent(approvedConsent);
    setIsPopoverOpen(false);
  };

  return (
    <>
      {/* Banner Card - shown when no consent given yet */}
      {showBanner && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
          <Card className="bg-main text-white max-w-2xl w-full rounded-xl overflow-hidden">
            {/* Header with tabs and logo */}
            <div className="flex items-center justify-between p-6 pb-0">
              <div className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('consent')}
                  className={`pb-4 border-b-2 transition-colors ${
                    activeTab === 'consent'
                      ? 'border-orange-400 text-orange-400'
                      : 'border-transparent text-gray-300 hover:text-white'
                  }`}
                >
                  Consent
                </button>
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-4 border-b-2 transition-colors ${
                    activeTab === 'details'
                      ? 'border-orange-400 text-orange-400'
                      : 'border-transparent text-gray-300 hover:text-white'
                  }`}
                >
                  Details
                </button>
                <button
                  onClick={() => setActiveTab('about')}
                  className={`pb-4 border-b-2 transition-colors ${
                    activeTab === 'about'
                      ? 'border-orange-400 text-orange-400'
                      : 'border-transparent text-gray-300 hover:text-white'
                  }`}
                >
                  About
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {activeTab === 'consent' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">
                    This website uses cookies
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    We use cookies to personalise content and ads, to provide
                    social media features and to analyse our traffic. We also
                    share information about your use of our site with our social
                    media, advertising and analytics partners who may combine it
                    with other information that you've provided to them or that
                    they've collected from your use of their services. Find out
                    more in our{' '}
                    <span className="text-orange-400 underline cursor-pointer">
                      Privacy Policy
                    </span>
                    .
                  </p>
                </div>
              )}

              {activeTab === 'details' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Cookie Details</h2>
                  <p className="text-gray-300 leading-relaxed">
                    Here you can find detailed information about the cookies we
                    use, their purpose, and how long they are stored on your
                    device.
                  </p>
                </div>
              )}

              {activeTab === 'about' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">About Cookies</h2>
                  <p className="text-gray-300 leading-relaxed">
                    Cookies are small text files that are stored on your
                    computer or mobile device when you visit a website.
                  </p>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="p-6 pt-0">
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  onClick={handleDeny}
                  className="flex-1 bg-gray-600 hover:bg-gray-500 text-white border-0"
                >
                  Deny
                </Button>

                <Button
                  onClick={handleAllowAll}
                  className="flex-1 bg-orange-400 hover:bg-orange-500 text-gray-900 font-medium"
                >
                  Allow all
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Popover - shown when user has made a decision (approved or denied) */}
      <div className="fixed bottom-16 left-8">
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              size="icon"
              className="h-12 w-12 rounded-full bg-main hover:bg-main-700 text-white shadow-lg"
            >
              <Cookie className="h-12 w-16" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-[420px] p-0 bg-main rounded-xl border-gray-600 text-white"
            side="top"
            align="start"
            sideOffset={8}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Cookie settings</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-gray-300 hover:text-white hover:bg-gray-600"
                  onClick={() => setIsPopoverOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <Separator className="mt-2 mb-2" />

              {/* Current State */}
              {prefs && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-3 text-gray-200">
                    Your current state ({prefs.status ?? 'none'})
                  </h3>

                  <div className="space-y-2">
                    {/* Essential */}
                    <div className="flex items-center gap-2 text-sm">
                      <Lock className="h-4 w-4 text-white" />
                      <span>Necessary</span>
                    </div>

                    {/* Analytics / Preferences */}
                    <div className="flex items-center gap-2 text-sm">
                      {prefs.analytics ? (
                        <Check className="h-4 w-4 text-green-400" />
                      ) : (
                        <X className="h-4 w-4 text-red-400" />
                      )}
                      <span>Analytics</span>
                    </div>

                    {/* Statistics */}
                    <div className="flex items-center gap-2 text-sm">
                      {prefs.analytics ? (
                        <Check className="h-4 w-4 text-green-400" />
                      ) : (
                        <X className="h-4 w-4 text-red-400" />
                      )}
                      <span>Statistics</span>
                    </div>

                    {/* Marketing */}
                    <div className="flex items-center gap-2 text-sm">
                      {prefs.marketing ? (
                        <Check className="h-4 w-4 text-green-400" />
                      ) : (
                        <X className="h-4 w-4 text-red-400" />
                      )}
                      <span>Marketing</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Show Details */}
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-orange-400 hover:text-orange-300 hover:bg-gray-600 p-0 h-auto font-normal mb-6"
                onClick={() => setShowDetails(!showDetails)}
              >
                <span>{showDetails ? 'Hide details' : 'Show details'}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${showDetails ? 'rotate-180' : ''}`}
                />
              </Button>

              {showDetails && (
                <div className="bg-gray-800 p-4 rounded-lg text-sm mb-6 space-y-2">
                  <p>
                    <span className="font-medium text-gray-300">
                      Consent date:
                    </span>{' '}
                    {prefs.consentDate
                      ? new Date(prefs.consentDate).toLocaleString('en-GB', {
                          dateStyle: 'medium',
                          timeStyle: 'long',
                        })
                      : 'N/A'}
                  </p>
                  <p>
                    <span className="font-medium text-gray-300">
                      Consent ID:
                    </span>{' '}
                    {prefs.consentId || 'N/A'}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  className="flex-1 bg-white hover:bg-red-700 text-black"
                  onClick={() => {
                    removeConsent();
                    setIsPopoverOpen(false);
                  }}
                >
                  Withdraw Consent
                </Button>

                <Button
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={handleAcceptFromPopover}
                >
                  Accept cookies
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
