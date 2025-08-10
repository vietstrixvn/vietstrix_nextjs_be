import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '../design/Header';

export function AnalyticsComponent() {
  const metrics = [
    { label: 'Direct', value: '432' },
    { label: 'Organic', value: '216' },
    { label: 'Sessions', value: '29%' },
    { label: 'Page Views', value: '2.3K' },
    { label: 'Leads', value: '1.6K' },
    { label: 'Conversions', value: '8%' },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Card className="w-full">
        <CardHeader className="pb-4">
          <CardTitle>
            <Header title="Vietstrix Analytics" />
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1">
            Total 28.5% Conversion Rate
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="flex items-center justify-between sm:justify-start sm:gap-3"
              >
                <Badge
                  variant="secondary"
                  className="bg-gray-100 text-gray-700 hover:bg-gray-100 font-medium px-3 py-1 text-sm"
                >
                  {metric.value}
                </Badge>
                <span className="text-gray-900 font-medium text-sm">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
