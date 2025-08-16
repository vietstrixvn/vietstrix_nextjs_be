'use client';

import { AdminContainer } from '@/components';
import { Heading } from '@/components/design/Heading';
import ServiceListDataAdmin from '@/components/pages/admin/service/ServiceList';
import React from 'react';

const Page = () => {
  return (
    <AdminContainer>
      <Heading
        name="Services"
        desc="Manage all services available on the platform. You can create, update or delete services and ensure that each service is clearly described and up to date for users."
      />
      <ServiceListDataAdmin />
    </AdminContainer>
  );
};

export default Page;
