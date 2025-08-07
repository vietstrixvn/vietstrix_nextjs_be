'use client';

import { IntroduceCard } from '@/components/card/introduce.card';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MouseEventHandler } from 'react';
import { cn } from '@/lib/utils';
import { NavBlogProps } from '@/types';
import { ServiceList } from '@/lib/responses/serviceLib';
import { LoadingSpin } from '@/components/loading/loading';
import { ErrorLoading } from '@/components/loading/error';
import { NoResultsFound } from '@/components/design/NoResultsFound';

export const ServiceDropdownContent = ({ setIsOpen }: NavBlogProps) => {
  const pathname = usePathname();

  const servicesItems = [
    { name: 'Web development', path: '/services/web-development' },
    { name: 'Product design', path: '/services/2' },
    { name: 'App modernization', path: '/services/2' },
  ];

  const { services, isLoading, isError } = ServiceList(
    1,
    {
      limit: 8,
    },
    0
  );

  return (
    <div className="flex h-full w-full">
      {/* Services Column */}
      <div className="w-1/3 flex flex-col justify-start px-10 py-16">
        <div className="text-gray-400 text-sm font-medium mb-6 uppercase tracking-wider">
          SOFTWARE DELIVERY
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
      <div className="w-1/3 flex flex-col justify-start px-10 py-16">
        <div className="text-gray-400 text-sm font-medium mb-6 uppercase tracking-wider">
          OTHER SERVICES
        </div>
        {isLoading && <LoadingSpin />}
        {isError && <ErrorLoading />}

        {!isLoading && !isError && services?.length > 0 && (
          <nav className="space-y-2">
            {services.map(({ title, slug, id }, index) => (
              <div key={id} className="space-y-2">
                <div className="flex items-center gap-8">
                  <span className="text-gray-400 text-lg font-light w-8">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <Link
                    href={`/blogs/${slug}`}
                    className={cn(
                      'text-xl font-light text-gray-700 transition-all duration-300 hover:text-black hover:font-medium'
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {title}
                  </Link>
                </div>
              </div>
            ))}
          </nav>
        )}

        {!isLoading && !isError && services?.length === 0 && <NoResultsFound />}
      </div>

      {/* Featured Project */}
      <div className="w-1/3 flex items-start bg-cover bg-center overflow-hidden">
        <div className="w-full h-96 relative">
          <IntroduceCard
            title="About Us"
            description="A serene architectural masterpiece blending natural elements with modern design principles."
            imageSrc="/imgs/introduce.jpg"
            delay={0}
          />
        </div>
      </div>
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
