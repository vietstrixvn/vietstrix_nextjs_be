import { Card, CardContent, CardHeader, CardTitle } from '@/components';

export const TotalActiveUsers = () => {
  return (
    <div>
      <Card>
        <CardHeader className="items-center pb-0">
          <CardTitle className="text-2xl font-bold text-main uppercase">
            Total Active Users
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <p className="text-5xl">
            {/* {totalActiveUsers} */}
            120
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
