'use client';

import { Container } from '@/components';
import { Heading } from '@/components/design/Heading';
import { AdminBreadCrumb } from '@/components/layout/AdminLayout/admin.breadcrumb';
import BlogListData from '@/components/pages/admin/blog/BlogList';
import React from 'react';

const Page = () => {
  return (
    <Container>
      <AdminBreadCrumb title="Bài Viết" />
      {/* Heading */}
      <Heading
        name="Bài viết"
        desc="Quản lý tất cả các bài viết có sẵn trên nền tảng. Bạn có thể tạo, cập nhật hoặc xóa các bài viết và đảm bảo rằng mỗi bài viết đều được mô tả rõ ràng và cập nhật cho người dùng."
      />

      <BlogListData />
    </Container>
  );
};

export default Page;
