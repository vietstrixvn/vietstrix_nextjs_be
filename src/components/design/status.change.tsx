'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components';
import type { VisibilityCategoryOption, VisibilitySelectProps } from '@/types';

export const statusColorMap: Record<string, string> = {
  show: 'bg-green-100 text-green-800 hover:bg-green-100',
  hide: 'bg-gray-100 text-gray-800 hover:bg-gray-100',
  popular: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
  draft: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
};

export const SelectStatus = ({ value, onChange }: VisibilitySelectProps) => {
  const labelMap = {
    show: 'Show',
    hide: 'Hide',
    draft: 'Draft',
  };
  return (
    <Select
      value={value}
      onValueChange={(val) => onChange(val as VisibilityCategoryOption)}
    >
      <SelectTrigger
        className={`w-[100px] ${statusColorMap[value as VisibilityCategoryOption]}`}
      >
        <SelectValue placeholder="Select visibility">
          {labelMap[value as VisibilityCategoryOption]}
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="show">Show</SelectItem>
        <SelectItem value="hide">Hide</SelectItem>
      </SelectContent>
    </Select>
  );
};
