'use client';

import { ProjectListData } from '@/types';
import Link from 'next/link';
import { CustomImage } from '../../design/image.component';

type Props = {
  project: ProjectListData;
};

export function ProjectMobileCard({ project }: Props) {
  return (
    <Link
      key={project.id}
      href={`/projects/${project.slug}`}
      className="w-full flex-shrink-0 px-4"
    >
      <div className="group cursor-pointer">
        <div className="relative bg-white rounded-lg overflow-hidden shadow-sm">
          <div className="relative aspect-[3/2] overflow-hidden">
            <CustomImage
              src={project.file || '/placeholder.svg'}
              alt={`case study`}
              className="w-full h-full object-cover"
              fill
            />
            {/* Semi-transparent brand logo */}
            <div className="absolute bottom-4 h-6 w-auto left-4 bg-white/80 backdrop-blur-sm rounded-md px-3 py-2">
              <CustomImage
                src={'/icons/logo.svg'}
                alt={`logo`}
                className=" opacity-90"
                fill
              />
            </div>
          </div>
        </div>
        {/* Caption */}
        <p className="mt-4 text-gray-600 text-sm leading-relaxed">
          {project.title}
        </p>
      </div>
    </Link>
  );
}
