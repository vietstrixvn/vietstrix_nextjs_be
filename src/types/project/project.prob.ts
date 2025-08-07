import type { ProjectListData } from '../types';

export interface ProjectTableProps {
  projects: ProjectListData[];
  isLoading: boolean;
  isError: boolean;
}

export type CaseStudy = {
  file?: string;
  title: string;
  client: string;
  link?: string;
  description: string;
  brand_name: string;
  testimonial: string;
};

export type CaseStudyCardProps = {
  study: CaseStudy;
  index: number;
};
