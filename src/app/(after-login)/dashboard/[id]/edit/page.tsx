'use client';

import { useParams, useRouter } from 'next/navigation';
import { useDashboardMutation } from '@/apis/dashboards/queries';
import Button from '@/components/ui/Button/Button';
import useAlert from '@/hooks/useAlert';
import { getErrorMessage } from '@/utils/errorMessage';
import DetailModify from '@/components/dashboard/DetailModify';
import DetailMembers from '@/components/dashboard/DetailMembers';
import DetailInvited from '@/components/dashboard/DetailInvited';
import GoBackLink from '@/components/ui/Link/GoBackLink';

export default function DashboardEditPage() {
  const router = useRouter();
  const alert = useAlert();
  const { id } = useParams<{ id: string }>();
  const { remove } = useDashboardMutation();

  const handleDelete = async () => {
    try {
      await remove(Number(id));
      alert('삭제했습니다.');
      router.push(`/mydashboard`);
    } catch (error) {
      const message = getErrorMessage(error);
      alert(message);
    }
  };

  return (
    <div className='p-10'>
      <div className='mb-8'>
        <GoBackLink href={`/dashboard/${id}`} />
      </div>
      <div className='grid w-full max-w-[620px] gap-4'>
        {/* 대시보드 정보 */}
        <DetailModify />

        {/* 구성원 리스트 */}
        <DetailMembers />

        {/* 초대내역 */}
        <DetailInvited />

        {/* 대시보드 삭제 */}
        <Button variant='outline' onClick={handleDelete}>
          대시보드 삭제하기
        </Button>
      </div>
    </div>
  );
}
