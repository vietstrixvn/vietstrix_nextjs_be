import { HeaderProps } from '@/types';
import React from 'react';

const Header: React.FC<HeaderProps> = ({ title, className }) => {
  return (
    <div
      className={`bg-gradient-to-r mb-6 from-main to-lime-300 text-white text-lg font-semibold px-4 py-2 rounded-lg ${className}`}
    >
      {title}
    </div>
  );
};

export default Header;
