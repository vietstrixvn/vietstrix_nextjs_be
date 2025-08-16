'use client';

import * as React from 'react';
import { CustomImage } from '@/components/design/image.component';

export function VersionSwitcher({ versions }: { versions: string }) {
  return (
    <div className="flex w-full items-center bg-white px-3 py-3 bg-sidebar-background group-data-[collapsible=icon]:justify-center ">
      <div className="flex aspect-square size-8 items-center justify-center">
        <CustomImage src="/icons/logo.svg" alt="Logo" width={30} height={30} />
      </div>
      {/* Sử dụng group data attributes để ẩn/hiện text */}
      <div className="flex flex-col gap-0.5 leading-none text-left transition-[margin,opacity] duration-200 ease-linear group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:overflow-hidden">
        <span className="font-bold test-lg">VIETSTRIX</span>
        <span className="font-mono text-sm">v{versions}</span>
      </div>
    </div>
  );
}
