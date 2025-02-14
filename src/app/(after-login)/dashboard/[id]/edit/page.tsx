import { Page, PageInner } from '@/components/layout/Page';
import DetailModify from '@/components/dashboard/DetailModify';
import DetailMembers from '@/components/dashboard/DetailMembers';
import DetailInvited from '@/components/dashboard/DetailInvited';
import GoBackLink from '@/components/ui/Link/GoBackLink';
import DetailDelete from '@/components/dashboard/DetailDelete';
import axiosServerHelper from '@/utils/network/axiosServerHelper';
import { redirect } from 'next/navigation';
import { Dashboard, dashboardSchema } from '@/apis/dashboards/types';
import { safeResponse } from '@/utils/network/safeResponse';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const id = params.id;
  const response = await axiosServerHelper<Dashboard>(`/dashboards/${id}`);
  const dashboardDetail = safeResponse(response.data, dashboardSchema);
  return {
    title: `Taskify - ${dashboardDetail.title} 수정`,
    description: 'Taskify 대시보드에서 커뮤니티 일정을 한눈에 관리해 보세요.',
    keywords: ['일정', '공유', '커뮤니티', '할 일', 'Taskify'],
    openGraph: {
      title: `Taskify - ${dashboardDetail.title} 수정`,
      description: 'Taskify 대시보드에서 커뮤니티 일정을 한눈에 관리해 보세요.',
      url: `https://taskify-lab.vercel.app/dashboard/${id}/edit`,
      type: 'website',
      images: [
        {
          url: 'https://taskify-lab.vercel.app/meta.png',
          width: 1200,
          height: 630,
          alt: 'Taskify 대시보드 수정 페이지 이미지',
        },
      ],
    },
  };
}

export default async function DashboardEditPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const response = await axiosServerHelper<Dashboard>(`/dashboards/${id}`);
  const dashboardDetail = safeResponse(response.data, dashboardSchema);

  if (!dashboardDetail.createdByMe) {
    redirect('/mydashboard');
  }

  return (
    <Page>
      <PageInner>
        <div className='mb-8'>
          <GoBackLink href={`/dashboard/${id}`} />
        </div>

        <div className='grid gap-4'>
          {/* 대시보드 정보 */}
          <DetailModify data={dashboardDetail} />

          {/* 구성원 리스트 */}
          <DetailMembers />

          {/* 초대내역 */}
          <DetailInvited />

          {/* 대시보드 삭제 */}
          <DetailDelete />
        </div>
      </PageInner>
    </Page>
  );
}
