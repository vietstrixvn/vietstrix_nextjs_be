'use client';

import React from 'react';
import { AppSidebar } from './app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components';
import { Footer } from './adminFooter';
import type { DefaultLayoutProps } from '@/types';
import { AdminHeader } from './admin.header';

export const AdminLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AdminHeader />
        <main className="flex-1 font-sans">{children}</main>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
};
