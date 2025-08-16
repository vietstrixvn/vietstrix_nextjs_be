import { ArrowUpRight } from 'lucide-react';

export function Heading({ name, desc }: { name: string; desc?: string }) {
  return (
    <div className="flex w-full relative mt-6 mb-6 flex-col">
      {/* Dòng tên + icon */}
      <div className="flex items-center gap-2">
        <ArrowUpRight size={40} strokeWidth={1.5} />
        <h2 className="text-4xl font-bold text-main uppercase mt-4 mb-1">
          {name}
        </h2>
      </div>

      {/* Desc nằm ngay dưới tên */}
      {desc && (
        <div className="flex items-start gap-2 ml-[calc(25px+0.5rem)]">
          <span className="w-1.5 bg-main"></span>
          <p className="text-gray-500 text-sm">{desc}</p>
        </div>
      )}
    </div>
  );
}
