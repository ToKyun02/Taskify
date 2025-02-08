'use client';

import InvitedDashboardCard from '@/components/invited-dashboard/InvitedDashboardCard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function page() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <InvitedDashboardCard />
      </QueryClientProvider>
    </div>
  );
}
