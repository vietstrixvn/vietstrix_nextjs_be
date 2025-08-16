import { useTrackingData } from '@/hooks/analytics/useTracking';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export function TrackingChart() {
  const { data, isLoading, isError } = useTrackingData(0);

  if (isLoading) return <div>Loading chart...</div>;
  if (isError) return <div>Failed to load tracking data.</div>;

  // Format data for chart
  const chartData =
    data?.map((item: any) => ({
      date: item.date, // yyyyMMdd
      activeUsers: Number(item.activeUsers),
    })) ?? [];

  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="activeUsers"
            stroke="#8884d8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
