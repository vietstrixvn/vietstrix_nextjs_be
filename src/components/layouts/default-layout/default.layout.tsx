// src/components/layout/DefaultLayout/index.tsx
import Navbar from './nav/navbar';
import Footer from './footer';
import { DefaultLayoutProps } from '@/types';

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div className="relative">
      <Navbar />
      <main>{children}</main>

      <Footer />
    </div>
  );
};

export default DefaultLayout;
