import DetailModify from '@/components/dashboard/DetailModify';
import DetailMembers from '@/components/dashboard/DetailMembers';
import DetailInvited from '@/components/dashboard/DetailInvited';
import GoBackLink from '@/components/ui/Link/GoBackLink';
import DetailDelete from '@/components/dashboard/DetailDelete';
import axiosServerHelper from '@/utils/network/axiosServerHelper';
import { redirect } from 'next/navigation';
import { Dashboard, dashboardSchema } from '@/apis/dashboards/types';
import { safeResponse } from '@/utils/network/safeResponse';

export default async function DashboardEditPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const response = await axiosServerHelper<Dashboard>(`/dashboards/${id}`);
  const dashboardDetail = safeResponse(response.data, dashboardSchema);

  if (!dashboardDetail.createdByMe) {
    redirect('/mydashboard');
  }

  return (
    <div className='p-10'>
      <div className='mb-8'>
        <GoBackLink href={`/dashboard/${id}`} />
      </div>
      <div className='grid w-full max-w-[620px] gap-4'>
        {/* 대시보드 정보 */}
        <DetailModify data={dashboardDetail} />

        {/* 구성원 리스트 */}
        <DetailMembers />

        {/* 초대내역 */}
        <DetailInvited />

        {/* 대시보드 삭제 */}
        <DetailDelete />
      </div>
    </div>
  );
}
