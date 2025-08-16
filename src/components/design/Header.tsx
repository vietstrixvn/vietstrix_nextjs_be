import { HeaderProps } from '@/types';
import React from 'react';

const Header: React.FC<HeaderProps> = ({ title, className }) => {
  return (
    <div
      className={`bg-gradient-to-r mb-6 from-main to-main-700 text-white text-lg font-semibold px-4 py-2 ${className}`}
    >
      {title}
    </div>
  );
};

export default Header;
