import MyDashboard from '@/components/dashboard/MyDashboard';
import MyInvitedDashboardList from '@/components/dashboard/MyInvitedDashboardList';
import { Page, PageInner } from '@/components/layout/Page';

export default function MydashboardPage() {
  return (
    <Page>
      <PageInner className='max-w-screen-lg'>
        <div className='grid gap-10'>
          <MyDashboard />
          <MyInvitedDashboardList />
        </div>
      </PageInner>
    </Page>
  );
}
