'use client';

import { PushButton, Container, Heading } from '@/components';
import { AdminBreadCrumb } from '@/components/layout/AdminLayout/admin.breadcrumb';
import ProductListPage from '@/components/pages/admin/product/product-list.admin';
import React from 'react';

const Page = () => {
  return (
    <Container>
      <AdminBreadCrumb title="Sản Phẩm" />

      <div className="flex items-center justify-between mb-4">
        <Heading
          name="Sản phẩm"
          desc="Quản lý tất cả các sản phẩm có sẵn trên nền tảng. Bạn có thể tạo, cập nhật hoặc xóa sản phẩm và đảm bảo rằng mỗi sản phẩm đều được mô tả rõ ràng và cập nhật cho người dùng."
        />
        <PushButton href="/admin/product/create_product" label="Tạo Sản Phẩm" />
      </div>

      <ProductListPage />
    </Container>
  );
};

export default Page;
