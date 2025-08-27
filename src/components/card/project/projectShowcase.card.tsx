'use client';

import { ProjectListData } from '@/types';
import Link from 'next/link';
import { CustomImage } from '../../design/image.component';

type Props = {
  project: ProjectListData;
};

export function ProjectRecentCard({ project }: Props) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      key={project.id}
      className="group cursor-pointer transition-transform duration-300 hover:scale-105 hover:text-main hover:underline hover:font-bold hover:underline-offset-4"
    >
      <div className="relative  overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
        <div className="w-full h-full relative aspect-image-main overflow-hidden">
          <CustomImage
            src={project.file || '/placeholder.svg'}
            alt={`${project.title} case study`}
            className=" object-cover transition-transform duration-300 group-hover:scale-105"
            fill
          />
          {/* Semi-transparent brand logo */}
          <div className="absolute bottom-4 left-4 h-6  bg-white/80 backdrop-blur-sm px-3 py-2">
            <CustomImage
              src={'/icons/logo.svg'}
              alt={`logo`}
              className="w-auto opacity-90"
              fill
            />
          </div>
        </div>
      </div>
      {/* Caption */}
      <p className="mt-4 text-gray-600  text-sm leading-relaxed">
        {project.title}
      </p>
    </Link>
  );
}
