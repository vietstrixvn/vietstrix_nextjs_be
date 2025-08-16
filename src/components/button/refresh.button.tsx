// components/button/RefreshButton.tsx

import { Icons } from '@/assets/icons/icons';
import { Button } from '@/components';
import type { RefreshButtonProps } from '@/types';

export const RefreshButton: React.FC<RefreshButtonProps> = ({
  onClick,
  className = '',
}) => {
  return (
    <Button
      onClick={onClick}
      className={`group ml-2 bg-white text-black hover:bg-main hover:text-white transition-all duration-300 ${className}`}
    >
      <Icons.RefreshCcwDot className="mr-2 transition-transform duration-300 group-hover:rotate-180" />
      Refresh
    </Button>
  );
};
