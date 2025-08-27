'use client';

import { ErrorLoading } from '@/components/loading/error';
import { LoadingSpin } from '@/components/loading/loading';
import { CategoryList } from '@/lib';
import { cn } from '@/lib/utils';
import { NavBlogProps } from '@/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MouseEventHandler, useMemo } from 'react';
import { ServiceListNav } from './serviceList.nav';

export const ServiceDropdownContent = ({ setIsOpen }: NavBlogProps) => {
  const pathname = usePathname();

  const servicesItems = [
    { name: 'Web development', path: '/services/web-development' },
    { name: 'Product design', path: '/services/2' },
    { name: 'App modernization', path: '/services/2' },
  ];

  const params = useMemo(
    () => ({
      page_size: 4,
      type: 'services',
    }),
    []
  );

  const { categories, isLoading, isError } = CategoryList(1, params, 0);

  return (
    <div className="flex h-full w-full">
      {/* Services Column */}
      <div className="w-1/3 flex flex-col justify-start px-10 py-16">
        <Link
          href="/services"
          className="flex items-center text-lg mb-6 uppercase tracking-wider group"
        >
          <div className="w-3 h-8 bg-red-300 transform origin-bottom-left"></div>
          <p className="ml-2 text-gray-400 hover:text-main hover:underline font-bold">
            ALL SERVICES
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-main transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></span>
          </p>
        </Link>

        <div className="flex items-center text-sm mb-6 uppercase tracking-wider">
          <div className="w-3 h-8 bg-indigo-300 transform origin-bottom-left"></div>
          <span className="ml-2 text-gray-400 font-bold">
            SOFTWARE DELIVERY
          </span>
        </div>

        <nav className="space-y-2">
          {servicesItems.map(({ name, path }, index) => (
            <div key={name} className="space-y-2">
              <div className="flex items-center gap-8">
                <span className="text-gray-400 text-lg font-light w-8">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <Link
                  href={path}
                  className={cn(
                    'text-xl font-light text-gray-600 transition-all duration-300 hover:text-black relative group',
                    pathname === path ? 'font-medium text-black' : ''
                  )}
                  onClick={() => setIsOpen && setIsOpen(false)}
                >
                  {name}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-main transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></span>
                </Link>
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Other Services Column */}
      <div className="w-2/3 flex flex-col justify-start px-10 py-16">
        <div className="flex items-center text-sm mb-6 uppercase tracking-wider">
          <div className="w-3 h-8 bg-green-300 transform origin-bottom-left"></div>
          <span className="ml-2 text-gray-400 font-bold">OTHER SERVICES</span>
        </div>

        {isLoading && <LoadingSpin />}
        {isError && <ErrorLoading />}

        {!isLoading && !isError && categories?.length > 0 && (
          <nav className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
            {categories.map(({ title, id }) => (
              <div key={id}>
                <div className="flex items-center gap-2 text-base">
                  <span className="text-black font-bold uppercase">
                    {title}
                  </span>
                </div>
                <ServiceListNav category={id} />
              </div>
            ))}
          </nav>
        )}
      </div>

      {/* Featured Project */}
    </div>
  );
};

type NavServiceProps = {
  onMouseEnter?: MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: MouseEventHandler<HTMLButtonElement>;
};

const NavService = ({ onMouseEnter, onMouseLeave }: NavServiceProps) => {
  const pathname = usePathname();

  return (
    <button
      className={cn(
        `px-3 py-1 text-sm font-medium transition-all duration-300 ease-in-out text-main`,
        pathname === '/services'
          ? 'bg-main text-white font-semibold scale-105 shadow-sm'
          : 'hover:bg-main/50 hover:scale-105'
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      SERVICES
    </button>
  );
};

export default NavService;
