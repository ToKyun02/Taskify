'use client';

import { useParams, useRouter } from 'next/navigation';
import { useDashboardMutation } from '@/apis/dashboards/queries';
import Button from '@/components/ui/Button/Button';
import useAlert from '@/hooks/useAlert';
import { getErrorMessage } from '@/utils/errorMessage';

export default function DetailDelete() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const alert = useAlert();
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
    <Button variant='outline' onClick={handleDelete}>
      대시보드 삭제하기
    </Button>
  );
}
