import { AdminContainer } from '@/components';
import { Heading } from '@/components/design/Heading';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { SeoCard } from '@/components/card/seo.card';
import WebsiteCard from '@/components/card/website.card';
import Header from '@/components/design/Header';
import VisitedCard from '@/components/card/topVisite.card';
import TotalActiveUsers from '@/components/card/totalActive.card';

const Page = () => {
  return (
    <AdminContainer>
      <Heading name="Website Data" desc="Manage your website DATA here" />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* General Information & Anonimesis */}
        <div className="xl:col-span-2 space-y-6">
          {/* General Information */}
          <Header title="SEO DATA" />

          <SeoCard />

          {/* Anonimesis */}
          <Header title="WEBSITE DATA" />
          <WebsiteCard />
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Filters */}
          <Header title="TRACKING DATA" />
          <TotalActiveUsers />
          <VisitedCard />
          {/* Notices */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900">
                Notices
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                className="text-blue-600 border-blue-600 bg-transparent"
              >
                DOWNLOAD ALL
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Notice 27-05-23.pdf', time: '10:00am' },
                  { name: 'Notice 24-05-23.pdf', time: '10:00am' },
                ].map((notice, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                  >
                    <div>
                      <p className="text-sm text-gray-700">{notice.name}</p>
                      <p className="text-xs text-gray-500">{notice.time}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 text-gray-500" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminContainer>
  );
};

export default Page;
