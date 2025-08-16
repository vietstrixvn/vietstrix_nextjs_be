import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ChevronRight } from 'lucide-react';

import { usePathname } from 'next/navigation';
import { ROUTES } from '@/lib';

export function AdminBreadCrumb() {
  const path = usePathname();
  const pathArray = path
    ?.replace('/admin', '')
    .split('/')
    .filter((segment) => segment);

  return (
    <Breadcrumb>
      <BreadcrumbList className="text-sm">
        <BreadcrumbItem>
          <BreadcrumbLink
            href={ROUTES.DASHBOARD}
            className="text-white hover:text-gray-200 font-medium"
          >
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>

        {pathArray.map((segment, index) => {
          const href = '/admin/' + pathArray.slice(0, index + 1).join('/');
          const isLast = index === pathArray.length - 1;

          return (
            <div key={href} className="flex items-center gap-2">
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4 text-white" />
              </BreadcrumbSeparator>
              {isLast ? (
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-gray-300 font-medium capitalize">
                    {' '}
                    {segment}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              ) : (
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={href}
                    className="text-gray-100 hover:text-gray-400 font-medium capitalize"
                  >
                    {segment}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              )}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
