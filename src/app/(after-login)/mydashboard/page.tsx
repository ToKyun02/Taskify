import MyDashboard from '@/components/dashboard/MyDashboard';
import MyInvitedDashboardList from '@/components/dashboard/MyInvitedDashboardList';
import { Page, PageInner } from '@/components/layout/Page';

export const metadata = {
  title: 'Taskify - 내 대시보드',
  description: 'Taskify 내 대시보드에서 개인 일정을 쉽고 편하게 관리해 보세요.',
  keywords: ['일정', '공유', '커뮤니티', '할 일', 'Taskify'],
  openGraph: {
    title: 'Taskify - 내 대시보드',
    description: 'Taskify 내 대시보드에서 개인 일정을 쉽고 편하게 관리해 보세요.',
    url: 'https://taskify-lab.vercel.app/mydashboard',
    type: 'website',
    images: [
      {
        url: 'https://taskify-lab.vercel.app/meta.png',
        width: 1200,
        height: 630,
        alt: 'Taskify 내 대시보드 이미지',
      },
    ],
  },
};

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
