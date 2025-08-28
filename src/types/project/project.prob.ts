import { ProjectListData } from './project.type';

export interface ProjectTableProps {
  projects: ProjectListData[];
  isLoading: boolean;
  isError: boolean;
}

export type CaseStudyCardProps = {
  study: ProjectListData;
  index: number;
};
