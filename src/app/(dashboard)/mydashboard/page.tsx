import MyDashboard from '@/components/dashboard/MyDashboard';
import InvitedDashboardCard from '@/components/invited-dashboard/InvitedDashboardCard';

export default function MydashboardPage() {
  return (
    <div className='p-10'>
      <div className='w-full max-w-screen-lg'>
        <div className='grid gap-10'>
          <MyDashboard />
          <InvitedDashboardCard />
        </div>
      </div>
    </div>
  );
}
