'use client';

import * as React from 'react';

import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { NavService } from './nav-services';
import { NavSupport } from './nav-support';
import { NavAdmin } from './nav-admin';
import { useAuthStore } from '@/store';
import { data } from '@/lib';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const userInfo = useAuthStore((state) => state.userInfo);
  const { logout } = useAuthStore();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader />

      <SidebarContent>
        <NavMain items={data.navMain} />
        {userInfo?.role === 'admin' && <SidebarSeparator />}
        {userInfo?.role === 'admin' && <NavAdmin items={data.navAdmin} />}
        <SidebarSeparator />
        <NavService items={data.navService} />
        <SidebarSeparator />
        <NavSupport items={data.navSupport} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser logout={logout} user={userInfo ?? null} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
