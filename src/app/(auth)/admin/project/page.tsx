'use client';

import { AdminContainer, Heading } from '@/components';
import ProjectListDataAdmin from '@/components/pages/admin/project/ProjectList';

const Page = () => {
  return (
    <AdminContainer>
      {/* Heading */}
      <div className="flex items-center justify-between mb-4">
        <Heading name="Project Management" desc="Manage your projects here" />
      </div>
      <ProjectListDataAdmin />
    </AdminContainer>
  );
};

export default Page;
