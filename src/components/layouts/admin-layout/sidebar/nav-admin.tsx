'use client';

import { type LucideIcon } from 'lucide-react';

import { Collapsible, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavAdmin({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-lg mb-2">Admin</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <Link href={item.url}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={` ${
                      pathname === item.url
                        ? 'bg-white text-main border-main border'
                        : 'hover:bg-sidebar-hover hover:text-main-400 hover:border-main-400 border border-transparent'
                    }
                         `}
                  >
                    {item.icon && <item.icon className="text-lg" />}
                    <span className="text-lg">{item.title}</span>
                  </SidebarMenuButton>
                </Link>
              </CollapsibleTrigger>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
