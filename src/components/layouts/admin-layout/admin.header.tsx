'use client';

import React from 'react';
// import SearchInput from '../search-input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@radix-ui/react-separator';
import { AdminBreadCrumb } from './admin.breadcrumb';
import { CtaGithub } from '@/components/button';
import { UserNav } from './user-nav';
import { useAuthStore } from '@/store';

export function AdminHeader() {
  const userInfo = useAuthStore((state) => state.userInfo);
  const { logout } = useAuthStore();

  return (
    <header className="bg-gradient-to-r from-main to-main-700 flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <AdminBreadCrumb />
      </div>

      <div className="flex items-center gap-2 px-4">
        <CtaGithub />
        {/* <div className='hidden md:flex'>
          <SearchInput />
        </div> */}
        <UserNav logout={logout} user={userInfo ?? null} />
      </div>
    </header>
  );
}
