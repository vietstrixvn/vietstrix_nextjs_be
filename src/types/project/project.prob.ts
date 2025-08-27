import { ProjectListData } from './project.type';

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
  content: string;
  brand_name: string;
  testimonial: string;
};

export type CaseStudyCardProps = {
  study: CaseStudy;
  index: number;
};
