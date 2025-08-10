import { ContainerProps } from '@/types';

export function AdminContainer({ children, className }: ContainerProps) {
  return <main className={`w-full px-8 py-4 ${className}`}>{children}</main>;
}
