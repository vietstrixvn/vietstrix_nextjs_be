'use client';

import { AdminContainer } from '@/components/container/admin.contaier';
import { Heading } from '@/components/design/Heading';
import BlogListData from '@/components/pages/admin/blog/BlogList';
import React from 'react';

const Page = () => {
  return (
    <AdminContainer>
      {/* Heading */}
      <Heading
        name="Blog"
        desc="Manage all the posts available on the platform. You can create, update or delete posts and make sure each post is clearly described and up to date for users."
      />

      <BlogListData />
    </AdminContainer>
  );
};

export default Page;
