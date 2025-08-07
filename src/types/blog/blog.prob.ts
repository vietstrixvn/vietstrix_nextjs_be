import type { BlogList } from './blog.type';

export interface BlogTableProps {
  blogs: BlogList[];
  isLoading: boolean;
  isError: boolean;
}
