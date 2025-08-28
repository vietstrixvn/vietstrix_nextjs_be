import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download } from 'lucide-react';
import { Button } from '../ui/button';

export const VisitedCard = () => {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold text-main uppercase">
          Top Visited Cities
        </CardTitle>
        refresh
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {[
            'Chanel link Research.pdf',
            'Chanel link Research.pdf',
            'Manifest Prescriptions.pdf',
            'Chanel link Research.pdf',
          ].map((filename, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
            >
              <span className="text-sm text-gray-700">{filename}</span>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4 text-gray-500" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
