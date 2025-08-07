// components/Loading.tsx
import type { LoadingProps } from '@/types';
import { Icons } from '@/assets/icons/icons';
import Container from '../container/container';

export const LoadingSpin: React.FC<LoadingProps> = ({
  size = 32,
  message = 'Loading...',
  className = '',
}) => {
  return (
    <Container
      className={`min-h-screen flex flex-col items-center justify-center gap-2 p-4 ${className}`}
    >
      <Icons.Loader2 className="animate-spin text-main" size={size} />
      <span className="text-sm text-gray-500">{message}</span>
    </Container>
  );
};
