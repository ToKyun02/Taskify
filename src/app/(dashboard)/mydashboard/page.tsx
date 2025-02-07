import MyDashboard from '@/components/dashboard/MyDashboard';
import InvitedDashboardCard from '@/components/invited-dashboard/InvitedDashboardCard';

export default function MydashboardPage() {
  return (
    <div className='p-10'>
      <div className='w-full max-w-screen-lg'>
        {/* 나의 대시보드 리스트 */}
        <MyDashboard />

        {/* 초대받은 대시보드 */}
        <InvitedDashboardCard />
      </div>
    </div>
  );
}
