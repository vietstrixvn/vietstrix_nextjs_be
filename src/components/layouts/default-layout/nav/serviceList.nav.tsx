import { ErrorLoading } from '@/components/loading/error';
import { ServiceList } from '@/lib';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

export const ServiceListNav = ({ category }: { category: string }) => {
  const router = useRouter();
  const params = useMemo(
    () => ({
      category_id: category,
      page_size: 4,
    }),
    [category]
  );

  const { services, isLoading, isError } = ServiceList(1, params, 0);

  // Early return for loading state
  if (isLoading) {
    return (
      <ul className="ml-6 space-y-1">
        {Array.from({ length: 3 }).map((_, i) => (
          <li key={i} className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
        ))}
      </ul>
    );
  }

  // Early return for error state
  if (isError) {
    return (
      <ul className="ml-6 space-y-1">
        <li>
          <ErrorLoading />
        </li>
      </ul>
    );
  }

  // Early return for empty results - không render gì cả thay vì NoResultsFound
  if (!services || services.length === 0) {
    return null; // hoặc return <div className="ml-6 text-gray-400 text-xs">No services</div>;
  }

  // Render services
  return (
    <ul className="ml-6 space-y-1">
      {services.map(({ title, slug, id }) => (
        <li
          key={id}
          className="hover:text-blue-600 cursor-pointer text-xl font-light text-gray-600 transition-all duration-300  relative group"
          title={slug}
          onClick={() => router.push(`/services/${slug}`)}
        >
          {title}
        </li>
      ))}
    </ul>
  );
};
