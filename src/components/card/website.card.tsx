import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '../ui/button';
import { Pencil } from 'lucide-react';
import { RefreshButton } from '../button/refresh.button';

const WebsiteCard = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-2xl font-bold text-main uppercase">
              Webiste Information
            </CardTitle>
            <Button
              size="icon"
              className="h-8 w-8 rounded-full bg-main hover:bg-main-700"
            >
              <Pencil className="h-4 w-4 text-white" />
            </Button>
          </div>
          {/* <RefreshButton onClick={handleRefresh} /> */}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Affiliation
              </label>
              <p className="text-sm text-gray-900 mt-1">Reads section</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Registration
              </label>
              <p className="text-sm text-gray-900 mt-1">No</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Subscription
              </label>
              <p className="text-sm text-gray-900 mt-1">Channel minus</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WebsiteCard;
