// app/api/analytics/route.ts
import { NextResponse } from 'next/server';
import { BetaAnalyticsDataClient } from '@google-analytics/data';

export async function GET() {
  const propertyId = process.env.GA_PROPERTY_ID as string;
  const client = new BetaAnalyticsDataClient({
    credentials: {
      client_email: process.env.GA_CLIENT_EMAIL,
      private_key: process.env.GA_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
  });

  const [response] = await client.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
    dimensions: [{ name: 'date' }],
    metrics: [{ name: 'activeUsers' }],
  });

  return NextResponse.json(
    response.rows?.map((row) => ({
      date: row.dimensionValues?.[0]?.value,
      activeUsers: row.metricValues?.[0]?.value,
    }))
  );
}

import { useQuery } from '@tanstack/react-query';

const fetchTrackingData = async () => {
  const res = await fetch('/api/analytics');
  if (!res.ok) throw new Error('Failed to fetch analytics data');
  return res.json();
};

export const useTrackingData = (refreshKey: number) =>
  useQuery({
    queryKey: ['seoTrackingData', refreshKey],
    queryFn: fetchTrackingData,
    staleTime: process.env.NODE_ENV === 'development' ? 1000 : 300000,
  });
