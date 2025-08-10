'use client';

import {
  NavUser,
  NavMain,
  NavService,
  NavSupport,
  NavAdmin,
  VersionSwitcher,
} from './sidebar';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from '@/components';
import { useAuthStore } from '@/store';
import { data } from '@/lib';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const userInfo = useAuthStore((state) => state.userInfo);
  const { logout } = useAuthStore();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <VersionSwitcher versions={data.version} />
      </SidebarHeader>
      <SidebarContent className="flex-1 overflow-y-auto overflow-x-hidden">
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
