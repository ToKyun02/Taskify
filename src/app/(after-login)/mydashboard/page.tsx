import MyDashboard from '@/components/dashboard/MyDashboard';
import MyInvitedDashboardList from '@/components/dashboard/MyInvitedDashboardList';

export default function MydashboardPage() {
  return (
    <div className='p-10'>
      <div className='w-full max-w-screen-lg'>
        <div className='grid gap-10'>
          <MyDashboard />
          <MyInvitedDashboardList />
        </div>
      </div>
    </div>
  );
}
