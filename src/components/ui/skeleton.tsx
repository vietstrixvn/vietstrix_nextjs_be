import { cn } from '@/utils/helpers/utils';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('bg-accent animate-pulse rounded-none', className)}
      {...props}
    />
  );
}

export { Skeleton };
