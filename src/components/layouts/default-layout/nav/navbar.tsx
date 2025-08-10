'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib';
import GetStartedButton from '@/components/animata/container/AnimatedTrailProps';
import NavService, { ServiceDropdownContent } from './service.nav';
import { NavBlog } from './blog.nav';
import { CustomImage } from '@/components/design/image.component';
import { navItems } from '@/lib';

const NavBar = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Navigation */}
      <div
        data-navbar
        className={`fixed z-50 w-full flex justify-center items-center min-h-[80px] ${
          isScrolling ? 'bg-transparent' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl w-full mx-auto py-2">
          <nav className="flex items-center justify-between gap-4 md:gap-8 max-w-screen-xl mx-auto">
            <div
              className={`flex rounded-sm items-center gap-6 h-[75px] ${
                isMoreOpen || isServiceOpen
                  ? 'bg-white'
                  : isScrolling
                    ? 'bg-white/40 backdrop-blur-2xl shadow-lg'
                    : 'bg-white'
              }`}
            >
              {/* Left section - Logo */}
              <Link href="/" className="flex items-center gap-2 pl-4">
                <div className="w-8 h-8 flex items-center justify-center">
                  <CustomImage
                    src="/icons/logo.svg"
                    alt="Logo"
                    width={30}
                    height={30}
                  />
                </div>
                <div className="flex flex-col font-semibold text-main">
                  <span className="text-xl leading-none font-semibold uppercase">
                    VIETSTRIX
                    {/* ® */}
                  </span>
                  <span className="text-xl leading-none font-semibold uppercase">
                    TEAM
                  </span>
                </div>
              </Link>
              <div className="hidden w-4 h-0.5 rotate-90 bg-gray-500"></div>

              {/* Center section - Navigation Links */}
              <div className="relative hidden md:flex w-full px-4 py-2 gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      px-3 py-1 text-sm font-medium transition-all duration-300 ease-in-out text-main
                      ${
                        pathname === item.href
                          ? 'bg-main text-white font-semibold scale-105 shadow-sm'
                          : 'hover:bg-main/50 hover:scale-105'
                      }
                    `}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="relative">
                  <NavService
                    onMouseEnter={() => setIsServiceOpen(true)}
                    onMouseLeave={() => setIsServiceOpen(false)}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 ml-auto">
              <button
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className={`hidden rounded-sm p-2 h-[75px] w-[100px] text-black hover:opacity-90 transition-opacity cursor-pointer z-50 md:flex items-center justify-center gap-2 ${
                  isMoreOpen || isServiceOpen
                    ? 'bg-white'
                    : isScrolling
                      ? 'bg-white/40 backdrop-blur-2xl shadow-lg'
                      : 'bg-white'
                }`}
                aria-label={isMoreOpen ? 'Close menu' : 'Open menu'}
              >
                <span className="text-sm font-semibold text-main">
                  {isMoreOpen ? 'CLOSE' : 'MORE'}
                </span>
                <div className="relative flex flex-col justify-center gap-1 w-6 h-6">
                  <div
                    className={`flex flex-col justify-center gap-1 absolute transition-opacity duration-300 ${
                      isMoreOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                  >
                    <span className="block w-6 h-0.5 bg-main"></span>
                    <span className="block w-4 h-0.5 bg-main"></span>
                  </div>
                  <X
                    className={`text-xl font-bold text-main absolute transition-opacity duration-300 ${
                      isMoreOpen ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </div>
              </button>

              {/* Right section - Contact Button */}
              <div className="hidden rounded-sm md:flex justify-center items-center gap-2">
                <GetStartedButton text="Get in Touch" url="/contact-us" />
              </div>
            </div>

            {/* Services Dropdown with Hover Area */}
            <div
              className="fixed left-0 top-0 w-full h-screen z-35 pointer-events-none"
              style={{ display: isServiceOpen ? 'block' : 'none' }}
            />
            <div
              className={cn(
                'fixed w-full max-w-7xl left-1/2 -translate-x-1/2 z-40 transition-all duration-400 ease-in-out',
                isServiceOpen
                  ? 'opacity-100 pointer-events-auto'
                  : 'opacity-0 pointer-events-none'
              )}
              style={{ top: '0px' }}
              onMouseEnter={() => setIsServiceOpen(true)}
              onMouseLeave={() => setIsServiceOpen(false)}
            >
              {/* Invisible bridge from navbar to dropdown */}
              <div className="h-[80px] w-full" />

              {/* Actual dropdown content */}
              <div className="h-[560px] bg-white border-t-2 border-main shadow-xl">
                <ServiceDropdownContent setIsOpen={setIsServiceOpen} />
              </div>
            </div>

            {/* More Dropdown */}
            <div
              className={cn(
                'fixed w-full max-w-7xl left-1/2 -translate-x-1/2 z-40 h-[560px] bg-white transition-all duration-400 ease-in-out border-t-2 border-main shadow-xl',
                isMoreOpen
                  ? 'opacity-100 pointer-events-auto'
                  : 'opacity-0 pointer-events-none'
              )}
              style={{
                top: '80px',
              }}
            >
              <NavBlog setIsOpen={setIsMoreOpen} />
            </div>

            {/* Mobile menu button */}
            <button
              className={`md:hidden h-[75px] w-[100px] flex items-center justify-center gap-2 ${
                isScrolling
                  ? 'bg-white/40 backdrop-blur-2xl shadow-lg'
                  : 'bg-white'
              }`}
              onClick={toggleMobileMenu}
            >
              <span className="text-sm font-semibold text-main">MENU</span>
              <div className="flex flex-col justify-center gap-1">
                <span className="w-6 h-0.5 bg-black"></span>
                <span className="w-4 h-0.5 bg-black"></span>
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-black/60 z-30 transition-opacity duration-400',
          isMoreOpen || isServiceOpen
            ? 'opacity-100'
            : 'opacity-0 pointer-events-none'
        )}
        onClick={() => {
          setIsMoreOpen(false);
          setIsServiceOpen(false);
        }}
      />

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 p-6 md:hidden">
          <div className="flex justify-between items-center mb-12">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center">
                <CustomImage
                  src="/icons/logo.svg"
                  alt="Logo"
                  width={30}
                  height={30}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs leading-none font-semibold uppercase">
                  VietStrix®
                </span>
                <span className="text-xs leading-none font-semibold uppercase">
                  Team
                </span>
              </div>
            </div>

            {/* Close button */}
            <button
              className="flex items-center text-sm font-medium"
              onClick={toggleMobileMenu}
            >
              CLOSE <X className="ml-1" size={18} />
            </button>
          </div>

          {/* Mobile navigation links */}
          <div className="flex flex-col space-y-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  py-2 px-4 text-sm font-medium w-full text-center
                  ${
                    pathname === item.href
                      ? 'bg-main text-white'
                      : 'hover:bg-gray-200'
                  }
                `}
                onClick={toggleMobileMenu}
              >
                {item.name}
              </Link>
            ))}
          </div>
          {/* Mobile contact button */}
          <div className="mt-12 flex justify-center items-center gap-2">
            <Link
              href="/contact-us"
              className="px-6 py-3 bg-main text-white text-sm font-semibold uppercase tracking-wider hover:bg-main/90 transition-colors duration-300 text-center rounded"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
