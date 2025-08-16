import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/design/Header';
import { AdminContainer } from '@/components/container/admin.contaier';
import SectionHeader from '@/components/design/SectionHeader';
import { AnalyticsComponent } from '@/components/card/analytics.card';
import AdminHero from '@/components/layouts/admin-layout/admin.hero';
import { RecentInvoices } from '@/components/tables/recent-invoices.table';
import { Heading } from '@/components';
import VisitedCard from '@/components/card/topVisite.card';

const Page = () => {
  return (
    <AdminContainer>
      <SectionHeader title="VietStrix Dashboard" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-6">
        <AnalyticsComponent />
        <VisitedCard />
      </div>
      <Header title="Vietstrix Area" />

      <div className="mb-5">
        <AdminHero />
      </div>

      <Card className="mb-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            <Heading name="New Contact" />
          </CardTitle>
          <CardTitle>
            <a
              href="/admin/contact"
              className="text-sm text-muted-foreground hover:text-primary hover:underline"
            >
              View ALl
            </a>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RecentInvoices />
        </CardContent>
      </Card>
    </AdminContainer>
  );
};

export default Page;
